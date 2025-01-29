import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import JournalClient from '@/components/JournalClient'

export default async function JournalPage() {
  const session = await getServerSession()
  
  if (!session?.user) {
    redirect('/login')
  }

  return <JournalClient />
} 