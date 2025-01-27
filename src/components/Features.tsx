'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp, staggerChildren, tiltOnHover } from '@/utils/animations'

export default function Features() {
  const { theme } = useTheme()

  const features = [
    {
      title: "AI-Powered Chat Support",
      description: "24/7 access to our AI chatbot for immediate emotional support and guidance.",
      lightImage: "/images/features/light/chat-support.webp",
      darkImage: "/images/features/dark/chat-support.webp"
    },
    {
      title: "Progress Dashboard",
      description: "Track your mental health journey with detailed insights and progress reports.",
      lightImage: "/images/features/light/dashboard.webp",
      darkImage: "/images/features/dark/dashboard.webp"
    },
    {
      title: "Resource Library",
      description: "Access a curated collection of mental health resources, articles, and exercises.",
      lightImage: "/images/features/light/library.webp",
      darkImage: "/images/features/dark/library.webp"
    }
  ]

  return (
    <section className="section py-20">
      <motion.div
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="space-y-20"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-12 gradient-text">
          Key Features
        </motion.h2>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            {...tiltOnHover}
            className={`flex flex-col ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center gap-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="lg:w-1/2">
              <div className="relative h-[300px] lg:h-[400px] w-full group">
                <Image
                  src={theme === 'dark' ? feature.darkImage : feature.lightImage}
                  alt={feature.title}
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  className="rounded-xl object-cover floating transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    console.error(`Error loading image: ${e.currentTarget.src}`);
                  }}
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