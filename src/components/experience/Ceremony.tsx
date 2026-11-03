'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChapterDef } from '@/lib/experience/campaign'
import type { ResonanceLine } from '@/lib/experience/store'
import { haptic, sfx } from './audio'
import { Glyph } from './Glyph'
import { TransmitText, useCountUp, usePrefersReducedMotion } from './Motion'
import { Btn } from './ui'

/**
 * The unlock ceremony. Particles converge from the dark, the artifact is drawn
 * line by line, then a kinetic release. Brand Core 19: "particles converging",
 * "objects transforming", "sudden kinetic release".
 */
export function Ceremony({
  chapter,
  lines,
  levelUp,
  onDone,
}: {
  chapter: ChapterDef
  lines: ResonanceLine[]
  levelUp: string | null
  onDone: () => void
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState(0)
  const total = lines.reduce((a, l) => a + l.points, 0)
  const count = useCountUp(phase >= 3 ? total : 0, 1200)

  useEffect(() => {
    sfx.reveal()
    haptic([20, 60, 40])
    const ts = [setTimeout(() => setPhase(1), 900), setTimeout(() => setPhase(2), 2300), setTimeout(() => setPhase(3), 3300)]
    if (levelUp) ts.push(setTimeout(() => (sfx.level(), haptic([30, 40, 30, 40, 80])), 4600))
    return () => ts.forEach(clearTimeout)
  }, [levelUp])

  useEffect(() => {
    const el = canvas.current
    const c = el?.getContext('2d')
    if (!el || !c || reduced) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const resize = () => {
      el.width = window.innerWidth * dpr
      el.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)
    const N = 260
    const parts = Array.from({ length: N }, () => {
      const a = Math.random() * Math.PI * 2
      const d = 0.6 + Math.random() * 0.8
      return { a, d, s: 0.4 + Math.random() * 1.6, v: 0.6 + Math.random() * 1.4 }
    })
    const t0 = performance.now()
    let raf = 0
    const loop = (now: number) => {
      const t = (now - t0) / 1000
      const W = el.width
      const H = el.height
      const cx = W / 2
      const cy = H * 0.36
      const R = Math.max(W, H) * 0.7
      c.clearRect(0, 0, W, H)
      for (const p of parts) {
        let r: number
        if (t < 1.6) {
          // converge: eased fall toward the center
          const k = Math.min(1, t / 1.6)
          r = R * p.d * (1 - k * k * (3 - 2 * k)) + 6 * dpr
        } else {
          // release: thrown outward, slowing
          const k = t - 1.6
          r = 6 * dpr + (R * 0.9 * p.v * (1 - Math.exp(-k * 1.6)))
        }
        const spin = t < 1.6 ? t * 0.9 : 1.44 + (t - 1.6) * 0.15
        const x = cx + Math.cos(p.a + spin * (1 / p.d)) * r
        const y = cy + Math.sin(p.a + spin * (1 / p.d)) * r * 0.85
        const alpha = t < 1.6 ? 0.25 + 0.75 * (t / 1.6) : Math.max(0, 1 - (t - 1.6) / 2.4)
        c.globalAlpha = alpha
        c.fillStyle = p.v > 1.6 ? '#f7f1e6' : '#F0A35E'
        c.fillRect(x, y, p.s * dpr, p.s * dpr)
      }
      if (t < 4.5) raf = requestAnimationFrame(loop)
      else c.clearRect(0, 0, W, H)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Artifact held: ${chapter.artifact.name}`}
      className="fne-ceremony fixed inset-0 z-[80] flex flex-col items-center overflow-y-auto bg-[#020202] px-6 py-16 text-center"
    >
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="fne-flare pointer-events-none absolute left-1/2 top-[36%] h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      <div className="relative z-10 my-auto flex flex-col items-center">
        <div className={phase >= 1 ? 'fne-draw is-on' : 'fne-draw'}>
          <Glyph name={chapter.glyph} size={140} strokeWidth={1.1} className="text-[#F0A35E] drop-shadow-[0_0_30px_rgba(240,163,94,0.6)]" />
        </div>

        {phase >= 1 && (
          <>
            <p className="mt-8 font-mono text-[11px] tracking-[0.35em] text-[#d8aa67]">ARTIFACT HELD · {chapter.n} OF 8</p>
            <TransmitText
              as="h2"
              text={chapter.artifact.name}
              className="mt-3 block font-display text-[clamp(1.6rem,5vw,2.6rem)] tracking-[0.1em] text-[#f7f1e6]"
            />
          </>
        )}

        {phase >= 2 && (
          <div className="fne-rise mt-6">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#ece3d7]/40">FRAGMENT</p>
            <TransmitText text={chapter.artifact.word} speed={90} className="mt-1 block font-display text-5xl tracking-[0.3em] text-[#F0A35E]" />
            <p className="mt-4 text-sm text-[#ece3d7]/60">
              New layer in your composition: <span className="text-[#f7f1e6]">{chapter.layer}</span>
            </p>
          </div>
        )}

        {phase >= 3 && (
          <div className="fne-rise mt-10 w-full max-w-sm">
            <ul className="space-y-1.5 text-sm">
              {lines.map((l, i) => (
                <li key={l.label} className="fne-rise flex justify-between text-[#ece3d7]/70" style={{ animationDelay: `${i * 120}ms` }}>
                  <span>{l.label}</span>
                  <span className="font-mono text-[#d8aa67]">+{l.points}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-display text-4xl tabular-nums text-[#f7f1e6]">
              +{count} <span className="text-sm tracking-[0.3em] text-[#d8aa67]">RESONANCE</span>
            </p>
            {levelUp && (
              <p className="fne-level mt-6 rounded-full border border-[#F0A35E]/60 px-5 py-2 font-spaced text-xs uppercase tracking-[0.3em] text-[#F0A35E]">
                You are now {levelUp}
              </p>
            )}
            <Btn onClick={onDone} className="mt-8">
              See the revelation
            </Btn>
          </div>
        )}
      </div>
    </div>
  )
}
