import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { TransformationStudio } from '@/components/mix-master/TransformationStudio'
import { OfferCard, ServicesHero, TeardownCta, TermsBlock, sectionLabel } from '@/components/services/ServicesParts'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'
import { MIX_MASTER_EXAMPLES, MUSIC_COPY } from '@/lib/mix-master/page-content'
import { BUSINESS_HREF, MUSIC_OFFERS } from '@/lib/services/content'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.servicesMusic)

export default function MusicServicesPage() {
  const c = MUSIC_COPY
  const singles = MUSIC_OFFERS.slice(0, 3)
  const projects = MUSIC_OFFERS.slice(3)

  return (
    <>
      <Container bordered className="pb-4">
        <ServicesHero
          eyebrow="Services · Music"
          title="Get your song finished and released"
          lede={[
            'You wrote it. You recorded it. But the bounce sounds flat next to the songs you love.',
            'From a quick finish on a track that is close, to a full EP or album built as one project.',
          ]}
        >
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#offers" className="btn-primary cta-sheen">
              See the tiers · from {MUSIC_OFFERS[0].price.split('–')[0]}
              <iconify-icon icon="solar:arrow-down-linear" width="16" height="16" />
            </a>
            <a href="#listen" className="btn-secondary">
              Hear before / after
              <iconify-icon icon="solar:headphones-round-linear" width="16" height="16" />
            </a>
          </div>
        </ServicesHero>
      </Container>

      <Container bordered className="space-y-16 py-12 md:space-y-20">
        <section id="listen" className="scroll-mt-28">
          <h2 className={`${sectionLabel} mb-1`}>{c.listen.title}</h2>
          <p className="mb-6 max-w-2xl text-sm text-zinc-500">{c.listen.body}</p>
          <TransformationStudio examples={MIX_MASTER_EXAMPLES} />
        </section>

        <section>
          <h2 className={`${sectionLabel} mb-6`}>What You&apos;ll Hear Change</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.changes.map((item) => (
              <div
                key={item.title}
                className="border border-white/10 bg-surface-raised p-6 transition-all duration-300 hover:border-white/20 hover:bg-surface-overlay"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#d8aa67]/30 bg-black/50 text-[#d8aa67]">
                  <iconify-icon icon={item.icon} width="20" height="20" />
                </div>
                <h3 className="mb-2 font-display text-lg uppercase tracking-normal text-[#f0dfc8]">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="offers" className="scroll-mt-28">
          <h2 className={`${sectionLabel} mb-1`}>Singles</h2>
          <p className="mb-6 text-sm text-zinc-500">One song, from a quick finish to the full release package.</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {singles.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>

          <h2 className={`${sectionLabel} mb-1 mt-14`}>Projects</h2>
          <p className="mb-6 text-sm text-zinc-500">Multiple songs built as one cohesive body of work.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>

          <a
            href={BUSINESS_HREF}
            className="group mt-6 flex flex-col gap-2 border border-white/10 bg-black/30 p-6 transition-colors hover:border-[#d8aa67]/40 md:flex-row md:items-center md:justify-between"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-widest text-zinc-500">Next step</span>
              <span className="text-sm text-zinc-300">
                Song done? Add the Brand and Lookbook Starter. What you pay here is credited if you upgrade within 60 days.
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#f0dfc8]">
              Business services
              <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </section>

        <div className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 bg-gradient-to-b from-[#d8aa67]/[0.08] via-black/40 to-transparent p-8 depth-shadow md:p-12">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent" />
          <p className="relative mb-6 font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8c3a4]">How It Works</p>
          <h2 className="relative mb-4 font-display text-3xl font-normal uppercase tracking-normal text-[#f3ede3] md:text-4xl">
            Rough bounce to release
          </h2>
          <div className="relative mb-10 flex w-full max-w-[10rem] items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-[#d8aa67]/70 to-transparent" />
            <span className="h-1 w-1 rotate-45 bg-[#d8aa67]/80" />
          </div>
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {c.process.map((step, i) => (
              <div key={step.title}>
                <p className="mb-3 font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8aa67]/65">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mb-2 font-display text-lg font-normal uppercase tracking-normal text-[#f0dfc8]">{step.title}</p>
                <p className="text-sm font-light leading-relaxed text-[#b8a890]/85">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <section>
          <h2 className={`${sectionLabel} mb-6`}>Before You Send</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {c.faq.map((item, i) => (
              <article key={item.question} className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 p-8 lg:p-10">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-2xl uppercase tracking-normal text-gold">{item.question}</h3>
                <div className="mb-6 mt-5 h-px w-10 bg-white/25" />
                <p className="text-base font-light leading-[1.8] text-zinc-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <TermsBlock kind="music" />

        <TeardownCta title="Want the bigger picture first?" />
      </Container>
    </>
  )
}
