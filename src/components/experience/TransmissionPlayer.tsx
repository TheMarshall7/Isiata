'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { ChapterDef } from '@/lib/experience/campaign'
import { startDrone, stopDrone } from './audio'
import { Glyph } from './Glyph'
import { TransmitText } from './Motion'
import { Btn } from './ui'

const LINE_MS = 4600

/**
 * The weekly transmission (target ~3 minutes once real video exists).
 * Until the cinematic is produced this plays the script as timed captions over
 * a living waveform. Captions are always on: they are the transcript (brief 16).
 * When a video asset exists, render it here and keep the captions as a track.
 */
export function TransmissionPlayer({ chapter, onDone }: { chapter: ChapterDef; onDone: () => void }) {
  const lines = chapter.transmission
  const [idx, setIdx] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [sound, setSound] = useState(false)
  const [showText, setShowText] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const done = idx >= lines.length - 1 && !playing && idx >= 0

  useEffect(() => {
    if (!playing) return
    if (idx >= lines.length - 1) {
      setPlaying(false)
      onDone()
      return
    }
    timer.current = setTimeout(() => setIdx((i) => i + 1), idx === -1 ? 600 : LINE_MS)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
    // onDone is stable enough for this one-shot completion
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, idx, lines.length])

  useEffect(() => {
    if (sound && playing) startDrone()
    else stopDrone()
    return () => stopDrone()
  }, [sound, playing])

  function play() {
    if (done || idx < 0) setIdx(-1)
    setPlaying(true)
  }

  function skip() {
    setPlaying(false)
    setIdx(lines.length - 1)
    onDone()
  }

  return (
    <div>
      <div className="relative flex aspect-video min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-[#d8aa67]/20 bg-[#030303]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(217,119,43,0.28), transparent 70%)' }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-1/3 items-end justify-center gap-[3px] px-6 opacity-70">
          {Array.from({ length: 56 }, (_, i) => (
            <span
              key={i}
              className={cn('fne-bar w-full max-w-[6px] rounded-t bg-[#d8aa67]/50', playing && 'is-playing')}
              style={{ animationDelay: `${-(i * 0.13) % 2}s`, height: `${20 + ((i * 37) % 70)}%` }}
            />
          ))}
        </div>
        <Glyph name={chapter.glyph} size={96} className="absolute top-6 text-[#d8aa67]/20" strokeWidth={0.8} />

        <div className="relative z-10 max-w-xl px-8 text-center" aria-live="polite">
          {idx === -1 ? (
            <p className="font-spaced text-xs uppercase tracking-[0.35em] text-[#d8aa67]/80">{chapter.n ? `Transmission · Week ${chapter.n}` : 'Hidden transmission'}</p>
          ) : (
            <TransmitText
              key={idx}
              as="p"
              text={lines[idx]}
              speed={32}
              className="fne-line block font-display text-[clamp(1.1rem,3.4vw,1.7rem)] leading-snug tracking-[0.03em] text-[#f7f1e6]"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {playing ? (
          <Btn variant="ghost" onClick={() => setPlaying(false)} className="px-5 py-2.5 text-xs">
            Pause
          </Btn>
        ) : (
          <Btn onClick={play} className="px-6 py-2.5 text-xs">
            {done ? 'Replay' : idx >= 0 ? 'Resume' : 'Play transmission'}
          </Btn>
        )}
        <Btn variant="ghost" onClick={() => setSound((s) => !s)} aria-pressed={sound} className="px-5 py-2.5 text-xs">
          Ambience {sound ? 'on' : 'off'}
        </Btn>
        <Btn variant="ghost" onClick={() => setShowText((s) => !s)} aria-expanded={showText} className="px-5 py-2.5 text-xs">
          Transcript
        </Btn>
        {!done && (
          <button onClick={skip} className="ml-auto text-xs tracking-[0.12em] text-[#ece3d7]/40 hover:text-[#ece3d7]/80">
            Skip
          </button>
        )}
      </div>

      {showText && (
        <ol className="mt-5 space-y-2 rounded-xl border border-[#d8aa67]/15 p-5 text-sm leading-relaxed text-[#ece3d7]/70">
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ol>
      )}
    </div>
  )
}
