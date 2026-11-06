'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ALL_NOTES,
  COMMON_PROGRESSIONS,
  FREQUENCY_BANDS,
  INSTRUMENT_RANGES,
  barsToSeconds,
  camelotMatches,
  dbToGain,
  detectPitch,
  diatonicChordMidis,
  diatonicSeventhNames,
  formatClock,
  gainToDb,
  getScaleChords,
  getScaleNotes,
  midiToFreq,
  nearestNote,
  secondsToBars,
  toCamelot,
} from '@/lib/tools/producer-toolbox-math'
import { AnimatedNumber, CopyValue, PanelTitle, Segmented, copyText, getAudioContext, playNotes, playTone } from './shared'

function isTyping(el: EventTarget | null) {
  const t = el as HTMLElement | null
  return !!t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
}

type Mode = 'major' | 'minor'
const MODE_OPTIONS: { value: Mode; label: string }[] = [
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
]

function RootSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="toolbox-input px-3 py-2 text-sm" aria-label="Key">
      {ALL_NOTES.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  )
}

// ─── Metronome ───────────────────────────────────────────────────────

const SIGNATURES = [
  { value: '2', label: '2/4' },
  { value: '3', label: '3/4' },
  { value: '4', label: '4/4' },
  { value: '6', label: '6/8' },
]

export function Metronome({ bpm }: { bpm: number }) {
  const [running, setRunning] = useState(false)
  const [beats, setBeats] = useState('4')
  const [accent, setAccent] = useState(true)
  const [current, setCurrent] = useState(-1)

  const bpmRef = useRef(bpm)
  const beatsRef = useRef(Number(beats))
  const accentRef = useRef(accent)
  bpmRef.current = bpm
  beatsRef.current = Number(beats)
  accentRef.current = accent

  const timerRef = useRef<number>()
  const nextTimeRef = useRef(0)
  const beatRef = useRef(0)
  const visualTimers = useRef<number[]>([])

  const stop = useCallback(() => {
    window.clearInterval(timerRef.current)
    visualTimers.current.forEach((t) => window.clearTimeout(t))
    visualTimers.current = []
    setRunning(false)
    setCurrent(-1)
  }, [])

  const start = useCallback(() => {
    const audio = getAudioContext()
    if (!audio) return
    beatRef.current = 0
    nextTimeRef.current = audio.currentTime + 0.06
    const schedule = () => {
      // Lookahead scheduler: queue clicks ~120 ms ahead so timing stays tight even if the UI stalls.
      while (nextTimeRef.current < audio.currentTime + 0.12) {
        const beat = beatRef.current
        const t = nextTimeRef.current
        // 6/8 counts eighth notes: pulse on 1 and 4, so the beat unit is half the quarter-note BPM length.
        const sixEight = beatsRef.current === 6
        const isDown = beat === 0
        const isMid = sixEight && beat === 3
        const osc = audio.createOscillator()
        const gain = audio.createGain()
        osc.type = 'square'
        osc.frequency.value = accentRef.current && isDown ? 1760 : isMid ? 1320 : 880
        gain.gain.setValueAtTime(0.0001, t)
        gain.gain.exponentialRampToValueAtTime(isDown && accentRef.current ? 0.22 : 0.12, t + 0.002)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
        osc.connect(gain)
        gain.connect(audio.destination)
        osc.start(t)
        osc.stop(t + 0.06)

        const delayMs = Math.max(0, (t - audio.currentTime) * 1000)
        visualTimers.current.push(window.setTimeout(() => setCurrent(beat), delayMs))
        if (visualTimers.current.length > 32) visualTimers.current.splice(0, 16)

        const beatLen = (60 / bpmRef.current) * (sixEight ? 0.5 : 1)
        nextTimeRef.current += beatLen
        beatRef.current = (beat + 1) % beatsRef.current
      }
    }
    schedule()
    timerRef.current = window.setInterval(schedule, 25)
    setRunning(true)
  }, [])

  const toggle = useCallback(() => (running ? stop() : start()), [running, start, stop])

  useEffect(() => () => stop(), [stop])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key.toLowerCase() === 'm') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  const count = Number(beats)

  return (
    <div className="toolbox-panel">
      <PanelTitle hint={`Follows ${bpm} BPM · M to start`}>Metronome</PanelTitle>

      <div className="toolbox-beats mb-6" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={`toolbox-beat ${i === current ? 'is-on' : ''} ${i === 0 && accent ? 'is-accent' : ''}`}
          />
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={toggle} className="toolbox-btn-primary min-w-[7rem]" aria-pressed={running}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button
          type="button"
          onClick={() => setAccent((a) => !a)}
          className={`toolbox-btn-secondary ${accent ? 'is-on' : ''}`}
          aria-pressed={accent}
        >
          Accent {accent ? 'on' : 'off'}
        </button>
      </div>

      <div className="flex justify-center">
        <Segmented
          label="Time signature"
          value={beats}
          onChange={(v) => {
            beatRef.current = 0
            setBeats(v)
          }}
          options={SIGNATURES}
        />
      </div>
    </div>
  )
}

