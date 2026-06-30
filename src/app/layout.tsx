import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Oswald } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_CONFIG } from '@/lib/constants'
import { organizationSchema, webSiteSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const homeSeo = buildPageMetadata({
  ...SEO_PAGES.home,
  title: 'ISIATA — Culture and Innovation',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'ISIATA — Culture and Innovation | Sound, Garments, Tools & Access',
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: homeSeo.description,
  keywords: SEO_PAGES.home.keywords,
  openGraph: homeSeo.openGraph,
  twitter: homeSeo.twitter,
  alternates: homeSeo.alternates,
  authors: [{ name: 'ISIATA' }],
  creator: 'ISIATA',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67e216041870f43c643a7e9a.png',
    apple: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67e216041870f43c643a7e9a.png',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${oswald.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
        <script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          async
        />
      </head>
      <body className="min-h-screen selection:bg-purple-500/30 relative overflow-x-hidden">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
