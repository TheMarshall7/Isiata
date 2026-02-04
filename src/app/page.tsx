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
        <div className="absolute inset-0 bg-black">
          <img
            src="https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/6777a197ce41a65e1d80127d.jpeg"
            alt="ISIATA"
            className="w-full h-full object-cover object-[center_25%]"
          />
          {/* Bottom fade into page background */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 h-full">
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 aura-reveal">
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
                <h3 className="text-2xl font-semibold text-white mb-2">Garments</h3>
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
