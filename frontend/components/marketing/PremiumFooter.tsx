"use client"

import Link from 'next/link'

export default function PremiumFooter() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-6">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <span className="font-display text-3xl font-light tracking-wide">Ifluencesa</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-md mb-8">
                Transform your social influence into professional media kits with precision, 
                innovation and expertise that stands the test of time.
              </p>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">© 2024 Ifluencesa. All rights reserved.</p>
                <p>Building the future of creator partnerships.</p>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-light mb-6">Services</h3>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li><Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link></li>
                <li><Link href="/media-kits" className="hover:text-foreground transition-colors">Media Kits</Link></li>
                <li><Link href="/partnerships" className="hover:text-foreground transition-colors">Partnerships</Link></li>
                <li><Link href="/consulting" className="hover:text-foreground transition-colors">Consulting</Link></li>
              </ul>
            </div>
            
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-light mb-6">Company</h3>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-light mb-6">Resources</h3>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
                <li><Link href="/support" className="hover:text-foreground transition-colors">Support</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="section-divider my-16"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="mb-4 md:mb-0">
              <span className="font-light">A history of trust and knowledge since 2024</span>
            </div>
            <div className="flex space-x-8">
              <Link href="/terms" className="hover:text-foreground transition-colors font-light">Terms</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors font-light">Privacy</Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors font-light">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
