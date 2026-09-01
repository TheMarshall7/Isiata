import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SystemFunnel } from '@/components/systems/SystemFunnel'
import { JsonLd } from '@/components/seo/JsonLd'
import { getAllTierSlugs, getTierWithFunnel } from '@/lib/systems/funnel-content'
import {
  breadcrumbListSchema,
  faqPageSchema,
  serviceSchema,
} from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { systemTierMeta } from '@/lib/seo/pages'

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
  const meta = systemTierMeta(
    params.slug,
    tier.name,
    tier.tagline,
    tier.outcome,
    funnel.heroImage,
    tier.isScoped
  )

  return buildPageMetadata(meta)
}

export default function SystemFunnelPage({ params }: PageProps) {
  const data = getTierWithFunnel(params.slug)
  if (!data) notFound()

  const { tier, funnel } = data

  const schemas = [
    breadcrumbListSchema([
      { name: 'Home', path: '/' },
      { name: 'Systems', path: '/systems' },
      { name: tier.name, path: `/systems/${params.slug}` },
    ]),
    serviceSchema({
      name: tier.name,
      description: `${tier.tagline} ${tier.outcome}`,
      url: `/systems/${params.slug}`,
      image: funnel.heroImage,
    }),
    faqPageSchema(funnel.faqs),
  ]

  return (
    <>
      <JsonLd data={schemas} />
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
