"use client"

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import MotionInView from './MotionInView'

const projects = [
  {
    title: "TechInfluencer",
    subtitle: "2024 • Media Kit",
    category: "Technology Creator",
    description: "Complete media kit transformation for a leading tech influencer, featuring advanced analytics integration and premium brand presentation.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80"
  },
  {
    title: "LifestyleBrand",
    subtitle: "2024 • Partnership Platform", 
    category: "Lifestyle Content",
    description: "Strategic partnership platform development connecting lifestyle creators with premium brands through data-driven matching.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    title: "FitnessCreator",
    subtitle: "2024 • Analytics Dashboard",
    category: "Fitness & Wellness",
    description: "Comprehensive analytics dashboard showcasing engagement metrics and audience insights for fitness content creators.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]

export default function ProjectsSection() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <MotionInView>
            <div className="mb-20">
              <h2 className="font-display text-5xl lg:text-6xl font-light mb-6 tracking-tight">
                Explore Our <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-light mb-8">
                Be inspired by media kits designed to stand the test of time, combining design, quality and performance. 
                Immerse yourself in our projects to better imagine the influence platform that's right for you.
              </p>
              <Link 
                href="/projects" 
                className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors group"
              >
                Discover All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </MotionInView>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {projects.map((project, index) => (
              <MotionInView key={project.title} delay={index * 150}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl mb-8 overflow-hidden relative">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <p className="text-sm text-white font-light">{project.category}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-2xl font-light group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-primary font-medium mb-3">{project.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
