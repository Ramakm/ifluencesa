import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Target, Shield } from 'lucide-react'

export default function PartnershipsPage() {
  return (
    <PageLayout 
      title="Brand Partnerships"
      subtitle="Connect with premium brands that align with your values and audience. Our curated partnership platform ensures authentic collaborations that drive real results for both creators and brands."
      backgroundImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    >
      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <MotionInView>
                <div>
                  <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                    Authentic <span className="gradient-text">Partnerships</span>
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                    <p>
                      Build meaningful relationships with brands that share your values and resonate with your audience. 
                      Our partnership platform uses advanced matching algorithms to connect you with opportunities 
                      that align with your content style and audience demographics.
                    </p>
                    <p>
                      From micro-influencer campaigns to major brand ambassadorships, we facilitate partnerships 
                      that create value for everyone involved - you, the brands, and most importantly, your audience.
                    </p>
                  </div>
                </div>
              </MotionInView>
              
              <MotionInView delay={200}>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Brand partnerships"
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
                Start Building <span className="gradient-text">Partnerships</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Connect with brands that value authentic influence and meaningful collaborations.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8 py-4" asChild>
                <Link href="/signup">
                  Explore Partnerships <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
