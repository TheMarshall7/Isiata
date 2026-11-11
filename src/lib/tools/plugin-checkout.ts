import {
  ISI_CREATE_SUBSCRIPTION,
  PLUGINS_HREF,
  getBundle,
  getPlugin,
  type PluginBundle,
  type PluginSpec,
} from './plugins'

/**
 * Billing for the plugin line: single plugins, bundles and the Isi Access subscription.
 *
 * Each product sells through its own Stripe Price. A product stays "not on sale" until its
 * price ID env var is set in Vercel, so the checkout pages show a launch notice instead of
 * a working pay button:
 *
 *   STRIPE_PRICE_PLUGIN_<SLUG>        e.g. STRIPE_PRICE_PLUGIN_ISI_BASS
 *   STRIPE_PRICE_BUNDLE_<SLUG>        e.g. STRIPE_PRICE_BUNDLE_TSUKUYOMI_COMPLETE
 *   STRIPE_PRICE_SUBSCRIPTION_MONTHLY
 *   STRIPE_PRICE_SUBSCRIPTION_ANNUAL
 *
 * STRIPE_SECRET_KEY is shared with the Drum Engine checkout.
 */

export type BillingKind = 'plugin' | 'bundle' | 'subscription'
export type SubscriptionPlan = 'monthly' | 'annual'

export const PLUGIN_BILLING_SUCCESS_HREF = `${PLUGINS_HREF}/billing/success`
export const PLUGIN_BILLING_CANCEL_HREF = `${PLUGINS_HREF}/billing/cancel`
export const SUBSCRIPTION_CHECKOUT_HREF = `${PLUGINS_HREF}/subscription/checkout`

export const ISI_ACCESS_PLANS: Record<SubscriptionPlan, { label: string; price: string; note: string }> = {
  monthly: {
    label: 'Monthly',
    price: ISI_CREATE_SUBSCRIPTION.price,
    note: 'Billed every month. Cancel any time.',
  },
  annual: {
    label: 'Annual',
    price: ISI_CREATE_SUBSCRIPTION.annualPrice,
    note: 'Billed once a year. Two months free compared with monthly.',
  },
}

export function isSubscriptionPlan(value: unknown): value is SubscriptionPlan {
  return value === 'monthly' || value === 'annual'
}

function toEnvKey(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]+/g, '_')
}

export function billingPriceEnvName(kind: BillingKind, key: string): string {
  if (kind === 'subscription') return `STRIPE_PRICE_SUBSCRIPTION_${toEnvKey(key)}`
  return `STRIPE_PRICE_${kind.toUpperCase()}_${toEnvKey(key)}`
}

/** Server-side only: reads the Stripe Price ID for a product from the environment. */
export function getBillingPriceId(kind: BillingKind, key: string): string | undefined {
  return process.env[billingPriceEnvName(kind, key)]?.trim() || undefined
}

/** True when the product has a Stripe Price and can be bought. */
export function isBillingAvailable(kind: BillingKind, key: string): boolean {
  return Boolean(getBillingPriceId(kind, key))
}

export type BillableProduct = {
  name: string
  mode: 'payment' | 'subscription'
  /** Key used to find the Stripe Price: product slug, or the plan for subscriptions */
  priceKey: string
}

/** Validates a checkout request against the catalogue. Returns undefined for anything not sellable. */
export function resolveBillableProduct(
  kind: unknown,
  slug: unknown,
  plan: unknown
): BillableProduct | undefined {
  if (kind === 'plugin' && typeof slug === 'string') {
    const plugin = getPlugin(slug)
    if (!plugin || plugin.href || plugin.price === 'FREE') return undefined
    return { name: plugin.name, mode: 'payment', priceKey: plugin.slug }
  }
  if (kind === 'bundle' && typeof slug === 'string') {
    const bundle = getBundle(slug)
    if (!bundle) return undefined
    return { name: bundle.name, mode: 'payment', priceKey: bundle.slug }
  }
  if (kind === 'subscription' && isSubscriptionPlan(plan)) {
    return { name: ISI_CREATE_SUBSCRIPTION.name, mode: 'subscription', priceKey: plan }
  }
  return undefined
}

/** Plugins that can be bought one at a time (free plugins and the Drum Engine are excluded). */
export function isPaidStandalonePlugin(plugin: PluginSpec | undefined): plugin is PluginSpec {
  return Boolean(plugin && !plugin.href && plugin.price !== 'FREE')
}

export function bundleCheckoutHref(bundle: PluginBundle): string {
  return `${PLUGINS_HREF}/bundles/${bundle.slug}/checkout`
}

export function pluginCheckoutHref(plugin: PluginSpec): string {
  return `${PLUGINS_HREF}/${plugin.slug}/checkout`
}
