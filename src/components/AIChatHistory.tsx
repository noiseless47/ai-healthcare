'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconSend, IconRobot, IconUser } from '@tabler/icons-react'

type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function AIChatHistory() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          chatHistory: messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response')
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error: any) {
      console.error('Chat error:', error)
      setError(error.message || 'Failed to get AI response')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-semibold">AI Mental Health Support</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Chat with our Groq-powered AI assistant for emotional support and guidance
          </p>
        </div>

        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-auto p-4 scroll-smooth">
          <div className="space-y-4">
            {messages.length === 0 && !isLoading && !error && (
              <div className="text-center text-gray-500 dark:text-gray-400 my-12">
                <IconRobot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start chatting with your AI mental health assistant</p>
                <p className="text-sm mt-2">Ask any question about mental health, stress, anxiety, or how you're feeling today</p>
              </div>
            )}
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${
                  message.sender === 'user' 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {message.sender === 'user' ? (
                    <IconUser className="w-6 h-6" />
                  ) : (
                    <IconRobot className="w-6 h-6" />
                  )}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white ml-auto'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {message.text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <IconRobot className="w-5 h-5" />
                <span>Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} className="h-0" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 mb-4 p-3 text-red-700 bg-red-100 dark:bg-red-900/20 dark:text-red-300 rounded-lg flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">Error connecting to AI</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-1">Please check your API key or try again later.</p>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IconSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 