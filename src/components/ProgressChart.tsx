'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { format } from 'date-fns'

Chart.register(...registerables)

type Assessment = {
  createdAt: string
  score: number
}

export default function ProgressChart({ data }: { data: Assessment[] }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // Sort data by date
    const sortedData = [...data].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    // Prepare data for the chart
    const labels = sortedData.map(item => 
      format(new Date(item.createdAt), 'MMM d')
    )
    const scores = sortedData.map(item => item.score)

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Mental Wellbeing Score',
          data: scores,
          fill: true,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: (value) => `${value}%`
            },
            grid: {
              color: 'rgba(156, 163, 175, 0.1)',
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (context) => `Score: ${context.parsed.y}%`
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  if (!data.length) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No assessment data available
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
} 