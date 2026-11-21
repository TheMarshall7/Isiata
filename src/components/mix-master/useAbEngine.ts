'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type FocusBand = 'full' | 'low' | 'vocal' | 'air'

export const FOCUS_BANDS: Record<FocusBand, { label: string; hint: string; hp: number; lp: number }> = {
  full: { label: 'Full song', hint: 'Everything', hp: 10, lp: 22000 },
  low: { label: 'Low end', hint: 'Kick, 808, bass', hp: 20, lp: 160 },
  vocal: { label: 'Vocal', hint: 'Voice and lyrics', hp: 250, lp: 4500 },
  air: { label: 'Air', hint: 'Shine and detail', hp: 7000, lp: 22000 },
}

export type ClipStats = {
  rms: number
  width: number
  lowShare: number
  airShare: number
  presenceShare: number
  crestDb: number
}

export type LoadedPair = {
  before: AudioBuffer
  after: AudioBuffer
  beforePeaks: number[]
  afterPeaks: number[]
  beforeStats: ClipStats
  afterStats: ClipStats
  duration: number
}

type Chain = { trim: GainNode; analyser: AnalyserNode; xfade: GainNode }

type Engine = {
  ctx: AudioContext
  hp: BiquadFilterNode
  lp: BiquadFilterNode
  before: Chain
  after: Chain
  sources: AudioBufferSourceNode[]
  startedAt: number
  offset: number
}

const BAR_COUNT = 110

function computePeaks(buffer: AudioBuffer) {
  const channels = Array.from({ length: buffer.numberOfChannels }, (_, c) => buffer.getChannelData(c))
  const size = Math.floor(buffer.length / BAR_COUNT)
  const peaks: number[] = []
  for (let b = 0; b < BAR_COUNT; b++) {
    // RMS per bar reads closer to perceived level than a raw peak.
    let sum = 0
    let count = 0
    for (let i = b * size; i < (b + 1) * size; i += 8) {
      for (const data of channels) {
        sum += data[i] * data[i]
        count++
      }
    }
    peaks.push(Math.sqrt(sum / Math.max(1, count)))
  }
  return peaks
}

/** Rough tonal + dynamic fingerprint of a clip, measured in the browser from the decoded audio. */
function computeStats(buffer: AudioBuffer): ClipStats {
  const sr = buffer.sampleRate
  const L = buffer.getChannelData(0)
  const R = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : L
  const onePole = (fc: number) => {
    const a = Math.exp((-2 * Math.PI * fc) / sr)
    let y = 0
    return (v: number) => (y = (1 - a) * v + a * y)
  }
  const low1 = onePole(120)
  const low2 = onePole(120)
  const air1 = onePole(8000)
  const air2 = onePole(8000)
  const pres1 = onePole(2000)
  const pres2 = onePole(5000)
  let mid2 = 0
  let side2 = 0
  let low = 0
  let air = 0
  let pres = 0
  let peak = 0
  for (let i = 0; i < L.length; i++) {
    const l = L[i]
    const r = R[i]
    const m = (l + r) / 2
    const s = (l - r) / 2
    mid2 += m * m
    side2 += s * s
    const al = Math.abs(l)
    const ar = Math.abs(r)
    if (al > peak) peak = al
    if (ar > peak) peak = ar
    const lo = low2(low1(m))
    low += lo * lo
    const hi = m - air2(air1(m))
    air += hi * hi
    const pr = pres2(m) - pres1(m)
    pres += pr * pr
  }
  const n = L.length
  const rms = Math.sqrt((mid2 + side2) / n)
  return {
    rms,
    width: Math.sqrt(side2 / Math.max(1e-12, mid2)),
    lowShare: low / Math.max(1e-12, mid2),
    airShare: air / Math.max(1e-12, mid2),
    presenceShare: pres / Math.max(1e-12, mid2),
    crestDb: 20 * Math.log10(peak / Math.max(1e-9, rms)),
  }
}

/** Equal-power crossfade so the middle of the slider is not quieter than the ends. */
export function crossfadeGains(divider: number) {
  const afterAmount = 1 - divider / 100
  return {
    before: Math.cos((afterAmount * Math.PI) / 2),
    after: Math.sin((afterAmount * Math.PI) / 2),
  }
}

type Options = {
  beforeUrl: string
  afterUrl: string | null
  /** 0 = all after, 100 = all before (the divider position). */
  divider: number
  matchVolume: boolean
  focus: FocusBand
}

/**
 * Two sample-locked looping sources (before + after) feeding one output.
 * Each side has a level-match trim and an analyser before the crossfade, so the
 * spectrum can show both versions at once while the listener hears the blend.
 */
