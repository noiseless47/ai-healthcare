'use client'

import { motion } from 'framer-motion'
import { IconBrain, IconMessage2, IconClipboardList, IconUserCircle } from '@tabler/icons-react'
import { fadeInUp, staggerChildren, scaleOnHover } from '@/utils/animations'

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
    <section className="w-full py-20">
      <motion.div
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="text-center px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-12 gradient-text">
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              {...scaleOnHover}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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