import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.about)

export default function AboutPage() {
  return (
    <>
      {/* The Universe */}
      <Container bordered className="pt-32 pb-24">
        <Section reveal className="text-center">
          <h2 className="text-2xl font-semibold text-gold mb-12 tracking-wide">The Universe</h2>

          <div className="mx-auto max-w-2xl space-y-10 text-lg sm:text-xl text-gold/90 leading-[1.75]">
            <p>
              Isiata is a creator who was taught what reality was supposed to be,
              but refused to accept that the surface was the whole story.
            </p>

            <p>
              As he searches through music, consciousness, technology, and the unseen,
              he discovers a world far larger than he imagined. The deeper he goes,
              the more he must confront the danger of becoming controlled by the very
              forces he sought to escape.
            </p>

            <p>
              His journey is not about becoming all knowing, but becoming more conscious,
              transforming what he discovers into art, and helping others question what
              they believe is possible.
            </p>
          </div>
        </Section>
      </Container>

      {/* Footer Principles */}
      <Container bordered className="py-16 border-t border-[#d8aa67]/15">
        <Section reveal>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-zinc-500 text-sm uppercase tracking-widest">
              Create and transform.
              <br />
              Transform the unseen into something you can feel.
            </p>
          </div>
        </Section>
      </Container>
    </>
  )
}
