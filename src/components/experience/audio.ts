'use client'

/** Tiny Web Audio helper. Created on first user gesture. All audio is optional: every cue has a visual twin. */
let ctx: AudioContext | null = null
let enabled = true

export function setSoundEnabled(on: boolean) {
  enabled = on
  if (!on) stopDrone()
}

export function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * Puzzle tones always play: they are part of the challenge, and every one has
 * a visual twin. UI sounds (sfx) respect the sound setting.
 */
export function tone(freq: number, ms: number, gain = 0.08, type: OscillatorType = 'sine', at = 0) {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t = c.currentTime + at
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(gain, t + 0.015)
  g.gain.setValueAtTime(gain, t + Math.max(0.02, ms / 1000 - 0.03))
  g.gain.linearRampToValueAtTime(0, t + ms / 1000)
  osc.connect(g).connect(c.destination)
  osc.start(t)
  osc.stop(t + ms / 1000 + 0.02)
}

function bell(freq: number, at: number, len = 1.8, gain = 0.06) {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime + at
  ;[1, 2.01, 3.02].forEach((m, i) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.frequency.value = freq * m
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(gain / (i + 1), t + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t + len / (i + 1))
    o.connect(g).connect(c.destination)
    o.start(t)
    o.stop(t + len)
  })
}

/** On-brand UI sound: soft, warm, never a "game" blip. */
export const sfx = {
  tick() {
    if (enabled) tone(1760, 30, 0.012)
  },
  select() {
    if (enabled) bell(880, 0, 0.5, 0.025)
  },
  wrong() {
    if (enabled) {
      tone(146.8, 260, 0.05, 'triangle')
      tone(138.6, 320, 0.04, 'triangle', 0.08)
    }
  },
  /** D minor 9 rising: the sound of something opening. */
  reveal() {
    if (!enabled) return
    ;[146.8, 220, 293.7, 349.2, 440, 659.3].forEach((f, i) => bell(f, i * 0.11, 3.2, 0.05))
  },
  secret() {
    if (enabled) [1174.7, 1568, 2349.3].forEach((f, i) => bell(f, i * 0.07, 1.6, 0.02))
  },
  level() {
    if (!enabled) return
    ;[293.7, 440, 587.3, 880].forEach((f, i) => bell(f, i * 0.16, 2.6, 0.05))
  },
}

export function haptic(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    /* unsupported */
  }
}

let drone: { stop: () => void } | null = null

export function startDrone() {
  const c = getCtx()
  if (!c || drone || !enabled) return
  const o1 = c.createOscillator()
  const o2 = c.createOscillator()
  const g = c.createGain()
  o1.frequency.value = 55
  o2.frequency.value = 55.6
  o1.type = o2.type = 'sine'
  g.gain.setValueAtTime(0, c.currentTime)
  g.gain.linearRampToValueAtTime(0.05, c.currentTime + 2)
  o1.connect(g)
  o2.connect(g)
  g.connect(c.destination)
  o1.start()
  o2.start()
  drone = {
    stop: () => {
      const t = c.currentTime
      g.gain.cancelScheduledValues(t)
      g.gain.setValueAtTime(g.gain.value, t)
      g.gain.linearRampToValueAtTime(0, t + 0.8)
      o1.stop(t + 0.9)
      o2.stop(t + 0.9)
    },
  }
}

export function stopDrone() {
  drone?.stop()
  drone = null
}
