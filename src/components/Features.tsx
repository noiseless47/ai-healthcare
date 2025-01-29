'use client'

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { IconBrain, IconHeartHandshake, IconLock, IconClock } from '@tabler/icons-react';
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { fadeInUp, staggerChildren, tiltOnHover } from '@/utils/animations'

const Features = () => {
  const { theme } = useTheme()
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
      title: "Guided Meditation",
      description: "Find peace and clarity with our AI-guided meditation sessions tailored to your needs.",
      lightImage: "/images/features/light/meditation.webp",
      darkImage: "/images/features/dark/meditation.webp"
    },
    {
      title: "Digital Journal",
      description: "Private space to record thoughts with AI-powered mood analysis and personalized insights.",
      lightImage: "/images/features/light/journal.webp",
      darkImage: "/images/features/dark/journal.webp"
    },
    {
      title: "Mental Health Assessment",
      description: "Comprehensive screening tools and personalized recommendations for your well-being.",
      lightImage: "/images/features/light/assessment.webp",
      darkImage: "/images/features/dark/assessment.webp"
    },
    {
      title: "Community Support",
      description: "Connect with others on similar journeys in our supportive and moderated community.",
      lightImage: "/images/features/light/community.webp",
      darkImage: "/images/features/dark/community.webp"
    },
    {
      title: "Resource Library",
      description: "Access a curated collection of mental health resources, articles, and exercises.",
      lightImage: "/images/features/light/library.webp",
      darkImage: "/images/features/dark/library.webp"
    }
  ];

  return (
    <section className="section py-20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="space-y-20"
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-4xl font-bold text-center mb-12 gradient-text"
        >
          Key Features
        </motion.h2>

        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            {...tiltOnHover}
            className={`flex flex-col ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center gap-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="lg:w-1/2 w-full">
              <div className="relative h-[300px] lg:h-[400px] w-full">
                <Image
                  src={theme === 'dark' ? feature.darkImage : feature.lightImage}
                  alt={feature.title}
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
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
  );
};

export default Features; 