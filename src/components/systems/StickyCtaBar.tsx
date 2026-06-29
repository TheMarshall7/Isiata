'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FUNNEL_SHARED } from '@/lib/systems/funnel-content'
import { SYSTEMS_BOOKING_HREF } from '@/lib/systems/tiers'

type StickyCtaBarProps = {
  tierName: string
  ctaLabel?: string
  heroId?: string
}

export function StickyCtaBar({
  tierName,
  ctaLabel = 'Book your free strategy call',
  heroId = 'funnel-hero',
}: StickyCtaBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById(heroId)
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [heroId])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between gap-3 mb-1">
          <p className="text-xs text-zinc-400 truncate flex-1">
            <span className="text-white font-medium">{tierName}</span>
          </p>
          <Link
            href={SYSTEMS_BOOKING_HREF}
            className="shrink-0 inline-flex items-center gap-1.5 bg-white text-black px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-zinc-200 transition-colors"
          >
            {ctaLabel.replace('Book your ', '').replace('Book a ', '')}
            <iconify-icon icon="solar:arrow-right-linear" width="14" height="14" />
          </Link>
        </div>
        <p className="text-[10px] text-zinc-600 text-center">{FUNNEL_SHARED.ctaMicrocopy}</p>
      </div>
    </div>
  )
}
