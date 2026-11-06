import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Price } from '@/components/ui/Price'
import { JsonLd } from '@/components/seo/JsonLd'
import { PluginNotifyButton } from '@/components/tools/PluginNotifyButton'
import { PluginBuyButton } from '@/components/tools/PluginBuyButton'
import { isPurchaseEnabled } from '@/lib/tools/purchase-skus'
import { BundleCard, PluginGrid } from '@/components/tools/PluginCards'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { productSchema } from '@/lib/seo/json-ld'
import { ISIATA_LOGO_URL } from '@/lib/constants'
import {
  PLUGINS_HREF,
  PLUGIN_BUNDLES,
  PLUGIN_SHARED_FACTS,
  bundleHref,
  getBundle,
  getBundlePlugins,
} from '@/lib/tools/plugins'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return PLUGIN_BUNDLES.map((b) => ({ slug: b.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const bundle = getBundle(params.slug)
  if (!bundle) return {}
  return buildPageMetadata({
    title: `${bundle.name} | Plugin Bundle`,
    description: `${bundle.tagline} ${bundle.description}`,
    path: bundleHref(bundle),
    image: ISIATA_LOGO_URL,
    imageAlt: bundle.name,
    keywords: [bundle.name, 'Isiata', 'plugin bundle', 'VST3', 'AU'],
  })
}

export default function BundlePage({ params }: { params: Params }) {
  const bundle = getBundle(params.slug)
  if (!bundle) notFound()

  const plugins = getBundlePlugins(bundle)
  const others = PLUGIN_BUNDLES.filter((b) => b.slug !== bundle.slug)

  return (
    <Container bordered className="pb-24 pt-28 sm:pt-32">
      <JsonLd
        data={productSchema({
          name: bundle.name,
          description: bundle.description,
          image: ISIATA_LOGO_URL,
          url: bundleHref(bundle),
          price: bundle.launchPrice,
          category: 'Music Production > Plugin Bundles',
          availability: 'PreOrder',
        })}
      />

      <Link
        href={PLUGINS_HREF}
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
      >
        <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
        All plugins
      </Link>

      <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        Bundle · {plugins.length} plugins
      </p>
      <h1 className="mb-6 font-display text-4xl uppercase tracking-normal text-gold md:text-6xl">{bundle.name}</h1>
      <p className="mb-6 max-w-2xl text-xl leading-relaxed text-[#ece3d7] md:text-2xl">{bundle.tagline}</p>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-zinc-400">{bundle.description}</p>

      <div className="mb-14 flex flex-wrap items-center gap-6">
        <div>
          <span className="text-4xl text-white">
            <Price value={bundle.launchPrice} />
          </span>
          <span className="ml-3 text-sm text-zinc-500">
            Launch price · Regular <Price value={bundle.regularPrice} strikethrough />
          </span>
        </div>
        {isPurchaseEnabled(bundle.slug) ? (
          <PluginBuyButton sku={bundle.slug} />
        ) : (
          <PluginNotifyButton productName={bundle.name} source={`bundle_${bundle.slug}`} />
        )}
      </div>

      <section className="mb-14">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">What you get</h2>
        <PluginGrid plugins={plugins} />
      </section>

      <section className="mb-14">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Formats</dt>
            <dd className="mt-1 text-zinc-300">{PLUGIN_SHARED_FACTS[0].body}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Install</dt>
            <dd className="mt-1 text-zinc-300">{PLUGIN_SHARED_FACTS[1].body}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">Other bundles</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {others.map((b) => (
            <BundleCard key={b.slug} bundle={b} />
          ))}
        </div>
      </section>
    </Container>
  )
}
