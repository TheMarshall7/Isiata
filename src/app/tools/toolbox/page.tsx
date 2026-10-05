'use client'

import { useState, useCallback, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import {
  ALL_NOTES,
  NOTE_FRACTIONS,
  REVERB_SPACES,
  bpmFromTapIntervals,
  clampBpm,
  convertTiming,
  delayRow,
  getScaleChords,
  getScaleNotes,
  reverbTimes,
  type ConvertUnit,
} from '@/lib/tools/producer-toolbox-math'

// ─── Sub-Components ──────────────────────────────────────────────────

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 800)
  }
  return (
    <button
      onClick={copy}
      className="toolbox-copy"
      title="Click to copy"
    >
      {copied ? 'Copied' : value}
    </button>
  )
}

// ─── BPM Control ─────────────────────────────────────────────────────

function BPMControl({ bpm, setBpm }: { bpm: number; setBpm: (v: number) => void }) {
  const tapTimesRef = useRef<number[]>([])

  const handleTap = useCallback(() => {
    const now = Date.now()
    tapTimesRef.current.push(now)
    if (tapTimesRef.current.length > 4) tapTimesRef.current.shift()
    if (tapTimesRef.current.length >= 2) {
      const times = tapTimesRef.current
      const intervals: number[] = []
      for (let i = 1; i < times.length; i++) intervals.push(times[i] - times[i - 1])
      const next = bpmFromTapIntervals(intervals)
      if (next != null) setBpm(next)
    }
  }, [setBpm])

  const reset = () => {
    tapTimesRef.current = []
    setBpm(140)
  }

  return (
    <div className="toolbox-panel">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">BPM Control</h3>
      <div className="text-3xl text-zinc-200 text-center font-light tracking-wide mb-4">
        {bpm} <span className="text-sm text-zinc-500">BPM</span>
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={handleTap} className="toolbox-btn-primary">
          Tap
        </button>
        <button onClick={reset} className="toolbox-btn-secondary">
          Reset
        </button>
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(clampBpm(parseInt(e.target.value, 10) || 140))}
          className="toolbox-input text-sm px-3 py-2 w-20 text-center"
        />
      </div>
    </div>
  )
}

// ─── Key & Scale ─────────────────────────────────────────────────────