// ─── Chord progression builder ───────────────────────────────────────

const MAX_SLOTS = 8

export function ChordBuilder({ bpm }: { bpm: number }) {
  const [root, setRoot] = useState('C')
  const [mode, setMode] = useState<Mode>('minor')
  const [sevenths, setSevenths] = useState(false)
  const [prog, setProg] = useState<number[]>([0, 5, 2, 6])
  const [playing, setPlaying] = useState(-1)
  const [copied, setCopied] = useState(false)
  const timers = useRef<number[]>([])

  const isMajor = mode === 'major'
  const notes = getScaleNotes(root, isMajor)
  const triads = getScaleChords(notes, isMajor)
  const names = sevenths ? diatonicSeventhNames(notes, isMajor) : triads.map((c) => c.name)

  const playDegree = (d: number, seconds = 1.4) =>
    playNotes(diatonicChordMidis(root, isMajor, d, sevenths).map((m) => midiToFreq(m)), seconds, 'triangle')

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  const playAll = () => {
    clearTimers()
    if (!prog.length) return
    const barMs = (4 * 60000) / bpm
    const stepMs = Math.min(2400, Math.max(500, barMs))
    prog.forEach((d, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setPlaying(i)
          playDegree(d, stepMs / 1000)
        }, i * stepMs)
      )
    })
    timers.current.push(window.setTimeout(() => setPlaying(-1), prog.length * stepMs))
  }

  const add = (d: number) => {
    playDegree(d)
    setProg((p) => (p.length >= MAX_SLOTS ? p : [...p, d]))
  }

  const text = prog.map((d) => names[d]).join(' – ')
  const copy = async () => {
    if (prog.length && (await copyText(text))) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1100)
    }
  }

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Tap chords to build">Chord Progression Builder</PanelTitle>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <RootSelect value={root} onChange={setRoot} />
        <Segmented label="Mode" value={mode} onChange={setMode} options={MODE_OPTIONS} />
        <Segmented
          label="Chord size"
          value={sevenths ? '7' : '3'}
          onChange={(v) => setSevenths(v === '7')}
          options={[
            { value: '3', label: 'Triads' },
            { value: '7', label: '7ths' },
          ]}
        />
      </div>

      <div className="mb-5 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
        {triads.map((c, i) => (
          <button key={c.numeral} type="button" className="toolbox-chord" onClick={() => add(i)}>
            <span className="toolbox-chord-num">{c.numeral}</span>
            <span className="toolbox-chord-name">{names[i]}</span>
          </button>
        ))}
      </div>

      <div className="toolbox-label mb-2 flex items-center justify-between">
        <span>
          Progression · {prog.length}/{MAX_SLOTS}
        </span>
        {prog.length > 0 && (
          <button type="button" className="toolbox-link" onClick={() => setProg([])}>
            Clear
          </button>
        )}
      </div>
      <div className="toolbox-slots mb-4">
        {prog.length === 0 && <span className="toolbox-hint">Tap a chord above to start.</span>}
        {prog.map((d, i) => (
          <span key={`${i}-${d}`} className={`toolbox-slot ${i === playing ? 'is-on' : ''}`}>
            <button type="button" onClick={() => playDegree(d)} className="toolbox-slot-main">
              {names[d]}
            </button>
            <button
              type="button"
              aria-label={`Remove ${names[d]}`}
              className="toolbox-slot-x"
              onClick={() => setProg((p) => p.filter((_, j) => j !== i))}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {COMMON_PROGRESSIONS.map((p) => (
          <button
            key={p.label}
            type="button"
            className="toolbox-chip toolbox-chip-btn"
            onClick={() => setProg(isMajor ? p.major : p.minor)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="toolbox-btn-primary" onClick={playAll} disabled={!prog.length}>
          Play · 1 bar each
        </button>
        <button type="button" className="toolbox-btn-secondary" onClick={copy} disabled={!prog.length}>
          {copied ? 'Copied' : 'Copy chords'}
        </button>
      </div>
    </div>
  )
}

// ─── Song length ↔ bars ──────────────────────────────────────────────

const SECTION_PRESETS = [4, 8, 16, 32, 64]

export function SongLength({ bpm }: { bpm: number }) {
  const [bars, setBars] = useState('16')
  const [min, setMin] = useState('3')
  const [sec, setSec] = useState('0')
  const [bpb, setBpb] = useState('4')

  const beatsPerBar = Number(bpb)
  const barSeconds = barsToSeconds(parseFloat(bars) || 0, bpm, beatsPerBar)
  const totalSeconds = (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0)
  const fromTime = secondsToBars(totalSeconds, bpm, beatsPerBar)

  return (
    <div className="toolbox-panel">
      <PanelTitle hint={`At ${bpm} BPM`}>Song Length ↔ Bars</PanelTitle>

      <div className="mb-4">
        <span className="toolbox-label mb-1.5 block">Beats per bar</span>
        <Segmented
          label="Beats per bar"
          value={bpb}
          onChange={setBpb}
          options={['3', '4', '5', '7'].map((b) => ({ value: b, label: b }))}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block">
            <span className="toolbox-label mb-1.5 block">Bars → time</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={bars}
              onChange={(e) => setBars(e.target.value)}
              className="toolbox-input mb-2 w-full px-3 py-2 text-sm"
            />
          </label>
          <div className="mb-3 flex flex-wrap gap-1">
            {SECTION_PRESETS.map((b) => (
              <button key={b} type="button" className="toolbox-chip toolbox-chip-btn text-xs" onClick={() => setBars(String(b))}>
                {b}
              </button>
            ))}
          </div>
          <div className="toolbox-stat">
            <span className="toolbox-label mb-1 block">Duration</span>
            <CopyValue value={formatClock(barSeconds)} />
            <span className="toolbox-hint block px-2">
              <AnimatedNumber value={barSeconds} decimals={2} /> s
            </span>
          </div>
        </div>

        <div>
          <span className="toolbox-label mb-1.5 block">Time → bars</span>
          <div className="mb-2 grid grid-cols-2 gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="toolbox-input w-full px-3 py-2 text-sm"
              aria-label="Minutes"
              placeholder="min"
            />
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={sec}
              onChange={(e) => setSec(e.target.value)}
              className="toolbox-input w-full px-3 py-2 text-sm"
              aria-label="Seconds"
              placeholder="sec"
            />
          </div>
          <p className="toolbox-hint mb-3">Minutes · seconds</p>
          <div className="toolbox-stat">
            <span className="toolbox-label mb-1 block">Bars</span>
            <CopyValue value={fromTime} decimals={2} />
            <span className="toolbox-hint block px-2">
              <AnimatedNumber value={fromTime * beatsPerBar} decimals={1} /> beats
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Gain / dB ───────────────────────────────────────────────────────

const DB_REFERENCE = [
  { db: -6, label: '−6 dB ≈ half amplitude' },
  { db: -3, label: '−3 dB ≈ half power' },
  { db: -10, label: '−10 dB ≈ half as loud' },
  { db: 6, label: '+6 dB ≈ double amplitude' },
]

export function GainTools() {
  const [db, setDb] = useState('-6')
  const [gain, setGain] = useState('0.5')
  const [peak, setPeak] = useState('-3.2')
  const [ceiling, setCeiling] = useState('-1')

  const dbN = parseFloat(db)
  const gainN = parseFloat(gain)
  const peakN = parseFloat(peak)
  const ceilN = parseFloat(ceiling)
  const multiplier = Number.isFinite(dbN) ? dbToGain(dbN) : NaN
  const asDb = Number.isFinite(gainN) && gainN > 0 ? gainToDb(gainN) : NaN
  const headroom = Number.isFinite(peakN) && Number.isFinite(ceilN) ? ceilN - peakN : NaN

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Gain staging">Gain &amp; dB</PanelTitle>

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block">
            <span className="toolbox-label mb-1.5 block">dB → gain</span>
            <input type="number" inputMode="decimal" step="0.1" value={db} onChange={(e) => setDb(e.target.value)} className="toolbox-input mb-2 w-full px-3 py-2 text-sm" />
          </label>
          <div className="toolbox-stat">
            <span className="toolbox-label mb-1 block">Multiplier</span>
            <CopyValue value={multiplier} decimals={4} suffix="×" />
            <span className="toolbox-hint block px-2">
              <AnimatedNumber value={multiplier * 100} decimals={1} />% amplitude
            </span>
          </div>
        </div>
        <div>
          <label className="block">
            <span className="toolbox-label mb-1.5 block">Gain → dB</span>
            <input type="number" inputMode="decimal" step="0.01" min={0} value={gain} onChange={(e) => setGain(e.target.value)} className="toolbox-input mb-2 w-full px-3 py-2 text-sm" />
          </label>
          <div className="toolbox-stat">
            <span className="toolbox-label mb-1 block">Decibels</span>
            <CopyValue value={asDb} decimals={2} suffix="dB" />
            <span className="toolbox-hint block px-2">Gain must be above 0</span>
          </div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="toolbox-label mb-1.5 block">Peak (dBFS)</span>
          <input type="number" inputMode="decimal" step="0.1" value={peak} onChange={(e) => setPeak(e.target.value)} className="toolbox-input w-full px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="toolbox-label mb-1.5 block">Ceiling (dBFS)</span>
          <input type="number" inputMode="decimal" step="0.1" value={ceiling} onChange={(e) => setCeiling(e.target.value)} className="toolbox-input w-full px-3 py-2 text-sm" />
        </label>
      </div>
      <div className={`toolbox-result mb-4 ${headroom < 0 ? 'is-warn' : ''}`}>
        <span className="toolbox-label">Headroom</span>
        <span className="text-lg tabular-nums text-zinc-100">
          {Number.isFinite(headroom) ? (
            <>
              <AnimatedNumber value={headroom} decimals={1} /> dB
            </>
          ) : (
            '—'
          )}
        </span>
        <span className="toolbox-hint ml-auto">{headroom < 0 ? 'Over the ceiling' : 'Room to push'}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {DB_REFERENCE.map((r) => (
          <button key={r.db} type="button" className="toolbox-chip toolbox-chip-btn text-xs" onClick={() => setDb(String(r.db))}>
            {r.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Camelot / key compatibility ─────────────────────────────────────

export function CamelotMatcher() {
  const [root, setRoot] = useState('A')
  const [mode, setMode] = useState<Mode>('minor')
  const key = toCamelot(root, mode === 'major')
  const matches = camelotMatches(key)
  const keyName = `${getScaleNotes(root, mode === 'major')[0]} ${mode}`

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Harmonic mixing">Camelot Key Match</PanelTitle>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <RootSelect value={root} onChange={setRoot} />
        <Segmented label="Mode" value={mode} onChange={setMode} options={MODE_OPTIONS} />
      </div>

      <div className="mb-5 flex items-center gap-4">
        <div className="toolbox-camelot" key={key.code}>
          {key.code}
        </div>
        <div>
          <p className="font-display text-xl text-gold">{keyName}</p>
          <p className="toolbox-hint">Click a match to jump to it</p>
        </div>
      </div>

      <ul className="toolbox-rows">
        {matches.slice(1).map((m) => (
          <li key={m.relation}>
            <button
              type="button"
              className="toolbox-row w-full text-left"
              onClick={() => {
                setRoot(m.key.root)
                setMode(m.key.isMajor ? 'major' : 'minor')
              }}
            >
              <span className="toolbox-camelot is-small">{m.key.code}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-zinc-200">{m.name}</span>
                <span className="block text-xs text-zinc-500">{m.relation}</span>
              </span>
              <iconify-icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Frequency guide ─────────────────────────────────────────────────

const LOG_MIN = Math.log10(20)
const LOG_MAX = Math.log10(20000)
const pos = (hz: number) => ((Math.log10(Math.max(20, Math.min(20000, hz))) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100
const fmtHz = (hz: number) => (hz >= 1000 ? `${+(hz / 1000).toFixed(1)}k` : `${Math.round(hz)}`)

export function FrequencyGuide() {
  const [active, setActive] = useState<string>('mud')
  const band = FREQUENCY_BANDS.find((b) => b.key === active) ?? FREQUENCY_BANDS[0]
  const center = Math.sqrt(band.low * band.high)

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Tap a band to hear its centre">Frequency Guide</PanelTitle>

      <div className="toolbox-spectrum mb-2" role="group" aria-label="Frequency bands">
        {FREQUENCY_BANDS.map((b) => (
          <button
            key={b.key}
            type="button"
            className={`toolbox-band ${b.key === active ? 'is-active' : ''}`}
            style={{ left: `${pos(b.low)}%`, width: `${pos(b.high) - pos(b.low)}%` }}
            onClick={() => {
              setActive(b.key)
              playTone(Math.sqrt(b.low * b.high), 1.4)
            }}
          >
            <span className="hidden sm:inline">{b.label}</span>
            <span className="sm:hidden">{b.short}</span>
          </button>
        ))}
      </div>
      <div className="toolbox-ticks mb-5" aria-hidden="true">
        {[20, 100, 500, 1000, 5000, 20000].map((hz) => (
          <span key={hz} style={{ left: `${pos(hz)}%` }}>
            {fmtHz(hz)}
          </span>
        ))}
      </div>

      <div className="toolbox-result mb-6 flex-wrap">
        <span className="font-display text-gold">{band.label}</span>
        <span className="tabular-nums text-zinc-400">
          {fmtHz(band.low)}–{fmtHz(band.high)} Hz
        </span>
        <span className="w-full text-sm text-zinc-300">{band.note}</span>
        <button type="button" className="toolbox-link" onClick={() => playTone(center, 1.4)}>
          Play {fmtHz(center)} Hz
        </button>
      </div>

      <h4 className="toolbox-label mb-3">Instrument ranges</h4>
      <ul className="space-y-2.5">
        {INSTRUMENT_RANGES.map((r) => (
          <li key={r.label} className="toolbox-range-row">
            <span className="toolbox-range-name text-sm text-zinc-200">{r.label}</span>
            <span className="toolbox-range-track">
              <span className="toolbox-range-fill" style={{ left: `${pos(r.low)}%`, width: `${pos(r.high) - pos(r.low)}%` }} />
            </span>
            <span className="toolbox-range-focus text-xs text-zinc-500">{r.focus}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Chromatic tuner ─────────────────────────────────────────────────

type TunerState = 'idle' | 'starting' | 'listening' | 'denied' | 'unsupported'

export function ChromaticTuner() {
  const [state, setState] = useState<TunerState>('idle')
  const [a4, setA4] = useState('440')
  const [reading, setReading] = useState<{ name: string; cents: number; freq: number } | null>(null)

  const streamRef = useRef<MediaStream | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const rafRef = useRef(0)
  const a4Ref = useRef(440)
  const a4n = parseFloat(a4)
  a4Ref.current = a4n >= 400 && a4n <= 480 ? a4n : 440

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    sourceRef.current?.disconnect()
    sourceRef.current = null
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setReading(null)
    setState((s) => (s === 'listening' || s === 'starting' ? 'idle' : s))
  }, [])

  useEffect(() => () => stop(), [stop])

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setState('unsupported')
      return
    }
    const audio = getAudioContext()
    if (!audio) {
      setState('unsupported')
      return
    }
    setState('starting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      })
      streamRef.current = stream
      const source = audio.createMediaStreamSource(stream)
      const analyser = audio.createAnalyser()
      analyser.fftSize = 4096
      source.connect(analyser)
      sourceRef.current = source
      const buf = new Float32Array(analyser.fftSize)
      let last = 0
      let smoothed: number | null = null
      let silentFrames = 0

      const loop = (now: number) => {
        rafRef.current = requestAnimationFrame(loop)
        if (now - last < 70) return // ~14 reads/sec keeps the CPU calm
        last = now
        analyser.getFloatTimeDomainData(buf)
        const f = detectPitch(buf, audio.sampleRate)
        if (f == null) {
          if (++silentFrames > 12) {
            smoothed = null
            setReading(null)
          }
          return
        }
        silentFrames = 0
        // Light smoothing, but jump straight to a new note instead of gliding across octaves.
        smoothed = smoothed && Math.abs(Math.log2(f / smoothed)) < 0.05 ? smoothed * 0.6 + f * 0.4 : f
        const n = nearestNote(smoothed, a4Ref.current)
        if (n) setReading({ name: n.name, cents: n.cents, freq: smoothed })
      }
      rafRef.current = requestAnimationFrame(loop)
      setState('listening')
    } catch {
      setState('denied')
    }
  }

  const cents = reading?.cents ?? 0
  const inTune = reading != null && Math.abs(cents) < 5
  const listening = state === 'listening'

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Uses your microphone">Chromatic Tuner</PanelTitle>

      <div className={`toolbox-tuner mb-5 ${inTune ? 'is-in-tune' : ''} ${listening ? 'is-live' : ''}`}>
        <div className="toolbox-tuner-note">
          {reading ? (
            <>
              <span>{reading.name.replace(/-?\d+$/, '')}</span>
              <sub>{reading.name.match(/-?\d+$/)?.[0]}</sub>
            </>
          ) : (
            <span className="text-zinc-600">{listening ? '…' : '—'}</span>
          )}
        </div>
        <div className="toolbox-meter" aria-hidden="true">
          <span className="toolbox-meter-center" />
          {[-40, -30, -20, -10, 10, 20, 30, 40].map((t) => (
            <span key={t} className="toolbox-meter-tick" style={{ left: `${50 + t}%` }} />
          ))}
          <span
            className="toolbox-meter-needle"
            style={{ left: `${50 + Math.max(-50, Math.min(50, cents))}%`, opacity: reading ? 1 : 0.25 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
          <span>♭ −50</span>
          <span className="tabular-nums text-zinc-300">
            {reading ? `${cents >= 0 ? '+' : ''}${cents.toFixed(0)}¢ · ${reading.freq.toFixed(1)} Hz` : 'cents'}
          </span>
          <span>+50 ♯</span>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <button
          type="button"
          className="toolbox-btn-primary min-w-[9rem]"
          onClick={listening ? stop : start}
          disabled={state === 'starting'}
        >
          {listening ? 'Stop tuner' : state === 'starting' ? 'Starting…' : 'Start tuner'}
        </button>
        <label className="block w-28">
          <span className="toolbox-label mb-1.5 block">A4 (Hz)</span>
          <input type="number" inputMode="decimal" value={a4} onChange={(e) => setA4(e.target.value)} className="toolbox-input w-full px-3 py-2 text-sm" />
        </label>
      </div>
      {state === 'denied' && <p className="toolbox-hint mt-3">Microphone access was blocked. Allow it in your browser’s site settings, then try again.</p>}
      {state === 'unsupported' && <p className="toolbox-hint mt-3">This browser can’t use the microphone here. Try a current Chrome, Safari or Firefox over HTTPS.</p>}
      {state === 'idle' && <p className="toolbox-hint mt-3">Play a single note close to your mic. Nothing is recorded or sent anywhere.</p>}
    </div>
  )
}
