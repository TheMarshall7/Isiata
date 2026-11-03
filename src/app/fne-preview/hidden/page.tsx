'use client'

import { useEffect } from 'react'
import { HIDDEN_ROOM, SECRETS, type ChapterDef } from '@/lib/experience/campaign'
import { exp } from '@/lib/experience/config'
import { POINTS, useExperience } from '@/lib/experience/store'
import { composition } from '@/components/experience/composition'
import { Glyph } from '@/components/experience/Glyph'
import { HudNav } from '@/components/experience/HudNav'
import { TransmitText } from '@/components/experience/Motion'
import { TransmissionPlayer } from '@/components/experience/TransmissionPlayer'
import { BtnLink, Eyebrow } from '@/components/experience/ui'
import { useMemberGuard } from '@/components/experience/useGuard'

/** Shaped like a chapter so the transmission player can carry it. */
const ROOM = { n: 0, glyph: 'void', transmission: HIDDEN_ROOM.transmission } as unknown as ChapterDef

/**
 * The deeper layer of the meta-puzzle (brief 5.4: people who connect clues
 * discover an additional layer). Reachable only by finding all five secrets.
 */
export default function HiddenRoom() {
  const ok = useMemberGuard()
  const { state, enterHiddenRoom, notify } = useExperience()
  const unlocked = state.secrets.length === SECRETS.length

  useEffect(() => {
    if (!ok || !unlocked || state.hiddenRoomAt) return
    enterHiddenRoom()
    notify({ kind: 'mark', title: 'The Unseen', line: `You found the room that was never on the map. +${POINTS.hiddenRoom} resonance.` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ok, unlocked, state.hiddenRoomAt])

  useEffect(() => () => composition.stop(), [])

  if (!ok) return null

  return (
    <>
      <HudNav />
      <div className="mx-auto max-w-3xl px-5 pb-32 pt-28 text-center md:pb-24">
        {unlocked ? (
          <>
            <Eyebrow>Hidden</Eyebrow>
            <TransmitText as="h1" text={HIDDEN_ROOM.title} className="mt-4 block font-display text-3xl tracking-[0.06em] text-[#f7f1e6] sm:text-5xl" />
            <div className="mt-12 text-left">
              <TransmissionPlayer chapter={ROOM} onDone={() => undefined} />
            </div>
            <p className="mt-12 text-[#ece3d7]/65">
              A ninth layer has joined your composition: <span className="text-[#F0A35E]">{HIDDEN_ROOM.layer}</span>.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <BtnLink href={exp('/grimoire')}>Hear it</BtnLink>
              <BtnLink href={exp('/world')} variant="ghost">
                Back to the Threshold
              </BtnLink>
            </div>
          </>
        ) : (
          <>
            <Glyph name="void" size={80} className="mx-auto text-[#ece3d7]/20" />
            <h1 className="mt-8 font-display text-3xl tracking-[0.06em] text-[#f7f1e6]">There is nothing here.</h1>
            <p className="mt-4 text-[#ece3d7]/55">Yet.</p>
          </>
        )}
      </div>
    </>
  )
}
