'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">MindAI</span> - Early Detection of Mental Health Issues
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Using AI to detect early signs of depression and anxiety, providing timely support and resources for mental well-being.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/assessment"
              className="btn-primary px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Take Assessment
            </Link>
            <Link
              href="/about"
              className="btn-secondary px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 