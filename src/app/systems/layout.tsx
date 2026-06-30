import { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { SYSTEMS_TIERS } from '@/lib/systems/tiers'
import { itemListSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.systems)

export default function SystemsLayout({ children }: { children: React.ReactNode }) {
  const itemList = itemListSchema(
    SYSTEMS_TIERS.map((tier) => ({
      name: tier.name,
      url: `/systems/${tier.id}`,
    }))
  )

  return (
    <>
      <JsonLd data={itemList} />
      {children}
    </>
  )
}
