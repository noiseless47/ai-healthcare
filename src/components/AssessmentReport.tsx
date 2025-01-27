'use client'

import { motion } from 'framer-motion'
import { IconBrain, IconTrendingUp, IconAlertTriangle, IconHeartHandshake, IconDownload, IconShare, IconEmergencyBed, IconCalendarCheck, IconMoodSmile, IconStar, IconUsers, IconActivity, IconMoon, IconClipboard, IconMail } from '@tabler/icons-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generatePDF } from '@/utils/generatePDF'
import { useState } from 'react'

type AssessmentReportProps = {
  score: number
  responses: Array<{
    question: string
    answer: string
    severity: 'low' | 'medium' | 'high'
  }>
  recommendations: string[]
  historicalData: Array<{
    date: string
    score: number
  }>
  summary: string
}

// Add this type for better recommendation structure
type RecommendationType = {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'immediate' | 'lifestyle' | 'professional' | 'self-care'
  icon: React.ReactNode
}

// Add this helper function to get contextual recommendations
const getContextualRecommendations = (score: number, responses: Array<{ question: string, answer: string, severity: string }>) => {
  const recommendations: RecommendationType[] = []

  // High Priority Recommendations (for scores < 50)
  if (score < 50) {
    recommendations.push({
      title: "Seek Professional Support",
      description: "Consider scheduling an appointment with a mental health professional. They can provide expert guidance and support tailored to your needs.",
      priority: "high",
      category: "professional",
      icon: <IconHeartHandshake className="w-6 h-6 text-red-500" />
    })
    recommendations.push({
      title: "Crisis Resources",
      description: "Save emergency helpline numbers and know when to use them. Remember, it's okay to ask for help when you need it.",
      priority: "high",
      category: "immediate",
      icon: <IconEmergencyBed className="w-6 h-6 text-red-500" />
    })
  }

  // Moderate Priority Recommendations (for scores between 50-70)
  if (score >= 50 && score < 70) {
    recommendations.push({
      title: "Regular Check-ins",
      description: "Schedule weekly self-assessment check-ins to monitor your mental well-being and track your progress.",
      priority: "medium",
      category: "self-care",
      icon: <IconCalendarCheck className="w-6 h-6 text-yellow-500" />
    })
    recommendations.push({
      title: "Mindfulness Practice",
      description: "Incorporate 10-15 minutes of daily mindfulness or meditation to help manage stress and anxiety.",
      priority: "medium",
      category: "lifestyle",
      icon: <IconMoodSmile className="w-6 h-6 text-yellow-500" />
    })
  }

  // Maintenance Recommendations (for scores >= 70)
  if (score >= 70) {
    recommendations.push({
      title: "Maintain Routine",
      description: "Continue your positive habits and self-care practices that contribute to your mental well-being.",
      priority: "low",
      category: "lifestyle",
      icon: <IconStar className="w-6 h-6 text-green-500" />
    })
    recommendations.push({
      title: "Social Connections",
      description: "Keep nurturing your social relationships and maintain regular contact with friends and family.",
      priority: "low",
      category: "lifestyle",
      icon: <IconUsers className="w-6 h-6 text-green-500" />
    })
  }

  // Common Recommendations (for all scores)
  recommendations.push({
    title: "Physical Activity",
    description: "Engage in regular physical activity - aim for at least 30 minutes of moderate exercise daily.",
    priority: score < 50 ? "high" : "medium",
    category: "lifestyle",
    icon: <IconActivity className="w-6 h-6 text-blue-500" />
  })

  recommendations.push({
    title: "Sleep Hygiene",
    description: "Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
    priority: score < 50 ? "high" : "medium",
    category: "self-care",
    icon: <IconMoon className="w-6 h-6 text-blue-500" />
  })

  return recommendations
}

// Add ShareModal component
function ShareModal({ onClose, pdfUrl }: { onClose: () => void, pdfUrl: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Share Report</h3>
        <div className="space-y-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(pdfUrl)
              onClose()
            }}
            className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <IconClipboard className="w-5 h-5" />
            Copy Link
          </button>
          <a
            href={`mailto:?subject=Mental Health Assessment Report&body=View my assessment report: ${pdfUrl}`}
            className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <IconMail className="w-5 h-5" />
            Share via Email
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function AssessmentReport({ score, responses, recommendations, historicalData, summary }: AssessmentReportProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')

  const contextualRecommendations = getContextualRecommendations(score, responses)

  const handleDownload = () => {
    const doc = generatePDF({
      score,
      summary,
      recommendations: contextualRecommendations,
      date: new Date().toLocaleDateString()
    })
    
    doc.save('mental-health-assessment.pdf')
  }

  const handleShare = async () => {
    const doc = generatePDF({
      score,
      summary,
      recommendations: contextualRecommendations,
      date: new Date().toLocaleDateString()
    })

    // Convert PDF to blob URL
    const pdfBlob = doc.output('blob')
    const url = URL.createObjectURL(pdfBlob)
    setPdfUrl(url)
    setShowShareModal(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6 space-y-6"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Mental Health Assessment Report</h1>
          <p className="text-gray-600 dark:text-gray-400">Completed on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Score and Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center">
              <div className={`
                w-24 h-24 rounded-full flex items-center justify-center mb-4
                ${score < 50 ? 'bg-gradient-to-br from-red-500 to-red-600' : 
                  score < 70 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : 
                  'bg-gradient-to-br from-green-500 to-green-600'}
                text-white
              `}>
                <span className="text-2xl font-bold">{score}</span>
              </div>
              <h3 className="text-lg font-semibold">Overall Score</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 text-white">
                <IconTrendingUp className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-semibold">Mental State</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {score < 50 ? 'Needs Attention' : score < 70 ? 'Moderate' : 'Good'}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-4 text-white">
                <IconHeartHandshake className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-semibold">Support Level</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {score < 50 ? 'High Priority' : score < 70 ? 'Moderate' : 'Maintenance'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Add Summary Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Assessment Summary</h2>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {summary}
            </p>
          </div>
        </motion.div>

        {/* Updated Recommendations Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-6">Personalized Action Plan</h2>
          <div className="grid gap-6">
            {contextualRecommendations.map((rec, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`
                  p-6 rounded-xl flex items-start gap-4
                  ${rec.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20' :
                    rec.priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    'bg-green-50 dark:bg-green-900/20'}
                `}
              >
                <div className="flex-shrink-0">{rec.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{rec.description}</p>
                  {rec.priority === 'high' && (
                    <div className="mt-3 flex items-center gap-2 text-red-600 dark:text-red-400">
                      <IconAlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">High Priority</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pt-4">
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
        >
          <IconDownload className="w-5 h-5" />
          Download Report
        </motion.button>
        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
        >
          <IconShare className="w-5 h-5" />
          Share Report
        </motion.button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal 
          onClose={() => {
            setShowShareModal(false)
            URL.revokeObjectURL(pdfUrl)
          }}
          pdfUrl={pdfUrl}
        />
      )}
    </>
  )
} 