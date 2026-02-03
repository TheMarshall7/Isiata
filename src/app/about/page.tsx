import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'About',
  description: 'Culture over category',
}

export default function AboutPage() {
  return (
    <>
      {/* The World */}
      <Container bordered className="pt-32 pb-24">
        <Section reveal>
          <h2 className="text-2xl font-semibold text-white mb-12">The World</h2>

          <div className="max-w-3xl space-y-8 text-xl text-zinc-300 leading-relaxed">
            <p>
              ISIATA is a studio without a single medium.
            </p>

            <p>
              Sound, objects, and systems live here side by side.
              <br />
              Each piece is shaped by restraint, clarity, and taste.
            </p>

            <p>
              Nothing exists to fill space.
              <br />
              Everything earns its place.
            </p>
          </div>
        </Section>
      </Container>

      {/* The Work */}
      <Container bordered className="py-24 border-t border-white/10">
        <Section reveal>
          <h2 className="text-2xl font-semibold text-white mb-12">The Work</h2>

          <div className="max-w-3xl space-y-8 text-xl text-zinc-300 leading-relaxed">
            <p>
              The work moves across forms.
              <br />
              Music. Garments. Tools. Editions.
            </p>

            <p>
              What connects them is not category, but point of view.
              <br />
              Quiet confidence. Considered choices. Weight without excess.
            </p>
          </div>
        </Section>
      </Container>

      {/* Footer Principles */}
      <Container bordered className="py-16 border-t border-white/10">
        <Section reveal>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-zinc-500 text-sm uppercase tracking-widest">
              Culture over category.
              <br />
              Form follows intention.
            </p>
          </div>
        </Section>
      </Container>
    </>
  )
}
