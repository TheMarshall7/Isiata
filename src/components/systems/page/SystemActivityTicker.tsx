'use client'

import { Section } from '@/components/ui/Section'
import { useCountUp } from '@/hooks/useCountUp'
import { SYSTEM_ACTIVITY } from '@/lib/systems/page-content'

function ActivityStat({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value)
  return (
    <div className="rounded-lg border border-white/10 bg-surface-raised/40 p-5">
      <p ref={ref} className="text-3xl font-oswald tracking-tight text-white tabular-nums">
        {display}
      </p>
      <p className="text-[11px] uppercase tracking-widest text-zinc-500 mt-1">{label}</p>
    </div>
  )
}

export function SystemActivityTicker() {
  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Example system activity
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        Today
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        Not live client numbers. A simulation of what a connected system looks like when it is actually working.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {SYSTEM_ACTIVITY.map((item) => (
          <ActivityStat key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </Section>
  )
}
