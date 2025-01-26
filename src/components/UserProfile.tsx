'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
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
  IconChevronRight
} from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import ProgressChart from './ProgressChart'
import StatsCards from './StatsCards'
import AnalyticsCharts from './AnalyticsCharts'
import AssessmentHistory from './AssessmentHistory'

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

export default function UserProfile() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<'overview' | 'assessments' | 'chats' | 'settings'>('overview')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null)

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
    { id: 'settings', label: 'Settings', icon: IconSettings },
  ]

  const calculateStats = (assessments: UserData['assessments']) => {
    if (!assessments?.length) return null

    const scores = assessments.map(a => a.score)
    return {
      currentScore: scores[0],
      previousScore: scores[1] || scores[0],
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      totalAssessments: assessments.length
    }
  }

  const mockCategoryScores = [
    { category: 'Anxiety', score: 65 },
    { category: 'Depression', score: 45 },
    { category: 'Stress', score: 72 },
    { category: 'Sleep', score: 58 },
    { category: 'Social', score: 80 },
    { category: 'Energy', score: 67 },
  ]

  const mockEmotionDistribution = [
    { emotion: 'Calm', value: 30, color: '#3B82F6' },
    { emotion: 'Happy', value: 25, color: '#10B981' },
    { emotion: 'Anxious', value: 15, color: '#F59E0B' },
    { emotion: 'Sad', value: 10, color: '#EF4444' },
    { emotion: 'Neutral', value: 20, color: '#8B5CF6' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <section className="section py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
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
              <div className="space-y-8">
                <StatsCards 
                  stats={userData?.assessments?.length ? calculateStats(userData.assessments) : null} 
                />

                {/* Progress Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-6">Progress Over Time</h3>
                  {userData?.assessments && userData.assessments.length > 0 ? (
                    <ProgressChart data={userData.assessments} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      Complete an assessment to see your progress
                    </div>
                  )}
                </div>

                {/* Advanced Analytics */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Detailed Analysis</h3>
                  {userData?.assessments?.[0]?.analytics ? (
                    <AnalyticsCharts
                      categoryScores={userData.assessments[0].analytics.categoryScores}
                      emotionDistribution={userData.assessments[0].analytics.emotionDistribution}
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Complete an assessment to see detailed analysis
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
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
                </div>
              </div>
            )}

            {activeTab === 'assessments' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Assessment History</h3>
                <div className="space-y-4">
                  {userData?.assessments?.map((assessment) => (
                    <div
                      key={assessment._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                      {/* Assessment Header - Clickable */}
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
                            <div className="font-medium">
                              {new Date(assessment.createdAt).toLocaleDateString()} 
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              Score: {assessment.score}%
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {assessment.responses.length} questions
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {expandedAssessment === assessment._id && (
                        <div className="p-4 border-t dark:border-gray-700">
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
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chats' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Chat History</h3>
                <div className="space-y-4">
                  {userData?.chatHistory?.map((chat, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(chat.timestamp).toLocaleString()}
                        </span>
                        <span className="text-sm">{chat.sender}</span>
                      </div>
                      <p>{chat.message}</p>
                    </div>
                  ))}
                </div>
              </div>
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
  )
} 