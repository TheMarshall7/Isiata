import { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  DRUM_BUNDLE,
  DRUM_BUNDLE_CHECKOUT_HREF,
  DRUM_BUNDLE_HREF,
  DRUM_BUNDLE_PRICE,
} from '@/lib/tools/drum-bundle'
import { productSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata({
  ...SEO_PAGES.drumBundle,
  image: DRUM_BUNDLE.image,
  imageAlt: DRUM_BUNDLE.title,
})

const productJsonLd = productSchema({
  name: DRUM_BUNDLE.title,
  description: DRUM_BUNDLE.description,
  image: DRUM_BUNDLE.image,
  url: DRUM_BUNDLE_HREF,
  offerUrl: DRUM_BUNDLE_CHECKOUT_HREF,
  price: DRUM_BUNDLE_PRICE.amount,
  priceCurrency: 'USD',
  availability: 'PreOrder',
  category: 'Music Production > Sample Packs',
})

export default function TsukuyomiDrumBundleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={productJsonLd} />
      {children}
    </>
  )
}
