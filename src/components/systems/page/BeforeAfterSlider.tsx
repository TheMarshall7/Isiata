'use client'

import { useCallback, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { BEFORE_AFTER } from '@/lib/systems/page-content'
import { cn } from '@/lib/utils'

const BEFORE_OFFSETS = [0, 14, 6, 22, 10, 18, 4]

const TOOL_ROUTES = [
  { from: 'DM · Email · Text', to: 'Leads' },
  { from: 'Calendar · Stripe', to: 'Bookings · Sales' },
  { from: 'Spreadsheet · memory', to: 'CRM · Follow-up' },
]

function BeforePanel() {
  return (
    <div className="flex h-full min-h-[360px] flex-col p-5 sm:p-6 md:p-8">
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600">{BEFORE_AFTER.before.label}</p>
        <p className="mt-1 text-[11px] text-zinc-500">Scattered across apps. You connect every dot.</p>
      </div>

      <div className="relative flex-1">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-white/10"
          viewBox="0 0 280 260"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M40 24 L120 52 L200 80 L60 108 L180 136 L100 164 L220 192" fill="none" stroke="currentColor" strokeDasharray="4 6" strokeWidth="1" />
          <path d="M200 80 L240 108 L80 192 L160 220" fill="none" stroke="currentColor" strokeDasharray="3 5" strokeWidth="1" />
        </svg>

        <div className="relative space-y-1.5">
          {BEFORE_AFTER.before.nodes.map((node, index) => (
            <div
              key={node}
              className="max-w-[11.5rem] rounded-md border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-400 sm:text-xs"
              style={{ marginLeft: `${BEFORE_OFFSETS[index % BEFORE_OFFSETS.length]}px` }}
            >
              {node}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-600">
        {BEFORE_AFTER.before.nodes.length} places · nothing talks to each other
      </p>
    </div>
  )
}

function AfterPanel() {
  return (
    <div className="flex h-full min-h-[360px] flex-col p-5 sm:p-6 md:p-8">
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600">{BEFORE_AFTER.after.label}</p>
        <p className="mt-1 text-[11px] text-zinc-400">Same tools. One connected system — nothing gets deleted.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <div className="flex flex-wrap justify-center gap-1.5 max-w-xs">
          {BEFORE_AFTER.before.nodes.slice(0, 5).map((node) => (
            <span
              key={node}
              className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-500"
            >
              {node}
            </span>
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-widest text-zinc-500">still there · now routed through</p>

        <div className="rounded-lg border border-white/25 bg-white/[0.04] px-5 py-3">
          <p className="text-sm font-oswald uppercase tracking-widest text-white">System</p>
        </div>

        <span className="h-5 w-px bg-white/20" aria-hidden />

        <div className="flex flex-wrap justify-center gap-2">
          {BEFORE_AFTER.after.nodes.map((node) => (
            <span
              key={node}
              className="rounded-md border border-white/25 bg-white/[0.06] px-3 py-1.5 text-[10px] uppercase tracking-widest text-white sm:text-[11px]"
            >
              {node}
            </span>
          ))}
        </div>

        <div className="mt-2 w-full max-w-sm space-y-1.5 border-t border-white/10 pt-4 text-left">
          {TOOL_ROUTES.map((route) => (
            <p key={route.from} className="text-[10px] text-zinc-500">
              <span className="text-zinc-400">{route.from}</span>
              <span className="mx-2 text-zinc-600">→</span>
              <span className="text-zinc-300">{route.to}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BeforeAfterSlider() {
  const [value, setValue] = useState(58)
  const trackRef = useRef<HTMLDivElement>(null)

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setValue(Math.min(100, Math.max(0, next)))
  }, [])

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Scattered to connected
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        Before / After
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        Drag the divider. The tools do not disappear. They stop living in seven different places and get routed through one system.
      </p>

      <div
        ref={trackRef}
        className="relative min-h-[360px] md:min-h-[420px] rounded-lg border border-white/10 overflow-hidden bg-black select-none"
      >
        <div className="absolute inset-0">
          <BeforePanel />
        </div>

        <div
          className="absolute inset-0 bg-background"
          style={{ clipPath: `inset(0 0 0 ${value}%)` }}
        >
          <AfterPanel />
        </div>

        <div
          className="pointer-events-none absolute top-0 bottom-0 z-10 w-px bg-white"
          style={{ left: `${value}%` }}
          aria-hidden
        >
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
              <iconify-icon icon="solar:transfer-horizontal-linear" width="14" height="14" />
            </div>
            <span
              className={cn(
                'hidden rounded border border-white/15 bg-black/80 px-2 py-0.5 text-[9px] uppercase tracking-widest text-zinc-400 sm:block',
                value > 15 && value < 85 ? 'opacity-100' : 'opacity-0'
              )}
            >
              connected
            </span>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label="Before and after comparison"
          onChange={(event) => setValue(Number(event.target.value))}
          onPointerDown={(event) => setFromClientX(event.clientX)}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </Section>
  )
}
