'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconSend, IconRobot, IconUser, IconMicrophone, IconPaperclip } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function ChatInterface() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    // Load messages from database
    const loadMessages = async () => {
      const response = await fetch('/api/messages')
      const data = await response.json()
      if (data.length === 0) {
        // Add welcome message if no history
        const welcomeMessage = {
          id: '1',
          text: "Hello! I'm your AI mental health assistant. How are you feeling today?",
          sender: 'ai' as const,
          timestamp: new Date()
        }
        setMessages([welcomeMessage])
        await saveMessage(welcomeMessage)
      } else {
        setMessages(data.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })))
      }
    }
    
    if (session?.user) {
      loadMessages()
    }
  }, [session])

  const saveMessage = async (message: Message) => {
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
  }

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
    setIsTyping(true)
    await saveMessage(userMessage)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          chatHistory: messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        })
      })

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      await saveMessage(aiMessage)
    } catch (error) {
      console.error('Failed to get AI response:', error)
      // Add error handling UI
    } finally {
      setIsTyping(false)
    }
  }

  // Add voice recording functionality
  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // Implement voice recording logic
  }

  // Add file upload functionality
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Implement file upload logic
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-[calc(100vh-8rem)]">
        {/* Chat Header */}
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-semibold">AI Support Chat</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Available 24/7 for support and guidance
          </p>
        </div>

        {/* Messages Container */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'ai' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {message.sender === 'ai' ? (
                    <IconRobot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <IconUser className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div className={`max-w-[80%] p-4 rounded-xl ${
                  message.sender === 'ai' 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <p>{message.text}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <IconRobot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex gap-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceRecord}
              className={`p-2 rounded-lg ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700'
              } transition-colors`}
            >
              <IconMicrophone className="w-5 h-5" />
            </button>
            
            <label className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-pointer">
              <IconPaperclip className="w-5 h-5" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,.pdf"
              />
            </label>

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
              disabled={!input.trim()}
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