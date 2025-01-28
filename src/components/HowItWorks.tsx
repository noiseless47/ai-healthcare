'use client'

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { IconClipboard, IconBrain, IconMessages, IconUser } from '@tabler/icons-react'

const HowItWorks = () => {
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

  const steps = [
    {
      title: "Take Assessment",
      description: "Complete our AI-powered mental health assessment to evaluate your current well-being.",
      icon: <IconClipboard className="w-8 h-8" />
    },
    {
      title: "AI Analysis",
      description: "Our advanced AI analyzes your responses and behavioral patterns to identify potential concerns.",
      icon: <IconBrain className="w-8 h-8" />
    },
    {
      title: "Get Support",
      description: "Receive immediate support through our AI chatbot and access personalized resources.",
      icon: <IconMessages className="w-8 h-8" />
    },
    {
      title: "Professional Help",
      description: "Connect with mental health professionals when additional support is recommended.",
      icon: <IconUser className="w-8 h-8" />
    }
  ]

  return (
    <section className="py-20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold text-center mb-16 gradient-text"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center 
                       hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50
                       dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30
                       transition-all duration-300 shadow-lg
                       hover:shadow-xl hover:shadow-blue-500/10"
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center mb-6
                         group-hover:scale-110 transition-transform duration-300
                         hover:bg-blue-200 dark:hover:bg-blue-500/30"
                whileHover={{ 
                  rotate: 5,
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-blue-600 dark:text-blue-500">
                  {step.icon}
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks; 