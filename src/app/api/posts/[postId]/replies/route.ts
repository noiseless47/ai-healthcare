import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import mongoose from 'mongoose'

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    const data = await req.json()

    // Validate content
    if (!data.content?.trim()) {
      return NextResponse.json({ error: 'Reply content is required' }, { status: 400 })
    }

    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(params.postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    const post = await Post.findById(params.postId)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Create the reply document
    const reply = {
      content: data.content.trim(),
      author: {
        name: session.user?.name || 'Anonymous',
        image: session.user?.image || null,
        userId: session.user?.email || null
      }
    }

    // Add reply to post using MongoDB's $push operator
    const updatedPost = await Post.findByIdAndUpdate(
      params.postId,
      { $push: { replies: reply } },
      { new: true, runValidators: true }
    )

    if (!updatedPost) {
      return NextResponse.json({ error: 'Failed to add reply' }, { status: 500 })
    }

    // Get the newly added reply (it will be the last one in the array)
    const newReply = updatedPost.replies[updatedPost.replies.length - 1]

    return NextResponse.json({ 
      reply: {
        _id: newReply._id.toString(),
        content: newReply.content,
        author: newReply.author,
        createdAt: newReply.createdAt
      }
    })

  } catch (error) {
    console.error('Error adding reply:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to add reply' 
    }, { status: 500 })
  }
} 