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
                className="group flashlight-card hover-lift hover-glow relative aspect-[4/3] overflow-hidden bg-surface-raised border border-white/10 depth-shadow p-12 flex flex-col justify-end"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const rect = el.getBoundingClientRect()
                  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                }}
              >
                <iconify-icon
                  icon={cat.icon}
                  width="64"
                  height="64"
                  className="text-white mb-6 opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                />
                <h2 className="text-4xl font-semibold text-white mb-3 group-hover:tracking-wide transition-all duration-500">
                  {cat.title}
                </h2>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">{cat.desc}</p>
              </a>
            ))}
          </div>
        </Section>
      </Container>
    </>
  )
}
