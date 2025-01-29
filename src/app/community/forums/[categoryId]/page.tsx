'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconArrowLeft, IconMessage, IconPlus, IconTrash, IconDotsVertical, IconChevronDown } from '@tabler/icons-react'
import NewPostModal from '@/components/NewPostModal'
import { forumCategories } from '@/constants/forums'
import Reply from '@/components/Reply'

interface Post {
  _id: string
  title: string
  content: string
  author: {
    name: string
    image?: string
    userId?: string
  }
  createdAt: string
  replies: Array<{
    _id: string
    content: string
    author: {
      name: string
      image?: string
      userId?: string
    }
    createdAt: string
  }>
  category: string
}

const dummyPosts: Post[] = [
  {
    _id: '1',
    title: 'Welcome to the community!',
    content: 'Share your thoughts and experiences...',
    author: { name: 'Community Manager' },
    createdAt: '2024-01-20',
    replies: [],
    category: 'general'
  },
  // Add more dummy posts
]

export default function CategoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const category = forumCategories.find(cat => cat.id === params.categoryId)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteReplyConfirm, setShowDeleteReplyConfirm] = useState<{postId: string; replyId: string} | null>(null)
  const [isDeletingReply, setIsDeletingReply] = useState(false)
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())

  // Fetch posts for this category
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts?category=${params.categoryId}`)
        const data = await response.json()
        
        // Create intro post with current timestamp
        const introPost = category?.introPost ? {
          _id: `intro-${params.categoryId}`,
          title: category.introPost.title,
          content: category.introPost.content,
          author: {
            name: category.introPost.author
          },
          createdAt: new Date(0).toISOString(),
          category: params.categoryId as string,
          replies: []
        } : null

        setPosts([...data, ...(introPost ? [introPost] : [])])
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setIsLoading(false)
      }
    }

    if (params.categoryId) {
      fetchPosts()
    }
  }, [params.categoryId, category?.introPost])

  // Protect the route
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?returnUrl=/community/forums')
    }
  }, [status, router])

  const handleNewPost = async (data: { title: string; content: string; category: string }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to create post')
      
      const newPost = await response.json()
      setPosts(prevPosts => [newPost, ...prevPosts])
      setIsNewPostOpen(false)
    } catch (error) {
      console.error('Error creating post:', error)
      // Add error handling UI here
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!postId || postId.startsWith('intro-')) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete post')
      }

      // Remove post from local state
      setPosts(prevPosts => prevPosts.filter(p => p._id !== postId))
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting post:', error)
      // You might want to add error handling UI here
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteReply = async (postId: string, replyId: string) => {
    setIsDeletingReply(true);
    try {
      const response = await fetch(`/api/posts/${postId}/replies/${replyId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete reply');
      }

      // Update local state to remove the reply
      setPosts(prevPosts => prevPosts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            replies: post.replies.filter(reply => reply._id !== replyId)
          };
        }
        return post;
      }));
      setShowDeleteReplyConfirm(null);
    } catch (error) {
      console.error('Error deleting reply:', error);
    } finally {
      setIsDeletingReply(false);
    }
  };

  const toggleReplies = (postId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) return null

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <IconArrowLeft className="mr-2" /> Back to Forums
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category?.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{category?.description}</p>
          </div>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsNewPostOpen(true)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Create New Post"
          >
            <IconPlus size={24} />
          </motion.button>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg relative"
            >
              {/* Post Menu (only show for author) */}
              {post.author?.userId === session?.user?.email && !post._id.startsWith('intro-') && (
                <div className="absolute top-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(post._id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <IconTrash size={18} />
                  </motion.button>
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm === post._id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4 shadow-xl"
                  >
                    <h3 className="text-xl font-semibold mb-4">Delete Post</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        disabled={isDeleting}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                      >
                        {isDeleting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <IconTrash size={18} />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>By {post.author?.name || 'Anonymous'}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                {!post._id.startsWith('intro-') && (
                  <div className="flex items-center gap-4">
                    {/* Reply Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setReplyingTo(replyingTo === post._id ? null : post._id)}
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      <IconMessage size={16} />
                      <span>Reply</span>
                    </motion.button>

                    {/* Replies Toggle Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleReplies(post._id)}
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      <span>{post.replies?.length || 0} replies</span>
                      <motion.div
                        animate={{ rotate: expandedReplies.has(post._id) ? 180 : 0 }}
                        className="transition-transform"
                      >
                        <IconChevronDown size={16} />
                      </motion.div>
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Replies Section */}
              {post.replies?.length > 0 && expandedReplies.has(post._id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-4"
                >
                  {post.replies.map((reply) => (
                    <div key={`${post._id}-${reply._id}`} className="text-sm relative group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                          <span className="font-medium">
                            {reply.author?.name || 'Anonymous User'}
                          </span>
                          <span>•</span>
                          <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                        </div>
                        {reply.author?.userId === session?.user?.email && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 transition-all duration-200"
                            onClick={() => setShowDeleteReplyConfirm({ postId: post._id, replyId: reply._id })}
                          >
                            <IconTrash size={14} />
                          </motion.button>
                        )}
                      </div>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">{reply.content}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Reply Form */}
              {replyingTo === post._id && !post._id.startsWith('intro-') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <Reply
                    postId={post._id}
                    onReplyAdded={(newReply) => {
                      setPosts(prevPosts =>
                        prevPosts.map(p =>
                          p._id === post._id
                            ? { ...p, replies: [...(p.replies || []), newReply] }
                            : p
                        )
                      )
                      setReplyingTo(null)
                      setExpandedReplies(prev => new Set([...prev, post._id]))
                    }}
                    onClose={() => setReplyingTo(null)}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSubmit={handleNewPost}
        categories={[{ id: params.categoryId as string, title: category?.title || '' }]}
        hideCategory={true}
      />

      {/* Delete Reply Confirmation Modal */}
      {showDeleteReplyConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4">Delete Reply</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this reply? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteReplyConfirm(null)}
                disabled={isDeletingReply}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteReply(showDeleteReplyConfirm.postId, showDeleteReplyConfirm.replyId)}
                disabled={isDeletingReply}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isDeletingReply ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <IconTrash size={18} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
} 