'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CHAPTERS, type ChapterDef } from '@/lib/experience/campaign'
import { exp } from '@/lib/experience/config'
import { sfx, tone, wait } from './audio'
import { Shape, type ShapeName } from './Glyph'
import { Btn } from './ui'

export type PuzzleStatus = 'idle' | 'checking' | 'wrong' | 'correct'

export interface PuzzleProps {
  chapter: ChapterDef
  onSubmit: (answer: unknown) => void
  status: PuzzleStatus
  /** Chapter numbers whose artifacts the member holds. */
  held: number[]
}

export function Puzzle(props: PuzzleProps) {
  switch (props.chapter.challenge.kind) {
    case 'oddglyphs':
      return <OddGlyphs {...props} />
    case 'testimony':
      return <Testimony {...props} />
    case 'sequence':
      return <Sequence {...props} />
    case 'morse':
      return <Morse {...props} />
    case 'missing':
      return <Missing {...props} />
    case 'anamorph':
      return <Anamorph {...props} />
    case 'order':
      return <Order {...props} />
    case 'phrase':
      return <Phrase {...props} />
  }
}

const locked = (s: PuzzleStatus) => s === 'checking' || s === 'correct'

/* ------------------------------------------------------------------ 1 */

/** Pupil offsets for each cell. Offset cells are the ones looking away. */
const GAZE: Record<number, number> = { 2: -9, 9: 9, 14: -9 }

function OddGlyphs({ chapter, onSubmit, status }: PuzzleProps) {
  const cells = chapter.puzzle.cells as number[]
  const [picked, setPicked] = useState<number[]>([])
  const [assist, setAssist] = useState(false)

  function toggle(i: number) {
    if (locked(status)) return
    sfx.select()
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.length < 3 ? [...p, i] : p))
  }

  return (
    <div>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2.5 sm:gap-3">
        {cells.map((i) => {
          const dx = GAZE[i] ?? 0
          const on = picked.includes(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={on}
              aria-label={`Eye ${i + 1}${assist ? (dx < 0 ? ', looking left' : dx > 0 ? ', looking right' : ', looking at the center') : ''}`}
              className={cn(
                'aspect-square rounded-xl border p-2 transition-all duration-300',
                on ? 'border-[#F0A35E] bg-[#D9772B]/15 shadow-[0_0_24px_rgba(217,119,43,0.35)]' : 'border-[#d8aa67]/20 hover:border-[#d8aa67]/60'
              )}
            >
              <svg viewBox="0 0 60 60" className="h-full w-full" fill="none" strokeLinecap="round">
                <path d="M4 30C14 14 46 14 56 30C46 46 14 46 4 30Z" stroke="#d8aa67" strokeWidth="1.4" />
                <circle cx={30 + dx * 0.55} cy="30" r="9" stroke="#ece3d7" strokeWidth="1.2" />
                <circle cx={30 + dx} cy="30" r="3.6" fill="#ece3d7" />
              </svg>
              {assist && <span className="sr-only">{dx ? 'away' : 'center'}</span>}
            </button>
          )
        })}
      </div>
      <p className="mt-5 text-center font-mono text-xs tracking-[0.2em] text-[#ece3d7]/50">{picked.length}/3 SELECTED</p>
      <label className="mt-3 flex items-center justify-center gap-2 text-xs text-[#ece3d7]/45">
        <input type="checkbox" checked={assist} onChange={(e) => setAssist(e.target.checked)} className="accent-[#d8aa67]" />
        Screen reader: describe where each eye looks
      </label>
      <Submit disabled={picked.length !== 3 || locked(status)} onClick={() => onSubmit(picked)} status={status} />
    </div>
  )
}

/* ------------------------------------------------------------------ 2 */

