import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { PluginCheckout, type CheckoutSummary } from '@/components/tools/PluginCheckout'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { PLUGIN_SHARED_FACTS, getPlugin, pluginHref } from '@/lib/tools/plugins'
import { isBillingAvailable, isPaidStandalonePlugin, pluginCheckoutHref } from '@/lib/tools/plugin-checkout'

// Reads the Stripe price environment at request time, so a price can go live without a rebuild.
export const dynamic = 'force-dynamic'

type Params = { slug: string }

export function generateMetadata({ params }: { params: Params }): Metadata {
  const plugin = getPlugin(params.slug)
  if (!plugin) return {}
  return {
    ...buildPageMetadata({
      title: `Checkout: ${plugin.name} | Isiata`,
      description: `Buy ${plugin.name}, ${plugin.kind.toLowerCase()}, from Isiata.`,
      path: pluginCheckoutHref(plugin),
      keywords: [plugin.name, 'Isiata', 'checkout'],
      noIndex: true,
    }),
  }
}

export default function PluginCheckoutPage({ params }: { params: Params }) {
  const plugin = getPlugin(params.slug)
  if (!plugin || plugin.href) notFound()
  if (!isPaidStandalonePlugin(plugin)) redirect(pluginHref(plugin))

  const summary: CheckoutSummary = {
    kind: 'plugin',
    slug: plugin.slug,
    available: isBillingAvailable('plugin', plugin.slug),
    eyebrow: `Plugin · ${plugin.kind}`,
    name: plugin.name,
    tagline: plugin.hero,
    heroSrc: plugin.image?.src,
    heroAlt: `${plugin.name} screenshot`,
    price: plugin.price,
    priceNote: 'Licence terms are on the licensing page. Each purchase comes with its own download.',
    included: plugin.features.length > 0 ? plugin.features.map((f) => f.label) : [plugin.kind],
    includedLabel: 'What you get',
    formats: PLUGIN_SHARED_FACTS[0].body,
    install: PLUGIN_SHARED_FACTS[1].body,
    notifySource: `checkout_plugin_${plugin.slug}`,
    backHref: pluginHref(plugin),
    backLabel: `Back to ${plugin.name}`,
  }

  return <PluginCheckout summary={summary} />
}
