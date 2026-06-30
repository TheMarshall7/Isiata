'use client'

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'

// ─── Music Theory Data ───────────────────────────────────────────────

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11]
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10]

const FLAT_MAP: Record<string, string> = {
  'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
}

// Minor keys that traditionally use flats in their key signature
const FLAT_MINOR_KEYS = ['D', 'G', 'C', 'F', 'A#', 'D#', 'G#'] as const

const NOTE_FRACTIONS = [
  { label: '1/1', value: 1 },
  { label: '1/2', value: 1 / 2 },
  { label: '1/4', value: 1 / 4 },
  { label: '1/8', value: 1 / 8 },
  { label: '1/16', value: 1 / 16 },
  { label: '1/32', value: 1 / 32 },
  { label: '1/64', value: 1 / 64 },
  { label: '1/128', value: 1 / 128 },
]

const REVERB_SPACES = [
  { key: 'stadium', label: 'Stadium', sub: '4 bars', beats: 16 },
  { key: 'hall', label: 'Hall', sub: '2 bars', beats: 8 },
  { key: 'large-room', label: 'Large Room', sub: '1 bar', beats: 4 },
  { key: 'small-room', label: 'Small Room', sub: '1/2 note', beats: 2 },
  { key: 'tight', label: 'Tight Ambience', sub: '1/4 note', beats: 1 },
]

// ─── Helpers ─────────────────────────────────────────────────────────

function getScaleNotes(root: string, isMajor: boolean) {
  const rootIndex = ALL_NOTES.indexOf(root)
  const intervals = isMajor ? MAJOR_INTERVALS : MINOR_INTERVALS
  // Only use flats for minor keys that traditionally have flat key signatures
  const useFlats = !isMajor && FLAT_MINOR_KEYS.includes(root as typeof FLAT_MINOR_KEYS[number])

  return intervals.map((interval, i) => {
    const noteIndex = (rootIndex + interval) % 12
    const note = ALL_NOTES[noteIndex]
    if (useFlats && i > 0 && FLAT_MAP[note]) return FLAT_MAP[note]
    return note
  })
}

function getScaleChords(notes: string[], isMajor: boolean) {
  const romanMajor = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u00B0']
  const romanMinor = ['i', 'ii\u00B0', '\u266DIII', 'iv', 'V', '\u266DVI', '\u266DVII']
  const qualMajor = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim']
  const qualMinor = ['min', 'dim', 'maj', 'min', 'maj', 'maj', 'maj']

  const numerals = isMajor ? romanMajor : romanMinor
  const qualities = isMajor ? qualMajor : qualMinor

  return notes.map((note, i) => ({
    numeral: numerals[i],
    name: `${note}${qualities[i]}`,
  }))
}

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
      let total = 0
      for (let i = 1; i < times.length; i++) total += times[i] - times[i - 1]
      const avg = total / (times.length - 1)
      setBpm(Math.round(60000 / avg))
    }
  }, [setBpm])

  const reset = () => { tapTimesRef.current = []; setBpm(140) }

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
          onChange={(e) => setBpm(Math.max(20, Math.min(999, parseInt(e.target.value) || 140)))}
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
          {ALL_NOTES.map((n) => <option key={n} value={n}>{n}</option>)}
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
  const [unit, setUnit] = useState('hz')

  const v = parseFloat(value) || 0
  const results = { hz: 0, ms: 0, beats: 0, seconds: 0 }
  if (v > 0) {
    switch (unit) {
      case 'hz':
        results.hz = v; results.ms = 1000 / v; results.beats = (1 / v) * (bpm / 60); results.seconds = 1 / v; break
      case 'ms':
        results.hz = 1000 / v; results.ms = v; results.beats = v * bpm / 60000; results.seconds = v / 1000; break
      case 'beats':
        results.hz = bpm / (60 * v); results.ms = v * 60000 / bpm; results.beats = v; results.seconds = v * 60 / bpm; break
      case 'seconds':
        results.hz = 1 / v; results.ms = v * 1000; results.beats = v * bpm / 60; results.seconds = v; break
    }
  }

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
          onChange={(e) => setUnit(e.target.value)}
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
  const msPerBeat = 60000 / bpm

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
              const total = space.beats * msPerBeat
              const preDelay = total * 0.015
              const decay = total - preDelay
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
              // Convert whole-note fraction to beats in 4/4 time, then to ms
              const beats = note.value * 4
              const ms = beats * (60000 / bpm)
              const dotted = ms * 1.5
              const triplet = ms * (2 / 3)
              const hz = 1000 / ms
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
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              Tools
            </p>
            <PageTitle
              text="Producer Toolbox"
              className="text-5xl md:text-6xl lg:text-7xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-6 md:mb-8"
              speed={80}
            />
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-5">
              BPM, keys, delay, and reverb. Built for the session.
            </p>
            <p className="text-base md:text-lg text-zinc-500 leading-relaxed">
              Tap tempo, find scales, convert units, and copy any value straight into your DAW.
            </p>
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
