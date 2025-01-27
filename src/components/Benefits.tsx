'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp, staggerChildren, scaleOnHover } from '@/utils/animations'

const benefitsData = [
  {
    title: "Early Detection",
    description: "AI-powered analysis of behavioral patterns and communication to identify early signs of depression and anxiety.",
    image: "/images/benefits/early-detection.webp"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock access to AI-powered chatbot support and resources for immediate assistance.",
    image: "/images/benefits/support.webp"
  },
  {
    title: "Professional Connection",
    description: "Direct connection to mental health professionals when AI detects concerning patterns.",
    image: "/images/benefits/professional.webp"
  },
  {
    title: "Anonymous Assessment",
    description: "Private and secure mental health assessments that respect user privacy and confidentiality.",
    image: "/images/benefits/anonymous.webp"
  },
  {
    title: "Personalized Resources",
    description: "Customized recommendations for mental wellness based on individual assessment results.",
    image: "/images/benefits/resources.webp"
  },
  {
    title: "Progress Tracking",
    description: "Monitor mental health improvements over time with data-driven insights and progress reports.",
    image: "/images/benefits/tracking.webp"
  }
]

export default function Benefits() {
  return (
    <section className="w-full py-20">
      <motion.div
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-12 gradient-text">
          How it Helps
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              {...scaleOnHover}
              className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 mb-6 group">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="rounded-lg object-cover transition-all duration-300 floating hover:scale-105"
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