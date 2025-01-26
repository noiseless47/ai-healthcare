'use client'

import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-6"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to MindAI</h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full p-3 flex items-center justify-center gap-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  )
} 