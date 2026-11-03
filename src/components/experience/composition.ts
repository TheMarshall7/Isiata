'use client'

import { getCtx } from './audio'

/**
 * The Composition (brief 8: "musical fragments that combine into a larger
 * composition"). Each artifact held adds one layer. Layers 1–8 map to chapters;
 * layer 9 is the hidden room.
 *
 * PLACEHOLDER SOUND: generated live with Web Audio so the mechanic works before
 * the album exists. When stems are mastered, replace a layer's voice with a
 * looping AudioBuffer of the real stem (same gain node, same toggles).
 */

const BPM = 84
const STEP = 60 / BPM / 4
// Dm9 → Bbmaj7 → Gm9 → A7sus: dark, warm, unresolved.
const ROOTS = [73.42, 58.27, 49.0, 55.0]
const CHORDS = [
  [293.7, 349.2, 440, 523.3, 659.3],
  [233.1, 293.7, 349.2, 440, 523.3],
  [196, 233.1, 293.7, 349.2, 440],
  [220, 293.7, 329.6, 392, 440],
]
const MELODY: (number | null)[] = [587.3, null, null, 523.3, 440, null, 523.3, null, 587.3, null, 659.3, null, 587.3, null, null, null, 440, null, null, 392, 349.2, null, 392, null, 440, null, null, null, null, null, null, null]
const SIGNAL = [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0]

type Voice = (c: AudioContext, out: GainNode, t: number, step: number, bar: number) => void

let noise: AudioBuffer | null = null
function noiseBuf(c: AudioContext) {
  if (noise) return noise
  noise = c.createBuffer(1, c.sampleRate, c.sampleRate)
  const d = noise.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return noise
}

function env(c: AudioContext, out: AudioNode, t: number, a: number, peak: number, r: number) {
  const g = c.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(peak, t + a)
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + r)
  g.connect(out)
  return g
}

function osc(c: AudioContext, type: OscillatorType, f: number, t: number, len: number, dest: AudioNode) {
  const o = c.createOscillator()
  o.type = type
  o.frequency.value = f
  o.connect(dest)
  o.start(t)
  o.stop(t + len + 0.05)
  return o
}

function hit(c: AudioContext, out: GainNode, t: number, filter: BiquadFilterType, freq: number, peak: number, r: number) {
  const s = c.createBufferSource()
  s.buffer = noiseBuf(c)
  const f = c.createBiquadFilter()
  f.type = filter
  f.frequency.value = freq
  s.connect(f)
  f.connect(env(c, out, t, 0.002, peak, r))
  s.start(t)
  s.stop(t + r + 0.05)
}

const VOICES: Record<number, Voice> = {
  1: (c, out, t, step, bar) => {
    if (step !== 0) return
    const len = STEP * 16
    const g = env(c, out, t, 1.2, 0.09, len)
    osc(c, 'sine', ROOTS[bar], t, len + 1, g)
    osc(c, 'sine', ROOTS[bar] * 1.5, t, len + 1, g)
  },
  2: (c, out, t, step) => {
    if (step !== 0 && step !== 8 && step !== 11) return
    const o = c.createOscillator()
    o.frequency.setValueAtTime(130, t)
    o.frequency.exponentialRampToValueAtTime(42, t + 0.22)
    o.connect(env(c, out, t, 0.003, 0.5, 0.35))
    o.start(t)
    o.stop(t + 0.45)
  },
  3: (c, out, t, step, bar) => {
    const idx = [0, 3, 6, 10, 12].indexOf(step)
    if (idx < 0) return
    const f = CHORDS[bar][idx] * 2
    const g = env(c, out, t, 0.005, 0.05, 1.4)
    osc(c, 'sine', f, t, 1.5, g)
    osc(c, 'sine', f * 2.01, t, 0.6, env(c, out, t, 0.005, 0.015, 0.5))
  },
  4: (c, out, t, step, bar) => {
    if (!SIGNAL[(bar % 2) * 16 + step]) return
    osc(c, 'triangle', 1244.5, t, STEP * 0.6, env(c, out, t, 0.002, 0.018, STEP * 0.6))
  },
  5: (c, out, t, step) => {
    if (step % 2 === 0) hit(c, out, t, 'highpass', 8000, step % 4 === 2 ? 0.05 : 0.025, 0.05)
    if (step === 4 || step === 12) hit(c, out, t, 'bandpass', 1800, 0.18, 0.18)
  },
  6: (c, out, t, step, bar) => {
    if (step !== 0) return
    const len = STEP * 16
    const f = c.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.setValueAtTime(500, t)
    f.frequency.linearRampToValueAtTime(1400, t + len / 2)
    f.frequency.linearRampToValueAtTime(600, t + len)
    f.connect(env(c, out, t, 1.6, 0.03, len))
    CHORDS[bar].slice(0, 4).forEach((n, i) => {
      osc(c, 'sawtooth', n, t, len + 1, f)
      osc(c, 'sawtooth', n * 1.004 + i * 0.1, t, len + 1, f)
    })
  },
  7: (c, out, t, step, bar) => {
    const at = [0, 6, 10, 14].indexOf(step)
    if (at < 0) return
    const f = ROOTS[bar] * (at === 2 ? 2 : 1)
    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 420
    lp.connect(env(c, out, t, 0.01, 0.22, STEP * 3))
    osc(c, 'triangle', f, t, STEP * 3, lp)
  },
  8: (c, out, t, step, bar) => {
    const f = MELODY[(bar % 2) * 16 + step]
    if (!f) return
    const o = c.createOscillator()
    o.frequency.value = f
    const lfo = c.createOscillator()
    const depth = c.createGain()
    lfo.frequency.value = 5.2
    depth.gain.value = 4
    lfo.connect(depth).connect(o.frequency)
    o.connect(env(c, out, t, 0.04, 0.06, STEP * 5))
    o.start(t)
    lfo.start(t)
    o.stop(t + STEP * 6)
    lfo.stop(t + STEP * 6)
  },
  9: (c, out, t, step, bar) => {
    if (step % 4 !== 0) return
    const f = CHORDS[bar][(step / 4 + bar) % 5] * 4
    osc(c, 'sine', f, t, 2, env(c, out, t, 0.6, 0.012, 1.8))
  },
}

