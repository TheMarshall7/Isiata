import type { FunnelAccent, FunnelBenefit } from '@/lib/systems/funnel-content'
import { ISIATA_LOGO_URL } from '@/lib/constants'
import { Stagger } from '@/components/ui/Stagger'

type BenefitsFeatureGridProps = {
  benefits: FunnelBenefit[]
  tierName: string
  accent: FunnelAccent
}

export function BenefitsFeatureGrid({ benefits, tierName, accent }: BenefitsFeatureGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
      <div className="relative lg:sticky lg:top-28 flex items-center justify-center aspect-[4/3] p-12 md:p-16 isolate">
        <div className={`absolute inset-0 ${accent.glow} blur-3xl rounded-full opacity-40`} aria-hidden />
        <img
          src={ISIATA_LOGO_URL}
          alt={`${tierName} — ISIATA`}
          className="relative w-full max-w-[220px] h-auto object-contain"
        />
      </div>

      <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flashlight-card hover-glow gradient-border-brand bg-surface-raised/30 p-5 lg:p-6"
          >
            <iconify-icon icon={benefit.icon} width="22" height="22" className={`${accent.text} mb-3`} />
            <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </Stagger>
    </div>
  )
}