function Testimony({ chapter, onSubmit, status }: PuzzleProps) {
  const accounts = chapter.puzzle.accounts as { id: string; who: string; text: string }[]
  const [pick, setPick] = useState('')
  return (
    <div>
      <div role="radiogroup" aria-label="Choose the account that contradicts the others" className="space-y-3">
        {accounts.map((a) => (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={pick === a.id}
            onClick={() => {
              if (locked(status)) return
              sfx.select()
              setPick(a.id)
            }}
            className={cn(
              'w-full rounded-2xl border p-5 text-left transition-all duration-300',
              pick === a.id ? 'border-[#F0A35E] bg-[#D9772B]/10' : 'border-[#d8aa67]/20 hover:border-[#d8aa67]/60'
            )}
          >
            <p className="font-mono text-[11px] tracking-[0.25em] text-[#d8aa67]">
              ACCOUNT {a.id} · {a.who.toUpperCase()}
            </p>
            <p className="mt-3 leading-relaxed text-[#ece3d7]/85">“{a.text}”</p>
          </button>
        ))}
      </div>
      <Submit disabled={!pick || locked(status)} onClick={() => onSubmit(pick)} status={status} />
    </div>
  )
}

/* ------------------------------------------------------------------ 3 */

const PAD_TONES = [262, 330, 392, 494]

function Sequence({ chapter, onSubmit, status }: PuzzleProps) {
  const pads = chapter.puzzle.pads as ShapeName[]
  const seq = chapter.puzzle.sequence as number[]
  const [lit, setLit] = useState<number | null>(null)
  const [phase, setPhase] = useState<'idle' | 'watching' | 'input'>('idle')
  const [entry, setEntry] = useState<number[]>([])
  const cancelled = useRef(false)

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
    }
  }, [])

  async function watch() {
    setPhase('watching')
    setEntry([])
    for (const p of seq) {
      if (cancelled.current) return
      await wait(350)
      setLit(p)
      tone(PAD_TONES[p], 520)
      await wait(620)
      setLit(null)
    }
    setPhase('input')
  }

  function press(p: number) {
    if (phase !== 'input' || locked(status)) return
    setLit(p)
    tone(PAD_TONES[p], 260)
    setTimeout(() => setLit(null), 220)
    const next = [...entry, p]
    setEntry(next)
    if (next.length === seq.length) {
      onSubmit(next)
      setPhase('idle')
    }
  }

  return (
    <div>
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-4">
        {pads.map((s, p) => (
          <button
            key={p}
            type="button"
            onClick={() => press(p)}
            disabled={phase !== 'input' || locked(status)}
            aria-label={`Pad ${p + 1}: ${s}`}
            className={cn(
              'flex aspect-square items-center justify-center rounded-2xl border transition-all duration-200 disabled:cursor-default',
              lit === p
                ? 'border-[#F0A35E] bg-[#D9772B]/30 text-[#fff5e8] shadow-[0_0_36px_rgba(240,163,94,0.55)]'
                : 'border-[#d8aa67]/25 text-[#ece3d7]/70'
            )}
          >
            <Shape name={s} size={56} />
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2" aria-label={`${entry.length} of ${seq.length} entered`}>
        {seq.map((_, i) => (
          <span key={i} className={cn('h-2 w-2 rotate-45', i < entry.length ? 'bg-[#F0A35E]' : 'bg-[#ece3d7]/15')} />
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <Btn onClick={watch} disabled={phase === 'watching' || locked(status)} className="px-6 py-2.5 text-xs">
          {phase === 'watching' ? 'Watching…' : 'Watch the sequence'}
        </Btn>
        {phase === 'input' && (
          <Btn variant="ghost" onClick={() => setEntry([])} className="px-5 py-2.5 text-xs">
            Clear
          </Btn>
        )}
      </div>
      <Status status={status} />
    </div>
  )
}

/* ------------------------------------------------------------------ 4 */

const MORSE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
  K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
  U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
}
/** Public signal pattern. The decoded word is validated on the server. */
const SIGNAL = ['---', '.--.', '.', '-.']

function Morse({ chapter, onSubmit, status }: PuzzleProps) {
  const unit = (chapter.puzzle.unit as number) ?? 140
  const [playing, setPlaying] = useState(false)
  const [flash, setFlash] = useState(false)
  const [showPattern, setShowPattern] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [word, setWord] = useState('')
  const cancelled = useRef(false)
  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
    }
  }, [])

  async function play() {
    setPlaying(true)
    for (let l = 0; l < SIGNAL.length; l++) {
      for (const sym of SIGNAL[l]) {
        if (cancelled.current) return
        const len = sym === '.' ? unit : unit * 3
        setFlash(true)
        tone(620, len)
        await wait(len)
        setFlash(false)
        await wait(unit)
      }
      await wait(unit * 2)
    }
    setPlaying(false)
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-5">
        <div
          aria-hidden
          className={cn(
            'h-24 w-24 rounded-full border transition-all duration-100',
            flash ? 'border-[#F0A35E] bg-[#F0A35E]/70 shadow-[0_0_60px_rgba(240,163,94,0.8)]' : 'border-[#d8aa67]/30 bg-transparent'
          )}
        />
        <Btn onClick={play} disabled={playing} className="px-6 py-2.5 text-xs">
          {playing ? 'Receiving…' : 'Play the signal'}
        </Btn>
        <div className="flex gap-4 text-xs text-[#ece3d7]/50">
          <button onClick={() => setShowPattern((s) => !s)} className="underline-offset-4 hover:underline">
            {showPattern ? 'Hide' : 'Show'} the pattern
          </button>
          <button onClick={() => setShowChart((s) => !s)} className="underline-offset-4 hover:underline">
            {showChart ? 'Hide' : 'Show'} the code chart
          </button>
        </div>
        {showPattern && (
          <p className="font-mono text-2xl tracking-[0.3em] text-[#f7f1e6]" aria-label="Signal pattern: dashes and dots">
            {SIGNAL.map((s) => s.replace(/\./g, '•').replace(/-/g, '—')).join('   ')}
          </p>
        )}
        {showChart && (
          <div className="grid max-w-md grid-cols-4 gap-x-4 gap-y-1 font-mono text-xs text-[#ece3d7]/60 sm:grid-cols-6">
            {Object.entries(MORSE).map(([k, v]) => (
              <span key={k}>
                <b className="text-[#d8aa67]">{k}</b> {v.replace(/\./g, '•').replace(/-/g, '—')}
              </span>
            ))}
          </div>
        )}
      </div>
      <form
        className="mx-auto mt-8 flex max-w-xs gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (word.length === 4 && !locked(status)) onSubmit(word)
        }}
      >
        <input
          value={word}
          onChange={(e) => setWord(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase())}
          aria-label="Decoded word, four letters"
          placeholder="????"
          inputMode="text"
          autoCapitalize="characters"
          className="w-full rounded-xl border border-[#d8aa67]/30 bg-[#020202] px-4 py-3 text-center font-mono text-xl tracking-[0.5em] text-[#f7f1e6] focus:border-[#d8aa67] focus:outline-none"
        />
        <Btn type="submit" disabled={word.length !== 4 || locked(status)} className="px-6">
          Send
        </Btn>
      </form>
      <Status status={status} />
    </div>
  )
}

