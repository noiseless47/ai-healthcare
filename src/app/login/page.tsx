'use client'

import { signIn } from 'next-auth/react'
import { IconBrandGoogle, IconHeartHandshake } from '@tabler/icons-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="h-24" />
      
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <IconHeartHandshake className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-serif font-medium text-gray-900 dark:text-white">
              Your mental health journey,
              <br />
              supported by AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Privacy-first mental health support that helps you grow in confidence.
            </p>
          </motion.div>
        </div>

        {/* Sign In Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 space-y-6 border border-gray-200 dark:border-gray-700"
        >
          {/* Google Sign In Button */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl
                     bg-white hover:bg-gray-50 
                     text-gray-800 font-medium
                     border-2 border-gray-200 
                     shadow-sm hover:shadow
                     transition-all duration-200"
          >
            <IconBrandGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">or</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your personal or work email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-900 
                       text-gray-900 dark:text-white
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full py-3 px-4 rounded-lg
                       bg-blue-600 hover:bg-blue-700
                       text-white font-medium
                       transition-colors duration-200"
            >
              Continue with email
            </button>
          </div>
        </motion.div>

        {/* Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-center text-gray-500 dark:text-gray-400"
        >
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </motion.p>
      </div>
    </main>
  )
} 