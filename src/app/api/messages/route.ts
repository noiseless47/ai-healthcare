import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db('mindai')
    
    const messages = await db
      .collection('messages')
      .find({ userEmail: session.user.email })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message } = await req.json()
    const client = await clientPromise
    const db = client.db('mindai')
    
    const result = await db.collection('messages').insertOne({
      ...message,
      userEmail: session.user.email,
      timestamp: new Date()
    })

    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    )
  }
} 