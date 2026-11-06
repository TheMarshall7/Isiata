/** Pure Producer Toolbox math — BPM timing, unit conversion, and diatonic theory. */

export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

export const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11] as const
/** Natural minor (Aeolian). */
export const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10] as const

const FLAT_MAP: Record<string, string> = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
}

/**
 * Roots (sharp spelling from the picker) that traditionally use flat key signatures.
 * F# major stays sharp (6♯ vs Gb 6♭). G# minor stays sharp (5♯ vs Ab minor 7♭).
 */
const FLAT_MAJOR_ROOTS = new Set(['F', 'A#', 'D#', 'G#', 'C#'])
const FLAT_MINOR_ROOTS = new Set(['D', 'G', 'C', 'F', 'A#', 'D#'])

export const NOTE_FRACTIONS = [
  { label: '1/1', value: 1 },
  { label: '1/2', value: 1 / 2 },
  { label: '1/4', value: 1 / 4 },
  { label: '1/8', value: 1 / 8 },
  { label: '1/16', value: 1 / 16 },
  { label: '1/32', value: 1 / 32 },
  { label: '1/64', value: 1 / 64 },
  { label: '1/128', value: 1 / 128 },
] as const

/** Musical space → total length in quarter-note beats (4/4). */
export const REVERB_SPACES = [
  { key: 'stadium', label: 'Stadium', sub: '4 bars', beats: 16 },
  { key: 'hall', label: 'Hall', sub: '2 bars', beats: 8 },
  { key: 'large-room', label: 'Large Room', sub: '1 bar', beats: 4 },
  { key: 'small-room', label: 'Small Room', sub: '1/2 note', beats: 2 },
  { key: 'tight', label: 'Tight Ambience', sub: '1/4 note', beats: 1 },
] as const

/** Pre-delay as a fraction of total reverb time (common mix heuristic). */
export const REVERB_PREDELAY_RATIO = 0.015

export function clampBpm(bpm: number): number {
  if (!Number.isFinite(bpm)) return 140
  return Math.max(20, Math.min(999, Math.round(bpm)))
}

/** Tap-tempo: average interval between recent taps → BPM. */
export function bpmFromTapIntervals(intervalsMs: number[]): number | null {
  if (intervalsMs.length < 1) return null
  const avg = intervalsMs.reduce((a, b) => a + b, 0) / intervalsMs.length
  if (!(avg > 0)) return null
  return clampBpm(60000 / avg)
}

export function msPerBeat(bpm: number): number {
  return 60000 / bpm
}

/** Note value as fraction of a whole note → duration in ms (4/4). */
export function noteDurationMs(wholeNoteFraction: number, bpm: number): number {
  const beats = wholeNoteFraction * 4
  return beats * msPerBeat(bpm)
}

export function delayRow(wholeNoteFraction: number, bpm: number) {
  const ms = noteDurationMs(wholeNoteFraction, bpm)
  return {
    ms,
    dotted: ms * 1.5,
    triplet: ms * (2 / 3),
    hz: 1000 / ms,
  }
}

export type ConvertUnit = 'hz' | 'ms' | 'beats' | 'seconds'

export function convertTiming(value: number, unit: ConvertUnit, bpm: number) {
  const results = { hz: 0, ms: 0, beats: 0, seconds: 0 }
  if (!(value > 0) || !(bpm > 0)) return results

  switch (unit) {
    case 'hz':
      results.hz = value
      results.ms = 1000 / value
      results.seconds = 1 / value
      results.beats = results.seconds * (bpm / 60)
      break
    case 'ms':
      results.ms = value
      results.hz = 1000 / value
      results.seconds = value / 1000
      results.beats = (value * bpm) / 60000
      break
    case 'beats':
      results.beats = value
      results.ms = (value * 60000) / bpm
      results.seconds = (value * 60) / bpm
      results.hz = bpm / (60 * value)
      break
    case 'seconds':
      results.seconds = value
      results.ms = value * 1000
      results.hz = 1 / value
      results.beats = value * (bpm / 60)
      break
  }
  return results
}