/* ------------------------------------------------------------------ 5 */

function Missing({ chapter, onSubmit, status }: PuzzleProps) {
  const symbols = chapter.puzzle.symbols as ShapeName[]
  const grid = chapter.puzzle.grid as (ShapeName | null)[][]
  const [pick, setPick] = useState<ShapeName | null>(null)
  return (
    <div>
      <div className="mx-auto grid max-w-xs grid-cols-4 gap-2">
        {grid.flat().map((s, i) => (
          <div
            key={i}
            className={cn(
              'flex aspect-square items-center justify-center rounded-xl border',
              s === null ? 'border-dashed border-[#F0A35E]/70 bg-[#D9772B]/5' : 'border-[#d8aa67]/20 text-[#ece3d7]/80'
            )}
          >
            {s ? <Shape name={s} size={34} /> : pick ? <Shape name={pick} size={34} className="text-[#F0A35E]" /> : <span className="text-[#F0A35E]">?</span>}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-3" role="radiogroup" aria-label="Choose the missing symbol">
        {symbols.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={pick === s}
            aria-label={s}
            onClick={() => {
              if (locked(status)) return
              sfx.select()
              setPick(s)
            }}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-xl border transition-all',
              pick === s ? 'border-[#F0A35E] bg-[#D9772B]/15 text-[#F0A35E]' : 'border-[#d8aa67]/25 text-[#ece3d7]/70 hover:border-[#d8aa67]'
            )}
          >
            <Shape name={s} size={32} />
          </button>
        ))}
      </div>
      <Submit disabled={!pick || locked(status)} onClick={() => onSubmit(pick)} status={status} />
    </div>
  )
}

