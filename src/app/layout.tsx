import '@/styles/globals.css'
import { Inter, Poppins, Outfit, Playfair_Display, Plus_Jakarta_Sans, Lora, Source_Sans_3 } from 'next/font/google'
import type { Metadata } from "next"
import { Providers } from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/AuthProvider'
import Link from 'next/link'
import { IconMessage, IconBrain } from '@tabler/icons-react'

const inter = Inter({ subsets: ['latin'], variable: '--secondary-font' })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--primary-font'
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700']
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700']
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700']
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  weight: ['400', '500', '600', '700']
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
      <body className={`${inter.variable} ${poppins.variable} ${outfit.variable} ${playfair.variable} ${jakarta.variable} ${lora.variable} ${sourceSans.variable} font-outfit font-jakarta font-source antialiased min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <AuthProvider>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
              
              {/* Floating Action Buttons */}
              <div className="fixed bottom-6 right-6 flex flex-col-reverse gap-4 z-50">
                <Link
                  href="/chat"
                  className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                  aria-label="Open AI Chat"
                >
                  <IconMessage className="w-6 h-6" />
                </Link>
                <Link
                  href="/assessment"
                  className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
                  aria-label="Take Assessment"
                >
                  <IconBrain className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
