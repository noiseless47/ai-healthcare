'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  IconEdit, 
  IconLogout, 
  IconMoon, 
  IconSun, 
  IconBrain,
  IconMessage,
  IconChartLine,
  IconSettings,
  IconChevronDown,
  IconChevronRight,
  IconBook,
  IconCalendar
} from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import ProgressChart from './ProgressChart'
import StatsCards from './StatsCards'
import AnalyticsCharts from './AnalyticsCharts'
import AssessmentHistory from './AssessmentHistory'
import PageTransition from './PageTransition'
import Link from 'next/link'

type Assessment = {
  _id: string
  createdAt: string
  score: number
  responses: Array<{
    question: string
    answer: string
  }>
  summary: string
  recommendations: string[]
  analytics: {
    categoryScores: Array<{
      category: string
      score: number
    }>
    emotionDistribution: Array<{
      emotion: string
      value: number
      color: string
    }>
  }
}

type UserData = {
  email: string
  name: string
  image: string
  assessments: Assessment[]
  chatHistory: Array<{
    timestamp: string
    message: string
    sender: string
  }>
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: {
      email: boolean
    }
  }
}

type JournalEntry = {
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

type ChatMessage = {
  _id: string
  timestamp: string
  message: string
  sender: 'user' | 'ai'
  userId: string
}

export default function UserProfile() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<'overview' | 'assessments' | 'chats' | 'journal' | 'settings'>('overview')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null)
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        console.log('User Data:', data)
        // Ensure assessments is always an array
        setUserData({
          ...data,
          assessments: Array.isArray(data.assessments) ? data.assessments : []
        })
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      fetchUserData()
    }
  }, [session])

  useEffect(() => {
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

    if (session?.user) {
      fetchJournalEntries()
    }
  }, [session])

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('/api/chat/history')
        if (response.ok) {
          const data = await response.json()
          console.log('Chat history:', data)
          setChatHistory(data)
        } else {
          console.error('Failed to fetch chat history:', await response.text())
        }
      } catch (error) {
        console.error('Failed to fetch chat history:', error)
      }
    }

    if (session?.user) {
      fetchChatHistory()
    }
  }, [session])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const updatePreferences = async (preferences: Partial<UserData['preferences']>) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences })
      })
      const data = await response.json()
      setUserData(prev => prev ? { ...prev, ...data } : data)
    } catch (error) {
      console.error('Failed to update preferences:', error)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: IconChartLine },
    { id: 'assessments', label: 'Assessments', icon: IconBrain },
    { id: 'chats', label: 'Chat History', icon: IconMessage },
    { id: 'journal', label: 'Journal', icon: IconBook },
    { id: 'settings', label: 'Settings', icon: IconSettings },
  ]

  const calculateStats = (assessments: UserData['assessments']) => {
    if (!assessments?.length) return null

    const scores = assessments.map(a => a.score)
    return {
      currentScore: scores[0],
      previousScore: scores[1] || scores[0],
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      totalAssessments: assessments.length,
      totalChats: chatHistory.length,
      totalJournals: journalEntries.length
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <PageTransition>
      <main className="min-h-screen pt-16">
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              {/* Profile Header */}
              <div className="p-8 border-b dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold gradient-text">Your Profile</h1>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <IconLogout className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  {session?.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-20 h-20 rounded-full"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{session?.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b dark:border-gray-700">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-500'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <StatsCards 
                        stats={userData?.assessments?.length ? calculateStats(userData.assessments) : null} 
                      />
                    </motion.div>

                    {/* Progress Chart */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                    >
                      <h3 className="text-xl font-semibold mb-6">Progress Over Time</h3>
                      {userData?.assessments && userData.assessments.length > 0 ? (
                        <ProgressChart data={userData.assessments} />
                      ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                          Complete an assessment to see your progress
                        </div>
                      )}
                    </motion.div>

                    {/* Advanced Analytics */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                    >
                      <h3 className="text-xl font-semibold mb-6">Detailed Analysis</h3>
                      {console.log('All assessments:', userData?.assessments)}
                      {console.log('Latest assessment:', userData?.assessments?.[0])}
                      {console.log('Analytics data:', userData?.assessments?.[0]?.analytics)}
                      {console.log('Category scores:', userData?.assessments?.[0]?.analytics?.categoryScores)}
                      {console.log('Emotion distribution:', userData?.assessments?.[0]?.analytics?.emotionDistribution)}
                      
                      {userData?.assessments?.[0]?.analytics?.categoryScores && 
                       userData?.assessments?.[0]?.analytics?.emotionDistribution ? (
                        <AnalyticsCharts
                          categoryScores={userData.assessments[0].analytics.categoryScores}
                          emotionDistribution={userData.assessments[0].analytics.emotionDistribution}
                        />
                      ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                          {userData?.assessments?.length ? 
                            'Analytics data not available for this assessment' : 
                            'Complete an assessment to see detailed analysis'}
                        </div>
                      )}
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                    >
                      <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                      <div className="space-y-4">
                        {userData?.assessments?.slice(0, 5).map((assessment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">Assessment Completed</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {new Date(assessment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{assessment.score}%</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {assessment.responses.length} questions
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === 'assessments' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">Assessment History</h3>
                    <div className="space-y-4">
                      {userData?.assessments.map((assessment) => (
                        <motion.div
                          key={assessment._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedAssessment(
                              expandedAssessment === assessment._id ? null : assessment._id
                            )}
                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              {expandedAssessment === assessment._id ? (
                                <IconChevronDown className="w-5 h-5 text-gray-500" />
                              ) : (
                                <IconChevronRight className="w-5 h-5 text-gray-500" />
                              )}
                              <div className="text-left">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                  <IconCalendar className="w-5 h-5" />
                                  <span>{new Date(assessment.createdAt).toLocaleDateString()}</span>
                                  <span className="text-sm">
                                    {new Date(assessment.createdAt).toLocaleTimeString()}
                                  </span>
                                </div>
                                <div className="font-medium mt-1">
                                  Score: {assessment.score}
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {expandedAssessment === assessment._id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 border-t dark:border-gray-700"
                              >
                                {/* Summary Section */}
                                <div className="mb-6">
                                  <h4 className="font-medium mb-2">Summary</h4>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {assessment.summary}
                                  </p>
                                </div>

                                {/* Recommendations Section */}
                                <div className="mb-6">
                                  <h4 className="font-medium mb-2">Recommendations</h4>
                                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                    {assessment.recommendations.map((rec, index) => (
                                      <li key={index}>{rec}</li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Analytics Section */}
                                {assessment.analytics && (
                                  <div className="pt-4 border-t dark:border-gray-700">
                                    <h4 className="font-medium mb-4">Detailed Analysis</h4>
                                    <AnalyticsCharts
                                      categoryScores={assessment.analytics.categoryScores}
                                      emotionDistribution={assessment.analytics.emotionDistribution}
                                    />
                                  </div>
                                )}

                                {/* Responses Section */}
                                <div className="mt-6 pt-4 border-t dark:border-gray-700">
                                  <h4 className="font-medium mb-2">Responses</h4>
                                  <div className="space-y-3">
                                    {assessment.responses.map((response, index) => (
                                      <div 
                                        key={index}
                                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                                      >
                                        <div className="font-medium mb-1">
                                          {response.question}
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300 flex justify-between">
                                          <span>{response.answer}</span>
                                          <span className="text-sm">Score: {response.score}/5</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'chats' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">Chat History</h3>
                    <div className="space-y-4">
                      {chatHistory.length > 0 ? (
                        chatHistory.map((message) => (
                          <motion.div
                            key={message._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-blue-50 dark:bg-blue-900/30 ml-auto' 
                                : 'bg-gray-50 dark:bg-gray-700'
                            } max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">
                                {message.sender === 'user' ? 'You' : 'AI Assistant'}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200">{message.message}</p>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <p>No chat history available</p>
                          <Link 
                            href="/chat" 
                            className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
                          >
                            Start a new chat
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'journal' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">Journal History</h3>
                    <div className="space-y-4">
                      {journalEntries.map((entry, index) => (
                        <motion.div
                          key={entry._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedEntry(
                              expandedEntry === entry._id ? null : entry._id
                            )}
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
                                      <h4 className="font-medium mb-2 flex items-center gap-2">
                                        <IconBrain className="w-5 h-5" />
                                        AI Analysis
                                      </h4>
                                      <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div>
                                          <h5 className="font-medium mb-2">Emotions detected:</h5>
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
                                          <h5 className="font-medium mb-2">Insights:</h5>
                                          <ul className="list-disc list-inside space-y-1 pl-2">
                                            {entry.aiAnalysis.insights.map((insight, i) => (
                                              <li key={i}>{insight}</li>
                                            ))}
                                          </ul>
                                        </div>

                                        <div>
                                          <h5 className="font-medium mb-2">Suggestions:</h5>
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
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Preferences</h3>
                      
                      {/* Theme Toggle */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span>Theme</span>
                        <button
                          onClick={() => {
                            const newTheme = theme === 'dark' ? 'light' : 'dark'
                            setTheme(newTheme)
                            updatePreferences({ theme: newTheme })
                          }}
                          className="p-2 rounded-lg bg-white dark:bg-gray-600"
                        >
                          {theme === 'dark' ? (
                            <IconSun className="w-5 h-5" />
                          ) : (
                            <IconMoon className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Notification Settings */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span>Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userData?.preferences?.notifications?.email}
                            onChange={(e) => updatePreferences({
                              notifications: { email: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  )
} 