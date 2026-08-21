'use client'

import type { FunnelContent } from '@/lib/systems/funnel-content'
import type { SystemsTier } from '@/lib/systems/tiers'
import { FunnelCta } from '@/components/systems/FunnelCta'
import { TrustMetricsRow } from '@/components/systems/TrustMetricsRow'
import { VslPlaceholder } from '@/components/systems/VslPlaceholder'

type FunnelHeroProps = {
  tier: SystemsTier
  funnel: FunnelContent
}

export function FunnelHero({ tier, funnel }: FunnelHeroProps) {
  const { accent, heroTestimonial } = funnel
  const hasVideo = Boolean(funnel.videoSrc || funnel.vslEmbedUrl)

  return (
    <div id="funnel-hero" className="relative max-w-3xl mx-auto text-center">
      <div className={`glow-orb top-0 left-1/2 -translate-x-1/2 w-96 h-96 ${accent.glow}`} aria-hidden />

      <span
        className={`relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border px-3 py-1.5 rounded-full mb-6 ${accent.badge}`}
      >
        <iconify-icon icon={tier.icon} width="14" height="14" />
        For artists, producers, and creatives · {tier.isScoped ? 'Custom' : `Tier ${tier.tier}`}
      </span>

      <h1 className="relative text-4xl md:text-5xl lg:text-[3.5rem] font-oswald uppercase tracking-tight gradient-text mb-5 leading-[0.95]">
        {funnel.heroHeadline}
      </h1>

      <p className="relative text-lg md:text-xl text-zinc-400 leading-relaxed mb-8 mx-auto max-w-2xl">
        {funnel.heroSubheadline}
      </p>

      {hasVideo && (
        <div className="relative mb-8 max-w-2xl mx-auto text-left">
          <VslPlaceholder
            posterSrc={funnel.vslPoster}
            title={tier.name}
            accent={accent}
            videoSrc={funnel.videoSrc}
            vslEmbedUrl={funnel.vslEmbedUrl}
          />
        </div>
      )}

      <div className="relative mb-8">
        <FunnelCta
          label={funnel.ctaLabel}
          accentGlow="shadow-[0_0_24px_-4px_rgba(255,255,255,0.15)]"
          showAvatars
        />
      </div>

      <div className="relative mb-8">
        <TrustMetricsRow />
      </div>

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-lg gradient-border-brand bg-surface-raised/50 depth-shadow mb-8 text-left">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0 mx-auto sm:mx-0">
          <img src={heroTestimonial.avatar} alt={heroTestimonial.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-zinc-300 leading-relaxed italic mb-1">&ldquo;{heroTestimonial.quote}&rdquo;</p>
          <p className="text-xs text-zinc-500">
            <span className="text-white font-medium">{heroTestimonial.name}</span> · {heroTestimonial.role}
          </p>
        </div>
      </div>

      <ul className="relative space-y-3 text-left max-w-xl mx-auto">
        {funnel.heroBenefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm text-zinc-300">
            <iconify-icon
              icon="solar:check-circle-bold"
              width="18"
              height="18"
              className={`${accent.text} shrink-0 mt-0.5`}
            />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  )
}
