'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CAMPAIGN } from '@/lib/experience/campaign'
import { EXPERIENCE_API, exp } from '@/lib/experience/config'
import { useExperience } from '@/lib/experience/store'
import { AchievementCards } from '@/components/experience/AchievementCards'
import { HudNav } from '@/components/experience/HudNav'
import { MemberCard } from '@/components/experience/MemberCard'
import { BtnLink, Eyebrow, Panel } from '@/components/experience/ui'
import { useMemberGuard } from '@/components/experience/useGuard'

/** Planned benefits (brief 10.4). Nothing is promised until the process exists. */
const BENEFITS = [
  ['Concerts', 'Presales, early access, member discounts'],
  ['Merchandise', 'Member pricing and early drops'],
  ['Music', 'Early listening and bonus versions'],
  ['Experiences', 'Album worlds, transmissions, the archive'],
  ['Recognition', 'Achievements and Founding status'],
]

function CardView() {
  const ok = useMemberGuard()
  const { state } = useExperience()
  const params = useSearchParams()
  const isNew = params.get('new') === '1'
  const [wallet, setWallet] = useState<{ available: boolean; reason?: string } | null>(null)

  useEffect(() => {
    fetch(`${EXPERIENCE_API}/wallet`)
      .then((r) => r.json())
      .then(setWallet)
      .catch(() => setWallet({ available: false, reason: 'Wallet status unavailable.' }))
  }, [])

  if (!ok || !state.member) return null
  const m = state.member

  return (
    <>
      <HudNav />
      <div className="mx-auto max-w-5xl px-6 pb-32 pt-28 md:pb-24">
        <div className="text-center">
          <Eyebrow>{isNew ? 'Welcome' : 'Your identity'}</Eyebrow>
          <h1 className="mt-4 font-display text-3xl tracking-[0.06em] text-[#f7f1e6] sm:text-5xl">
            {isNew ? 'You have crossed.' : 'Your ISIATA card'}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[#ece3d7]/65">
            This card is permanent. It stays with you through every future album, concert and release.
            {m.founding && ' You joined during the first campaign, so Founding Member status is yours for good.'}
          </p>
        </div>

        <div className="mt-14">
          <MemberCard member={m} state={state} />
        </div>

        {isNew && (
          <div className="mt-12 flex justify-center">
            <BtnLink href={exp('/world')}>Enter {CAMPAIGN.hubName}</BtnLink>
          </div>
        )}

        <div className="mt-24 grid gap-6 md:grid-cols-2">
          <Panel className="p-8">
            <Eyebrow>Apple Wallet · Google Wallet</Eyebrow>
            <p className="mt-4 text-[#ece3d7]/70">
              Your card is built to become a Wallet pass: your member number is the pass serial and the seal on the
              back becomes its barcode.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button disabled className="rounded-full border border-[#ece3d7]/15 px-5 py-3 text-xs tracking-[0.1em] text-[#ece3d7]/40">
                Add to Apple Wallet
              </button>
              <button disabled className="rounded-full border border-[#ece3d7]/15 px-5 py-3 text-xs tracking-[0.1em] text-[#ece3d7]/40">
                Add to Google Wallet
              </button>
            </div>
            <p className="mt-4 text-xs text-[#ece3d7]/40">
              {wallet?.available ? 'Wallet passes are available.' : (wallet?.reason ?? 'Checking…')} Wallet passes need
              signing certificates and a pass provider before they can be issued.
            </p>
          </Panel>

          <Panel className="p-8">
            <Eyebrow>What the card is for</Eyebrow>
            <ul className="mt-4 divide-y divide-[#d8aa67]/10">
              {BENEFITS.map(([a, b]) => (
                <li key={a} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-[#ece3d7]">{a}</span>
                  <span className="text-right text-[#ece3d7]/50">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#ece3d7]/40">Planned. Specific offers are announced when they are ready.</p>
          </Panel>
        </div>

        <div className="mt-24">
          <Eyebrow>Cards to share</Eyebrow>
          <h2 className="mt-4 font-display text-2xl tracking-[0.06em] text-[#f7f1e6]">Marks of your journey</h2>
          <p className="mt-3 max-w-xl text-sm text-[#ece3d7]/55">
            Each card shares the achievement and nothing else. No answers, no spoilers.
          </p>
          <div className="mt-8">
            <AchievementCards state={state} />
          </div>
        </div>
      </div>
    </>
  )
}

export default function CardPage() {
  return (
    <Suspense>
      <CardView />
    </Suspense>
  )
}
