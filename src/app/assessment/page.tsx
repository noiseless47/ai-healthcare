import Assessment from '@/components/Assessment'
import PageTransition from '@/components/PageTransition'

export default function AssessmentPage() {
  return (
    <PageTransition>
      <main className="pt-16">
        <Assessment />
      </main>
    </PageTransition>
  )
} 