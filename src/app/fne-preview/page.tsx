'use client'

import Link from 'next/link'
import { CAMPAIGN, CHAPTERS } from '@/lib/experience/campaign'
import { FOUNDING_UNTIL, useExperience } from '@/lib/experience/store'
import { TransmitText } from '@/components/experience/Motion'
import { exp } from '@/lib/experience/config'
import { Glyph } from '@/components/experience/Glyph'
import { RegisterForm } from '@/components/experience/RegisterForm'
import { BtnLink, Eyebrow, Panel, PreviewBadge } from '@/components/experience/ui'

const FORMULA = [
  ['The premiere', 'is the destination.'],
  ['The mystery', 'is the adventure.'],
  ['The album', 'is the payoff.'],
  ['The membership', 'is what remains.'],
]

const RECEIVE = [
  'Access to the exclusive cinematic album premiere.',
  'Entry into the eight-week interactive mystery.',
  'A personal ISIATA member profile and digital identity card.',
  'Weekly transmissions, challenges and unlocks.',
  'A place to collect artifacts and achievements.',
  'Eligibility for campaign bonus experiences.',
]

const LOOP = [
  ['The Transmission', 'A short cinematic opening that sets the week.'],
  ['The Discovery', 'Enter the world and investigate what changed.'],
  ['The Challenge', 'A puzzle you can solve by looking, listening and thinking.'],
  ['The Revelation', 'The answer, how it worked, and what it means.'],
  ['The Continuation', 'One unresolved detail that pulls you into next week.'],
]

