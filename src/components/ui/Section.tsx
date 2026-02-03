'use client'

import { SectionProps } from '@/types'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

export function Section({ children, className, reveal = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!reveal) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [reveal])

  return (
    <section
      ref={ref}
      className={cn(
        reveal && 'aura-reveal',
        isVisible && 'is-visible',
        className
      )}
    >
      {children}
    </section>
  )
}
