'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import Navbar from './Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { IconMessage, IconBrain } from '@tabler/icons-react'
import { NextAuthProvider } from '@/providers/auth'

export default function RootLayoutClient({
  children,
  fonts
}: {
  children: React.ReactNode
  fonts: string
}) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <Navbar />
        {children}
        <Footer />
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col-reverse gap-4 z-50">
          <Link
            href="/chat"
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Open AI Chat"
          >
            <IconMessage className="w-6 h-6" />
          </Link>
          <Link
            href="/assessment"
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            aria-label="Take Assessment"
          >
            <IconBrain className="w-6 h-6" />
          </Link>
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
} 