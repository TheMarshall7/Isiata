'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type UseParallaxOptions = {
  /** Multiplier of how far the section has scrolled (0.2–0.45 feels clear). */
  factor?: number
  /** Invert direction (foreground layers often use this). */
  invert?: boolean
  /** Keep the moving layer inside this element's vertical edges. */
  boundsRef?: RefObject<HTMLElement | null>
}

/** Scroll parallax. Off for reduced motion and true touch-only devices. */
export function useParallax({ factor = 0.28, invert = false, boundsRef }: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    // Real phones/tablets only — keep desktop/laptop trackpads working
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return
    if (window.matchMedia('(max-width: 767px)').matches) return

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
      let y = traveled * factor * (invert ? -1 : 1)

      const bounds = boundsRef?.current
      if (bounds) {
        const previous = el.style.transform
        el.style.transform = 'none'
        const elRect = el.getBoundingClientRect()
        const boundsRect = bounds.getBoundingClientRect()
        el.style.transform = previous
        const minY = boundsRect.top - elRect.top
        const maxY = boundsRect.bottom - elRect.bottom
        if (maxY >= minY) y = Math.min(maxY, Math.max(minY, y))
      }

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
  }, [factor, invert, reduced, boundsRef])

  return ref
}
