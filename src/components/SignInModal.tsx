'use client'

import { signIn } from 'next-auth/react'
import { IconBrandGoogle, IconLock } from '@tabler/icons-react'
import { motion } from 'framer-motion'

export default function SignInModal() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconLock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-blue-100 text-center">
              Sign in to access your mental health support
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 bg-gray-50 dark:bg-gray-900 space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Secure & Confidential
            </h3>
            <ul className="text-left space-y-4 max-w-xs mx-auto">
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                </span>
                <span>Access personalized mental health assessments</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                </span>
                <span>Track your progress over time</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                </span>
                <span>Get personalized recommendations</span>
              </li>
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl
                       bg-white dark:bg-white
                       text-gray-800 dark:text-gray-800
                       hover:bg-gray-50 dark:hover:bg-gray-100
                       border border-gray-200
                       shadow-lg hover:shadow-xl
                       transition-all duration-200
                       font-semibold"
          >
            <IconBrandGoogle className="w-6 h-6" />
            Sign in with Google
          </motion.button>
        </div>

        {/* Footer */}
        <div className="bg-white dark:bg-gray-800 p-4 text-center text-sm border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 