import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Access',
  description: 'Private sessions, creative direction, and collaborations',
}

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
            {/* Private Sessions */}
            <div className="flashlight-card border border-white/10 bg-black/40 p-12">
              <iconify-icon
                icon="solar:music-note-slider-linear"
                width="48"
                height="48"
                className="text-white mb-6"
              />
              <h2 className="text-2xl font-semibold text-white mb-4">Private Sessions</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                One-on-one production sessions for focused work on your tracks.
              </p>
              <p className="text-xs text-zinc-600 uppercase tracking-wider mb-8">
                Currently unavailable
              </p>
            </div>

            {/* Creative Direction */}
            <div className="flashlight-card border border-white/10 bg-black/40 p-12">
              <iconify-icon
                icon="solar:lightbulb-minimalistic-linear"
                width="48"
                height="48"
                className="text-white mb-6"
              />
              <h2 className="text-2xl font-semibold text-white mb-4">Creative Direction</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Strategic guidance for your creative projects and releases.
              </p>
              <p className="text-xs text-zinc-600 uppercase tracking-wider mb-8">
                Currently unavailable
              </p>
            </div>

            {/* Collaborations */}
            <div className="flashlight-card border border-white/10 bg-black/40 p-12">
              <iconify-icon
                icon="solar:users-group-rounded-linear"
                width="48"
                height="48"
                className="text-white mb-6"
              />
              <h2 className="text-2xl font-semibold text-white mb-4">Collaborations</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Joint creative work on music, visual, or concept projects.
              </p>
              <p className="text-xs text-zinc-600 uppercase tracking-wider mb-8">
                Currently unavailable
              </p>
            </div>

            {/* Workshops */}
            <div className="flashlight-card border border-white/10 bg-black/40 p-12">
              <iconify-icon
                icon="solar:presentation-graph-linear"
                width="48"
                height="48"
                className="text-white mb-6"
              />
              <h2 className="text-2xl font-semibold text-white mb-4">Workshops</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Small group sessions on production techniques and creative process.
              </p>
              <p className="text-xs text-zinc-600 uppercase tracking-wider mb-8">
                Currently unavailable
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}
