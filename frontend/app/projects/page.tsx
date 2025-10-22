import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: "TechReviewer Pro",
    subtitle: "2024 • Complete Media Kit Transformation",
    category: "Technology Creator",
    description: "Complete media kit transformation for a leading tech reviewer with 2.5M followers across platforms. Featured advanced analytics integration, custom branding, and premium brand presentation that resulted in 300% increase in partnership inquiries.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
    results: ["300% increase in partnership inquiries", "Average deal value increased by 150%", "Reduced negotiation time by 60%"],
    tags: ["Analytics", "Media Kit", "Branding"]
  },
  {
    title: "LifestyleMaven",
    subtitle: "2024 • Partnership Platform Development",
    category: "Lifestyle Content Creator",
    description: "Strategic partnership platform development connecting lifestyle creators with premium fashion and beauty brands. Implemented data-driven matching algorithm and streamlined collaboration workflows.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    results: ["Secured partnerships with 15+ premium brands", "Generated $250K in partnership revenue", "Built audience of 1.8M engaged followers"],
    tags: ["Partnerships", "Strategy", "Revenue Growth"]
  },
  {
    title: "FitnessInfluencer Elite",
    subtitle: "2024 • Analytics Dashboard & Strategy",
    category: "Fitness & Wellness Creator",
    description: "Comprehensive analytics dashboard and growth strategy for fitness content creator. Showcased engagement metrics, audience insights, and performance optimization that led to major supplement brand partnerships.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    results: ["Landed exclusive supplement brand partnership", "Audience growth of 400% in 6 months", "Engagement rate improved to 8.5%"],
    tags: ["Analytics", "Growth Strategy", "Partnerships"]
  },
  {
    title: "FoodieExplorer",
    subtitle: "2024 • Multi-Platform Integration",
    category: "Food & Travel Creator",
    description: "Multi-platform content strategy and media kit development for food and travel creator. Integrated Instagram, TikTok, and YouTube analytics for comprehensive brand presentation.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    results: ["Unified 3-platform presence", "Restaurant partnership program launched", "Monthly revenue increased by 200%"],
    tags: ["Multi-Platform", "Content Strategy", "Hospitality"]
  },
  {
    title: "BeautyGuru Collective",
    subtitle: "2024 • Brand Readiness Optimization",
    category: "Beauty & Skincare Creator",
    description: "Brand readiness assessment and optimization for beauty content creator. Implemented strategic improvements that elevated partnership opportunities with luxury beauty brands.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    results: ["Brand readiness score improved to 95%", "Luxury brand partnerships secured", "Content quality metrics increased 180%"],
    tags: ["Brand Readiness", "Luxury Partnerships", "Optimization"]
  },
  {
    title: "GameStreamer Pro",
    subtitle: "2024 • Gaming Creator Ecosystem",
    category: "Gaming & Esports Creator",
    description: "Comprehensive creator ecosystem development for gaming influencer including analytics, sponsorship management, and audience engagement optimization across Twitch and YouTube.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    results: ["Gaming brand partnerships worth $500K", "Audience engagement up 250%", "Streaming revenue optimized by 300%"],
    tags: ["Gaming", "Streaming", "Sponsorships"]
  }
]

export default function ProjectsPage() {
  return (
    <PageLayout 
      title="Our Projects"
      subtitle="Be inspired by media kits and creator partnerships designed to stand the test of time, combining design, quality and performance. Immerse yourself in our success stories to better imagine the influence platform that's right for you."
      backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    >
      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {projects.map((project, index) => (
                <MotionInView key={project.title} delay={index * 100}>
                  <div className="group">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 relative">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-light rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute top-6 right-6">
                        <ExternalLink className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display text-2xl lg:text-3xl font-light group-hover:text-primary transition-colors mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-2" />
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed font-light mb-6">
                        {project.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <h4 className="font-medium text-foreground">Key Results:</h4>
                        <ul className="space-y-2">
                          {project.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="text-sm text-muted-foreground font-light">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
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
                Ready to Create Your <span className="gradient-text">Success Story</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Join the creators who have transformed their influence into sustainable business success. 
                Let's build your next chapter together.
              </p>
              <Link 
                href="/signup"
                className="inline-flex items-center bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-colors group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
