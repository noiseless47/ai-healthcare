'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconSend } from '@tabler/icons-react'

interface Reply {
  _id: string
  content: string
  author: {
    name: string
    image?: string
    userId?: string
  }
  createdAt: string
}

interface ReplyProps {
  postId: string
  onReplyAdded: (reply: Reply) => void
  onClose: () => void
}

export default function Reply({ postId, onReplyAdded, onClose }: ReplyProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    if (!postId || postId.startsWith('intro-')) {
      setError('Cannot reply to this post')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add reply')
      }

      if (!data.reply) {
        throw new Error('Invalid response from server')
      }

      onReplyAdded(data.reply)
      setContent('')
      onClose()
    } catch (error) {
      console.error('Error adding reply:', error)
      setError(error instanceof Error ? error.message : 'Failed to add reply')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onSubmit={handleSubmit}
      className="mt-4 space-y-4"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
        rows={3}
        className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-shadow"
        required
        disabled={isSubmitting}
      />
      
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm"
        >
          {error}
        </motion.p>
      )}

      <div className="flex justify-end gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          disabled={isSubmitting}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Reply'} <IconSend size={16} />
        </motion.button>
      </div>
    </motion.form>
  )
} 