import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PluginCheckout, type CheckoutSummary } from '@/components/tools/PluginCheckout'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { PLUGIN_SHARED_FACTS, bundleHref, getBundle, getBundlePlugins } from '@/lib/tools/plugins'
import { bundleCheckoutHref, isBillingAvailable } from '@/lib/tools/plugin-checkout'

// Reads the Stripe price environment at request time, so a price can go live without a rebuild.
export const dynamic = 'force-dynamic'

type Params = { slug: string }

export function generateMetadata({ params }: { params: Params }): Metadata {
  const bundle = getBundle(params.slug)
  if (!bundle) return {}
  return {
    ...buildPageMetadata({
      title: `Checkout: ${bundle.name} | Isiata`,
      description: `Buy ${bundle.name} from Isiata.`,
      path: bundleCheckoutHref(bundle),
      keywords: [bundle.name, 'Isiata', 'plugin bundle', 'checkout'],
      noIndex: true,
    }),
  }
}

export default function BundleCheckoutPage({ params }: { params: Params }) {
  const bundle = getBundle(params.slug)
  if (!bundle) notFound()

  const plugins = getBundlePlugins(bundle)

  const summary: CheckoutSummary = {
    kind: 'bundle',
    slug: bundle.slug,
    available: isBillingAvailable('bundle', bundle.slug),
    eyebrow: `Bundle · ${plugins.length} plugins`,
    name: bundle.name,
    tagline: bundle.tagline,
    heroSrc: bundle.hero,
    heroAlt: `${bundle.name}: the plugins in the bundle`,
    price: bundle.launchPrice,
    priceNote: 'Launch price. One purchase covers every plugin in the bundle.',
    regularPrice: bundle.regularPrice,
    included: plugins.map((p) => p.name),
    includedLabel: 'What you get',
    formats: PLUGIN_SHARED_FACTS[0].body,
    install: PLUGIN_SHARED_FACTS[1].body,
    notifySource: `checkout_bundle_${bundle.slug}`,
    backHref: bundleHref(bundle),
    backLabel: `Back to ${bundle.name}`,
  }

  return <PluginCheckout summary={summary} />
}
