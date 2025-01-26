import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Assessment } from '@/lib/models/Assessment'
import { User } from '@/lib/models/User'
import dbConnect from '@/lib/mongoose'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

const questions = [
  {
    id: 1,
    text: "How would you rate your overall mood today?",
    options: [
      { value: 1, text: "Very poor" },
      { value: 2, text: "Poor" },
      { value: 3, text: "Neutral" },
      { value: 4, text: "Good" },
      { value: 5, text: "Very good" }
    ]
  },
  {
    id: 2,
    text: "How well did you sleep last night?",
    options: [
      { value: 1, text: "Very poorly" },
      { value: 2, text: "Poorly" },
      { value: 3, text: "Moderately" },
      { value: 4, text: "Well" },
      { value: 5, text: "Very well" }
    ]
  },
  {
    id: 3,
    text: "How would you rate your anxiety level?",
    options: [
      { value: 5, text: "None" },
      { value: 4, text: "Mild" },
      { value: 3, text: "Moderate" },
      { value: 2, text: "Severe" },
      { value: 1, text: "Very severe" }
    ]
  },
  {
    id: 4,
    text: "How well have you been able to concentrate today?",
    options: [
      { value: 1, text: "Very poorly" },
      { value: 2, text: "Poorly" },
      { value: 3, text: "Moderately" },
      { value: 4, text: "Well" },
      { value: 5, text: "Very well" }
    ]
  },
  {
    id: 5,
    text: "How connected do you feel to others today?",
    options: [
      { value: 1, text: "Very disconnected" },
      { value: 2, text: "Somewhat disconnected" },
      { value: 3, text: "Neutral" },
      { value: 4, text: "Somewhat connected" },
      { value: 5, text: "Very connected" }
    ]
  }
]

// Add this function to calculate analytics
const calculateAnalytics = (responses: any[]) => {
  // Calculate category scores
  const categoryScores = [
    {
      category: 'Anxiety',
      score: responses.find(r => r.question.includes('anxiety'))?.score || 0
    },
    {
      category: 'Sleep',
      score: responses.find(r => r.question.includes('sleep'))?.score || 0
    },
    {
      category: 'Energy',
      score: responses.find(r => r.question.includes('concentrate'))?.score || 0
    },
    {
      category: 'Social',
      score: responses.find(r => r.question.includes('connected'))?.score || 0
    },
    {
      category: 'Mood',
      score: responses.find(r => r.question.includes('mood'))?.score || 0
    }
  ].map(item => ({
    ...item,
    score: item.score * 20 // Convert to percentage
  }))

  // Calculate emotion distribution based on responses
  const emotionDistribution = [
    { emotion: 'Calm', value: 0, color: '#3B82F6' },
    { emotion: 'Happy', value: 0, color: '#10B981' },
    { emotion: 'Anxious', value: 0, color: '#F59E0B' },
    { emotion: 'Sad', value: 0, color: '#EF4444' },
    { emotion: 'Neutral', value: 0, color: '#8B5CF6' }
  ]

  // Update emotion values based on responses
  // This is a simple example - you might want to use more sophisticated logic
  const totalScore = responses.reduce((sum, r) => sum + r.score, 0)
  const avgScore = totalScore / responses.length

  if (avgScore >= 4) {
    emotionDistribution[1].value = 40 // Happy
    emotionDistribution[0].value = 30 // Calm
    emotionDistribution[4].value = 30 // Neutral
  } else if (avgScore >= 3) {
    emotionDistribution[0].value = 30 // Calm
    emotionDistribution[4].value = 40 // Neutral
    emotionDistribution[2].value = 30 // Anxious
  } else {
    emotionDistribution[2].value = 40 // Anxious
    emotionDistribution[3].value = 30 // Sad
    emotionDistribution[4].value = 30 // Neutral
  }

  return { categoryScores, emotionDistribution }
}

