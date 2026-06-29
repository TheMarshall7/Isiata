'use client'

import { useState } from 'react'
import type { FunnelContent } from '@/lib/systems/funnel-content'
import { FUNNEL_SHARED } from '@/lib/systems/funnel-content'
import { FunnelCta } from '@/components/systems/FunnelCta'

type CreatorAccountSectionProps = {
  funnel: FunnelContent
}

export function CreatorAccountSection({ funnel }: CreatorAccountSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const { accent } = funnel

  const allFeatures = [
    ...FUNNEL_SHARED.accountBaseFeatures,
    ...funnel.creatorAccountHighlights.map((h) => ({
      title: h.title,
      description: h.description,
      icon: h.icon,
    })),
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div className="relative">
        <div className={`absolute -inset-4 ${accent.glow} blur-3xl rounded-full pointer-events-none opacity-60`} />
        <div className="relative rounded-lg border border-white/10 overflow-hidden depth-shadow">
          <img
            src="/systems/areoclient-hero.png"
            alt="AreoClient Creator Account"
            className="w-full h-auto object-contain bg-black/40 p-6"
          />
        </div>
        <p className="mt-4 text-xs text-zinc-500 text-center">
          Powered by{' '}
          <a
            href="https://areoclient.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            AreoClient
          </a>
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          What you are getting
        </p>
        <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-4 leading-tight">
          {funnel.accountHeadline}
        </h2>
        <p className="text-zinc-400 leading-relaxed mb-6">{funnel.accountSubheadline}</p>

        <div className="space-y-2 mb-6">
          {allFeatures.map((feature, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div
                key={feature.title}
                className={`border rounded-lg overflow-hidden transition-colors ${
                  isExpanded ? `${accent.border} bg-white/[0.04]` : 'border-white/10 bg-surface-raised/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-black/30 shrink-0">
                    <iconify-icon icon={feature.icon} width="20" height="20" className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-white flex-1">{feature.title}</span>
                  <iconify-icon
                    icon={isExpanded ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'}
                    width="16"
                    height="16"
                    className="text-zinc-500 shrink-0"
                  />
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pl-[4.5rem]">
                    <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                    {feature.title === 'Owned contact list' && (
                      <p className="text-xs text-zinc-500 mt-2 italic">{FUNNEL_SHARED.contactsTrustLine}</p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <FunnelCta label={funnel.ctaLabel} align="left" />
      </div>
    </div>
  )
}
