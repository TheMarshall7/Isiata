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
      {/* Hero */}
      <Container bordered className="pt-32 pb-24">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-16">
            About
          </h1>

          <div className="max-w-3xl space-y-8 text-lg text-zinc-300 leading-relaxed">
            <p>
              ISIATA is a practice of intentional creation across sound, objects, tools, and access.
            </p>

            <p>
              We operate outside genre and category. Each release is limited by design—not as artificial scarcity, but as respect for craft and attention.
            </p>

            <p>
              The work speaks. No explanations, no hype. Just offerings for those who recognize quality and coherence.
            </p>
          </div>
        </Section>
      </Container>

      {/* Principles */}
      <Container bordered className="py-24 border-t border-white/10">
        <Section reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Culture Over Category</h3>
              <p className="text-zinc-400 leading-relaxed">
                We don't fit into boxes. Sound, objects, tools, and access exist as parts of a unified practice.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Limited, Intentional</h3>
              <p className="text-zinc-400 leading-relaxed">
                Each offering is finite. When it's done, it's archived. This keeps the work focused and the archive meaningful.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Artifacts of Practice</h3>
              <p className="text-zinc-400 leading-relaxed">
                Everything we release is a byproduct of our own creative process. Tools we use, sounds we make, objects we wear.
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}
