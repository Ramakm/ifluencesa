import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle } from 'lucide-react'

const analyticsFeatures = [
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Engagement Analytics",
    description: "Track likes, comments, shares, and saves across all your content to understand what resonates with your audience.",
    metrics: ["Engagement Rate", "Reach & Impressions", "Content Performance", "Audience Growth"]
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Audience Insights",
    description: "Deep dive into your follower demographics, interests, and behavior patterns to optimize your content strategy.",
    metrics: ["Demographics", "Interests", "Activity Patterns", "Geographic Data"]
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Growth Tracking",
    description: "Monitor your follower growth, engagement trends, and content performance over time with detailed reporting.",
    metrics: ["Growth Rate", "Trend Analysis", "Performance Benchmarks", "Competitor Comparison"]
  }
]

export default function AnalyticsPage() {
  return (
    <PageLayout 
      title="Advanced Analytics"
      subtitle="Unlock the power of data-driven content creation. Our comprehensive analytics platform provides the insights you need to grow your influence and attract premium brand partnerships."
      backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-24">
              {analyticsFeatures.map((feature, index) => (
                <MotionInView key={feature.title} delay={index * 100}>
                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          {feature.icon}
                        </div>
                        <h2 className="font-display text-3xl lg:text-4xl font-light">{feature.title}</h2>
                      </div>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8">
                        {feature.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {feature.metrics.map((metric, metricIndex) => (
                          <div key={metricIndex} className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium text-foreground">{metric}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="bg-primary hover:bg-primary-hover text-white" asChild>
                        <Link href="/signup">
                          Start Analyzing <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    
                    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            {feature.icon}
                          </div>
                          <p className="text-muted-foreground font-light">Analytics Dashboard Preview</p>
                        </div>
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
                Ready to Unlock Your <span className="gradient-text">Data Potential</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Start making data-driven decisions that grow your influence and attract premium brand partnerships.
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
