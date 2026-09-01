'use client'

import { useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { AnimatedFlow } from '@/components/systems/page/AnimatedFlow'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const TONE: Record<string, string> = {
  new: 'text-zinc-300',
  pending: 'text-zinc-400',
  active: 'text-white',
  done: 'text-zinc-500',
}

export function SystemInAction() {
  const { lens } = useSystemsLens()
  const reduced = usePrefersReducedMotion()
  const [stateIndex, setStateIndex] = useState(0)

  useEffect(() => {
    setStateIndex(0)
    if (reduced || lens.crmStates.length < 2) return
    const id = window.setInterval(() => {
      setStateIndex((index) => (index + 1) % lens.crmStates.length)
    }, 1400)
    return () => window.clearInterval(id)
  }, [lens.id, lens.crmStates.length, reduced])

  const currentState = lens.crmStates[stateIndex] ?? lens.crmStates[0]

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        System in action
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        Same CRM. Different business logic.
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        One person enters as a lead. The system changes their state based on what they actually did.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-white/10 bg-surface-raised/40 p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">
            {lens.label} pipeline
          </p>
          <ul className="space-y-3">
            {lens.crmLeads.map((lead) => (
              <li key={lead.name} className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                <div>
                  <p className="text-sm text-white">{lead.name}</p>
                  <p className="text-xs text-zinc-500">{lead.offer}</p>
                </div>
                <p className={`text-[11px] uppercase tracking-widest ${TONE[lead.tone]}`}>{lead.status}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/40 p-6 md:p-8 flex flex-col justify-between">
          {lens.fanProfile ? (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Fan profile</p>
              <h3 className="text-2xl font-oswald uppercase tracking-tight text-white mb-2">
                {lens.fanProfile.name}
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                Fan since {lens.fanProfile.since} · {lens.fanProfile.source}
              </p>
              <ul className="space-y-1.5 mb-4">
                {lens.fanProfile.activity.map((item) => (
                  <li key={item} className="text-sm text-zinc-400">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-white">
                {lens.fanProfile.value} · {lens.fanProfile.status}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Current state</p>
              <p className="text-4xl font-oswald uppercase tracking-tight text-white">{currentState.label}</p>
            </div>
          )}
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">State morph</p>
            <AnimatedFlow steps={lens.crmStates.map((state) => state.label)} />
          </div>
        </div>
      </div>
    </Section>
  )
}
