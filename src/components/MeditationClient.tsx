'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconPlayerPlay, IconPlayerPause, IconVolume, IconVolumeOff } from '@tabler/icons-react'
import PageTransition from '@/components/PageTransition'

interface MeditationSession {
  id: string
  title: string
  duration: number
  description: string
  category: 'breathing' | 'mindfulness' | 'sleep' | 'anxiety'
  audioUrl: string
  backgroundImage: string
}

const meditationSessions: MeditationSession[] = [
  {
    id: '1',
    title: 'Mindful Breathing',
    duration: 300, // 5 minutes
    description: 'A gentle introduction to mindful breathing techniques.',
    category: 'breathing',
    audioUrl: '/meditations/mindful-breathing.mp3',
    backgroundImage: '/images/meditation/breathing.jpg'
  },
  {
    id: '2',
    title: 'Anxiety Relief',
    duration: 600, // 10 minutes
    description: 'Calming meditation for anxiety and stress reduction.',
    category: 'anxiety',
    audioUrl: '/meditations/anxiety-relief.mp3',
    backgroundImage: '/images/meditation/anxiety.jpg'
  },
  {
    id: '3',
    title: 'Deep Sleep',
    duration: 1200, // 20 minutes
    description: 'Peaceful meditation to help you fall asleep naturally.',
    category: 'sleep',
    audioUrl: '/meditations/deep-sleep.mp3',
    backgroundImage: '/images/meditation/sleep.jpg'
  }
]

export default function MeditationClient() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeSession, setActiveSession] = useState<MeditationSession | null>(null)

  return (
    <PageTransition>
      <main className="min-h-screen pt-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto"
            >
              <h1 className="text-4xl font-bold mb-8 gradient-text text-center">
                Guided Meditation
              </h1>

              {/* Session Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {meditationSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  >
                    <div className="relative h-48">
                      <img
                        src={session.backgroundImage}
                        alt={session.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button
                          onClick={() => setActiveSession(session)}
                          className="bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <IconPlayerPlay className="w-8 h-8 text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {session.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{Math.floor(session.duration / 60)} minutes</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Player */}
              {activeSession && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg"
                >
                  <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{activeSession.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.floor(activeSession.duration / 60)} minutes
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        >
                          {isMuted ? (
                            <IconVolumeOff className="w-6 h-6" />
                          ) : (
                            <IconVolume className="w-6 h-6" />
                          )}
                        </button>
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700"
                        >
                          {isPlaying ? (
                            <IconPlayerPause className="w-6 h-6" />
                          ) : (
                            <IconPlayerPlay className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
} 