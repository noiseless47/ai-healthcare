'use client'

import { IconTrendingUp, IconTrendingDown, IconMinus, IconBrain, IconChartBar, IconClipboard, IconMessage } from '@tabler/icons-react'

type Stats = {
  currentScore: number
  previousScore: number
  averageScore: number
  totalAssessments: number
  totalChats: number
}

export default function StatsCards({ stats }: { stats: Stats | null }) {
  if (!stats) return null

  const cards = [
    {
      title: 'Mental Health Score',
      value: stats.currentScore,
      previousValue: stats.previousScore,
      change: stats.currentScore - stats.previousScore,
      icon: IconBrain,
      color: getScoreColor(stats.currentScore)
    },
    {
      title: 'Average Score',
      value: stats.averageScore,
      icon: IconChartBar,
      color: getScoreColor(stats.averageScore)
    },
    {
      title: 'Total Assessments',
      value: stats.totalAssessments,
      icon: IconClipboard,
      color: 'text-indigo-500'
    },
    {
      title: 'Chat Interactions',
      value: stats.totalChats,
      icon: IconMessage,
      color: 'text-blue-500'
    },
  ]

  return (
    <div className="space-y-4">
      {/* Score Cards Row */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
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
          </div>
        ))}
      </div>
    </div>
  )
} 