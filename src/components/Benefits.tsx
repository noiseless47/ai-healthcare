'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const benefitsData = [
  {
    title: "Early Detection",
    description: "AI-powered analysis of behavioral patterns and communication to identify early signs of depression and anxiety.",
    image: "/images/early-detection.jpg"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock access to AI-powered chatbot support and resources for immediate assistance.",
    image: "/images/support.jpg"
  },
  {
    title: "Professional Connection",
    description: "Direct connection to mental health professionals when AI detects concerning patterns.",
    image: "/images/connection.jpg"
  },
  {
    title: "Anonymous Assessment",
    description: "Private and secure mental health assessments that respect user privacy and confidentiality.",
    image: "/images/privacy.jpg"
  },
  {
    title: "Personalized Resources",
    description: "Customized recommendations for mental wellness based on individual assessment results.",
    image: "/images/resources.jpg"
  },
  {
    title: "Progress Tracking",
    description: "Monitor mental health improvements over time with data-driven insights and progress reports.",
    image: "/images/tracking.jpg"
  }
]

export default function Benefits() {
  return (
    <section className="section py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-8 gradient-text">How MindAI Helps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 mb-6">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 