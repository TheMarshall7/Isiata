import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { RoutePicker } from '@/components/services/RoutePicker'
import { ServicesHero, TeardownCta, TermsBlock, sectionLabel } from '@/components/services/ServicesParts'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'
import {
  BUSINESS_HREF,
  BUSINESS_OFFERS,
  COHORT,
  MUSIC_HREF,
  MUSIC_OFFERS,
  UPGRADE_PATH,
} from '@/lib/services/content'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.services)

const ROUTES = [
  {
    href: MUSIC_HREF,
    eyebrow: 'Route 01',
    title: 'Music',
    line: 'Gets your song finished and released.',
    icon: 'solar:music-note-slider-2-linear',
    items: MUSIC_OFFERS.map((o) => ({ name: o.name, price: o.price })),
    cta: 'See music services',
  },
  {
    href: BUSINESS_HREF,
    eyebrow: 'Route 02',
    title: 'Business',
    line: 'Builds the brand, store and system around it.',
    icon: 'solar:shop-2-linear',
    items: [
      ...BUSINESS_OFFERS.map((o) => ({ name: o.name, price: o.apply ? 'Apply' : o.price })),
      { name: COHORT.name, price: COHORT.tiers.map((t) => t.price).join(' / ') },
    ],
    cta: 'See business services',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Container bordered className="pb-4">
        <ServicesHero
          eyebrow="Services"
          title="Finish the music. Build the business around it."
          lede={[
            'Two routes. Music gets your song finished and released. Business builds the brand, store and system around it.',
            'Start with a single, add the Brand and Lookbook Starter, and upgrade later. Earlier payments are credited toward the bigger build.',
          ]}
        />
      </Container>

      <Container bordered className="space-y-16 py-12 md:space-y-20">
        {/* Two routes */}
        <section>
          <h2 className={`${sectionLabel} mb-6`}>Two Routes</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group relative flex flex-col overflow-hidden rounded-lg gradient-border-tsukuyomi bg-surface-raised p-8 depth-shadow transition-all duration-500 hover-glow lg:p-10"
              >
                <div className="glow-orb -top-20 right-0 h-56 w-56 bg-amber-500/10" aria-hidden />
                <div className="relative mb-6 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{route.eyebrow}</p>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8aa67]/30 bg-black/50 text-[#d8aa67]">
                    <iconify-icon icon={route.icon} width="22" height="22" />
                  </span>
                </div>
                <h3 className="relative font-display text-4xl uppercase tracking-normal text-gold md:text-5xl">{route.title}</h3>
                <p className="relative mb-6 mt-3 text-base font-light text-zinc-300">{route.line}</p>
                <ul className="relative mb-8 divide-y divide-white/[0.06]">
                  {route.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                      <span className="font-light text-zinc-300">{item.name}</span>
                      <span className="shrink-0 tabular-nums text-zinc-500">{item.price}</span>
                    </li>
                  ))}
                </ul>
                <span className="relative mt-auto inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#f0dfc8]">
                  {route.cta}
                  <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Upgrade path */}
        <section className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 bg-gradient-to-b from-[#d8aa67]/[0.08] via-black/40 to-transparent p-8 depth-shadow md:p-12">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent" />
          <p className="relative mb-6 font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8c3a4]">How the routes connect</p>
          <h2 className="relative mb-4 font-display text-3xl font-normal uppercase tracking-normal text-[#f3ede3] md:text-4xl">
            Start small. Nothing you pay is wasted.
          </h2>
          <p className="relative mb-10 max-w-2xl text-sm font-light leading-relaxed text-[#b8a890]">
            Each step is credited toward the next bigger build if you upgrade within 60 days.
          </p>
          <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
            {UPGRADE_PATH.map((step, i) => (
              <li key={step.step} className="relative border border-white/10 bg-black/40 p-5">
                <p className="mb-3 font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8aa67]/65">{String(i + 1).padStart(2, '0')}</p>
                <p className="mb-2 font-display text-lg uppercase tracking-normal text-[#f0dfc8]">{step.step}</p>
                <p className="mb-4 text-sm font-light leading-relaxed text-[#b8a890]/85">{step.detail}</p>
                <p className="text-xs tabular-nums text-zinc-500">{step.price}</p>
                {i < UPGRADE_PATH.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -bottom-3 left-1/2 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[#d8aa67]/40 bg-black text-[#d8aa67] md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
                  >
                    <iconify-icon icon="solar:alt-arrow-right-linear" width="12" height="12" className="rotate-90 md:rotate-0" />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="relative mt-6 text-[11px] text-zinc-500">
            Credits: Brand and Lookbook → Business Starter or System. Business Starter → System. Teardown → any build.
          </p>
        </section>

        {/* Picker */}
        <section>
          <h2 className={`${sectionLabel} mb-1`}>Where Should You Start?</h2>
          <p className="mb-6 text-sm text-zinc-500">Pick the line that sounds most like you.</p>
          <RoutePicker />
        </section>

        <TermsBlock kind="all" />

        <TeardownCta />
      </Container>
    </>
  )
}
