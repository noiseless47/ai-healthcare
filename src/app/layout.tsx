import '@/styles/globals.css'
import { Inter, Poppins } from 'next/font/google'
import type { Metadata } from "next"
import { Providers } from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/AuthProvider'
import Link from 'next/link'
import { IconMessage } from '@tabler/icons-react'

const inter = Inter({ subsets: ['latin'], variable: '--secondary-font' })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--primary-font'
})

export const metadata: Metadata = {
  title: "AI Mental Health Support",
  description: "Mental health support powered by Google's Gemini AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <AuthProvider>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
              
              {/* Floating Chat Button */}
              <Link
                href="/chat"
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
                aria-label="Open AI Chat"
              >
                <IconMessage className="w-6 h-6" />
              </Link>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
