'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { updateSelection } from './selection-store'
import {
  ARTIST_BUSINESS_INVESTMENT,
  ARTIST_BUSINESS_PAID_IN_FULL,
  PRICE_PRESETS,
} from '@/lib/artists/page-content'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const num = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

type SliderProps = {
  label: string
  hint: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (value: number) => void
}

function Slider({ label, hint, value, min, max, step, display, onChange }: SliderProps) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <label htmlFor={id} className="text-xs uppercase tracking-widest text-zinc-400">
          {label}
        </label>
        <span className="font-mono text-lg text-white tabular-nums">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="abs-range w-full"
        style={{ ['--fill' as string]: `${fill}%` }}
      />
      <p className="mt-1.5 text-[11px] text-zinc-600">{hint}</p>
    </div>
  )
}

const PRESET_TONES = [
  { on: 'border-[#d8aa67] bg-[#d8aa67]/15 text-[#f0dfc8]' },
  { on: 'border-[#4F86AE] bg-[#2D516C]/30 text-[#c9d6e0]' },
  { on: 'border-[#D0663F] bg-[#A44429]/25 text-[#f6c3ae]' },
]

/** Order value on a log scale ($5 to $2,500) so both a $10 album and a label package are easy to dial in. */
const PRICE_MIN = 5
const PRICE_MAX = 2500
const sliderToPrice = (v: number) => {
  const raw = PRICE_MIN * Math.pow(PRICE_MAX / PRICE_MIN, v / 1000)
  return raw < 100 ? Math.round(raw) : raw < 1000 ? Math.round(raw / 5) * 5 : Math.round(raw / 25) * 25
}
const priceToSlider = (p: number) => Math.round((Math.log(p / PRICE_MIN) / Math.log(PRICE_MAX / PRICE_MIN)) * 1000)

/** Visitors per month on a log-ish scale so the slider is usable from 250 to 100k. */
const VISITOR_STEPS = [250, 500, 1000, 2000, 3500, 5000, 7500, 10000, 15000, 25000, 40000, 60000, 100000]

