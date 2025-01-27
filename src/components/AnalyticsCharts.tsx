'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { staggerContainer, slideUp, springConfig } from '@/utils/animations'

Chart.register(...registerables)

type CategoryScore = {
  category: string
  score: number
}

type EmotionData = {
  emotion: string
  value: number
  color: string
}

type AnalyticsProps = {
  categoryScores: CategoryScore[]
  emotionDistribution: EmotionData[]
}

export default function AnalyticsCharts({ categoryScores, emotionDistribution }: AnalyticsProps) {
  console.log('AnalyticsCharts received props:', {
    categoryScores,
    emotionDistribution
  })

  // Validate data structure
  const isValidData = 
    Array.isArray(categoryScores) && 
    categoryScores.length > 0 &&
    categoryScores.every(score => 
      typeof score.category === 'string' && 
      typeof score.score === 'number'
    ) &&
    Array.isArray(emotionDistribution) &&
    emotionDistribution.length > 0 &&
    emotionDistribution.every(emotion =>
      typeof emotion.emotion === 'string' &&
      typeof emotion.value === 'number' &&
      typeof emotion.color === 'string'
    )

  if (!isValidData) {
    console.error('Invalid data structure:', {
      categoryScores,
      emotionDistribution,
      categoryScoresValid: Array.isArray(categoryScores) && categoryScores.length > 0,
      emotionDistributionValid: Array.isArray(emotionDistribution) && emotionDistribution.length > 0
    })
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={slideUp}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={springConfig}
        >
          <h4 className="text-lg font-semibold mb-4">Category Analysis</h4>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Invalid category data structure
          </div>
        </motion.div>
        <motion.div
          variants={slideUp}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={springConfig}
        >
          <h4 className="text-lg font-semibold mb-4">Emotion Distribution</h4>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Invalid emotion data structure
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const radarChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const radarInstance = useRef<Chart | null>(null)
  const pieInstance = useRef<Chart | null>(null)
  const { theme } = useTheme()

  const textColor = theme === 'dark' ? '#e5e7eb' : '#374151'
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'

  useEffect(() => {
    if (!radarChartRef.current || !categoryScores.length) return

    if (radarInstance.current) {
      radarInstance.current.destroy()
    }

    const ctx = radarChartRef.current.getContext('2d')
    if (!ctx) return

    radarInstance.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: categoryScores.map(item => item.category),
        datasets: [{
          data: categoryScores.map(item => item.score),
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3B82F6',
          borderWidth: 2,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#3B82F6'
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              display: false
            },
            grid: {
              color: gridColor
            },
            angleLines: {
              color: gridColor
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw}`
            }
          }
        }
      }
    })
  }, [categoryScores, theme])

  useEffect(() => {
    if (!pieChartRef.current || !emotionDistribution.length) return

    if (pieInstance.current) {
      pieInstance.current.destroy()
    }

    const ctx = pieChartRef.current.getContext('2d')
    if (!ctx) return

    pieInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: emotionDistribution.map(item => item.emotion),
        datasets: [{
          data: emotionDistribution.map(item => item.value),
          backgroundColor: emotionDistribution.map(item => item.color),
          borderColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: textColor,
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            titleColor: theme === 'dark' ? '#ffffff' : '#000000',
            bodyColor: theme === 'dark' ? '#ffffff' : '#000000',
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed}%`
            }
          }
        }
      }
    })
  }, [emotionDistribution, theme])

  if (!categoryScores?.length || !emotionDistribution?.length) {
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={slideUp}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={springConfig}
        >
          <h4 className="text-lg font-semibold mb-4">Category Analysis</h4>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No analysis data available
          </div>
        </motion.div>
        <motion.div
          variants={slideUp}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={springConfig}
        >
          <h4 className="text-lg font-semibold mb-4">Emotion Distribution</h4>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No emotion data available
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div
        variants={slideUp}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={springConfig}
      >
        <h4 className="text-lg font-semibold mb-4">Category Analysis</h4>
        <div className="h-[300px] relative">
          <canvas ref={radarChartRef} />
        </div>
      </motion.div>
      <motion.div
        variants={slideUp}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={springConfig}
      >
        <h4 className="text-lg font-semibold mb-4">Emotion Distribution</h4>
        <div className="h-[300px] relative">
          <canvas ref={pieChartRef} />
        </div>
      </motion.div>
    </motion.div>
  )
} 