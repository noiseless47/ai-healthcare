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
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Features & Applications
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Discover how our AI-powered mental health platform provides comprehensive support and tools to help you maintain and improve your emotional well-being.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Applications Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <motion.div
                  key={app.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className={`${app.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                      <app.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{app.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {app.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Start Your Mental Health Journey</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of users who are taking control of their mental well-being with our AI-powered support system.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="/chat"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  Try AI Chat Now
                </a>
                <a 
                  href="/assessment"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
                >
                  Take Assessment
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
} 