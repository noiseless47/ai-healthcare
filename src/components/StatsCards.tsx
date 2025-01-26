'use client'

import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react'

type Stats = {
  currentScore: number
  previousScore: number
  averageScore: number
  totalAssessments: number
}

export default function StatsCards({ stats }: { stats: Stats | null }) {
  if (!stats) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  const scoreDifference = stats.currentScore - stats.previousScore
  const trend = scoreDifference > 0 ? 'up' : scoreDifference < 0 ? 'down' : 'neutral'

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">Current Score</p>
          <div className={`flex items-center ${
            trend === 'up' 
              ? 'text-green-500' 
              : trend === 'down' 
                ? 'text-red-500' 
                : 'text-gray-500'
          }`}>
            {trend === 'up' ? (
              <IconTrendingUp className="w-4 h-4" />
            ) : trend === 'down' ? (
              <IconTrendingDown className="w-4 h-4" />
            ) : (
              <IconMinus className="w-4 h-4" />
            )}
            <span className="ml-1 text-sm">
              {Math.abs(scoreDifference)}%
            </span>
          </div>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.currentScore}%</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600 dark:text-gray-300">Average Score</p>
        <p className="text-2xl font-bold mt-2">{stats.averageScore}%</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">Total Assessments</p>
        <p className="text-2xl font-bold mt-2">{stats.totalAssessments}</p>
      </div>
    </div>
  )
} 