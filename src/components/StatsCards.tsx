'use client'

import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react'

type Stats = {
  currentScore: number
  previousScore: number
  averageScore: number
  totalAssessments: number
  totalChats: number
  totalJournals: number
}

export default function StatsCards({ stats }: { stats: Stats | null }) {
  if (!stats) return null

  const scoreCards = [
    {
      title: 'Current Score',
      value: `${stats.currentScore}%`,
      change: stats.currentScore - stats.previousScore,
      changeLabel: 'from last assessment'
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`
    }
  ]

  const totalCards = [
    {
      title: 'Total Assessments',
      value: stats.totalAssessments
    },
    {
      title: 'Total Chats',
      value: stats.totalChats
    },
    {
      title: 'Journal Entries',
      value: stats.totalJournals
    }
  ]

  return (
    <div className="space-y-4">
      {/* Score Cards Row */}
      <div className="grid grid-cols-2 gap-4">
        {scoreCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{card.value}</p>
              {card.change && (
                <span className={`text-sm ${
                  card.change > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {card.change > 0 ? '+' : ''}{card.change}%
                </span>
              )}
            </div>
            {card.changeLabel && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {card.changeLabel}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Total Cards Row */}
      <div className="grid grid-cols-3 gap-4">
        {totalCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </h3>
            <div className="mt-2">
              <p className="text-2xl font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 