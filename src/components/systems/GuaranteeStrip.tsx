const GUARANTEE_ITEMS = [
  { icon: 'solar:shield-check-linear', text: 'You own your data' },
  { icon: 'solar:lock-unlocked-linear', text: 'No long-term lock-in' },
  { icon: 'solar:calendar-minimalistic-linear', text: 'Cancel retainer anytime' },
  { icon: 'solar:clock-circle-linear', text: '24h confirmation' },
]

type GuaranteeStripProps = {
  accentText?: string
}

export function GuaranteeStrip({ accentText = 'text-zinc-500' }: GuaranteeStripProps) {
  return (
    <div className="gradient-border rounded-lg border border-white/10 bg-surface-raised/40 depth-shadow p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GUARANTEE_ITEMS.map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <iconify-icon icon={item.icon} width="20" height="20" className={accentText} />
            <span className="text-sm text-zinc-400">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
