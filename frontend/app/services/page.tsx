import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, BarChart3, FileText, Share2, Users, Zap, Target } from 'lucide-react'

const services = [
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Advanced Analytics",
    description: "Deep-dive into your performance with comprehensive engagement rates, audience demographics, growth metrics, and competitive analysis that brands actually care about.",
    features: ["Real-time engagement tracking", "Audience demographic analysis", "Growth trend forecasting", "Competitive benchmarking"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Professional Media Kits",
    description: "Generate stunning, branded media kits in minutes with your best content, comprehensive statistics, and professional presentation that converts prospects into partnerships.",
    features: ["AI-powered content selection", "Custom branding options", "PDF and web formats", "Performance tracking"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Brand Partnership Platform",
    description: "Connect with premium brands through our curated partnership platform. Get matched with brands that align with your audience and values for authentic collaborations.",
    features: ["Brand matching algorithm", "Partnership management", "Contract templates", "Payment tracking"],
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Multi-Platform Integration",
    description: "Seamlessly connect and analyze your presence across Instagram, TikTok, YouTube, and more. Get a unified view of your cross-platform influence and engagement.",
    features: ["Cross-platform analytics", "Unified dashboard", "Content synchronization", "Audience overlap analysis"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Brand Readiness Score",
    description: "Get a comprehensive assessment of your partnership readiness with actionable insights and recommendations to improve your profile and attract premium brands.",
    features: ["Readiness assessment", "Improvement recommendations", "Progress tracking", "Industry benchmarks"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Strategic Consulting",
    description: "Work with our team of creator economy experts to develop personalized strategies for growing your influence and securing premium brand partnerships.",
    features: ["1-on-1 strategy sessions", "Growth planning", "Brand outreach guidance", "Performance optimization"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  }
]

export default function ServicesPage() {
  return (
    <PageLayout 
      title="Our Services"
      subtitle="Comprehensive solutions designed specifically for creators who want to turn their influence into measurable business opportunities. From analytics to partnerships, we provide everything you need to succeed."
      backgroundImage="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-32">
              {services.map((service, index) => (
                <MotionInView key={service.title} delay={index * 100}>
                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          {service.icon}
                        </div>
                        <h2 className="font-display text-3xl lg:text-4xl font-light">{service.title}</h2>
                      </div>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-muted-foreground font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button className="bg-primary hover:bg-primary-hover text-white" asChild>
                        <Link href="/signup">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    
                    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <div className="aspect-square rounded-2xl overflow-hidden">
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

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionInView>
              <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                Ready to Transform Your <span className="gradient-text">Influence</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Join thousands of creators who are already using Ifluencesa to build sustainable, 
                profitable partnerships with premium brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8 py-4" asChild>
                  <Link href="/signup">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </div>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
