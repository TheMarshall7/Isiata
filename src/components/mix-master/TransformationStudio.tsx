'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MixMasterExample, TransformationStat } from '@/lib/mix-master/page-content'
import { cn } from '@/lib/utils'
import { FOCUS_BANDS, sideAt, useAbEngine, type ClipStats, type FocusBand } from './useAbEngine'

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

function formatTime(s: number) {
  if (!s || Number.isNaN(s)) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/* ------------------------------------------------------------------ */
/* Artist                                                              */
/* ------------------------------------------------------------------ */

function ArtistPhoto({ example, className }: { example: MixMasterExample; className?: string }) {
  const primary = example.socials[0]
  const inner = example.image ? (
    <img
      src={example.image}
      alt={example.artist}
      className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover/photo:scale-[1.03] group-hover/photo:grayscale-0"
    />
  ) : (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,rgba(216,170,103,0.18),transparent_60%)] text-center">
      <span className="font-display text-6xl uppercase tracking-normal text-gold">{initials(example.artist)}</span>
      <span className="text-[10px] uppercase tracking-widest text-zinc-600">Artist photo</span>
    </div>
  )

  return (
    <div className={cn('group/photo relative overflow-hidden bg-black/60', className)}>
      {inner}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {primary && (
        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${example.artist} on ${primary.label} (opens in a new tab)`}
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/50 focus-visible:bg-black/50"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100">
            <iconify-icon icon={primary.icon} width="16" height="16" className="text-gold" />
            Open {primary.label}
          </span>
        </a>
      )}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5">
        <p className="font-display text-2xl uppercase leading-none tracking-normal text-white">{example.artist}</p>
        <p className="mt-1 text-xs text-zinc-400">{example.song}</p>
      </div>
    </div>
  )
}

function ArtistSpotlight({ example, pending }: { example: MixMasterExample; pending: boolean }) {
  return (
    <aside className="order-2 grid grid-cols-1 overflow-hidden border-t border-white/10 sm:grid-cols-[200px_minmax(0,1fr)] lg:order-none lg:flex lg:flex-col lg:border-r lg:border-t-0">
      <ArtistPhoto example={example} className="aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:min-h-[200px] lg:aspect-square lg:h-auto" />
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-zinc-400">
            {example.service}
          </span>
          {pending ? (
            <span className="inline-flex items-center gap-2 border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-amber-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
              Mixing now
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 border border-green-500/25 bg-green-500/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-green-200">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Delivered
            </span>
          )}
        </div>
        <p className="mb-5 text-sm font-light leading-relaxed text-zinc-400">{example.story}</p>
        <p className="mb-2 text-[10px] uppercase tracking-widest text-zinc-600">What we did</p>
        <ul className="mb-6 space-y-2">
          {example.work.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-light text-zinc-300">
              <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-[#d8aa67]" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2">
          {example.socials.length ? (
            example.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d8aa67]/35 bg-[#d8aa67]/[0.06] px-3 py-1.5 text-xs text-[#f0dfc8] transition-colors hover:border-[#d8aa67]/70 hover:bg-[#d8aa67]/15"
              >
                <iconify-icon icon={s.icon} width="14" height="14" />
                {s.label}
                <iconify-icon icon="solar:arrow-right-up-linear" width="12" height="12" className="text-zinc-500" />
              </a>
            ))
          ) : (
            <span className="text-[10px] uppercase tracking-widest text-zinc-600">Socials coming soon</span>
          )}
        </div>
      </div>
    </aside>
  )
}

function ArtistPicker({
  examples,
  index,
  onPick,
}: {
  examples: MixMasterExample[]
  index: number
  onPick: (i: number) => void
}) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2" role="tablist" aria-label="Choose a song">
      {examples.map((ex, i) => {
        const active = i === index
        return (
          <button
            key={ex.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onPick(i)}
            className={cn(
              'group flex items-center gap-4 rounded-lg border p-3 text-left transition-all duration-300',
              active
                ? 'border-[#d8aa67]/60 bg-[#b7792a]/10 shadow-[0_0_28px_rgba(211,157,83,0.12)]'
                : 'border-white/10 bg-surface-raised hover:border-white/20 hover:bg-surface-overlay'
            )}
          >
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d8aa67]/30 bg-black/60">
              {ex.image ? (
                <img src={ex.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-display text-lg text-gold">{initials(ex.artist)}</span>
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-lg uppercase tracking-normal text-[#f0dfc8]">{ex.song}</span>
              <span className="block truncate text-xs text-zinc-500">
                {ex.artist} · {ex.after ? ex.service : 'Mix in progress'}
              </span>
            </span>
            <iconify-icon
              icon={active ? 'solar:soundwave-bold' : 'solar:play-circle-linear'}
              width="22"
              height="22"
              className={active ? 'text-[#d8aa67]' : 'text-zinc-600 group-hover:text-zinc-300'}
            />
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Waveform comparison                                                  */
/* ------------------------------------------------------------------ */

function Waveform({ peaks, max, tone, progress }: { peaks: number[]; max: number; tone: 'before' | 'after'; progress: number }) {
  return (
    <div className="flex h-full w-full items-center gap-[2px] px-4 sm:px-6">
      {peaks.map((peak, i) => {
        const played = (i / peaks.length) * 100 < progress
        return (
          <span
            key={i}
            className={cn(
              'flex-1 rounded-full transition-colors duration-150',
              tone === 'after'
                ? played
                  ? 'bg-[#f0c681]'
                  : 'bg-[#d8aa67]/50'
                : played
                  ? 'bg-zinc-400'
                  : 'bg-zinc-700'
            )}
            style={{ height: `${Math.max(3, (peak / max) * 82)}%` }}
          />
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Spectrum                                                             */
/* ------------------------------------------------------------------ */

const F_MIN = 30
const F_MAX = 16000
const POINTS = 90
const xOfFreq = (f: number) => Math.log(f / F_MIN) / Math.log(F_MAX / F_MIN)

function Spectrum({
  analysers,
  playing,
  focus,
  showAfter,
  matchVolume,
}: {
  analysers: () => { before: AnalyserNode; after: AnalyserNode; sampleRate: number } | null
  playing: boolean
  focus: FocusBand
  showAfter: boolean
  matchVolume: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasDrawn, setHasDrawn] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const a = analysers()
    if (!canvas || !a) return false
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
    }
    const g = canvas.getContext('2d')
    if (!g) return false
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.clearRect(0, 0, w, h)

    const curve = (node: AnalyserNode) => {
      const bins = new Float32Array(node.frequencyBinCount)
      node.getFloatFrequencyData(bins)
      const hzPerBin = a.sampleRate / 2 / bins.length
      const pts: [number, number][] = []
      for (let p = 0; p < POINTS; p++) {
        const f0 = F_MIN * Math.pow(F_MAX / F_MIN, p / POINTS)
        const f1 = F_MIN * Math.pow(F_MAX / F_MIN, (p + 1) / POINTS)
        const b0 = Math.max(1, Math.floor(f0 / hzPerBin))
        const b1 = Math.max(b0 + 1, Math.ceil(f1 / hzPerBin))
        let sum = 0
        for (let b = b0; b < b1; b++) sum += Math.pow(10, bins[b] / 10)
        const db = 10 * Math.log10(sum / (b1 - b0) + 1e-12)
        // Gentle tilt so a natural mix reads roughly flat instead of sloping off a cliff.
        const tilted = db + 3 * Math.log2(((f0 + f1) / 2) / 1000)
        const norm = Math.min(1, Math.max(0, (tilted + 95) / 70))
        pts.push([((p + 0.5) / POINTS) * w, h - norm * (h - 8)])
      }
      return pts
    }

    const path = (pts: [number, number][], close: boolean) => {
      g.beginPath()
      g.moveTo(pts[0][0], close ? h : pts[0][1])
      if (close) g.lineTo(pts[0][0], pts[0][1])
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1]
        const [x1, y1] = pts[i]
        g.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      }
      const last = pts[pts.length - 1]
      g.lineTo(last[0], last[1])
      if (close) {
        g.lineTo(last[0], h)
        g.closePath()
      }
    }

    // Focus band shading.
    const band = FOCUS_BANDS[focus]
    if (focus !== 'full') {
      const x0 = Math.max(0, xOfFreq(Math.max(F_MIN, band.hp))) * w
      const x1 = Math.min(1, xOfFreq(Math.min(F_MAX, band.lp))) * w
      g.fillStyle = 'rgba(216,170,103,0.07)'
      g.fillRect(x0, 0, x1 - x0, h)
      g.strokeStyle = 'rgba(216,170,103,0.35)'
      g.setLineDash([3, 4])
      g.beginPath()
      g.moveTo(x0, 0)
      g.lineTo(x0, h)
      g.moveTo(x1, 0)
      g.lineTo(x1, h)
      g.stroke()
      g.setLineDash([])
    }

    if (showAfter) {
      const after = curve(a.after)
      const grad = g.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(240,198,129,0.55)')
      grad.addColorStop(1, 'rgba(183,121,42,0.02)')
      path(after, true)
      g.fillStyle = grad
      g.fill()
      path(after, false)
      g.strokeStyle = 'rgba(240,198,129,0.95)'
      g.lineWidth = 1.75
      g.stroke()
    }

    const before = curve(a.before)
    path(before, true)
    g.fillStyle = 'rgba(161,161,170,0.08)'
    g.fill()
    path(before, false)
    g.strokeStyle = 'rgba(212,212,216,0.75)'
    g.lineWidth = 1.25
    g.setLineDash([4, 3])
    g.stroke()
    g.setLineDash([])
    return true
  }, [analysers, focus, showAfter])

  useEffect(() => {
    if (!playing) {
      if (draw()) setHasDrawn(true)
      return
    }
    let raf = 0
    const loop = () => {
      if (draw()) setHasDrawn(true)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playing, draw])

  const ticks = [
    { f: 60, label: '60' },
    { f: 250, label: '250' },
    { f: 1000, label: '1k' },
    { f: 4000, label: '4k' },
    { f: 12000, label: '12k' },
  ]

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/70 p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">Live frequency picture</p>
          <p className="text-xs text-zinc-600">
            Both versions at once{matchVolume ? ', vocals matched' : ''}. Lows on the left, highs on the right.
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest">
          <span className="inline-flex items-center gap-2 text-zinc-400">
            <span className="h-px w-5 border-t border-dashed border-zinc-300" /> Before
          </span>
          {showAfter && (
            <span className="inline-flex items-center gap-2 text-[#f0dfc8]">
              <span className="h-[2px] w-5 bg-[#f0c681]" /> After
            </span>
          )}
        </div>
      </div>
      <div className="relative h-40 md:h-52">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {!hasDrawn || !playing ? (
          !hasDrawn && (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-zinc-600">
              Press play to see the difference
            </div>
          )
        ) : null}
      </div>
      <div className="relative mt-2 h-4">
        {ticks.map((t) => (
          <span
            key={t.f}
            className="absolute -translate-x-1/2 text-[10px] tabular-nums text-zinc-600"
            style={{ left: `${xOfFreq(t.f) * 100}%` }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Measured stats                                                       */
/* ------------------------------------------------------------------ */

type StatView = {
  label: string
  caption: string
  value: number
  format: (v: number) => [string, string]
  before: number
  after: number
  barFormat: (v: number) => string
}

function statView(key: TransformationStat, b: ClipStats, a: ClipStats): StatView {
  const pct = (v: number) => `${Math.round(v * 100)}%`
  switch (key) {
    case 'mud':
      return {
        label: 'Low-end mud',
        caption: 'Less energy piling up under 120 Hz, so the kick and bass hit clean.',
        value: (1 - a.lowShare / b.lowShare) * 100,
        format: (v) => [`${v >= 0 ? '−' : '+'}${Math.abs(Math.round(v))}`, '%'],
        before: b.lowShare,
        after: a.lowShare,
        barFormat: pct,
      }
    case 'air':
      return {
        label: 'Air',
        caption: 'More shine and detail above 8 kHz.',
        value: a.airShare / b.airShare,
        format: (v) => [v.toFixed(1), '×'],
        before: b.airShare,
        after: a.airShare,
        barFormat: (v) => `${(v * 100).toFixed(1)}%`,
      }
    case 'presence':
      return {
        label: 'Vocal presence',
        caption: 'More 2–5 kHz, the range where words become clear.',
        value: a.presenceShare / b.presenceShare,
        format: (v) => [v.toFixed(1), '×'],
        before: b.presenceShare,
        after: a.presenceShare,
        barFormat: (v) => `${(v * 100).toFixed(1)}%`,
      }
    case 'punch':
      return {
        label: 'Punch',
        caption: 'More room between the peaks and the body, so hits land harder.',
        value: a.crestDb - b.crestDb,
        format: (v) => [`${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)}`, 'dB'],
        before: b.crestDb,
        after: a.crestDb,
        barFormat: (v) => `${v.toFixed(1)} dB`,
      }
    case 'width':
      return {
        label: 'Stereo width',
        caption: 'How far the mix spreads past the middle of the speakers.',
        value: (a.width - b.width) * 100,
        format: (v) => [`${v >= 0 ? '+' : '−'}${Math.abs(Math.round(v))}`, 'pts'],
        before: b.width,
        after: a.width,
        barFormat: pct,
      }
  }
}

function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    if (reduced) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100)
      setValue(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, reduced])
  return value
}

function StatCard({ view, active, reduced }: { view: StatView; active: boolean; reduced: boolean }) {
  const shown = useCountUp(view.value, active, reduced)
  const max = Math.max(view.before, view.after) || 1
  return (
    <div className="flex flex-col border border-white/10 bg-surface-raised p-5 transition-colors hover:border-[#d8aa67]/30">
      <p className="mb-3 text-[10px] uppercase tracking-widest text-zinc-500">{view.label}</p>
      <p className="mb-2 flex items-baseline gap-1.5 font-display text-4xl tabular-nums tracking-normal text-gold">
        {active ? (
          <>
            {view.format(shown)[0]}
            <span className="font-sans text-lg font-light text-[#d8aa67]">{view.format(shown)[1]}</span>
          </>
        ) : (
          '—'
        )}
      </p>
      <p className="mb-5 text-xs font-light leading-relaxed text-zinc-500">{view.caption}</p>
      <div className="mt-auto space-y-2">
        {(
          [
            ['Before', view.before, 'bg-zinc-600'],
            ['After', view.after, 'bg-gradient-to-r from-[#b7792a] to-[#f0c681]'],
          ] as const
        ).map(([label, v, color]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-12 text-[10px] uppercase tracking-widest text-zinc-600">{label}</span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
              <span
                className={cn('absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-out', color)}
                style={{ width: active ? `${(v / max) * 100}%` : '0%' }}
              />
            </span>
            <span className="w-14 text-right text-[10px] tabular-nums text-zinc-500">{view.barFormat(v)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

/* ------------------------------------------------------------------ */
/* Studio                                                               */
/* ------------------------------------------------------------------ */

type Blind = { answer: 'before' | 'after'; picked: 'before' | 'after' | null }

export function TransformationStudio({ examples }: { examples: MixMasterExample[] }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const example = examples[index]
  const pending = !example.after

  const [divider, setDivider] = useState(50)
  const [matchVolume, setMatchVolume] = useState(true)
  const [focus, setFocus] = useState<FocusBand>('full')
  const [blind, setBlind] = useState<Blind | null>(null)
  const [score, setScore] = useState({ right: 0, total: 0 })

  const effectiveDivider = pending ? 100 : blind ? (blind.answer === 'after' ? 0 : 100) : divider

  const { pair, status, playing, position, play, pause, seek, analysers } = useAbEngine({
    beforeUrl: example.before,
    afterUrl: example.after,
    divider: effectiveDivider,
    matchVolume,
    focus,
  })

  const trackRef = useRef<HTMLDivElement>(null)
  const [statsRef, statsInView] = useInView<HTMLDivElement>()

  const pick = (i: number) => {
    setIndex(i)
    setDivider(50)
    setFocus('full')
    setBlind(null)
    setScore({ right: 0, total: 0 })
  }

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    setDivider(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  const startBlindRound = () => {
    setBlind({ answer: Math.random() < 0.5 ? 'before' : 'after', picked: null })
    if (!playing) play()
  }

  const guess = (g: 'before' | 'after') => {
    if (!blind || blind.picked) return
    setBlind({ ...blind, picked: g })
    setScore((s) => ({ right: s.right + (g === blind.answer ? 1 : 0), total: s.total + 1 }))
  }

  const progress = pair ? (position / pair.duration) * 100 : 0
  // The divider splits the timeline: playhead in the white is the before, in the gold is the after.
  const hearing = sideAt(effectiveDivider, progress) === 'after' ? 'After' : 'Before'
  // When volume is matched, draw the waveforms matched too.
  const trims =
    pair && matchVolume && !pending
      ? (() => {
          const target = Math.min(pair.beforeStats.vocalLevel, pair.afterStats.vocalLevel)
          return { before: target / pair.beforeStats.vocalLevel, after: target / pair.afterStats.vocalLevel }
        })()
      : { before: 1, after: 1 }
  const beforePeaks = pair ? pair.beforePeaks.map((p) => p * trims.before) : []
  const afterPeaks = pair ? pair.afterPeaks.map((p) => p * trims.after) : []
  const peakMax = pair ? Math.max(...beforePeaks, ...afterPeaks, 1e-6) : 1
  const levelGapDb = pair ? 20 * Math.log10(pair.afterStats.rms / pair.beforeStats.rms) : 0

  return (
    <div>
      <ArtistPicker examples={examples} index={index} onPick={pick} />

      <div className="relative select-none overflow-hidden rounded-lg gradient-border-tsukuyomi bg-surface-raised depth-shadow-lg">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: NOISE_BG }} aria-hidden />
        <div className="glow-orb -top-24 right-0 h-64 w-64 bg-amber-500/15" aria-hidden />

        <div className="relative grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]">
          <ArtistSpotlight example={example} pending={pending} />

          <div className="order-1 min-w-0 lg:order-none">
            {/* Comparison surface */}
            <div ref={trackRef} className="relative h-[230px] overflow-hidden border-b border-white/10 bg-black sm:h-[300px]">
              <div className="absolute inset-0">
                {pair && <Waveform peaks={beforePeaks} max={peakMax} tone="before" progress={progress} />}
                <span className="absolute left-4 top-4 rounded border border-white/10 bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 sm:left-6">
                  Before<span className="hidden sm:inline"> · {example.beforeLabel}</span>
                </span>
              </div>

              {!pending && (
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,121,42,0.16),#000_72%)]"
                  style={{ clipPath: `inset(0 0 0 ${divider}%)` }}
                >
                  {pair && <Waveform peaks={afterPeaks} max={peakMax} tone="after" progress={progress} />}
                  <span className="absolute right-4 top-4 rounded border border-[#d8aa67]/40 bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f0dfc8] sm:right-6">
                    After<span className="hidden sm:inline"> · {example.afterLabel}</span>
                  </span>
                </div>
              )}

              {pending && (
                <div className="absolute inset-y-0 right-0 flex w-[42%] flex-col items-center justify-center gap-3 border-l border-dashed border-[#d8aa67]/40 bg-gradient-to-l from-[#b7792a]/15 to-transparent px-4 text-center backdrop-blur-[2px]">
                  <iconify-icon icon="solar:tuning-square-2-linear" width="28" height="28" className="text-[#d8aa67]" />
                  <p className="font-display text-lg uppercase tracking-normal text-[#f0dfc8]">Final mix on the board</p>
                  <p className="text-[11px] text-zinc-500">Listen to the rough now. The after drops here when it&apos;s done.</p>
                </div>
              )}

              {blind && !blind.picked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-black/80 backdrop-blur-md">
                  <iconify-icon icon="solar:eye-closed-linear" width="30" height="30" className="text-[#d8aa67]" />
                  <p className="font-display text-xl uppercase tracking-normal text-[#f0dfc8]">Blind round</p>
                  <p className="text-xs text-zinc-500">No peeking. Which version is playing?</p>
                </div>
              )}

              {status !== 'ready' && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black text-zinc-600">
                  <iconify-icon icon="solar:soundwave-linear" width="32" height="32" />
                  <span className="text-[10px] uppercase tracking-widest">
                    {status === 'error' ? 'Audio could not load' : 'Loading audio…'}
                  </span>
                </div>
              )}

              {!pending && !blind && (
                <>
                  <div
                    className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-[#f0dfc8]"
                    style={{ left: `${divider}%` }}
                    aria-hidden
                  >
                    <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d8aa67] text-black shadow-[0_0_28px_rgba(240,198,129,0.5)]">
                      <iconify-icon icon="solar:transfer-horizontal-linear" width="18" height="18" />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={divider}
                    aria-label="Where the song switches from before to after"
                    aria-valuetext={`After from ${Math.round(divider)}% of the clip`}
                    onChange={(event) => setDivider(Number(event.target.value))}
                    onPointerDown={(event) => setFromClientX(event.clientX)}
                    className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
                  />
                </>
              )}
            </div>

            {/* Transport */}
            <div className="relative p-5 md:p-6">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => (playing ? pause() : play())}
                  disabled={status !== 'ready'}
                  aria-label={playing ? 'Pause' : 'Play'}
                  className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d8aa67] text-black transition-colors hover:bg-[#f0c681] disabled:opacity-40"
                >
                  {playing && <span className="absolute inset-0 animate-ping rounded-full bg-[#d8aa67]/30" aria-hidden />}
                  <iconify-icon icon={playing ? 'solar:pause-bold' : 'solar:play-bold'} width="24" height="24" className="relative z-10" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <p className="truncate text-sm text-white">
                      {example.song} <span className="text-zinc-500">· {example.artist}</span>
                    </p>
                    <p className="shrink-0 text-[10px] uppercase tracking-widest text-zinc-500">
                      Hearing{' '}
                      <span className="text-[#f0dfc8]">
                        {blind && !blind.picked ? '???' : hearing}
                      </span>
                    </p>
                  </div>
                  <div
                    className="progress-ink-track"
                    role="slider"
                    tabIndex={0}
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      seek((e.clientX - rect.left) / rect.width)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') seek(progress / 100 + 0.05)
                      if (e.key === 'ArrowLeft') seek(progress / 100 - 0.05)
                    }}
                  >
                    <div className="progress-ink-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-1 flex justify-between text-xs tabular-nums text-[#d8aa67]/70">
                    <span>{formatTime(position)}</span>
                    <span>{formatTime(pair?.duration ?? 0)}</span>
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-5 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-widest text-zinc-600">Flip</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
                      {(
                        [
                          ['Before', 100],
                          ['After', 0],
                        ] as const
                      ).map(([label, value]) => (
                        <button
                          key={label}
                          type="button"
                          disabled={pending || !!blind}
                          onClick={() => setDivider(value)}
                          aria-pressed={!blind && divider === value}
                          className={cn(
                            'rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest transition-colors disabled:opacity-40',
                            !blind && divider === value ? 'bg-[#d8aa67] text-black' : 'text-zinc-400 hover:text-white'
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={matchVolume}
                      disabled={pending}
                      onClick={() => setMatchVolume((v) => !v)}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-3 text-[10px] uppercase tracking-widest text-zinc-400 transition-colors hover:text-white disabled:opacity-40"
                    >
                      <span className={cn('relative h-5 w-9 rounded-full transition-colors', matchVolume ? 'bg-[#d8aa67]' : 'bg-white/10')}>
                        <span
                          className={cn(
                            'absolute top-0.5 h-4 w-4 rounded-full bg-black transition-all',
                            matchVolume ? 'left-[18px]' : 'left-0.5 bg-zinc-400'
                          )}
                        />
                      </span>
                      Match vocals
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
                    {pending
                      ? 'Comparison tools unlock when the final mix lands.'
                      : matchVolume
                        ? 'On: the vocals sit at the same level in both versions, so you hear the mix, not the volume knob.'
                        : `Off: raw levels. The after is ${Math.abs(levelGapDb).toFixed(1)} dB ${levelGapDb >= 0 ? 'louder' : 'quieter'} than the before.`}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-widest text-zinc-600">Focus your ears</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(FOCUS_BANDS) as FocusBand[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFocus(key)}
                        aria-pressed={focus === key}
                        title={FOCUS_BANDS[key].hint}
                        className={cn(
                          'rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors',
                          focus === key
                            ? 'border-[#d8aa67]/75 bg-[#b7792a]/15 text-[#f0dfc8]'
                            : 'border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-300'
                        )}
                      >
                        {FOCUS_BANDS[key].label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
                    {focus === 'full'
                      ? 'Solo one part of the spectrum, then flip before and after.'
                      : `Soloing ${FOCUS_BANDS[focus].hint.toLowerCase()} (${FOCUS_BANDS[focus].hp}–${FOCUS_BANDS[focus].lp >= 20000 ? '20k' : FOCUS_BANDS[focus].lp} Hz).`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spectrum + blind test */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Spectrum analysers={analysers} playing={playing} focus={focus} showAfter={!pending} matchVolume={matchVolume && !pending} />

        <div className="relative flex flex-col overflow-hidden rounded-lg border border-[#d8aa67]/25 bg-gradient-to-b from-[#d8aa67]/[0.08] via-black/40 to-transparent p-5">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent" />
          <div className="mb-3 flex items-center justify-between">
            <p className="font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8c3a4]">Blind test</p>
            {score.total > 0 && (
              <span className="rounded-full border border-[#d8aa67]/40 bg-[#d8aa67]/10 px-2.5 py-0.5 text-[10px] tabular-nums text-[#f0dfc8]">
                {score.right} / {score.total}
              </span>
            )}
          </div>
          <p className="mb-1 font-display text-xl uppercase tracking-normal text-[#f3ede3]">Can you tell?</p>
          <p className="mb-5 text-xs font-light leading-relaxed text-[#b8a890]/85">
            We play one version at random. You call it. Most people get it right every time.
          </p>

          {pending ? (
            <p className="mt-auto text-[11px] text-zinc-600">Unlocks when the final mix lands.</p>
          ) : !blind ? (
            <button type="button" onClick={startBlindRound} disabled={status !== 'ready'} className="btn-primary mt-auto w-full disabled:opacity-40">
              {score.total ? 'Next round' : 'Start blind test'}
              <iconify-icon icon="solar:eye-closed-linear" width="16" height="16" />
            </button>
          ) : !blind.picked ? (
            <div className="mt-auto grid grid-cols-2 gap-2">
              <button type="button" onClick={() => guess('before')} className="btn-secondary w-full !px-3">
                Rough
              </button>
              <button type="button" onClick={() => guess('after')} className="btn-primary w-full !px-3">
                Finished
              </button>
            </div>
          ) : (
            <div className="mt-auto space-y-3">
              <p
                className={cn(
                  'flex items-center gap-2 text-sm',
                  blind.picked === blind.answer ? 'text-green-200' : 'text-amber-200'
                )}
              >
                <iconify-icon
                  icon={blind.picked === blind.answer ? 'solar:check-circle-linear' : 'solar:refresh-circle-linear'}
                  width="18"
                  height="18"
                />
                {blind.picked === blind.answer ? 'Called it.' : 'Not this time.'} That was the{' '}
                {blind.answer === 'after' ? 'finished record' : 'rough'}.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={startBlindRound} className="btn-primary w-full !px-3">
                  Again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDivider(blind.answer === 'after' ? 0 : 100)
                    setBlind(null)
                  }}
                  className="btn-secondary w-full !px-3"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Measured difference */}
      <div ref={statsRef} className="mt-4">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">Measured from these exact clips</p>
          <p className="text-[10px] text-zinc-600">Calculated in your browser from the audio you just heard.</p>
        </div>
        {pending ? (
          <div className="border border-dashed border-white/10 p-6 text-center text-xs text-zinc-600">
            Numbers appear when the final mix of {example.song} lands.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pair &&
              example.stats.map((key) => (
                <StatCard
                  key={`${example.id}-${key}`}
                  view={statView(key, pair.beforeStats, pair.afterStats)}
                  active={statsInView}
                  reduced={reduced}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
