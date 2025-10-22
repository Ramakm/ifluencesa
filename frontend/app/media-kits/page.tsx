import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, FileText, Palette, Download, Share2 } from 'lucide-react'

export default function MediaKitsPage() {
  return (
    <PageLayout 
      title="Professional Media Kits"
      subtitle="Create stunning, professional media kits that showcase your influence and convert brand inquiries into profitable partnerships. Stand out with designs that reflect your unique brand."
      backgroundImage="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <MotionInView>
                <div>
                  <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                    Media Kits That <span className="gradient-text">Convert</span>
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                    <p>
                      Your media kit is often the first impression brands have of your work. Make it count with 
                      professionally designed templates that highlight your best content, showcase your analytics, 
                      and present your brand story in a compelling way.
                    </p>
                    <p>
                      Our AI-powered system automatically selects your top-performing content, calculates key 
                      metrics that brands care about, and presents everything in a beautiful, branded format 
                      that gets results.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mt-12">
                    <div className="text-center">
                      <div className="text-3xl font-display font-light text-primary mb-2">10min</div>
                      <p className="text-sm text-muted-foreground">Average Creation Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-display font-light text-primary mb-2">3x</div>
                      <p className="text-sm text-muted-foreground">Higher Response Rate</p>
                    </div>
                  </div>
                </div>
              </MotionInView>
              
              <MotionInView delay={200}>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Media kit creation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </MotionInView>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionInView>
              <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                Create Your First <span className="gradient-text">Media Kit</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Join thousands of creators who have transformed their influence into professional presentations.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8 py-4" asChild>
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
