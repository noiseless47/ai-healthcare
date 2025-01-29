'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { IconPlayerPause, IconPlayerPlay, IconX } from '@tabler/icons-react'
import PageTransition from '@/components/PageTransition'

export default function MeditationSession() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleClose = () => {
    router.push('/meditation')
  }

  return (
    <PageTransition>
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="absolute top-4 right-4">
          <button 
            onClick={handleClose}
            className="text-white/60 hover:text-white"
          >
            <IconX size={24} />
          </button>
        </div>

        <div className="text-center text-white space-y-8">
          <h2 className="text-3xl font-semibold">Morning Meditation</h2>
          
          <div className="w-96 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            {isPlaying ? (
              <IconPlayerPause size={32} className="text-white" />
            ) : (
              <IconPlayerPlay size={32} className="text-white" />
            )}
          </button>

          {!session?.user && (
            <p className="text-sm text-white/60">
              Sign in to track your progress and earn achievements
            </p>
          )}
        </div>
      </div>
    </PageTransition>
  )
} 