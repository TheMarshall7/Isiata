'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { AnimatedFlow } from '@/components/systems/page/AnimatedFlow'
import { WHAT_HAPPENS_WHEN } from '@/lib/systems/page-content'

export function WhatHappensWhen() {
  const [openId, setOpenId] = useState(WHAT_HAPPENS_WHEN[0].id)

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Automation without the brochure
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-8">
        What happens when...
      </h2>

      <div className="space-y-2">
        {WHAT_HAPPENS_WHEN.map((scenario) => {
          const open = openId === scenario.id
          return (
            <div key={scenario.id} className="border border-white/10 rounded-lg overflow-hidden bg-surface-raised/40">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? '' : scenario.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm text-white">{scenario.question}</span>
                <iconify-icon
                  icon={open ? 'solar:minus-linear' : 'solar:add-linear'}
                  width="16"
                  height="16"
                  className="text-zinc-500 shrink-0"
                />
              </button>
              {open && (
                <div className="px-5 pb-5">
                  <AnimatedFlow steps={scenario.steps} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
