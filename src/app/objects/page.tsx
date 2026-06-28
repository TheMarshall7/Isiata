import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import { EmailCapture } from '@/components/forms/EmailCapture'
import { GarmentGrid } from '@/components/garments/GarmentGrid'
import { getGarmentBySlug } from '@/lib/garments/catalog'

export const metadata: Metadata = {
  title: 'Garments — Limited Fashion Drops & Accessories',
  description: 'Limited-run garments, fashion drops, and accessories by ISIATA. Signature releases and collections built to be worn and built to last.',
  openGraph: {
    title: 'ISIATA Garments — Limited Fashion Drops & Accessories',
    description: 'Limited-run garments and accessories. Signature releases and collections built to be worn and built to last.',
  },
  alternates: { canonical: '/objects' },
}

export default function ObjectsPage() {
  const heroJacket = getGarmentBySlug('they-might-be-mad-champion-jacket')

  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <PageTitle
                text="Garments"
                className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12"
                speed={120}
              />

              <div className="max-w-2xl space-y-6 text-xl text-zinc-300 leading-relaxed">
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

                <p className="text-zinc-400">
                  Releases arrive in focused runs.
                  <br />
                  Once they're gone, they're archived.
                </p>
              </div>
            </div>

            {heroJacket && (
              <div className="relative aspect-[3/4] max-w-md lg:max-w-none mx-auto lg:mx-0 w-full border border-white/10 bg-black overflow-hidden depth-shadow">
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
          <h2 className="text-2xl md:text-3xl font-oswald uppercase tracking-tight text-white mb-4">
            They Might Be Mad
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Past drops from ISIATA × Champion. Documented here for the archive. All pieces are sold out.
          </p>
        </div>
        <GarmentGrid />
      </Container>

      {/* Notify for next drop */}
      <Container bordered className="py-20 md:py-28 border-t border-white/10">
        <Section reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
              Next drop
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald uppercase tracking-tight text-white mb-6 leading-[1.05]">
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
