'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CAMPAIGN, CHAPTERS, SECRETS, TOTAL_CHAPTERS, isChapterReleased } from '@/lib/experience/campaign'
import { exp } from '@/lib/experience/config'
import { achievementsFor, useExperience } from '@/lib/experience/store'
import { CompositionPlayer } from '@/components/experience/CompositionPlayer'
import { Glyph } from '@/components/experience/Glyph'
import { PremierePass } from '@/components/experience/PremierePass'
import { TransmitText } from '@/components/experience/Motion'
import { HudNav } from '@/components/experience/HudNav'
import { BtnLink, Eyebrow, Panel } from '@/components/experience/ui'
import { useMemberGuard } from '@/components/experience/useGuard'

/**
 * The personal archive: artifacts, the eight-piece sentence, solved history,
 * contributions. Each future campaign adds a section here (brief 6.4).
 */
export default function GrimoirePage() {
  const ok = useMemberGuard()
  const { state } = useExperience()
  if (!ok || !state.member) return null

  const held = state.artifacts
  const full = held.length === TOTAL_CHAPTERS
  const earned = achievementsFor(state).filter((a) => a.earned)

  return (
    <>
      <HudNav />
      <div className="mx-auto max-w-5xl px-5 pb-32 pt-24 md:pb-24">
        <Eyebrow>{CAMPAIGN.name}</Eyebrow>
        <TransmitText as="h1" text={CAMPAIGN.collectionName} className="mt-3 block font-display text-4xl tracking-[0.06em] text-[#f7f1e6]" />
        <p className="mt-4 max-w-xl text-[#ece3d7]/60">
          Everything you have found, in one place. It keeps your whole journey, and it grows with every release.
        </p>

        <section className="mt-12" aria-label="Artifacts">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CHAPTERS.map((c) => {
              const has = held.includes(c.n)
              const open = isChapterReleased(c.n, state.preview)
              const inner = (
                <div
                  className={cn(
                    'flex h-full flex-col items-center rounded-2xl border p-5 text-center transition-all duration-500',
                    has
                      ? 'fne-sheen border-[#F0A35E]/50 bg-gradient-to-b from-[#D9772B]/10 to-transparent hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(217,119,43,0.2)]'
                      : 'border-[#ece3d7]/10 hover:border-[#d8aa67]/30'
                  )}
                >
                  <Glyph name={c.glyph} size={52} className={has ? 'text-[#F0A35E]' : 'text-[#ece3d7]/15'} />
                  <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-[#ece3d7]/40">WEEK {c.n}</p>
                  <p className={cn('mt-1 font-display text-sm tracking-[0.06em]', has ? 'text-[#f7f1e6]' : 'text-[#ece3d7]/30')}>
                    {has ? c.artifact.name : '???'}
                  </p>
                  <p className="mt-2 font-display text-lg tracking-[0.2em] text-[#d8aa67]">{has ? c.artifact.word : '▢▢▢'}</p>
                </div>
              )
              return open ? (
                <Link key={c.n} href={exp(`/chapter/${c.n}`)} aria-label={`Week ${c.n}: ${has ? c.artifact.name : 'not yet held'}`}>
                  {inner}
                </Link>
              ) : (
                <div key={c.n} aria-label={`Week ${c.n}: not yet released`}>
                  {inner}
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-16" aria-label="The sentence">
          <Panel className="p-8 text-center sm:p-12">
            <Eyebrow>The sentence</Eyebrow>
            <p className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-3 font-display text-[clamp(1.1rem,3.6vw,1.9rem)] tracking-[0.08em]">
              {CAMPAIGN.finalPhrase.map((w, i) => (
                <span key={i} className={held.includes(i + 1) ? (full ? 'text-[#F0A35E]' : 'text-[#f7f1e6]') : 'text-[#ece3d7]/15'}>
                  {held.includes(i + 1) ? w : '▢▢▢'}
                </span>
              ))}
            </p>
            <p className="mt-8 text-sm text-[#ece3d7]/45">
              {full ? 'Complete. It was never about evil.' : `${held.length} of ${TOTAL_CHAPTERS} words held. Each chapter gives one back.`}
            </p>
          </Panel>
        </section>

        <section className="mt-16" aria-label="Your composition">
          <Eyebrow>The composition</Eyebrow>
          <h2 className="mt-3 font-display text-2xl tracking-[0.06em] text-[#f7f1e6]">Every artifact is a sound</h2>
          <p className="mt-2 max-w-xl text-sm text-[#ece3d7]/55">Each revelation you hold adds one layer. Hold all eight and you hear the whole piece.</p>
          <div className="mt-6">
            <CompositionPlayer />
          </div>
        </section>

        <section className="mt-16" aria-label="Secrets">
          <Eyebrow>Secrets</Eyebrow>
          <h2 className="mt-3 font-display text-2xl tracking-[0.06em] text-[#f7f1e6]">
            {state.secrets.length} of {SECRETS.length} found
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#ece3d7]/55">Never required. Hidden in the world itself, for people who pay attention.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SECRETS.map((sec) => {
              const found = state.secrets.includes(sec.id)
              return (
                <li
                  key={sec.id}
                  className={cn('flex items-start gap-4 rounded-2xl border p-5 transition-all duration-700', found ? 'border-[#F0A35E]/50 bg-[#D9772B]/5' : 'border-[#ece3d7]/10')}
                >
                  <Glyph name="void" size={26} className={found ? 'shrink-0 text-[#F0A35E]' : 'shrink-0 text-[#ece3d7]/20'} />
                  <span className="text-sm">
                    <span className={found ? 'block text-[#f7f1e6]' : 'block text-[#ece3d7]/60'}>{found ? sec.found : sec.clue}</span>
                    <span className="mt-1 block font-mono text-[9px] tracking-[0.2em] text-[#ece3d7]/35">{found ? 'FOUND' : 'A CLUE'}</span>
                  </span>
                </li>
              )
            })}
          </ul>
          {state.secrets.length === SECRETS.length && (
            <Link
              href={exp('/hidden')}
              className="fne-rise mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[#F0A35E]/70 bg-gradient-to-r from-[#D9772B]/20 to-transparent p-6 shadow-[0_0_50px_rgba(217,119,43,0.25)]"
            >
              <span>
                <span className="block font-mono text-[10px] tracking-[0.3em] text-[#F0A35E]">A DOOR THAT WAS NOT THERE BEFORE</span>
                <span className="mt-1 block font-display text-xl tracking-[0.06em] text-[#f7f1e6]">
                  {state.hiddenRoomAt ? 'Return to the hidden room' : 'Enter the hidden room'}
                </span>
              </span>
              <Glyph name="threshold" size={40} className="text-[#F0A35E]" />
            </Link>
          )}
        </section>

        <section className="mt-16" aria-label="Premiere pass">
          <Eyebrow>Premiere pass</Eyebrow>
          <div className="mt-6">
            <PremierePass state={state} />
          </div>
        </section>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Panel className="p-7">
            <Eyebrow>Your history</Eyebrow>
            {held.length === 0 ? (
              <p className="mt-4 text-sm text-[#ece3d7]/50">Nothing yet. The first door is waiting.</p>
            ) : (
              <ul className="mt-4 divide-y divide-[#d8aa67]/10">
                {CHAPTERS.filter((c) => held.includes(c.n)).map((c) => {
                  const p = state.chapters[c.n]
                  return (
                    <li key={c.n} className="flex items-center justify-between gap-3 py-3 text-sm">
                      <span className="text-[#ece3d7]">
                        <span className="mr-3 font-mono text-xs text-[#ece3d7]/40">0{c.n}</span>
                        {c.title}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-[#ece3d7]/40">
                        {p?.solvedAt ? new Date(p.solvedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() : ''}
                        {p && p.hintsUsed > 0 ? ` · ${p.hintsUsed} HINT${p.hintsUsed > 1 ? 'S' : ''}` : ''}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </Panel>

          <Panel className="p-7">
            <Eyebrow>Marks</Eyebrow>
            {earned.length === 0 ? (
              <p className="mt-4 text-sm text-[#ece3d7]/50">None earned yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {earned.map((a) => (
                  <li key={a.id}>
                    <p className="text-[#f7f1e6]">{a.title}</p>
                    <p className="text-sm text-[#ece3d7]/50">{a.line}</p>
                  </li>
                ))}
              </ul>
            )}
            <BtnLink href={exp('/card')} variant="ghost" className="mt-6 px-5 py-2.5 text-xs">
              Share your marks
            </BtnLink>
          </Panel>
        </div>

        {state.contributions.length > 0 && (
          <Panel className="mt-6 p-7">
            <Eyebrow>What you left behind</Eyebrow>
            <ul className="mt-4 space-y-3 text-sm">
              {state.contributions.map((c) => (
                <li key={c.id} className="flex justify-between gap-4">
                  <span className="text-[#ece3d7]/80">“{c.text}”</span>
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-[#d8aa67]">
                    WEEK {c.chapter} · {c.status.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </div>
    </>
  )
}
