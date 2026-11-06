import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { describeSku, isKnownSku, isPurchaseEnabled } from '@/lib/tools/purchase-skus'
import { getStripeSecretKey } from '@/lib/tools/tsukuyomi-checkout'

export const runtime = 'nodejs'

type CheckoutBody = {
  sku?: string
  email?: string
}

/**
 * Starts Stripe Checkout for any plugin, bundle or the subscription. The price is found by
 * its lookup key (the sku), so the same code works in Stripe test and live mode. The sku
 * rides along as metadata.product: the licence Worker reads it to issue the right serial.
 */
export async function POST(request: NextRequest) {
  let body: CheckoutBody = {}
  try {
    body = (await request.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ error: 'Send the product to buy.' }, { status: 400 })
  }

  const sku = typeof body.sku === 'string' ? body.sku.trim() : ''
  if (!isKnownSku(sku)) {
    return NextResponse.json({ error: 'Unknown product.' }, { status: 400 })
  }
  if (!isPurchaseEnabled(sku)) {
    return NextResponse.json({ error: 'This product is not available for purchase yet.' }, { status: 403 })
  }

  const secretKey = getStripeSecretKey()
  if (!secretKey) {
    console.error('[Checkout] Missing STRIPE_SECRET_KEY')
    return NextResponse.json({ error: 'Checkout is not configured.' }, { status: 503 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const origin = new URL(request.url).origin
  const product = describeSku(sku)!

  try {
    const stripe = new Stripe(secretKey)

    const prices = await stripe.prices.list({ lookup_keys: [sku], active: true, limit: 1 })
    const price = prices.data[0]
    if (!price) {
      console.error(`[Checkout] No active Stripe price with lookup key "${sku}"`)
      return NextResponse.json({ error: 'This product is not set up for purchase yet.' }, { status: 503 })
    }

    const recurring = price.type === 'recurring'
    const metadata = { product: sku }

    const session = await stripe.checkout.sessions.create({
      mode: recurring ? 'subscription' : 'payment',
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${origin}/tools/plugins/success?sku=${encodeURIComponent(sku)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${product.href}`,
      ...(email ? { customer_email: email } : {}),
      metadata,
      ...(recurring
        ? { subscription_data: { metadata } }
        : { payment_intent_data: { metadata } }),
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 })
    }
    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error('[Checkout] Stripe error', error)
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 502 })
  }
}
