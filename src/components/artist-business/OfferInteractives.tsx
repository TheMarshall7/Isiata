'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  ARTIST_BUSINESS_INVESTMENT,
  ARTIST_BUSINESS_PAID_IN_FULL,
  ARTISTS_BOOKING_HREF,
  ARTISTS_COPY,
  ASSET_STREAMS,
  FIT_QUESTIONS,
  HERO_FACTS,
  HERO_FLOW,
  PLATFORMS,
} from '@/lib/artists/page-content'
import { updateSelection, useSelection } from './selection-store'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

/** ISIATA palette, used so sections are not all one chroma. */
export const PALETTE = {
  void: '#070608',
  indigo: '#1B2232',
  celestial: '#2D516C',
  celestialBright: '#4F86AE',
  ivory: '#BFAC97',
  orange: '#A44429',
  orangeBright: '#D0663F',
  antique: '#9B6B3B',
  chrome: '#6C6B6E',
  red: '#971E1A',
  redBright: '#C9372C',
  gold: '#d8aa67',
}

function ArrowIcon() {
  return <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
}

function SegmentToggle<T extends string | boolean>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex whitespace-nowrap rounded-full border border-white/10 bg-black/30 p-0.5 text-[10px] uppercase tracking-widest">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${
            value === opt.value ? 'bg-[#d8aa67]/20 text-[#f0dfc8]' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Hero: assets flowing into one connected business                          */
/* ------------------------------------------------------------------------ */

