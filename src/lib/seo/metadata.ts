import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { absoluteImageUrl, absoluteUrl } from '@/lib/seo/site'

export type PageMetadataInput = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  noIndex?: boolean
}

const DEFAULT_OG = {
  width: 1200,
  height: 630,
} as const

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = 'website',
  keywords,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path)
  const ogImage = absoluteImageUrl(image ?? SITE_CONFIG.ogImage)
  const ogTitle = title.includes('ISIATA') ? title : `${title} | ISIATA`

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    openGraph: {
      type,
      locale: 'en_US',
      url: canonical,
      title: ogTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG.width,
          height: DEFAULT_OG.height,
          alt: imageAlt ?? ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
    alternates: { canonical },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  }
}