export function reverbTimes(beats: number, bpm: number) {
  const total = beats * msPerBeat(bpm)
  const preDelay = total * REVERB_PREDELAY_RATIO
  return {
    total,
    preDelay,
    decay: total - preDelay,
  }
}

export function prefersFlats(root: string, isMajor: boolean): boolean {
  return isMajor ? FLAT_MAJOR_ROOTS.has(root) : FLAT_MINOR_ROOTS.has(root)
}

export function getScaleNotes(root: string, isMajor: boolean): string[] {
  const rootIndex = ALL_NOTES.indexOf(root as (typeof ALL_NOTES)[number])
  if (rootIndex < 0) return []

  const intervals = isMajor ? MAJOR_INTERVALS : MINOR_INTERVALS
  const useFlats = prefersFlats(root, isMajor)

  return intervals.map((interval) => {
    const note = ALL_NOTES[(rootIndex + interval) % 12]
    return useFlats && FLAT_MAP[note] ? FLAT_MAP[note] : note
  })
}

export function getScaleChords(notes: string[], isMajor: boolean) {
  // Diatonic triads matching the scale degrees shown (natural minor → v, not V).
  const romanMajor = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u00B0']
  const romanMinor = ['i', 'ii\u00B0', '\u266DIII', 'iv', 'v', '\u266DVI', '\u266DVII']
  const qualMajor = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim']
  const qualMinor = ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj']

  const numerals = isMajor ? romanMajor : romanMinor
  const qualities = isMajor ? qualMajor : qualMinor

  return notes.map((note, i) => ({
    numeral: numerals[i],
    name: `${note}${qualities[i]}`,
  }))
}

// ─── Pitch & frequency ───────────────────────────────────────────────

const NOTE_NAMES_SHARP = ALL_NOTES

export function midiToFreq(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12)
}

export function freqToMidi(freq: number, a4 = 440): number {
  return 69 + 12 * Math.log2(freq / a4)
}

export function midiToName(midi: number): string {
  const n = Math.round(midi)
  return `${NOTE_NAMES_SHARP[((n % 12) + 12) % 12]}${Math.floor(n / 12) - 1}`
}

/** Nearest equal-tempered note for a frequency, with cents offset (-50…+50). */
export function nearestNote(freq: number, a4 = 440) {
  if (!(freq > 0) || !(a4 > 0)) return null
  const exact = freqToMidi(freq, a4)
  const midi = Math.round(exact)
  return { midi, name: midiToName(midi), cents: (exact - midi) * 100, snapped: midiToFreq(midi, a4) }
}

export type PitchUnit = 'semitones' | 'cents' | 'ratio' | 'speed'

/** Convert any pitch-shift expression into all the others. Speed is a percentage (100 = unchanged). */
export function convertPitch(value: number, unit: PitchUnit) {
  let semitones: number
  switch (unit) {
    case 'semitones':
      semitones = value
      break
    case 'cents':
      semitones = value / 100
      break
    case 'ratio':
      semitones = value > 0 ? 12 * Math.log2(value) : NaN
      break
    case 'speed':
      semitones = value > 0 ? 12 * Math.log2(value / 100) : NaN
      break
  }
  if (!Number.isFinite(semitones)) return null
  const ratio = Math.pow(2, semitones / 12)
  return { semitones, cents: semitones * 100, ratio, speed: ratio * 100 }
}

// ─── Loudness targets ────────────────────────────────────────────────

export type LoudnessTarget = {
  key: string
  platform: string
  lufs: number | null
  truePeak: number
  note: string
}

