import { Metadata } from 'next'

const TOOLS_OG_IMAGE = 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67b7ebca7c922f63503b66c7.png'

export const metadata: Metadata = {
  title: 'Tools — Sample Packs, Plugins & Producer Toolbox',
  description: 'Premium production tools by ISIATA. Tsukuyomi Drum Bundle, Producer Toolbox with BPM control, key finder, delay calculator, and more.',
  openGraph: {
    title: 'ISIATA Tools — Sample Packs & Producer Toolbox',
    description: 'Premium production tools. Tsukuyomi Drum Bundle, Producer Toolbox with BPM control, key finder, and more.',
    images: [{ url: TOOLS_OG_IMAGE, width: 1200, height: 630, alt: 'Tsukuyomi Drum Bundle' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [TOOLS_OG_IMAGE],
  },
  alternates: { canonical: '/tools' },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Tsukuyomi Drum Bundle',
  description: 'A premium drum sample pack focused on high-quality, impactful drum sounds — designed for use in major DAWs (FL Studio, Ableton, Logic Pro, etc.).',
  brand: { '@type': 'Brand', name: 'ISIATA' },
  offers: {
    '@type': 'Offer',
    price: '77.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
    url: 'https://isiata.com/tools/checkout',
  },
  category: 'Music Production > Sample Packs',
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
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
