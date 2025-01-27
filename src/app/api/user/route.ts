import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { User } from '@/lib/models/User'
import { Assessment } from '@/lib/models/Assessment'
import dbConnect from '@/lib/mongoose'

export async function GET(req: Request) {
  try {
    await dbConnect()
    
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // First find or create the user
    let user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image
      })
    }

    // Find all assessments for this user
    const assessments = await Assessment.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .select('_id createdAt score responses summary recommendations analytics')

    // Update user's assessments array if needed
    if (assessments.length > 0 && (!user.assessments || user.assessments.length !== assessments.length)) {
      user.assessments = assessments.map(assessment => assessment._id)
      await user.save()
    }

    // Return user data with populated assessments
    const userData = {
      ...user.toObject(),
      assessments: assessments
    }

    console.log('Sending user data with assessments:', {
      assessmentCount: assessments.length,
      firstAssessment: assessments[0]
    })

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