import { Container } from '@/components/ui/Container'
import { SystemsLensProvider } from '@/components/systems/page/SystemsLensContext'
import { LivingSystemHero } from '@/components/systems/page/LivingSystemHero'
import { WorkflowVisualizer } from '@/components/systems/page/WorkflowVisualizer'
import { ModuleWorkbench } from '@/components/systems/page/ModuleWorkbench'
import { BeforeAfterSlider } from '@/components/systems/page/BeforeAfterSlider'
import { TierAccordionCards } from '@/components/systems/page/TierAccordionCards'
import { SystemInAction } from '@/components/systems/page/SystemInAction'
import { SystemStack } from '@/components/systems/page/SystemStack'
import { ManualVsSystem } from '@/components/systems/page/ManualVsSystem'
import { WhatHappensWhen } from '@/components/systems/page/WhatHappensWhen'
import { SystemActivityTicker } from '@/components/systems/page/SystemActivityTicker'
import { DiagnosticCta, ProcessAndRule } from '@/components/systems/page/DiagnosticCta'
import { SYSTEMS_PAGE_COPY } from '@/lib/systems/page-content'

export default function SystemsPage() {
  return (
    <SystemsLensProvider>
      <Container bordered className="pt-32 pb-20">
        <LivingSystemHero />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <WorkflowVisualizer />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <ModuleWorkbench />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <BeforeAfterSlider />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <TierAccordionCards />
        <p className="mt-10 max-w-2xl text-sm text-zinc-500 leading-relaxed">
          {SYSTEMS_PAGE_COPY.combine.body}
        </p>
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <SystemInAction />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <SystemStack />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <ManualVsSystem />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <WhatHappensWhen />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <SystemActivityTicker />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <ProcessAndRule />
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <DiagnosticCta />
      </Container>
    </SystemsLensProvider>
  )
}
