import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { absoluteUrl } from '@/lib/seo/site'
import {
  getStripeSecretKey,
  getTsukuyomiStripePriceId,
  isTsukuyomiPurchaseEnabled,
  TSUKUYOMI_CHECKOUT_CANCEL_HREF,
  TSUKUYOMI_CHECKOUT_SUCCESS_HREF,
  TSUKUYOMI_STRIPE_PRODUCT_META,
} from '@/lib/tools/tsukuyomi-checkout'

export const runtime = 'nodejs'

type CheckoutBody = {
  email?: string
}

export async function POST(request: NextRequest) {
  if (!isTsukuyomiPurchaseEnabled()) {
    return NextResponse.json(
      { error: 'Tsukuyomi Drum Engine is not available for purchase yet.' },
      { status: 403 }
    )
  }

  const secretKey = getStripeSecretKey()
  const priceId = getTsukuyomiStripePriceId()

  if (!secretKey || !priceId) {
    console.error('[Tsukuyomi checkout] Missing STRIPE_SECRET_KEY or STRIPE_PRICE_ID')
    return NextResponse.json(
      { error: 'Checkout is not configured.' },
      { status: 503 }
    )
  }

  let body: CheckoutBody = {}
  try {
    body = (await request.json()) as CheckoutBody
  } catch {
    // optional body
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''

  try {
    const stripe = new Stripe(secretKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${absoluteUrl(TSUKUYOMI_CHECKOUT_SUCCESS_HREF)}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: absoluteUrl(TSUKUYOMI_CHECKOUT_CANCEL_HREF),
      ...(email ? { customer_email: email } : {}),
      metadata: { ...TSUKUYOMI_STRIPE_PRODUCT_META },
      payment_intent_data: {
        metadata: { ...TSUKUYOMI_STRIPE_PRODUCT_META },
      },
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error('[Tsukuyomi checkout] Stripe error', error)
    return NextResponse.json(
      { error: 'Could not start checkout.' },
      { status: 502 }
    )
  }
}
