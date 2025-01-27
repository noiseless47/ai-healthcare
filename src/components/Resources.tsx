"use client"

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

interface Resource {
  title: string;
  description: string;
  link: string;
  category: string;
}

const resources: Resource[] = [
  {
    title: "Understanding Anxiety",
    description: "Learn about the different types of anxiety disorders and coping strategies.",
    link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
    category: "Educational Articles"
  },
  {
    title: "Mindfulness Meditation Guide",
    description: "A beginner's guide to mindfulness meditation practices.",
    link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
    category: "Exercises"
  },
  {
    title: "Crisis Hotlines Directory",
    description: "24/7 support hotlines for immediate assistance.",
    link: "https://988lifeline.org/",
    category: "Emergency Resources"
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Step-by-step guide to reduce physical tension and stress.",
    link: "https://www.healthline.com/health/progressive-muscle-relaxation",
    category: "Exercises"
  },
  {
    title: "Sleep Hygiene Tips",
    description: "Evidence-based strategies for better sleep quality.",
    link: "https://www.sleepfoundation.org/sleep-hygiene",
    category: "Self-Care Guides"
  },
  {
    title: "Cognitive Behavioral Therapy Workbook",
    description: "Free CBT exercises and worksheets for mental wellness.",
    link: "https://www.therapistaid.com/therapy-worksheets/cbt/none",
    category: "Exercises"
  }
];

const ResourcesSection = () => {
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

  const categories = Array.from(new Set(resources.map(resource => resource.category)));

  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-900">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent sm:text-5xl">
            Mental Health Resources
          </h2>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            A curated collection of trusted resources to support your mental health journey
          </p>
        </motion.div>

        <div className="mt-12">
          {categories.map((category) => (
            <div key={category} className="mb-16">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center"
              >
                {category}
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources
                  .filter(resource => resource.category === category)
                  .map((resource, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl 
                               transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-violet-600" />
                      
                      <div className="p-8">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 
                                     group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[80px]">
                          {resource.description}
                        </p>
                        <Link 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 
                                   text-white rounded-lg hover:opacity-90 transition-all duration-300 
                                   transform hover:translate-y-[-2px] font-medium"
                        >
                          Learn More
                        </Link>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-violet-600/10 dark:from-blue-900 dark:to-violet-900 
                        p-8 rounded-xl border border-blue-100 dark:border-blue-900">
            <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Need Immediate Help?
            </h3>
            <p className="text-blue-800 dark:text-blue-200 mb-4 text-lg">
              If you're experiencing a mental health crisis, please reach out:
            </p>
            <p className="text-blue-900 dark:text-blue-100 font-bold text-2xl">
              988 Suicide & Crisis Lifeline: Call or text 988
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResourcesSection;
