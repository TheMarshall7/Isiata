import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SystemsLensProvider } from '@/components/systems/page/SystemsLensContext'
import { ArchitectureMap } from '@/components/systems/page/ArchitectureMap'
import { SYSTEMS_BOOKING_HREF, SYSTEMS_MAP_CTA_LABEL } from '@/lib/systems/tiers'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.systemsArchitecture)

export default function SystemsArchitecturePage() {
  return (
    <SystemsLensProvider>
      <Container bordered className="pt-32 pb-10">
        <Link
          href="/systems"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Systems
        </Link>
      </Container>
      <Container bordered className="pb-20">
        <ArchitectureMap />
      </Container>
      <Container bordered className="py-24 border-t border-white/10">
        <p className="text-sm text-zinc-500 mb-6 max-w-xl">
          Want this mapped onto your actual business instead of a diagram?
        </p>
        <Link
          href={SYSTEMS_BOOKING_HREF}
          className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
        >
          {SYSTEMS_MAP_CTA_LABEL}
          <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
        </Link>
      </Container>
    </SystemsLensProvider>
  )
}
