'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useExperience } from '@/lib/experience/store'
import { setSoundEnabled, sfx } from './audio'
import { composition } from './composition'
import { Glyph } from './Glyph'

/**
 * Motion language from Brand Core 19: typography that appears as if
 * transmitted, slow gravitational movement, waves propagating, light
 * responding to presence. Everything here has a reduced-motion path.
 */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(m.matches)
    const on = () => setReduced(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduced
}

const NOISE = '◇△○✕·:|/\\▢◦'

/** Characters arrive scrambled and resolve one by one, like a signal locking on. */
export function TransmitText({
  text,
  className,
  delay = 0,
  speed = 28,
  as: Tag = 'span',
}: {
  text: string
  className?: string
  delay?: number
  speed?: number
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3'
}) {
  const reduced = usePrefersReducedMotion()
  const [out, setOut] = useState(reduced ? text : '')

  useEffect(() => {
    if (reduced) {
      setOut(text)
      return
    }
    let frame = 0
    let raf = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      const t = now - start
      if (t < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const locked = Math.floor(t / speed)
      frame++
      const s = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ' || i < locked) return ch
          if (i > locked + 6) return ' '
          return NOISE[(i * 7 + frame) % NOISE.length]
        })
        .join('')
      setOut(s)
      if (locked <= text.length) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, speed, reduced])

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden>{out || ' '}</span>
    </Tag>
  )
}

/**
 * Film grain, vignette, a slow light that trails the pointer like gravity,
 * and a soft ripple wherever the member touches the world.
 */
export function Atmosphere() {
  const light = useRef<HTMLDivElement>(null)
  const ripples = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { state } = useExperience()

  useEffect(() => {
    setSoundEnabled(state.sound)
    if (!state.sound) composition.stop()
  }, [state.sound])

  useEffect(() => {
    if (reduced) return
    let tx = window.innerWidth / 2
    let ty = window.innerHeight * 0.6
    let x = tx
    let y = ty
    let raf = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      // Eased follow: the light drifts toward the pointer, never snaps.
      x += (tx - x) * 0.045
      y += (ty - y) * 0.045
      light.current?.style.setProperty('transform', `translate3d(${x - 400}px, ${y - 400}px, 0)`)
      raf = requestAnimationFrame(loop)
    }
    const down = (e: PointerEvent) => {
      const host = ripples.current
      if (!host) return
      const r = document.createElement('span')
      r.className = 'fne-ripple'
      r.style.left = `${e.clientX}px`
      r.style.top = `${e.clientY}px`
      host.appendChild(r)
      setTimeout(() => r.remove(), 1400)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        ref={light}
        className="absolute left-0 top-0 h-[800px] w-[800px] rounded-full opacity-60 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(217,119,43,0.07), transparent 60%)' }}
      />
      <div ref={ripples} />
      <div className="fne-grain absolute inset-[-50%]" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55))' }} />
    </div>
  )
}

const TOAST_GLYPH = { secret: 'void', level: 'thread', whisper: 'echo', mark: 'eye' } as const

export function Toaster() {
  const { toasts, dismiss } = useExperience()
  const last = useRef(0)

  useEffect(() => {
    const t = toasts[toasts.length - 1]
    if (!t || t.id === last.current) return
    last.current = t.id
    if (t.kind === 'secret') sfx.secret()
    else if (t.kind === 'level') sfx.level()
    else sfx.select()
  }, [toasts])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-[70] flex flex-col items-center gap-3 px-4" aria-live="polite">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={cn(
            'fne-toast pointer-events-auto flex w-full max-w-md items-center gap-4 rounded-2xl border bg-[#050505]/90 px-5 py-4 text-left backdrop-blur-xl',
            t.kind === 'secret' ? 'border-[#F0A35E]/60 shadow-[0_0_40px_rgba(217,119,43,0.25)]' : 'border-[#d8aa67]/30'
          )}
        >
          <Glyph name={TOAST_GLYPH[t.kind]} size={34} className="shrink-0 text-[#F0A35E]" />
          <span>
            <span className="block font-mono text-[10px] tracking-[0.25em] text-[#d8aa67]">{t.title.toUpperCase()}</span>
            {t.line && <span className="mt-1 block text-sm text-[#ece3d7]/85">{t.line}</span>}
          </span>
        </button>
      ))}
    </div>
  )
}

/** Counts up to a value with an eased curve. */
export function useCountUp(target: number, ms = 1400, startDelay = 0) {
  const [v, setV] = useState(0)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) {
      setV(target)
      return
    }
    let raf = 0
    const t0 = performance.now() + startDelay
    const loop = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / ms))
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [target, ms, startDelay, reduced])
  return v
}
