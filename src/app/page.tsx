'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { StayCloseSection } from '@/components/home/StayCloseSection'
import { TheyMightBeMadSection } from '@/components/sound/TheyMightBeMadSection'
import { DrumBundleFeaturedSection } from '@/components/tools/DrumBundleFeaturedSection'
import { getGarmentBySlug } from '@/lib/garments/catalog'
import { TWO_TALES, TWO_TALES_COVER } from '@/lib/sound/releases'

const FEATURED_CARDS = [
  {
    href: '/sound',
    title: 'Music',
    desc: 'Releases, playlists, visual media',
    image: TWO_TALES_COVER,
    imageAlt: 'Two Tales',
  },
  {
    href: '/objects',
    title: 'Garments',
    desc: 'Fashion drops, garments, accessories',
    image: getGarmentBySlug('they-might-be-mad-champion-jacket')!.image,
    imageAlt: 'They Might Be Mad Champion Jacket',
  },
  {
    href: '/tools',
    title: 'Tools',
    desc: 'Sample packs, plugins, digital products',
    image: '/tools/sample-packs-hero.png',
    imageAlt: 'Sample packs',
  },
] as const

export default function HomePage() {
  return (
    <>
      {/* Full Screen Hero Image - height compensates for -mt-10 so section fills 100vh with no gap */}
      <section className="relative w-full h-[calc(100vh+2.5rem)] -mt-10 overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-black">
          <img
            src="https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/6777a197ce41a65e1d80127d.jpeg"
            alt="ISIATA"
            className="w-full h-full object-cover object-[center_44%] lg:object-[center_52%]"
          />
          {/* Soft fade into continuous page background */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 h-full">
          <a
            href={TWO_TALES.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-20 left-6 md:bottom-24 md:left-10 flex items-center gap-6 md:gap-8 group max-w-[min(100%-3rem,28rem)] pr-4"
          >
            <div className="relative aspect-square w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden border border-white/15 bg-black depth-shadow">
              <img
                src={TWO_TALES.cover}
                alt={TWO_TALES.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-spaced uppercase tracking-wide text-zinc-400 mb-0.5">Single</p>
              <p className="font-display uppercase tracking-normal text-gold text-lg md:text-xl truncate">
                {TWO_TALES.title}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">{TWO_TALES.streamsLabel}</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8aa67]/75 bg-black/20 transition-all duration-300 group-hover:border-[#f0c681] group-hover:bg-[#b7792a]/10 group-hover:shadow-[0_0_28px_rgba(211,157,83,0.18)]">
              <iconify-icon icon="mdi:spotify" width="18" height="18" className="text-[#f0dfc8]" />
            </span>
          </a>

          <div className="absolute bottom-12 right-6 md:right-10 is-visible aura-reveal">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-spaced text-zinc-400 uppercase tracking-wide">Scroll</span>
              <iconify-icon icon="solar:arrow-down-linear" width="20" height="20" className="text-zinc-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      <DrumBundleFeaturedSection />

      <TheyMightBeMadSection />

      {/* Featured Items */}
      <Section reveal>
        <Container bordered className="relative py-24">
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {FEATURED_CARDS.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group flashlight-card hover-glow relative flex aspect-[4/5] flex-col overflow-hidden border border-[#d8aa67]/20 bg-transparent transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#d8aa67]/65"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const rect = el.getBoundingClientRect()
                  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.75' stitchTiles='stitch' type='fractalNoise'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.85 0 0 0 0 0.68 0 0 0 0 0.38 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(216,170,103,0.06)] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative flex-[1] min-h-0 flex items-center justify-center p-3 md:p-4">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full max-w-full max-h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10 shrink-0 text-center px-6 pb-6 md:pb-8 pt-2">
                  <h3 className="gradient-text-gold mb-3 text-3xl font-display font-semibold uppercase transition-all duration-500 group-hover:tracking-wider md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="text-base text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">
                    {card.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <StayCloseSection />
    </>
  )
}
