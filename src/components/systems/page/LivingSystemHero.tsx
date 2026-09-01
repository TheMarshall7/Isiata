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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
            {SYSTEMS_PAGE_COPY.eyebrow}
          </p>
          <PageTitle
            text="Systems"
            className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-8"
            speed={100}
          />

          <div className="max-w-2xl space-y-5 text-base font-light text-zinc-400 leading-[1.8]">
            {SYSTEMS_PAGE_COPY.lede.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="space-y-2 text-zinc-500">
              {SYSTEMS_PAGE_COPY.problems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-white font-medium">{SYSTEMS_PAGE_COPY.punch}</p>
            <p>{SYSTEMS_PAGE_COPY.closer}</p>
          </div>
        </div>

        <div className="w-full">
          <SystemGraph />
          <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-600">
            Live path · {lens.label}
          </p>
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-white/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          {SYSTEMS_PAGE_COPY.aroundHowYouWork.eyebrow}
        </p>
        <div className="max-w-2xl space-y-4 text-base font-light text-zinc-400 leading-[1.8] mb-8">
          {SYSTEMS_PAGE_COPY.aroundHowYouWork.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="text-white font-medium">{SYSTEMS_PAGE_COPY.aroundHowYouWork.punch}</p>
          <p>{SYSTEMS_PAGE_COPY.aroundHowYouWork.closer}</p>
        </div>
        <LensSelector />
      </div>
    </Section>
  )
}
