'use client'

import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { fadeIn, slideUp } from '@/utils/animations'

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="pt-24 pb-16 px-4">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto space-y-12"
        >
          <motion.div variants={slideUp} className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
              About AI Healthcare
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Revolutionizing healthcare through advanced AI solutions
            </p>
          </motion.div>

          <motion.div variants={slideUp} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We aim to transform healthcare delivery by leveraging cutting-edge artificial intelligence 
                and machine learning technologies. Our platform provides innovative solutions that enhance 
                patient care, improve diagnostic accuracy, and make healthcare more accessible.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Technology</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform utilizes state-of-the-art AI models, including DeepSeek's advanced language models, to provide 
                intelligent healthcare solutions. We employ advanced machine learning algorithms for 
                data analysis, pattern recognition, and predictive healthcare insights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Privacy & Security</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize the security and confidentiality of your health information. Our platform 
                implements enterprise-grade security measures and complies with healthcare data protection 
                standards to ensure your data remains private and secure.
              </p>
            </section>
          </motion.div>
        </motion.div>
      </main>
    </PageTransition>
  )
} 