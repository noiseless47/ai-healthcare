'use client'

import { motion } from 'framer-motion'
import { IconBrain, IconMessage2, IconClipboardList, IconUserCircle } from '@tabler/icons-react'

const steps = [
  {
    icon: IconClipboardList,
    title: "Take Assessment",
    description: "Complete our AI-powered mental health assessment to evaluate your current well-being."
  },
  {
    icon: IconBrain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your responses and behavioral patterns to identify potential concerns."
  },
  {
    icon: IconMessage2,
    title: "Get Support",
    description: "Receive immediate support through our AI chatbot and access personalized resources."
  },
  {
    icon: IconUserCircle,
    title: "Professional Help",
    description: "Connect with mental health professionals when additional support is recommended."
  }
]

export default function HowItWorks() {
  return (
    <section className="section py-20 bg-gray-50 dark:bg-gray-800/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-12 gradient-text">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6"
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 