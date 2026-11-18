'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ARTIST_BUSINESS_INVESTMENT,
  ARTIST_BUSINESS_PAID_IN_FULL,
  ARTISTS_BOOKING_HREF,
  ARTISTS_COPY,
  ASSET_STREAMS,
  FIT_QUESTIONS,
} from '@/lib/artists/page-content'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function ArrowIcon() {
  return <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
}

/* ------------------------------------------------------------------------ */
/* 01. Income illustration: time-for-money vs. a connected business          */
/* ------------------------------------------------------------------------ */

const WORK = [6.2, 7, 2.2, 6.5, 1.2, 7.4, 3, 6.1, 0.8, 5.6, 7.1, 2.4]
const SYSTEM = [0.4, 0.9, 1.5, 2.1, 2.7, 3.2, 3.7, 4.1, 4.5, 4.9, 5.2, 5.5]

function toPath(values: number[], base: number[] | null, w: number, h: number, max: number) {
  const x = (i: number) => (i / (values.length - 1)) * w
  const y = (v: number) => h - (v / max) * h
  const top = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v + (base?.[i] ?? 0)).toFixed(1)}`)
  const bottom = (base ?? values.map(() => 0))
    .map((v, i) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .reverse()
  return { line: top.join(' '), area: `${top.join(' ')} ${bottom.join(' ')} Z` }
}

export function IncomeModes() {
  const [mode, setMode] = useState<'time' | 'system'>('time')
  const W = 600
  const H = 180
  const MAX = 14
  const system = toPath(SYSTEM, null, W, H, MAX)
  const work = toPath(WORK, mode === 'system' ? SYSTEM : null, W, H, MAX)

  return (
    <div className="abs-panel p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-xs uppercase tracking-widest text-zinc-500">Monthly income, illustrated</p>
        <div className="inline-flex rounded-full border border-white/10 p-0.5 text-[10px] uppercase tracking-widest">
          {(
            [
              { id: 'time', label: 'Tied to your time' },
              { id: 'system', label: 'With a business behind it' },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMode(opt.id)}
              aria-pressed={mode === opt.id}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                mode === opt.id ? 'bg-[#d8aa67]/20 text-[#f0dfc8]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" aria-hidden>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={0} x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,0.05)" />
        ))}
        <path
          d={system.area}
          fill="rgba(216,170,103,0.35)"
          style={{ opacity: mode === 'system' ? 1 : 0, transition: 'opacity 700ms' }}
        />
        <path d={work.area} fill="rgba(255,255,255,0.08)" style={{ transition: 'd 700ms ease' }} />
        <path
          d={work.line}
          fill="none"
          stroke={mode === 'system' ? '#f0c681' : 'rgba(255,255,255,0.6)'}
          strokeWidth={1.5}
          style={{ transition: 'd 700ms ease, stroke 700ms' }}
        />
        <line x1={0} x2={W} y1={H} y2={H} stroke="rgba(255,255,255,0.15)" />
      </svg>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/50" />
          <p className="text-zinc-400">Gigs, sessions, clients and lessons. It peaks when you work and drops when you stop.</p>
        </div>
        <div className={`flex gap-3 transition-opacity duration-700 ${mode === 'system' ? 'opacity-100' : 'opacity-30'}`}>
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#d8aa67]" />
          <p className="text-zinc-400">Products, storefront and email. A floor that keeps building in quiet months.</p>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-zinc-600">Illustration only. Not based on client data.</p>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 02. Asset checklist                                                       */
/* ------------------------------------------------------------------------ */

export function AssetSelector() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(['music', 'beats', 'audience']))
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const count = selected.size
  const total = ASSET_STREAMS.length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ASSET_STREAMS.map((item) => {
          const on = selected.has(item.id)
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              aria-pressed={on}
              className={`group flex items-start gap-3 rounded-lg border p-4 text-left transition-all duration-300 ${
                on
                  ? 'border-[#d8aa67]/60 bg-[#d8aa67]/[0.07]'
                  : 'border-white/10 bg-surface-raised/30 hover:border-white/25'
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                  on ? 'border-[#d8aa67] bg-[#d8aa67] text-black' : 'border-white/25'
                }`}
              >
                {on && <iconify-icon icon="solar:check-read-linear" width="14" height="14" />}
              </span>
              <span>
                <span className="block text-sm text-white">{item.asset}</span>
                <span
                  className={`mt-1 flex items-center gap-1.5 text-xs transition-colors ${
                    on ? 'text-[#f0c681]' : 'text-zinc-600'
                  }`}
                >
                  <iconify-icon icon="solar:arrow-right-linear" width="12" height="12" />
                  {item.stream}
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="abs-panel abs-panel-glow p-6 md:p-8 flex flex-col justify-center" aria-live="polite">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Revenue streams you could package</p>
        <p className="text-6xl md:text-7xl font-light text-white tabular-nums">
          {count}
          <span className="text-2xl text-zinc-600"> / {total}</span>
        </p>
        <div className="mt-6 flex gap-1.5">
          {ASSET_STREAMS.map((item) => (
            <span
              key={item.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                selected.has(item.id) ? 'bg-[#d8aa67]' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-400 leading-relaxed">
          {count === 0
            ? 'Select what you already have.'
            : count < 3
              ? 'A solid starting point. We help you package these into your first offers.'
              : 'You already have the raw material. The missing piece is the system that connects it.'}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 07. 30-day timeline                                                       */
/* ------------------------------------------------------------------------ */

const WEEK_DAYS = [
  [1, 7],
  [8, 14],
  [15, 21],
  [22, 30],
] as const

export function LaunchTimeline() {
  const weeks = ARTISTS_COPY.implementation.weeks
  const [active, setActive] = useState(0)
  const progress = (WEEK_DAYS[active][1] / 30) * 100

  return (
    <div>
      <div className="relative mb-8">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d8aa67]/50 to-[#f0c681] transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-mono text-zinc-600">
          <span>Day 1</span>
          <span className={active === 3 ? 'text-[#f0c681]' : ''}>Day 30 · Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {weeks.map((week, i) => {
          const on = i === active
          const done = i < active
          return (
            <button
              key={week.id}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={on}
              className={`rounded-lg border p-5 text-left transition-all duration-500 ${
                on
                  ? 'border-[#d8aa67]/70 bg-[#d8aa67]/[0.07] md:-translate-y-1'
                  : 'border-white/10 bg-surface-raised/30 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">{week.label}</p>
                <p className="font-mono text-[10px] text-zinc-600">
                  Days {WEEK_DAYS[i][0]}–{WEEK_DAYS[i][1]}
                </p>
              </div>
              <h3
                className={`text-lg font-display uppercase tracking-normal mb-2 transition-colors ${
                  on || done ? 'text-gold' : 'text-zinc-400'
                }`}
              >
                {week.title}
              </h3>
              <p className={`text-sm leading-relaxed transition-colors ${on ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {week.body}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 09. Investment card with payment toggle                                   */
/* ------------------------------------------------------------------------ */

export function InvestmentCard({ ctaLabel }: { ctaLabel: string }) {
  const [full, setFull] = useState(false)
  const inv = ARTISTS_COPY.investment
  const included = [
    ...ARTISTS_COPY.build.components.map((c) => c.title),
    ...ARTISTS_COPY.additional.items.map((b) => `Bonus: ${b.title}`),
  ]

  return (
    <div className="abs-panel abs-panel-glow abs-frame p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{inv.name}</p>
          <div className="inline-flex whitespace-nowrap rounded-full border border-white/10 p-0.5 text-[10px] uppercase tracking-widest mb-6">
            {[
              { full: false, label: 'Two payments' },
              { full: true, label: 'Pay in full' },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setFull(opt.full)}
                aria-pressed={full === opt.full}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  full === opt.full ? 'bg-[#d8aa67]/20 text-[#f0dfc8]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div aria-live="polite">
            {full ? (
              <>
                <p className="text-5xl md:text-6xl font-light text-white tabular-nums">
                  {usd.format(ARTIST_BUSINESS_PAID_IN_FULL)}
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Paid in full, saving $1,000.{' '}
                  <span className="line-through text-zinc-600">{usd.format(ARTIST_BUSINESS_INVESTMENT)}</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-5xl md:text-6xl font-light text-white tabular-nums">
                  2 × {usd.format(ARTIST_BUSINESS_INVESTMENT / 2)}
                </p>
                <p className="mt-2 text-sm text-zinc-400">{usd.format(ARTIST_BUSINESS_INVESTMENT)} USD total</p>
              </>
            )}
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Implementation capacity</p>
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((slot) => (
                <span key={slot} className="flex h-9 w-9 rotate-45 items-center justify-center border border-[#d8aa67]/60">
                  <span className="-rotate-45 font-mono text-[11px] text-[#f0c681]">{slot}</span>
                </span>
              ))}
              <span className="ml-2 text-sm text-zinc-400">builds per quarter</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-md">{inv.capacity}</p>
            <p className="mt-2 text-xs text-zinc-500">{inv.secured}</p>
          </div>

          <div className="mt-10">
            <Link href={ARTISTS_BOOKING_HREF} className="btn-primary cta-sheen">
              {ctaLabel}
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Everything included</p>
          <ul className="space-y-2.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                <iconify-icon
                  icon="solar:check-circle-linear"
                  width="16"
                  height="16"
                  className="mt-0.5 shrink-0 text-[#d8aa67]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* 10. Fit check                                                             */
/* ------------------------------------------------------------------------ */

export function FitCheck({ ctaLabel }: { ctaLabel: string }) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const answered = Object.keys(answers).length
  const yes = Object.values(answers).filter(Boolean).length
  const complete = answered === FIT_QUESTIONS.length

  return (
    <div className="abs-panel p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-widest text-zinc-500">Quick fit check</p>
        <p className="font-mono text-xs text-zinc-600">
          {answered} / {FIT_QUESTIONS.length}
        </p>
      </div>
      <ol className="space-y-4">
        {FIT_QUESTIONS.map((q, i) => (
          <li key={q.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 border-b border-white/5 pb-4 last:border-0">
            <p className="flex-1 text-sm text-zinc-300 leading-relaxed">
              <span className="font-mono text-zinc-600 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {q.question}
            </p>
            <div className="flex gap-2 shrink-0">
              {[true, false].map((value) => {
                const on = answers[q.id] === value
                return (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
                    aria-pressed={on}
                    className={`min-w-16 rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-widest transition-colors ${
                      on
                        ? value
                          ? 'border-[#d8aa67] bg-[#d8aa67]/15 text-[#f0dfc8]'
                          : 'border-white/40 bg-white/5 text-white'
                        : 'border-white/10 text-zinc-500 hover:border-white/25'
                    }`}
                  >
                    {value ? 'Yes' : 'No'}
                  </button>
                )
              })}
            </div>
          </li>
        ))}
      </ol>
      <div
        aria-live="polite"
        className={`mt-6 rounded-lg border p-5 transition-all duration-500 ${
          complete
            ? yes === FIT_QUESTIONS.length
              ? 'border-[#d8aa67]/50 bg-[#d8aa67]/[0.07]'
              : 'border-white/10 bg-white/[0.02]'
            : 'border-dashed border-white/10'
        }`}
      >
        {!complete ? (
          <p className="text-sm text-zinc-500">Answer all four to see where you stand.</p>
        ) : yes === FIT_QUESTIONS.length ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <p className="text-sm text-white">
              You look like a strong fit. The next step is an Artist Business Audit.
            </p>
            <Link href={ARTISTS_BOOKING_HREF} className="btn-primary shrink-0">
              {ctaLabel}
              <ArrowIcon />
            </Link>
          </div>
        ) : yes >= 2 ? (
          <p className="text-sm text-zinc-300">
            You may be close. Reach out anyway and we&apos;ll tell you honestly whether now is the right time.
          </p>
        ) : (
          <p className="text-sm text-zinc-300">
            This build is probably early for you right now. It works best for artists who already have traction
            and assets to package.
          </p>
        )}
      </div>
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
      <div className="border-t border-[#d8aa67]/20 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="min-w-0">
            <p className="truncate text-sm text-white">The Artist Business System</p>
            <p className="text-[11px] text-zinc-500">Launch-ready in 30 days · 3 builds per quarter</p>
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
