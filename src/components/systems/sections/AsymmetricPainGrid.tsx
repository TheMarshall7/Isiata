import type { FunnelPainPoint } from '@/lib/systems/funnel-content'
import { Stagger } from '@/components/ui/Stagger'

type AsymmetricPainGridProps = {
  painPoints: FunnelPainPoint[]
}

export function AsymmetricPainGrid({ painPoints }: AsymmetricPainGridProps) {
  const [primary, ...rest] = painPoints

  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      {primary && (
        <div className="md:col-span-1 lg:row-span-2 flashlight-card hover-depth hover-glow gradient-border border border-white/10 bg-surface-raised/50 depth-shadow p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 bg-black/30 mb-6">
            <iconify-icon icon={primary.icon} width="28" height="28" className="text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{primary.title}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{primary.description}</p>
        </div>
      )}
      {rest.map((pain, i) => (
        <div
          key={pain.title}
          className={`flashlight-card hover-glow gradient-border border border-white/10 bg-surface-raised/40 depth-shadow p-6 lg:p-8 ${
            i === 1 ? 'lg:mt-6' : i === 2 ? 'lg:-mt-2' : ''
          }`}
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-black/30 mb-4">
            <iconify-icon icon={pain.icon} width="22" height="22" className="text-white" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">{pain.title}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{pain.description}</p>
        </div>
      ))}
    </Stagger>
  )
}
