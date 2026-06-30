import { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/tools/checkout/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
