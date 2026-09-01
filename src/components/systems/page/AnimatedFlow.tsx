'use client'

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

type AnimatedFlowProps = {
  steps: string[]
  className?: string
  intervalMs?: number
}

export function AnimatedFlow({ steps, className, intervalMs = 1100 }: AnimatedFlowProps) {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
    if (reduced || steps.length < 2) return
    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % steps.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [steps, reduced, intervalMs])

  return (
    <ol className={cn('flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-0', className)}>
      {steps.map((step, index) => {
        const isActive = reduced || index === active
        const isPast = !reduced && index < active
        return (
          <li key={`${step}-${index}`} className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center px-3 py-1.5 rounded-md border text-[11px] font-semibold uppercase tracking-widest transition-all duration-500',
                isActive
                  ? 'border-white/50 bg-white text-black'
                  : isPast
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-white/10 text-zinc-500'
              )}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  'hidden sm:inline-block w-6 h-px mx-1 transition-colors duration-500',
                  isPast || isActive ? 'bg-white/50' : 'bg-white/15'
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
