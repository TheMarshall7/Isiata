'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { EmailCapture } from '@/components/forms/EmailCapture'

export default function HomePage() {
  return (
    <>
      {/* Full Screen Hero Image */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/6777a197ce41a65e1d80127d.jpeg"
            alt="ISIATA"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white mb-12 aura-reveal"
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
              className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed aura-reveal"
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

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 aura-reveal" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-zinc-400 uppercase tracking-widest">Scroll</span>
              <iconify-icon icon="solar:arrow-down-linear" width="20" height="20" className="text-zinc-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

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
