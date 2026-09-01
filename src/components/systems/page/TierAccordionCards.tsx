'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'
import { SYSTEMS_TIERS } from '@/lib/systems/tiers'

const PUBLIC_TIERS = SYSTEMS_TIERS.filter((tier) => !tier.isScoped)

export function TierAccordionCards() {
  const { lens } = useSystemsLens()
  const [openId, setOpenId] = useState<string | null>(lens.recommendedTierId)

  useEffect(() => {
    setOpenId(lens.recommendedTierId)
  }, [lens.recommendedTierId])

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        The four system builds
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        There isn&apos;t one perfect system
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        There is a level of infrastructure that makes sense for where you are right now. Recommended for {lens.label}:{' '}
        <span className="text-white">
          {PUBLIC_TIERS.find((tier) => tier.id === lens.recommendedTierId)?.name ?? 'The Booking Foundation'}
        </span>
        .
      </p>

      <div className="space-y-4">
        {PUBLIC_TIERS.map((tier) => {
          const open = openId === tier.id
          const recommended = tier.id === lens.recommendedTierId
          return (
            <article
              key={tier.id}
              className={`rounded-lg bg-surface-raised/50 depth-shadow overflow-hidden ${
                recommended ? 'gradient-border-brand-pulse' : 'gradient-border-brand'
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                      {String(tier.tier).padStart(2, '0')}
                      {recommended ? ' · Recommended' : ''}
                    </p>
                    <h3 className="text-2xl font-oswald uppercase tracking-tight text-white">{tier.name}</h3>
                    <p className="text-sm text-zinc-500 italic mt-1">{tier.tagline}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <span className="text-[11px] uppercase tracking-widest text-zinc-400 border border-white/10 rounded-full px-3 py-1">
                      {tier.timeline}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : tier.id)}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  View the build
                  <iconify-icon
                    icon={open ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'}
                    width="14"
                    height="14"
                  />
                </button>

                {open && (
                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Core</p>
                      <ul className="space-y-2 mb-6">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-zinc-400">
                            <iconify-icon
                              icon="solar:check-circle-linear"
                              width="16"
                              height="16"
                              className="mt-0.5 shrink-0 text-white/70"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-zinc-300 leading-relaxed">{tier.outcome}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Best for</p>
                      <ul className="space-y-1 mb-6">
                        {tier.bestFor.map((item) => (
                          <li key={item} className="text-sm text-zinc-400">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/systems/${tier.id}`}
                        className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-zinc-200 transition-colors"
                      >
                        {tier.ctaLabel}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
      <p className="mt-6 text-sm text-zinc-500 max-w-2xl">{tierCombineCopy()}</p>
    </Section>
  )
}

function tierCombineCopy() {
  return 'The level tells us how much we are building. The modules tell us what we are building.'
}
