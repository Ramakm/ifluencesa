import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { MessageCircle, Book, Video, Mail, Search, ArrowRight, HelpCircle, Zap, Shield } from 'lucide-react'

const supportOptions = [
  {
    icon: <MessageCircle className="h-8 w-8" />,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "Available 24/7",
    action: "Start Chat",
    href: "#chat"
  },
  {
    icon: <Mail className="h-8 w-8" />,
    title: "Email Support", 
    description: "Send us a detailed message",
    availability: "Response within 24 hours",
    action: "Send Email",
    href: "mailto:support@ifluencesa.com"
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Help Center",
    description: "Browse our comprehensive guides",
    availability: "Self-service resources",
    action: "Browse Articles",
    href: "#help-center"
  },
  {
    icon: <Video className="h-8 w-8" />,
    title: "Video Tutorials",
    description: "Watch step-by-step tutorials",
    availability: "On-demand learning",
    action: "Watch Videos",
    href: "#tutorials"
  }
]

const faqCategories = [
  {
    icon: <HelpCircle className="h-6 w-6" />,
    title: "Getting Started",
    questions: [
      "How do I create my first media kit?",
      "What social media platforms do you support?",
      "How do I connect my social media accounts?",
      "What's included in the free plan?"
    ]
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Features & Analytics",
    questions: [
      "How are engagement rates calculated?",
      "Can I customize my media kit design?",
      "How often is my data updated?",
      "What metrics do brands care about most?"
    ]
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Account & Billing",
    questions: [
      "How do I upgrade my plan?",
      "Can I cancel my subscription anytime?",
      "How do I update my payment method?",
      "Do you offer refunds?"
    ]
  }
]

export default function SupportPage() {
  return (
    <PageLayout 
      title="Support Center"
      subtitle="Get the help you need to make the most of Ifluencesa. Our team is here to support your creator journey every step of the way."
      backgroundImage="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      {/* Support Options */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <MotionInView>
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl lg:text-4xl font-light mb-6">
                  How Can We <span className="gradient-text">Help You</span>?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                  Choose the support option that works best for you. Our team is ready to help you succeed.
                </p>
              </div>
            </MotionInView>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportOptions.map((option, index) => (
                <MotionInView key={option.title} delay={index * 100}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-6">
                        {option.icon}
                      </div>
                      <CardTitle className="text-xl font-light mb-3">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground font-light mb-4 leading-relaxed">
                        {option.description}
                      </p>
                      <p className="text-sm text-primary font-medium mb-6">
                        {option.availability}
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary-hover text-white" asChild>
                        <Link href={option.href}>
                          {option.action}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <MotionInView>
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-light mb-4">
                  Search Our <span className="gradient-text">Knowledge Base</span>
                </h3>
                <p className="text-muted-foreground font-light">
                  Find answers to common questions and learn how to use our features.
                </p>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search for help articles, tutorials, and guides..."
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-lg"
                />
                <Button className="absolute right-2 top-2 bg-primary hover:bg-primary-hover text-white">
                  Search
                </Button>
              </div>
            </MotionInView>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <MotionInView>
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl lg:text-4xl font-light mb-6">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                  Quick answers to the most common questions from our creator community.
                </p>
              </div>
            </MotionInView>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {faqCategories.map((category, index) => (
                <MotionInView key={category.title} delay={index * 150}>
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        {category.icon}
                      </div>
                      <h3 className="font-display text-2xl font-light">{category.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.questions.map((question, questionIndex) => (
                        <div 
                          key={questionIndex}
                          className="group cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground group-hover:text-foreground font-light transition-colors">
                              {question}
                            </p>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionInView>
              <h2 className="font-display text-3xl lg:text-4xl font-light mb-8">
                Still Need <span className="gradient-text">Help</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Our support team is here to help you succeed. Get personalized assistance 
                with your creator journey and platform questions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8 py-4" asChild>
                  <Link href="/contact">
                    Contact Support <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                  <Link href="#chat">Start Live Chat</Link>
                </Button>
              </div>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
