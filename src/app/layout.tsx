import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_CONFIG } from '@/lib/constants'
import { organizationSchema, webSiteSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

const isiata = localFont({
  src: [
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-isiata',
  display: 'swap',
})

const isiataWide = localFont({
  src: [
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Wide-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Wide-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Wide-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Wide-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Wide-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Wide-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-isiata-wide',
  display: 'swap',
})

const isiataSpaced = localFont({
  src: [
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Spaced-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Spaced-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Spaced-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Spaced-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Spaced-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Spaced-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-isiata-spaced',
  display: 'swap',
})

const isiataMono = localFont({
  src: [
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Mono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Mono-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Mono-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Mono-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Mono-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../brand/Isiata Brand Folder/Isiata Font Package v2/Isiata-Mono-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-isiata-mono',
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
    <html
      lang="en"
      className={`${isiata.variable} ${isiataWide.variable} ${isiataSpaced.variable} ${isiataMono.variable}`}
    >
      <head>
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
      <body className="min-h-screen selection:bg-gold/30 relative overflow-x-hidden">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
