'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { AnimatedFlow } from '@/components/systems/page/AnimatedFlow'
import { DIAGNOSTICS, SYSTEMS_PAGE_COPY } from '@/lib/systems/page-content'
import { SYSTEMS_BOOKING_HREF, SYSTEMS_MAP_CTA_LABEL } from '@/lib/systems/tiers'

export function DiagnosticCta() {
  const [openId, setOpenId] = useState(DIAGNOSTICS[0].id)
  const active = DIAGNOSTICS.find((item) => item.id === openId) ?? DIAGNOSTICS[0]

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Not sure which one you need?
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        Where is your system breaking?
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        You do not need to figure that out before reaching out. Tell me what you do, how people currently find and pay you, and what is driving you crazy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {DIAGNOSTICS.map((item) => {
          const selected = item.id === openId
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setOpenId(item.id)}
              className={`text-left rounded-lg border px-5 py-4 text-sm transition-colors ${
                selected
                  ? 'border-white/40 bg-white text-black'
                  : 'border-white/10 bg-surface-raised/40 text-zinc-300 hover:border-white/25'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="rounded-lg border border-white/10 bg-black/40 p-6 md:p-8 mb-10">
        <p className="text-sm text-zinc-300 leading-relaxed mb-5">{active.body}</p>
        <AnimatedFlow steps={active.flow} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          href={SYSTEMS_BOOKING_HREF}
          className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
        >
          {SYSTEMS_MAP_CTA_LABEL}
          <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
        </Link>
        <Link
          href="/systems/architecture"
          className="inline-flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          How the systems work
          <iconify-icon icon="solar:alt-arrow-right-linear" width="16" height="16" />
        </Link>
      </div>
    </Section>
  )
}

export function ProcessAndRule() {
  return (
    <>
      <Section reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          {SYSTEMS_PAGE_COPY.process.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-10">
          Map. Configure. Build. Test. Hand off.
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {SYSTEMS_PAGE_COPY.process.steps.map((step, index) => (
            <li key={step.id} className="rounded-lg border border-white/10 bg-surface-raised/30 p-5">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-lg font-oswald uppercase tracking-tight text-white mb-2">{step.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section reveal className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          {SYSTEMS_PAGE_COPY.rule.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-4 max-w-3xl">
          {SYSTEMS_PAGE_COPY.rule.title}
        </h2>
        <p className="text-base font-light text-zinc-400 leading-[1.8] max-w-2xl">
          {SYSTEMS_PAGE_COPY.rule.body}
        </p>
      </Section>

      <Section reveal className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          {SYSTEMS_PAGE_COPY.disappear.eyebrow}
        </p>
        <p className="text-base font-light text-zinc-400 leading-[1.8] max-w-2xl mb-4">
          {SYSTEMS_PAGE_COPY.disappear.body}
        </p>
        <p className="text-white font-medium max-w-2xl">{SYSTEMS_PAGE_COPY.disappear.punch}</p>
      </Section>
    </>
  )
}
