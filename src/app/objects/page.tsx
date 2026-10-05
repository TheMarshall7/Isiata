import type { CSSProperties } from 'react'
import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import { EmailCapture } from '@/components/forms/EmailCapture'
import { GarmentGrid } from '@/components/garments/GarmentGrid'
import { JsonLd } from '@/components/seo/JsonLd'
import { GARMENT_CATALOG, getGarmentBySlug } from '@/lib/garments/catalog'
import { itemListSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.objects)

export default function ObjectsPage() {
  const heroJacket = getGarmentBySlug('they-might-be-mad-champion-jacket')

  const itemList = itemListSchema(
    GARMENT_CATALOG.map((product) => ({
      name: product.title,
      url: `/objects/${product.slug}`,
    }))
  )

  return (
    <>
      <JsonLd data={itemList} />
      {/* Page Header */}
      <Container bordered className="relative min-h-[100svh] flex flex-col justify-center pt-24 md:pt-28 pb-12 md:pb-16">
        <Section reveal className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <div data-reveal style={{ '--d': 0 } as CSSProperties}>
                <PageTitle
                  text="Garments"
                  className="text-6xl md:text-7xl lg:text-[5.5rem] font-display uppercase tracking-normal leading-[0.9] text-gold mb-8"
                  speed={120}
                />
              </div>

              <div data-reveal style={{ '--d': 2 } as CSSProperties} className="max-w-2xl space-y-5 text-lg md:text-xl text-gold leading-relaxed">
                <p>
                  Artifacts of the process.
                  <br />
                  The character, made physical.
                </p>

                <p>
                  Built to last.
                  <br />
                  Built to be worn.
                  <br />
                  Built to make a statement.
                </p>

                <p className="text-[#d5c8b8]">
                  Releases arrive in focused runs.
                  <br />
                  Once they're gone, they're archived.
                </p>
              </div>
            </div>

            {heroJacket && (
              <div
                style={{ '--d': 1 } as CSSProperties}
                className="reveal-media relative aspect-[3/4] w-full max-w-[min(100%,28rem)] max-h-[min(68svh,38rem)] mx-auto overflow-hidden border border-[#d8aa67]/25 bg-black depth-shadow lg:mx-0 lg:ml-auto"
              >
                <img
                  src={heroJacket.image}
                  alt={heroJacket.title}
                  className="reveal-media-img w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </Section>
      </Container>

      {/* Drops Grid */}
      <Container bordered className="py-24">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
            Signature Releases
          </p>
          <h2 className="text-2xl md:text-3xl font-display uppercase tracking-normal text-gold mb-4">
            They Might Be Mad
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Past drops from ISIATA × Champion. Documented here for the archive. All pieces are sold out.
          </p>
        </div>
        <GarmentGrid />
      </Container>

      {/* Notify for next drop */}
      <Section reveal>
        <Container bordered className="rule-draw border-t border-[#d8aa67]/15 py-24 md:py-32">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div
              style={{ '--d': 1 } as CSSProperties}
              className="reveal-media relative mx-auto aspect-[3/4] w-full max-w-[min(100%,28rem)] overflow-hidden border border-[#d8aa67]/25 bg-black depth-shadow lg:mx-0"
            >
              {heroJacket ? (
                <img
                  src={heroJacket.image}
                  alt=""
                  aria-hidden
                  className="reveal-media-img h-full w-full object-cover object-center opacity-100"
                />
              ) : null}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              />
              <img
                src="/brand/overlays/overlay-6.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                <p className="font-spaced text-[10px] uppercase tracking-[0.34em] text-[#d8c3a4]">
                  Private list
                </p>
                <p className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-[#f3ede3] sm:text-3xl">
                  Next drop
                </p>
              </div>
            </div>

            <div className="relative flex flex-col justify-center">
              <div data-reveal style={{ '--d': 0 } as CSSProperties} className="mb-5 flex items-center gap-4">
                <span className="reveal-rail reveal-rail-left h-px w-8 bg-gradient-to-r from-transparent to-[#d6ad72]" />
                <p className="font-spaced text-[10px] uppercase tracking-[0.34em] text-[#d8c3a4]">
                  Garments
                </p>
                <span className="reveal-rail reveal-rail-right h-px w-12 bg-gradient-to-r from-[#d6ad72] to-transparent" />
              </div>

              <h2 data-reveal style={{ '--d': 1 } as CSSProperties} className="max-w-lg font-display text-4xl font-normal uppercase leading-[0.94] tracking-[0.06em] text-[#f3ede3] sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                Get notified
              </h2>

              <p data-reveal style={{ '--d': 2 } as CSSProperties} className="mt-4 font-spaced text-[10px] uppercase tracking-[0.38em] text-[#bca98e]">
                Early access · Future releases
              </p>

              <p data-reveal style={{ '--d': 3 } as CSSProperties} className="mt-6 max-w-md text-sm leading-relaxed text-[#d5c8b8]/78 sm:text-base">
                Join the list to hear about the next garment drop and future ISIATA releases first.
                Focused runs. No noise.
              </p>

              <div data-reveal style={{ '--d': 4 } as CSSProperties} className="mt-8 grid grid-cols-3 border-y border-[#d8aa67]/25 py-5">
                <div className="pr-4">
                  <iconify-icon
                    icon="solar:bell-bing-linear"
                    width="24"
                    height="24"
                    className="text-[#dfc094]"
                  />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">
                    First word
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">
                    Before public
                  </p>
                </div>
                <div className="border-x border-[#d8aa67]/25 px-4">
                  <iconify-icon
                    icon="solar:box-minimalistic-linear"
                    width="24"
                    height="24"
                    className="text-[#dfc094]"
                  />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">
                    Focused runs
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">
                    Limited stock
                  </p>
                </div>
                <div className="pl-4">
                  <iconify-icon
                    icon="solar:archive-linear"
                    width="24"
                    height="24"
                    className="text-[#dfc094]"
                  />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">
                    Archive
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">
                    Once gone
                  </p>
                </div>
              </div>

              <div data-reveal style={{ '--d': 5 } as CSSProperties} className="mt-8 max-w-md">
                <EmailCapture
                  source="garments"
                  placeholder="EMAIL"
                  buttonLabel="Join"
                  className="w-full items-stretch"
                />
              </div>
            </div>
          </div>

          <div data-reveal style={{ '--d': 6 } as CSSProperties} className="mt-14 flex items-end justify-between border-t border-[#d8aa67]/25 pt-4 text-[8px] uppercase tracking-[0.28em] text-[#8d7b66]">
            <div>
              <p>List</p>
              <p className="mt-1 text-[#b89a72]">Private</p>
            </div>
            <div className="text-right">
              <p>Isiata</p>
              <p className="mt-1 text-[#b89a72]">Garments</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