class Composition {
  private master: GainNode | null = null
  private gains = new Map<number, GainNode>()
  private active = new Set<number>()
  private timer: ReturnType<typeof setInterval> | null = null
  private nextTime = 0
  private step = 0
  private bar = 0
  analyser: AnalyserNode | null = null
  playing = false
  private listeners = new Set<() => void>()

  onChange(fn: () => void) {
    this.listeners.add(fn)
    return () => void this.listeners.delete(fn)
  }

  private emit() {
    this.listeners.forEach((f) => f())
  }

  private ensure() {
    const c = getCtx()
    if (!c) return null
    if (!this.master) {
      this.master = c.createGain()
      this.master.gain.value = 0.9
      const comp = c.createDynamicsCompressor()
      this.analyser = c.createAnalyser()
      this.analyser.fftSize = 128
      this.master.connect(comp).connect(this.analyser).connect(c.destination)
    }
    return c
  }

  private gainFor(c: AudioContext, n: number) {
    let g = this.gains.get(n)
    if (!g) {
      g = c.createGain()
      g.gain.value = 0
      g.connect(this.master!)
      this.gains.set(n, g)
    }
    return g
  }

  setLayers(layers: number[]) {
    const c = this.ensure()
    if (!c) return
    for (let n = 1; n <= 9; n++) {
      const on = layers.includes(n)
      const g = this.gainFor(c, n)
      g.gain.cancelScheduledValues(c.currentTime)
      g.gain.setTargetAtTime(on ? 1 : 0, c.currentTime, 0.6)
      if (on) this.active.add(n)
      else this.active.delete(n)
    }
    this.emit()
  }

  isOn(n: number) {
    return this.active.has(n)
  }

  start(layers: number[]) {
    const c = this.ensure()
    if (!c) return
    this.setLayers(layers)
    if (this.playing) return
    this.playing = true
    this.nextTime = c.currentTime + 0.1
    this.step = 0
    this.bar = 0
    this.timer = setInterval(() => this.schedule(c), 25)
    this.emit()
  }

  stop() {
    const c = getCtx()
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    this.playing = false
    if (c) this.gains.forEach((g) => g.gain.setTargetAtTime(0, c.currentTime, 0.4))
    this.active.clear()
    this.emit()
  }

  private schedule(c: AudioContext) {
    while (this.nextTime < c.currentTime + 0.12) {
      this.active.forEach((n) => {
        const g = this.gains.get(n)
        if (g) VOICES[n]?.(c, g, this.nextTime, this.step, this.bar)
      })
      this.nextTime += STEP
      this.step = (this.step + 1) % 16
      if (this.step === 0) this.bar = (this.bar + 1) % 4
    }
  }

  /** 0..1 loudness, for light that responds to sound. */
  level(): number {
    if (!this.analyser || !this.playing) return 0
    const data = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteFrequencyData(data)
    let sum = 0
    for (let i = 0; i < data.length; i++) sum += data[i]
    return Math.min(1, sum / data.length / 110)
  }

  spectrum(): Uint8Array {
    const data = new Uint8Array(this.analyser?.frequencyBinCount ?? 64)
    if (this.analyser && this.playing) this.analyser.getByteFrequencyData(data)
    return data
  }
}

export const composition = new Composition()
