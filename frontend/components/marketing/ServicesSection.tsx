"use client"

import Link from 'next/link'
import { ArrowRight, BarChart3, FileText, Share2 } from 'lucide-react'
import MotionInView from './MotionInView'

const services = [
  {
    number: "01",
    title: "Analytics & Insights",
    description: "Ifluencesa analyzes engagement that combines quality, innovation and durability. Each analysis is tailor-made to offer the optimal brand partnership environment, built to stand the test of time.",
    icon: <BarChart3 className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    number: "02", 
    title: "Media Kit Generation",
    description: "Rethink your brand presence with professional media kits. Modernization, optimization of content and quality presentation: we make your influence a powerful business tool.",
    icon: <FileText className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    number: "03",
    title: "Brand Partnerships",
    description: "Optimize your reach and revenue with strategic brand partnerships. Ifluencesa builds connections that integrate harmoniously with your content, for partnerships that evolve with you.",
    icon: <Share2 className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  }
]

export default function ServicesSection() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <MotionInView>
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl lg:text-6xl font-light mb-6 tracking-tight">
                Your Vision, <span className="gradient-text">Our Mission</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Every creator is unique, and we make every effort to bring your influence to life with precision and commitment. 
                Thanks to our expertise in analytics and media kit creation, we offer solutions tailored to your needs.
              </p>
            </div>
          </MotionInView>
          
          <div className="space-y-24">
            {services.map((service, index) => (
              <MotionInView key={service.number} delay={index * 100}>
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-2">
                    <div className="text-6xl font-display font-light text-primary/20">
                      {service.number}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {service.icon}
                      </div>
                      <h3 className="font-display text-3xl font-light">{service.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8">
                      {service.description}
                    </p>
                    <Link 
                      href="/services" 
                      className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors group"
                    >
                      Learn More 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  
                  <div className="lg:col-span-4">
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl overflow-hidden">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
