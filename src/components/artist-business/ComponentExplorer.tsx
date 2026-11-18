'use client'

import { useEffect, useRef, useState } from 'react'
import { ARTISTS_COPY, COMPONENT_META } from '@/lib/artists/page-content'

const components = ARTISTS_COPY.build.components
const SIZE = 440
const CENTER = SIZE / 2
const RADIUS = 168

function nodePosition(index: number) {
  const angle = (index / components.length) * Math.PI * 2 - Math.PI / 2
  return { x: CENTER + Math.cos(angle) * RADIUS, y: CENTER + Math.sin(angle) * RADIUS }
}

export function ComponentExplorer() {
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)

  // Cycle through components while the section is on screen, until the visitor takes over.
  useEffect(() => {
    if (!autoplay) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = rootRef.current
    if (!el) return
    let timer: ReturnType<typeof setInterval> | undefined
    const observer = new IntersectionObserver(([entry]) => {
      clearInterval(timer)
      if (entry.isIntersecting) {
        timer = setInterval(() => setActive((i) => (i + 1) % components.length), 3800)
      }
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [autoplay])

  const select = (index: number) => {
    setAutoplay(false)
    setActive(index)
  }

  const current = components[active]
  const meta = COMPONENT_META[current.id]

  return (
    <div ref={rootRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Hub diagram (desktop) */}
      <div className="hidden lg:block">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[520px] mx-auto" role="group" aria-label="The ten components">
          <defs>
            <radialGradient id="abs-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d8aa67" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d8aa67" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(216,170,103,0.12)" strokeDasharray="2 6" />
          {components.map((c, i) => {
            const p = nodePosition(i)
            const on = i === active
            return (
              <line
                key={`l-${c.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke={on ? '#d8aa67' : 'rgba(255,255,255,0.07)'}
                strokeWidth={on ? 1.5 : 1}
                className={on ? 'abs-flow' : undefined}
                style={{ transition: 'stroke 500ms' }}
              />
            )
          })}
          <circle cx={CENTER} cy={CENTER} r={90} fill="url(#abs-core)" />
          <circle cx={CENTER} cy={CENTER} r={54} fill="#0b0b0b" stroke="rgba(216,170,103,0.5)" />
          <text x={CENTER} y={CENTER - 4} textAnchor="middle" fill="#ece3d7" fontSize="10" letterSpacing="2">
            YOUR ARTIST
          </text>
          <text x={CENTER} y={CENTER + 11} textAnchor="middle" fill="#ece3d7" fontSize="10" letterSpacing="2">
            BUSINESS
          </text>
          {components.map((c, i) => {
            const p = nodePosition(i)
            const on = i === active
            const labelBelow = p.y > CENTER + 10
            return (
              <g
                key={c.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={c.title}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    select(i)
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-white"
              >
                {on && <circle cx={p.x} cy={p.y} r={30} fill="rgba(216,170,103,0.15)" className="abs-node-pulse" />}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={20}
                  fill={on ? '#d8aa67' : '#111'}
                  stroke={on ? '#f0c681' : 'rgba(216,170,103,0.35)'}
                  style={{ transition: 'fill 400ms, stroke 400ms' }}
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill={on ? '#0b0b0b' : '#d5c8b8'}
                  className="font-mono pointer-events-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
                <text
                  x={p.x}
                  y={labelBelow ? p.y + 38 : p.y - 30}
                  textAnchor="middle"
                  fontSize="10"
                  letterSpacing="1.5"
                  fill={on ? '#f0dfc8' : '#71717a'}
                  className="pointer-events-none uppercase"
                  style={{ transition: 'fill 400ms' }}
                >
                  {COMPONENT_META[c.id].short.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div>
        {/* Chips (mobile and tablet) */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {components.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => select(i)}
              aria-pressed={i === active}
              className={`rounded-md border px-2 py-2 text-left text-[11px] transition-colors ${
                i === active
                  ? 'border-[#d8aa67] bg-[#d8aa67]/10 text-[#f0dfc8]'
                  : 'border-white/10 text-zinc-500 hover:border-white/25'
              }`}
            >
              <span className="font-mono mr-1.5">{String(i + 1).padStart(2, '0')}</span>
              {COMPONENT_META[c.id].short}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div key={current.id} className="abs-panel abs-panel-glow p-6 md:p-8 min-h-[300px] animate-fade-in-up">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8aa67]/40 bg-[#d8aa67]/10">
              <iconify-icon icon={meta.icon} width="22" height="22" className="text-[#f0c681]" />
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-500">
              {meta.layer}
            </span>
          </div>
          <p className="font-mono text-xs text-zinc-500 mb-2">
            {String(active + 1).padStart(2, '0')} / {components.length}
          </p>
          <h3 className="text-2xl md:text-3xl font-display uppercase tracking-normal text-gold mb-4">
            {current.title}
          </h3>
          <p className="text-base text-white leading-relaxed mb-3">{current.tagline}</p>
          {current.body && <p className="text-sm text-zinc-400 leading-relaxed">{current.body}</p>}
          {'examples' in current && current.examples && (
            <div className="mt-4 flex flex-wrap gap-2">
              {current.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full border border-[#d8aa67]/30 px-3 py-1 text-xs text-[#d5c8b8]"
                >
                  {ex.replace(/\.$/, '')}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => select((active - 1 + components.length) % components.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-[#d8aa67]/60 transition-colors"
              aria-label="Previous component"
            >
              <iconify-icon icon="solar:alt-arrow-left-linear" width="16" height="16" className="text-gold" />
            </button>
            <button
              type="button"
              onClick={() => select((active + 1) % components.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-[#d8aa67]/60 transition-colors"
              aria-label="Next component"
            >
              <iconify-icon icon="solar:alt-arrow-right-linear" width="16" height="16" className="text-gold" />
            </button>
            <div className="ml-2 h-px flex-1 bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[#d8aa67] transition-[width] duration-500"
                style={{ width: `${((active + 1) / components.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
