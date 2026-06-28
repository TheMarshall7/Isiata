import { Metadata } from 'next'
import { DRUM_BUNDLE, DRUM_BUNDLE_CHECKOUT_HREF, DRUM_BUNDLE_HREF, DRUM_BUNDLE_PRICE } from '@/lib/tools/drum-bundle'

export const metadata: Metadata = {
  title: 'Tsukuyomi Drum Bundle — Premium Drum Sample Pack',
  description: DRUM_BUNDLE.description,
  openGraph: {
    title: 'Tsukuyomi Drum Bundle | ISIATA',
    description: DRUM_BUNDLE.description,
    images: [{ url: DRUM_BUNDLE.image, width: 1200, height: 630, alt: DRUM_BUNDLE.title }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DRUM_BUNDLE.image],
  },
  alternates: { canonical: DRUM_BUNDLE_HREF },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: DRUM_BUNDLE.title,
  description: DRUM_BUNDLE.description,
  brand: { '@type': 'Brand', name: 'ISIATA' },
  offers: {
    '@type': 'Offer',
    price: DRUM_BUNDLE_PRICE.amount,
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
    url: `https://isiata.com${DRUM_BUNDLE_CHECKOUT_HREF}`,
  },
  category: 'Music Production > Sample Packs',
}

export default function TsukuyomiDrumBundleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {children}
    </>
  )
}
