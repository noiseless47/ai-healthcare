'use client'

import { motion } from 'framer-motion'
import { IconUsers, IconHeart, IconMessage, IconShield, IconUserPlus, IconBulb } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const communityFeatures = [
  {
    icon: IconUsers,
    title: "Support Groups",
    description: "Join themed groups focused on specific mental health topics and experiences."
  },
  {
    icon: IconMessage,
    title: "Discussion Forums",
    description: "Engage in meaningful conversations with others in a safe, moderated environment."
  },
  {
    icon: IconHeart,
    title: "Shared Experiences",
    description: "Share your journey and learn from others' stories of growth and recovery."
  },
  {
    icon: IconShield,
    title: "Safe Space",
    description: "Our community is carefully moderated to ensure a supportive and respectful environment."
  },
  {
    icon: IconUserPlus,
    title: "Peer Support",
    description: "Connect with peers who understand your experiences and challenges."
  },
  {
    icon: IconBulb,
    title: "Group Activities",
    description: "Participate in group meditation sessions, workshops, and wellness challenges."
  }
]

export default function CommunityPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const handleGetStarted = () => {
    if (!session) {
      router.push('/login?returnUrl=/community/forums')
    } else {
      router.push('/community/forums')
    }
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Join Our Supportive Community
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4"
          >
            Connect with others on similar journeys, share experiences, and grow together in a safe and supportive environment.
          </motion.p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto"
        >
          {communityFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-blue-600 dark:bg-blue-700"
      >
        <div className="text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Ready to Join Our Community?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Start connecting with others who understand your journey and are here to support you.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.2 }}
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {session ? 'Enter Community' : 'Get Started'}
          </motion.button>
        </div>
      </motion.section>
    </main>
  )
} 