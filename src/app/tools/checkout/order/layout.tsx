import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.checkoutOrder)

export default function CheckoutOrderLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>
}
