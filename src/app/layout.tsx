import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Oswald } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { SITE_CONFIG } from '@/lib/constants'

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'ISIATA — Culture and Innovation | Sound, Garments, Tools & Access',
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: 'ISIATA is a creative studio spanning sound, garments, production tools, and private access. Limited releases. Intentional design. Culture and innovation.',
  keywords: ['ISIATA', 'music', 'sound', 'garments', 'production tools', 'sample packs', 'creative direction', 'mixing', 'drum kits', 'fashion drops'],
  authors: [{ name: 'ISIATA' }],
  creator: 'ISIATA',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: 'ISIATA — Culture and Innovation',
    description: 'Sound, garments, production tools, and private access. Limited releases. Intentional design.',
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'ISIATA — Culture and Innovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISIATA — Culture and Innovation',
    description: 'Sound, garments, production tools, and private access. Limited releases. Intentional design.',
    images: [SITE_CONFIG.ogImage],
  },
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
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  icons: {
    icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67e216041870f43c643a7e9a.png',
    apple: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67e216041870f43c643a7e9a.png',
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ISIATA',
              url: 'https://isiata.com',
              logo: 'https://isiata.com/og-image.jpg',
              description: 'Creative studio spanning sound, garments, production tools, and private access. Culture and innovation.',
              sameAs: [
                'https://www.instagram.com/isiataofficial',
                'https://www.tiktok.com/@isiataOfficial',
                'https://www.youtube.com/channel/UCEUFkFiczRx7RXuunjA3Hmg',
                'https://soundcloud.com/isiataofficial',
              ],
            }),
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
