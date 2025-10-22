"use client"

import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'
import { HTMLAttributes } from 'react'

interface MotionInViewProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
}

export default function MotionInView({ children, className, delay = 0, ...props }: MotionInViewProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
      style={{ transitionDelay: `${Math.round(delay)}ms` }}
      {...props}
    >
      {children}
    </div>
  )
}
