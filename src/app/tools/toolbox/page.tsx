'use client'

import { useState, useCallback, useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import {
  ALL_NOTES,
  MAJOR_INTERVALS,
  MINOR_INTERVALS,
  NOTE_FRACTIONS,
  REVERB_SPACES,
  bpmFromTapIntervals,
  clampBpm,
  convertTiming,
  delayRow,
  getScaleChords,
  getScaleNotes,
  midiToFreq,
  reverbTimes,
  type ConvertUnit,
} from '@/lib/tools/producer-toolbox-math'
import { AnimatedNumber, CopyValue, PanelTitle, Segmented, copyText, playTone } from '@/components/tools/toolbox/shared'
import { FileSizeCalc, LoudnessTargets, NoteFrequency, PitchConverter } from '@/components/tools/toolbox/NewTools'
import {
  CamelotMatcher,
  ChordBuilder,
  ChromaticTuner,
  FrequencyGuide,
  GainTools,
  Metronome,
  SongLength,
} from '@/components/tools/toolbox/MoreTools'

const TOOL_GROUPS = [
  { id: 'tempo', label: 'Tempo & Time', count: 6 },
  { id: 'pitch', label: 'Pitch & Harmony', count: 6 },
  { id: 'mix', label: 'Mix & Master', count: 4 },
]

function GroupHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="toolbox-group-head">
      <h2 className="font-display text-lg uppercase tracking-[0.08em] text-gold md:text-xl">{title}</h2>
      <p className="text-sm text-zinc-500">{sub}</p>
    </div>
  )
}

const DEFAULT_BPM = 140
const TAP_RESET_MS = 2500

function isTyping(el: EventTarget | null) {
  const t = el as HTMLElement | null
  return !!t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
}

// ─── BPM Control ─────────────────────────────────────────────────────

