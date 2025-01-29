import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import mongoose from 'mongoose'

export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(params.postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    // Find post and check ownership
    const post = await Post.findById(params.postId)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Only allow the author or admin to delete the post
    if (post.author.userId !== session.user.email) {
      return NextResponse.json({ error: 'Not authorized to delete this post' }, { status: 403 })
    }

    // Delete the post
    await Post.findByIdAndDelete(params.postId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to delete post' 
    }, { status: 500 })
  }
} 