import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react'

const guides = [
  {
    title: "The Complete Guide to Creator Media Kits",
    description: "Everything you need to know about creating professional media kits that convert brand inquiries into partnerships.",
    readTime: "15 min read",
    category: "Media Kits",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Understanding Your Analytics: Metrics That Matter",
    description: "Learn which metrics brands actually care about and how to present your data in the most compelling way.",
    readTime: "12 min read", 
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Building Authentic Brand Relationships",
    description: "A step-by-step guide to identifying, approaching, and maintaining meaningful partnerships with brands.",
    readTime: "18 min read",
    category: "Partnerships",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    title: "Content Strategy for Creator Success",
    description: "Develop a content strategy that grows your audience while maintaining authenticity and engagement.",
    readTime: "20 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80"
  },
  {
    title: "Pricing Your Influence: A Creator's Guide",
    description: "Learn how to price your services competitively while ensuring you're valued appropriately for your influence.",
    readTime: "10 min read",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
  },
  {
    title: "Multi-Platform Creator Strategy",
    description: "Maximize your reach and engagement by developing a cohesive strategy across multiple social platforms.",
    readTime: "16 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80"
  }
]

export default function GuidesPage() {
  return (
    <PageLayout 
      title="Creator Guides"
      subtitle="Comprehensive guides and resources to help you build a successful creator business. Learn from industry experts and proven strategies that drive real results."
      backgroundImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80"
    >
      {/* Guides Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {guides.map((guide, index) => (
                <MotionInView key={guide.title} delay={index * 100}>
                  <article className="group cursor-pointer">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                      <img 
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {guide.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {guide.readTime}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-xl lg:text-2xl font-light mb-4 leading-tight group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed font-light mb-6">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        href="/guides/guide-slug"
                        className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors group"
                      >
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      
                      <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </article>
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
                Ready to <span className="gradient-text">Learn More</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Get access to our complete library of creator guides, templates, and resources 
                when you join Ifluencesa.
              </p>
              <Link 
                href="/signup"
                className="inline-flex items-center bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-colors group"
              >
                Get Full Access
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