/** Commonly published/practiced delivery targets (integrated LUFS, true-peak dBTP). */
export const LOUDNESS_TARGETS: LoudnessTarget[] = [
  { key: 'spotify', platform: 'Spotify', lufs: -14, truePeak: -1, note: 'Normal mode. Louder masters are turned down.' },
  { key: 'apple', platform: 'Apple Music', lufs: -16, truePeak: -1, note: 'Sound Check reference level.' },
  { key: 'youtube', platform: 'YouTube', lufs: -14, truePeak: -1, note: 'Louder uploads are attenuated, quieter are not boosted.' },
  { key: 'tidal', platform: 'Tidal', lufs: -14, truePeak: -1, note: 'Normalized playback.' },
  { key: 'amazon', platform: 'Amazon Music', lufs: -14, truePeak: -2, note: 'Normalization on by default.' },
  { key: 'soundcloud', platform: 'SoundCloud', lufs: -14, truePeak: -1, note: 'Guideline only; no hard normalization.' },
  { key: 'ebu', platform: 'Broadcast (EBU R128)', lufs: -23, truePeak: -1, note: 'European TV and radio, ±0.5 LU.' },
  { key: 'club', platform: 'Club / DJ master', lufs: -8, truePeak: -0.3, note: 'Loud and dense. Leaves little headroom for codecs.' },
]

/** Gain change a platform will apply to reach its target, given the track's integrated LUFS. */
export function loudnessGain(trackLufs: number, targetLufs: number): number {
  return targetLufs - trackLufs
}

// ─── File size ───────────────────────────────────────────────────────

export function wavSizeBytes(seconds: number, sampleRate: number, bitDepth: number, channels: number): number {
  return Math.max(0, seconds) * sampleRate * (bitDepth / 8) * channels
}

export function formatBytes(bytes: number): string {
  if (!(bytes > 0)) return '0 MB'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  const v = bytes / Math.pow(1024, i)
  return `${v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2)} ${units[i]}`
}

// ─── Diatonic chords for playback ────────────────────────────────────

/** MIDI notes of the diatonic triad (or seventh) on a scale degree, root voiced from octave 4. */
export function diatonicChordMidis(root: string, isMajor: boolean, degree: number, seventh = false): number[] {
  const rootIndex = ALL_NOTES.indexOf(root as (typeof ALL_NOTES)[number])
  if (rootIndex < 0) return []
  const iv = isMajor ? MAJOR_INTERVALS : MINOR_INTERVALS
  const base = 48 + rootIndex // C3 region keeps chords warm, not shrill
  const steps = seventh ? [0, 2, 4, 6] : [0, 2, 4]
  return steps.map((s) => {
    const idx = degree + s
    return base + iv[idx % 7] + 12 * Math.floor(idx / 7)
  })
}

/** Chord quality suffix per degree for seventh chords (natural major / minor). */
export function diatonicSeventhNames(notes: string[], isMajor: boolean): string[] {
  const major = ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7♭5']
  const minor = ['m7', 'm7♭5', 'maj7', 'm7', 'm7', 'maj7', '7']
  const q = isMajor ? major : minor
  return notes.map((n, i) => `${n}${q[i]}`)
}

export const COMMON_PROGRESSIONS: { label: string; major: number[]; minor: number[] }[] = [
  { label: 'Pop', major: [0, 4, 5, 3], minor: [0, 5, 2, 6] },
  { label: 'Jazz ii–V–I', major: [1, 4, 0, 0], minor: [1, 4, 0, 0] },
  { label: 'Ballad', major: [0, 5, 3, 4], minor: [0, 3, 6, 2] },
  { label: 'Andalusian', major: [5, 4, 3, 2], minor: [0, 6, 5, 4] },
]

// ─── Camelot wheel ───────────────────────────────────────────────────

const CAMELOT_MAJOR: Record<string, number> = {
  B: 1, 'F#': 2, 'C#': 3, 'G#': 4, 'D#': 5, 'A#': 6, F: 7, C: 8, G: 9, D: 10, A: 11, E: 12,
}
const CAMELOT_MINOR: Record<string, number> = {
  'G#': 1, 'D#': 2, 'A#': 3, F: 4, C: 5, G: 6, D: 7, A: 8, E: 9, B: 10, 'F#': 11, 'C#': 12,
}

