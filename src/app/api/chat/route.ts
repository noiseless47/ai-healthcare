import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Missing Google API key')
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

const systemPrompt = `You are an empathetic mental health AI assistant. Your role is to:
- Provide supportive, non-judgmental responses
- Ask clarifying questions to better understand the user's situation
- Suggest coping strategies and self-care techniques when appropriate
- Recognize signs of serious distress and recommend professional help when needed
- Never provide medical advice or diagnoses
- Maintain a warm, caring tone while being professional`

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message } = await req.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    try {
      // Initialize the model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      // Combine system prompt with user message
      const fullPrompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`

      // Generate response
      const result = await model.generateContent(fullPrompt)
      const response = await result.response

      if (!response.text()) {
        throw new Error('No response from Gemini')
      }

      return NextResponse.json({ 
        response: response.text() 
      })

    } catch (geminiError: any) {
      console.error('Gemini API error:', geminiError)
      
      if (geminiError.message?.includes('API key')) {
        return NextResponse.json(
          { error: 'API key configuration error. Please check your Google API key.' },
          { status: 500 }
        )
      }

      if (geminiError.message?.includes('500')) {
        return NextResponse.json(
          { error: 'AI service temporarily unavailable. Please try again in a moment.' },
          { status: 503 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to generate response. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('General error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get AI response' },
      { status: 500 }
    )
  }
} 