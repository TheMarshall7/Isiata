import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { OfferCard, ServicesHero, TeardownCta, TermsBlock, sectionLabel } from '@/components/services/ServicesParts'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'
import { BUSINESS_OFFERS, COHORT, SYSTEM_HREF } from '@/lib/services/content'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.servicesBusiness)

export default function BusinessServicesPage() {
  const starters = BUSINESS_OFFERS.filter((o) => o.id !== 'artist-business-system')
  const system = BUSINESS_OFFERS.find((o) => o.id === 'artist-business-system')!

  return (
    <>
      <Container bordered className="pb-4">
        <ServicesHero
          eyebrow="Services · Business"
          title="Build the brand, store and system around your music"
          lede={[
            'Your music has commercial value. It needs a brand people recognise, a store that sells, and a system that keeps fans close.',
            'Start with an hour on a call, or have the whole backend built for you. Earlier payments are credited toward bigger builds.',
          ]}
        >
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#offers" className="btn-primary cta-sheen">
              See the builds
              <iconify-icon icon="solar:arrow-down-linear" width="16" height="16" />
            </a>
            <Link href={SYSTEM_HREF} className="btn-secondary">
              The Artist Business System
              <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
            </Link>
          </div>
        </ServicesHero>
      </Container>

      <Container bordered className="space-y-16 py-12 md:space-y-20">
        <section id="offers" className="scroll-mt-28">
          <h2 className={`${sectionLabel} mb-1`}>Done for You</h2>
          <p className="mb-6 text-sm text-zinc-500">Each step is credited toward the next if you upgrade within 60 days.</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {starters.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>

          {/* The full system */}
          <article
            id={system.id}
            className="relative mt-6 scroll-mt-32 overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.06] via-surface-raised/90 to-black/40 p-8 depth-shadow-lg lg:p-12"
          >
            <div className="glow-orb -top-24 left-1/3 h-80 w-80 bg-amber-500/15" aria-hidden />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="flex flex-col">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{system.timeline}</p>
                  <span className="rounded-full border border-[#d8aa67]/40 bg-[#d8aa67]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#f0dfc8]">
                    {system.badge}
                  </span>
                </div>
                <h3 className="font-display text-3xl uppercase tracking-normal text-gold md:text-5xl">{system.name}</h3>
                <div className="mb-6 mt-5 h-px w-10 bg-white/25" />
                <p className="mb-3 text-lg font-light leading-[1.7] text-zinc-200">{system.pitch}</p>
                <p className="mb-8 text-sm font-light leading-relaxed text-zinc-500">{system.forWho}</p>
                <div className="mt-auto">
                  <p className="mb-1 font-display text-2xl uppercase tracking-normal text-white">By application</p>
                  <p className="mb-6 text-xs text-zinc-500">Investment and payment options are covered on the system page and on the call.</p>
                  <Link href={system.href} className="btn-primary cta-sheen w-fit">
                    {system.cta}
                    <iconify-icon icon="solar:arrow-right-linear" width="18" height="18" />
                  </Link>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {system.includes!.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-white/[0.06] py-3 text-sm font-light text-zinc-300">
                    <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-[#d8aa67]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        {/* Cohort */}
        <section id={COHORT.id} className="scroll-mt-28">
          <h2 className={`${sectionLabel} mb-1`}>Built With You</h2>
          <p className="mb-6 text-sm text-zinc-500">Prefer to build it yourself, with a group and a guide?</p>
          <div className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 bg-gradient-to-b from-[#d8aa67]/[0.08] via-black/40 to-transparent p-8 depth-shadow md:p-12">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent" />
            <div className="relative mb-6 flex flex-wrap items-center gap-3">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8aa67]/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d8aa67]" />
              </span>
              <p className="font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8c3a4]">{COHORT.timeline}</p>
            </div>
            <h3 className="relative mb-3 font-display text-3xl font-normal uppercase tracking-normal text-[#f3ede3] md:text-4xl">
              The {COHORT.name}
            </h3>
            <p className="relative mb-8 max-w-2xl text-base font-light leading-[1.8] text-[#d5c8b8]/85">{COHORT.pitch}</p>
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <ul className="space-y-3">
                {COHORT.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-[#d8aa67]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {COHORT.tiers.map((tier, i) => (
                  <div
                    key={tier.name}
                    className={
                      i === 1
                        ? 'rounded-lg gradient-border-tsukuyomi bg-surface-raised p-6'
                        : 'rounded-lg border border-white/10 bg-black/40 p-6'
                    }
                  >
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-zinc-500">{tier.name}</p>
                    <p className="mb-3 font-display text-3xl font-semibold text-white">{tier.price}</p>
                    <p className="text-xs leading-relaxed text-zinc-400">{tier.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <a href={COHORT.href} className="btn-primary cta-sheen relative mt-10 w-fit">
              {COHORT.cta}
              <iconify-icon icon="solar:arrow-right-linear" width="18" height="18" />
            </a>
          </div>
        </section>

        <TermsBlock kind="business" />

        <TeardownCta />
      </Container>
    </>
  )
}
