'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CHAPTERS, TOTAL_CHAPTERS, chapterReleaseAt, isChapterReleased } from '@/lib/experience/campaign'
import { exp } from '@/lib/experience/config'
import { useExperience } from '@/lib/experience/store'
import { sfx } from './audio'
import { composition } from './composition'
import { Glyph } from './Glyph'
import { usePrefersReducedMotion } from './Motion'

const CX = 600
const CY = 372
const RX = 470
const RY = 250

function nodePos(i: number) {
  const a = ((i * 45 - 157.5) * Math.PI) / 180
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) }
}

const PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  x: (i * 211) % 1200,
  y: 60 + ((i * 97) % 600),
  r: 0.8 + ((i * 7) % 5) * 0.35,
  d: 7 + ((i * 3) % 9),
  delay: -((i * 1.7) % 9),
}))

/**
 * The central hub. A persistent, user-specific world: the door opens a little
 * more with every revelation held. No real-time multiplayer, by design
 * (brief 13.2). The chapter list under it is the no-3D fallback.
 *
 * Motion: three depth planes drift against the pointer (slow gravitational
 * movement), the door's light breathes with the member's composition (light
 * responding to sound), and held threads carry travelling pulses.
 */
export function ThresholdScene({
  solved,
  preview,
  nextChapter,
  liveChapter,
}: {
  solved: number[]
  preview: boolean
  nextChapter: number | null
  liveChapter: number | null
}) {
  const router = useRouter()
  const { findSecret } = useExperience()
  const reduced = usePrefersReducedMotion()
  const power = solved.length / TOTAL_CHAPTERS
  const glow = 0.18 + power * 0.82

  const far = useRef<SVGGElement>(null)
  const mid = useRef<SVGGElement>(null)
  const near = useRef<SVGGElement>(null)
  const doorLight = useRef<SVGGElement>(null)
  const taps = useRef<number[]>([])
  const [blink, setBlink] = useState(0)

  useEffect(() => {
    if (reduced) return
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let raf = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5
      ty = e.clientY / window.innerHeight - 0.5
    }
    const loop = () => {
      x += (tx - x) * 0.04
      y += (ty - y) * 0.04
      far.current?.setAttribute('transform', `translate(${-x * 30} ${-y * 18})`)
      mid.current?.setAttribute('transform', `translate(${x * 10} ${y * 6})`)
      near.current?.setAttribute('transform', `translate(${x * 22} ${y * 12})`)
      const lvl = composition.level()
      if (doorLight.current) doorLight.current.style.opacity = String(0.85 + lvl * 0.6)
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  function tapEye() {
    const now = Date.now()
    taps.current = [...taps.current.filter((t) => now - t < 1800), now]
    setBlink((b) => b + 1)
    sfx.tick()
    if (taps.current.length >= 3) {
      taps.current = []
      findSecret('eye')
    }
  }

  return (
    <svg viewBox="0 0 1200 740" role="group" aria-label="The Threshold: a door surrounded by eight artifacts" className="h-auto w-full select-none">
      <defs>
        <radialGradient id="fne-spill" cx="50%" cy="62%" r="55%">
          <stop offset="0%" stopColor="#F0A35E" stopOpacity={0.55 * glow} />
          <stop offset="45%" stopColor="#D9772B" stopOpacity={0.18 * glow} />
          <stop offset="100%" stopColor="#D9772B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fne-door" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F0A35E" stopOpacity={0.95 * glow} />
          <stop offset="70%" stopColor="#D9772B" stopOpacity={0.3 * glow} />
          <stop offset="100%" stopColor="#D9772B" stopOpacity="0.04" />
        </linearGradient>
        <filter id="fne-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width="1200" height="740" fill="#020202" />
      <rect width="1200" height="740" fill="url(#fne-spill)" />

      <g ref={far}>
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#d8aa67"
            className="fne-mote"
            style={{ animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }}
          />
        ))}
        {/* concentric rings: the portal's field, rippling outward */}
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx={CX}
            cy={500}
            rx={180}
            ry={60}
            fill="none"
            stroke="#d8aa67"
            strokeOpacity={0.12 + power * 0.2}
            className="fne-field"
            style={{ animationDelay: `${i * 2}s` }}
          />
        ))}
      </g>

      <g ref={mid}>
        <path d="M0 640H1200" stroke="#d8aa67" strokeOpacity="0.18" />
        <path d="M420 640L120 740M780 640L1080 740M600 640V740" stroke="#d8aa67" strokeOpacity="0.08" />

        <g ref={doorLight} style={{ transition: 'opacity 120ms linear' }}>
          <path d="M468 640V330A132 132 0 0 1 732 330V640Z" fill="url(#fne-door)" filter="url(#fne-blur)" opacity="0.8" />
        </g>
        <path d="M468 640V330A132 132 0 0 1 732 330V640Z" fill="#020202" fillOpacity="0.55" />
        <path d="M468 640V330A132 132 0 0 1 732 330V640Z" fill="url(#fne-door)" />
        {/* light leaking under the door, wider with every artifact */}
        <ellipse cx={CX} cy={640} rx={140 + power * 260} ry={10 + power * 16} fill="#F0A35E" opacity={0.12 + power * 0.35} filter="url(#fne-blur)" />
        <path d="M468 640V330A132 132 0 0 1 732 330V640" fill="none" stroke="#d8aa67" strokeOpacity={0.45 + 0.4 * power} strokeWidth="1.5" />
        <path d="M510 640V338A90 90 0 0 1 690 338V640" fill="none" stroke="#d8aa67" strokeOpacity="0.2" />

        <g
          role="button"
          tabIndex={-1}
          aria-hidden
          onClick={tapEye}
          className="cursor-pointer outline-none"
          transform="translate(570 150)"
          style={{ opacity: 0.35 + power * 0.65 }}
        >
          <rect x="-10" y="-10" width="80" height="80" fill="transparent" />
          <g key={blink} className={blink ? 'fne-blink' : undefined}>
            <Glyph name="eye" size={60} className="text-[#F0A35E]" strokeWidth={1.2} />
          </g>
        </g>
      </g>

      <g ref={near}>
        {CHAPTERS.map((c, i) => {
          const { x, y } = nodePos(i)
          const held = solved.includes(c.n)
          const d = `M${x} ${y}Q${(x + CX) / 2} ${y + (y < CY ? 90 : -60)} ${CX} 520`
          return (
            <g key={`t${c.n}`}>
              <path
                d={d}
                fill="none"
                stroke={held ? '#F0A35E' : '#d8aa67'}
                strokeOpacity={held ? 0.55 : 0.1}
                strokeWidth={held ? 1.4 : 1}
                strokeDasharray={held ? undefined : '3 7'}
              />
              {held && !reduced && (
                <circle r="2.6" fill="#f7f1e6">
                  <animateMotion dur={`${3.2 + (i % 3) * 0.7}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          )
        })}

        {CHAPTERS.map((c, i) => {
          const { x, y } = nodePos(i)
          const held = solved.includes(c.n)
          const open = isChapterReleased(c.n, preview)
          const isNext = nextChapter === c.n && open
          const isLive = liveChapter === c.n
          const at = chapterReleaseAt(c.n)
          const label = `Week ${c.n}, ${c.theme}. ${held ? 'Revelation held.' : open ? 'Open.' : 'Not yet released.'}${isLive ? ' Live now.' : ''}`
          const go = () => {
            if (!open) return
            sfx.select()
            router.push(exp(`/chapter/${c.n}`))
          }
          return (
            <g
              key={c.n}
              role="link"
              tabIndex={open ? 0 : -1}
              aria-label={label}
              aria-disabled={!open}
              onClick={go}
              onMouseEnter={() => open && sfx.tick()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  go()
                }
              }}
              className={open ? 'fne-node cursor-pointer' : 'fne-node-locked'}
              transform={`translate(${x} ${y})`}
            >
              {(isNext || isLive) && <circle r="52" fill="none" stroke="#F0A35E" strokeOpacity="0.6" className="fne-pulse" />}
              <circle r="44" fill="#050505" stroke={held ? '#F0A35E' : '#d8aa67'} strokeOpacity={held ? 1 : open ? 0.55 : 0.18} strokeWidth={held ? 2 : 1.2} />
              {held && <circle r="44" fill="#D9772B" fillOpacity="0.14" />}
              {held && <circle r="44" fill="none" stroke="#F0A35E" strokeOpacity="0.35" className="fne-halo" />}
              <g transform="translate(-22 -22)" opacity={open ? 1 : 0.3}>
                <Glyph name={c.glyph} size={44} className={held ? 'text-[#F0A35E]' : 'text-[#ece3d7]'} />
              </g>
              <text y="68" textAnchor="middle" className="fill-[#ece3d7]" fontSize="15" letterSpacing="3" opacity={open ? 0.85 : 0.35}>
                {c.theme.toUpperCase()}
              </text>
              <text y="88" textAnchor="middle" className={isLive ? 'fill-[#F0A35E]' : 'fill-[#d8aa67]'} fontSize="11" letterSpacing="2" opacity="0.8">
                {isLive
                  ? '● LIVE'
                  : held
                    ? 'HELD'
                    : open
                      ? `WEEK ${c.n}`
                      : at
                        ? at.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
                        : `WEEK ${c.n}`}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
