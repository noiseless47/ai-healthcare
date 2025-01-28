'use client'

import React from 'react';
import { motion, useInView } from 'framer-motion'; // Add this import
import { IconBrain, IconHeartHandshake, IconLock, IconClock } from '@tabler/icons-react';

const ChooseUs = () => {
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

  const chooseUs = [
    {
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze patterns in your responses to provide personalized insights.",
      icon: <IconBrain className="w-6 h-6" />
    },
    {
      title: "Empathetic Support",
      description: "Our AI is trained to provide compassionate and understanding responses to your concerns.",
      icon: <IconHeartHandshake className="w-6 h-6" />
    },
    {
      title: "Privacy First",
      description: "Your data is encrypted and protected. We prioritize your privacy and confidentiality.",
      icon: <IconLock className="w-6 h-6" />
    },
    {
      title: "24/7 Availability",
      description: "Access support whenever you need it, day or night, from anywhere in the world.",
      icon: <IconClock className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <motion.div 
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience the future of mental health support with our innovative AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {chooseUs.map((chooseUs, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {chooseUs.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {chooseUs.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 ml-16">
                {chooseUs.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ChooseUs;