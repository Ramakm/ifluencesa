"use client"

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import MotionInView from './MotionInView'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <MotionInView delay={delay}>
      <div className="gradient-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="inner rounded-xl">
          <Card className="bg-card border border-transparent shadow-sm">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-sm">
                {icon}
              </div>
              <CardTitle className="text-xl font-semibold mb-3">{title}</CardTitle>
              <CardDescription className="leading-relaxed">
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </MotionInView>
  )
}
