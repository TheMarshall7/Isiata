'use client'

import { Section } from '@/components/ui/Section'
import { MANUAL_VS_SYSTEM } from '@/lib/systems/page-content'

export function ManualVsSystem() {
  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        What stays with you
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-8">
        Manual vs automated
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-0 rounded-lg border border-white/10 overflow-hidden">
        <div className="p-6 md:p-10">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">You</p>
          <ul className="space-y-3">
            {MANUAL_VS_SYSTEM.you.map((item) => (
              <li key={item} className="text-sm text-white">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block bg-white/15" aria-hidden />
        <div className="p-6 md:p-10 bg-white/[0.03]">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">System</p>
          <ul className="space-y-3">
            {MANUAL_VS_SYSTEM.system.map((item) => (
              <li key={item} className="text-sm text-zinc-400">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-sm text-zinc-300 max-w-2xl">{MANUAL_VS_SYSTEM.punch}</p>
    </Section>
  )
}
