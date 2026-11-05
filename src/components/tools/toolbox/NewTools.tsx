'use client'

import { useState } from 'react'
import {
  LOUDNESS_TARGETS,
  convertPitch,
  formatBytes,
  loudnessGain,
  midiToFreq,
  midiToName,
  nearestNote,
  wavSizeBytes,
  type PitchUnit,
} from '@/lib/tools/producer-toolbox-math'
import { AnimatedNumber, CopyValue, PanelTitle, Segmented, playTone } from './shared'

// ─── Note ↔ Frequency ────────────────────────────────────────────────

export function NoteFrequency() {
  const [midi, setMidi] = useState(69)
  const [a4, setA4] = useState('440')
  const [freqInput, setFreqInput] = useState('')

  const a4n = parseFloat(a4)
  const safeA4 = a4n >= 400 && a4n <= 480 ? a4n : 440
  const typed = parseFloat(freqInput)
  const heard = nearestNote(typed, safeA4)
  const freq = midiToFreq(midi, safeA4)

  const pick = (m: number) => {
    const clamped = Math.max(24, Math.min(107, m))
    setMidi(clamped)
    playTone(midiToFreq(clamped, safeA4))
  }

  const octaveBase = Math.floor(midi / 12) * 12
  const keys = Array.from({ length: 12 }, (_, i) => octaveBase + i)

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Tap a key to hear it">Note ↔ Frequency</PanelTitle>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="toolbox-stat text-center">
          <span className="toolbox-label block">Note</span>
          <span className="font-display text-3xl text-gold">{midiToName(midi)}</span>
        </div>
        <div className="toolbox-stat text-center">
          <span className="toolbox-label block">Frequency</span>
          <span className="text-2xl font-light tabular-nums text-zinc-100">
            <AnimatedNumber value={freq} decimals={2} />
            <span className="toolbox-unit">Hz</span>
          </span>
        </div>
      </div>

      <div className="toolbox-keys mb-3" role="group" aria-label="Notes">
        {keys.map((m) => {
          const black = [1, 3, 6, 8, 10].includes(m % 12)
          return (
            <button
              key={m}
              type="button"
              onClick={() => pick(m)}
              aria-label={midiToName(m)}
              aria-pressed={m === midi}
              className={`toolbox-key ${black ? 'is-black' : ''} ${m === midi ? 'is-active' : ''}`}
            >
              <span>{midiToName(m).replace(/\d/, '')}</span>
            </button>
          )
        })}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button type="button" className="toolbox-btn-secondary" onClick={() => pick(midi - 12)}>
          Oct −
        </button>
        <button type="button" className="toolbox-btn-secondary" onClick={() => pick(midi + 12)}>
          Oct +
        </button>
        <button type="button" className="toolbox-btn-primary" onClick={() => playTone(freq)}>
          Play
        </button>
        <CopyValue value={freq} decimals={2} suffix="Hz" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="toolbox-label mb-1.5 block">Frequency → nearest note</span>
          <input
            type="number"
            inputMode="decimal"
            value={freqInput}
            onChange={(e) => setFreqInput(e.target.value)}
            placeholder="e.g. 55 or 1000"
            className="toolbox-input w-full px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="toolbox-label mb-1.5 block">A4 tuning (400–480 Hz)</span>
          <input
            type="number"
            inputMode="decimal"
            value={a4}
            onChange={(e) => setA4(e.target.value)}
            className="toolbox-input w-full px-3 py-2 text-sm"
          />
        </label>
      </div>
      {heard && (
        <button
          type="button"
          className="toolbox-result mt-3"
          onClick={() => {
            if (heard.midi >= 24 && heard.midi <= 107) setMidi(heard.midi)
            playTone(typed)
          }}
        >
          <span className="font-display text-gold">{heard.name}</span>
          <span className="text-zinc-400">
            {heard.cents >= 0 ? '+' : ''}
            {heard.cents.toFixed(1)} cents
          </span>
          <span className="toolbox-hint ml-auto">Hear it</span>
        </button>
      )}
    </div>
  )
}

// ─── Pitch converter ─────────────────────────────────────────────────

const PITCH_PRESETS: { label: string; semitones: number }[] = [
  { label: '+1 st', semitones: 1 },
  { label: '+7 st', semitones: 7 },
  { label: '+12 st', semitones: 12 },
  { label: '−1 st', semitones: -1 },
  { label: '−5 st', semitones: -5 },
  { label: '−12 st', semitones: -12 },
]

