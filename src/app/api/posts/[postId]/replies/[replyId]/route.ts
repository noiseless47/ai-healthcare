import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import mongoose from 'mongoose'

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string; replyId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(params.postId) || 
        !mongoose.Types.ObjectId.isValid(params.replyId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    // Find post and reply
    const post = await Post.findById(params.postId)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const reply = post.replies.id(params.replyId)
    if (!reply) {
      return NextResponse.json({ error: 'Reply not found' }, { status: 404 })
    }

    // Check if user is authorized to delete the reply
    if (reply.author.userId !== session.user.email) {
      return NextResponse.json({ error: 'Not authorized to delete this reply' }, { status: 403 })
    }

    // Remove the reply
    await Post.findByIdAndUpdate(params.postId, {
      $pull: { replies: { _id: params.replyId } }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting reply:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to delete reply' 
    }, { status: 500 })
  }
} 