import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Ifluencesa - Influencer Media Kit Generator',
  description: 'Transform your social influence into professional media kits with engagement analytics and PDF generation.',
  keywords: ['influencer', 'media kit', 'engagement', 'analytics', 'social media'],
  authors: [{ name: 'Ifluencesa Team' }],
  openGraph: {
    title: 'Ifluencesa - Influencer Media Kit Generator',
    description: 'Transform your social influence into professional media kits',
    url: 'https://Ifluencesa.app',
    siteName: 'Ifluencesa',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ifluencesa - Influencer Media Kit Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ifluencesa - Influencer Media Kit Generator',
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
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
