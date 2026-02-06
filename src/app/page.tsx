'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { EmailCapture } from '@/components/forms/EmailCapture'

export default function HomePage() {
  return (
    <>
      {/* Full Screen Hero Image */}
      <section className="relative w-full h-screen overflow-hidden -mt-10">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-black">
          <img
            src="https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/6777a197ce41a65e1d80127d.jpeg"
            alt="ISIATA"
            className="w-full h-full object-cover object-[center_44%] lg:-translate-y-[25px]"
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
            {[
              { href: '/sound', icon: 'solar:music-library-2-linear', title: 'Sound', desc: 'Releases, playlists, visual media' },
              { href: '/objects', icon: 'solar:shop-2-linear', title: 'Garments', desc: 'Fashion drops, garments, accessories' },
              { href: '/tools', icon: 'solar:diskette-linear', title: 'Tools', desc: 'Sample packs, plugins, digital products' },
            ].map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group flashlight-card depth-shadow-lg hover-glow relative aspect-square overflow-hidden bg-surface-raised border border-white/10 flex items-center justify-center p-10 md:p-12 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/[0.03] transition-all duration-500 ease-out"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const rect = el.getBoundingClientRect()
                  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                }}
              >
                {/* Grain texture overlay */}
                <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 text-center">
                  {/* Icon with glow */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-150" />
                    <iconify-icon
                      icon={card.icon}
                      width="72"
                      height="72"
                      className="relative z-10 text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-white mb-3 group-hover:tracking-wider transition-all duration-500">{card.title}</h3>
                  <p className="text-base text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">{card.desc}</p>
                </div>

                {/* Bottom border glow */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            ))}
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
