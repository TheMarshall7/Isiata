import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { GarmentProductView } from '@/components/garments/GarmentProductView'
import { getAllGarmentSlugs, getGarmentBySlug } from '@/lib/garments/catalog'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllGarmentSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getGarmentBySlug(params.slug)
  if (!product) return { title: 'Garment Not Found' }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | ISIATA Garments`,
      description: product.description,
      images: [{ url: product.image, alt: product.title }],
    },
    alternates: { canonical: `/objects/${product.slug}` },
  }
}

export default function GarmentProductPage({ params }: Props) {
  const product = getGarmentBySlug(params.slug)
  if (!product) notFound()

  return (
    <>
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