export function HeroFlow() {
  return (
    <div className="abs-panel abs-panel-indigo relative overflow-hidden p-5 md:p-8">
      <div className="relative">
        {/* Track */}
        <div className="absolute left-[10%] right-[10%] top-6 md:top-7 h-px bg-white/10 overflow-hidden">
          <div className="abs-beam absolute inset-y-0 w-1/3" />
        </div>
        <ol className="relative grid grid-cols-5 gap-2">
          {HERO_FLOW.map((step, i) => {
            const last = i === HERO_FLOW.length - 1
            return (
              <li key={step.id} className="flex flex-col items-center text-center">
                <span
                  className={`abs-flow-node relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border bg-[#070608] ${
                    last ? 'border-[#d8aa67] text-[#f0c681] shadow-[0_0_30px_rgba(216,170,103,0.35)]' : 'border-white/15 text-[#BFAC97]'
                  }`}
                  style={{ '--i': i } as CSSProperties}
                >
                  <iconify-icon icon={step.icon} width="20" height="20" />
                </span>
                <span
                  className={`mt-3 text-[10px] md:text-xs uppercase tracking-widest leading-tight ${
                    last ? 'text-[#f0dfc8]' : 'text-zinc-500'
                  }`}
                >
                  <span className="sm:hidden">{step.short}</span>
                  <span className="hidden sm:inline">{step.label}</span>
                </span>
              </li>
            )
          })}
        </ol>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {HERO_FACTS.map((fact, i) => (
          <span
            key={fact}
            className={`rounded-full border px-3 py-1.5 text-[11px] tracking-wide ${
              i === 1
                ? 'border-[#d8aa67]/50 bg-[#d8aa67]/10 text-[#f0dfc8]'
                : 'border-[#2D516C]/70 bg-[#2D516C]/15 text-[#c9d6e0]'
            }`}
          >
            {fact}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 01. Platform outage: you don't own your audience                          */
/* ------------------------------------------------------------------------ */

export function PlatformRisk() {
  const copy = ARTISTS_COPY.problem.ownership
  const [down, setDown] = useState<Set<string>>(() => new Set())
  const toggle = (id: string) =>
    setDown((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const reach = PLATFORMS.reduce((sum, p) => sum + (down.has(p.id) ? 0 : p.share), 0)
  const anyDown = down.size > 0

  return (
    <div className="abs-panel overflow-hidden p-6 md:p-8">
      <div className="flex items-start gap-3 mb-2">
        <iconify-icon icon="solar:danger-triangle-linear" width="20" height="20" className="mt-1 shrink-0 text-[#C9372C]" />
        <h3 className="text-xl md:text-2xl font-light text-white leading-snug">{copy.title}</h3>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed mb-6 md:pl-8">{copy.body}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {PLATFORMS.map((p) => {
          const off = down.has(p.id)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              aria-pressed={off}
              className={`group flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-all duration-300 ${
                off
                  ? 'border-[#C9372C]/70 bg-[#971E1A]/20'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <iconify-icon
                  icon={p.icon}
                  width="18"
                  height="18"
                  className={off ? 'text-[#C9372C]' : 'text-zinc-300'}
                />
                <span className={`text-xs ${off ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{p.name}</span>
              </span>
              <span className={`text-[9px] uppercase tracking-widest ${off ? 'text-[#ff8a7a]' : 'text-emerald-400/80'}`}>
                {off ? 'Down' : 'Live'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Reach bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/5">
        {PLATFORMS.map((p) => (
          <div
            key={p.id}
            className="h-full transition-all duration-700 ease-out"
            style={{
              width: `${p.share}%`,
              background: down.has(p.id)
                ? 'repeating-linear-gradient(135deg, rgba(151,30,26,0.6) 0 4px, rgba(151,30,26,0.15) 4px 8px)'
                : PALETTE.ivory,
              opacity: down.has(p.id) ? 1 : 0.35 + p.share / 100,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4" aria-live="polite">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">Fans you can still reach</p>
          <p className={`text-4xl font-light tabular-nums transition-colors ${reach < 50 ? 'text-[#ff8a7a]' : 'text-white'}`}>
            {reach}%
          </p>
        </div>
        <p className="max-w-xs text-xs text-zinc-500 text-right">
          {!anyDown
            ? copy.hint
            : reach === 0
              ? 'Every platform is gone. Without a list you own, you can reach no one.'
              : 'One algorithm change or ban, and that audience is gone overnight.'}
        </p>
      </div>

      <div
        className={`mt-6 flex items-center gap-4 rounded-lg border p-4 transition-all duration-700 ${
          anyDown ? 'border-[#4F86AE]/60 bg-[#2D516C]/25' : 'border-white/5 bg-white/[0.02]'
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#4F86AE]/60 text-[#9cc3df]">
          <iconify-icon icon="solar:lock-keyhole-linear" width="18" height="18" />
        </span>
        <div className="flex-1">
          <p className="text-sm text-white">Your email list and storefront</p>
          <p className="text-xs text-zinc-400">Owned by you. Unaffected by any platform going down.</p>
        </div>
        <span className="text-xl font-light text-[#9cc3df] tabular-nums">100%</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 01. Income illustration: time-for-money vs. a connected business          */
/* ------------------------------------------------------------------------ */

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const WORK = [6.2, 7, 2.2, 6.5, 1.2, 7.4, 3, 6.1, 0.8, 5.6, 7.1, 2.4]
const SYSTEM = [0.6, 1.2, 1.9, 2.6, 3.2, 3.8, 4.3, 4.8, 5.2, 5.6, 6, 6.3]

function series(values: number[], base: number[] | null, w: number, h: number, max: number) {
  const x = (i: number) => (i / (values.length - 1)) * w
  const y = (v: number) => h - (v / max) * h
  const pts = values.map((v, i) => [x(i), y(v + (base?.[i] ?? 0))] as const)
  const line = pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ')
  const floor = (base ?? values.map(() => 0)).map((v, i) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`).reverse()
  return { line, area: `${line} ${floor.join(' ')} Z`, pts }
}

export function IncomeModes() {
  const [mode, setMode] = useState<'time' | 'system'>('time')
  const W = 640
  const H = 220
  const MAX = 14
  const withSystem = mode === 'system'
  const floor = series(SYSTEM, null, W, H, MAX)
  const work = series(WORK, withSystem ? SYSTEM : null, W, H, MAX)
  const totals = WORK.map((v, i) => v + (withSystem ? SYSTEM[i] : 0))
  const lowest = Math.min(...totals)
  const highest = Math.max(...totals)
  const lowIndex = totals.indexOf(lowest)
  const lowPoint = work.pts[lowIndex]

  return (
    <div className="abs-panel overflow-hidden p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-xs uppercase tracking-widest text-zinc-500">Monthly income, illustrated</p>
        <SegmentToggle
          options={[
            { value: 'time', label: 'Tied to your time' },
            { value: 'system', label: 'With a business behind it' },
          ]}
          value={mode}
          onChange={setMode}
        />
      </div>

      <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full h-auto overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="abs-work-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={PALETTE.orangeBright} stopOpacity="0.45" />
            <stop offset="100%" stopColor={PALETTE.orange} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="abs-floor-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={PALETTE.celestialBright} stopOpacity="0.85" />
            <stop offset="100%" stopColor={PALETTE.celestial} stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={0} x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 6" />
        ))}
        <g style={{ opacity: withSystem ? 1 : 0, transition: 'opacity 700ms' }}>
          <path d={floor.area} fill="url(#abs-floor-fill)" />
          <path d={floor.line} fill="none" stroke="#9cc3df" strokeWidth={1.5} />
        </g>
        <path d={work.area} fill="url(#abs-work-fill)" style={{ transition: 'd 700ms ease' }} />
        <path
          d={work.line}
          fill="none"
          stroke={PALETTE.orangeBright}
          strokeWidth={2}
          strokeLinejoin="round"
          style={{ transition: 'd 700ms ease' }}
        />
        {/* Lowest month marker */}
        <g style={{ transition: 'transform 700ms ease', transform: `translate(${lowPoint[0]}px, ${lowPoint[1]}px)` }}>
          <circle r={5} fill={withSystem ? '#9cc3df' : PALETTE.redBright} />
          <circle r={11} fill="none" stroke={withSystem ? '#9cc3df' : PALETTE.redBright} strokeOpacity={0.5} />
        </g>
        <line x1={0} x2={W} y1={H} y2={H} stroke="rgba(255,255,255,0.2)" />
        {MONTHS.map((m, i) => (
          <text key={i} x={(i / 11) * W} y={H + 20} textAnchor="middle" fontSize="11" fill="#71717a">
            {m}
          </text>
        ))}
      </svg>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-white/10 bg-black/30 p-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Worst month vs. best</p>
          <p
            className={`text-3xl font-light tabular-nums transition-colors duration-700 ${
              withSystem ? 'text-[#9cc3df]' : 'text-[#ff8a7a]'
            }`}
          >
            {Math.round((lowest / highest) * 100)}%
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">When you stop working</p>
          <p className="text-sm text-zinc-200 leading-snug">
            {withSystem ? 'Products, email and storefront keep selling.' : 'Income stops with you.'}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 rounded" style={{ background: PALETTE.orangeBright }} />
          Gigs, sessions, clients, lessons
        </span>
        <span className={`flex items-center gap-2 transition-opacity duration-700 ${withSystem ? 'opacity-100' : 'opacity-30'}`}>
          <span className="h-2.5 w-5 rounded-sm" style={{ background: PALETTE.celestialBright }} />
          Products, storefront, email
        </span>
      </div>
      <p className="mt-3 text-[11px] text-zinc-600">Illustration only. Not based on client data.</p>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 02. Asset checklist (selections travel with the application)              */
/* ------------------------------------------------------------------------ */

const GROUP_STYLE: Record<string, { on: string; dot: string; text: string }> = {
  Artist: { on: 'border-[#d8aa67]/60 bg-[#d8aa67]/[0.08]', dot: 'bg-[#d8aa67]', text: 'text-[#f0c681]' },
  Producer: { on: 'border-[#4F86AE]/70 bg-[#2D516C]/20', dot: 'bg-[#4F86AE]', text: 'text-[#9cc3df]' },
  Business: { on: 'border-[#D0663F]/60 bg-[#A44429]/15', dot: 'bg-[#D0663F]', text: 'text-[#f0a184]' },
}

export function AssetSelector() {
  const { assets } = useSelection()
  const selected = new Set(assets)
  const toggle = (id: string) =>
    updateSelection((prev) => ({
      assets: prev.assets.includes(id) ? prev.assets.filter((a) => a !== id) : [...prev.assets, id],
    }))
  const groups = ['Artist', 'Producer', 'Business'] as const
  const count = ASSET_STREAMS.filter((a) => selected.has(a.id)).length
  const total = ASSET_STREAMS.length
  const chosen = ASSET_STREAMS.filter((a) => selected.has(a.id))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 items-start">
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group}>
            <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
              <span className={`h-1.5 w-1.5 rounded-full ${GROUP_STYLE[group].dot}`} />
              {group}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ASSET_STREAMS.filter((a) => a.group === group).map((item) => {
                const on = selected.has(item.id)
                const style = GROUP_STYLE[group]
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-pressed={on}
                    className={`flex items-start gap-3 rounded-lg border p-3.5 text-left transition-all duration-300 ${
                      on ? style.on : 'border-white/10 bg-surface-raised/30 hover:border-white/25'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        on ? `border-transparent ${style.dot} text-black` : 'border-white/25'
                      }`}
                    >
                      {on && <iconify-icon icon="solar:check-read-linear" width="14" height="14" />}
                    </span>
                    <span>
                      <span className="block text-sm text-white">{item.asset}</span>
                      <span
                        className={`mt-1 flex items-center gap-1.5 text-xs transition-colors ${on ? style.text : 'text-zinc-600'}`}
                      >
                        <iconify-icon icon="solar:arrow-right-linear" width="12" height="12" />
                        {item.stream}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="abs-panel abs-panel-glow p-6 md:p-8 lg:sticky lg:top-28" aria-live="polite">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Revenue streams you could package</p>
        <p className="text-6xl md:text-7xl font-light text-white tabular-nums">
          {count}
          <span className="text-2xl text-zinc-600"> / {total}</span>
        </p>
        <div className="mt-6 flex gap-1">
          {ASSET_STREAMS.map((item) => (
            <span
              key={item.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                selected.has(item.id) ? GROUP_STYLE[item.group].dot : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        {chosen.length > 0 && (
          <ul className="mt-6 space-y-1.5">
            {chosen.map((a) => (
              <li key={a.id} className="flex items-center gap-2 text-xs text-zinc-300">
                <span className={`h-1 w-1 rounded-full ${GROUP_STYLE[a.group].dot}`} />
                {a.stream}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-sm text-zinc-400 leading-relaxed">
          {count === 0
            ? 'Select what you already have.'
            : count < 3
              ? 'A solid starting point. We help you package these into your first offers.'
              : 'You already have the raw material. The missing piece is the system that connects it.'}
        </p>
        <p className="mt-4 text-[11px] text-zinc-600">Your selections are included when you apply.</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 07. Timeline: 30-day build + 30-day optimization                          */
/* ------------------------------------------------------------------------ */

const STAGE_DAYS = [
  [1, 7],
  [8, 14],
  [15, 21],
  [22, 30],
  [31, 60],
] as const

export function LaunchTimeline() {
  const stages = ARTISTS_COPY.implementation.weeks
  const [active, setActive] = useState(0)
  const progress = (STAGE_DAYS[active][1] / 60) * 100

  return (
    <div>
      <div className="relative mb-10">
        <div className="flex gap-1">
          {[
            { fill: Math.min(progress, 50) * 2, color: `linear-gradient(90deg, ${PALETTE.antique}, ${PALETTE.gold})` },
            { fill: Math.max(progress - 50, 0) * 2, color: `linear-gradient(90deg, ${PALETTE.celestial}, #9cc3df)` },
          ].map((half, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full transition-[width] duration-700 ease-out"
                style={{ width: `${half.fill}%`, background: half.color }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 text-[10px] font-mono uppercase tracking-widest">
          <span className="text-[#f0c681]">Build · Days 1–30 · Launch</span>
          <span className="text-right text-[#9cc3df]">Optimize · Days 31–60</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 items-stretch gap-3">
        {stages.map((stage, i) => {
          const on = i === active
          const optimize = i === 4
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={on}
              className={`min-w-0 rounded-lg border p-4 lg:p-5 text-left transition-all duration-500 ${
                on
                  ? optimize
                    ? 'border-[#4F86AE]/70 bg-[#2D516C]/20 md:-translate-y-1'
                    : 'border-[#d8aa67]/70 bg-[#d8aa67]/[0.07] md:-translate-y-1'
                  : 'border-white/10 bg-surface-raised/30 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">{stage.label}</p>
                {!optimize && (
                  <p className="font-mono text-[10px] text-zinc-600">
                    {STAGE_DAYS[i][0]}–{STAGE_DAYS[i][1]}
                  </p>
                )}
              </div>
              <h3
                className={`text-sm lg:text-[13px] xl:text-sm font-display uppercase tracking-normal mb-2 min-h-[3.5rem] [overflow-wrap:anywhere] transition-colors ${
                  on ? (optimize ? 'text-[#c9d6e0]' : 'text-gold') : 'text-zinc-400'
                }`}
              >
                {stage.title}
              </h3>
              <p className={`text-sm leading-relaxed transition-colors ${on ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {stage.body}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Investment card: hover any line item to see what it includes              */
/* ------------------------------------------------------------------------ */

type IncludedItem = { id: string; title: string; detail: string; bonus?: boolean }

export function InvestmentCard({ ctaLabel }: { ctaLabel: string }) {
  const [full, setFull] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const inv = ARTISTS_COPY.investment
  const items: IncludedItem[] = [
    ...ARTISTS_COPY.build.components.map((c) => ({
      id: c.id,
      title: c.title,
      detail: [c.tagline, c.body, 'examples' in c && c.examples ? `Examples: ${c.examples.join(' ').replace(/\.\s/g, ', ').replace(/\.$/, '')}.` : '']
        .filter(Boolean)
        .join(' '),
    })),
    ...ARTISTS_COPY.additional.items.map((b) => ({ id: b.id, title: b.title, detail: b.body, bonus: true })),
  ]

  return (
    <div className="abs-panel abs-frame overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Price side */}
        <div className="relative p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-b from-[#1B2232]/60 to-transparent">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-widest text-[#d8aa67] mb-6">{inv.name}</p>
            <SegmentToggle
              options={[
                { value: false, label: 'Two payments' },
                { value: true, label: 'Pay in full' },
              ]}
              value={full}
              onChange={setFull}
            />
            <div className="mt-6 min-h-[110px]" aria-live="polite">
              {full ? (
                <>
                  <p className="text-5xl md:text-6xl font-light text-white tabular-nums">
                    {usd.format(ARTIST_BUSINESS_PAID_IN_FULL)}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    <span className="mr-2 line-through text-zinc-600">{usd.format(ARTIST_BUSINESS_INVESTMENT)}</span>
                    <span className="rounded-full bg-[#A44429]/30 px-2 py-0.5 text-[11px] text-[#f0a184]">Save $1,000</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-5xl md:text-6xl font-light text-white tabular-nums">
                    <span className="text-3xl text-zinc-500 mr-1">2 ×</span>
                    {usd.format(ARTIST_BUSINESS_INVESTMENT / 2)}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">{usd.format(ARTIST_BUSINESS_INVESTMENT)} USD total</p>
                </>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 text-center">
              {[
                { v: '10', l: 'Components' },
                { v: '3', l: 'Bonuses' },
                { v: '60', l: 'Days with us' },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-white/10 bg-black/30 py-3">
                  <p className="text-2xl font-light text-white">{s.v}</p>
                  <p className="text-[9px] uppercase tracking-widest text-zinc-500">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Capacity</p>
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((slot) => (
                  <span key={slot} className="flex h-8 w-8 rotate-45 items-center justify-center border border-[#d8aa67]/60">
                    <span className="-rotate-45 font-mono text-[10px] text-[#f0c681]">{slot}</span>
                  </span>
                ))}
                <span className="ml-2 text-sm text-zinc-400">builds per quarter</span>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">{inv.capacity}</p>
            </div>

            <div className="mt-8">
              <Link href={ARTISTS_BOOKING_HREF} className="btn-primary cta-sheen w-full">
                {ctaLabel}
                <ArrowIcon />
              </Link>
              <p className="mt-3 text-center text-[11px] text-zinc-600">{inv.secured}</p>
            </div>
          </div>
        </div>

        {/* Included list */}
        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Everything included</p>
            <p className="text-[11px] text-zinc-600 hidden md:block">Hover any item for details</p>
            <p className="text-[11px] text-zinc-600 md:hidden">Tap any item for details</p>
          </div>
          <ul className="divide-y divide-white/5" onMouseLeave={() => setOpen(null)}>
            {items.map((item, i) => {
              const isOpen = open === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setOpen(item.id)}
                    onFocus={() => setOpen(item.id)}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className={`w-full rounded-md px-3 py-3 text-left transition-colors duration-300 ${
                      isOpen ? 'bg-white/[0.04]' : ''
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 font-mono text-[10px] text-zinc-600">
                        {item.bonus ? '+' : String(i + 1).padStart(2, '0')}
                      </span>
                      <iconify-icon
                        icon={item.bonus ? 'solar:gift-linear' : 'solar:check-circle-linear'}
                        width="16"
                        height="16"
                        className={`shrink-0 transition-colors ${
                          isOpen ? 'text-[#f0c681]' : item.bonus ? 'text-[#D0663F]' : 'text-[#d8aa67]/70'
                        }`}
                      />
                      <span className={`flex-1 text-sm transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
                        {item.title}
                        {item.bonus && (
                          <span className="ml-2 rounded-full border border-[#D0663F]/40 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-[#f0a184]">
                            Bonus
                          </span>
                        )}
                      </span>
                      <iconify-icon
                        icon="solar:alt-arrow-down-linear"
                        width="14"
                        height="14"
                        className={`text-zinc-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                    <span
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pl-[3.75rem] pr-6 pt-2 text-xs leading-relaxed text-zinc-400">
                          {item.detail}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Fit check: one question at a time                                         */
/* ------------------------------------------------------------------------ */

export function FitCheck({ ctaLabel }: { ctaLabel: string }) {
  const { fit } = useSelection()
  const [step, setStep] = useState(0)
  const total = FIT_QUESTIONS.length

  // Resume where the visitor left off (answers persist for the session).
  const answeredCount = FIT_QUESTIONS.filter((q) => q.id in fit).length
  const resumed = useRef(false)
  useEffect(() => {
    // Saved answers arrive after hydration; jump ahead once, then let clicks drive the step.
    if (resumed.current || answeredCount === 0) return
    resumed.current = true
    setStep(answeredCount)
  }, [answeredCount])
  const done = step >= total
  const yes = FIT_QUESTIONS.filter((q) => fit[q.id] === true).length

  const answer = (id: string, value: boolean) => {
    resumed.current = true
    updateSelection((prev) => ({ fit: { ...prev.fit, [id]: value } }))
    setTimeout(() => setStep((s) => s + 1), 220)
  }

  const reset = () => {
    resumed.current = true
    updateSelection({ fit: {} })
    setStep(0)
  }

  const ring = 2 * Math.PI * 42

  return (
    <div className="abs-panel abs-panel-indigo overflow-hidden p-6 md:p-8 min-h-[380px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-widest text-zinc-400">Quick fit check</p>
        <div className="flex gap-1.5">
          {FIT_QUESTIONS.map((q, i) => (
            <span
              key={q.id}
              className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${
                fit[q.id] === true
                  ? 'bg-[#d8aa67]'
                  : fit[q.id] === false
                    ? 'bg-white/40'
                    : i === step
                      ? 'bg-white/20'
                      : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {!done ? (
        <div key={step} className="flex-1 flex flex-col animate-fade-in-up">
          <p className="font-mono text-xs text-zinc-500 mb-3">
            {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h3 className="text-2xl md:text-3xl font-light text-white leading-snug mb-3">{FIT_QUESTIONS[step].question}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-8">{FIT_QUESTIONS[step].detail}</p>
          <div className="mt-auto grid grid-cols-2 gap-3">
            {[
              { value: true, label: 'Yes', icon: 'solar:check-circle-linear' },
              { value: false, label: 'Not yet', icon: 'solar:close-circle-linear' },
            ].map((opt) => {
              const on = fit[FIT_QUESTIONS[step].id] === opt.value
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => answer(FIT_QUESTIONS[step].id, opt.value)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 ${
                    opt.value
                      ? on
                        ? 'border-[#d8aa67] bg-[#d8aa67]/20 text-[#f0dfc8]'
                        : 'border-[#d8aa67]/40 text-[#f0dfc8] hover:bg-[#d8aa67]/10'
                      : on
                        ? 'border-white/50 bg-white/10 text-white'
                        : 'border-white/15 text-zinc-400 hover:border-white/30'
                  }`}
                >
                  <iconify-icon icon={opt.icon} width="18" height="18" />
                  {opt.label}
                </button>
              )
            })}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 self-start text-[11px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300"
            >
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center text-center animate-fade-in-up" aria-live="polite">
          <div className="relative h-28 w-28 mb-6">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={yes === total ? PALETTE.gold : yes >= 2 ? PALETTE.celestialBright : PALETTE.chrome}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ring}
                strokeDashoffset={ring * (1 - yes / total)}
                style={{ transition: 'stroke-dashoffset 900ms ease' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-light text-white">
              {yes}/{total}
            </span>
          </div>
          {yes === total ? (
            <>
              <p className="text-xl text-white mb-2">You look like a strong fit.</p>
              <p className="text-sm text-zinc-400 mb-6">The next step is an Artist Business Audit.</p>
              <Link href={ARTISTS_BOOKING_HREF} className="btn-primary cta-sheen">
                {ctaLabel}
                <ArrowIcon />
              </Link>
            </>
          ) : yes >= 2 ? (
            <>
              <p className="text-xl text-white mb-2">You may be close.</p>
              <p className="text-sm text-zinc-400 mb-6">
                Apply anyway and we&apos;ll tell you honestly whether now is the right time.
              </p>
              <Link href={ARTISTS_BOOKING_HREF} className="btn-secondary">
                Apply anyway
                <ArrowIcon />
              </Link>
            </>
          ) : (
            <p className="text-sm text-zinc-400 max-w-sm">
              This build is probably early for you right now. It works best for artists who already have traction
              and assets to package.
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            className="mt-6 text-[11px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300"
          >
            Retake
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Sticky CTA bar                                                            */
/* ------------------------------------------------------------------------ */

export function StickyAuditBar({ label }: { label: string }) {
  const [pastHero, setPastHero] = useState(false)
  const [atClose, setAtClose] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('abs-hero')
    const close = document.getElementById('abs-closing')
    const observers: IntersectionObserver[] = []
    if (hero) {
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 })
      o.observe(hero)
      observers.push(o)
    }
    if (close) {
      const o = new IntersectionObserver(([e]) => setAtClose(e.isIntersecting), { threshold: 0 })
      o.observe(close)
      observers.push(o)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const visible = pastHero && !atClose

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="border-t border-[#d8aa67]/20 bg-[#070608]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="min-w-0">
            <p className="truncate text-sm text-white">The Artist Business System</p>
            <p className="text-[11px] text-zinc-500">Live in 30 days · 3 builds per quarter</p>
          </div>
          <Link
            href={ARTISTS_BOOKING_HREF}
            tabIndex={visible ? 0 : -1}
            className="btn-primary shrink-0 min-h-10 px-5 text-[10px]"
          >
            {label}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}
