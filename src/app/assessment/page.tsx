import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import AssessmentPage from '@/components/AssessmentPage'

export default async function Page() {
  const session = await getServerSession()
  
  if (!session?.user) {
    redirect('/login')
  }

  return <AssessmentPage />
} 