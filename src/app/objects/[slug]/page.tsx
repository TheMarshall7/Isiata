import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { GarmentProductView } from '@/components/garments/GarmentProductView'
import { JsonLd } from '@/components/seo/JsonLd'
import { getAllGarmentSlugs, getGarmentBySlug } from '@/lib/garments/catalog'
import { breadcrumbListSchema, productSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { garmentMeta } from '@/lib/seo/pages'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllGarmentSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getGarmentBySlug(params.slug)
  if (!product) return { title: 'Garment Not Found' }

  const meta = garmentMeta(product.slug, product.title, product.description, product.image)
  return buildPageMetadata(meta)
}

export default function GarmentProductPage({ params }: Props) {
  const product = getGarmentBySlug(params.slug)
  if (!product) notFound()

  const isSoldOut = product.status === 'sold-out'

  const schemas = [
    breadcrumbListSchema([
      { name: 'Home', path: '/' },
      { name: 'Garments', path: '/objects' },
      { name: product.title, path: `/objects/${product.slug}` },
    ]),
    productSchema({
      name: product.title,
      description: product.description,
      image: product.image,
      url: `/objects/${product.slug}`,
      availability: isSoldOut ? 'OutOfStock' : 'InStock',
      category: 'Fashion > Garments',
    }),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <Container bordered className="pt-28 pb-4">
        <Link
          href="/objects"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Garments
        </Link>
      </Container>

      <Container bordered className="py-12 pb-24">
        <Section reveal>
          <GarmentProductView product={product} />
        </Section>
      </Container>
    </>
  )
}
