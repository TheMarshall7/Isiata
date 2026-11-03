'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { CAMPAIGN, CHAPTERS } from '@/lib/experience/campaign'
import { levelFor, resonanceFor, useExperience, type ExperienceState, type Member } from '@/lib/experience/store'
import { Glyph } from './Glyph'

const GOLD_EDGE =
  'linear-gradient(135deg, rgba(168,132,72,0.9), rgba(244,214,156,1) 30%, rgba(112,84,44,0.6) 55%, rgba(214,176,112,1) 80%, rgba(120,88,42,0.7))'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
}

/**
 * The permanent ISIATA identity card. Shows only safe fields: no email, no
 * phone. The back carries the verification seal that will become the Wallet
 * pass barcode (brief 10.2): it must resolve to a safe status view, never to
 * private account data.
 */
export function MemberCard({
  member,
  state,
  className,
}: {
  member: Member
  state: ExperienceState
  className?: string
}) {
  const [flipped, setFlipped] = useState(false)
  const [sealLit, setSealLit] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { findSecret } = useExperience()
  const solved = state.artifacts
  const points = resonanceFor(state)
  const level = levelFor(points)

  function onMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(0)}%`)
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const face = 'absolute inset-0 overflow-hidden rounded-[22px] [backface-visibility:hidden]'

  return (
    <div className={cn('mx-auto w-full max-w-[460px]', className)}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative aspect-[1.586/1] w-full [perspective:1400px]"
        style={{ ['--rx' as string]: '0deg', ['--ry' as string]: '0deg', ['--gx' as string]: '50%' }}
      >
        <button
          type="button"
          onClick={(e) => {
            // Secret: the seal on the back is meant to be touched, not scanned.
            if (flipped && (e.target as HTMLElement).closest('[data-seal]')) {
              setSealLit(true)
              findSecret('seal')
              return
            }
            setFlipped((f) => !f)
          }}
          aria-label={flipped ? 'Show front of card' : 'Show back of card'}
          className="absolute inset-0 rounded-[22px] text-left transition-transform duration-700 [transform-style:preserve-3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8aa67]"
          style={{
            transform: `rotateX(var(--rx)) rotateY(calc(var(--ry) + ${flipped ? 180 : 0}deg))`,
          }}
        >
          {/* FRONT */}
          <div className={face} style={{ background: GOLD_EDGE, padding: 1.5 }}>
            <div
              className="relative h-full w-full overflow-hidden rounded-[21px] bg-[#050505] p-[6%]"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 70% 90% at 85% 10%, rgba(217,119,43,0.22), transparent 60%), radial-gradient(circle at var(--gx) 0%, rgba(236,227,215,0.08), transparent 45%)',
              }}
            >
              {/* holographic foil: a band of light that moves with the card's tilt */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{
                  background: `linear-gradient(115deg, transparent calc(var(--gx) - 30%), rgba(240,163,94,${0.06 + level.index * 0.04}) calc(var(--gx) - 8%), rgba(247,241,230,${0.08 + level.index * 0.04}) var(--gx), rgba(168,132,72,0.06) calc(var(--gx) + 10%), transparent calc(var(--gx) + 30%))`,
                }}
              />
              <svg aria-hidden viewBox="0 0 400 250" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none">
                {Array.from({ length: 9 }, (_, i) => (
                  <ellipse key={i} cx="330" cy="40" rx={30 + i * 34} ry={22 + i * 26} fill="none" stroke="#d8aa67" strokeWidth="0.6" />
                ))}
              </svg>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-[clamp(0.9rem,3.6vw,1.15rem)] tracking-[0.4em] text-[#f7f1e6]">ISIATA</p>
                  <p className="mt-1 font-mono text-[clamp(0.45rem,1.7vw,0.6rem)] tracking-[0.3em] text-[#d8aa67]/80">
                    {level.name.toUpperCase()}
                  </p>
                </div>
                <Glyph name="eye" size={44} className="text-[#d8aa67] [width:11%] [height:auto]" />
              </div>

              <div className="absolute inset-x-[6%] bottom-[6%]">
                {member.founding && (
                  <p className="mb-[3%] font-spaced text-[clamp(0.45rem,1.9vw,0.65rem)] uppercase tracking-[0.28em] text-[#F0A35E]">
                    Founding Member · Est. 2026
                  </p>
                )}
                <p className="truncate font-display text-[clamp(1.05rem,4.8vw,1.55rem)] tracking-[0.08em] text-[#f7f1e6]">
                  {member.displayName}
                </p>
                <div className="mt-[3%] flex items-end justify-between gap-3">
                  <p className="font-mono text-[clamp(0.6rem,2.4vw,0.8rem)] tracking-[0.2em] text-[#ece3d7]/80">
                    {member.memberNumber}
                  </p>
                  <p className="font-mono text-[clamp(0.45rem,1.7vw,0.6rem)] tracking-[0.2em] text-[#ece3d7]/45">
                    SINCE {fmt(member.joinedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className={face} style={{ background: GOLD_EDGE, padding: 1.5, transform: 'rotateY(180deg)' }}>
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[21px] bg-[#050505] p-[6%]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-spaced text-[clamp(0.45rem,1.8vw,0.62rem)] uppercase tracking-[0.3em] text-[#d8aa67]/80">
                    {CAMPAIGN.name}
                  </p>
                  <p className="mt-1 font-display text-[clamp(0.8rem,3.2vw,1.05rem)] tracking-[0.1em] text-[#f7f1e6]">
                    {level.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[clamp(0.45rem,1.7vw,0.6rem)] tracking-[0.2em] text-[#ece3d7]/50">
                    {points} RESONANCE
                  </p>
                </div>
                <div
                  data-seal
                  aria-label="Verification seal, not yet active"
                  className={cn(
                    'grid h-[28%] aspect-square grid-cols-5 gap-px rounded-md border p-1 transition-all duration-1000',
                    sealLit ? 'border-[#F0A35E] shadow-[0_0_24px_rgba(240,163,94,0.6)]' : 'border-[#d8aa67]/40'
                  )}
                >
                  {Array.from({ length: 25 }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'rounded-[1px] transition-colors duration-700',
                        [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 1, 9, 17].includes(i) ? (sealLit ? 'bg-[#F0A35E]' : 'bg-[#d8aa67]/70') : 'bg-transparent'
                      )}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="grid grid-cols-8 gap-1.5">
                  {CHAPTERS.map((c) => {
                    const held = solved.includes(c.n)
                    return (
                      <Glyph
                        key={c.n}
                        name={c.glyph}
                        size={28}
                        className={cn('w-full transition-colors', held ? 'text-[#F0A35E]' : 'text-[#ece3d7]/15')}
                      />
                    )
                  })}
                </div>
                <p className="mt-[4%] text-[clamp(0.45rem,1.7vw,0.62rem)] leading-snug tracking-wide text-[#ece3d7]/45">
                  Permanent ISIATA membership. Present for recognition, access and member offers. Verification becomes
                  active when the membership database goes live.
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
      <p className="mt-4 text-center text-xs tracking-[0.14em] text-[#ece3d7]/40">Tap the card to turn it over</p>
    </div>
  )
}
