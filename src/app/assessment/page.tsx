'use client'

import Assessment from '@/components/Assessment'
import PageTransition from '@/components/PageTransition'

export default function AssessmentPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pt-16">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-gray-950" />
          
          {/* Animated circles */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-indigo-400/20 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-400/20 to-pink-400/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-green-400/20 to-cyan-400/20 dark:from-green-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-black/[0.02]" />
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/50 to-white/80 dark:via-gray-900/50 dark:to-gray-900/80" />

          {/* Subtle moving dots */}
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at center, #4F46E5 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              animation: 'moveBackground 20s linear infinite'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Assessment />
        </div>
      </div>
    </PageTransition>
  )
} 