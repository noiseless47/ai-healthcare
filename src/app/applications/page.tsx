'use client'

import { motion } from 'framer-motion'
import { 
  IconBrain, 
  IconMessage, 
  IconChartBar, 
  IconShieldLock, 
  IconRobot, 
  IconMoodSmile 
} from '@tabler/icons-react'
import PageTransition from '@/components/PageTransition'

const applications = [
  {
    title: "AI Chat Support",
    description: "24/7 empathetic AI chat assistant trained to provide emotional support, coping strategies, and mental health guidance in a safe, non-judgmental environment.",
    icon: IconMessage,
    color: "bg-blue-500"
  },
  {
    title: "Mood Tracking",
    description: "Advanced mood tracking system that helps you monitor your emotional well-being over time, identify patterns, and understand your mental health journey.",
    icon: IconMoodSmile,
    color: "bg-green-500"
  },
  {
    title: "Mental Health Assessment",
    description: "Comprehensive mental health assessments using AI to evaluate your emotional state, stress levels, and provide personalized recommendations.",
    icon: IconBrain,
    color: "bg-purple-500"
  },
  {
    title: "Progress Analytics",
    description: "Detailed analytics and visualizations of your mental health progress, including mood trends, assessment scores, and improvement metrics.",
    icon: IconChartBar,
    color: "bg-red-500"
  },
  {
    title: "Privacy & Security",
    description: "Enterprise-grade security measures ensuring your personal information and conversations remain completely private and confidential.",
    icon: IconShieldLock,
    color: "bg-yellow-500"
  },
  {
    title: "Smart Recommendations",
    description: "AI-powered system that provides personalized recommendations for coping strategies, activities, and resources based on your unique needs.",
    icon: IconRobot,
    color: "bg-indigo-500"
  }
]

export default function ApplicationsPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pt-16">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-white/80 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-950" />
          
          {/* Animated patterns */}
          <div className="absolute inset-0">
            {/* Floating circles */}
            <div className="absolute top-1/4 -left-12 w-96 h-96 bg-gradient-conic from-blue-500/30 via-cyan-500/30 to-blue-500/30 dark:from-blue-400/20 dark:via-cyan-400/20 dark:to-blue-400/20 rounded-full blur-3xl animate-spin-slow" />
            <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-gradient-conic from-purple-500/30 via-pink-500/30 to-purple-500/30 dark:from-purple-400/20 dark:via-pink-400/20 dark:to-purple-400/20 rounded-full blur-3xl animate-spin-slow animation-delay-2000" />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-black/[0.02]" />
          
          {/* Moving gradient lines */}
          <div 
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(100deg,
                  var(--tw-gradient-from) 0%,
                  transparent 7%,
                  transparent 10%,
                  var(--tw-gradient-from) 15%
                )
              `,
              backgroundSize: '200% 200%',
              animation: 'moveGradient 15s linear infinite'
            }}
          />

          {/* Radial overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white/90 dark:via-gray-900/80 dark:to-gray-900/90" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section with enhanced animations */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center max-w-3xl mx-auto"
              >
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Features & Applications
                </motion.h1>
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Discover how our AI-powered mental health platform provides comprehensive support and tools to help you maintain and improve your emotional well-being.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Applications Grid with enhanced animations */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {applications.map((app, index) => (
                  <motion.div
                    key={app.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden 
                             hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                  >
                    <div className="p-8">
                      <motion.div 
                        className={`${app.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <app.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <motion.h3 
                        className="text-xl font-semibold mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {app.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {app.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section with enhanced animations */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <motion.h2 
                  className="text-3xl font-bold mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  Start Your Mental Health Journey
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Join thousands of users who are taking control of their mental well-being with our AI-powered support system.
                </motion.p>
                <motion.div 
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.a 
                    href="/chat"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                  >
                    Try AI Chat Now
                  </motion.a>
                  <motion.a 
                    href="/assessment"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
                  >
                    Take Assessment
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
} 