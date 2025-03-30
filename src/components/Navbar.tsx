'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { IconUser, IconBrain } from '@tabler/icons-react'
import { springConfig } from '@/utils/animations'
import ThemeToggle from './ThemeToggle'
import UserMenu from './UserMenu'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/chat', label: 'AI Chat' },
    { href: '/assessment', label: 'Assessment' },
    { href: '/community', label: 'Community' },
    { href: '/resources', label: 'Resources' },
    { href: '/benefits', label: 'Benefits' },
    { href: '/applications', label: 'Applications' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center gap-2">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                className="text-blue-600 dark:text-blue-500"
              >
                <path
                  d="M12 4C8 4 4 7 4 12C4 14.5 5.5 16.5 7 18V20H17V18C18.5 16.5 20 14.5 20 12C20 7 16 4 12 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M12 8V16M8 12H16"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="10" r="1" fill="currentColor" />
                <circle cx="16" cy="10" r="1" fill="currentColor" />
                <circle cx="8" cy="14" r="1" fill="currentColor" />
                <circle cx="16" cy="14" r="1" fill="currentColor" />
                <path
                  d="M8 10L12 12L16 10M8 14L12 12L16 14"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <span className="text-2xl font-bold gradient-text">
                Healthcare AI
              </span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center justify-center flex-1 space-x-6 px-4"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springConfig}
              >
                <Link
                  href={link.href}
                  className={`nav-link whitespace-nowrap ${
                    isActive(link.href) ? 'text-blue-600 dark:text-blue-400' : ''
                  } ${
                    (link.href === '/chat' || link.href === '/assessment')
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 font-semibold hover:opacity-80 transition-opacity'
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <IconUser className="w-6 h-6" />
                    )}
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive(link.href) ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800' : ''
                  } ${
                    (link.href === '/chat' || link.href === '/assessment')
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 font-semibold hover:opacity-80 transition-opacity'
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <DarkModeToggle />
              </div>
              <div className="px-3 py-2">
                {session ? (
                  <Link
                    href="/profile"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <IconUser className="w-6 h-6" />
                    )}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar 