"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import MotionInView from './MotionInView'

export default function PremiumHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with high-quality influencer image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80"
          alt="Professional content creator workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85"></div>
      </div>
      <div className="absolute inset-0 hero-pattern opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <MotionInView>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                Transform Your Influence
              </span>
            </div>
          </MotionInView>
          
          <MotionInView delay={100}>
            <h1 className="font-display text-6xl lg:text-8xl font-light mb-8 leading-tight tracking-tight">
              The Art of Building
              <br />
              <span className="gradient-text font-normal">Professional Media Kits</span>
            </h1>
          </MotionInView>
          
          <MotionInView delay={200}>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Specializing in creator partnerships, Ifluencesa creates sustainable media kits that combine 
              quality, innovation, and expertise. With an approach focused on excellence and attention to detail, 
              we build brand relationships designed to stand the test of time.
            </p>
          </MotionInView>
          
          <MotionInView delay={300}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 text-lg font-medium" asChild>
                <Link href="/signup">
                  Explore Our Platform <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted px-8 py-4 text-lg font-medium" asChild>
                <Link href="/media-kit/demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </MotionInView>
          
          <MotionInView delay={400}>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <div className="text-3xl font-display font-light text-primary mb-2">2.5x</div>
                <p className="text-sm text-muted-foreground">Higher Response Rates</p>
              </div>
              <div>
                <div className="text-3xl font-display font-light text-primary mb-2">10min</div>
                <p className="text-sm text-muted-foreground">Average Creation Time</p>
              </div>
              <div>
                <div className="text-3xl font-display font-light text-primary mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Creator Satisfaction</p>
              </div>
            </div>
          </MotionInView>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
      </div>
    </section>
  )
}
