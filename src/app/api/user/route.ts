import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { User } from '@/lib/models/User'
import dbConnect from '@/lib/mongoose'

export async function GET(req: Request) {
  try {
    await dbConnect()
    
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await User.findOne({ email: session.user.email })
      .populate({
        path: 'assessments',
        options: { 
          sort: { createdAt: -1 } 
        },
        select: '_id createdAt score responses summary recommendations analytics'
      })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = user.toObject()
    userData.assessments = userData.assessments || []

    console.log('User Data with Assessments:', userData)

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect()
    
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: data },
      { new: true, upsert: true }
    )

    return NextResponse.json(user)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    )
  }
} 