'use client'

import { useEffect, useState } from 'react'
import type { FunnelAccent, FunnelProcessStep } from '@/lib/systems/funnel-content'
import { AreoClientWhiteLogo } from '@/components/systems/AreoClientWhiteLogo'

type ProcessStepsProps = {
  steps: FunnelProcessStep[]
  accent: FunnelAccent
  tierIcon: string
}

export function ProcessSteps({ steps, accent, tierIcon }: ProcessStepsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [steps.length])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
      <div className="space-y-2">
        {steps.map((step, index) => {
          const isActive = activeIndex === index
          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-all duration-300 ${
                isActive
                  ? `${accent.border} bg-white/[0.05] opacity-100`
                  : 'border-white/10 bg-surface-raised/30 opacity-40 hover:opacity-70'
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  isActive ? 'bg-white text-black' : 'bg-white/10 text-zinc-400'
                }`}
              >
                {index + 1}
              </span>
              <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                {step.title}
              </span>
            </button>
          )
        })}

        <div className="flex justify-center gap-2 pt-4">
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative rounded-lg gradient-border-brand bg-transparent depth-shadow-lg overflow-hidden min-h-[280px] transition-all duration-300 isolate">
        <div className={`absolute inset-0 ${accent.glow} opacity-40`} aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center p-12 opacity-25 pointer-events-none">
          <AreoClientWhiteLogo alt="" className="w-full max-w-[180px] h-auto" />
        </div>
        <div className="relative h-full p-8 flex flex-col justify-center">
          <div className={`w-16 h-16 rounded-2xl border ${accent.border} bg-white/[0.05] flex items-center justify-center mb-6 transition-transform duration-300 scale-100`}>
            <iconify-icon icon={tierIcon} width="32" height="32" className="text-white" />
          </div>
          <p className={`text-xs font-semibold uppercase tracking-widest ${accent.text} mb-3`}>
            Step {activeIndex + 1} of {steps.length}
          </p>
          <h4 className="text-xl md:text-2xl font-oswald uppercase tracking-tight text-white mb-4">
            {activeStep.title}
          </h4>
          <p className="text-zinc-400 leading-relaxed">{activeStep.description}</p>
        </div>
      </div>
    </div>
  )
}
