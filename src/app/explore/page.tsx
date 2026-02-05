'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const CATEGORIES = [
  { href: '/sound', icon: 'solar:music-library-2-linear', title: 'Sound', desc: 'Music releases, playlists, and visual media' },
  { href: '/objects', icon: 'solar:shop-2-linear', title: 'Garments', desc: 'Fashion drops, garments, and accessories' },
  { href: '/tools', icon: 'solar:diskette-linear', title: 'Tools', desc: 'Sample packs, plugins, and digital products' },
  { href: '/access', icon: 'solar:key-linear', title: 'Access', desc: 'Private sessions, creative direction, collaborations' },
]

export default function ExplorePage() {
  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-44 pb-16">
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
            {CATEGORIES.map((cat) => (
              <a
                key={cat.href}
                href={cat.href}
                className="group flashlight-card hover-depth hover-glow relative aspect-[4/3] overflow-hidden bg-surface-raised border border-white/10 depth-shadow-lg pt-16 pb-14 px-14 md:pt-20 md:pb-16 md:px-16 flex flex-col justify-end"
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

                {/* Icon with glow effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150" />
                  <iconify-icon
                    icon={cat.icon}
                    width="88"
                    height="88"
                    className="relative z-10 text-white mb-6 opacity-40 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <h2 className="text-4xl md:text-5xl font-semibold text-white mt-8 mb-4 group-hover:tracking-wide transition-all duration-500 relative z-10">
                  {cat.title}
                </h2>
                <p className="text-lg text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500 relative z-10">{cat.desc}</p>

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
