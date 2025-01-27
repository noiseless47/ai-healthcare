'use client'

import PageTransition from '@/components/PageTransition'
import ChatHistory from '@/components/ChatHistory'

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat History Section */}
            <div className="lg:col-span-1">
              <ChatHistory />
            </div>

            {/* Other dashboard components can go here */}
            <div className="lg:col-span-1">
              {/* Add other components like AssessmentHistory, MoodTracker, etc. */}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 