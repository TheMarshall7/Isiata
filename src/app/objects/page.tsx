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
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12">
            The Objects
          </h1>

          <div className="max-w-2xl space-y-6 text-xl text-zinc-300 leading-relaxed">
            <p>
              Artifacts of the process.
            </p>

            <p>
              Built to be worn.
              <br />
              Built to be used.
              <br />
              Built to last.
            </p>

            <p className="text-zinc-400">
              Releases arrive in focused runs.
              <br />
              Once they're gone, they're archived.
            </p>
          </div>
        </Section>
      </Container>

      {/* Filter Bar */}
      <Container bordered className="py-6 border-y border-white/10">
        <div className="flex gap-4 overflow-x-auto">
          <button className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 whitespace-nowrap hover:bg-white/10 transition-colors">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Signature Releases
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Studio Editions
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Archived
          </button>
        </div>
      </Container>

      {/* Category Description */}
      <Container bordered className="py-12 border-b border-white/10">
        <Section reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Signature Releases</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Limited pieces drawn from specific periods of work. Documented. Numbered. Never diluted.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Studio Editions</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Functional objects and garments designed for daily use. Refined. Durable. Intentional.
              </p>
            </div>
          </div>
        </Section>
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
