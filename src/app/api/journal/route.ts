import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import JournalEntry from '@/models/JournalEntry'
import connectDB from '@/lib/mongodb'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

// Get all entries for a user
export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const entries = await JournalEntry.find({ userId: session.user.email })
      .sort({ date: -1 })

    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
  }
}

// Helper function to determine mood emoji based on emotions
function getMoodEmoji(emotions: string[]): string {
  const emotionToEmoji: { [key: string]: string } = {
    // Positive emotions
    happy: '😊',
    joyful: '😃',
    excited: '🤗',
    grateful: '🥰',
    peaceful: '😌',
    optimistic: '😄',
    content: '🙂',
    proud: '😎',
    
    // Negative emotions
    sad: '😢',
    angry: '😠',
    frustrated: '😤',
    anxious: '😰',
    worried: '😟',
    stressed: '😩',
    depressed: '😔',
    overwhelmed: '😫',
    
    // Neutral emotions
    neutral: '😐',
    thoughtful: '🤔',
    calm: '😌',
    confused: '😕',
    tired: '😴',
    surprised: '😮',
    uncertain: '😶'
  }

  // Convert emotions to lowercase for matching
  const lowerEmotions = emotions.map(e => e.toLowerCase())
  
  // Find the first matching emotion
  for (const emotion of lowerEmotions) {
    if (emotionToEmoji[emotion]) {
      return emotionToEmoji[emotion]
    }
  }

  // Default emoji if no matching emotion is found
  return '😐'
}

// Create a new entry
export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, date } = await req.json()
    
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    await connectDB()

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const prompt = `
        Analyze this journal entry and provide a detailed emotional analysis.
        Return the response in this exact JSON format:
        {
          "emotions": ["emotion1", "emotion2", ...],
          "insights": ["key insight about the person's state of mind", ...],
          "suggestions": ["helpful suggestion based on the content", ...]
        }
        Make sure to provide at least 2-3 items for each array.
        For emotions, use clear emotional states like: happy, sad, anxious, excited, peaceful, frustrated, etc.
        Keep the analysis supportive and constructive.
        
        Journal entry: "${content}"
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      let aiAnalysis

      try {
        aiAnalysis = JSON.parse(response.text())
        
        // Validate the AI response format
        if (!aiAnalysis.emotions || !aiAnalysis.insights || !aiAnalysis.suggestions) {
          throw new Error('Invalid AI response format')
        }

        // Ensure arrays are not empty
        if (!aiAnalysis.emotions.length || !aiAnalysis.insights.length || !aiAnalysis.suggestions.length) {
          throw new Error('Empty analysis arrays')
        }

        // Determine mood emoji based on detected emotions
        const moodEmoji = getMoodEmoji(aiAnalysis.emotions)

        const entry = await JournalEntry.create({
          userId: session.user.email,
          content,
          mood: moodEmoji,
          date: date || new Date(),
          aiAnalysis: {
            emotions: aiAnalysis.emotions,
            insights: aiAnalysis.insights,
            suggestions: aiAnalysis.suggestions
          }
        })

        return NextResponse.json(entry)
      } catch (parseError) {
        console.error('Failed to parse AI response:', response.text())
        throw new Error('Invalid AI response format')
      }
    } catch (aiError) {
      console.error('AI Analysis failed:', aiError)
      // Create entry with a default analysis if AI fails
      const entry = await JournalEntry.create({
        userId: session.user.email,
        content,
        mood: '😐', // Neutral emoji for failed analysis
        date: date || new Date(),
        aiAnalysis: {
          emotions: ['unanalyzed'],
          insights: ['AI analysis unavailable at the moment'],
          suggestions: ['Try writing another entry later for AI analysis']
        }
      })
      return NextResponse.json(entry)
    }
  } catch (error) {
    console.error('Failed to create entry:', error)
    return NextResponse.json({ 
      error: 'Failed to create entry',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 