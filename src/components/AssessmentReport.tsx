'use client'

import { motion } from 'framer-motion'
import { IconBrain, IconTrendingUp, IconAlertTriangle, IconHeartHandshake, IconDownload, IconShare, IconEmergencyBed, IconCalendarCheck, IconMoodSmile, IconStar, IconUsers, IconActivity, IconMoon, IconClipboard, IconMail, IconBulb, IconRun, IconMoonStars, IconYoga, IconStethoscope, IconSalad, IconPalette, IconSparkles } from '@tabler/icons-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generatePDF } from '@/utils/generatePDF'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'

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

// Update the ShareOption type to include a prepare function
type ShareOption = {
  id: string
  label: string
  icon: React.ReactNode
  action: (data: { url: string, blob: Blob }) => Promise<void> | void
  available: boolean
  prepare?: (blob: Blob) => Promise<string> // Optional prepare function
}

// Update the ShareModal component to use simpler sharing methods
function ShareModal({ onClose, pdfBlob }: { onClose: () => void, pdfBlob: Blob }) {
  const shareOptions: ShareOption[] = [
    {
      id: 'download',
      label: 'Download PDF',
      icon: <IconDownload className="w-5 h-5" />,
      action: ({ blob }) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'mental-health-assessment.pdf'
        link.click()
        URL.revokeObjectURL(url)
      },
      available: true
    },
    {
      id: 'email',
      label: 'Email',
      icon: <IconMail className="w-5 h-5" />,
      action: ({ blob }) => {
        const url = URL.createObjectURL(blob)
        window.location.href = `mailto:?subject=Mental Health Assessment Report&body=I'd like to share my mental health assessment report with you.&attach=${url}`
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      },
      available: true
    },
    {
      id: 'native-share',
      label: 'Share',
      icon: <IconShare className="w-5 h-5" />,
      action: async ({ blob }) => {
        try {
          const file = new File([blob], 'assessment.pdf', { type: 'application/pdf' })
          await navigator.share({
            title: 'Mental Health Assessment Report',
            text: 'Check out my mental health assessment report',
            files: [file]
          })
          onClose()
        } catch (error) {
          console.error('Error sharing:', error)
          alert('Sharing not supported on this device')
        }
      },
      available: Boolean(navigator.share && navigator.canShare)
    }
  ]

  // Filter out unavailable options
  const availableOptions = shareOptions.filter(option => option.available)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-labelledby="share-modal-title"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full mx-4 shadow-xl"
      >
        <h3 
          id="share-modal-title" 
          className="text-xl font-semibold mb-4"
        >
          Share Report
        </h3>
        <div className="space-y-3">
          {availableOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => option.action({ 
                url: URL.createObjectURL(pdfBlob),
                blob: pdfBlob 
              })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 
                dark:hover:bg-blue-900/30 transition-colors flex items-center gap-3
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                dark:focus:ring-offset-gray-800"
              aria-label={option.label}
            >
              {option.icon}
              <span className="font-medium">{option.label}</span>
            </motion.button>
          ))}
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full p-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 
            dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label="Close share modal"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// Replace the getEmoji function with getIcon
const getIcon = (text: string) => {
  if (text.toLowerCase().includes('exercise') || text.toLowerCase().includes('physical')) 
    return <IconRun className="w-5 h-5 text-blue-500" />
  if (text.toLowerCase().includes('sleep') || text.toLowerCase().includes('rest')) 
    return <IconMoonStars className="w-5 h-5 text-indigo-500" />
  if (text.toLowerCase().includes('meditation') || text.toLowerCase().includes('mindful')) 
    return <IconYoga className="w-5 h-5 text-purple-500" />
  if (text.toLowerCase().includes('social') || text.toLowerCase().includes('friend')) 
    return <IconUsers className="w-5 h-5 text-green-500" />
  if (text.toLowerCase().includes('professional') || text.toLowerCase().includes('therapy')) 
    return <IconStethoscope className="w-5 h-5 text-red-500" />
  if (text.toLowerCase().includes('diet') || text.toLowerCase().includes('eat')) 
    return <IconSalad className="w-5 h-5 text-emerald-500" />
  if (text.toLowerCase().includes('hobby') || text.toLowerCase().includes('activity')) 
    return <IconPalette className="w-5 h-5 text-orange-500" />
  return <IconSparkles className="w-5 h-5 text-yellow-500" />
}

export default function AssessmentReport({ score, responses, recommendations, historicalData, summary }: AssessmentReportProps) {
  const { data: session } = useSession()
  const [showShareModal, setShowShareModal] = useState(false)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

  const contextualRecommendations = getContextualRecommendations(score, responses)

  const handleDownload = () => {
    const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm")
    const fileName = `mental-health-assessment_${timestamp}.pdf`
    
    const doc = generatePDF({
      score,
      summary,
      recommendations: contextualRecommendations,
      date: new Date().toLocaleDateString(),
      additionalRecommendations: recommendations,
      userName: session?.user?.name || 'User'
    })
    
    doc.save(fileName)
  }

  const handleShare = async () => {
    const doc = generatePDF({
      score,
      summary,
      recommendations: contextualRecommendations,
      date: new Date().toLocaleDateString(),
      additionalRecommendations: recommendations,
      userName: session?.user?.name || 'User'
    })

    const blob = doc.output('blob')
    setPdfBlob(blob)
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

        {/* Additional Recommendations Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <IconBulb className="w-6 h-6 text-yellow-500" />
            Additional Recommendations
          </h2>
          <ul className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-3 group"
              >
                <div className="mt-1 transition-transform group-hover:scale-110">
                  {getIcon(rec)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {rec}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Action Buttons - Inside the main container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
      </motion.div>

      {/* Share Modal */}
      {showShareModal && pdfBlob && (
        <ShareModal 
          onClose={() => {
            setShowShareModal(false)
            setPdfBlob(null)
          }}
          pdfBlob={pdfBlob}
        />
      )}
    </>
  )
} 