'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconMessage, IconUsers, IconHeart, IconBulb, IconPlus } from '@tabler/icons-react'
import NewPostModal from '@/components/NewPostModal'
import { forumCategories } from '@/constants/forums'

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    image?: string
  }
  createdAt: string
  category: string
}

export default function CommunityForums() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [categoryPosts, setCategoryPosts] = useState<Record<string, number>>({})

  // Fetch post counts for each category
  useEffect(() => {
    const fetchPostCounts = async () => {
      try {
        const response = await fetch('/api/posts')
        const posts = await response.json()
        
        const counts = posts.reduce((acc: Record<string, number>, post: Post) => {
          acc[post.category] = (acc[post.category] || 0) + 1
          return acc
        }, {})

        setCategoryPosts(counts)
      } catch (error) {
        console.error('Error fetching post counts:', error)
      }
    }

    fetchPostCounts()
  }, [])

  // Protect the route
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?returnUrl=/community/forums')
    }
  }, [status, router])

  // Show loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Only render content for authenticated users
  if (!session) return null

  const handleNewPost = async (data: { title: string; content: string; category: string }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to create post')

      // Update local post count
      setCategoryPosts(prev => ({
        ...prev,
        [data.category]: (prev[data.category] || 0) + 1
      }))

      // Navigate to category
      router.push(`/community/forums/${data.category}`)
    } catch (error) {
      console.error('Error creating post:', error)
      // Add error handling UI here
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <main className="min-h-screen pt-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold"
            >
              Community Forums
            </motion.h1>
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
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 mt-2"
          >
            Welcome back, {session.user?.name}
          </motion.p>
        </motion.div>

        {/* Forum Categories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {forumCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              onClick={() => router.push(`/community/forums/${category.id}`)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg"
                >
                  <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span>{(categoryPosts[category.id] || 0) + 1} posts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Guidelines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-blue-50 dark:bg-gray-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Community Guidelines</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Be respectful and supportive of others</li>
            <li>Maintain confidentiality and privacy</li>
            <li>No hate speech or discrimination</li>
            <li>Seek professional help for medical advice</li>
          </ul>
        </motion.div>
      </motion.div>

      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSubmit={handleNewPost}
        categories={forumCategories}
      />
    </main>
  )
} 