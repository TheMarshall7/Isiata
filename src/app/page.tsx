'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { EmailCapture } from '@/components/forms/EmailCapture'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container bordered className="flex flex-col text-center pt-32 pb-32 items-center">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter gradient-text mb-12 max-w-5xl mx-auto leading-[1.1] aura-reveal"
        >
          ISIATA
        </h1>

        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          <p
            className="text-2xl md:text-3xl text-white font-light leading-relaxed aura-reveal"
            style={{ animationDelay: '100ms' }}
          >
            Designed with intention.
            <br />
            Released with purpose.
          </p>

          <p
            className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed aura-reveal"
            style={{ animationDelay: '200ms' }}
          >
            This is the work.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center aura-reveal" style={{ animationDelay: '300ms' }}>
          <Button href="/explore" variant="secondary">
            Explore
          </Button>
          <Button href="/sound" variant="secondary">
            Listen
          </Button>
          <Button href="/access" variant="secondary">
            Access
          </Button>
        </div>
      </Container>

      {/* Featured Items */}
      <Section reveal>
        <Container bordered className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Sound */}
            <a
              href="/sound"
              className="group flashlight-card relative aspect-square overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="relative z-10 text-center">
                <iconify-icon
                  icon="solar:music-library-2-linear"
                  width="48"
                  height="48"
                  className="text-white mb-4 mx-auto"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">Sound</h3>
                <p className="text-sm text-zinc-400">Releases, playlists, visual media</p>
              </div>
            </a>

            {/* Featured Objects */}
            <a
              href="/objects"
              className="group flashlight-card relative aspect-square overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="relative z-10 text-center">
                <iconify-icon
                  icon="solar:shop-2-linear"
                  width="48"
                  height="48"
                  className="text-white mb-4 mx-auto"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">Objects</h3>
                <p className="text-sm text-zinc-400">Fashion drops, garments, accessories</p>
              </div>
            </a>

            {/* Featured Tools */}
            <a
              href="/tools"
              className="group flashlight-card relative aspect-square overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="relative z-10 text-center">
                <iconify-icon
                  icon="solar:diskette-linear"
                  width="48"
                  height="48"
                  className="text-white mb-4 mx-auto"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">Tools</h3>
                <p className="text-sm text-zinc-400">Sample packs, plugins, digital products</p>
              </div>
            </a>
          </div>
        </Container>
      </Section>

      {/* Mailing List */}
      <Section reveal>
        <Container bordered className="py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Stay Close
            </h2>
            <p className="text-lg text-zinc-400 mb-4 leading-relaxed">
              Releases don't follow a schedule.
              <br />
              Availability is intentional.
            </p>
            <p className="text-sm text-zinc-500 mb-8">
              Join the list for early access and private releases.
            </p>
            <div className="flex justify-center">
              <EmailCapture source="homepage" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
