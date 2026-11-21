'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BUSINESS_HREF, MUSIC_HREF, SERVICES_HREF, TEARDOWN } from '@/lib/services/content'
import { cn } from '@/lib/utils'

const TABS = [
  { href: SERVICES_HREF, label: 'Overview', exact: true },
  { href: MUSIC_HREF, label: 'Music' },
  { href: BUSINESS_HREF, label: 'Business' },
]

export function ServicesSubnav() {
  const pathname = usePathname() ?? ''
  return (
    <nav aria-label="Services" className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-sm">
        {TABS.map((tab) => {
          const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-full px-4 py-2 text-[10px] uppercase tracking-widest transition-colors sm:px-5',
                active ? 'bg-[#d8aa67] text-black' : 'text-zinc-400 hover:text-white'
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
      <a
        href={TEARDOWN.href}
        className="inline-flex items-center gap-2 rounded-full border border-[#d8aa67]/40 px-4 py-2 text-[10px] uppercase tracking-widest text-[#f0dfc8] transition-colors hover:border-[#d8aa67]/75 hover:bg-[#b7792a]/10"
      >
        <iconify-icon icon="solar:calendar-linear" width="14" height="14" />
        {TEARDOWN.label} · {TEARDOWN.price}
      </a>
    </nav>
  )
}
