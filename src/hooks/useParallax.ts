'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type UseParallaxOptions = {
  /** Multiplier of how far the section has scrolled (0.2–0.45 feels clear). */
  factor?: number
  /** Invert direction (foreground layers often use this). */
  invert?: boolean
}

/** Scroll parallax. Off for reduced motion and true touch-only devices. */
export function useParallax({ factor = 0.28, invert = false }: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    // Real phones/tablets only — keep desktop/laptop trackpads working
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    let frame = 0
    const section =
      el.closest('[data-parallax-root]') ?? el.closest('section') ?? el.parentElement

    const update = () => {
      frame = 0
      if (!section) return
      const rect = section.getBoundingClientRect()
      // How far the section has moved up the viewport
      const traveled = -rect.top
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const y = traveled * factor * (invert ? -1 : 1)
      el.style.transform = `translate3d(0, ${y}px, 0)`
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      el.style.transform = ''
    }
  }, [factor, invert, reduced])

  return ref
}