function KeyScale() {
  const [root, setRoot] = useState('C')
  const [isMajor, setIsMajor] = useState(true)

  const notes = getScaleNotes(root, isMajor)
  const chords = getScaleChords(notes, isMajor)

  return (
    <div className="toolbox-panel">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Key & Scale</h3>
      <div className="flex gap-2 mb-6">
        <select
          value={isMajor ? 'major' : 'minor'}
          onChange={(e) => setIsMajor(e.target.value === 'major')}
          className="toolbox-input text-sm px-3 py-2"
        >
          <option value="major">Major</option>
          <option value="minor">Minor</option>
        </select>
        <select
          value={root}
          onChange={(e) => setRoot(e.target.value)}
          className="toolbox-input text-sm px-3 py-2"
        >
          {ALL_NOTES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="toolbox-label mb-3">Diatonic Notes</h4>
          <p className="text-sm text-zinc-300 tracking-wide">{notes.join(' \u2013 ')}</p>
        </div>
        <div>
          <h4 className="toolbox-label mb-3">Scale Chords</h4>
          <div className="flex flex-wrap gap-1.5">
            {chords.map((c) => (
              <span key={c.numeral} className="toolbox-chip">
                <span className="text-zinc-400 font-medium mr-1">{c.numeral}</span>
                <span className="text-zinc-400">{c.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Converter ───────────────────────────────────────────────────────

function Converter({ bpm }: { bpm: number }) {
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState<ConvertUnit>('hz')

  const v = parseFloat(value) || 0
  const results = convertTiming(v, unit, bpm)

  return (
    <div className="toolbox-panel">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Hz / ms / Beats Converter</h3>
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="toolbox-input text-sm px-3 py-2 flex-1"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as ConvertUnit)}
          className="toolbox-input text-sm px-3 py-2"
        >
          <option value="hz">Hz</option>
          <option value="ms">ms</option>
          <option value="beats">Beats</option>
          <option value="seconds">Seconds</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(results).map(([key, val]) => (
          <div key={key} className="toolbox-stat">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">{key}</span>
            <CopyValue value={val.toFixed(2)} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Reverb Calculator ───────────────────────────────────────────────

function ReverbCalculator({ bpm }: { bpm: number }) {
  return (
    <div className="toolbox-panel">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Reverb Time Calculator</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="toolbox-table-head">
              <th className="text-left py-2 pr-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Space</th>
              <th className="text-right py-2 px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">Pre-Delay</th>
              <th className="text-right py-2 px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">Decay</th>
              <th className="text-right py-2 pl-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {REVERB_SPACES.map((space) => {
              const { total, preDelay, decay } = reverbTimes(space.beats, bpm)
              return (
                <tr key={space.key} className="border-b border-white/5">
                  <td className="py-2.5 pr-4">
                    <span className="text-zinc-300">{space.label}</span>
                    <span className="text-zinc-600 text-xs ml-1.5">({space.sub})</span>
                  </td>
                  <td className="text-right py-2.5 px-3"><CopyValue value={preDelay.toFixed(1)} /></td>
                  <td className="text-right py-2.5 px-3"><CopyValue value={decay.toFixed(1)} /></td>
                  <td className="text-right py-2.5 pl-3"><CopyValue value={total.toFixed(1)} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Delay Time Table ────────────────────────────────────────────────

function DelayTable({ bpm }: { bpm: number }) {
  return (
    <div className="toolbox-panel">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Delay Time Table</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="toolbox-table-head">
              <th className="text-left py-2 pr-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Note</th>
              <th className="text-right py-2 px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">Straight (ms)</th>
              <th className="text-right py-2 px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">Dotted</th>
              <th className="text-right py-2 px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">Triplet</th>
              <th className="text-right py-2 pl-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">Hz</th>
            </tr>
          </thead>
          <tbody>
            {NOTE_FRACTIONS.map((note) => {
              const { ms, dotted, triplet, hz } = delayRow(note.value, bpm)
              return (
                <tr key={note.label} className="border-b border-white/5">
                  <td className="py-2.5 pr-4 text-zinc-300 font-medium">{note.label}</td>
                  <td className="text-right py-2.5 px-3"><CopyValue value={ms.toFixed(1)} /></td>
                  <td className="text-right py-2.5 px-3"><CopyValue value={dotted.toFixed(1)} /></td>
                  <td className="text-right py-2.5 px-3"><CopyValue value={triplet.toFixed(1)} /></td>
                  <td className="text-right py-2.5 pl-3"><CopyValue value={hz.toFixed(2)} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────

export default function ToolboxPage() {
  const [bpm, setBpm] = useState(140)

  return (
    <>
      {/* Back Link */}
      <Container bordered className="pt-28 pb-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Tools
        </Link>
      </Container>

      {/* Page Header */}
      <Container bordered className="py-16 md:py-20">
        <Section reveal>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Tools
              </p>
              <PageTitle
                text="Producer Toolbox"
                className="mb-6 font-display text-5xl uppercase leading-[0.9] tracking-normal text-gold md:mb-8 md:text-6xl lg:text-7xl"
                speed={80}
              />
              <p className="mb-5 text-xl leading-relaxed text-gold md:text-2xl">
                BPM, keys, delay, and reverb. Built for the session.
              </p>
              <p className="text-base leading-relaxed text-zinc-500 md:text-lg">
                Tap tempo, find scales, convert units, and copy any value straight into your DAW.
              </p>
            </div>

            <div
              data-reveal
              style={{ '--d': 1 } as CSSProperties}
              className="relative mx-auto w-full max-w-[min(100%,24rem)] lg:max-w-[26rem] lg:justify-self-end"
            >
              <img
                src="/brand/producer-toolbox.png"
                alt="Producer Toolbox"
                className="h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(216,170,103,0.18)]"
              />
            </div>
          </div>
        </Section>
      </Container>

      {/* Tools */}
      <Container bordered className="py-12">
        <Section reveal>
          <div className="space-y-4">
            {/* Top Row: BPM + Key & Scale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BPMControl bpm={bpm} setBpm={setBpm} />
              <KeyScale />
            </div>

            {/* Converter */}
            <Converter bpm={bpm} />

            {/* Bottom Row: Reverb + Delay */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ReverbCalculator bpm={bpm} />
              <DelayTable bpm={bpm} />
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}
