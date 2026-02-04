import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Access',
  description: 'Creative direction, mixing, private sessions, and live performance',
}

const OFFERINGS = [
  {
    icon: 'solar:lightbulb-minimalistic-linear',
    title: 'Creative Direction',
    lines: [
      'Project-level guidance from concept to finish.',
      'Decisions, structure, and refinement.',
    ],
    tagline: 'For work that needs clarity and a point of view.',
  },
  {
    icon: 'solar:tuning-2-linear',
    title: 'Mix & Sonic Refinement',
    lines: [
      'Precision mixing and final polish.',
      'Balance, depth, and cohesion without losing character.',
    ],
    tagline: 'Built to translate everywhere.',
  },
  {
    icon: 'solar:music-note-slider-linear',
    title: 'Private Sessions',
    lines: [
      'Focused one-on-one work.',
      'Production, sound development, or problem-solving in real time.',
    ],
    tagline: 'Direct. Intentional. Limited.',
  },
  {
    icon: 'solar:microphone-3-linear',
    title: 'Live Performance',
    lines: [
      'Sound experienced in the room.',
      'Solo or collaborative performances shaped by the space and moment.',
    ],
    tagline: 'Unrepeatable by design.',
  },
]

export default function AccessPage() {
  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12">
            Access
          </h1>

          <div className="max-w-2xl space-y-6 text-xl text-zinc-300 leading-relaxed">
            <p>
              Some work requires conversation.
            </p>

            <p className="text-zinc-400">
              Private sessions, direction, and collaboration are available by request.
              <br />
              Selective. Focused. Purposeful.
            </p>
          </div>
        </Section>
      </Container>

      {/* Access Offerings */}
      <Container bordered className="py-24">
        <Section reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OFFERINGS.map((offering) => (
              <div key={offering.title} className="group flashlight-card hover-lift hover-glow border border-white/10 bg-black/40 p-12">
                <iconify-icon
                  icon={offering.icon}
                  width="48"
                  height="48"
                  className="text-white mb-6 group-hover:scale-110 transition-transform duration-500"
                />
                <h2 className="text-2xl font-semibold text-white mb-6">{offering.title}</h2>
                <div className="space-y-1 mb-6">
                  {offering.lines.map((line, i) => (
                    <p key={i} className="text-zinc-400 leading-relaxed">{line}</p>
                  ))}
                </div>
                <p className="text-sm text-zinc-500 italic">
                  {offering.tagline}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </>
  )
}
