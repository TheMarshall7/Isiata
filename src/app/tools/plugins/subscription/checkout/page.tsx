import type { Metadata } from 'next'
import Link from 'next/link'
import { PluginCheckout, type CheckoutSummary } from '@/components/tools/PluginCheckout'
import { buildPageMetadata } from '@/lib/seo/metadata'
import {
  ISI_CREATE_SUBSCRIPTION,
  PLUGIN_SHARED_FACTS,
  SUBSCRIPTION_HREF,
  getSubscriptionPlugins,
} from '@/lib/tools/plugins'
import {
  ISI_ACCESS_PLANS,
  SUBSCRIPTION_CHECKOUT_HREF,
  isBillingAvailable,
  isSubscriptionPlan,
  type SubscriptionPlan,
} from '@/lib/tools/plugin-checkout'

// Reads the Stripe price environment at request time, so a plan can go live without a rebuild.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `Checkout: ${ISI_CREATE_SUBSCRIPTION.name} | Isiata`,
    description: `Start ${ISI_CREATE_SUBSCRIPTION.name}, the Isiata plugin subscription.`,
    path: SUBSCRIPTION_CHECKOUT_HREF,
    keywords: [ISI_CREATE_SUBSCRIPTION.name, 'Isiata', 'plugin subscription', 'checkout'],
    noIndex: true,
  }),
}

export default function SubscriptionCheckoutPage({
  searchParams,
}: {
  searchParams: { plan?: string }
}) {
  const plan: SubscriptionPlan = isSubscriptionPlan(searchParams.plan) ? searchParams.plan : 'monthly'
  const option = ISI_ACCESS_PLANS[plan]
  const plugins = getSubscriptionPlugins()

  const planLink = (key: SubscriptionPlan) => {
    const active = key === plan
    return (
      <Link
        key={key}
        href={`${SUBSCRIPTION_CHECKOUT_HREF}?plan=${key}`}
        aria-current={active ? 'true' : undefined}
        className={`flex flex-1 flex-col gap-1 border px-4 py-3 transition-colors ${
          active
            ? 'border-[#d8aa67]/75 bg-[#b7792a]/10 text-[#f0dfc8]'
            : 'border-[#d8aa67]/20 text-zinc-400 hover:border-[#d8aa67]/50 hover:text-zinc-200'
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{ISI_ACCESS_PLANS[key].label}</span>
        <span className="text-sm">{ISI_ACCESS_PLANS[key].price}</span>
      </Link>
    )
  }

  const summary: CheckoutSummary = {
    kind: 'subscription',
    slug: 'isi-access',
    plan,
    available: isBillingAvailable('subscription', plan),
    eyebrow: `Subscription · ${plugins.length} plugins`,
    name: ISI_CREATE_SUBSCRIPTION.name,
    tagline: ISI_CREATE_SUBSCRIPTION.tagline,
    heroSrc: ISI_CREATE_SUBSCRIPTION.hero,
    heroAlt: `${ISI_CREATE_SUBSCRIPTION.name}: every Isiata plugin`,
    price: option.price,
    priceNote: option.note,
    included: plugins.map((p) => p.name),
    includedLabel: `Every plugin · ${plugins.length}`,
    formats: PLUGIN_SHARED_FACTS[0].body,
    install: PLUGIN_SHARED_FACTS[1].body,
    notifySource: `checkout_subscription_${plan}`,
    notifyLabel: 'Notify me on launch',
    backHref: SUBSCRIPTION_HREF,
    backLabel: 'Back to Isi Access',
  }

  return (
    <PluginCheckout
      summary={summary}
      planSwitcher={
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Billing</p>
          <div className="flex gap-3">{(['monthly', 'annual'] as const).map(planLink)}</div>
        </div>
      }
    />
  )
}
