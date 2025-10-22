import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'
import { Users, Target, Award, Heart } from 'lucide-react'

const values = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Creator First",
    description: "Every decision we make is centered around empowering creators to build sustainable, profitable partnerships with brands."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Precision & Quality",
    description: "We believe in delivering exceptional quality in every media kit, every analysis, and every brand connection we facilitate."
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Innovation",
    description: "Constantly pushing the boundaries of what's possible in creator economy technology and partnership facilitation."
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Authentic Relationships",
    description: "Building genuine, long-lasting relationships between creators and brands based on mutual value and respect."
  }
]

export default function AboutPage() {
  return (
    <PageLayout 
      title="About Ifluencesa"
      subtitle="A history of trust and knowledge in the creator economy. We specialize in transforming social influence into sustainable business opportunities through precision, innovation, and expertise."
      backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    >
      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <MotionInView>
                <div>
                  <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                    Our <span className="gradient-text">Story</span>
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                    <p>
                      Founded in 2024, Ifluencesa emerged from a simple observation: creators were struggling to 
                      present their influence in a way that brands could understand and value. We saw talented 
                      individuals with engaged audiences being overlooked because they lacked the tools to 
                      showcase their true impact.
                    </p>
                    <p>
                      Our founders, coming from backgrounds in digital marketing, data analytics, and creator 
                      partnerships, combined their expertise to build a platform that bridges this gap. We believe 
                      that every creator deserves the opportunity to build sustainable, profitable relationships 
                      with brands that align with their values and audience.
                    </p>
                    <p>
                      Today, we're proud to serve thousands of creators worldwide, helping them transform their 
                      social influence into professional media kits that stand the test of time.
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
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <MotionInView>
              <div className="text-center mb-20">
                <h2 className="font-display text-4xl lg:text-5xl font-light mb-6 tracking-tight">
                  Our <span className="gradient-text">Values</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                  The principles that guide everything we do, from product development to customer relationships.
                </p>
              </div>
            </MotionInView>
            
            <div className="grid md:grid-cols-2 gap-12">
              {values.map((value, index) => (
                <MotionInView key={value.title} delay={index * 100}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                      {value.icon}
                    </div>
                    <h3 className="font-display text-2xl font-light mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionInView>
              <h2 className="font-display text-4xl lg:text-5xl font-light mb-8 tracking-tight">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed font-light mb-12">
                To democratize the creator economy by providing every influencer with the tools, 
                insights, and opportunities they need to build sustainable, profitable partnerships 
                with brands that share their values.
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
