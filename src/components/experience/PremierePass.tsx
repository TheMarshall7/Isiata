'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { CAMPAIGN, CHAPTERS, TOTAL_CHAPTERS } from '@/lib/experience/campaign'
import type { ExperienceState } from '@/lib/experience/store'
import { Glyph } from './Glyph'

/**
 * The premiere pass (brief 6.4 lists it in the Grimoire). A ticket, not a
 * barcode: entry is tied to the membership, so the pass carries no secret.
 */
export function PremierePass({ state, className }: { state: ExperienceState; className?: string }) {
  const m = state.member
  const ref = useRef<HTMLDivElement>(null)
  if (!m) return null
  const held = state.artifacts.length
  const bonus = held === TOTAL_CHAPTERS
  const at = CAMPAIGN.premiere.at ? new Date(CAMPAIGN.premiere.at) : null

  function onMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--px', `${(((e.clientX - r.left) / r.width) * 100).toFixed(0)}%`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn('relative mx-auto flex w-full max-w-2xl overflow-hidden rounded-2xl border border-[#d8aa67]/40 bg-[#050505]', className)}
      style={{ ['--px' as string]: '50%' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at var(--px) 0%, rgba(240,163,94,0.16), transparent 50%)' }}
      />
      <div className="relative flex-1 p-6 sm:p-8">
        <p className="font-mono text-[10px] tracking-[0.35em] text-[#d8aa67]">ADMIT ONE · PREMIERE</p>
        <p className="mt-3 font-display text-[clamp(1.4rem,5vw,2.2rem)] uppercase tracking-[0.12em] text-[#f7f1e6]">{CAMPAIGN.name}</p>
        <p className="mt-1 text-sm text-[#ece3d7]/55">A cinematic live album debut · {CAMPAIGN.premiere.runtime}</p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-xs sm:grid-cols-3">
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#ece3d7]/40">HOLDER</p>
            <p className="mt-1 truncate text-[#f7f1e6]">{m.displayName}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#ece3d7]/40">MEMBER</p>
            <p className="mt-1 font-mono text-[#f7f1e6]">{m.memberNumber}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#ece3d7]/40">DATE</p>
            <p className="mt-1 text-[#f7f1e6]">{at ? at.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'To be announced'}</p>
          </div>
        </div>
      </div>
      {/* perforation */}
      <div aria-hidden className="relative w-px border-l border-dashed border-[#d8aa67]/40">
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#020202]" />
        <span className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-[#020202]" />
      </div>
      <div className="relative flex w-28 shrink-0 flex-col items-center justify-center gap-3 p-4 sm:w-36">
        <div className="grid grid-cols-4 gap-1">
          {CHAPTERS.map((c) => (
            <Glyph key={c.n} name={c.glyph} size={18} className={state.artifacts.includes(c.n) ? 'text-[#F0A35E]' : 'text-[#ece3d7]/15'} />
          ))}
        </div>
        <p className={cn('text-center font-mono text-[9px] tracking-[0.2em]', bonus ? 'text-[#F0A35E]' : 'text-[#ece3d7]/40')}>
          {bonus ? '+ HIDDEN LAYER' : `${held}/${TOTAL_CHAPTERS} HELD`}
        </p>
      </div>
    </div>
  )
}

/** Calendar file for the premiere. Generated in the browser; nothing leaves the device. */
export function downloadPremiereIcs() {
  const at = CAMPAIGN.premiere.at ? new Date(CAMPAIGN.premiere.at) : null
  if (!at) return
  const end = new Date(at.getTime() + 45 * 60_000)
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ISIATA//Feel No Evil//EN',
    'BEGIN:VEVENT',
    `UID:fne-premiere-${f(at)}@isiata`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(at)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:ISIATA · ${CAMPAIGN.name} premiere`,
    'DESCRIPTION:Your place is confirmed. Arrive a few minutes early.',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:The premiere begins in 30 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'isiata-feel-no-evil-premiere.ics'
  a.click()
  URL.revokeObjectURL(url)
}
