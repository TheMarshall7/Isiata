'use client'

import { Section } from '@/components/ui/Section'
import { AnimatedFlow } from '@/components/systems/page/AnimatedFlow'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'

export function WorkflowVisualizer() {
  const { lens } = useSystemsLens()

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        System visualizer
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        {lens.label} workflow
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        Same underlying system. Different configuration. This is the path a person takes through a {lens.label.toLowerCase()} business.
      </p>
      <div className="rounded-lg border border-white/10 bg-surface-raised/40 p-6 md:p-8 depth-shadow">
        <AnimatedFlow steps={lens.workflow.map((step) => step.label)} />
      </div>
    </Section>
  )
}
