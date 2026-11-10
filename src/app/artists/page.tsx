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
  ARTISTS_CTA_LABEL,
  MONTHLY_OFFERS,
  PROJECT_OFFERS,
  ROSTER_OFFERS,
  type ArtistOffer,
} from '@/lib/artists/page-content'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.artists)

const sectionBorder = 'py-24 border-t border-[#d8aa67]/15'
const eyebrow = 'text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3'
const h2 = 'text-3xl md:text-4xl font-display uppercase tracking-normal text-gold mb-4 max-w-3xl'
const bodyText = 'text-base font-light text-zinc-400 leading-[1.8] max-w-2xl'

function OfferCard({ offer }: { offer: ArtistOffer }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-raised/30 p-6 flex flex-col">
      <h3 className="text-xl font-display uppercase tracking-normal text-gold">{offer.name}</h3>
      {offer.price ? (
        <p className="mt-2 text-2xl text-white font-light">{offer.price}</p>
      ) : (
        <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">By application</p>
      )}
      {offer.meta && <p className="mt-2 text-sm text-zinc-500">{offer.meta}</p>}
      {offer.includesNote && (
        <p className="mt-5 text-xs uppercase tracking-widest text-zinc-500">{offer.includesNote}</p>
      )}
      <ul className={`${offer.includesNote ? 'mt-3' : 'mt-5'} space-y-2 text-sm text-zinc-300 leading-relaxed`}>
        {offer.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d8aa67]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function ArtistsPage() {
  const c = ARTISTS_COPY

  return (
    <>
      <Container bordered className="pt-28 md:pt-32 pb-16 md:pb-20">
        <Section reveal>
          <p className={eyebrow}>{c.eyebrow}</p>
          <h1 className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold">
            {c.title}
          </h1>
          <div className="max-w-2xl space-y-5 text-base font-light text-[#d5c8b8] leading-[1.8]">
            {c.lede.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <Link href={ARTISTS_BOOKING_HREF} className="btn-primary">
              {ARTISTS_CTA_LABEL}
              <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
            </Link>
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.problem.eyebrow}</p>
          <h2 className={h2}>{c.problem.title}</h2>
          <ul className="mt-6 mb-8 space-y-2 text-[#b8a890]">
            {c.problem.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-gold font-medium">{c.problem.punch}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.what.eyebrow}</p>
          <h2 className={h2}>{c.what.title}</h2>
          <p className={`${bodyText} mb-10`}>{c.what.body}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.what.pillars.map((pillar) => (
              <div key={pillar.id} className="rounded-lg border border-white/10 bg-surface-raised/30 p-6">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{pillar.number}</p>
                <h3 className="text-2xl font-display uppercase tracking-normal text-gold mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-white font-medium max-w-2xl">{c.what.punch}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.process.eyebrow}</p>
          <h2 className={`${h2} mb-10`}>{c.process.title}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {c.process.steps.map((step, index) => (
              <li key={step.id} className="rounded-lg border border-white/10 bg-surface-raised/30 p-5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-lg font-display uppercase tracking-normal text-gold mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.monthly.eyebrow}</p>
          <h2 className={h2}>{c.monthly.title}</h2>
          <p className={`${bodyText} mb-10`}>{c.monthly.body}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {MONTHLY_OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500 max-w-2xl">{c.monthly.note}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.projects.eyebrow}</p>
          <h2 className={h2}>{c.projects.title}</h2>
          <p className={`${bodyText} mb-10`}>{c.projects.body}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {PROJECT_OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.roster.eyebrow}</p>
          <h2 className={h2}>{c.roster.title}</h2>
          <p className={`${bodyText} mb-10`}>{c.roster.body}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {ROSTER_OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          <div className="mt-10">
            <Link href={ARTISTS_BOOKING_HREF} className="btn-primary">
              {ARTISTS_APPLY_LABEL}
              <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
            </Link>
          </div>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.fit.eyebrow}</p>
          <ul className="mt-2 mb-8 space-y-3 text-base font-light text-[#d5c8b8] leading-[1.8] max-w-2xl">
            {c.fit.for.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={`${bodyText} mb-4`}>{c.fit.notFor}</p>
          <p className={bodyText}>{c.fit.notManagement}</p>
        </Section>
      </Container>

      <Container bordered className={sectionBorder}>
        <Section reveal>
          <h2 className={h2}>{c.closing.title}</h2>
          <p className={`${bodyText} mb-8`}>{c.closing.body}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href={ARTISTS_BOOKING_HREF} className="btn-primary">
              {ARTISTS_CTA_LABEL}
              <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
            </Link>
            <Link
              href="/systems"
              className="inline-flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Just need the infrastructure?
              <iconify-icon icon="solar:alt-arrow-right-linear" width="16" height="16" />
            </Link>
          </div>
        </Section>
      </Container>
    </>
  )
}
