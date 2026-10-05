'use client'

import type { CSSProperties } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { StayCloseSection } from '@/components/home/StayCloseSection'
import { TheyMightBeMadSection } from '@/components/sound/TheyMightBeMadSection'
import { DrumBundleFeaturedSection } from '@/components/tools/DrumBundleFeaturedSection'
import { getGarmentBySlug } from '@/lib/garments/catalog'
import { TWO_TALES, TWO_TALES_COVER } from '@/lib/sound/releases'
import { useParallax } from '@/hooks/useParallax'

const FEATURED_CARDS = [
  {
    href: '/sound',
    title: 'Music',
    desc: 'Transmission. Sound that changes the state.',
    image: TWO_TALES_COVER,
    imageAlt: 'Two Tales',
  },
  {
    href: '/objects',
    title: 'Garments',
    desc: 'The character, made physical.',
    image: getGarmentBySlug('they-might-be-mad-champion-jacket')!.image,
    imageAlt: 'They Might Be Mad Champion Jacket',
  },
  {
    href: '/tools',
    title: 'Tools',
    desc: 'Artifacts for creation and perception.',
    image: '/tools/sample-packs-hero.png',
    imageAlt: 'Sample packs',
  },
] as const

export default function HomePage() {
  const heroBgRef = useParallax({ factor: 0.32 })
  const heroFgRef = useParallax({ factor: 0.12, invert: true })

  return (
    <>
      {/* Full Screen Hero Image - height compensates for -mt-10 so section fills 100vh with no gap */}
      <section className="relative w-full h-[calc(100vh+2.5rem)] -mt-10 overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          <div
            ref={heroBgRef}
            className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
          >
            <img
              src="https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/6777a197ce41a65e1d80127d.jpeg"
              alt="ISIATA"
              className="hero-settle h-full w-full object-cover object-[center_44%] lg:object-[center_52%]"
            />
          </div>
          {/* Soft top vignette so cream nav stays readable over bright photo areas */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-black/55 via-black/25 to-transparent md:h-44"
          />
          {/* Soft fade into continuous page background */}
          <div className="absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        {/* Foreground — drifts opposite the photo for depth */}
        <div ref={heroFgRef} className="relative z-10 h-full will-change-transform">
          <a
            href={TWO_TALES.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-rise absolute inset-x-4 bottom-6 flex items-center gap-3 group md:inset-x-auto md:bottom-24 md:left-10 md:max-w-[28rem] md:gap-8 md:pr-4"
          >
            <div className="relative aspect-square w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden border border-[#d8aa67]/25 bg-black depth-shadow">
              <img
                src={TWO_TALES.cover}
                alt={TWO_TALES.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-spaced uppercase tracking-wide text-[#d5c8b8] mb-0.5">Single</p>
              <p className="font-display uppercase tracking-normal text-gold text-lg md:text-xl truncate">
                {TWO_TALES.title}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8aa67]/75 bg-black/20 transition-all duration-300 group-hover:border-[#f0c681] group-hover:bg-[#b7792a]/10 group-hover:shadow-[0_0_28px_rgba(211,157,83,0.18)]">
              <iconify-icon icon="mdi:spotify" width="18" height="18" className="text-gold" />
            </span>
          </a>

          <div className="hero-rise-late absolute bottom-28 left-1/2 -translate-x-1/2 md:bottom-12 md:left-auto md:right-10 md:translate-x-0">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-spaced text-gold uppercase tracking-wide">Scroll</span>
              <span className="scroll-float inline-flex" aria-hidden>
                <svg
                  width="14"
                  height="22"
                  viewBox="0 0 14 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gold"
                >
                  {/* Hollow teardrop — gold ring like the cursor (outer minus inner) */}
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7 22C7 22 1.5 14.8 1.5 8.6a5.5 5.5 0 1 1 11 0C12.5 14.8 7 22 7 22z M7 20.2C7 20.2 3.1 14.5 3.1 8.9a3.9 3.9 0 1 1 7.8 0C10.9 14.5 7 20.2 7 20.2z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      <DrumBundleFeaturedSection />

      <TheyMightBeMadSection />

      <Section reveal>
        <Container bordered className="relative overflow-hidden border-t border-[#d8aa67]/15 px-0">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src="/brand/overlays/molten-gold-marble-frame.png"
              alt=""
              className="h-full w-full object-fill opacity-80 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>
          <div className="relative flex flex-col items-center px-4 py-16 text-center sm:px-8 sm:py-20 md:py-28">

            <div className="relative z-10 flex w-full flex-col items-center">
              <p
                className="text-shine-in max-w-full font-display text-2xl font-normal uppercase leading-[1.15] tracking-[0.08em] text-[#ece3d7] gradient-text-gold sm:text-4xl sm:tracking-[0.18em] md:text-5xl md:tracking-[0.22em]"
                style={{ '--shine-delay': '0.25s' } as CSSProperties}
              >
                Transforming
              </p>
              <div className="mt-8 flex w-full max-w-3xl items-center gap-3 sm:gap-4">
                <span className="h-px min-w-4 flex-1 bg-gradient-to-r from-transparent to-[#d8aa67]/40" />
                <p className="min-w-0 text-center text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#9a8b74] sm:shrink-0 sm:tracking-[0.32em]">
                  <span
                    className="text-shine-in"
                    style={{ '--shine-delay': '1.05s' } as CSSProperties}
                  >
                    The unseen into experiences you can feel
                  </span>
                </p>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8aa67]/40" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Items */}
      <Section reveal>
        <Container bordered className="rule-draw relative border-t border-[#d8aa67]/15 py-24">
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {FEATURED_CARDS.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group flashlight-card hover-glow hover-depth relative flex aspect-[4/5] flex-col overflow-hidden border border-[#d8aa67]/20 bg-transparent"
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

                <div className="hover-zoom relative flex-[1] min-h-0 flex items-center justify-center p-3 md:p-4">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="relative z-10 shrink-0 text-center px-6 pb-6 md:pb-8 pt-2">
                  <h3 className="mb-3 text-3xl font-display font-normal uppercase tracking-normal text-[#ECE3D7] transition-all duration-500 group-hover:tracking-wider md:text-4xl">
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
