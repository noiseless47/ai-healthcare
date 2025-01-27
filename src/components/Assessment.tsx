'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconArrowRight, IconLoader2, IconBrain, IconLock, IconHeartHandshake, IconShieldLock } from '@tabler/icons-react'
import { staggerContainer, slideIn } from '@/utils/animations'
import AssessmentReport from './AssessmentReport'

export default function Assessment() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Array<{
    question: string
    answer: string
    score: number
  }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    score: number
    summary: string
    recommendations: string[]
  } | null>(null)
  const [questions, setQuestions] = useState<Array<{
    id: number
    text: string
    options: Array<{
      value: number
      text: string
    }>
  }>>([])
  const [showReport, setShowReport] = useState(false)
  const [assessmentData, setAssessmentData] = useState({
    score: 0,
    responses: [],
    recommendations: [],
    historicalData: [],
    summary: ''
  })

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('/api/assessment')
      const data = await res.json()
      setQuestions(data.questions)
    }
    fetchQuestions()
  }, [])

  const handleAnswer = async (score: number, answerText: string) => {
    const newResponses = [...responses, {
      question: questions[currentQuestion].text,
      answer: answerText,
      score
    }]
    setResponses(newResponses)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsLoading(true)
      try {
        const response = await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responses: newResponses })
        })
        
        if (!response.ok) {
          throw new Error('Failed to submit assessment')
        }
        
        const result = await response.json()
        setResult(result)
        setAssessmentData({
          score: result.score,
          responses: newResponses.map(r => ({
            question: r.question,
            answer: r.answer,
            severity: "medium"
          })),
          recommendations: result.recommendations,
          historicalData: [
            { date: '2024-01', score: 65 },
            { date: '2024-02', score: 70 },
            { date: '2024-03', score: 75 }
          ],
          summary: result.summary
        })
        setShowReport(true)
      } catch (error) {
        console.error('Assessment error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const startAssessment = () => {
    setShowIntro(false)
  }

  if (showReport) {
    return (
      <AssessmentReport {...assessmentData} />
    )
  }

  if (showIntro) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Mental Health Assessment</h1>
            <p className="text-lg opacity-90">
              Take a comprehensive assessment to understand your mental well-being
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <IconBrain className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold mb-1">Comprehensive Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get insights into your emotional and mental well-being through scientifically validated questions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <IconHeartHandshake className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold mb-1">Personalized Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Receive tailored recommendations and resources based on your assessment results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <IconShieldLock className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold mb-1">Private & Secure</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your responses are completely confidential and protected
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <IconLock className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold mb-1">Takes 5-10 Minutes</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Quick but thorough assessment to help understand your mental health
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mb-8 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-r-xl">
              <h3 className="font-semibold mb-2">Important Note:</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                This assessment is not a diagnostic tool. If you're experiencing severe distress, please seek immediate professional help or contact emergency services.
              </p>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <motion.button
                onClick={startAssessment}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                Start Assessment
                <IconArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <IconLoader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Analyzing your responses...</span>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-6">
            {questions[currentQuestion]?.text}
          </h2>

          <motion.div 
            className="space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {questions[currentQuestion]?.options.map((option) => (
              <motion.button
                key={option.value}
                variants={slideIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value, option.text)}
                className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 
                           dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center 
                           justify-between group"
              >
                <span>{option.text}</span>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  )
} 