export function RevenueCalculator() {
  const [visitorIndex, setVisitorIndex] = useState(3)
  const [optIn, setOptIn] = useState(8)
  const [conversion, setConversion] = useState(2)
  const [price, setPrice] = useState(62)
  const [paidInFull, setPaidInFull] = useState(false)

  const visitors = VISITOR_STEPS[visitorIndex]
  const investment = paidInFull ? ARTIST_BUSINESS_PAID_IN_FULL : ARTIST_BUSINESS_INVESTMENT

  const r = useMemo(() => {
    const subscribers = visitors * (optIn / 100)
    const buyers = visitors * (conversion / 100)
    const monthly = buyers * price
    const yearly = monthly * 12
    const paybackMonths = monthly > 0 ? investment / monthly : Infinity
    const roi = (yearly - investment) / investment
    const cumulative = Array.from({ length: 12 }, (_, i) => monthly * (i + 1))
    return { subscribers, buyers, monthly, yearly, paybackMonths, roi, cumulative }
  }, [visitors, optIn, conversion, price, investment])

  // Share the visitor's numbers with the application form.
  useEffect(() => {
    const t = setTimeout(() => {
      updateSelection({
        calculator: {
          visitors,
          optInRate: optIn,
          conversionRate: conversion,
          averageOrderValue: price,
          paidInFull,
          monthlyRevenue: Math.round(r.monthly),
          yearlyRevenue: Math.round(r.yearly),
        },
      })
    }, 400)
    return () => clearTimeout(t)
  }, [visitors, optIn, conversion, price, paidInFull, r.monthly, r.yearly])

  const chartMax = Math.max(investment * 1.15, r.cumulative[11])
  const investY = 100 - (investment / chartMax) * 100

  const paybackLabel =
    r.paybackMonths === Infinity
      ? 'n/a'
      : r.paybackMonths < 1
        ? `${Math.max(1, Math.round(r.paybackMonths * 30))} days`
        : r.paybackMonths > 24
          ? '24+ months'
          : `${r.paybackMonths.toFixed(1)} months`

  // Funnel widths on a square-root scale so small stages stay visible.
  const funnel = [
    { label: 'Visitors', value: visitors, width: 100, color: 'from-[#BFAC97]/60 to-[#BFAC97]/10' },
    {
      label: 'Email subscribers',
      value: r.subscribers,
      width: Math.max(8, Math.sqrt(optIn / 100) * 100),
      color: 'from-[#4F86AE] to-[#2D516C]/30',
    },
    {
      label: 'Customers',
      value: r.buyers,
      width: Math.max(4, Math.sqrt(conversion / 100) * 100),
      color: 'from-[#f0c681] to-[#9B6B3B]/40',
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6">
      {/* Inputs */}
      <div className="abs-panel p-6 md:p-8 space-y-8">
        <Slider
          label="Monthly visitors"
          hint="People reaching your site from socials, streaming links and search."
          value={visitorIndex}
          min={0}
          max={VISITOR_STEPS.length - 1}
          step={1}
          display={num.format(visitors)}
          onChange={setVisitorIndex}
        />
        <Slider
          label="Email opt-in rate"
          hint="Visitors who join your list through a lead magnet or signup."
          value={optIn}
          min={1}
          max={30}
          step={0.5}
          display={`${optIn}%`}
          onChange={setOptIn}
        />
        <Slider
          label="Purchase conversion rate"
          hint="Visitors who buy something in a given month."
          value={conversion}
          min={0.25}
          max={10}
          step={0.25}
          display={`${conversion}%`}
          onChange={setConversion}
        />
        <div>
          <Slider
            label="Average order value"
            hint="What a typical customer spends with you."
            value={priceToSlider(price)}
            min={0}
            max={1000}
            step={1}
            display={usd.format(price)}
            onChange={(v) => setPrice(sliderToPrice(v))}
          />
          <div className="mt-4 space-y-3">
            {PRICE_PRESETS.map((group, gi) => (
              <div key={group.group}>
                <p className="mb-1.5 text-[10px] uppercase tracking-widest text-zinc-600">{group.group}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((preset) => {
                    const on = price === preset.price
                    const tone = PRESET_TONES[gi]
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setPrice(preset.price)}
                        aria-pressed={on}
                        className={`rounded-full border px-3 py-1.5 text-[11px] tracking-wide transition-colors duration-300 ${
                          on ? tone.on : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-zinc-200'
                        }`}
                      >
                        {preset.label} · {usd.format(preset.price)}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="abs-panel abs-panel-glow p-6 md:p-8 flex flex-col" aria-live="polite">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Monthly revenue</p>
            <p className="text-3xl md:text-5xl font-light text-white tabular-nums">{usd.format(r.monthly)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">12-month revenue</p>
            <p className="text-3xl md:text-5xl font-light text-[#f0c681] tabular-nums">{usd.format(r.yearly)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Investment recovered in</p>
            <p className="text-xl md:text-2xl text-white tabular-nums">{paybackLabel}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">12-month return</p>
            <p
              className={`text-xl md:text-2xl tabular-nums ${r.roi >= 0 ? 'text-emerald-300' : 'text-zinc-400'}`}
            >
              {r.roi >= 0 ? '+' : ''}
              {Math.round(r.roi * 100)}%
              <span className="ml-2 text-sm text-zinc-500">({(r.yearly / investment).toFixed(1)}x)</span>
            </p>
          </div>
        </div>

        {/* Funnel */}
        <div className="mt-8 space-y-2.5">
          {funnel.map((stage) => (
            <div key={stage.label} className="flex items-center gap-3">
              <div className="h-8 flex-1">
                <div
                  className={`h-full rounded-sm bg-gradient-to-r ${stage.color} transition-[width] duration-700 ease-out`}
                  style={{ width: `${stage.width}%` }}
                />
              </div>
              <div className="w-24 sm:w-44 shrink-0 text-right leading-tight">
                <span className="font-mono text-sm text-white tabular-nums">{num.format(stage.value)}</span>
                <span className="block sm:inline sm:ml-2 text-[11px] text-zinc-500">{stage.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cumulative revenue vs investment */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Cumulative revenue, first 12 months</p>
            <div className="inline-flex whitespace-nowrap rounded-full border border-white/10 p-0.5 text-[10px] uppercase tracking-widest">
              {[
                { full: false, label: '2 payments' },
                { full: true, label: 'Paid in full' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setPaidInFull(opt.full)}
                  aria-pressed={paidInFull === opt.full}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    paidInFull === opt.full ? 'bg-[#d8aa67]/20 text-[#f0dfc8]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-40">
            <div
              className="absolute left-0 right-0 border-t border-dashed border-white/40 z-10 pointer-events-none"
              style={{ top: `${investY}%` }}
            >
              <span className="absolute -top-5 left-0 text-[10px] uppercase tracking-widest text-zinc-400">
                Investment {usd.format(investment)}
              </span>
            </div>
            <div className="absolute inset-0 flex items-end gap-1.5">
              {r.cumulative.map((value, i) => {
                const recovered = value >= investment
                return (
                  <div key={i} className="flex-1 h-full flex flex-col justify-end">
                    <div
                      title={`Month ${i + 1}: ${usd.format(value)}`}
                      className={`rounded-t-sm transition-all duration-700 ease-out ${
                        recovered ? 'bg-gradient-to-t from-[#9B6B3B] to-[#f0c681]' : 'bg-gradient-to-t from-[#1B2232] to-[#2D516C]'
                      }`}
                      style={{ height: `${Math.max(1, (value / chartMax) * 100)}%` }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-2 flex gap-1.5 text-[10px] text-zinc-600">
            {r.cumulative.map((_, i) => (
              <span key={i} className="flex-1 text-center">
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
          An illustration based on the numbers you enter, not a forecast or a promise of results. Revenue
          depends on your audience, offers, market conditions and participation.
        </p>
      </div>
    </div>
  )
}
