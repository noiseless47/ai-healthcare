'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconSend, IconRobot, IconUser } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import AIChatHistory from '@/components/AIChatHistory'

type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

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
    <PageTransition>
      <div className="relative min-h-screen pt-16">
        {/* Grid Background with Animated Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-black/[0.02]" />
          
          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent dark:from-blue-400/10" />
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-cyan-400/30 dark:from-indigo-500/20 dark:to-cyan-500/20 rounded-full blur-3xl animate-float animation-delay-2000" />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Content */}
        <main className="relative z-10">
          <AIChatHistory />
        </main>
      </div>
    </PageTransition>
  )
} 