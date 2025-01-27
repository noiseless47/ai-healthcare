'use client'

import { motion } from 'framer-motion'
import { slideUp, springConfig } from '@/utils/animations'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideUp}
      transition={springConfig}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
} 