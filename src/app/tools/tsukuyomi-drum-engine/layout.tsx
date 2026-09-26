import { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { productSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'
import { ISIATA_LOGO_URL } from '@/lib/constants'
import {
  TSUKUYOMI_DRUM_ENGINE,
  TSUKUYOMI_DRUM_ENGINE_HREF,
} from '@/lib/tools/tsukuyomi-drum-engine'

export const metadata: Metadata = buildPageMetadata({
  ...SEO_PAGES.drumEngine,
  image: ISIATA_LOGO_URL,
  imageAlt: TSUKUYOMI_DRUM_ENGINE.title,
})

const productJsonLd = productSchema({
  name: TSUKUYOMI_DRUM_ENGINE.title,
  description: TSUKUYOMI_DRUM_ENGINE.description,
  image: ISIATA_LOGO_URL,
  url: TSUKUYOMI_DRUM_ENGINE_HREF,
  category: 'Music Production > Plugins',
  availability: 'PreOrder',
})

export default function TsukuyomiDrumEngineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={productJsonLd} />
      {children}
    </>
  )
}
