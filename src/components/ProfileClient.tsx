'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PageTransition from '@/components/PageTransition'

export default function ProfileClient() {
  const { data: session } = useSession()
  const [journalEntries, setJournalEntries] = useState([])

  useEffect(() => {
    if (session) {
      fetchJournalEntries()
    }
  }, [session])

  const fetchJournalEntries = async () => {
    try {
      const response = await fetch('/api/journal')
      if (response.ok) {
        const data = await response.json()
        setJournalEntries(data)
      }
    } catch (error) {
      console.error('Failed to fetch journal entries:', error)
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
                Your Profile
              </h1>

              {/* User Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <div className="flex items-center gap-4">
                  {session?.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Journal Entries */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Your Journal Entries</h2>
                <div className="space-y-4">
                  {journalEntries.map((entry: any) => (
                    <div
                      key={entry._id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <span className="text-2xl">{entry.mood}</span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200">{entry.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
} 