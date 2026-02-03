import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Discover across sound, objects, tools, and access',
}

export default function ExplorePage() {
  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white">
            Explore
          </h1>
          <p className="text-lg text-zinc-400 mt-6 max-w-2xl">
            Discover across sound, objects, tools, and access
          </p>
        </Section>
      </Container>

      {/* Category Grid */}
      <Container bordered className="py-24">
        <Section reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sound */}
            <a
              href="/sound"
              className="group flashlight-card relative aspect-[4/3] overflow-hidden bg-zinc-900 border border-white/10 p-12 flex flex-col justify-end"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <iconify-icon
                icon="solar:music-library-2-linear"
                width="64"
                height="64"
                className="text-white mb-6 opacity-50"
              />
              <h2 className="text-4xl font-semibold text-white mb-3 group-hover:text-zinc-300 transition-colors">
                Sound
              </h2>
              <p className="text-zinc-400">Music releases, playlists, and visual media</p>
            </a>

            {/* Objects */}
            <a
              href="/objects"
              className="group flashlight-card relative aspect-[4/3] overflow-hidden bg-zinc-900 border border-white/10 p-12 flex flex-col justify-end"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <iconify-icon
                icon="solar:shop-2-linear"
                width="64"
                height="64"
                className="text-white mb-6 opacity-50"
              />
              <h2 className="text-4xl font-semibold text-white mb-3 group-hover:text-zinc-300 transition-colors">
                Objects
              </h2>
              <p className="text-zinc-400">Fashion drops, garments, and accessories</p>
            </a>

            {/* Tools */}
            <a
              href="/tools"
              className="group flashlight-card relative aspect-[4/3] overflow-hidden bg-zinc-900 border border-white/10 p-12 flex flex-col justify-end"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <iconify-icon
                icon="solar:diskette-linear"
                width="64"
                height="64"
                className="text-white mb-6 opacity-50"
              />
              <h2 className="text-4xl font-semibold text-white mb-3 group-hover:text-zinc-300 transition-colors">
                Tools
              </h2>
              <p className="text-zinc-400">Sample packs, plugins, and digital products</p>
            </a>

            {/* Access */}
            <a
              href="/access"
              className="group flashlight-card relative aspect-[4/3] overflow-hidden bg-zinc-900 border border-white/10 p-12 flex flex-col justify-end"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <iconify-icon
                icon="solar:key-linear"
                width="64"
                height="64"
                className="text-white mb-6 opacity-50"
              />
              <h2 className="text-4xl font-semibold text-white mb-3 group-hover:text-zinc-300 transition-colors">
                Access
              </h2>
              <p className="text-zinc-400">Private sessions, creative direction, collaborations</p>
            </a>
          </div>
        </Section>
      </Container>
    </>
  )
}
