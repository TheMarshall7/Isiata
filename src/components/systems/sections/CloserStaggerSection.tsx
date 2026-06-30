import type { FunnelContent } from '@/lib/systems/funnel-content'
import { FunnelCta } from '@/components/systems/FunnelCta'

type CloserStaggerSectionProps = {
  funnel: FunnelContent
}

export function CloserStaggerSection({ funnel }: CloserStaggerSectionProps) {
  const { accent, heroTestimonial } = funnel
  const staggered = funnel.closerBenefits.slice(0, 3)

  return (
    <div className="relative max-w-3xl mx-auto p-10 lg:p-14 rounded-lg gradient-border-brand bg-gradient-to-br from-white/[0.06] via-surface-raised/80 to-transparent depth-shadow-lg overflow-hidden">
      <div className={`glow-orb top-0 left-1/2 -translate-x-1/2 w-72 h-72 ${accent.glow}`} aria-hidden />

      <div className="relative text-center">
        <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight gradient-text mb-10">
          {funnel.closerHeadline}
        </h2>

        <div className="space-y-4 mb-10 max-w-md mx-auto text-left">
          {staggered.map((benefit, i) => (
            <div
              key={benefit}
              className={`flex items-start gap-3 p-4 rounded-lg border border-white/10 bg-black/20 ${
                i === 0 ? 'ml-0' : i === 1 ? 'ml-4 md:ml-8' : 'ml-8 md:ml-16'
              }`}
            >
              <iconify-icon
                icon="solar:check-circle-bold"
                width="18"
                height="18"
                className={`${accent.text} shrink-0 mt-0.5`}
              />
              <span className="text-sm text-zinc-300">{benefit}</span>
            </div>
          ))}
        </div>

        {funnel.closerBenefits.length > 3 && (
          <ul className="space-y-2 mb-8 text-left max-w-md mx-auto">
            {funnel.closerBenefits.slice(3).map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-zinc-400">
                <iconify-icon icon="solar:check-circle-linear" width="16" height="16" className="shrink-0 mt-0.5" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-center gap-3 mb-8 p-4 rounded-lg border border-white/10 bg-black/20 max-w-sm mx-auto">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
            <img src={heroTestimonial.avatar} alt={heroTestimonial.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-zinc-400 text-left italic">
            &ldquo;{heroTestimonial.quote}&rdquo;
            <span className="block text-zinc-500 not-italic mt-1">{heroTestimonial.name}</span>
          </p>
        </div>

        <FunnelCta label={funnel.ctaLabel} accentGlow="shadow-[0_0_32px_-8px_rgba(255,255,255,0.2)]" showAvatars />
      </div>
    </div>
  )
}
