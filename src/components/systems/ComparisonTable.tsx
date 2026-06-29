import type { FunnelComparisonRow, FunnelAccent } from '@/lib/systems/funnel-content'
import { FUNNEL_SHARED } from '@/lib/systems/funnel-content'

type ComparisonTableProps = {
  rows: FunnelComparisonRow[]
  accent?: FunnelAccent
}

const SUMMARY_ITEMS = [
  { icon: 'solar:users-group-rounded-linear', label: 'Owned contacts', diy: false },
  { icon: 'solar:calendar-mark-linear', label: 'Auto booking', diy: false },
  { icon: 'solar:letter-linear', label: 'SMS + email', diy: false },
  { icon: 'solar:chart-square-linear', label: 'Full CRM', diy: false },
]

export function ComparisonTable({ rows, accent }: ComparisonTableProps) {
  const { diy, account } = FUNNEL_SHARED.comparisonColumns

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {SUMMARY_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-surface-raised/30"
          >
            <iconify-icon icon={item.icon} width="22" height="22" className={accent?.text ?? 'text-emerald-400'} />
            <div>
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p className="text-xs text-zinc-500">Included in {account}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-500 w-1/4" />
            <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-500 w-[37.5%]">
              {diy}
            </th>
            <th className="py-4 text-xs font-semibold uppercase tracking-widest text-white w-[37.5%]">
              {account}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="py-4 pr-4 text-sm font-medium text-zinc-300">{row.label}</td>
              <td className="py-4 pr-4 text-sm text-zinc-500">{row.diy}</td>
              <td className="py-4 text-sm text-zinc-200">
                <span className="inline-flex items-start gap-2">
                  <iconify-icon
                    icon="solar:check-circle-bold"
                    width="16"
                    height="16"
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  {row.account}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
