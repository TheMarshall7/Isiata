'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import type { FunnelContent } from '@/lib/systems/funnel-content'
import type { SystemsTier } from '@/lib/systems/tiers'
import { ComparisonTable } from '@/components/systems/ComparisonTable'
import { FaqAccordion } from '@/components/systems/FaqAccordion'
import { FunnelCta } from '@/components/systems/FunnelCta'
import { FunnelHero } from '@/components/systems/FunnelHero'
import { GuaranteeStrip } from '@/components/systems/GuaranteeStrip'
import { ProcessSteps } from '@/components/systems/ProcessSteps'
import { SectionEyebrow } from '@/components/systems/SectionEyebrow'
import { StickyCtaBar } from '@/components/systems/StickyCtaBar'
import { AccountHaloSection } from '@/components/systems/sections/AccountHaloSection'
import { AsymmetricPainGrid } from '@/components/systems/sections/AsymmetricPainGrid'
import { BenefitsFeatureGrid } from '@/components/systems/sections/BenefitsFeatureGrid'
import { CloserStaggerSection } from '@/components/systems/sections/CloserStaggerSection'
import { PricingNestedSection } from '@/components/systems/sections/PricingNestedSection'
import { TestimonialSlider } from '@/components/systems/sections/TestimonialSlider'

type SystemFunnelProps = {
  tier: SystemsTier
  funnel: FunnelContent
}

function FunnelDivider() {
  return <div className="divider-fade" aria-hidden />
}

export function SystemFunnel({ tier, funnel }: SystemFunnelProps) {
  const { accent } = funnel

  return (
    <>
      <StickyCtaBar tierName={tier.name} ctaLabel={funnel.ctaLabel} />

      {/* Hero — Layout 3 centered */}
      <Container bordered className="pt-8 pb-20 md:pb-28">
        <Section reveal>
          <FunnelHero tier={tier} funnel={funnel} />
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Creator Account — Layout 5 halo */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <AccountHaloSection funnel={funnel} />
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Pain — Layout 11 asymmetric */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <SectionEyebrow number="03" label="The problem" accentText={accent.text} />
          <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-12">
            Sound familiar?
          </h2>
          <AsymmetricPainGrid painPoints={funnel.painPoints} />
          <div className="mt-12">
            <FunnelCta label={funnel.ctaLabel} accentGlow="shadow-[0_0_20px_-6px_rgba(255,255,255,0.12)]" />
          </div>
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Benefits — Layout 9 image + grid */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <SectionEyebrow number="04" label="What changes for you" accentText={accent.text} />
          <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-4">
            Benefits and outcomes
          </h2>
          <p className="text-zinc-400 mb-12 max-w-2xl">
            This is what your AreoClient Creator Account actually does for your business.
          </p>
          <BenefitsFeatureGrid
            benefits={funnel.benefits}
            tierName={tier.name}
            accent={accent}
          />
          <div className="mt-12">
            <FunnelCta label={funnel.ctaLabel} />
          </div>
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Comparison — Layout 7 */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <SectionEyebrow number="05" label="Why not DIY?" accentText={accent.text} />
          <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-10">
            Link-in-bio vs your creator account
          </h2>
          <ComparisonTable rows={funnel.comparisonRows} accent={accent} />
          <div className="mt-12">
            <FunnelCta label={funnel.ctaLabel} />
          </div>
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Outcome — Layout 3 centered */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <div
            className={`relative max-w-4xl mx-auto text-center p-10 lg:p-16 rounded-lg gradient-border border ${accent.border} bg-gradient-to-br from-white/[0.06] via-surface-raised/80 to-transparent depth-shadow-lg overflow-hidden`}
          >
            <div className={`glow-orb top-0 left-1/2 -translate-x-1/2 w-72 h-72 ${accent.glow}`} aria-hidden />
            <div className="relative">
              <SectionEyebrow number="06" label="Your outcome" accentText={accent.text} className="justify-center" />
              <p className="text-2xl md:text-3xl font-oswald uppercase tracking-tight gradient-text leading-snug">
                {tier.outcome}
              </p>
            </div>
          </div>
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Process — Layout 6 */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <SectionEyebrow number="07" label="How it works" accentText={accent.text} />
          <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-12">
            From call to launch
          </h2>
          <ProcessSteps
            steps={funnel.processSteps}
            accent={accent}
            tierIcon={tier.icon}
          />
          <div className="mt-12">
            <FunnelCta label={funnel.ctaLabel} />
          </div>
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Testimonials — Layout 4 slider */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <div className="text-center mb-12">
            <SectionEyebrow number="08" label="Proof" accentText={accent.text} className="justify-center" />
            <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white">
              What artists are saying
            </h2>
          </div>
          <TestimonialSlider />
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Pricing — Layout 8 nested */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <SectionEyebrow number="09" label="Your investment" accentText={accent.text} className="justify-center" />
          <PricingNestedSection tier={tier} funnel={funnel} />
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* FAQ */}
      <Container bordered className="py-20 md:py-28">
        <Section reveal>
          <SectionEyebrow number="10" label="Questions" accentText={accent.text} />
          <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-12">
            Before you book
          </h2>
          <div className="max-w-3xl">
            <FaqAccordion items={funnel.faqs} />
          </div>
        </Section>
      </Container>

      <Container bordered>
        <FunnelDivider />
      </Container>

      {/* Guarantee + Closer — Layout 10 */}
      <Container bordered className="py-20 pb-28 md:pb-20">
        <Section reveal>
          <div className="mb-12">
            <GuaranteeStrip accentText={accent.text} />
          </div>
          <CloserStaggerSection funnel={funnel} />
        </Section>
      </Container>
    </>
  )
}