function BPMControl({ bpm, setBpm }: { bpm: number; setBpm: (v: number) => void }) {
  const tapTimesRef = useRef<number[]>([])
  const [tapCount, setTapCount] = useState(0)
  const [draft, setDraft] = useState(String(bpm))
  const inputRef = useRef<HTMLInputElement>(null)

  // Mirror outside tempo changes (tap, slider, keys) into the box unless someone is typing in it.
  useEffect(() => {
    if (document.activeElement !== inputRef.current) setDraft(String(bpm))
  }, [bpm])

  const handleTap = useCallback(() => {
    const now = Date.now()
    const times = tapTimesRef.current
    if (times.length && now - times[times.length - 1] > TAP_RESET_MS) times.length = 0
    times.push(now)
    if (times.length > 6) times.shift()
    setTapCount((n) => n + 1)
    if (times.length >= 2) {
      const intervals: number[] = []
      for (let i = 1; i < times.length; i++) intervals.push(times[i] - times[i - 1])
      const next = bpmFromTapIntervals(intervals)
      if (next != null) setBpm(next)
    }
  }, [setBpm])

  const reset = useCallback(() => {
    tapTimesRef.current = []
    setBpm(DEFAULT_BPM)
  }, [setBpm])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      // +/− nudge the tempo (Shift for ±10). Arrow keys are left alone so the page still scrolls.
      switch (e.key.toLowerCase()) {
        case 't':
          handleTap()
          break
        case 'r':
          reset()
          break
        case '=':
          setBpm(clampBpm(bpm + 1))
          break
        case '+':
          setBpm(clampBpm(bpm + 10))
          break
        case '-':
          setBpm(clampBpm(bpm - 1))
          break
        case '_':
          setBpm(clampBpm(bpm - 10))
          break
        case 'h':
          setBpm(clampBpm(bpm / 2))
          break
        case 'd':
          setBpm(clampBpm(bpm * 2))
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [bpm, handleTap, reset, setBpm])

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Shared by every tool">BPM Control</PanelTitle>
      <div className="mb-1 flex items-center justify-center gap-4">
        <span className="toolbox-pulse" style={{ animationDuration: `${60 / bpm}s` }} aria-hidden="true" />
        <div className="toolbox-bpm" key={tapCount % 2}>
          <AnimatedNumber value={bpm} />
          <span className="toolbox-unit">BPM</span>
        </div>
      </div>
      <p className="mb-4 text-center text-xs tabular-nums text-zinc-500">
        <AnimatedNumber value={60000 / bpm} decimals={1} /> ms per beat
      </p>
      <input
        type="range"
        min={40}
        max={240}
        value={Math.min(240, Math.max(40, bpm))}
        onChange={(e) => setBpm(clampBpm(parseInt(e.target.value, 10)))}
        className="toolbox-range mb-4"
        aria-label="Tempo slider"
      />
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={handleTap} className="toolbox-btn-primary toolbox-tap">
          Tap
        </button>
        <button type="button" onClick={() => setBpm(clampBpm(bpm / 2))} className="toolbox-btn-secondary" aria-label="Half time">
          ½×
        </button>
        <button type="button" onClick={() => setBpm(clampBpm(bpm * 2))} className="toolbox-btn-secondary" aria-label="Double time">
          2×
        </button>
        <button type="button" onClick={reset} className="toolbox-btn-secondary">
          Reset
        </button>
        <div className="toolbox-stepper">
          <input
            type="number"
            inputMode="numeric"
            min={20}
            max={999}
            value={draft}
            onChange={(e) => {
              // Let people type freely ("9" on the way to "90"); only commit values in range.
              setDraft(e.target.value)
              const n = parseInt(e.target.value, 10)
              if (n >= 20 && n <= 999) setBpm(n)
            }}
            onBlur={() => setDraft(String(bpm))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const n = parseInt(draft, 10)
                setBpm(clampBpm(Number.isFinite(n) ? n : bpm))
                ;(e.target as HTMLInputElement).blur()
              } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault()
                const next = clampBpm(bpm + (e.key === 'ArrowUp' ? 1 : -1) * (e.shiftKey ? 10 : 1))
                setBpm(next)
                setDraft(String(next))
              }
            }}
            ref={inputRef}
            className="toolbox-input px-3 py-2 text-center text-sm"
            aria-label="BPM"
          />
          <div className="toolbox-stepper-btns">
            <button type="button" tabIndex={-1} aria-label="Increase BPM" onClick={() => setBpm(clampBpm(bpm + 1))}>
              <iconify-icon icon="solar:alt-arrow-up-linear" width="12" height="12" />
            </button>
            <button type="button" tabIndex={-1} aria-label="Decrease BPM" onClick={() => setBpm(clampBpm(bpm - 1))}>
              <iconify-icon icon="solar:alt-arrow-down-linear" width="12" height="12" />
            </button>
          </div>
        </div>
      </div>
      <p className="toolbox-hint mt-4 hidden text-center md:block">
        <kbd className="toolbox-kbd">T</kbd> tap · <kbd className="toolbox-kbd">+</kbd>
        <kbd className="toolbox-kbd">−</kbd> ±1, Shift ±10 · <kbd className="toolbox-kbd">H</kbd>
        <kbd className="toolbox-kbd">D</kbd> half / double · <kbd className="toolbox-kbd">R</kbd> reset
      </p>
    </div>
  )
}

// ─── Key & Scale ─────────────────────────────────────────────────────

