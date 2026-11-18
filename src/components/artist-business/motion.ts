'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

/** True when the visitor has asked their system to reduce motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Flips to true once, the first time the element is meaningfully on screen. */
export function useInViewOnce<T extends Element>(threshold = 0.35): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Smoothly tweens a displayed number toward `target`. Starts from 0 the first time
 * `active` becomes true, then glides from the current value on every later change.
 */
export function useCountUp(target: number, active = true, duration = 700) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  const current = useRef(0)
  const frame = useRef<number>()

  useEffect(() => {
    if (!active) return
    if (reduced || !Number.isFinite(target)) {
      current.current = target
      setValue(target)
      return
    }
    const from = current.current
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const v = from + (target - from) * easeOutCubic(t)
      current.current = v
      setValue(v)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [target, active, reduced, duration])

  return value
}
