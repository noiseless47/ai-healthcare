'use client'

import Link from 'next/link'
import { 
  IconBrandGithub, 
  IconBrandTwitter, 
  IconBrandLinkedin, 
  IconBrandInstagram,
  IconBrandFacebook
} from '@tabler/icons-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI Healthcare</h3>
            <p className="text-gray-400">Transforming healthcare through artificial intelligence.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: info@aihealthcare.com</p>
            <p className="text-gray-400">Phone: +91 98765 43210</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com" 
                target="_blank"
                className="text-gray-400 hover:text-white transition"
              >
                <IconBrandTwitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="text-gray-400 hover:text-white transition"
              >
                <IconBrandFacebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="text-gray-400 hover:text-white transition"
              >
                <IconBrandInstagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://linkedin.com/in/asishkumaryeleti" 
                target="_blank"
                className="text-gray-400 hover:text-white transition"
              >
                <IconBrandLinkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link 
                href="https://github.com/noiseless47" 
                target="_blank"
                className="text-gray-400 hover:text-white transition"
              >
                <IconBrandGithub className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} AI Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 