export type CamelotKey = { code: string; num: number; letter: 'A' | 'B'; root: string; isMajor: boolean }

function camelotName(root: string, isMajor: boolean): string {
  const notes = getScaleNotes(root, isMajor)
  return `${notes[0] ?? root} ${isMajor ? 'major' : 'minor'}`
}

export function toCamelot(root: string, isMajor: boolean): CamelotKey {
  const num = (isMajor ? CAMELOT_MAJOR : CAMELOT_MINOR)[root]
  const letter = isMajor ? 'B' : 'A'
  return { code: `${num}${letter}`, num, letter, root, isMajor }
}

function fromCamelot(num: number, letter: 'A' | 'B'): CamelotKey {
  const n = ((num - 1 + 12) % 12) + 1
  const table = letter === 'B' ? CAMELOT_MAJOR : CAMELOT_MINOR
  const root = Object.keys(table).find((k) => table[k] === n)!
  return { code: `${n}${letter}`, num: n, letter, root, isMajor: letter === 'B' }
}

/** Harmonic-mixing neighbours: same key, relative, ±1 on the wheel, and the +2 energy boost. */
export function camelotMatches(key: CamelotKey) {
  const other = key.letter === 'A' ? 'B' : 'A'
  return [
    { relation: 'Same key', key },
    { relation: key.isMajor ? 'Relative minor' : 'Relative major', key: fromCamelot(key.num, other) },
    { relation: 'One step up', key: fromCamelot(key.num + 1, key.letter) },
    { relation: 'One step down', key: fromCamelot(key.num - 1, key.letter) },
    { relation: 'Energy boost (+2)', key: fromCamelot(key.num + 2, key.letter) },
  ].map((m) => ({ ...m, name: camelotName(m.key.root, m.key.isMajor) }))
}

// ─── Gain / dB ───────────────────────────────────────────────────────

export function dbToGain(db: number): number {
  return Math.pow(10, db / 20)
}

export function gainToDb(gain: number): number {
  return gain > 0 ? 20 * Math.log10(gain) : -Infinity
}

// ─── Song length ↔ bars ──────────────────────────────────────────────

export function barsToSeconds(bars: number, bpm: number, beatsPerBar = 4): number {
  return bpm > 0 ? (bars * beatsPerBar * 60) / bpm : 0
}

export function secondsToBars(seconds: number, bpm: number, beatsPerBar = 4): number {
  return beatsPerBar > 0 ? (seconds * bpm) / 60 / beatsPerBar : 0
}

export function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = seconds - m * 60
  return `${m}:${s < 10 ? '0' : ''}${s.toFixed(1)}`
}

// ─── Frequency guide ─────────────────────────────────────────────────

export const FREQUENCY_BANDS = [
  { key: 'sub', label: 'Sub', short: 'Sub', low: 20, high: 60, note: 'Felt more than heard. 808 tails, kick weight. Mono it.' },
  { key: 'bass', label: 'Bass', short: 'Bass', low: 60, high: 250, note: 'Kick punch and bass body. Where low-end fights happen.' },
  { key: 'mud', label: 'Low mids', short: 'Lo', low: 250, high: 500, note: 'Warmth, or mud when it piles up. First place to cut.' },
  { key: 'mids', label: 'Mids', short: 'Mid', low: 500, high: 2000, note: 'Body of vocals, snares and keys. Honk lives near 1 kHz.' },
  { key: 'presence', label: 'Upper mids', short: 'Hi', low: 2000, high: 5000, note: 'Presence and bite. Ears are most sensitive here. Harshness too.' },
  { key: 'air', label: 'Highs', short: 'Air', low: 5000, high: 20000, note: 'Sibilance at 5–8 kHz, sparkle and air above 10 kHz.' },
] as const