export function useAbEngine({ beforeUrl, afterUrl, divider, matchVolume, focus }: Options) {
  const [pair, setPair] = useState<LoadedPair | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)

  const engineRef = useRef<Engine | null>(null)
  const rafRef = useRef<number>()
  const live = useRef({ divider, matchVolume, focus, pair })
  live.current = { divider, matchVolume, focus, pair }

  const applyMix = useCallback((instant = false) => {
    const engine = engineRef.current
    if (!engine) return
    const { divider: d, matchVolume: mv, focus: f, pair: p } = live.current
    const t = engine.ctx.currentTime
    const set = (param: AudioParam, v: number) =>
      instant ? param.setValueAtTime(v, t) : param.setTargetAtTime(v, t, 0.02)

    const g = crossfadeGains(d)
    set(engine.before.xfade.gain, g.before)
    set(engine.after.xfade.gain, g.after)

    let trimBefore = 1
    let trimAfter = 1
    if (mv && p) {
      const target = Math.min(p.beforeStats.rms, p.afterStats.rms)
      trimBefore = target / p.beforeStats.rms
      trimAfter = target / p.afterStats.rms
    }
    set(engine.before.trim.gain, trimBefore)
    set(engine.after.trim.gain, trimAfter)

    set(engine.hp.frequency, FOCUS_BANDS[f].hp)
    set(engine.lp.frequency, FOCUS_BANDS[f].lp)
  }, [])

  const getEngine = useCallback(() => {
    if (engineRef.current) return engineRef.current
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.Q.value = 0.7
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.Q.value = 0.7
    hp.connect(lp)
    lp.connect(ctx.destination)

    const chain = (): Chain => {
      const trim = ctx.createGain()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 4096
      analyser.smoothingTimeConstant = 0.82
      const xfade = ctx.createGain()
      trim.connect(analyser)
      analyser.connect(xfade)
      xfade.connect(hp)
      return { trim, analyser, xfade }
    }

    engineRef.current = { ctx, hp, lp, before: chain(), after: chain(), sources: [], startedAt: 0, offset: 0 }
    applyMix(true)
    return engineRef.current
  }, [applyMix])

  const stopSources = useCallback(() => {
    const engine = engineRef.current
    if (!engine) return
    for (const s of engine.sources) {
      try {
        s.stop()
      } catch {
        /* already stopped */
      }
      s.disconnect()
    }
    engine.sources = []
  }, [])

  // Load + decode whenever the example changes.
  useEffect(() => {
    let cancelled = false
    stopSources()
    setPlaying(false)
    setPosition(0)
    setPair(null)
    setStatus('loading')
    if (engineRef.current) engineRef.current.offset = 0

    const decode = async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`${res.status} ${url}`)
      return getEngine().ctx.decodeAudioData(await res.arrayBuffer())
    }

    Promise.all([decode(beforeUrl), afterUrl ? decode(afterUrl) : null])
      .then(([before, decodedAfter]) => {
        if (cancelled) return
        const after = decodedAfter ?? before
        const beforeStats = computeStats(before)
        setPair({
          before,
          after,
          beforePeaks: computePeaks(before),
          afterPeaks: computePeaks(after),
          beforeStats,
          afterStats: decodedAfter ? computeStats(after) : beforeStats,
          duration: Math.min(before.duration, after.duration),
        })
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [beforeUrl, afterUrl, getEngine, stopSources])

  useEffect(() => {
    applyMix()
  }, [divider, matchVolume, focus, pair, applyMix])

  const currentTime = useCallback(() => {
    const engine = engineRef.current
    if (!engine || !pair) return 0
    if (!engine.sources.length) return engine.offset
    const elapsed = Math.max(0, engine.ctx.currentTime - engine.startedAt)
    return (engine.offset + elapsed) % pair.duration
  }, [pair])

  const startAt = useCallback(
    (offset: number) => {
      if (!pair) return
      const engine = getEngine()
      stopSources()
      const when = engine.ctx.currentTime + 0.03
      const legs: [AudioBuffer, Chain][] = [
        [pair.before, engine.before],
        [pair.after, engine.after],
      ]
      // Both sources start on the same clock tick, so they stay sample-locked.
      engine.sources = legs.map(([buffer, chain]) => {
        const src = engine.ctx.createBufferSource()
        src.buffer = buffer
        src.loop = true
        src.loopEnd = pair.duration
        src.connect(chain.trim)
        src.start(when, offset)
        return src
      })
      engine.offset = offset
      engine.startedAt = when
    },
    [pair, getEngine, stopSources]
  )

  const play = useCallback(async () => {
    if (!pair) return
    const engine = getEngine()
    if (engine.ctx.state === 'suspended') await engine.ctx.resume()
    if (!engine.sources.length) startAt(engine.offset)
    setPlaying(true)
  }, [pair, getEngine, startAt])

  const pause = useCallback(() => {
    const engine = engineRef.current
    if (!engine) return
    engine.offset = currentTime()
    stopSources()
    setPlaying(false)
  }, [currentTime, stopSources])

  const seek = useCallback(
    (fraction: number) => {
      if (!pair) return
      const offset = Math.max(0, Math.min(0.999, fraction)) * pair.duration
      if (playing) startAt(offset)
      else if (engineRef.current) engineRef.current.offset = offset
      setPosition(offset)
    },
    [pair, playing, startAt]
  )

  useEffect(() => {
    if (!playing) return
    const tick = () => {
      setPosition(currentTime())
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, currentTime])

  useEffect(
    () => () => {
      stopSources()
      engineRef.current?.ctx.close()
      engineRef.current = null
    },
    [stopSources]
  )

  const analysers = useCallback(() => {
    const engine = engineRef.current
    return engine ? { before: engine.before.analyser, after: engine.after.analyser, sampleRate: engine.ctx.sampleRate } : null
  }, [])

  return { pair, status, playing, position, play, pause, seek, analysers }
}
