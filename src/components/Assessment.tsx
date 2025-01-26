'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconArrowRight, IconLoader2 } from '@tabler/icons-react'

export default function Assessment() {
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
      } catch (error) {
        console.error('Assessment error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Assessment Complete</h2>
        <div className="mb-6">
          <div className="text-xl mb-2">Your Score: {result.score}%</div>
          <div className="h-4 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p className="text-gray-600 dark:text-gray-300">{result.summary}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
          <ul className="list-disc pl-5 space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300">{rec}</li>
            ))}
          </ul>
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

          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value, option.text)}
                className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-between group"
              >
                <span>{option.text}</span>
                <IconArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
} 