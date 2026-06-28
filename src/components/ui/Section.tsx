'use client'

import { SectionProps } from '@/types'
import { cn } from '@/lib/utils'
import { useLayoutEffect, useRef, useState } from 'react'

const VIEWPORT_BUFFER = 320

function isNearViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight + VIEWPORT_BUFFER && rect.bottom > -VIEWPORT_BUFFER
}

export function Section({ children, className, reveal = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    if (!reveal) return

    const el = ref.current
    if (!el) return

    const markVisible = () => setIsVisible(true)

    // Safety net for slow layouts or observer edge cases
    const fallback = window.setTimeout(markVisible, 400)

    if (isNearViewport(el)) {
      markVisible()
      return () => window.clearTimeout(fallback)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible()
          observer.unobserve(entry.target)
        }
      },
      {
        // Trigger well before content scrolls into view
        rootMargin: `${VIEWPORT_BUFFER}px 0px ${VIEWPORT_BUFFER}px 0px`,
        threshold: 0,
      }
    )

    observer.observe(el)

    return () => {
      window.clearTimeout(fallback)
      observer.unobserve(el)
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
