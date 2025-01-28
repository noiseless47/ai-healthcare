import ApplicationsClient from '@/components/ApplicationsClient'

export const dynamic = 'force-static'
export const revalidate = 3600

export default function ApplicationsPage() {
  return <ApplicationsClient />
} 