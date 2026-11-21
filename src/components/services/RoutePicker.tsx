'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ROUTE_PICKER } from '@/lib/services/content'
import { cn } from '@/lib/utils'

export function RoutePicker() {
  const [selected, setSelected] = useState<string | null>(null)
  const route = ROUTE_PICKER.find((r) => r.id === selected)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-2" role="radiogroup" aria-label="Which sounds most like you?">
        {ROUTE_PICKER.map((r, i) => {
          const active = r.id === selected
          return (
            <button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(r.id)}
              className={cn(
                'flex w-full items-center gap-4 border px-5 py-4 text-left transition-all duration-300',
                active
                  ? 'border-[#d8aa67]/70 bg-[#b7792a]/10 shadow-[0_0_24px_rgba(211,157,83,0.12)]'
                  : 'border-white/10 bg-surface-raised hover:border-white/20 hover:bg-surface-overlay'
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.22em] text-zinc-600">{String(i + 1).padStart(2, '0')}</span>
              <span className={cn('flex-1 text-sm', active ? 'text-[#f0dfc8]' : 'text-zinc-300')}>{r.situation}</span>
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                  active ? 'border-[#d8aa67] bg-[#d8aa67]' : 'border-white/20'
                )}
              >
                {active && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
              </span>
            </button>
          )
        })}
      </div>

      <div
        className="relative flex min-h-[260px] flex-col overflow-hidden rounded-lg border border-[#d8aa67]/25 bg-gradient-to-b from-[#d8aa67]/[0.08] via-black/40 to-transparent p-8"
        aria-live="polite"
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent" />
        {route ? (
          <div key={route.id} className="flex flex-1 flex-col animate-fade-in">
            <p className="mb-4 font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8c3a4]">Start with</p>
            <p className="mb-4 font-display text-3xl uppercase leading-tight tracking-normal text-[#f3ede3] md:text-4xl">{route.offer}</p>
            <div className="mb-5 flex w-full max-w-[10rem] items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-[#d8aa67]/70 to-transparent" />
              <span className="h-1 w-1 rotate-45 bg-[#d8aa67]/80" />
            </div>
            <p className="mb-8 text-sm font-light leading-relaxed text-[#b8a890]">{route.why}</p>
            <div className="mt-auto flex flex-wrap gap-3">
              {route.links.map((link, i) =>
                link.href.startsWith('/') ? (
                  <Link key={link.href} href={link.href} className={i === 0 ? 'btn-primary cta-sheen' : 'btn-secondary'}>
                    {link.label}
                    <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} className={i === 0 ? 'btn-primary cta-sheen' : 'btn-secondary'}>
                    {link.label}
                    <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
                  </a>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-zinc-600">
            <iconify-icon icon="solar:compass-linear" width="32" height="32" />
            <p className="text-[10px] uppercase tracking-widest">Pick the line that sounds most like you</p>
          </div>
        )}
      </div>
    </div>
  )
}