export default function ExperienceLanding() {
  const { state, hydrated } = useExperience()
  const member = hydrated ? state.member : null

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 62%, rgba(217,119,43,0.22), transparent 70%), radial-gradient(ellipse 90% 60% at 50% 100%, rgba(216,170,103,0.1), transparent 70%)',
          }}
        />
        <div aria-hidden className="fne-door pointer-events-none absolute bottom-0 left-1/2 h-[58vh] w-[26vh] -translate-x-1/2" />
        <div className="relative z-10 flex max-w-3xl flex-col items-center">
          <div className="mb-8 flex items-center gap-3">
            <Eyebrow>ISIATA presents</Eyebrow>
            {state.preview && <PreviewBadge />}
          </div>
          <h1 className="font-display text-[clamp(2.6rem,10vw,6.5rem)] font-medium uppercase leading-[0.95] tracking-[0.06em] text-[#f7f1e6]">
            <TransmitText text="Feel" speed={120} delay={300} className="block" />
            <TransmitText text="No Evil" speed={120} delay={800} className="block" />
          </h1>
          <p className="mt-6 font-spaced text-xs uppercase tracking-[0.4em] text-[#d8aa67]/80">{CAMPAIGN.subtitle}</p>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-[#ece3d7]/75">
            An exclusive cinematic album premiere, and eight weeks of mystery to get you there. Something is waiting
            on the other side of a door. Every week, one more piece of it opens.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            {member ? (
              <BtnLink href={exp('/world')}>Enter {CAMPAIGN.hubName}</BtnLink>
            ) : (
              <BtnLink href="#join">Reserve your place</BtnLink>
            )}
            <BtnLink href="#how" variant="ghost">
              How it works
            </BtnLink>
          </div>
          <p className="mt-6 text-xs tracking-[0.14em] text-[#ece3d7]/40">Free to join · Premiere included</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <div className="space-y-5">
          {FORMULA.map(([a, b]) => (
            <p key={a} className="font-display text-[clamp(1.3rem,4.4vw,2.2rem)] tracking-[0.04em] text-[#ece3d7]/90">
              <span className="text-[#f7f1e6]">{a}</span> <span className="text-[#ece3d7]/50">{b}</span>
            </p>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <Eyebrow>What you receive</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-3xl tracking-[0.04em] text-[#f7f1e6] sm:text-4xl">
          Registration is the whole price of entry.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {RECEIVE.map((r) => (
            <li key={r} className="flex gap-4 rounded-xl border border-[#d8aa67]/15 bg-[#0A0A0A]/60 p-5 text-[#ece3d7]/80">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#d8aa67]" />
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#ece3d7]/55">
          You do not have to solve anything to see the premiere. Finishing the mystery unlocks extra layers: bonus
          scenes, hidden material, and more. Join late and the earlier chapters are still waiting.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>Every week</Eyebrow>
        <h2 className="mt-4 font-display text-3xl tracking-[0.04em] text-[#f7f1e6] sm:text-4xl">Five movements.</h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#d8aa67]/15 bg-[#d8aa67]/15 sm:grid-cols-5">
          {LOOP.map(([t, d], i) => (
            <li key={t} className="bg-[#050505] p-6">
              <span className="font-mono text-xs text-[#d8aa67]">0{i + 1}</span>
              <h3 className="mt-4 font-display text-lg tracking-[0.04em] text-[#f7f1e6]">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#ece3d7]/60">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>The eight revelations</Eyebrow>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CHAPTERS.map((c) => (
            <div key={c.n} className="group rounded-2xl border border-[#d8aa67]/15 p-6 text-center transition-colors duration-700 hover:border-[#d8aa67]/50">
              <Glyph name={c.glyph} size={44} className="mx-auto text-[#d8aa67]/70 transition-colors duration-700 group-hover:text-[#F0A35E]" />
              <p className="mt-5 font-mono text-[10px] tracking-[0.3em] text-[#ece3d7]/40">WEEK {c.n}</p>
              <p className="mt-1 font-display text-base tracking-[0.06em] text-[#ece3d7]">{c.theme}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="join" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-28">
        <Panel className="grid gap-12 p-8 sm:p-12 md:grid-cols-2">
          <div>
            <Eyebrow>Your membership</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-[0.04em] text-[#f7f1e6]">
              {member ? 'You are in.' : 'Cross the threshold.'}
            </h2>
            <p className="mt-5 leading-relaxed text-[#ece3d7]/70">
              Joining creates your permanent ISIATA identity. It outlasts this album. The music changes, the world
              changes, the mystery changes. The member remains.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[#ece3d7]/50">
              Members who join during this first campaign are recognized permanently as Founding Members. That
              status is never sold and never offered again.
            </p>
            <FoundingWindow />
          </div>
          <div>
            {member ? (
              <div className="space-y-4">
                <p className="text-[#ece3d7]/80">
                  Welcome back, <span className="text-[#f7f1e6]">{member.displayName}</span>.
                </p>
                <BtnLink href={exp('/world')} className="w-full">
                  Enter {CAMPAIGN.hubName}
                </BtnLink>
                <BtnLink href={exp('/card')} variant="ghost" className="w-full">
                  View your card
                </BtnLink>
              </div>
            ) : (
              <RegisterForm />
            )}
          </div>
        </Panel>
      </section>

      <footer className="px-6 pb-16 pt-6 text-center">
        <p className="font-spaced text-[11px] uppercase tracking-[0.3em] text-[#ece3d7]/35">Create and transform.</p>
        {member && (
          <p className="mt-3 text-xs text-[#ece3d7]/30">
            <Link href={exp('/world')} className="hover:text-[#ece3d7]/60">
              Return to {CAMPAIGN.hubName}
            </Link>
          </p>
        )}
      </footer>
    </>
  )
}

/** The founding window is real and closes for good: a reason not to wait. */
function FoundingWindow() {
  const days = Math.ceil((FOUNDING_UNTIL.getTime() - Date.now()) / 86_400_000)
  if (days <= 0) return null
  return (
    <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#F0A35E]/40 px-4 py-2">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F0A35E]" aria-hidden />
      <span className="font-mono text-[10px] tracking-[0.2em] text-[#F0A35E]">
        FOUNDING WINDOW CLOSES IN {days} {days === 1 ? 'DAY' : 'DAYS'}
      </span>
    </div>
  )
}
