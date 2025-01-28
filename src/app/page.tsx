import HomeClient from '@/components/HomeClient'

export const dynamic = 'force-static'
export const revalidate = 3600

export default function HomePage() {
  return <HomeClient />
}
