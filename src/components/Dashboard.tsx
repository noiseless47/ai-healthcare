'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { IconMoodSmile, IconBrain, IconHeartHandshake, IconActivity } from '@tabler/icons-react'

const mockData = [
  { date: '2024-01', score: 65 },
  { date: '2024-02', score: 70 },
  { date: '2024-03', score: 75 },
  { date: '2024-04', score: 72 },
]

const stats = [
  { title: 'Mood Score', value: '75/100', icon: IconMoodSmile, color: 'text-blue-500' },
  { title: 'Assessments Taken', value: '4', icon: IconBrain, color: 'text-green-500' },
  { title: 'Support Sessions', value: '12', icon: IconHeartHandshake, color: 'text-purple-500' },
  { title: 'Progress', value: '+15%', icon: IconActivity, color: 'text-orange-500' },
]

export default function Dashboard() {
  return (
    <section className="section py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold gradient-text">Your Mental Health Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Mental Health Progress</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {[
              { title: 'Completed Weekly Assessment', date: '2 days ago' },
              { title: 'Chat Session with AI Support', date: '4 days ago' },
              { title: 'Accessed Meditation Resources', date: '1 week ago' },
            ].map((activity, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span>{activity.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
} 