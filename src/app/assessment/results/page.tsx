import PageTransition from '@/components/PageTransition'
import AssessmentResults from '@/components/AssessmentResults'

export default function ResultsPage() {
  return (
    <PageTransition>
      <main className="pt-16">
        <AssessmentResults />
      </main>
    </PageTransition>
  )
} 