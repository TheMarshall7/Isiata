import {
  TSUKUYOMI_DRUM_ENGINE,
  TSUKUYOMI_DRUM_ENGINE_HREF,
  TSUKUYOMI_DRUM_ENGINE_SLUG,
} from '@/lib/tools/tsukuyomi-drum-engine'

/** Flip to true in Vercel when Drum Engine is ready to sell. */
export function isTsukuyomiPurchaseEnabled(): boolean {
  return process.env.TSUKUYOMI_PURCHASE_ENABLED === 'true'
}

export function getTsukuyomiStripePriceId(): string | undefined {
  return process.env.STRIPE_PRICE_ID?.trim() || undefined
}

export function getStripeSecretKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY?.trim() || undefined
}

export const TSUKUYOMI_CHECKOUT_SUCCESS_HREF = `${TSUKUYOMI_DRUM_ENGINE_HREF}/success`
export const TSUKUYOMI_CHECKOUT_CANCEL_HREF = `${TSUKUYOMI_DRUM_ENGINE_HREF}/cancel`

/** Metadata Stripe (and the Cloudflare license Worker) can read on the session. */
export const TSUKUYOMI_STRIPE_PRODUCT_META = {
  product: 'tsukuyomi',
  slug: TSUKUYOMI_DRUM_ENGINE_SLUG,
  title: TSUKUYOMI_DRUM_ENGINE.title,
} as const
