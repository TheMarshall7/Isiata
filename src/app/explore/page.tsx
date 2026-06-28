'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { TypeWriter } from '@/components/ui/TypeWriter'

const CATEGORIES = [
  { href: '/sound', icon: 'solar:music-library-2-linear', title: 'Sound', desc: 'Music releases, playlists, and visual media' },
  { href: '/objects', icon: 'solar:shop-2-linear', title: 'Garments', desc: 'Fashion drops, garments, and accessories' },
  { href: '/tools', icon: 'solar:diskette-linear', title: 'Tools', desc: 'Sample packs, plugins, and digital products' },
  { href: '/systems', icon: 'solar:server-square-linear', title: 'Systems', desc: 'Backend business infrastructure for artists and musicians' },
  { href: '/contact', icon: 'solar:chat-round-dots-linear', title: 'Contact', desc: 'Creative direction, session work, coaching, mixing, and live performance' },
]

export default function ExplorePage() {
  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-44 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white">
            <TypeWriter text="Explore" speed={120} />
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
            {CATEGORIES.map((cat) => (
              <a
                key={cat.href}
                href={cat.href}
                className="group flashlight-card hover-depth hover-glow relative aspect-[4/3] bg-surface-raised border border-white/10 depth-shadow-lg p-10 md:p-14 flex flex-col"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const rect = el.getBoundingClientRect()
                  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                }}
              >
                {/* Grain texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon with glow effect - positioned at top */}
                <div className="relative flex-shrink-0 mb-auto">
                  <div className="absolute -inset-4 bg-white/10 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <iconify-icon
                    icon={cat.icon}
                    width="72"
                    height="72"
                    className="relative z-10 text-white opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                {/* Text content at bottom */}
                <div className="relative z-10 mt-auto">
                  <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3 group-hover:tracking-wide transition-all duration-500">
                    {cat.title}
                  </h2>
                  <p className="text-base text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">{cat.desc}</p>
                </div>

                {/* Bottom border glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            ))}
          </div>
        </Section>
      </Container>
    </>
  )
}