function KeyScale() {
  const [root, setRoot] = useState('C')
  const [mode, setMode] = useState<'major' | 'minor'>('major')
  const [copiedChord, setCopiedChord] = useState<string | null>(null)
  const isMajor = mode === 'major'

  const notes = getScaleNotes(root, isMajor)
  const chords = getScaleChords(notes, isMajor)

  const playScale = () => {
    const base = 60 + ALL_NOTES.indexOf(root as (typeof ALL_NOTES)[number])
    const iv = isMajor ? MAJOR_INTERVALS : MINOR_INTERVALS
    ;[...iv, 12].forEach((step, i) => {
      window.setTimeout(() => playTone(midiToFreq(base + step), 0.5), i * 260)
    })
  }

  const copyChord = async (name: string) => {
    if (await copyText(name)) {
      setCopiedChord(name)
      window.setTimeout(() => setCopiedChord((c) => (c === name ? null : c)), 1000)
    }
  }

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Click a chord to copy">Key &amp; Scale</PanelTitle>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <Segmented
          label="Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'major', label: 'Major' },
            { value: 'minor', label: 'Minor' },
          ]}
        />
        <button type="button" className="toolbox-btn-secondary" onClick={playScale}>
          Play scale
        </button>
      </div>
      <div className="mb-6 grid grid-cols-6 gap-1.5">
        {ALL_NOTES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRoot(n)}
            aria-pressed={n === root}
            className={`toolbox-pill ${n === root ? 'is-active' : ''}`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <div>
          <h4 className="toolbox-label mb-3">Diatonic Notes</h4>
          <p className="text-sm tracking-wide text-zinc-200">
            {notes.map((n, i) => (
              <span key={`${root}-${mode}-${i}`} className="toolbox-note" style={{ animationDelay: `${i * 35}ms` }}>
                {n}
                {i < notes.length - 1 && <span className="mx-1.5 text-zinc-600">–</span>}
              </span>
            ))}
          </p>
        </div>
        <div>
          <h4 className="toolbox-label mb-3">Scale Chords</h4>
          <div className="flex flex-wrap gap-1.5">
            {chords.map((c) => (
              <button
                key={c.numeral}
                type="button"
                onClick={() => copyChord(c.name)}
                className={`toolbox-chip toolbox-chip-btn ${copiedChord === c.name ? 'is-copied' : ''}`}
                title="Click to copy"
              >
                {copiedChord === c.name ? (
                  'Copied'
                ) : (
                  <>
                    <span className="mr-1 font-medium text-gold">{c.numeral}</span>
                    <span>{c.name}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Converter ───────────────────────────────────────────────────────

const CONVERT_META: Record<ConvertUnit, { label: string; decimals: number }> = {
  hz: { label: 'Hz', decimals: 2 },
  ms: { label: 'ms', decimals: 2 },
  beats: { label: 'Beats', decimals: 3 },
  seconds: { label: 'Seconds', decimals: 3 },
}
const CONVERT_UNITS = Object.keys(CONVERT_META) as ConvertUnit[]

function Converter({ bpm }: { bpm: number }) {
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState<ConvertUnit>('hz')

  const v = parseFloat(value) || 0
  const results = convertTiming(v, unit, bpm)

  return (
    <div className="toolbox-panel">
      <PanelTitle hint={`At ${bpm} BPM`}>Hz / ms / Beats Converter</PanelTitle>
      <div className="mb-6 flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="toolbox-input min-w-0 flex-1 px-3 py-2 text-sm"
          aria-label="Value"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as ConvertUnit)}
          className="toolbox-input px-3 py-2 text-sm"
          aria-label="Unit"
        >
          {CONVERT_UNITS.map((u) => (
            <option key={u} value={u}>
              {CONVERT_META[u].label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CONVERT_UNITS.map((key) => (
          <div key={key} className="toolbox-stat">
            <span className="toolbox-label mb-1 block">{CONVERT_META[key].label}</span>
            <CopyValue value={results[key]} decimals={CONVERT_META[key].decimals} />
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
      <PanelTitle hint="Values in ms">Reverb Time Calculator</PanelTitle>
      <div className="toolbox-scroll">
        <table className="toolbox-table w-full text-sm">
          <thead>
            <tr className="toolbox-table-head">
              <th className="py-2 pr-3 text-left">Space</th>
              <th className="px-2 py-2 text-right">Pre-Delay</th>
              <th className="px-2 py-2 text-right">Decay</th>
              <th className="py-2 pl-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {REVERB_SPACES.map((space) => {
              const { total, preDelay, decay } = reverbTimes(space.beats, bpm)
              return (
                <tr key={space.key}>
                  <td className="py-2.5 pr-3">
                    <span className="text-zinc-200">{space.label}</span>
                    <span className="ml-1.5 text-xs text-zinc-500">({space.sub})</span>
                  </td>
                  <td className="px-2 py-1 text-right"><CopyValue value={preDelay} /></td>
                  <td className="px-2 py-1 text-right"><CopyValue value={decay} /></td>
                  <td className="py-1 pl-2 text-right"><CopyValue value={total} /></td>
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
      <PanelTitle hint="Values in ms">Delay Time Table</PanelTitle>
      <div className="toolbox-scroll">
        <table className="toolbox-table w-full text-sm">
          <thead>
            <tr className="toolbox-table-head">
              <th className="py-2 pr-3 text-left">Note</th>
              <th className="px-2 py-2 text-right">Straight</th>
              <th className="px-2 py-2 text-right">Dotted</th>
              <th className="px-2 py-2 text-right">Triplet</th>
              <th className="py-2 pl-2 text-right">Hz</th>
            </tr>
          </thead>
          <tbody>
            {NOTE_FRACTIONS.map((note) => {
              const { ms, dotted, triplet, hz } = delayRow(note.value, bpm)
              return (
                <tr key={note.label}>
                  <td className="py-2.5 pr-3 font-medium text-zinc-200">{note.label}</td>
                  <td className="px-2 py-1 text-right"><CopyValue value={ms} /></td>
                  <td className="px-2 py-1 text-right"><CopyValue value={dotted} /></td>
                  <td className="px-2 py-1 text-right"><CopyValue value={triplet} /></td>
                  <td className="py-1 pl-2 text-right"><CopyValue value={hz} decimals={2} /></td>
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
  const [bpm, setBpm] = useState(DEFAULT_BPM)

  return (
    <>
      {/* Back Link */}
      <Container bordered className="!px-4 pb-4 pt-28 sm:!px-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Tools
        </Link>
      </Container>

      {/* Page Header */}
      <Container bordered className="!px-4 py-16 sm:!px-6 md:py-20">
        <Section reveal>
          <div className="hero-pair lg:gap-14">
            <div className="page-hero-frame max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Tools
              </p>
              <PageTitle
                text="Producer Toolbox"
                className="page-hero-title mb-6 font-display uppercase tracking-normal text-gold md:mb-8"
                speed={80}
              />
              <p className="mb-5 text-xl leading-relaxed text-gold md:text-2xl">
                Tempo, harmony, tuning, and mix references. Built for the session.
              </p>
              <p className="text-base leading-relaxed text-zinc-500 md:text-lg">
                Sixteen tools: metronome, tuner, chord builder, key matching, delay and reverb times, gain staging and loudness targets. Copy any value straight into your DAW.
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
      <Container bordered className="!px-4 py-12 sm:!px-6">
        <Section reveal>
          <nav className="toolbox-jump mb-8" aria-label="Toolbox sections">
            {TOOL_GROUPS.map((g) => (
              <a key={g.id} href={`#${g.id}`}>
                {g.label}
                <span>{g.count}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-12">
            <section id="tempo" className="toolbox-group space-y-4">
              <GroupHeading title="Tempo & Time" sub="Every tool here follows the BPM you set." />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <BPMControl bpm={bpm} setBpm={setBpm} />
                <Metronome bpm={bpm} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Converter bpm={bpm} />
                <SongLength bpm={bpm} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ReverbCalculator bpm={bpm} />
                <DelayTable bpm={bpm} />
              </div>
            </section>

            <section id="pitch" className="toolbox-group space-y-4">
              <GroupHeading title="Pitch & Harmony" sub="Keys, chords, tuning and sample pitch." />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <KeyScale />
                <ChordBuilder bpm={bpm} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ChromaticTuner />
                <NoteFrequency />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <PitchConverter />
                <CamelotMatcher />
              </div>
            </section>

            <section id="mix" className="toolbox-group space-y-4">
              <GroupHeading title="Mix & Master" sub="Frequencies, gain staging and delivery." />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <FrequencyGuide />
                <GainTools />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <LoudnessTargets />
                <FileSizeCalc />
              </div>
            </section>
          </div>
        </Section>
      </Container>
    </>
  )
}
