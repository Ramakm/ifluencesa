"use client"

import PremiumNavbar from '@/components/marketing/PremiumNavbar'
import PremiumFooter from '@/components/marketing/PremiumFooter'
import MotionInView from '@/components/marketing/MotionInView'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageLayout({ children, title, subtitle, backgroundImage }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PremiumNavbar />
      
      {/* Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        {backgroundImage && (
          <div className="absolute inset-0">
            <img 
              src={backgroundImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/90"></div>
          </div>
        )}
        <div className="absolute inset-0 hero-pattern opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <MotionInView>
              <h1 className="font-display text-5xl lg:text-7xl font-light mb-6 leading-tight tracking-tight">
                {title}
              </h1>
            </MotionInView>
            {subtitle && (
              <MotionInView delay={100}>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                  {subtitle}
                </p>
              </MotionInView>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1">
        {children}
      </main>

      <PremiumFooter />
    </div>
  )
}
