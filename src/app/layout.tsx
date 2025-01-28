import '@/styles/globals.css'
import { Inter, Poppins, Outfit, Playfair_Display, Plus_Jakarta_Sans, Lora, Source_Sans_3 } from 'next/font/google'
import type { Metadata } from "next"
import RootLayoutClient from '@/components/RootLayoutClient'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--secondary-font',
  display: 'swap',
  preload: true,
  weight: ['400', '700']
})
const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--primary-font',
  display: 'swap'
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
  title: "AI Healthcare",
  description: "Mental health support powered by Google's Gemini AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fonts = `${inter.variable} ${poppins.variable} ${outfit.variable} ${playfair.variable} ${jakarta.variable} ${lora.variable} ${sourceSans.variable}`

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fonts} font-outfit font-jakarta font-source antialiased min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <RootLayoutClient fonts={fonts}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