export const INSTRUMENT_RANGES = [
  { label: 'Kick', low: 40, high: 5000, focus: '50–100 Hz thump, 3–5 kHz click' },
  { label: '808 / Sub bass', low: 30, high: 250, focus: '40–80 Hz fundamental' },
  { label: 'Bass guitar', low: 41, high: 5000, focus: '80–250 Hz body, 700 Hz–1 kHz growl' },
  { label: 'Snare', low: 120, high: 10000, focus: '150–250 Hz body, 5 kHz crack' },
  { label: 'Hi-hats', low: 3000, high: 16000, focus: '6–12 kHz shimmer' },
  { label: 'Male vocal', low: 85, high: 12000, focus: '120 Hz body, 3 kHz presence' },
  { label: 'Female vocal', low: 165, high: 16000, focus: '250 Hz body, 4 kHz presence' },
  { label: 'Piano', low: 27.5, high: 4186, focus: 'Full range. Clean up 200–400 Hz in a mix' },
  { label: 'Guitar', low: 82, high: 5000, focus: '200 Hz body, 2–4 kHz definition' },
] as const

// ─── Pitch detection (tuner) ─────────────────────────────────────────

/**
 * McLeod Pitch Method (normalized square difference) with parabolic interpolation.
 * The normalization removes the low-note sharp bias of plain autocorrelation, and the
 * peak height doubles as a clarity score so noise and chords are rejected.
 * Use ~4096 samples so low bass notes (41 Hz) span enough periods.
 * Returns the fundamental in Hz, or null when the signal is quiet or not clearly pitched.
 */
export function detectPitch(buf: Float32Array, sampleRate: number, minFreq = 30, maxFreq = 4200): number | null {
  const n = buf.length
  let energy = 0
  for (let i = 0; i < n; i++) energy += buf[i] * buf[i]
  if (Math.sqrt(energy / n) < 0.008) return null

  const maxLag = Math.min(Math.floor(n / 2), Math.ceil(sampleRate / minFreq))
  const minLag = Math.max(2, Math.floor(sampleRate / maxFreq))
  const nsdf = new Float32Array(maxLag + 1)
  let m = 2 * energy
  for (let tau = 0; tau <= maxLag; tau++) {
    let acf = 0
    for (let i = 0; i < n - tau; i++) acf += buf[i] * buf[i + tau]
    nsdf[tau] = m > 0 ? (2 * acf) / m : 0
    m -= buf[tau] * buf[tau] + buf[n - 1 - tau] * buf[n - 1 - tau]
  }

  // Collect the highest point of each positive lobe after the first zero crossing.
  let tau = 1
  while (tau < maxLag && nsdf[tau] > 0) tau++
  const peaks: number[] = []
  let bestInLobe = -1
  for (; tau < maxLag; tau++) {
    if (nsdf[tau] > 0) {
      if (bestInLobe < 0 || nsdf[tau] > nsdf[bestInLobe]) bestInLobe = tau
    } else if (bestInLobe > 0) {
      peaks.push(bestInLobe)
      bestInLobe = -1
    }
  }
  if (bestInLobe > 0) peaks.push(bestInLobe)
  if (!peaks.length) return null

  let highest = 0
  for (const p of peaks) highest = Math.max(highest, nsdf[p])
  if (highest < 0.6) return null // not clearly pitched

  // The first peak close to the best one is the fundamental (avoids octave-down errors).
  const pick = peaks.find((p) => nsdf[p] >= 0.9 * highest && p >= minLag)
  if (pick == null) return null

  const x1 = nsdf[pick - 1]
  const x2 = nsdf[pick]
  const x3 = nsdf[pick + 1]
  const a = (x1 + x3 - 2 * x2) / 2
  const b = (x3 - x1) / 2
  const shift = a < 0 ? -b / (2 * a) : 0
  const freq = sampleRate / (pick + shift)
  return freq >= minFreq && freq <= maxFreq ? freq : null
}
