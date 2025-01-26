'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import UserProfile from '@/components/UserProfile'

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <PageTransition>
      <main className="pt-16">
        <UserProfile />
      </main>
    </PageTransition>
  )
} 