'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { IconPlayerPause, IconPlayerPlay, IconX, IconVolume, IconVolumeOff } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MeditationSession {
  id: string
  title: string
  duration: string
  audioFile?: string
}

interface MeditationPlayerContextType {
  startSession: (session: MeditationSession) => void
  closeSession: () => void
  isPlaying: boolean
  currentSession: MeditationSession | null
}

const MeditationPlayerContext = createContext<MeditationPlayerContextType | null>(null)

export function MeditationPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Handle audio playback
  useEffect(() => {
    if (currentSession) {
      const audioSrc = currentSession.audioFile || `/meditations/${currentSession.id}.mp3`
      if (audioRef.current) {
        audioRef.current.src = audioSrc
        audioRef.current.load()
        
        // Add duration listener
        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current?.duration || 0)
        }

        audioRef.current.onerror = () => {
          console.error('Error loading audio file:', audioSrc)
        }
      }
    }
  }, [currentSession])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Update progress based on audio time
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const updateProgress = () => {
        const progress = (audio.currentTime / audio.duration) * 100
        setProgress(progress)
      }

      audio.addEventListener('timeupdate', updateProgress)
      return () => audio.removeEventListener('timeupdate', updateProgress)
    }
  }, [])

  // Handle mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const startSession = (session: MeditationSession) => {
    console.log('Starting session:', session)
    setCurrentSession(session)
    setIsPlaying(true)
    setProgress(0)
  }

  const closeSession = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setCurrentSession(null)
    setIsPlaying(false)
    setProgress(0)
  }

  console.log('Current session:', currentSession)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Calculate current time based on progress and actual duration
  const currentTime = (progress / 100) * duration

  return (
    <MeditationPlayerContext.Provider value={{ startSession, closeSession, isPlaying, currentSession }}>
      {children}
      <audio ref={audioRef} />
      <AnimatePresence>
        {currentSession && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '90%',
              maxWidth: '500px',
              zIndex: 99999,
            }}
          >
            <div 
              className="bg-white/95 dark:bg-gray-800/95 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div className="px-4">
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 cursor-pointer group">
                  <motion.div 
                    className="h-full bg-blue-500 group-hover:bg-blue-600 transition-colors"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <div className="py-3 flex items-center justify-between mt-1">
                  {/* Left Section - Title */}
                  <div className="flex items-center space-x-4 w-1/3">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {currentSession.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Meditation Session
                      </p>
                    </div>
                  </div>

                  {/* Center Section - Controls */}
                  <div className="flex items-center justify-center space-x-6 w-1/3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? (
                        <IconPlayerPause size={24} className="text-blue-600 dark:text-blue-400" />
                      ) : (
                        <IconPlayerPlay size={24} className="text-blue-600 dark:text-blue-400 ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Right Section - Time and Volume */}
                  <div className="flex items-center justify-end space-x-4 w-1/3">
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-x-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>/</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      {isMuted ? (
                        <IconVolumeOff size={20} className="text-gray-500 dark:text-gray-400" />
                      ) : (
                        <IconVolume size={20} className="text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                    <button 
                      onClick={closeSession}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <IconX size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MeditationPlayerContext.Provider>
  )
}

export function useMeditationPlayer() {
  const context = useContext(MeditationPlayerContext)
  if (!context) {
    throw new Error('useMeditationPlayer must be used within a MeditationPlayerProvider')
  }
  return context
} 