/* ------------------------------------------------------------------ 6 */

const TARGET = 0.64
const DEPTH_K = 150

function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Mote {
  x: number
  y: number
  z: number
}

function Anamorph({ onSubmit, status }: PuzzleProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [s, setS] = useState(0.15)
  const [word, setWord] = useState('')
  // The word is drawn here only to build the point cloud. Validation is server-side.
  const motes = useMemo<Mote[]>(() => {
    if (typeof document === 'undefined') return []
    const rnd = mulberry(7)
    const off = document.createElement('canvas')
    off.width = 360
    off.height = 140
    const c = off.getContext('2d')
    if (!c) return []
    c.fillStyle = '#fff'
    c.font = '900 130px system-ui, sans-serif'
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillText('SEE', 180, 74)
    const data = c.getImageData(0, 0, 360, 140).data
    const pts: Mote[] = []
    for (let y = 0; y < 140; y += 3) {
      for (let x = 0; x < 360; x += 3) {
        if (data[(y * 360 + x) * 4 + 3] > 128) pts.push({ x: x - 180, y: y - 70, z: rnd() * 2 - 1 })
      }
    }
    for (let i = 0; i < 700; i++) pts.push({ x: (rnd() - 0.5) * 520, y: (rnd() - 0.5) * 220, z: rnd() * 2 - 1 })
    return pts
  }, [])

  useEffect(() => {
    const el = canvas.current
    const c = el?.getContext('2d')
    if (!el || !c) return
    c.clearRect(0, 0, el.width, el.height)
    c.fillStyle = '#F0A35E'
    for (const m of motes) {
      const px = el.width / 2 + m.x * 1.1 + (s - TARGET) * DEPTH_K * m.z
      c.globalAlpha = 0.85
      c.fillRect(px, el.height / 2 + m.y * 1.1, 2, 2)
    }
  }, [s, motes])

  return (
    <div>
      <canvas
        ref={canvas}
        width={640}
        height={300}
        role="img"
        aria-label="A cloud of points. Move the slider to find the angle where they form a word."
        className="mx-auto w-full max-w-xl rounded-2xl border border-[#d8aa67]/20 bg-[#030303]"
      />
      <div className="mx-auto mt-6 max-w-xl">
        <label htmlFor="angle" className="mb-2 flex justify-between text-xs tracking-[0.14em] text-[#ece3d7]/50">
          <span>Left</span>
          <span>Your viewpoint</span>
          <span>Right</span>
        </label>
        <input
          id="angle"
          type="range"
          min={0}
          max={1}
          step={0.002}
          value={s}
          onChange={(e) => setS(Number(e.target.value))}
          className="w-full accent-[#d8aa67]"
        />
      </div>
      <form
        className="mx-auto mt-8 flex max-w-xs gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (word && !locked(status)) onSubmit(word)
        }}
      >
        <input
          value={word}
          onChange={(e) => setWord(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 12).toUpperCase())}
          aria-label="The word you see"
          placeholder="The word"
          className="w-full rounded-xl border border-[#d8aa67]/30 bg-[#020202] px-4 py-3 text-center font-mono text-lg tracking-[0.3em] text-[#f7f1e6] focus:border-[#d8aa67] focus:outline-none"
        />
        <Btn type="submit" disabled={!word || locked(status)} className="px-6">
          Send
        </Btn>
      </form>
      <Status status={status} />
    </div>
  )
}

/* ------------------------------------------------------------------ 7 */

const SHUFFLED = ['FEEL', 'WHAT', 'STILL', 'REFUSE', 'YOU', 'TO']

