import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import Link from 'next/link'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'

const blogPosts = [
  {
    title: "The Future of Creator Partnerships: Trends to Watch in 2024",
    excerpt: "Explore the evolving landscape of brand-creator collaborations and discover the key trends shaping the future of influencer marketing.",
    author: "Sarah Chen",
    date: "December 15, 2024",
    category: "Industry Insights",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80",
    featured: true
  },
  {
    title: "Building Authentic Brand Relationships: A Creator's Guide",
    excerpt: "Learn how to identify, approach, and maintain meaningful partnerships with brands that align with your values and audience.",
    author: "Marcus Rodriguez",
    date: "December 12, 2024", 
    category: "Creator Tips",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    title: "Analytics That Matter: Understanding Your True Engagement",
    excerpt: "Dive deep into the metrics that actually drive brand partnerships and learn how to present your data effectively.",
    author: "Emma Thompson",
    date: "December 10, 2024",
    category: "Analytics",
    readTime: "10 min read", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Media Kit Mastery: Design Principles That Convert",
    excerpt: "Discover the design elements and content strategies that make media kits irresistible to brands and agencies.",
    author: "David Park",
    date: "December 8, 2024",
    category: "Design",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Scaling Your Influence: From Micro to Macro Creator",
    excerpt: "Strategic insights on growing your audience authentically while maintaining engagement and brand appeal.",
    author: "Lisa Wang",
    date: "December 5, 2024",
    category: "Growth Strategy",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    title: "The Psychology of Influence: What Brands Really Want",
    excerpt: "Understand the psychological factors that drive brand decision-making and how to position yourself effectively.",
    author: "Dr. James Mitchell",
    date: "December 3, 2024",
    category: "Psychology",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80"
  }
]

const categories = ["All", "Industry Insights", "Creator Tips", "Analytics", "Design", "Growth Strategy", "Psychology"]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <PageLayout 
      title="Creator Insights"
      subtitle="Stay ahead of the curve with expert insights, industry trends, and actionable strategies for building a successful creator business. Learn from the best in the creator economy."
      backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    >
      {/* Featured Post */}
      {featuredPost && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <MotionInView>
                <div className="mb-12">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-8">
                    Featured Article
                  </span>
                </div>
              </MotionInView>
              
              <MotionInView delay={100}>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <img 
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {featuredPost.category}
                      </span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <h2 className="font-display text-3xl lg:text-4xl font-light mb-6 leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {featuredPost.date}
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href="/blog/featured-post"
                      className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors group"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </MotionInView>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <MotionInView>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      index === 0 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-muted-foreground hover:text-foreground hover:bg-white/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </MotionInView>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {regularPosts.map((post, index) => (
                <MotionInView key={post.title} delay={index * 100}>
                  <article className="group cursor-pointer">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="px-3 py-1 bg-white text-primary rounded-full border border-primary/20">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-display text-xl lg:text-2xl font-light mb-4 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed font-light mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </article>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionInView>
              <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                Stay <span className="gradient-text">Informed</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
                Get the latest creator economy insights, partnership opportunities, and platform updates 
                delivered directly to your inbox. Join thousands of creators who stay ahead of the curve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
