import type { FunnelContent } from '@/lib/systems/funnel-content'
import type { SystemsTier } from '@/lib/systems/tiers'
import { FunnelCta } from '@/components/systems/FunnelCta'

type PricingNestedSectionProps = {
  tier: SystemsTier
  funnel: FunnelContent
}

export function PricingNestedSection({ tier, funnel }: PricingNestedSectionProps) {
  const { accent } = funnel

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`flashlight-card bg-surface-raised/50 depth-shadow-lg p-8 lg:p-12 text-center relative overflow-hidden ${
          tier.isScoped ? 'gradient-border-brand-pulse' : 'gradient-border-brand'
        }`}
      >
        <div className={`glow-orb top-0 left-1/2 -translate-x-1/2 w-64 h-64 ${accent.glow}`} aria-hidden />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
            What determines your investment
          </p>
          <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight gradient-text mb-2">
            {tier.name}
          </h2>
          <p className="text-sm text-zinc-500 italic mb-8">{tier.tagline}</p>

          <p className="text-base font-light text-zinc-400 leading-relaxed mb-8">
            Every artist&apos;s starting point is different. On the call, we&apos;ll figure out exactly what you need.
          </p>

          <div className="max-w-xs mx-auto mb-8">
            <div className="p-4 rounded-lg border border-white/10 bg-black/20">
              <p className="text-lg font-semibold text-white">{tier.timeline}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Timeline</p>
            </div>
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed mb-8">{tier.forYouIf}</p>

          <FunnelCta
            label={funnel.ctaLabel}
            className="w-full"
            accentGlow="shadow-[0_0_28px_-6px_rgba(255,255,255,0.18)]"
          />
        </div>
      </div>
    </div>
  )
}
