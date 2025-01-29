'use client'

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { IconMessage, IconInfoCircle, IconBrain } from '@tabler/icons-react'
import { fadeIn, slideUp } from '@/utils/animations'

const Hero = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950 z-10" />
        
        {/* Animated blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-indigo-400/30 to-pink-400/30 dark:from-indigo-500/20 dark:to-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-t from-green-400/30 to-cyan-400/30 dark:from-green-500/20 dark:to-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] dark:bg-grid-black/[0.05]" />
      </div>

      {/* Content */}
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-20"
      >
        {/* CareAI Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-24 mt-15"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">CareAI</span> - Mental Health Support
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            24/7 emotional support and guidance through our advanced AI chat system
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            <Link 
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <IconMessage className="w-5 h-5" />
              Start Chat Now
            </Link>
            <Link 
              href="/about/mental-health"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              <IconInfoCircle className="w-5 h-5" />
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* MindAI Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">MindAI</span> - Early Detection of Mental Health Issues
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Using AI to detect early signs of depression and anxiety, providing timely support and resources for mental well-being.
          </p>
          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            <Link 
              href="/assessment"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <IconBrain className="w-5 h-5" />
              Take Assessment
            </Link>
            <Link 
              href="/about/early-detection"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              <IconInfoCircle className="w-5 h-5" />
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero; 