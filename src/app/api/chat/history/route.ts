import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectDB from '@/lib/mongodb'
import ChatMessage from '@/models/ChatMessage'

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const messages = await ChatMessage.find({ userId: session.user.email })
      .sort({ timestamp: -1 })
      .limit(100) // Limit to last 100 messages

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Failed to fetch chat history:', error)
    return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 })
  }
} 