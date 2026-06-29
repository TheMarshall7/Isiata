import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SystemFunnel } from '@/components/systems/SystemFunnel'
import { getAllTierSlugs, getTierWithFunnel } from '@/lib/systems/funnel-content'

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllTierSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = getTierWithFunnel(params.slug)
  if (!data) return {}

  const { tier, funnel } = data

  return {
    title: `${tier.name} | ISIATA Systems`,
    description: funnel.heroSubheadline,
    openGraph: {
      title: `${tier.name} | ISIATA Systems`,
      description: funnel.heroSubheadline,
      images: [{ url: funnel.heroImage }],
    },
    alternates: { canonical: `/systems/${params.slug}` },
  }
}

export default function SystemFunnelPage({ params }: PageProps) {
  const data = getTierWithFunnel(params.slug)
  if (!data) notFound()

  const { tier, funnel } = data

  return (
    <>
      <Container bordered className="pt-28 pb-4">
        <Link
          href="/systems"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          All systems
        </Link>
      </Container>

      <SystemFunnel tier={tier} funnel={funnel} />
    </>
  )
}
