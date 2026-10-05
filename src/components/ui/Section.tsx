'use client'

import { SectionProps } from '@/types'
import { cn } from '@/lib/utils'
import { useLayoutEffect, useRef, useState } from 'react'

const DEFAULT_REVEAL_MARGIN = 80

function isNearViewport(el: HTMLElement, margin: number) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight + margin && rect.bottom > -margin
}

export function Section({
  children,
  className,
  reveal = false,
  revealMargin = DEFAULT_REVEAL_MARGIN,
  revealThreshold = 0,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    if (!reveal) return

    const el = ref.current
    if (!el) return

    const markVisible = () => setIsVisible(true)

    if (isNearViewport(el, revealMargin)) {
      markVisible()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible()
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: `${revealMargin}px 0px ${revealMargin}px 0px`,
        threshold: revealThreshold,
      }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [reveal, revealMargin, revealThreshold])

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
