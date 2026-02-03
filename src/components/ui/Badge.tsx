import { BadgeProps } from '@/types'
import { STATUS_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Badge({ status, className }: BadgeProps) {
  const statusLabels = {
    live: 'Available Now',
    upcoming: 'Coming Soon',
    archived: 'Archived',
    'sold-out': 'Sold Out',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-3 py-1 border text-xs font-medium tracking-wide uppercase',
        STATUS_COLORS[status],
        className
      )}
    >
      {statusLabels[status]}
    </div>
  )
}
