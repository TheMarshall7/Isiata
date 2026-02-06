import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'

export const metadata: Metadata = {
  title: 'Community — ISIATA',
  description: 'Join the ISIATA community. Coming soon.',
  openGraph: {
    title: 'Community — ISIATA',
    description: 'Join the ISIATA community. Coming soon.',
  },
  alternates: { canonical: '/community' },
}

export default function CommunityPage() {
  return (
    <Container bordered className="pt-32 pb-24 min-h-[60vh] flex flex-col">
      <Section reveal>
        <PageTitle
          text="Community"
          className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12"
          speed={120}
        />
        <p className="text-xl text-zinc-400 mb-10 max-w-xl">
          A place for collaborators, supporters, and people who care about the work. Coming soon.
        </p>
        <Link
          href="/access"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <span>Back to Access</span>
          <iconify-icon icon="solar:arrow-left-linear" width="20" height="20" />
        </Link>
      </Section>
    </Container>
  )
}
