'use client'

import { useEffect, useRef, useState } from 'react'

/** Clipboard write with a textarea fallback for insecure contexts. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

/** Tweens between numeric values so readouts glide instead of snapping. */
export function useAnimatedNumber(target: number, duration = 380): number {
  const [display, setDisplay] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!Number.isFinite(target)) {
      setDisplay(target)
      return
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      fromRef.current = target
      setDisplay(target)
      return
    }
    const from = Number.isFinite(fromRef.current) ? fromRef.current : target
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const v = from + (target - from) * eased
      fromRef.current = v
      setDisplay(v)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const v = useAnimatedNumber(value)
  return <>{Number.isFinite(v) ? v.toFixed(decimals) : '—'}</>
}

/** Click-to-copy value that glides between numbers and confirms with a check. */
export function CopyValue({
  value,
  decimals = 1,
  suffix,
  copyAs,
}: {
  value: number | string
  decimals?: number
  suffix?: string
  copyAs?: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const numeric = typeof value === 'number'
  const animated = useAnimatedNumber(numeric ? value : 0)
  const text = numeric ? (Number.isFinite(animated) ? animated.toFixed(decimals) : '—') : value

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    const out = copyAs ?? (numeric ? value.toFixed(decimals) : value)
    if (await copyText(out)) {
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1100)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`toolbox-copy ${copied ? 'is-copied' : ''}`}
      title="Click to copy"
      aria-live="polite"
    >
      {copied ? (
        <span className="inline-flex items-center gap-1">
          <iconify-icon icon="solar:check-circle-linear" width="14" height="14" />
          Copied
        </span>
      ) : (
        <>
          {text}
          {suffix && <span className="toolbox-unit">{suffix}</span>}
        </>
      )}
    </button>
  )
}

export function PanelTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h3 className="text-xs font-semibold uppercase tracking-widest">{children}</h3>
      {hint && <span className="toolbox-hint">{hint}</span>}
    </div>
  )
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  label: string
}) {
  return (
    <div className="toolbox-seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={value === o.value ? 'is-active' : ''}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// ─── Shared tone player (one oscillator at a time) ───────────────────

let ctx: AudioContext | null = null
let stopCurrent: (() => void) | null = null

export function playTone(freq: number, seconds = 1.2) {
  if (typeof window === 'undefined' || !(freq > 20) || freq > 20000) return
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  if (!AC) return
  const audio = ctx ?? new AC()
  ctx = audio
  if (audio.state === 'suspended') void audio.resume()
  stopCurrent?.()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  const now = audio.currentTime
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.18, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds)
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(now)
  osc.stop(now + seconds + 0.05)
  stopCurrent = () => {
    try {
      const t = audio.currentTime
      gain.gain.cancelScheduledValues(t)
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04)
      osc.stop(t + 0.05)
    } catch {
      /* already stopped */
    }
  }
}
