'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AssessmentResults() {
  // Mock results - in a real app, this would come from your backend
  const results = {
    score: 75,
    severity: "Mild",
    recommendations: [
      "Consider scheduling regular check-ins with a mental health professional",
      "Practice daily mindfulness exercises",
      "Maintain a regular sleep schedule",
      "Engage in regular physical activity"
    ],
    resources: [
      { title: "Guided Meditation Series", link: "/resources/meditation" },
      { title: "Stress Management Guide", link: "/resources/stress" },
      { title: "Sleep Hygiene Tips", link: "/resources/sleep" }
    ]
  }

  return (
    <section className="section py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 gradient-text text-center">Your Assessment Results</h1>
          
          {/* Score Display */}
          <div className="mb-12 text-center">
            <div className="inline-block p-8 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {results.score}/100
              </span>
            </div>
            <p className="mt-4 text-xl">
              Severity Level: <span className="font-semibold">{results.severity}</span>
            </p>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <ul className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  {rec}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Suggested Resources */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Suggested Resources</h2>
            <div className="grid gap-4">
              {results.resources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.link}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {resource.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/chat"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Talk to AI Support
            </Link>
            <Link
              href="/professionals"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              Connect with Professional
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 