'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  CAMPAIGN,
  CHAPTERS,
  SECRETS,
  TOTAL_CHAPTERS,
  chapterReleaseAt,
  isChapterReleased,
  liveChapterNow,
  nextTransmission,
} from '@/lib/experience/campaign'
import { exp } from '@/lib/experience/config'
import { communityProgress, levelFor, resonanceFor, streakFor, useExperience } from '@/lib/experience/store'
import { CompositionPlayer } from '@/components/experience/CompositionPlayer'
import { Glyph } from '@/components/experience/Glyph'
import { HudNav } from '@/components/experience/HudNav'
import { TransmitText, useCountUp } from '@/components/experience/Motion'
import { Onboarding } from '@/components/experience/Onboarding'
import { ThresholdScene } from '@/components/experience/ThresholdScene'
import { BtnLink, Eyebrow, Panel } from '@/components/experience/ui'
import { useMemberGuard } from '@/components/experience/useGuard'

const STILLNESS_MS = 30_000

function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(id)
  }, [ms])
  return now
}

function until(at: Date, now: number) {
  const d = Math.max(0, at.getTime() - now)
  const days = Math.floor(d / 86_400_000)
  const h = Math.floor((d / 3_600_000) % 24)
  const m = Math.floor((d / 60_000) % 60)
  const s = Math.floor((d / 1000) % 60)
  return days > 0 ? `${days}d ${h}h ${m}m` : `${h}h ${m}m ${String(s).padStart(2, '0')}s`
}

