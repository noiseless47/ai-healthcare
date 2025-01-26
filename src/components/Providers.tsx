'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Return a placeholder during SSR
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light"
      enableSystem={true}
      themes={['light', 'dark']}
      value={{
        light: 'light',
        dark: 'dark',
      }}
    >
      {children}
    </ThemeProvider>
  )
} 