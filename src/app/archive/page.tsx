import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.archive)

export default function ArchivePage() {
  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white">
            Archive
          </h1>
          <p className="text-lg text-zinc-400 mt-6 max-w-2xl">
            Past releases, drops, and offerings
          </p>
        </Section>
      </Container>

      {/* Filter Bar */}
      <Container bordered className="py-6 border-y border-white/10">
        <div className="flex gap-4 overflow-x-auto">
          <button className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 whitespace-nowrap hover:bg-white/10 transition-colors">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Sound
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Objects
          </button>
          <button className="px-4 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap hover:text-white transition-colors">
            Tools
          </button>
        </div>
      </Container>

      {/* Archive Grid */}
      <Container bordered className="py-24">
        <Section reveal>
          <div className="text-center py-24">
            <iconify-icon
              icon="solar:archive-linear"
              width="64"
              height="64"
              className="text-zinc-700 mx-auto mb-6"
            />
            <p className="text-zinc-500 text-lg">Archive is empty</p>
            <p className="text-zinc-600 text-sm mt-2">
              Past releases will appear here
            </p>
          </div>
        </Section>
      </Container>
    </>
  )
}
