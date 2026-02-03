import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Objects',
  description: 'Fashion drops, garments, and accessories',
}

export default function ObjectsPage() {
  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white">
            Objects
          </h1>
        </Section>
      </Container>

      {/* Filter Bar */}
      <Container bordered className="py-6 border-y border-white/10">
        <div className="flex gap-4 overflow-x-auto">
          <button className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 whitespace-nowrap hover:bg-white/10 transition-colors">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Live
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Upcoming
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Sold Out
          </button>
        </div>
      </Container>

      {/* Drops Grid */}
      <Container bordered className="py-24">
        <Section reveal>
          <div className="text-center py-24">
            <iconify-icon
              icon="solar:shop-2-linear"
              width="64"
              height="64"
              className="text-zinc-700 mx-auto mb-6"
            />
            <p className="text-zinc-500 text-lg">No drops yet</p>
            <p className="text-zinc-600 text-sm mt-2">
              Check back soon for new object releases
            </p>
          </div>
        </Section>
      </Container>
    </>
  )
}
