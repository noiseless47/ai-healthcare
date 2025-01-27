'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconMessage, IconInfoCircle, IconBrain } from '@tabler/icons-react'
import { fadeIn, slideUp } from '@/utils/animations'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      {/* AI-Powered Mental Health Support Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="text-center mb-24 mt-32"
      >
        <motion.h1
          variants={slideUp}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          <span className="gradient-text">CareAI</span> - Mental Health Support
        </motion.h1>
        <motion.p
          variants={slideUp}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          24/7 emotional support and guidance through our advanced AI chat system
        </motion.p>
        <motion.div
          variants={slideUp}
          className="flex justify-center gap-4"
        >
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <IconMessage className="w-5 h-5" />
            Start Chat Now
          </Link>
          <Link
            href="/about/mental-health"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
          >
            <IconInfoCircle className="w-5 h-5" />
            Learn More
          </Link>
        </motion.div>
      </motion.div>

      {/* MindAI Section */}
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">MindAI</span> - Early Detection of Mental Health Issues
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Using AI to detect early signs of depression and anxiety, providing timely support and resources for mental well-being.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/assessment"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <IconBrain className="w-5 h-5" />
              Take Assessment
            </Link>
            <Link
              href="/about/early-detection"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              <IconInfoCircle className="w-5 h-5" />
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 