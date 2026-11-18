import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'
import {
  ARTISTS_APPLY_LABEL,
  ARTISTS_BOOKING_HREF,
  ARTISTS_COPY,
  ARTISTS_HERO_CTA_LABEL,
} from '@/lib/artists/page-content'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.systems)

const sectionBorder = 'py-24 border-t border-[#d8aa67]/15'
const eyebrow = 'text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3'
const h2 = 'text-3xl md:text-4xl font-display uppercase tracking-normal text-gold mb-4 max-w-3xl'
const bodyText = 'text-base font-light text-zinc-400 leading-[1.8] max-w-2xl'
const card = 'rounded-lg border border-white/10 bg-surface-raised/30 p-6'

function BulletList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 text-sm text-zinc-300 leading-relaxed ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d8aa67]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function CtaButton({ label }: { label: string }) {
  return (
    <Link href={ARTISTS_BOOKING_HREF} className="btn-primary">
      {label}
      <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
    </Link>
  )
}

export default function SystemsPage() {
  const c = ARTISTS_COPY

  return (
    <>
      <Container bordered className="pt-28 md:pt-32 pb-16 md:pb-20">
        <Section reveal>
          <p className={eyebrow}>{c.hero.eyebrow}</p>
          <h1 className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold">
            {c.hero.title}
          </h1>
          <div className="max-w-2xl space-y-5 text-base font-light text-[#d5c8b8] leading-[1.8]">
            {c.hero.lede.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 text-white font-medium max-w-2xl">{c.hero.tagline}</p>
          <p className="mt-2 text-lg text-gold">{c.hero.investment}</p>
          <div className="mt-10">
            <CtaButton label={ARTISTS_HERO_CTA_LABEL} />
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.problem.eyebrow}</p>
          <h2 className={h2}>{c.problem.title}</h2>
          <p className={`${bodyText} mb-4`}>{c.problem.intro}</p>
          <p className="text-white font-medium mb-6">{c.problem.question}</p>
          <div className={`${bodyText} space-y-4 mb-8`}>
            {c.problem.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{c.problem.resultLabel}</p>
          <p className="text-[#d5c8b8] max-w-2xl mb-8">{c.problem.result}</p>
          <p className="text-gold font-medium max-w-2xl">{c.problem.punch}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.opportunity.eyebrow}</p>
          <h2 className={h2}>{c.opportunity.title}</h2>
          <p className={`${bodyText} mb-6`}>{c.opportunity.lead}</p>
          <BulletList items={c.opportunity.items} className="mb-10 max-w-2xl" />
          <div className="space-y-1 max-w-2xl">
            {c.opportunity.punch.map((line, index) => (
              <p key={line} className={index === 0 ? 'text-zinc-400' : 'text-white font-medium'}>
                {line}
              </p>
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.solution.eyebrow}</p>
          <h2 className={h2}>{c.solution.title}</h2>
          <div className={`${bodyText} space-y-4 mb-10`}>
            {c.solution.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.solution.split.map((line) => (
              <div key={line} className={card}>
                <p className="text-lg font-display uppercase tracking-normal text-gold">{line}</p>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.build.eyebrow}</p>
          <h2 className={`${h2} mb-10`}>{c.build.title}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.build.components.map((component, index) => (
              <li key={component.id} className={card}>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-xl font-display uppercase tracking-normal text-gold mb-3">
                  {component.title}
                </h3>
                <p className="text-sm text-white leading-relaxed mb-2">{component.tagline}</p>
                {component.body && <p className="text-sm text-zinc-400 leading-relaxed">{component.body}</p>}
                {'examples' in component && component.examples && (
                  <>
                    <p className="mt-3 mb-2 text-xs uppercase tracking-widest text-zinc-500">
                      {component.examplesLabel}
                    </p>
                    <BulletList items={component.examples} />
                  </>
                )}
              </li>
            ))}
          </ol>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.experience.eyebrow}</p>
          <h2 className={`${h2} mb-10`}>{c.experience.title}</h2>
          {/* INSERT DEMONSTRATION VIDEO HERE */}
          <div
            role="img"
            aria-label={c.experience.videoPlaceholder}
            className="mb-10 flex aspect-video w-full max-w-3xl items-center justify-center rounded-lg border border-dashed border-[#d8aa67]/30 bg-surface-raised/30"
          >
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              {c.experience.videoPlaceholder}
            </p>
          </div>
          <p className={`${bodyText} mb-4`}>{c.experience.intro}</p>
          <ol className="mb-8 max-w-2xl list-decimal space-y-2 pl-5 text-sm text-zinc-300 leading-relaxed marker:text-[#d8aa67]">
            {c.experience.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="text-sm text-zinc-500 max-w-2xl">{c.experience.disclaimer}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.additional.eyebrow}</p>
          <h2 className={`${h2} mb-10`}>{c.additional.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.additional.items.map((item) => (
              <div key={item.id} className={card}>
                <h3 className="text-xl font-display uppercase tracking-normal text-gold mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.implementation.eyebrow}</p>
          <h2 className={`${h2} mb-10`}>{c.implementation.title}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {c.implementation.weeks.map((week) => (
              <li key={week.id} className={card}>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{week.label}</p>
                <h3 className="text-lg font-display uppercase tracking-normal text-gold mb-2">{week.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{week.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-zinc-500 max-w-2xl">{c.implementation.note}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.bonuses.eyebrow}</p>
          <h2 className={h2}>{c.bonuses.title}</h2>
          <BulletList items={c.bonuses.items} className="mb-6 max-w-2xl" />
          <p className={bodyText}>{c.bonuses.note}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.investment.eyebrow}</p>
          <h2 className={`${h2} mb-10`}>{c.investment.title}</h2>
          <div className={`${card} max-w-xl`}>
            <h3 className="text-xl font-display uppercase tracking-normal text-gold">{c.investment.name}</h3>
            <p className="mt-2 text-3xl text-white font-light">{c.investment.price}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-zinc-500">{c.investment.optionsLabel}</p>
            <BulletList items={c.investment.options} className="mt-3" />
          </div>
          <p className={`${bodyText} mt-8 mb-3`}>{c.investment.capacity}</p>
          <p className="text-sm text-zinc-500 max-w-2xl">{c.investment.secured}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.fit.eyebrow}</p>
          <h2 className={h2}>{c.fit.title}</h2>
          <p className={`${bodyText} mb-6`}>{c.fit.lead}</p>
          <BulletList items={c.fit.for} className="mb-8 max-w-2xl" />
          <div className={`${bodyText} space-y-4`}>
            <p>{c.fit.criteria}</p>
            <p>{c.fit.requirements}</p>
            <p className="text-white font-medium">{c.fit.notFor}</p>
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.closing.eyebrow}</p>
          <h2 className={h2}>{c.closing.title}</h2>
          <p className="text-lg text-[#d5c8b8] mb-8 max-w-2xl">{c.closing.subtitle}</p>
          <h3 className="text-2xl font-display uppercase tracking-normal text-gold mb-3">{c.closing.heading}</h3>
          <p className={`${bodyText} mb-4`}>{c.closing.body}</p>
          <p className="text-white font-medium mb-8">{c.closing.capacity}</p>
          <CtaButton label={ARTISTS_APPLY_LABEL} />
          <p className="mt-12 text-xs text-zinc-500 leading-relaxed max-w-2xl">{c.closing.disclaimer}</p>
        </Section>
      </Container>
    </>
  )
}
