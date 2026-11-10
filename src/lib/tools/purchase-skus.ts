import { PLUGINS, PLUGIN_BUNDLES, PLUGINS_HREF, SUBSCRIPTION_HREF, bundleHref } from '@/lib/tools/plugins'
import { LICENSED_PLUGINS } from '@/lib/tools/license-products'

/**
 * Everything the checkout can sell. A sku is also the licence product id the
 * Cloudflare Worker knows (licensing/worker/src/catalog.js) and the Stripe price
 * lookup key (licensing/scripts/create-stripe-catalog.mjs).
 */
export const SUBSCRIPTION_SKU = 'isi-access'
export const SUBSCRIPTION_ANNUAL_SKU = 'isi-access-annual'

/** The Drum Engine's licence id predates the catalogue, so its sku is "tsukuyomi". */
export function skuForPluginSlug(slug: string): string {
  return slug === 'tsukuyomi-drum-engine' ? 'tsukuyomi' : slug
}

export type SkuKind = 'plugin' | 'bundle' | 'subscription'

export function describeSku(sku: string): { kind: SkuKind; name: string; href: string } | null {
  if (sku === SUBSCRIPTION_SKU) {
    return { kind: 'subscription', name: 'Isi Access', href: SUBSCRIPTION_HREF }
  }
  if (sku === SUBSCRIPTION_ANNUAL_SKU) {
    return { kind: 'subscription', name: 'Isi Access (yearly)', href: SUBSCRIPTION_HREF }
  }
  const bundle = PLUGIN_BUNDLES.find((b) => b.slug === sku)
  if (bundle) return { kind: 'bundle', name: bundle.name, href: bundleHref(bundle) }
  // Free plugins have no serial, so they are not for sale.
  const plugin = PLUGINS.find((p) => skuForPluginSlug(p.slug) === sku && p.price !== 'FREE')
  if (plugin) return { kind: 'plugin', name: plugin.name, href: `${PLUGINS_HREF}/${plugin.slug}` }
  return null
}

export function isKnownSku(sku: string): boolean {
  return describeSku(sku) !== null
}

/** Plugins a customer can activate, for the offline activation page. */
export function licensedPlugins(): { id: string; name: string }[] {
  return LICENSED_PLUGINS
}

/**
 * Selling is off until you switch it on. Set PURCHASE_ENABLED_SKUS to a comma-separated
 * list of skus, or to * for everything. The older TSUKUYOMI_PURCHASE_ENABLED=true still
 * enables the Drum Engine on its own.
 */
export function isPurchaseEnabled(sku: string): boolean {
  const enabled = (process.env.PURCHASE_ENABLED_SKUS || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
  if (enabled.includes('*') || enabled.includes(sku)) return true
  return sku === 'tsukuyomi' && process.env.TSUKUYOMI_PURCHASE_ENABLED === 'true'
}
