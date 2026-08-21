'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { EmailCapture } from '@/components/forms/EmailCapture'
import { TheyMightBeMadSection } from '@/components/sound/TheyMightBeMadSection'
import { DrumBundleFeaturedSection } from '@/components/tools/DrumBundleFeaturedSection'
import { getGarmentBySlug } from '@/lib/garments/catalog'
import { TWO_TALES, TWO_TALES_COVER } from '@/lib/sound/releases'

const FEATURED_CARDS = [
  {
    href: '/sound',
    title: 'Sound',
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
          {/* Bottom fade into page background */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 h-full">
          <a
            href={TWO_TALES.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-20 left-6 md:bottom-24 md:left-10 flex items-center gap-4 group max-w-[calc(100%-3rem)]"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden border border-white/15 depth-shadow">
              <img
                src={TWO_TALES.cover}
                alt={TWO_TALES.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 mb-0.5">Single</p>
              <p className="font-oswald uppercase tracking-tight text-white text-lg md:text-xl truncate">
                {TWO_TALES.title}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">{TWO_TALES.streamsLabel}</p>
            </div>
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm shrink-0 group-hover:border-[#1DB954]/50 group-hover:bg-black/60 transition-colors">
              <iconify-icon icon="mdi:spotify" width="20" height="20" className="text-[#1DB954]" />
            </span>
          </a>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 is-visible aura-reveal">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-zinc-400 uppercase tracking-widest">Scroll</span>
              <iconify-icon icon="solar:arrow-down-linear" width="20" height="20" className="text-zinc-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      <DrumBundleFeaturedSection />

      <TheyMightBeMadSection />

      {/* Featured Items */}
      <Section reveal>
        <Container bordered className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FEATURED_CARDS.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group flashlight-card depth-shadow-lg hover-glow relative aspect-[4/5] overflow-hidden bg-surface-raised border border-white/10 flex flex-col hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/[0.03] transition-all duration-500 ease-out"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const rect = el.getBoundingClientRect()
                  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                }}
              >
                <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative flex-[1] min-h-0 flex items-center justify-center p-3 md:p-4">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full max-w-full max-h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10 shrink-0 text-center px-6 pb-6 md:pb-8 pt-2">
                  <h3 className="text-3xl md:text-4xl font-semibold text-white mb-3 group-hover:tracking-wider transition-all duration-500">
                    {card.title}
                  </h3>
                  <p className="text-base text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">
                    {card.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mailing List */}
      <Section reveal>
        <Container bordered className="py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Stay Close
            </h2>
            <p className="text-lg text-zinc-400 mb-4 leading-relaxed">
              Releases don't follow a schedule.
              <br />
              Availability is intentional.
            </p>
            <p className="text-sm text-zinc-500 mb-8">
              Join the list for early access and private releases.
            </p>
            <div className="flex justify-center">
              <EmailCapture source="homepage" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
