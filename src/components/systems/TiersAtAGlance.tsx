import Link from 'next/link'
import { SYSTEMS_TIERS } from '@/lib/systems/tiers'
import { Price } from '@/components/ui/Price'

type TiersAtAGlanceProps = {
  currentTierId: string
}

export function TiersAtAGlance({ currentTierId }: TiersAtAGlanceProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[720px] text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Tier
            </th>
            <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Name
            </th>
            <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Starting at
            </th>
            <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Retainer
            </th>
            <th className="py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Timeline
            </th>
          </tr>
        </thead>
        <tbody>
          {SYSTEMS_TIERS.map((tier) => {
            const isCurrent = tier.id === currentTierId
            return (
              <tr
                key={tier.id}
                className={`border-b border-white/5 transition-colors ${
                  isCurrent ? 'bg-white/[0.06]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <td className="py-4 pr-4 text-sm text-zinc-500">{tier.tier}</td>
                <td className="py-4 pr-4 text-sm font-medium text-white">
                  {isCurrent ? (
                    <span>{tier.name}</span>
                  ) : (
                    <Link
                      href={`/systems/${tier.id}`}
                      className="hover:text-zinc-300 transition-colors"
                    >
                      {tier.name}
                    </Link>
                  )}
                </td>
                <td className="py-4 pr-4 text-sm text-zinc-300">
                  {tier.isScoped ? (
                    <span>{tier.startingAt}</span>
                  ) : (
                    <Price value={tier.startingAt} />
                  )}
                </td>
                <td className="py-4 pr-4 text-sm text-zinc-400">
                  {tier.isScoped ? (
                    <span>{tier.retainer}</span>
                  ) : (
                    <Price value={tier.retainer} />
                  )}
                </td>
                <td className="py-4 text-sm text-zinc-400">{tier.timeline}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
