import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.earTrainer)

export default function EarTrainerLayout({ children }: { children: React.ReactNode }) {
  return children
}
