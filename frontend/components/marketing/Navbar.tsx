"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-2xl font-bold gradient-text">Ifluencesa</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Login
          </Link>
          <Button className="bg-primary hover:bg-[hsl(189,94%,43%)] text-primary-foreground px-6" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
