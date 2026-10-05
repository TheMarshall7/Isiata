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
