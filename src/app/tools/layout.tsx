import { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { itemListSchema } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'
import { TOOL_CATALOG } from '@/lib/tools/catalog'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.tools)

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const itemList = itemListSchema(
    TOOL_CATALOG.map((item) => ({
      name: item.title,
      url: item.href,
    }))
  )

  return (
    <>
      <JsonLd data={itemList} />
      {children}
    </>
  )
}
