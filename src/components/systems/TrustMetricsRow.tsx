'use client'

import { FUNNEL_SHARED } from '@/lib/systems/funnel-content'
import { useCountUp } from '@/hooks/useCountUp'

function MetricCell({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value)

  return (
    <div className="text-center">
      <p ref={ref} className="text-xl md:text-2xl font-oswald font-semibold text-white">
        {display}
      </p>
      <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider mt-1">{label}</p>
    </div>
  )
}

export function TrustMetricsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/10">
      {FUNNEL_SHARED.trustMetrics.map((metric) => (
        <MetricCell key={metric.label} value={metric.value} label={metric.label} />
      ))}
    </div>
  )
}
