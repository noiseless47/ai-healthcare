import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ChatMessage from '@/models/ChatMessage'
import connectDB from '@/lib/mongodb'

if (!process.env.GROQ_API_KEY) {
  throw new Error('Missing Groq API key')
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const systemPrompt = `You are an empathetic mental health AI assistant. Your role is to:
- Provide supportive, non-judgmental responses
- Ask clarifying questions to better understand the user's situation
- Suggest coping strategies and self-care techniques when appropriate
- Recognize signs of serious distress and recommend professional help when needed
- Never provide medical advice or diagnoses
- Maintain a warm, caring tone while being professional
- Remember and reference previous parts of the conversation when relevant`

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
      // Get recent chat history
      await connectDB()
      const recentMessages = await ChatMessage.find({ userId: session.user.email })
        .sort({ timestamp: -1 })
        .limit(10) // Get last 10 messages
        .lean()

      // Format chat history for the API
      const messages = [
        { role: "system", content: systemPrompt },
      ];

      // Add chat history
      recentMessages.reverse().forEach(msg => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.message
        });
      });

      // Add current message
      messages.push({
        role: 'user',
        content: message
      });

      // Call Groq API
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Groq's Llama 3 8B model, which is fast and has a free tier
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Groq API error response:', data);
        throw new Error(`Groq API error: ${data.error?.message || JSON.stringify(data)}`);
      }

      const aiResponse = data.choices[0].message.content;

      // Save both messages to database
      await connectDB()
      
      // Save user message
      await ChatMessage.create({
        userId: session.user.email,
        message: message,
        sender: 'user',
        timestamp: new Date()
      })

      // Save AI response
      await ChatMessage.create({
        userId: session.user.email,
        message: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      })

      return NextResponse.json({ 
        response: aiResponse 
      })

    } catch (groqError: any) {
      console.error('Groq API error:', groqError)
      
      if (groqError.message?.includes('API key')) {
        return NextResponse.json(
          { error: 'API key configuration error. Please check your Groq API key.' },
          { status: 500 }
        )
      }

      if (groqError.message?.includes('500')) {
        return NextResponse.json(
          { error: 'AI service temporarily unavailable. Please try again in a moment.' },
          { status: 503 }
        )
      }

      // Pass through the actual error message to help with debugging
      return NextResponse.json(
        { error: groqError.message || 'Failed to generate response. Please try again.' },
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