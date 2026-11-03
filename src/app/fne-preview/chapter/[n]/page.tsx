'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CAMPAIGN, TOTAL_CHAPTERS, getChapter, isChapterReleased, chapterReleaseAt, liveChapterNow } from '@/lib/experience/campaign'
import { EXPERIENCE_API, exp } from '@/lib/experience/config'
import { POINTS, chapterResonance, levelFor, resonanceFor, useExperience } from '@/lib/experience/store'
import { haptic, sfx } from '@/components/experience/audio'
import { Ceremony } from '@/components/experience/Ceremony'
import { composition } from '@/components/experience/composition'
import { Glyph } from '@/components/experience/Glyph'
import { HudNav } from '@/components/experience/HudNav'
import { TransmitText } from '@/components/experience/Motion'
import { Puzzle, type PuzzleStatus } from '@/components/experience/Puzzles'
import { TransmissionPlayer } from '@/components/experience/TransmissionPlayer'
import { Btn, BtnLink, Eyebrow, Panel } from '@/components/experience/ui'
import { useMemberGuard } from '@/components/experience/useGuard'

const STEPS = ['Transmission', 'Discovery', 'Challenge', 'Revelation', 'Continuation'] as const
type Step = (typeof STEPS)[number]

async function check(chapter: number, answer: unknown, layer?: 'deeper') {
  const res = await fetch(`${EXPERIENCE_API}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapter, answer, layer }),
  })
  if (!res.ok) return false
  const data = (await res.json()) as { correct?: boolean }
  return !!data.correct
}

export default function ChapterPage() {
  const params = useParams<{ n: string }>()
  const n = Number(params.n)
  const chapter = Number.isInteger(n) ? getChapter(n) : undefined
  if (!chapter) notFound()

  const ok = useMemberGuard()
  const store = useExperience()
  const { state } = store
  const progress = state.chapters[n]
  const solved = state.artifacts.includes(n)
  const released = isChapterReleased(n, state.preview)
  const isLive = liveChapterNow() === n || (state.preview && state.simulateLive)

  const [step, setStep] = useState<Step>('Transmission')
  const [status, setStatus] = useState<PuzzleStatus>('idle')
  const [shake, setShake] = useState(0)
  const [initialised, setInitialised] = useState(false)
  const [ceremony, setCeremony] = useState<{ before: number } | null>(null)
  const beforeRef = useRef(0)

  useEffect(() => {
    if (!store.hydrated || initialised) return
    setStep(solved ? 'Revelation' : progress?.viewedAt ? 'Discovery' : 'Transmission')
    setInitialised(true)
  }, [store.hydrated, initialised, solved, progress?.viewedAt])

  // Weekly ritual (brief 5.2): being here during the live hour is its own mark.
  useEffect(() => {
    if (!store.hydrated || !state.member || !released || !isLive || state.live.includes(n)) return
    store.markLive(n)
    store.notify({ kind: 'mark', title: 'Present', line: `You were here for week ${n} as it premiered. +${POINTS.live} resonance.` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.hydrated, state.member, released, isLive, n])

  const submit = useCallback(
    async (answer: unknown) => {
      setStatus('checking')
      beforeRef.current = resonanceFor(state)
      store.recordAttempt(n)
      let correct = false
      try {
        correct = await check(n, answer)
      } catch {
        correct = false
      }
      if (correct) {
        setStatus('correct')
        store.markSolved(n)
        haptic(15)
        setTimeout(() => {
          setCeremony({ before: beforeRef.current })
          setStatus('idle')
        }, 600)
      } else {
        setStatus('wrong')
        setShake((s) => s + 1)
        sfx.wrong()
        haptic([40, 30, 40])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, state]
  )

  if (!ok) return null

  if (!released) {
    const at = chapterReleaseAt(n)
    return (
      <>
        <HudNav />
        <div className="mx-auto max-w-xl px-6 pt-40 text-center">
          <Glyph name={chapter.glyph} size={72} className="mx-auto text-[#ece3d7]/25" />
          <h1 className="mt-8 font-display text-3xl tracking-[0.06em] text-[#f7f1e6]">Not yet.</h1>
          <p className="mt-4 text-[#ece3d7]/60">
            Week {n} opens {at ? at.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'soon'}.
          </p>
          <BtnLink href={exp('/world')} variant="ghost" className="mt-10">
            Back to {CAMPAIGN.hubName}
          </BtnLink>
        </div>
      </>
    )
  }

  const hintsUsed = progress?.hintsUsed ?? 0
  const stepIndex = STEPS.indexOf(step)
  const reachable = (s: Step) => (STEPS.indexOf(s) <= 2 ? true : solved)
  const lines = chapterResonance(progress, n, state)
  const after = resonanceFor(state)
  const levelUp = ceremony && levelFor(ceremony.before).index < levelFor(after).index ? levelFor(after).name : null

  function go(s: Step) {
    sfx.tick()
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <HudNav />
      {ceremony && (
        <Ceremony
          chapter={chapter}
          lines={lines}
          levelUp={levelUp}
          onDone={() => {
            setCeremony(null)
            go('Revelation')
          }}
        />
      )}

      <div aria-hidden className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
        <Glyph name={chapter.glyph} size={720} strokeWidth={0.4} className="fne-orbit text-[#d8aa67]/[0.035]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 pb-32 pt-24 md:pb-24">
        <Link href={exp('/world')} className="text-xs tracking-[0.14em] text-[#ece3d7]/45 hover:text-[#ece3d7]">
          ← {CAMPAIGN.hubName}
        </Link>

        <header className="mt-8 flex items-center gap-5">
          <Glyph name={chapter.glyph} size={56} className={solved ? 'text-[#F0A35E]' : 'text-[#d8aa67]'} />
          <div>
            <Eyebrow>
              Week {n} of {TOTAL_CHAPTERS} · {chapter.theme}
              {isLive && <span className="ml-3 text-[#F0A35E]">● Live</span>}
            </Eyebrow>
            <TransmitText as="h1" text={chapter.title} className="mt-2 block font-display text-3xl tracking-[0.05em] text-[#f7f1e6] sm:text-4xl" />
          </div>
        </header>

        <nav aria-label="Chapter steps" className="relative mt-10 flex gap-1.5 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <button
              key={s}
              disabled={!reachable(s)}
              onClick={() => go(s)}
              aria-current={s === step ? 'step' : undefined}
              className={cn(
                'flex-1 whitespace-nowrap rounded-full border px-3 py-2 text-[11px] tracking-[0.14em] transition-all duration-500',
                s === step
                  ? 'border-[#F0A35E] bg-[#D9772B]/15 text-[#f7f1e6] shadow-[0_0_24px_rgba(217,119,43,0.25)]'
                  : i < stepIndex
                    ? 'border-[#d8aa67]/30 text-[#ece3d7]/70'
                    : 'border-[#ece3d7]/10 text-[#ece3d7]/35 disabled:cursor-not-allowed'
              )}
            >
              <span className="mr-1.5 font-mono text-[10px] opacity-60">0{i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </button>
          ))}
        </nav>

        <div key={step} className="fne-rise mt-8">
          {step === 'Transmission' && (
            <div>
              <TransmissionPlayer chapter={chapter} onDone={() => store.markViewed(n)} />
              <div className="mt-8 flex justify-end">
                <Btn
                  onClick={() => {
                    store.markViewed(n)
                    go('Discovery')
                  }}
                  variant={progress?.viewedAt ? 'primary' : 'ghost'}
                >
                  Enter the room
                </Btn>
              </div>
            </div>
          )}

          {step === 'Discovery' && <Discovery n={n} onNext={() => go('Challenge')} onBack={() => go('Transmission')} />}

          {step === 'Challenge' && (
            <div>
              <div key={shake} className={shake ? 'fne-shake' : undefined}>
                <Panel className="p-6 sm:p-9">
                  <p className="mb-8 text-center text-lg text-[#f7f1e6]">{chapter.challenge.prompt}</p>
                  <Puzzle chapter={chapter} onSubmit={submit} status={status} held={state.artifacts} />
                </Panel>
              </div>

              <div className="mt-6">
                {hintsUsed > 0 && (
                  <ol className="mb-4 space-y-2">
                    {chapter.challenge.hints.slice(0, hintsUsed).map((h, i) => (
                      <li key={i} className="fne-rise rounded-xl border border-[#d8aa67]/15 px-4 py-3 text-sm text-[#ece3d7]/70">
                        <span className="mr-2 font-mono text-xs text-[#d8aa67]">HINT {i + 1}</span>
                        {h}
                      </li>
                    ))}
                  </ol>
                )}
                <div className="flex items-center justify-between gap-3">
                  <Btn variant="ghost" onClick={() => go('Discovery')} className="px-5 py-2.5 text-xs">
                    Back to the room
                  </Btn>
                  {solved ? (
                    <Btn onClick={() => go('Revelation')} className="px-5 py-2.5 text-xs">
                      Revelation
                    </Btn>
                  ) : (
                    <Btn variant="ghost" onClick={() => store.takeHint(n)} disabled={hintsUsed >= 3} className="px-5 py-2.5 text-xs">
                      {hintsUsed >= 3 ? 'No more hints' : hintsUsed === 0 ? `Hint (−${POINTS.hintCost} resonance)` : 'Another hint'}
                    </Btn>
                  )}
                </div>
                {!solved && progress && progress.attempts === 0 && hintsUsed === 0 && (
                  <p className="mt-4 text-center text-xs text-[#ece3d7]/40">Solve it first try without a hint for Clear Sight: +{POINTS.clearSight}.</p>
                )}
              </div>
            </div>
          )}

          {step === 'Revelation' && solved && <Revelation n={n} onNext={() => go('Continuation')} />}

          {step === 'Continuation' && solved && (
            <div className="py-10 text-center">
              <TransmitText
                as="p"
                text={chapter.continuation}
                speed={34}
                className="block font-display text-[clamp(1.3rem,4vw,2rem)] leading-snug tracking-[0.04em] text-[#f7f1e6]"
              />
              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                {n < TOTAL_CHAPTERS ? (
                  <BtnLink href={isChapterReleased(n + 1, state.preview) ? exp(`/chapter/${n + 1}`) : exp('/world')}>
                    {isChapterReleased(n + 1, state.preview) ? `Week ${n + 1}` : `Back to ${CAMPAIGN.hubName}`}
                  </BtnLink>
                ) : (
                  <BtnLink href={exp('/premiere')}>Go to the premiere</BtnLink>
                )}
                <BtnLink href={exp('/world')} variant="ghost">
                  {CAMPAIGN.hubName}
                </BtnLink>
                <BtnLink href={exp('/grimoire')} variant="ghost">
                  {CAMPAIGN.collectionName.replace('The ', '')}
                </BtnLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Discovery({ n, onNext, onBack }: { n: number; onNext: () => void; onBack: () => void }) {
  const { state, markDiscovered, findSecret } = useExperience()
  const chapter = getChapter(n)!
  const progress = state.chapters[n]
  const allSeen = (progress?.discovered.length ?? 0) >= chapter.discovery.notes.length
  const [hidden, setHidden] = useState(false)

  return (
    <div>
      <p className="text-lg leading-relaxed text-[#ece3d7]/80">{chapter.discovery.intro}</p>
      <ul className="mt-8 space-y-3">
        {chapter.discovery.notes.map((note, i) => {
          const seen = progress?.discovered.includes(i)
          return (
            <li key={note.label}>
              <button
                onClick={() => {
                  if (!seen) sfx.select()
                  markDiscovered(n, i)
                }}
                aria-expanded={!!seen}
                className={cn(
                  'w-full rounded-2xl border p-5 text-left transition-all duration-500',
                  seen ? 'border-[#d8aa67]/40 bg-[#0A0A0A]' : 'border-[#d8aa67]/15 hover:-translate-y-0.5 hover:border-[#d8aa67]/50'
                )}
              >
                <span className="flex items-center gap-3 font-display tracking-[0.06em] text-[#f7f1e6]">
                  <span aria-hidden className={cn('h-1.5 w-1.5 rotate-45 transition-colors', seen ? 'bg-[#F0A35E]' : 'bg-[#d8aa67]/50')} />
                  {note.label}
                </span>
                {seen && <TransmitText as="span" text={note.text} speed={10} className="mt-3 block leading-relaxed text-[#ece3d7]/70" />}
              </button>
            </li>
          )
        })}
        {/* Secret: the room where things go missing has a fourth note, barely there. */}
        {n === 5 && allSeen && (
          <li>
            <button
              onClick={() => {
                setHidden(true)
                findSecret('absence')
              }}
              aria-label="An empty note"
              className={cn('w-full rounded-2xl border p-5 text-left transition-all duration-1000', hidden ? 'border-[#F0A35E]/50' : 'border-[#ece3d7]/[0.04] opacity-30 hover:opacity-70')}
            >
              <span className="font-display tracking-[0.06em] text-[#ece3d7]/40">…</span>
              {hidden && <span className="mt-3 block text-[#F0A35E]">What is missing is not empty. It is waiting to be named.</span>}
            </button>
          </li>
        )}
      </ul>
      {allSeen && <p className="fne-rise mt-6 text-center font-mono text-[10px] tracking-[0.25em] text-[#d8aa67]">ROOM EXPLORED · +{POINTS.discovery}</p>}
      <div className="mt-8 flex justify-between">
        <Btn variant="ghost" onClick={onBack}>
          Back
        </Btn>
        <Btn onClick={onNext}>The challenge</Btn>
      </div>
    </div>
  )
}

function Revelation({ n, onNext }: { n: number; onNext: () => void }) {
  const { state, findSecret, markDeeper, notify } = useExperience()
  const chapter = getChapter(n)!
  const [flipped, setFlipped] = useState(false)
  const [listening, setListening] = useState<'solo' | 'all' | null>(null)

  useEffect(() => () => composition.stop(), [])

  function listen(mode: 'solo' | 'all') {
    if (listening === mode) {
      composition.stop()
      setListening(null)
      return
    }
    composition.start(mode === 'solo' ? [n] : state.artifacts)
    composition.setLayers(mode === 'solo' ? [n] : state.artifacts)
    setListening(mode)
  }

  return (
    <div className="space-y-8">
      <div className="fne-sheen rounded-3xl border border-[#F0A35E]/40 bg-gradient-to-b from-[#D9772B]/10 to-transparent p-8 text-center sm:p-12">
        <Eyebrow>Artifact held</Eyebrow>
        <button
          onClick={() => {
            if (n !== 2) return
            setFlipped((f) => !f)
            findSecret('live')
          }}
          aria-label={n === 2 ? 'Turn the mirror' : chapter.artifact.name}
          className={cn('mx-auto mt-6 block transition-transform duration-1000', n === 2 ? 'cursor-pointer' : 'cursor-default', flipped && '[transform:scaleX(-1)]')}
        >
          <Glyph name={chapter.glyph} size={96} className="text-[#F0A35E] drop-shadow-[0_0_24px_rgba(240,163,94,0.5)]" strokeWidth={1.2} />
        </button>
        {n === 2 && flipped && <p className="fne-rise mt-3 font-display tracking-[0.4em] text-[#F0A35E]">EVIL ⟷ LIVE</p>}
        <h2 className="mt-6 font-display text-2xl tracking-[0.08em] text-[#f7f1e6]">{chapter.artifact.name}</h2>
        <p className="mx-auto mt-3 max-w-md text-[#ece3d7]/65">{chapter.artifact.description}</p>
        <p className="mt-8 font-mono text-xs tracking-[0.3em] text-[#d8aa67]">FRAGMENT {n} OF 8</p>
        <p className="mt-2 font-display text-4xl tracking-[0.2em] text-[#f7f1e6]">{chapter.artifact.word}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn variant={listening === 'solo' ? 'primary' : 'ghost'} onClick={() => listen('solo')} className="px-5 py-2.5 text-xs">
            {listening === 'solo' ? 'Stop' : `Hear the ${chapter.layer.toLowerCase()}`}
          </Btn>
          {state.artifacts.length > 1 && (
            <Btn variant={listening === 'all' ? 'primary' : 'ghost'} onClick={() => listen('all')} className="px-5 py-2.5 text-xs">
              {listening === 'all' ? 'Stop' : `With all ${state.artifacts.length} layers`}
            </Btn>
          )}
        </div>
      </div>

      <Panel className="divide-y divide-[#d8aa67]/10">
        <Block label="How it worked" text={chapter.revelation.how} />
        <Block label="The real world" tag="Fact" text={chapter.revelation.fact} />
        <Block label="The universe" tag="Lore" text={chapter.revelation.lore} />
      </Panel>

      <Deeper n={n} onSolved={() => notify({ kind: 'mark', title: 'The deeper layer', line: `You saw further than most. +${POINTS.deeper} resonance.` })} markDeeper={markDeeper} />

      <Contribute chapter={n} />

      <div className="flex justify-end">
        <Btn onClick={onNext}>Continue</Btn>
      </div>
    </div>
  )
}

/** Optional harder layer (brief 16). Never required for anything. */
function Deeper({ n, onSolved, markDeeper }: { n: number; onSolved: () => void; markDeeper: (n: number) => void }) {
  const { state } = useExperience()
  const chapter = getChapter(n)!
  const done = !!state.chapters[n]?.deeperAt
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'wrong'>('idle')

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (!answer.trim()) return
    setStatus('checking')
    const ok = await check(n, answer, 'deeper').catch(() => false)
    if (ok) {
      markDeeper(n)
      sfx.reveal()
      haptic([20, 50, 20])
      onSolved()
      setStatus('idle')
    } else {
      setStatus('wrong')
      sfx.wrong()
    }
  }

  return (
    <Panel className={cn('p-6 sm:p-8', done && 'border-[#F0A35E]/40')}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <Eyebrow>The deeper layer</Eyebrow>
          <p className="mt-2 text-sm text-[#ece3d7]/55">{done ? 'Held. You saw further than the room asked.' : `Optional. For those who want more. +${POINTS.deeper}`}</p>
        </div>
        {!done && !open && (
          <Btn variant="ghost" onClick={() => setOpen(true)} className="shrink-0 px-5 py-2 text-xs">
            Go deeper
          </Btn>
        )}
        {done && <Glyph name="void" size={32} className="text-[#F0A35E]" />}
      </div>
      {open && !done && (
        <form onSubmit={send} className="fne-rise mt-6">
          <p className="leading-relaxed text-[#f7f1e6]">{chapter.deeper.prompt}</p>
          <div className="mt-4 flex gap-3">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value.slice(0, 40))}
              placeholder={chapter.deeper.placeholder}
              aria-label="Your answer to the deeper layer"
              className="w-full rounded-xl border border-[#d8aa67]/30 bg-[#020202] px-4 py-3 text-[#f7f1e6] focus:border-[#d8aa67] focus:outline-none"
            />
            <Btn type="submit" disabled={status === 'checking' || !answer.trim()} className="shrink-0 px-6">
              {status === 'checking' ? '…' : 'Send'}
            </Btn>
          </div>
          <p role="status" className="mt-3 h-5 text-sm text-[#F0A35E]">
            {status === 'wrong' ? 'Not that. Look again.' : ''}
          </p>
        </form>
      )}
    </Panel>
  )
}

function Block({ label, text, tag }: { label: string; text: string; tag?: string }) {
  return (
    <div className="p-6 sm:p-8">
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-[#d8aa67]">
        {label.toUpperCase()}
        {tag && <span className="rounded-full border border-[#d8aa67]/40 px-2 py-0.5 text-[9px]">{tag.toUpperCase()}</span>}
      </p>
      <p className="mt-3 leading-relaxed text-[#ece3d7]/80">{text}</p>
    </div>
  )
}

/** Audience contribution (brief 7.2). Held for moderation, never shown publicly until approved. */
function Contribute({ chapter }: { chapter: number }) {
  const { state, addContribution } = useExperience()
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const already = state.contributions.some((c) => c.chapter === chapter)

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (text.trim().length < 2) return
    addContribution(chapter, text)
    setSent(true)
    sfx.select()
    try {
      await fetch(`${EXPERIENCE_API}/contribute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapter, text }),
      })
    } catch {
      /* kept locally */
    }
  }

  return (
    <Panel className="p-6 sm:p-8">
      <Eyebrow>Leave something behind</Eyebrow>
      {sent || already ? (
        <p className="mt-4 text-[#ece3d7]/70">
          Received. Selected contributions may appear in the final premiere or the archive. Nothing is shown publicly
          until it has been reviewed.
        </p>
      ) : (
        <form onSubmit={send} className="mt-4">
          <label htmlFor="contrib" className="text-[#ece3d7]/75">
            One word or one sentence: what did this chapter make you notice? <span className="text-[#d8aa67]">+{POINTS.contribution}</span>
          </label>
          <textarea
            id="contrib"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 280))}
            rows={2}
            className="mt-3 w-full rounded-xl border border-[#d8aa67]/25 bg-[#020202] p-4 text-[#ece3d7] focus:border-[#d8aa67] focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-xs text-[#ece3d7]/35">{text.length}/280</span>
            <Btn type="submit" variant="ghost" disabled={text.trim().length < 2} className="px-5 py-2 text-xs">
              Send
            </Btn>
          </div>
        </form>
      )}
    </Panel>
  )
}
