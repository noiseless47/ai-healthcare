'use client'

import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { fadeIn, slideUp } from '@/utils/animations'
import Link from 'next/link'

export default function MentalHealthAboutPage() {
  return (
    <PageTransition>
      <main className="pt-24 pb-16 px-4">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto space-y-12"
        >
          <motion.div variants={slideUp} className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              AI-Powered Mental Health Support
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              24/7 emotional support and guidance through advanced AI technology
            </p>
          </motion.div>

          <motion.div variants={slideUp} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">How It Works</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-powered chat system provides immediate, empathetic support whenever you need it. 
                Using advanced natural language processing, our system understands your concerns and 
                offers personalized guidance and coping strategies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>24/7 availability for immediate support</li>
                <li>Personalized conversations and recommendations</li>
                <li>Evidence-based coping strategies</li>
                <li>Progress tracking and mood monitoring</li>
                <li>Complete privacy and confidentiality</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Get Started</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Begin your journey to better mental well-being today. Our AI assistant is ready to 
                listen and support you through your challenges.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/chat"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Chat Now
                </Link>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </main>
    </PageTransition>
  )
} 