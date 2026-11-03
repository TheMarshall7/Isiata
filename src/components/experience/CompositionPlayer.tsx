'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { CHAPTERS, HIDDEN_ROOM, TOTAL_CHAPTERS } from '@/lib/experience/campaign'
import { track, useExperience } from '@/lib/experience/store'
import { composition } from './composition'
import { Glyph } from './Glyph'
import { usePrefersReducedMotion } from './Motion'
import { Btn } from './ui'

function useComposition() {
  const [, force] = useState(0)
  useEffect(() => composition.onChange(() => force((x) => x + 1)), [])
  return composition
}

/** Live spectrum: light responding to sound. */
function Spectrum({ className, bars = 48 }: { className?: string; bars?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const el = ref.current
    const c = el?.getContext('2d')
    if (!el || !c) return
    let raf = 0
    const smooth = new Float32Array(bars)
    const loop = () => {
      const data = composition.spectrum()
      const W = el.width
      const H = el.height
      c.clearRect(0, 0, W, H)
      const w = W / bars
      for (let i = 0; i < bars; i++) {
        const v = (data[Math.floor((i / bars) * data.length * 0.8)] ?? 0) / 255
        smooth[i] += (v - smooth[i]) * 0.25
        const h = Math.max(2, smooth[i] * H * 0.95)
        const g = c.createLinearGradient(0, H, 0, H - h)
        g.addColorStop(0, 'rgba(217,119,43,0.9)')
        g.addColorStop(1, 'rgba(247,241,230,0.9)')
        c.fillStyle = g
        c.fillRect(i * w + w * 0.2, H - h, w * 0.6, h)
      }
      if (!reduced) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [bars, reduced])
  return <canvas ref={ref} width={bars * 12} height={120} aria-hidden className={className} />
}

export function CompositionPlayer({ variant = 'full' }: { variant?: 'full' | 'mini' }) {
  const { state } = useExperience()
  const comp = useComposition()
  const held = state.artifacts
  const available = [...held, ...(state.hiddenRoomAt ? [9] : [])]
  const [muted, setMuted] = useState<number[]>([])
  const on = available.filter((n) => !muted.includes(n))

  function toggle() {
    if (comp.playing) comp.stop()
    else {
      track('composition_play', { layers: on.length })
      comp.start(on)
    }
  }

  function toggleLayer(n: number) {
    const next = muted.includes(n) ? muted.filter((x) => x !== n) : [...muted, n]
    setMuted(next)
    if (comp.playing) comp.setLayers(available.filter((x) => !next.includes(x)))
  }

  if (variant === 'mini') {
    return (
      <div className="flex items-center gap-4">
        <Btn onClick={toggle} variant={comp.playing ? 'ghost' : 'primary'} disabled={available.length === 0} className="shrink-0 px-5 py-2.5 text-xs">
          {comp.playing ? 'Stop' : available.length ? 'Play your composition' : 'No layers yet'}
        </Btn>
        <Spectrum className="h-10 w-full max-w-[220px]" bars={28} />
      </div>
    )
  }

  const layers = [
    ...CHAPTERS.map((c) => ({ n: c.n, name: c.layer, glyph: c.glyph, from: `Week ${c.n}` })),
    { n: 9, name: HIDDEN_ROOM.layer, glyph: 'void' as const, from: 'Hidden' },
  ]

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-[#d8aa67]/20 bg-[#030303] p-6">
        <Spectrum className="h-28 w-full" />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#ece3d7]/60">
            {held.length === TOTAL_CHAPTERS ? 'Every layer is yours. This is the whole piece.' : `${held.length} of ${TOTAL_CHAPTERS} layers held.`}
          </p>
          <Btn onClick={toggle} disabled={available.length === 0} className="px-6 py-2.5 text-xs">
            {comp.playing ? 'Stop' : 'Play'}
          </Btn>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-9">
        {layers.map((l) => {
          const has = available.includes(l.n)
          const active = has && !muted.includes(l.n)
          return (
            <button
              key={l.n}
              disabled={!has}
              onClick={() => toggleLayer(l.n)}
              aria-pressed={active}
              aria-label={has ? `${l.name} layer, ${active ? 'on' : 'muted'}` : `${l.name} layer, not yet held`}
              className={cn(
                'flex flex-col items-center rounded-xl border px-2 py-3 transition-all duration-500',
                active ? 'border-[#F0A35E]/60 bg-[#D9772B]/10' : has ? 'border-[#d8aa67]/25' : 'border-[#ece3d7]/10 opacity-40'
              )}
            >
              <Glyph name={l.glyph} size={26} className={active ? 'text-[#F0A35E]' : 'text-[#ece3d7]/40'} />
              <span className="mt-2 text-[11px] tracking-[0.08em] text-[#ece3d7]/80">{has ? l.name : '???'}</span>
              <span className="font-mono text-[9px] tracking-[0.15em] text-[#ece3d7]/35">{l.from.toUpperCase()}</span>
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-[#ece3d7]/35">
        Tap a layer to mute or unmute it. These are sketches of the sound; the album's own stems replace them at launch.
      </p>
    </div>
  )
}
