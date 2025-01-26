'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconMessage, IconArrowRight } from '@tabler/icons-react'
import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import PageTransition from '@/components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <main>
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                  AI-Powered Mental Health Support
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  24/7 emotional support and guidance through our advanced AI chat system
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    href="/chat"
                    className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <IconMessage className="w-5 h-5" />
                    Start Chat Now
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Features />
      </main>
    </PageTransition>
  )
}
