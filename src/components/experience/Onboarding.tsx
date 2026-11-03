'use client'

import { useState } from 'react'
import { useExperience } from '@/lib/experience/store'
import { haptic, sfx } from './audio'
import { Glyph } from './Glyph'
import { TransmitText } from './Motion'
import { Btn } from './ui'

const BEATS = [
  {
    glyph: 'threshold' as const,
    title: 'Every week, a room opens.',
    line: 'Watch the transmission. Explore the room. Solve what it is hiding. Missed one? Every room stays open.',
  },
  {
    glyph: 'signal' as const,
    title: 'Every artifact is a sound.',
    line: 'Each revelation you hold adds a layer to your composition. Hold all eight and you hear the whole piece.',
  },
  {
    glyph: 'void' as const,
    title: 'Not every secret is in a room.',
    line: 'Some are hidden in the world itself. Pay attention. Resonance comes from what you notice, never from what you buy.',
  },
]

/**
 * First visit to the hub (brief 18, risk 2: unclear onboarding). Three beats,
 * then the door's light expands to carry the member through.
 */
export function Onboarding() {
  const { seeIntro } = useExperience()
  const [i, setI] = useState(0)
  const [crossing, setCrossing] = useState(false)
  const beat = BEATS[i]

  function next() {
    sfx.select()
    if (i < BEATS.length - 1) return setI(i + 1)
    setCrossing(true)
    sfx.reveal()
    haptic([30, 80, 30])
    setTimeout(seeIntro, 2000)
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="How the experience works" className="fne-ceremony fixed inset-0 z-[80] flex items-center justify-center bg-[#020202]/95 backdrop-blur-md px-6">
      {crossing ? (
        <div aria-hidden className="fne-portal absolute inset-0" style={{ background: 'linear-gradient(to top, #F0A35E, #D9772B 40%, #2a1306)' }} />
      ) : (
        <div className="max-w-md text-center">
          <div key={i} className="fne-rise">
            <Glyph name={beat.glyph} size={84} className="mx-auto text-[#F0A35E]" strokeWidth={1.1} />
            <TransmitText as="h2" text={beat.title} className="mt-8 block font-display text-2xl tracking-[0.06em] text-[#f7f1e6] sm:text-3xl" />
            <p className="mt-5 leading-relaxed text-[#ece3d7]/70">{beat.line}</p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-2" aria-hidden>
            {BEATS.map((_, j) => (
              <span key={j} className={j === i ? 'h-1.5 w-6 rounded-full bg-[#F0A35E] transition-all' : 'h-1.5 w-1.5 rounded-full bg-[#ece3d7]/20 transition-all'} />
            ))}
          </div>
          <Btn onClick={next} className="mt-8">
            {i < BEATS.length - 1 ? 'Continue' : 'Cross the threshold'}
          </Btn>
          <button onClick={seeIntro} className="mt-5 block w-full text-xs tracking-[0.14em] text-[#ece3d7]/35 hover:text-[#ece3d7]/70">
            Skip
          </button>
        </div>
      )}
    </div>
  )
}
