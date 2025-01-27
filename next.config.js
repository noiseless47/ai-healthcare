/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  typescript: {
    ignoreBuildErrors: true, // Only during development
  },
  eslint: {
    ignoreDuringBuilds: true, // Only during development
  }
}

module.exports = nextConfig 