'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import PageTransition from '@/components/PageTransition'

export default function MoodTrackerClient() {
  const [moodData, setMoodData] = useState([])

  return (
    <PageTransition>
      <main className="min-h-screen pt-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold mb-8 gradient-text text-center">
                Mood Tracker
              </h1>
              
              {/* Mood Input Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">How are you feeling today?</h2>
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Add a note about your mood (optional)"
                    className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    rows={3}
                  />
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Entry
                  </button>
                </div>
              </div>

              {/* Mood History Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Mood History</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rating" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
} 