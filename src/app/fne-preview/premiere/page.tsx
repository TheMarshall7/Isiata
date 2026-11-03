'use client'

import { useEffect, useState } from 'react'
import { CAMPAIGN, TOTAL_CHAPTERS } from '@/lib/experience/campaign'
import { exp } from '@/lib/experience/config'
import { useExperience } from '@/lib/experience/store'
import { HudNav } from '@/components/experience/HudNav'
import { Btn, BtnLink, Eyebrow, Panel } from '@/components/experience/ui'
import { PremierePass, downloadPremiereIcs } from '@/components/experience/PremierePass'
import { TransmitText } from '@/components/experience/Motion'
import { useMemberGuard } from '@/components/experience/useGuard'

const INCLUDES = [
  'A short film and cinematic storytelling',
  'The album, performed inside a designed environment',
  'Artifacts you collected, carried into the show',
  'Audience contributions, selected and reviewed',
  'A final revelation',
]

function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    if (!iso) return
    const target = new Date(iso).getTime()
    if (Number.isNaN(target)) return
    const tick = () => setLeft(Math.max(0, target - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [iso])
  return left
}

export default function PremierePage() {
  const ok = useMemberGuard()
  const { state } = useExperience()
  const left = useCountdown(CAMPAIGN.premiere.at)
  if (!ok || !state.member) return null

  const held = state.artifacts.length
  const bonus = held === TOTAL_CHAPTERS
  const parts =
    left === null
      ? null
      : [
          ['days', Math.floor(left / 86_400_000)],
          ['hours', Math.floor((left / 3_600_000) % 24)],
          ['min', Math.floor((left / 60_000) % 60)],
          ['sec', Math.floor((left / 1000) % 60)],
        ]

  return (
    <>
      <HudNav />
      <div className="mx-auto max-w-4xl px-5 pb-32 pt-24 md:pb-24">
        <div className="text-center">
          <Eyebrow>The destination</Eyebrow>
          <TransmitText as="h1" text="The Premiere" className="mt-4 block font-display text-4xl tracking-[0.06em] text-[#f7f1e6] sm:text-6xl" />
          <p className="mx-auto mt-5 max-w-xl text-[#ece3d7]/65">
            A cinematic live debut of <span className="text-[#f7f1e6]">{CAMPAIGN.name}</span>, about{' '}
            {CAMPAIGN.premiere.runtime}.
          </p>
        </div>

        <Panel className="mt-12 p-8 text-center sm:p-12">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#F0A35E]">YOUR PLACE IS CONFIRMED</p>
          <p className="mt-3 text-[#ece3d7]/70">
            {state.member.displayName}, premiere access is part of your membership. You never have to solve anything
            to attend.
          </p>
          {parts ? (
            <div className="mt-10 grid grid-cols-4 gap-3" role="timer" aria-label="Time until the premiere">
              {parts.map(([label, v]) => (
                <div key={label as string}>
                  <p className="font-display text-4xl tabular-nums text-[#f7f1e6] sm:text-6xl">{String(v).padStart(2, '0')}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-[#ece3d7]/40">{(label as string).toUpperCase()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-10 font-display text-2xl tracking-[0.08em] text-[#ece3d7]/80">Date to be announced</p>
          )}
        </Panel>

        <div className="mt-10">
          <PremierePass state={state} />
          <div className="mt-5 flex justify-center">
            <Btn variant="ghost" onClick={downloadPremiereIcs} disabled={!CAMPAIGN.premiere.at} className="px-5 py-2.5 text-xs">
              {CAMPAIGN.premiere.at ? 'Add to calendar' : 'Calendar link arrives with the date'}
            </Btn>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Panel className="p-7">
            <Eyebrow>What to expect</Eyebrow>
            <ul className="mt-4 space-y-3">
              {INCLUDES.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-[#ece3d7]/75">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#d8aa67]" />
                  {i}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-7">
            <Eyebrow>The hidden layer</Eyebrow>
            <p className="mt-4 text-sm leading-relaxed text-[#ece3d7]/65">
              Holding all eight revelations unlocks extra material: bonus scenes, hidden story and a post-show
              experience.
            </p>
            <p className="mt-5 font-display text-2xl tracking-[0.08em] text-[#f7f1e6]">
              {bonus ? 'Unlocked' : `${held} of ${TOTAL_CHAPTERS} held`}
            </p>
            {!bonus && (
              <BtnLink href={exp('/world')} variant="ghost" className="mt-5 px-5 py-2.5 text-xs">
                Continue the mystery
              </BtnLink>
            )}
          </Panel>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-[#ece3d7]/40">
          The premiere is delivered separately from the interactive world. If anything in the world is unavailable,
          you can still watch.
        </p>
      </div>
    </>
  )
}
