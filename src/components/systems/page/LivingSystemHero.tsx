'use client'

import { PageTitle } from '@/components/ui/PageTitle'
import { Section } from '@/components/ui/Section'
import { LensSelector } from '@/components/systems/page/LensSelector'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'
import { SYSTEMS_PAGE_COPY } from '@/lib/systems/page-content'
import { SystemGraph } from '@/components/systems/page/SystemGraph'

export function LivingSystemHero() {
  const { lens } = useSystemsLens()

  return (
    <Section reveal>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          {SYSTEMS_PAGE_COPY.eyebrow}
        </p>
        <PageTitle
          text="Systems"
          className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold"
          speed={100}
        />

        <div className="max-w-2xl space-y-5 text-base font-light text-[#d5c8b8] leading-[1.8]">
          {SYSTEMS_PAGE_COPY.lede.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="space-y-2 text-[#b8a890]">
            {SYSTEMS_PAGE_COPY.problems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-gold font-medium">{SYSTEMS_PAGE_COPY.punch}</p>
          <p>{SYSTEMS_PAGE_COPY.closer}</p>
        </div>
      </div>

      <div className="mt-12 md:mt-14">
        <SystemGraph />
        <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-600">
          Live path · {lens.label}
        </p>
      </div>

      <div className="mt-14 md:mt-16 pt-10 border-t border-white/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          {SYSTEMS_PAGE_COPY.aroundHowYouWork.eyebrow}
        </p>
        <div className="max-w-2xl space-y-4 text-base font-light text-[#d5c8b8] leading-[1.8] mb-8">
          {SYSTEMS_PAGE_COPY.aroundHowYouWork.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="text-gold font-medium">{SYSTEMS_PAGE_COPY.aroundHowYouWork.punch}</p>
          <p>{SYSTEMS_PAGE_COPY.aroundHowYouWork.closer}</p>
        </div>
        <LensSelector />
      </div>
    </Section>
  )
}
