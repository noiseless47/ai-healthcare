'use client'

import { motion } from 'framer-motion'
import { IconMail, IconPhone, IconBrandTwitter, IconBrandLinkedin, IconHeart, IconEmergencyBed, IconLifebuoy, IconSend, IconBrandFacebook, IconBrandInstagram, IconBrandGithub } from '@tabler/icons-react'
import PageTransition from '@/components/PageTransition'
import { useState } from 'react'

const emergencyResources = [
  {
    title: "National Crisis Line",
    phone: "988",
    description: "24/7 support for anyone experiencing mental health-related distress",
    icon: IconEmergencyBed
  },
  {
    title: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free 24/7 support at your fingertips",
    icon: IconLifebuoy
  }
]

const supportOptions = [
  {
    title: "General Inquiries",
    description: "Questions about our services or platform",
    email: "info@aihealthcare.com",
    icon: IconMail
  },
  {
    title: "Technical Support",
    description: "Help with technical issues or account-related problems",
    email: "support@aihealthcare.com",
    icon: IconHeart
  }
]

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error: any) {
      console.error('Form submission error:', error)
      setStatus('error')
      setErrorMessage(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow duration-200"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow duration-200"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow duration-200"
          placeholder="How can we help you?"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Your Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={5}
          className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-shadow duration-200"
          placeholder="Tell us more about your inquiry..."
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <IconSend className="w-5 h-5" />
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {status === 'success' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg"
        >
          Thank you! Your message has been sent successfully.
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg"
        >
          {errorMessage || 'Failed to send message. Please try again.'}
        </motion.div>
      )}
    </form>
  )
}

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-16">
        {/* Contact Form Section - Now at the top */}
        <section className="py-12 bg-gradient-to-b from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 relative overflow-hidden">
          {/* Add subtle background patterns */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
          
          <div className="container mx-auto px-4 relative"> {/* Added relative for stacking context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center gradient-text">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Emergency Resources Section */}
        <section className="py-12 bg-gradient-to-r from-red-50 via-pink-50 to-red-50 dark:from-red-900/10 dark:via-red-800/10 dark:to-red-900/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-8 text-center text-red-600 dark:text-red-400">
                Emergency Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {emergencyResources.map((resource) => (
                  <div 
                    key={resource.title}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <resource.icon className="w-6 h-6 text-red-500" />
                      <h3 className="text-xl font-semibold">{resource.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {resource.description}
                    </p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {resource.phone}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Options Section */}
        <section className="py-12 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-8 text-center gradient-text">
                Contact Support
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {supportOptions.map((option) => (
                  <div 
                    key={option.title}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <option.icon className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-semibold">{option.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {option.description}
                    </p>
                    <a 
                      href={`mailto:${option.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {option.email}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="py-12 bg-gradient-to-t from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl font-bold mb-8 gradient-text">
                Connect With Us
              </h2>
              <div className="flex justify-center gap-6">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <IconBrandTwitter className="w-6 h-6 text-blue-400" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <IconBrandFacebook className="w-6 h-6 text-blue-600" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <IconBrandInstagram className="w-6 h-6 text-pink-600" />
                </a>
                <a
                  href="https://linkedin.com/in/asishkumaryeleti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <IconBrandLinkedin className="w-6 h-6 text-blue-700" />
                </a>
                <a
                  href="https://github.com/noiseless47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <IconBrandGithub className="w-6 h-6 text-gray-900 dark:text-white" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
} 