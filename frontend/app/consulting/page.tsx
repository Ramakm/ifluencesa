import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Users, Target, TrendingUp } from 'lucide-react'

export default function ConsultingPage() {
  return (
    <PageLayout 
      title="Strategic Consulting"
      subtitle="Work with our team of creator economy experts to develop personalized strategies for growing your influence, optimizing your content, and securing premium brand partnerships."
      backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    >
      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <MotionInView>
                <div>
                  <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                    Expert <span className="gradient-text">Guidance</span>
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                    <p>
                      Get personalized guidance from industry experts who understand the creator economy inside and out. 
                      Our consultants have helped thousands of creators build sustainable, profitable businesses 
                      through strategic content planning and brand partnerships.
                    </p>
                    <p>
                      Whether you're just starting your creator journey or looking to scale your existing influence, 
                      our team provides actionable insights and proven strategies tailored to your unique goals and audience.
                    </p>
                  </div>
                </div>
              </MotionInView>
              
              <MotionInView delay={200}>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="Strategic consulting"
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
                Ready to <span className="gradient-text">Scale</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Book a consultation with our creator economy experts and start building your strategic roadmap.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8 py-4" asChild>
                <Link href="/contact">
                  Book Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
