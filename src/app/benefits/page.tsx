'use client'

import Benefits from '@/components/Benefits'
import PageTransition from '@/components/PageTransition'

export default function BenefitsPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pt-16">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
          
          {/* Animated shapes */}
          <div className="absolute inset-0">
            {/* Floating hexagons */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/10 dark:to-cyan-400/10 rotate-45 animate-float" />
            <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 rotate-45 animate-float animation-delay-2000" />
            
            {/* Glowing orbs */}
            <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-gradient-conic from-blue-500/30 via-purple-500/30 to-blue-500/30 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-blue-400/20 blur-3xl animate-spin-slow" />
            <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-gradient-conic from-cyan-500/30 via-pink-500/30 to-cyan-500/30 dark:from-cyan-400/20 dark:via-pink-400/20 dark:to-cyan-400/20 blur-3xl animate-spin-slow animation-delay-4000" />
          </div>

          {/* Mesh gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

          {/* Animated lines */}
          <div 
            className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(90deg, var(--tw-gradient-from) 1px, transparent 0),
                linear-gradient(0deg, var(--tw-gradient-from) 1px, transparent 0)
              `,
              backgroundSize: '40px 40px',
              animation: 'moveBackground 15s linear infinite'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Benefits />
        </div>
      </div>
    </PageTransition>
  )
} 