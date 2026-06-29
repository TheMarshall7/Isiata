'use client'

import { useEffect, useRef, useState } from 'react'

type ParsedMetric = {
  numeric: number | null
  prefix: string
  suffix: string
  display: string
}

function parseMetricValue(value: string): ParsedMetric {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) {
    return { numeric: null, prefix: '', suffix: '', display: value }
  }
  return {
    prefix: match[1],
    numeric: parseFloat(match[2]),
    suffix: match[3],
    display: value,
  }
}

export function useCountUp(value: string, duration = 1200) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [display, setDisplay] = useState(value)
  const parsed = parseMetricValue(value)

  useEffect(() => {
    if (parsed.numeric === null) return

    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let start: number | null = null
    let observer: IntersectionObserver | null = null
    let rafId = 0

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(parsed.numeric! * eased)
      setDisplay(`${parsed.prefix}${current}${parsed.suffix}`)
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rafId = requestAnimationFrame(animate)
          observer?.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      observer?.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [value, duration, parsed.numeric, parsed.prefix, parsed.suffix])

  return { ref, display: parsed.numeric === null ? value : display }
}
