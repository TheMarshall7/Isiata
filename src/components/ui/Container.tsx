import { ContainerProps } from '@/types'
import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
  maxWidth = '7xl',
  bordered = false,
}: ContainerProps) {
  const maxWidths = {
    full: 'max-w-full',
    '7xl': 'max-w-7xl',
    '4xl': 'max-w-4xl',
    '2xl': 'max-w-2xl',
  }

  return (
    <div
      className={cn(
        'mx-auto px-6',
        maxWidths[maxWidth],
        bordered && 'border-x border-white/10',
        className
      )}
    >
      {children}
    </div>
  )
}
