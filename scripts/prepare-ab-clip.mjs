#!/usr/bin/env node
/**
 * Cut a time-aligned before/after clip pair for the /mix-master audio slider.
 *
 *   node scripts/prepare-ab-clip.mjs --before "rough.mp3" --after "master.wav" \
 *     --out public/audio/mix-master/song-id [--length 40] [--start 62.5] [--ffmpeg path/to/ffmpeg]
 *
 * - Finds the offset between the two versions (they rarely start at the same sample).
 * - Picks the loudest window of the "after" (usually the hook) unless --start is given.
 * - Writes <out>-before.mp3 and <out>-after.mp3, same length, same start, same fades.
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]])
    return acc
  }, [])
)
const FFMPEG = args.ffmpeg || 'ffmpeg'
const LENGTH = Number(args.length || 40)
if (!args.before || !args.after || !args.out) {
  console.error('Usage: --before <file> --after <file> --out <prefix> [--length 40] [--start s]')
  process.exit(1)
}

const SR = 8000
function decodeMono(file) {
  const res = spawnSync(FFMPEG, ['-v', 'error', '-i', file, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], {
    maxBuffer: 1024 * 1024 * 1024,
  })
  if (res.status !== 0) throw new Error(res.stderr.toString())
  const buf = res.stdout
  return new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.length / 4))
}

// 10 ms RMS envelope, then positive slope (onsets) so mix/EQ differences matter less.
function onsetEnvelope(x) {
  const hop = SR / 100
  const env = []
  for (let i = 0; i + hop <= x.length; i += hop) {
    let s = 0
    for (let j = 0; j < hop; j++) s += x[i + j] * x[i + j]
    env.push(Math.sqrt(s / hop))
  }
  const on = env.map((v, i) => Math.max(0, v - (env[i - 1] ?? 0)))
  const mean = on.reduce((a, b) => a + b, 0) / on.length
  return on.map((v) => v - mean)
}

function bestLag(a, b, maxLag, scoreAt) {
  let best = 0
  let bestScore = -Infinity
  for (let lag = -maxLag; lag <= maxLag; lag++) {
    const s = scoreAt(a, b, lag)
    if (s > bestScore) {
      bestScore = s
      best = lag
    }
  }
  return best
}

function corr(a, b, lag, start = 0, len = Math.min(a.length, b.length)) {
  let s = 0
  for (let i = start; i < start + len; i++) {
    const j = i + lag
    if (j < 0 || j >= b.length || i >= a.length) continue
    s += a[i] * b[j]
  }
  return s
}

console.log('Decoding…')
const before = decodeMono(args.before)
const after = decodeMono(args.after)

// Coarse: envelopes, ±20 s. lag > 0 means the same moment happens later in "before".
const envB = onsetEnvelope(before)
const envA = onsetEnvelope(after)
const coarse = bestLag(envA, envB, 2000, (a, b, lag) => corr(a, b, lag))
console.log(`Coarse offset: ${(coarse / 100).toFixed(2)} s`)

// Pick the loudest window of the after.
let startSec = args.start !== undefined ? Number(args.start) : 0
if (args.start === undefined) {
  const win = LENGTH * SR
  const step = SR / 2
  let bestE = -1
  for (let i = 0; i + win < after.length; i += step) {
    let e = 0
    for (let j = i; j < i + win; j += 16) e += after[j] * after[j]
    const t = i / SR
    const beforeT = t + coarse / 100
    if (beforeT < 0 || (beforeT + LENGTH) * SR > before.length) continue
    if (e > bestE) {
      bestE = e
      startSec = t
    }
  }
}

// Fine: raw samples around the coarse lag, over a 6 s slice inside the chosen window.
const fineStart = Math.floor((startSec + 5) * SR)
const coarseSamples = Math.round((coarse / 100) * SR)
const fine = bestLag(after, before, Math.round(SR * 0.02), (a, b, lag) =>
  corr(a, b, coarseSamples + lag, fineStart, SR * 6)
)
const offsetSec = (coarseSamples + fine) / SR
console.log(`Fine offset: ${offsetSec.toFixed(4)} s · window starts at ${startSec.toFixed(2)} s of the after`)

const fades = `afade=t=in:st=0:d=0.4,afade=t=out:st=${LENGTH - 1.2}:d=1.2`
function cut(file, start, outFile) {
  const res = spawnSync(FFMPEG, [
    '-v', 'error', '-y', '-ss', start.toFixed(4), '-i', file, '-t', String(LENGTH),
    '-af', fades, '-ar', '44100', '-ac', '2', '-c:a', 'libmp3lame', '-b:a', '192k', outFile,
  ])
  if (res.status !== 0) throw new Error(res.stderr.toString())
}

fs.mkdirSync(path.dirname(args.out), { recursive: true })
cut(args.after, startSec, `${args.out}-after.mp3`)
cut(args.before, startSec + offsetSec, `${args.out}-before.mp3`)
console.log(`Wrote ${args.out}-before.mp3 and ${args.out}-after.mp3`)
