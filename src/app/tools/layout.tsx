import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools — Sample Packs, Plugins & Producer Toolbox',
  description: 'Premium production tools by ISIATA. Tsukuyomi Drum Bundle, Producer Toolbox with BPM control, key finder, delay calculator, and more.',
  openGraph: {
    title: 'ISIATA Tools — Sample Packs & Producer Toolbox',
    description: 'Premium production tools. Tsukuyomi Drum Bundle, Producer Toolbox with BPM control, key finder, and more.',
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
    price: '67.00',
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
