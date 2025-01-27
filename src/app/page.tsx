'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { IconInfoCircle } from '@tabler/icons-react'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import PageTransition from '@/components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center">
        {/* Hero Section with Split Layout */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2
          }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 md:px-24 max-w-[2000px] mx-auto mb-32 pt-32 md:pt-40"
        >
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold gradient-text leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4
              }}
            >
              Revolutionizing Healthcare with AI
            </motion.h1>
            
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.6
              }}
            >
              Transforming patient care through advanced artificial intelligence and machine learning solutions
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.8
              }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <IconInfoCircle className="w-5 h-5" />
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              delay: 0.6
            }}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden floating"
          >
            <Image
              src="/images/hero/ai-healthcare.jpg"
              alt="AI Healthcare"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
            delay: 1
          }}
        >
          <Hero />
          <HowItWorks />
          <Features />
        </motion.div>
      </main>
    </PageTransition>
  )
}
