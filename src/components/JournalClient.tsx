'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { IconPencil, IconMoodSmile, IconBrain, IconCalendar, IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import PageTransition from '@/components/PageTransition'
import { useSession } from 'next-auth/react'

interface JournalEntry {
  _id: string
  date: string
  content: string
  mood: string
  aiAnalysis?: {
    emotions: string[]
    insights: string[]
    suggestions: string[]
  }
}

export default function JournalClient() {
  const { data: session } = useSession()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      fetchEntries()
    }
  }, [session])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/journal')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error)
    }
  }

  const handleSubmit = async () => {
    if (!newEntry.trim() || !session) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newEntry,
          mood: '😊',
          date: new Date().toISOString()
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save entry')
      }

      const entry = await response.json()
      setEntries([entry, ...entries])
      setNewEntry('')
    } catch (error) {
      console.error('Failed to save entry:', error)
      alert('Failed to save entry. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

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
                AI Journal
              </h1>

              {/* New Entry Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Write a New Entry</h2>
                <textarea
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="How are you feeling today?"
                  className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[200px] mb-4"
                  disabled={isLoading}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <IconPencil className="w-5 h-5" />
                        Save Entry
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Journal Entries */}
              <div className="space-y-6">
                {entries.map((entry) => (
                  <motion.div
                    key={entry._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    {/* Entry Header - Now a button for expanding */}
                    <button
                      onClick={() => setExpandedEntry(expandedEntry === entry._id ? null : entry._id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {expandedEntry === entry._id ? (
                          <IconChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <IconChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                        <div className="text-left">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <IconCalendar className="w-5 h-5" />
                            <span>{new Date(entry.date).toLocaleDateString()}</span>
                            <span className="text-sm">
                              {new Date(entry.date).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-2xl mt-1">{entry.mood}</div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedEntry === entry._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t dark:border-gray-700"
                        >
                          <div className="p-4">
                            <p className="text-gray-800 dark:text-gray-200 mb-6">
                              {entry.content}
                            </p>

                            {entry.aiAnalysis && (
                              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                  <IconBrain className="w-5 h-5" />
                                  AI Analysis
                                </h3>
                                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                                  <div>
                                    <h4 className="font-medium mb-2">Emotions detected:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {entry.aiAnalysis.emotions.map((emotion, i) => (
                                        <span
                                          key={i}
                                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full"
                                        >
                                          {emotion}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Insights:</h4>
                                    <ul className="list-disc list-inside space-y-1 pl-2">
                                      {entry.aiAnalysis.insights.map((insight, i) => (
                                        <li key={i}>{insight}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Suggestions:</h4>
                                    <ul className="list-disc list-inside space-y-1 pl-2">
                                      {entry.aiAnalysis.suggestions.map((suggestion, i) => (
                                        <li key={i}>{suggestion}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
} 