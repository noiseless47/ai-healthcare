import PageTransition from '@/components/PageTransition'
import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  return (
    <PageTransition>
      <main className="pt-16">
        <Dashboard />
      </main>
    </PageTransition>
  )
} 