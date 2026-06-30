import { ISIATA_LOGO_URL, SITE_CONFIG } from '@/lib/constants'
import { absoluteImageUrl, absoluteUrl, siteUrl } from '@/lib/seo/site'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: siteUrl,
    logo: ISIATA_LOGO_URL,
    description:
      'Creative studio spanning sound, garments, production tools, and private access. Culture and innovation.',
    sameAs: Object.values(SITE_CONFIG.links),
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: siteUrl,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: ISIATA_LOGO_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/explore`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function productSchema(input: {
  name: string
  description: string
  image: string
  url: string
  offerUrl?: string
  price?: string
  priceCurrency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  category?: string
}) {
  const offer =
    input.price != null
      ? {
          '@type': 'Offer' as const,
          price: input.price.replace(/[^0-9.]/g, ''),
          priceCurrency: input.priceCurrency ?? 'USD',
          availability: `https://schema.org/${input.availability ?? 'InStock'}`,
          url: absoluteUrl(input.offerUrl ?? input.url),
        }
      : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: absoluteImageUrl(input.image),
    brand: { '@type': 'Brand', name: SITE_CONFIG.name },
    url: absoluteUrl(input.url),
    ...(input.category ? { category: input.category } : {}),
    ...(offer ? { offers: offer } : {}),
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  url: string
  image?: string
  price?: string
}) {
  const numericPrice = input.price?.replace(/[^0-9.]/g, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: siteUrl,
    },
    url: absoluteUrl(input.url),
    ...(input.image ? { image: absoluteImageUrl(input.image) } : {}),
    ...(numericPrice
      ? {
          offers: {
            '@type': 'Offer',
            price: numericPrice,
            priceCurrency: 'USD',
            url: absoluteUrl(input.url),
          },
        }
      : {}),
  }
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbListSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  }
}

export function musicAlbumSchema(album: {
  name: string
  datePublished: string
  numTracks: number
  tracks: { name: string; position: number }[]
  url?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: album.name,
    albumProductionType: 'StudioAlbum',
    albumReleaseType: 'EPRelease',
    byArtist: { '@type': 'MusicGroup', name: SITE_CONFIG.name },
    datePublished: album.datePublished,
    numTracks: album.numTracks,
    ...(album.url ? { url: absoluteUrl(album.url) } : {}),
    ...(album.image ? { image: absoluteImageUrl(album.image) } : {}),
    track: album.tracks.map((track) => ({
      '@type': 'MusicRecording',
      name: track.name,
      position: track.position,
    })),
  }
}

export function musicRecordingSchema(recording: {
  name: string
  datePublished: string
  duration: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: recording.name,
    byArtist: { '@type': 'MusicGroup', name: SITE_CONFIG.name },
    datePublished: recording.datePublished,
    duration: recording.duration,
  }
}
