'use client'

import { motion } from 'framer-motion'

type Assessment = {
  _id: string
  createdAt: string
  score: number
  responses: Array<{
    question: string
    answer: string
  }>
  summary: string
  recommendations: string[]
}

export default function AssessmentHistory({ assessments }: { assessments: Assessment[] }) {
  if (!assessments?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No assessments completed yet
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <motion.div
          key={assessment._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">
              {formatDate(assessment.createdAt)}
            </div>
            <div className="text-lg font-semibold">
              Score: {assessment.score}%
            </div>
          </div>
          
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${assessment.score}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Summary</h4>
            <p className="text-gray-600 dark:text-gray-300">{assessment.summary}</p>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              {assessment.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 