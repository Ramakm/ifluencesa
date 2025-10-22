import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Windsurf - Influencer Media Kit Generator',
  description: 'Transform your social influence into professional media kits with engagement analytics and PDF generation.',
  keywords: ['influencer', 'media kit', 'engagement', 'analytics', 'social media'],
  authors: [{ name: 'Windsurf Team' }],
  openGraph: {
    title: 'Windsurf - Influencer Media Kit Generator',
    description: 'Transform your social influence into professional media kits',
    url: 'https://windsurf.app',
    siteName: 'Windsurf',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Windsurf - Influencer Media Kit Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windsurf - Influencer Media Kit Generator',
    description: 'Transform your social influence into professional media kits',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
