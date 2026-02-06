import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'

export const metadata: Metadata = {
  title: 'Access — Creative Direction, Mixing & Private Sessions',
  description: 'Book creative direction, professional mixing, private studio sessions, and live performance with ISIATA. Selective. Focused. By request only.',
  openGraph: {
    title: 'ISIATA Access — Creative Direction, Mixing & Private Sessions',
    description: 'Creative direction, professional mixing, private studio sessions, and live performance. By request only.',
  },
  alternates: { canonical: '/access' },
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

const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Creative Direction',
    provider: { '@type': 'Organization', name: 'ISIATA' },
    description: 'Project-level guidance from concept to finish. Decisions, structure, and refinement.',
    url: 'https://isiata.com/access',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mix & Sonic Refinement',
    provider: { '@type': 'Organization', name: 'ISIATA' },
    description: 'Precision mixing and final polish. Balance, depth, and cohesion without losing character.',
    url: 'https://isiata.com/access',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Private Sessions',
    provider: { '@type': 'Organization', name: 'ISIATA' },
    description: 'Focused one-on-one work. Production, sound development, or problem-solving in real time.',
    url: 'https://isiata.com/access',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Live Performance',
    provider: { '@type': 'Organization', name: 'ISIATA' },
    description: 'Sound experienced in the room. Solo or collaborative performances shaped by the space and moment.',
    url: 'https://isiata.com/access',
  },
]

export default function AccessPage() {
  return (
    <>
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* Page Header */}
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <PageTitle
            text="Access"
            className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12"
            speed={120}
          />

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
              <Link
                key={offering.title}
                href="/access/booking"
                className="group flashlight-card hover-depth hover-glow border border-white/10 bg-surface-raised depth-shadow p-12 block"
              >
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
              </Link>
            ))}
          </div>

          {/* Join the community — horizontal card */}
          <Link
            href="/community"
            className="group mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 p-8 sm:p-10 flashlight-card hover-depth hover-glow border border-white/10 bg-surface-raised depth-shadow"
          >
            <div className="flex-shrink-0">
              <iconify-icon
                icon="solar:users-group-two-rounded-linear"
                width="56"
                height="56"
                className="text-white group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-white mb-2">Join the community</h2>
              <p className="text-zinc-400 leading-relaxed">
                Connect with other creators and supporters. Early access, exclusive drops, and a place for the people behind the work. Coming soon.
              </p>
            </div>
            <div className="flex-shrink-0 self-center sm:self-auto">
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="24"
                height="24"
                className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </Link>
        </Section>
      </Container>
    </>
  )
}
