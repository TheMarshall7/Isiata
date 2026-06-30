'use client'

import { useState } from 'react'
import type { FunnelContent } from '@/lib/systems/funnel-content'
import { FUNNEL_SHARED } from '@/lib/systems/funnel-content'
import { FunnelCta } from '@/components/systems/FunnelCta'
import { SectionEyebrow } from '@/components/systems/SectionEyebrow'

type AccountHaloSectionProps = {
  funnel: FunnelContent
}

export function AccountHaloSection({ funnel }: AccountHaloSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { accent } = funnel

  const capabilities = [
    ...FUNNEL_SHARED.accountBaseFeatures,
    ...funnel.creatorAccountHighlights,
  ]

  return (
    <div>
      <SectionEyebrow number="02" label="Your creator account" accentText={accent.text} />

      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-4 leading-tight max-w-2xl">
        {funnel.accountHeadline}
      </h2>
      <p className="text-zinc-400 leading-relaxed mb-12 max-w-2xl">{funnel.accountSubheadline}</p>

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="hidden lg:grid grid-cols-1 gap-3">
          {capabilities.slice(0, 3).map((cap, i) => (
            <button
              key={cap.title}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`text-left p-4 rounded-lg border transition-all duration-300 ${
                activeIndex === i
                  ? `${accent.border} bg-white/[0.05]`
                  : 'border-white/10 bg-surface-raised/30 opacity-60 hover:opacity-100'
              }`}
            >
              <iconify-icon icon={cap.icon} width="20" height="20" className={`${accent.text} mb-2`} />
              <p className="text-sm font-medium text-white">{cap.title}</p>
            </button>
          ))}
        </div>

        <div className="relative flex flex-col items-center justify-center py-8">
          <div className={`absolute inset-0 ${accent.glow} blur-3xl rounded-full opacity-60`} aria-hidden />
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/15 bg-transparent flex items-center justify-center depth-shadow-lg">
            <img
              src="/systems/areoclient-hero.png"
              alt="AreoClient Creator Account"
              className="w-32 h-32 object-contain"
            />
          </div>
          <p className="relative mt-4 text-xs text-zinc-500 text-center">
            AreoClient Creator Account
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-1 gap-3">
          {capabilities.slice(3, 6).map((cap, i) => {
            const index = i + 3
            return (
              <button
                key={cap.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`text-left p-4 rounded-lg border transition-all duration-300 ${
                  activeIndex === index
                    ? `${accent.border} bg-white/[0.05]`
                    : 'border-white/10 bg-surface-raised/30 opacity-60 hover:opacity-100'
                }`}
              >
                <iconify-icon icon={cap.icon} width="20" height="20" className={`${accent.text} mb-2`} />
                <p className="text-sm font-medium text-white">{cap.title}</p>
              </button>
            )
          })}
        </div>

        <div className="lg:hidden space-y-2">
          {capabilities.map((cap, index) => (
            <button
              key={cap.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                activeIndex === index ? `${accent.border} bg-white/[0.05]` : 'border-white/10 bg-surface-raised/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <iconify-icon icon={cap.icon} width="20" height="20" className={accent.text} />
                <span className="text-sm font-medium text-white">{cap.title}</span>
              </div>
              {activeIndex === index && (
                <p className="text-sm text-zinc-400 mt-2 pl-8">{cap.description}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:block mt-8 p-6 rounded-lg gradient-border-brand bg-surface-raised/40 depth-shadow">
        <p className="text-sm text-zinc-300 leading-relaxed">{capabilities[activeIndex]?.description}</p>
        {capabilities[activeIndex]?.title === 'Owned contact list' && (
          <p className="text-xs text-zinc-500 mt-2 italic">{FUNNEL_SHARED.contactsTrustLine}</p>
        )}
      </div>

      <div className="mt-10">
        <FunnelCta label={funnel.ctaLabel} align="left" accentGlow="shadow-[0_0_20px_-6px_rgba(255,255,255,0.12)]" />
      </div>
    </div>
  )
}
