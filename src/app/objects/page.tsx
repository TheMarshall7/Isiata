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
              <PageTitle
                text="Garments"
                className="text-6xl md:text-7xl lg:text-[5.5rem] font-display uppercase tracking-normal leading-[0.9] text-gold mb-8"
                speed={120}
              />

              <div className="max-w-2xl space-y-5 text-lg md:text-xl text-gold leading-relaxed">
                <p>
                  Artifacts of the process.
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
              <div className="relative aspect-[3/4] w-full max-w-[min(100%,28rem)] max-h-[min(68svh,38rem)] mx-auto overflow-hidden border border-[#d8aa67]/25 bg-black depth-shadow lg:mx-0 lg:ml-auto">
                <img
                  src={heroJacket.image}
                  alt={heroJacket.title}
                  className="w-full h-full object-contain"
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
      <Container bordered className="py-20 md:py-28 border-t border-[#d8aa67]/15">
        <Section reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
              Next drop
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-normal text-gold mb-6 leading-[1.05]">
              Get notified for more releases
            </h2>
            <p className="text-lg text-zinc-400 mb-12 leading-relaxed max-w-lg mx-auto">
              Join the list to hear about the next garment drop and future ISIATA releases first.
            </p>
            <div className="flex justify-center">
              <div className="group/form w-full max-w-lg mx-auto p-8 md:p-10 rounded-lg border border-white/15 bg-white/[0.03] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]">
                <EmailCapture source="garments" />
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}
