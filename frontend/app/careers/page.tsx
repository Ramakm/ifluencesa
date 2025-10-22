import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Users, Heart } from 'lucide-react'

const positions = [
  {
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Join our engineering team to build the next generation of creator economy tools. You'll work on scalable systems that serve millions of creators worldwide."
  },
  {
    title: "Product Designer",
    department: "Design", 
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Design beautiful, intuitive experiences for creators and brands. Help shape the future of how influence is measured and monetized."
  },
  {
    title: "Creator Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time", 
    description: "Work directly with top creators to help them maximize their success on our platform. Build relationships and drive adoption of our premium features."
  },
  {
    title: "Data Scientist",
    department: "Analytics",
    location: "San Francisco, CA / Remote", 
    type: "Full-time",
    description: "Develop algorithms and models that power our analytics engine. Help creators understand their audience and optimize their content strategy."
  }
]

const benefits = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipends."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours. Unlimited PTO and sabbatical opportunities."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Growth & Learning",
    description: "Professional development budget, conference attendance, and mentorship programs."
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Equity & Impact",
    description: "Competitive equity package and the opportunity to shape the creator economy."
  }
]

export default function CareersPage() {
  return (
    <PageLayout 
      title="Join Our Team"
      subtitle="Help us build the future of the creator economy. We're looking for passionate individuals who want to empower creators and transform how influence is measured and monetized."
      backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    >
      {/* Culture Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <MotionInView>
                <div>
                  <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                    Our <span className="gradient-text">Culture</span>
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                    <p>
                      At Ifluencesa, we believe that the best work happens when talented people are 
                      empowered to do what they love. We're building a company where creativity, 
                      innovation, and impact drive everything we do.
                    </p>
                    <p>
                      Our team is passionate about democratizing the creator economy and giving every 
                      influencer the tools they need to build sustainable, profitable businesses. 
                      We value diversity, authenticity, and the unique perspectives each team member brings.
                    </p>
                    <p>
                      Join us in shaping the future of how creators connect with brands and monetize 
                      their influence. Together, we're building something that matters.
                    </p>
                  </div>
                </div>
              </MotionInView>
              
              <MotionInView delay={200}>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </MotionInView>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <MotionInView key={benefit.title} delay={index * 100}>
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                        {benefit.icon}
                      </div>
                      <CardTitle className="text-lg font-light">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground font-light leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <MotionInView>
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl lg:text-5xl font-light mb-6 tracking-tight">
                  Open <span className="gradient-text">Positions</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                  We're always looking for exceptional talent to join our mission. 
                  Don't see a perfect fit? We'd still love to hear from you.
                </p>
              </div>
            </MotionInView>
            
            <div className="space-y-6">
              {positions.map((position, index) => (
                <MotionInView key={position.title} delay={index * 100}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <h3 className="font-display text-2xl font-light">{position.title}</h3>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                              {position.department}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {position.type}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground font-light leading-relaxed">
                            {position.description}
                          </p>
                        </div>
                        
                        <div className="lg:ml-8">
                          <Button className="bg-primary hover:bg-primary-hover text-white" asChild>
                            <Link href="/contact">
                              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionInView>
              <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                Ready to Make an <span className="gradient-text">Impact</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Join a team that's passionate about empowering creators and building the future 
                of the creator economy. Let's create something amazing together.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8 py-4" asChild>
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
