import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    description: "Get in touch with our team",
    contact: "hello@ifluencesa.com",
    action: "mailto:hello@ifluencesa.com"
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    description: "Speak with a specialist",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567"
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Visit Us",
    description: "Our headquarters",
    contact: "San Francisco, CA",
    action: "#"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Business Hours",
    description: "Monday - Friday",
    contact: "9:00 AM - 6:00 PM PST",
    action: "#"
  }
]

export default function ContactPage() {
  return (
    <PageLayout 
      title="Contact Us"
      subtitle="Ready to transform your influence into sustainable partnerships? Get in touch with our team of creator economy experts. We're here to help you build the future of your creator business."
      backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    >
      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactMethods.map((method, index) => (
                <MotionInView key={method.title} delay={index * 100}>
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                        {method.icon}
                      </div>
                      <CardTitle className="text-lg font-light">{method.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground font-light mb-3">{method.description}</p>
                      <a 
                        href={method.action}
                        className="text-primary hover:text-primary-hover font-medium transition-colors"
                      >
                        {method.contact}
                      </a>
                    </CardContent>
                  </Card>
                </MotionInView>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <MotionInView>
                <div>
                  <h2 className="font-display text-3xl lg:text-4xl font-light mb-6">
                    Let's Start a <span className="gradient-text">Conversation</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8">
                    Whether you're just starting your creator journey or looking to scale your existing 
                    influence, our team is here to help. Tell us about your goals and we'll show you 
                    how Ifluencesa can help you achieve them.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                      <div>
                        <h3 className="font-medium mb-2">Free Consultation</h3>
                        <p className="text-muted-foreground font-light">
                          30-minute strategy session to discuss your creator goals and challenges.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                      <div>
                        <h3 className="font-medium mb-2">Custom Solutions</h3>
                        <p className="text-muted-foreground font-light">
                          Tailored recommendations based on your niche, audience, and objectives.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                      <div>
                        <h3 className="font-medium mb-2">Ongoing Support</h3>
                        <p className="text-muted-foreground font-light">
                          Dedicated support team to help you maximize your creator potential.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionInView>

              <MotionInView delay={200}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl font-light">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Creator Type</label>
                      <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
                        <option>Select your niche</option>
                        <option>Lifestyle</option>
                        <option>Technology</option>
                        <option>Fitness & Wellness</option>
                        <option>Beauty & Fashion</option>
                        <option>Food & Travel</option>
                        <option>Gaming</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your goals and how we can help..."
                      ></textarea>
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary-hover text-white py-3">
                      Send Message <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </MotionInView>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <MotionInView>
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl lg:text-4xl font-light mb-6">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
                <p className="text-lg text-muted-foreground font-light">
                  Quick answers to common questions about our services and platform.
                </p>
              </div>
            </MotionInView>
            
            <div className="space-y-6">
              {[
                {
                  question: "How quickly can I create my first media kit?",
                  answer: "Most creators can generate their first professional media kit within 10-15 minutes of connecting their social media accounts. Our AI-powered system automatically analyzes your content and creates a compelling presentation."
                },
                {
                  question: "What social media platforms do you support?",
                  answer: "We currently support Instagram, TikTok, YouTube, Twitter, and LinkedIn. We're continuously adding new platforms based on creator demand and platform API availability."
                },
                {
                  question: "How do you ensure brand partnerships are authentic?",
                  answer: "Our matching algorithm considers audience demographics, engagement quality, content alignment, and brand values to ensure authentic partnerships that resonate with both creators and their audiences."
                },
                {
                  question: "Can I customize my media kit design?",
                  answer: "Absolutely! Our Pro plan includes custom branding options, multiple template choices, and the ability to add your own brand colors, fonts, and styling to match your personal brand."
                }
              ].map((faq, index) => (
                <MotionInView key={index} delay={index * 100}>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground font-light leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