export function PitchConverter() {
  const [value, setValue] = useState('7')
  const [unit, setUnit] = useState<PitchUnit>('semitones')

  const parsed = parseFloat(value)
  const r = Number.isFinite(parsed) ? convertPitch(parsed, unit) : null

  const rows = r
    ? [
        { key: 'semitones', label: 'Semitones', value: r.semitones, decimals: 2, suffix: undefined },
        { key: 'cents', label: 'Cents', value: r.cents, decimals: 1, suffix: undefined },
        { key: 'ratio', label: 'Freq ratio', value: r.ratio, decimals: 4, suffix: '×' },
        { key: 'speed', label: 'Playback speed', value: r.speed, decimals: 2, suffix: '%' },
      ]
    : []

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Sample and tape pitching">Pitch Converter</PanelTitle>

      <div className="mb-3 flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="toolbox-input min-w-0 flex-1 px-3 py-2 text-sm"
          aria-label="Value"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as PitchUnit)}
          className="toolbox-input px-3 py-2 text-sm"
          aria-label="Unit"
        >
          <option value="semitones">Semitones</option>
          <option value="cents">Cents</option>
          <option value="ratio">Ratio</option>
          <option value="speed">Speed %</option>
        </select>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {PITCH_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className="toolbox-chip toolbox-chip-btn"
            onClick={() => {
              setUnit('semitones')
              setValue(String(p.semitones))
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {r ? (
        <div className="grid grid-cols-2 gap-3">
          {rows.map((row) => (
            <div key={row.key} className="toolbox-stat">
              <span className="toolbox-label mb-1 block">{row.label}</span>
              <CopyValue value={row.value} decimals={row.decimals} suffix={row.suffix} />
            </div>
          ))}
        </div>
      ) : (
        <p className="toolbox-hint">Ratio and speed must be above zero.</p>
      )}
    </div>
  )
}

// ─── Loudness targets ────────────────────────────────────────────────

export function LoudnessTargets() {
  const [lufs, setLufs] = useState('-9')
  const track = parseFloat(lufs)
  const has = Number.isFinite(track)

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Integrated LUFS · true peak">Loudness Targets</PanelTitle>

      <label className="mb-5 block max-w-xs">
        <span className="toolbox-label mb-1.5 block">Your master (integrated LUFS)</span>
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          value={lufs}
          onChange={(e) => setLufs(e.target.value)}
          className="toolbox-input w-full px-3 py-2 text-sm"
        />
      </label>

      <ul className="toolbox-rows">
        {LOUDNESS_TARGETS.map((t) => {
          const gain = has && t.lufs != null ? loudnessGain(track, t.lufs) : null
          const down = gain != null && gain < -0.05
          const up = gain != null && gain > 0.05
          return (
            <li key={t.key} className="toolbox-row">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-200">{t.platform}</p>
                <p className="text-xs text-zinc-500">{t.note}</p>
              </div>
              <div className="shrink-0 text-right">
                {t.lufs != null && <CopyValue value={t.lufs} decimals={0} suffix=" LUFS" />}
                <p className="pr-2 text-xs text-zinc-500">
                  Peak <span className="tabular-nums">{t.truePeak}</span> dBTP
                </p>
              </div>
              {gain != null && (
                <span className={`toolbox-badge ${down ? 'is-down' : up ? 'is-up' : 'is-ok'}`}>
                  {down ? `${gain.toFixed(1)} dB` : up ? `+${gain.toFixed(1)} dB` : 'On target'}
                </span>
              )}
            </li>
          )
        })}
      </ul>
      <p className="toolbox-hint mt-4">
        Badge shows the gain a normalizing platform would apply. Targets are common guidance and change over time.
      </p>
    </div>
  )
}

// ─── File size ───────────────────────────────────────────────────────

export function FileSizeCalc() {
  const [minutes, setMinutes] = useState('3')
  const [seconds, setSeconds] = useState('30')
  const [rate, setRate] = useState('48000')
  const [depth, setDepth] = useState('24')
  const [channels, setChannels] = useState('2')

  const total = (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0)
  const bytes = wavSizeBytes(total, Number(rate), Number(depth), Number(channels))
  const perMin = wavSizeBytes(60, Number(rate), Number(depth), Number(channels))

  return (
    <div className="toolbox-panel">
      <PanelTitle hint="Uncompressed WAV / AIFF">File Size</PanelTitle>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="toolbox-label mb-1.5 block">Minutes</span>
          <input type="number" inputMode="numeric" min={0} value={minutes} onChange={(e) => setMinutes(e.target.value)} className="toolbox-input w-full px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="toolbox-label mb-1.5 block">Seconds</span>
          <input type="number" inputMode="numeric" min={0} value={seconds} onChange={(e) => setSeconds(e.target.value)} className="toolbox-input w-full px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="mb-5 space-y-3">
        <div>
          <span className="toolbox-label mb-1.5 block">Sample rate</span>
          <Segmented
            label="Sample rate"
            value={rate}
            onChange={setRate}
            options={[44100, 48000, 88200, 96000, 192000].map((r) => ({ value: String(r), label: `${r / 1000}k` }))}
          />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          <div>
            <span className="toolbox-label mb-1.5 block">Bit depth</span>
            <Segmented
              label="Bit depth"
              value={depth}
              onChange={setDepth}
              options={['16', '24', '32'].map((d) => ({ value: d, label: d }))}
            />
          </div>
          <div>
            <span className="toolbox-label mb-1.5 block">Channels</span>
            <Segmented
              label="Channels"
              value={channels}
              onChange={setChannels}
              options={[
                { value: '1', label: 'Mono' },
                { value: '2', label: 'Stereo' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="toolbox-stat">
          <span className="toolbox-label mb-1 block">File size</span>
          <CopyValue value={formatBytes(bytes)} />
        </div>
        <div className="toolbox-stat">
          <span className="toolbox-label mb-1 block">Per minute</span>
          <CopyValue value={formatBytes(perMin)} />
        </div>
      </div>
    </div>
  )
}
