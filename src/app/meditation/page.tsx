'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { IconMoonStars, IconSun, IconHeart, IconBrain, IconZzz, IconLeaf, IconStar } from '@tabler/icons-react'
import PageTransition from '@/components/PageTransition'
import { useMeditationPlayer } from '@/contexts/MeditationPlayerContext'
import { memo } from 'react'

// Add progress and achievements interfaces
interface UserProgress {
  completedSessions: number;
  favorites: string[];
  achievements: Achievement[];
  sessionHistory: {
    id: string;
    date: string;
    duration: number;
  }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const meditations = [
  {
    id: 'morning',
    title: 'Morning Meditation',
    description: 'Start your day with clarity and purpose',
    duration: '10 min',
    audioFile: '/meditations/morning.mp3',
    icon: IconSun,
    category: 'Daily Practice',
    benefits: ['Increased focus', 'Reduced morning anxiety', 'Better productivity']
  },
  {
    id: 'stress',
    title: 'Stress Relief',
    description: 'Quick relief from anxiety and stress',
    duration: '5 min',
    audioFile: '/meditations/stress.mp3',
    icon: IconHeart,
    category: 'Emotional Balance',
    benefits: ['Immediate calm', 'Reduced tension', 'Mental clarity']
  },
  {
    id: 'focus',
    title: 'Deep Focus',
    description: 'Enhance concentration and mental clarity',
    duration: '15 min',
    audioFile: '/meditations/focus.mp3',
    icon: IconBrain,
    category: 'Productivity',
    benefits: ['Improved concentration', 'Mental stamina', 'Reduced distractions']
  },
  {
    id: 'sleep',
    title: 'Better Sleep',
    description: 'Gentle guidance into restful sleep',
    duration: '20 min',
    audioFile: '/meditations/sleep.mp3',
    icon: IconZzz,
    category: 'Rest',
    benefits: ['Easier sleep onset', 'Improved sleep quality', 'Reduced nighttime anxiety']
  },
  {
    id: 'mindfulness',
    title: 'Mindful Moments',
    description: 'Present moment awareness practice',
    duration: '8 min',
    audioFile: '/meditations/mindfulness.mp3',
    icon: IconLeaf,
    category: 'Mindfulness',
    benefits: ['Increased awareness', 'Emotional balance', 'Stress reduction']
  },
  {
    id: 'evening',
    title: 'Evening Wind Down',
    description: 'Transition from day to evening peacefully',
    duration: '12 min',
    audioFile: '/meditations/evening.mp3',
    icon: IconMoonStars,
    category: 'Daily Practice',
    benefits: ['Peaceful transition', 'Release daily tension', 'Better evening routine']
  }
]

export default function MeditationPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedSessions: 0,
    favorites: [],
    achievements: [
      {
        id: 'first_session',
        title: 'First Step',
        description: 'Complete your first meditation session',
        icon: '🌱',
        unlocked: false
      },
      {
        id: 'daily_streak',
        title: 'Daily Practice',
        description: 'Complete 5 sessions in 5 consecutive days',
        icon: '🔥',
        unlocked: false
      },
      {
        id: 'variety',
        title: 'Explorer',
        description: 'Try meditations from all categories',
        icon: '🌟',
        unlocked: false
      }
    ],
    sessionHistory: []
  })

  // Memoize filtered meditations to prevent unnecessary re-renders
  const filteredMeditations = useMemo(() => {
    return selectedCategory === 'All' 
      ? meditations 
      : meditations.filter(m => m.category === selectedCategory)
  }, [selectedCategory])

  // Memoize category change handler
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  const toggleFavorite = (id: string) => {
    setUserProgress(prev => {
      const favorites = prev.favorites.includes(id)
        ? prev.favorites.filter(f => f !== id)
        : [...prev.favorites, id]
      return { ...prev, favorites }
    })
  }

  const startSession = (id: string) => {
    router.push(`/meditation/${id}`)
  }

  // Add progress tracking section at the top
  const ProgressSection = () => (
    <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Sessions Completed</p>
          <p className="text-3xl font-bold">{userProgress.completedSessions}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Favorite Sessions</p>
          <p className="text-3xl font-bold">{userProgress.favorites.length}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Achievements</p>
          <p className="text-3xl font-bold">
            {userProgress.achievements.filter(a => a.unlocked).length}/{userProgress.achievements.length}
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Achievements</h3>
        <div className="flex flex-wrap gap-3">
          {userProgress.achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                achievement.unlocked
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'bg-gray-100 dark:bg-gray-700 opacity-50'
              }`}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Update the meditation card to include favorite button
  const MeditationCard = memo(({ 
    meditation, 
    showFavorite 
  }: { 
    meditation: typeof meditations[0],
    showFavorite: boolean 
  }) => {
    const { startSession } = useMeditationPlayer()

    const handleStartSession = useCallback(() => {
      startSession({
        id: meditation.id,
        title: meditation.title,
        duration: meditation.duration
      })
    }, [meditation, startSession])

    return (
      <motion.div
        key={meditation.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <meditation.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          {showFavorite && (
            <button
              onClick={() => toggleFavorite(meditation.id)}
              className={`p-2 rounded-full transition-colors ${
                userProgress.favorites.includes(meditation.id)
                  ? 'text-yellow-500'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <IconStar className="w-5 h-5" />
            </button>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2">{meditation.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {meditation.description}
        </p>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Benefits:</p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            {meditation.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 space-y-2">
          <button 
            onClick={handleStartSession}
            className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
          >
            Start Session
          </button>
          {!showFavorite && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Sign in to track progress and save favorites
            </p>
          )}
        </div>
      </motion.div>
    )
  })

  MeditationCard.displayName = 'MeditationCard'

  const categories = ['All', 'Daily Practice', 'Emotional Balance', 'Productivity', 'Rest', 'Mindfulness']

  return (
    <PageTransition>
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Guided Meditations</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find peace and clarity with our AI-guided meditation sessions
            </p>
          </div>

          {/* Only show progress section for signed in users */}
          {session?.user && <ProgressSection />}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Meditation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeditations.map((meditation) => (
              <MeditationCard 
                key={meditation.id} 
                meditation={meditation}
                showFavorite={!!session?.user}
              />
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  )
} 