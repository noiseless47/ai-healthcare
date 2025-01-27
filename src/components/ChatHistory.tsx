'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconMessage, IconCalendar, IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'

type ChatSession = {
  id: string
  date: string
  preview: string
  messageCount: number
}

export default function ChatHistory() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchChatHistory = async () => {
      setIsLoading(true)
      try {
        // Simulated API response
        const mockSessions: ChatSession[] = [
          {
            id: '1',
            date: '2024-03-15',
            preview: "Discussion about managing anxiety and stress",
            messageCount: 12
          },
          {
            id: '2',
            date: '2024-03-14',
            preview: "Exploring coping strategies for work-related stress",
            messageCount: 8
          },
          // Add more mock sessions as needed
        ]
        setChatSessions(mockSessions)
      } catch (error) {
        console.error('Failed to fetch chat history:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChatHistory()
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-2xl font-bold">Chat History</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          View your previous chat sessions
        </p>
      </div>

      {/* Chat Sessions List */}
      <div className="divide-y dark:divide-gray-700">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading chat history...
          </div>
        ) : chatSessions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No chat sessions found
          </div>
        ) : (
          chatSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
              className="p-4"
            >
              <Link href={`/chat/${session.id}`} className="block">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <IconMessage className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <IconCalendar className="w-4 h-4" />
                        {new Date(session.date).toLocaleDateString()}
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {session.messageCount} messages
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700 dark:text-gray-200">
                        {session.preview}
                      </p>
                    </div>
                  </div>
                  <IconChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
        <Link 
          href="/chat"
          className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <IconMessage className="w-5 h-5" />
          Start New Chat
        </Link>
      </div>
    </div>
  )
} 