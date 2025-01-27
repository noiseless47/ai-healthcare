'use client'

import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { fadeIn, slideUp } from '@/utils/animations'
import Link from 'next/link'

export default function EarlyDetectionAboutPage() {
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
              Early Detection of Mental Health Issues
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Using AI to identify early signs and provide timely support
            </p>
          </motion.div>

          <motion.div variants={slideUp} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Approach</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-powered assessment system analyzes various factors to identify potential mental 
                health concerns early. By detecting patterns and signs early, we can provide timely 
                intervention and support when it matters most.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Assessment Process</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Comprehensive mental health evaluation</li>
                <li>AI-powered pattern recognition</li>
                <li>Personalized risk assessment</li>
                <li>Detailed insights and recommendations</li>
                <li>Progress tracking over time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Take Action</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Complete our assessment to receive personalized insights and recommendations for your 
                mental well-being.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/assessment"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Take Assessment
                </Link>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </main>
    </PageTransition>
  )
} 