'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

type AnimatedFlowProps = {
  steps: string[]
  className?: string
  intervalMs?: number
  /** When set, animation is driven externally instead of an internal timer. */
  activeIndex?: number
}

type StepState = {
  isActive: boolean
  isPast: boolean
}

function stepClass({ isActive, isPast }: StepState) {
  return cn(
    'inline-flex items-center justify-center rounded-md border font-semibold uppercase tracking-widest leading-snug transition-all duration-500',
    'px-3 py-2 text-[10px] sm:text-[11px]',
    'md:px-3.5 md:py-2 md:whitespace-nowrap',
    isActive
      ? 'border-white/50 bg-white text-black'
      : isPast
        ? 'border-white/20 bg-white/10 text-white'
        : 'border-white/10 text-zinc-500'
  )
}

function VerticalConnector({ isPast, isActive }: StepState) {
  const lit = isPast || isActive
  return (
    <span
      aria-hidden
      className={cn(
        'flex items-center justify-center py-2 text-zinc-700',
        lit && 'text-white/35'
      )}
    >
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" className="shrink-0">
        <path d="M5 0v14M5 14l-3.5-3.5M5 14l3.5-3.5" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </span>
  )
}

function HorizontalConnector({ isPast, isActive }: StepState) {
  const lit = isPast || isActive
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block h-px w-4 sm:w-5 lg:w-6 shrink-0 transition-colors duration-500',
        lit ? 'bg-white/50' : 'bg-white/15'
      )}
    />
  )
}

export function AnimatedFlow({ steps, className, intervalMs = 1100, activeIndex }: AnimatedFlowProps) {
  const reduced = usePrefersReducedMotion()
  const [internalActive, setInternalActive] = useState(0)
  const isControlled = activeIndex !== undefined
  const active = isControlled ? activeIndex : internalActive
  const stepsKey = useMemo(() => steps.join('\0'), [steps])

  useEffect(() => {
    if (isControlled) return
    setInternalActive(0)
    if (reduced || steps.length < 2) return
    const id = window.setInterval(() => {
      setInternalActive((index) => (index + 1) % steps.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [stepsKey, steps.length, reduced, intervalMs, isControlled])

  if (steps.length === 0) return null

  return (
    <div className={cn('w-full', className)}>
      {/* Phones: vertical timeline — no awkward mid-row wraps */}
      <ol className="flex flex-col items-center gap-0 md:hidden">
        {steps.map((step, index) => {
          const state: StepState = {
            isActive: reduced || index === active,
            isPast: !reduced && index < active,
          }
          return (
            <li key={`${step}-${index}-v`} className="flex w-full max-w-xs flex-col items-center">
              <span className={cn(stepClass(state), 'w-full text-center whitespace-normal')}>{step}</span>
              {index < steps.length - 1 && <VerticalConnector {...state} />}
            </li>
          )
        })}
      </ol>

      {/* md+: single row with scroll when needed — connectors stay on one line */}
      <div className="hidden md:block w-full overflow-x-auto overscroll-x-contain pt-6 pb-4 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]">
        <ol className="flex w-max min-w-full items-center justify-start gap-x-2 px-1 py-2 lg:gap-x-3 lg:px-2">
          {steps.map((step, index) => {
            const state: StepState = {
              isActive: reduced || index === active,
              isPast: !reduced && index < active,
            }
            return (
              <li key={`${step}-${index}-h`} className="flex shrink-0 items-center gap-x-2 lg:gap-x-3">
                <span className={stepClass(state)}>{step}</span>
                {index < steps.length - 1 && <HorizontalConnector {...state} />}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
