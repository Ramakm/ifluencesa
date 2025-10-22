"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function PremiumNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="font-display text-2xl font-light tracking-wide">Ifluencesa</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-12">
            <Link href="/services" className="text-foreground/70 hover:text-foreground font-light transition-colors">
              Services
            </Link>
            <Link href="/projects" className="text-foreground/70 hover:text-foreground font-light transition-colors">
              Projects
            </Link>
            <Link href="/about" className="text-foreground/70 hover:text-foreground font-light transition-colors">
              About
            </Link>
            <Link href="/login" className="text-foreground/70 hover:text-foreground font-light transition-colors">
              Login
            </Link>
          </nav>
          
          <Button className="bg-primary hover:bg-primary-hover text-white px-6 font-medium" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
