/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'localhost',
      'supabase.co',
      'your-project.supabase.co', // Replace with your Supabase project URL
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com', // Google profile images
    ],
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
