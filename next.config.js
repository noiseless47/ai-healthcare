/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',  // For Google profile images
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',  // For GitHub profile images
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',  // If you're using Clerk for auth
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typescript: {
    ignoreBuildErrors: true, // Only during development
  },
  eslint: {
    ignoreDuringBuilds: true, // Only during development
  }
}

module.exports = nextConfig 