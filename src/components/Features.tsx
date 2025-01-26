'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    title: "AI-Powered Chat Support",
    description: "24/7 access to our AI chatbot for immediate emotional support and guidance.",
    image: "/images/features/chat.jpg"
  },
  {
    title: "Progress Dashboard",
    description: "Track your mental health journey with detailed insights and progress reports.",
    image: "/images/features/dashboard.jpg"
  },
  {
    title: "Resource Library",
    description: "Access a curated collection of mental health resources, articles, and exercises.",
    image: "/images/features/resources.jpg"
  }
]

export default function Features() {
  return (
    <section className="section py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-20"
      >
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Key Features</h2>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`flex flex-col ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center gap-12`}
          >
            <div className="lg:w-1/2">
              <div className="relative h-[300px] lg:h-[400px] w-full">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold">{feature.title}</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
} 