function Order({ chapter, onSubmit, status, held }: PuzzleProps) {
  const words = chapter.puzzle.words as string[]
  const [placed, setPlaced] = useState<string[]>([])
  const have = useMemo(() => {
    const s = new Set<string>()
    CHAPTERS.forEach((c) => held.includes(c.n) && words.includes(c.artifact.word) && s.add(c.artifact.word))
    return s
  }, [held, words])
  const missing = CHAPTERS.filter((c) => c.n < chapter.n && !held.includes(c.n))
  const pool = SHUFFLED.filter((w) => !placed.includes(w))

  return (
    <div>
      <div className="min-h-[3.5rem] rounded-2xl border border-dashed border-[#d8aa67]/30 p-3" aria-label="Your sentence">
        <div className="flex flex-wrap gap-2">
          {placed.length === 0 && <span className="px-2 py-2 text-sm text-[#ece3d7]/35">Tap the words in order…</span>}
          {placed.map((w) => (
            <button
              key={w}
              onClick={() => !locked(status) && setPlaced((p) => p.filter((x) => x !== w))}
              className="rounded-full border border-[#F0A35E]/60 bg-[#D9772B]/10 px-4 py-2 font-display text-sm tracking-[0.12em] text-[#f7f1e6]"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        {pool.map((w) => {
          const ok = have.has(w)
          return (
            <button
              key={w}
              disabled={!ok || locked(status)}
              onClick={() => {
                sfx.select()
                setPlaced((p) => [...p, w])
              }}
              className={cn(
                'rounded-full border px-5 py-2.5 font-display text-sm tracking-[0.12em] transition-colors',
                ok ? 'border-[#d8aa67]/40 text-[#ece3d7] hover:border-[#d8aa67]' : 'border-[#ece3d7]/10 text-[#ece3d7]/20'
              )}
            >
              {ok ? w : '▢▢▢▢'}
            </button>
          )
        })}
      </div>
      {missing.length > 0 && (
        <p className="mt-6 text-center text-sm text-[#ece3d7]/55">
          Some words are still waiting in earlier chapters:{' '}
          {missing.map((c, i) => (
            <span key={c.n}>
              {i > 0 && ', '}
              <Link href={exp(`/chapter/${c.n}`)} className="text-[#d8aa67] underline underline-offset-4">
                week {c.n}
              </Link>
            </span>
          ))}
          .
        </p>
      )}
      <Submit
        disabled={placed.length !== words.length || locked(status)}
        onClick={() => onSubmit(placed)}
        status={status}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ 8 */

function Phrase({ chapter, onSubmit, status, held }: PuzzleProps) {
  const prefix = chapter.puzzle.prefix as string[]
  const [word, setWord] = useState('')
  return (
    <div>
      <p className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center font-display text-[clamp(1.1rem,3.6vw,1.8rem)] tracking-[0.08em]">
        {prefix.map((w, i) => {
          const c = CHAPTERS.find((x) => x.n === i + 1)!
          return held.includes(c.n) ? (
            <span key={i} className="text-[#f7f1e6]">
              {w}
            </span>
          ) : (
            <Link key={i} href={exp(`/chapter/${c.n}`)} aria-label={`Word ${i + 1} is held in week ${c.n}`} className="text-[#ece3d7]/20 hover:text-[#d8aa67]">
              ▢▢▢
            </Link>
          )
        })}
        <span className="text-[#F0A35E]">{word || '＿＿＿'}</span>
      </p>
      <form
        className="mx-auto mt-10 flex max-w-xs gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (word && !locked(status)) onSubmit(word)
        }}
      >
        <input
          value={word}
          onChange={(e) => setWord(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 12).toUpperCase())}
          aria-label="The final word"
          placeholder="The last word"
          className="w-full rounded-xl border border-[#d8aa67]/30 bg-[#020202] px-4 py-3 text-center font-mono text-lg tracking-[0.3em] text-[#f7f1e6] focus:border-[#d8aa67] focus:outline-none"
        />
        <Btn type="submit" disabled={!word || locked(status)} className="px-6">
          Say it
        </Btn>
      </form>
      <Status status={status} />
    </div>
  )
}

/* ------------------------------------------------------------------ shared */

function Submit({ disabled, onClick, status }: { disabled: boolean; onClick: () => void; status: PuzzleStatus }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <Btn onClick={onClick} disabled={disabled} className="px-8">
        {status === 'checking' ? 'Checking…' : 'Submit'}
      </Btn>
      <Status status={status} />
    </div>
  )
}

function Status({ status }: { status: PuzzleStatus }) {
  return (
    <p role="status" aria-live="polite" className="mt-4 h-5 text-center text-sm text-[#F0A35E]">
      {status === 'wrong' ? 'Not yet. Look again.' : ''}
    </p>
  )
}
