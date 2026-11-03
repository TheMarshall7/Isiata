'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { exp } from '@/lib/experience/config'
import { CAMPAIGN, TOTAL_CHAPTERS } from '@/lib/experience/campaign'
import { levelFor, resonanceFor, useExperience } from '@/lib/experience/store'
import { sfx } from './audio'
import { PreviewBadge } from './ui'

const LINKS = [
  { href: exp('/world'), label: CAMPAIGN.hubName.replace('The ', '') },
  { href: exp('/grimoire'), label: CAMPAIGN.collectionName.replace('The ', '') },
  { href: exp('/card'), label: 'Card' },
  { href: exp('/premiere'), label: 'Premiere' },
]

/** Small ring showing progress to the next recognition level. */
function LevelRing({ pct }: { pct: number }) {
  const r = 13
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 -rotate-90" aria-hidden>
      <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(236,227,215,0.12)" strokeWidth="2" />
      <circle
        cx="16"
        cy="16"
        r={r}
        fill="none"
        stroke="#F0A35E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
      />
    </svg>
  )
}

export function HudNav() {
  const pathname = usePathname()
  const { solvedCount, state, setSound, findSecret } = useExperience()
  const points = resonanceFor(state)
  const level = levelFor(points)

  // Secret: typing EVIL backwards anywhere outside a text field.
  useEffect(() => {
    let buf = ''
    const onKey = (e: KeyboardEvent) => {
      const t = e.target
      if (t instanceof Element && t.closest('input, textarea')) return
      buf = (buf + e.key.toUpperCase()).slice(-4)
      if (buf === 'LIVE') findSecret('live')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [findSecret])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#d8aa67]/15 bg-[#020202]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
          <Link href={exp('/world')} className="font-display text-sm tracking-[0.35em] text-[#ece3d7]">
            ISIATA
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Experience">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => sfx.tick()}
                aria-current={pathname === l.href ? 'page' : undefined}
                className={cn(
                  'text-xs tracking-[0.12em] transition-colors duration-500',
                  pathname === l.href ? 'text-[#f7f1e6]' : 'text-[#ece3d7]/55 hover:text-[#ece3d7]'
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {state.preview && (
              <span className="hidden lg:block">
                <PreviewBadge />
              </span>
            )}
            <button
              onClick={() => setSound(!state.sound)}
              aria-pressed={state.sound}
              aria-label={state.sound ? 'Sound on' : 'Sound off'}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8aa67]/20 text-[#ece3d7]/60 hover:text-[#ece3d7]"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
                <path d="M3 8v4h3l4 3V5L6 8H3z" />
                {state.sound ? <path d="M13 7.5a3.5 3.5 0 0 1 0 5M15.5 5a7 7 0 0 1 0 10" /> : <path d="M13 8l4 4M17 8l-4 4" />}
              </svg>
            </button>
            <Link href={exp('/card')} className="flex items-center gap-2" aria-label={`${level.name}, ${points} resonance, ${solvedCount} of ${TOTAL_CHAPTERS} revelations`}>
              <LevelRing pct={level.pct} />
              <span className="leading-tight">
                <span className="block font-mono text-xs tabular-nums text-[#f7f1e6]">{points}</span>
                <span className="block font-mono text-[9px] tracking-[0.15em] text-[#d8aa67]">
                  {solvedCount}/{TOTAL_CHAPTERS}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label="Experience"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[#d8aa67]/15 bg-[#020202]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={pathname === l.href ? 'page' : undefined}
            className={cn(
              'relative py-3.5 text-center text-[11px] tracking-[0.14em]',
              pathname === l.href ? 'text-[#f7f1e6]' : 'text-[#ece3d7]/50'
            )}
          >
            {pathname === l.href && <span aria-hidden className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rotate-45 bg-[#F0A35E]" />}
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