export async function POST(req: Request) {
  try {
    await dbConnect()

    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { responses } = await req.json()
    
    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json({ error: 'Invalid responses' }, { status: 400 })
    }

    // Find or create user
    let user = await User.findOne({ email: session.user.email })
    if (!user) {
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image
      })
    }

    // Calculate score
    const totalPossibleScore = questions.length * 5
    const actualScore = responses.reduce((sum, response) => sum + response.score, 0)
    const percentageScore = Math.round((actualScore / totalPossibleScore) * 100)

    try {
      // Generate AI analysis with a more structured prompt
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const prompt = `Analyze these mental health assessment responses and create a supportive summary and recommendations. Return ONLY a JSON object with exactly this format:
{
  "summary": "A brief, empathetic summary of their mental state",
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}

Assessment Results:
${responses.map(r => `- ${r.question}: ${r.answer}`).join('\n')}
Overall Score: ${percentageScore}%

Remember: Be supportive, practical, and return ONLY valid JSON.`

      const result = await model.generateContent(prompt)
      const responseText = result.response.text().trim()
      
      let aiResponse
      try {
        // Remove any non-JSON text that might be in the response
        const jsonStart = responseText.indexOf('{')
        const jsonEnd = responseText.lastIndexOf('}') + 1
        const jsonStr = responseText.slice(jsonStart, jsonEnd)
        aiResponse = JSON.parse(jsonStr)

        // Validate response structure
        if (!aiResponse.summary || !Array.isArray(aiResponse.recommendations)) {
          throw new Error('Invalid response structure')
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', responseText)
        // Provide meaningful default response based on score
        aiResponse = {
          summary: `Based on your responses, your overall wellbeing score is ${percentageScore}%. ${
            percentageScore >= 80 ? "You're doing very well overall." :
            percentageScore >= 60 ? "You're managing reasonably well, though there might be areas for improvement." :
            percentageScore >= 40 ? "You're experiencing some challenges that might benefit from attention." :
            "You seem to be going through a difficult time."
          }`,
          recommendations: [
            "Consider maintaining a daily mood and activity journal",
            "Practice regular self-care activities that you enjoy",
            "If you're struggling, don't hesitate to reach out to a mental health professional"
          ]
        }
      }

      // Add the analytics to the assessment
      const analytics = calculateAnalytics(responses)
      console.log('Calculated Analytics:', analytics)

      const assessment = await Assessment.create({
        userId: user._id,
        score: percentageScore,
        responses,
        summary: aiResponse.summary,
        recommendations: aiResponse.recommendations,
        analytics
      })

      // Update user's assessments
      await User.findByIdAndUpdate(user._id, {
        $push: { assessments: assessment._id }
      })

      return NextResponse.json({
        score: percentageScore,
        summary: aiResponse.summary,
        recommendations: aiResponse.recommendations,
        analytics
      })

    } catch (aiError) {
      console.error('AI analysis error:', aiError)
      // Provide score-based feedback even if AI fails
      const defaultSummary = `Your overall wellbeing score is ${percentageScore}%. ${
        percentageScore >= 80 ? "You're doing very well overall." :
        percentageScore >= 60 ? "You're managing reasonably well, though there might be areas for improvement." :
        percentageScore >= 40 ? "You're experiencing some challenges that might benefit from attention." :
        "You seem to be going through a difficult time."
      }`

      const assessment = await Assessment.create({
        userId: user._id,
        score: percentageScore,
        responses,
        summary: defaultSummary,
        recommendations: [
          "Practice regular self-care activities",
          "Maintain a consistent sleep schedule",
          "Consider talking to someone you trust about your feelings"
        ]
      })

      await User.findByIdAndUpdate(user._id, {
        $push: { assessments: assessment._id }
      })

      return NextResponse.json({
        score: percentageScore,
        summary: defaultSummary,
        recommendations: [
          "Practice regular self-care activities",
          "Maintain a consistent sleep schedule",
          "Consider talking to someone you trust about your feelings"
        ],
        analytics: calculateAnalytics(responses)
      })
    }

  } catch (error: any) {
    console.error('Assessment error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit assessment' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ questions })
} 