export default function WorldPage() {
  const ok = useMemberGuard()
  const ex = useExperience()
  const { state } = ex
  const now = useNow()
  const [still, setStill] = useState(false)
  const whispered = useRef(false)

  const solved = state.artifacts
  const nextChapter = CHAPTERS.find((c) => !solved.includes(c.n) && isChapterReleased(c.n, state.preview))?.n ?? null
  const liveChapter = liveChapterNow() ?? (state.preview && state.simulateLive ? (nextChapter ?? TOTAL_CHAPTERS) : null)
  const upcoming = nextTransmission()

  // Surprise events (brief 7.2): one whisper per visit, for a room solved a while ago.
  useEffect(() => {
    if (!ex.hydrated || !state.member || whispered.current || !state.introSeen) return
    const delay = state.preview ? 60_000 : 10 * 60_000
    const due = CHAPTERS.find((c) => {
      const at = state.chapters[c.n]?.solvedAt
      return at && !state.whispersSeen.includes(c.n) && Date.now() - new Date(at).getTime() > delay
    })
    if (!due) return
    whispered.current = true
    const t = setTimeout(() => {
      ex.notify({ kind: 'whisper', title: `Something changed in week ${due.n}`, line: due.whisper })
      ex.seeWhisper(due.n)
    }, 2500)
    return () => clearTimeout(t)
    // run once per visit when the profile is loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.hydrated, state.member, state.introSeen])

  // Secret: stand in the Threshold and do nothing at all.
  useEffect(() => {
    if (!ex.hydrated || !state.introSeen) return
    let t: ReturnType<typeof setTimeout>
    const arm = () => {
      clearTimeout(t)
      setStill(false)
      t = setTimeout(() => {
        setStill(true)
        ex.findSecret('silence')
      }, STILLNESS_MS)
    }
    const evts = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'] as const
    evts.forEach((e) => window.addEventListener(e, arm, { passive: true }))
    arm()
    return () => {
      clearTimeout(t)
      evts.forEach((e) => window.removeEventListener(e, arm))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.hydrated, state.introSeen])

  const points = resonanceFor(state)
  const shown = useCountUp(points, 1600)
  const level = levelFor(points)
  const streak = streakFor(state)

  if (!ok || !state.member) return null

  const community = communityProgress(solved.length)
  const allDone = solved.length === TOTAL_CHAPTERS

  return (
    <>
      <HudNav />
      {!state.introSeen && <Onboarding />}

      <div className="mx-auto max-w-6xl px-4 pb-32 pt-20 sm:px-6 md:pb-24">
        {liveChapter && (
          <Link
            href={exp(`/chapter/${liveChapter}`)}
            className="fne-rise mb-6 flex items-center justify-between gap-4 rounded-2xl border border-[#F0A35E]/60 bg-[#D9772B]/10 px-5 py-4 shadow-[0_0_40px_rgba(217,119,43,0.2)]"
          >
            <span className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F0A35E] opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F0A35E]" />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-[0.3em] text-[#F0A35E]">LIVE NOW</span>
                <span className="block text-sm text-[#f7f1e6]">Week {liveChapter} is premiering. Be present: it only happens once.</span>
              </span>
            </span>
            <span className="shrink-0 text-xs tracking-[0.14em] text-[#f7f1e6]">Enter →</span>
          </Link>
        )}

        <div className="px-2 text-center sm:px-0">
          <Eyebrow>{CAMPAIGN.name}</Eyebrow>
          <TransmitText as="h1" text={CAMPAIGN.hubName} className="mt-3 block font-display text-3xl tracking-[0.08em] text-[#f7f1e6] sm:text-4xl" />
          <p className={cn('mx-auto mt-3 max-w-lg text-sm leading-relaxed transition-colors duration-[2000ms]', still ? 'text-[#F0A35E]' : 'text-[#ece3d7]/60')}>
            {still
              ? 'You stopped looking for it. That is when it appeared.'
              : allDone
                ? 'Every artifact is held. The door is open.'
                : solved.length === 0
                  ? 'A door stands in the dark. Eight objects wait around it. Choose one.'
                  : 'The door opens a little more with every revelation.'}
          </p>
        </div>

        <div className={cn('mt-6 transition-[filter] duration-[3000ms]', still && 'brightness-125')}>
          <ThresholdScene solved={solved} preview={state.preview} nextChapter={nextChapter} liveChapter={liveChapter} />
        </div>

        <div className="mt-2 flex flex-col items-center gap-5 text-center">
          {nextChapter ? (
            <BtnLink href={exp(`/chapter/${nextChapter}`)}>{solved.length === 0 ? 'Begin week 1' : `Continue to week ${nextChapter}`}</BtnLink>
          ) : (
            <BtnLink href={exp('/premiere')}>{allDone ? 'Go to the premiere' : 'Premiere details'}</BtnLink>
          )}
          <CompositionPlayer variant="mini" />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Panel className="p-7">
            <Eyebrow>Resonance</Eyebrow>
            <p className="mt-4 font-display text-5xl tabular-nums text-[#f7f1e6]">{shown}</p>
            <p className="mt-1 text-sm text-[#F0A35E]">{level.name}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#ece3d7]/10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#d8aa67] to-[#F0A35E] transition-all duration-1000" style={{ width: `${level.pct}%` }} />
            </div>
            <p className="mt-3 text-xs text-[#ece3d7]/45">{level.next ? `${level.toNext} to ${level.next}` : 'The highest recognition.'}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#d8aa67]/10 pt-5 text-center">
              <div>
                <p className="font-display text-2xl text-[#f7f1e6]">{streak}</p>
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#ece3d7]/40">RETURN STREAK</p>
              </div>
              <div>
                <p className="font-display text-2xl text-[#f7f1e6]">
                  {state.secrets.length}/{SECRETS.length}
                </p>
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#ece3d7]/40">SECRETS</p>
              </div>
            </div>
          </Panel>

          <Panel className="p-7">
            <Eyebrow>{upcoming ? 'Next transmission' : 'Weekly transmission'}</Eyebrow>
            {upcoming ? (
              <>
                <p className="mt-4 font-display text-3xl tabular-nums text-[#f7f1e6]">{until(upcoming.at, now)}</p>
                <p className="mt-2 text-sm text-[#ece3d7]/55">
                  Week {upcoming.n} premieres live{' '}
                  {upcoming.at.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit' })}. Be there for it and it counts.
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-[#ece3d7]/60">
                Each chapter premieres live at the same hour every week. Members who are present earn a mark only the live
                hour gives. Missed it? The room stays open.
              </p>
            )}
            {state.preview && (
              <label className="mt-5 flex items-center gap-3 text-xs text-[#ece3d7]/50">
                <input type="checkbox" checked={state.simulateLive} onChange={(e) => ex.setSimulateLive(e.target.checked)} className="accent-[#d8aa67]" />
                Preview: simulate the live hour
              </label>
            )}
            {CAMPAIGN.startAt !== '' && (
              <label className="mt-3 flex items-center gap-3 text-xs text-[#ece3d7]/50">
                <input type="checkbox" checked={state.preview} onChange={(e) => ex.setPreview(e.target.checked)} className="accent-[#d8aa67]" />
                Preview: open every chapter
              </label>
            )}
          </Panel>

          <Panel className="p-7">
            <Eyebrow>Shared progress</Eyebrow>
            <p className="mt-4 font-display text-5xl text-[#f7f1e6]">{Math.floor(community.pct)}%</p>
            <div
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#ece3d7]/10"
              role="progressbar"
              aria-valuenow={Math.floor(community.pct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Community progress"
            >
              <div className="h-full rounded-full bg-gradient-to-r from-[#d8aa67] to-[#F0A35E] transition-all duration-1000" style={{ width: `${community.pct}%` }} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#ece3d7]/55">
              Every revelation anyone holds moves this forward. At 100%, a collective unlock opens for everyone.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F0A35E]/70">Simulated in preview</p>
          </Panel>
        </div>

        <Panel className="mt-6 p-7">
          <Eyebrow>The chapters</Eyebrow>
          <ul className="mt-4 grid divide-y divide-[#d8aa67]/10 md:grid-cols-2 md:gap-x-10 md:divide-y-0">
            {CHAPTERS.map((c) => {
              const held = solved.includes(c.n)
              const open = isChapterReleased(c.n, state.preview)
              const at = chapterReleaseAt(c.n)
              const deeper = !!state.chapters[c.n]?.deeperAt
              const row = (
                <div className="flex items-center gap-4 py-3.5 md:border-b md:border-[#d8aa67]/10">
                  <Glyph name={c.glyph} size={28} className={held ? 'text-[#F0A35E]' : open ? 'text-[#ece3d7]/80' : 'text-[#ece3d7]/25'} />
                  <div className="min-w-0 flex-1">
                    <p className={open ? 'text-[#f7f1e6]' : 'text-[#ece3d7]/40'}>
                      <span className="mr-3 font-mono text-xs text-[#ece3d7]/40">0{c.n}</span>
                      {c.title}
                    </p>
                    <p className="text-xs text-[#ece3d7]/40">
                      {c.theme}
                      {deeper && ' · Deeper layer held'}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.18em] text-[#d8aa67]">
                    {liveChapter === c.n ? '● LIVE' : held ? 'HELD' : open ? 'OPEN' : at ? at.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() : 'SOON'}
                  </span>
                </div>
              )
              return (
                <li key={c.n}>
                  {open ? (
                    <Link href={exp(`/chapter/${c.n}`)} className="block transition-colors hover:bg-[#d8aa67]/5">
                      {row}
                    </Link>
                  ) : (
                    row
                  )}
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>
    </>
  )
}
