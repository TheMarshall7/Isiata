import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { absoluteUrl } from '@/lib/seo/site'
import { getStripeSecretKey } from '@/lib/tools/tsukuyomi-checkout'
import {
  PLUGIN_BILLING_CANCEL_HREF,
  PLUGIN_BILLING_SUCCESS_HREF,
  getBillingPriceId,
  resolveBillableProduct,
  type BillingKind,
} from '@/lib/tools/plugin-checkout'

export const runtime = 'nodejs'

type CheckoutBody = {
  kind?: unknown
  slug?: unknown
  plan?: unknown
  email?: unknown
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: CheckoutBody = {}
  try {
    body = (await request.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ error: 'Invalid checkout request.' }, { status: 400 })
  }

  const product = resolveBillableProduct(body.kind, body.slug, body.plan)
  if (!product) {
    return NextResponse.json({ error: 'That product is not available to buy.' }, { status: 400 })
  }

  const kind = body.kind as BillingKind
  const priceKey = product.priceKey
  const priceId = getBillingPriceId(kind, priceKey)

  if (!priceId) {
    return NextResponse.json(
      { error: `${product.name} is not on sale yet. Leave your email on the page and we will let you know.` },
      { status: 403 }
    )
  }

  const secretKey = getStripeSecretKey()
  if (!secretKey) {
    console.error('[Plugin checkout] Missing STRIPE_SECRET_KEY')
    return NextResponse.json({ error: 'Checkout is not configured.' }, { status: 503 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const validEmail = EMAIL_PATTERN.test(email) ? email : ''

  const metadata: Record<string, string> = {
    product: 'isiata-plugins',
    kind,
    key: priceKey,
    name: product.name,
  }

  try {
    const stripe = new Stripe(secretKey)
    const successUrl = `${absoluteUrl(PLUGIN_BILLING_SUCCESS_HREF)}?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = absoluteUrl(PLUGIN_BILLING_CANCEL_HREF)

    const session = await stripe.checkout.sessions.create({
      mode: product.mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...(validEmail ? { customer_email: validEmail } : {}),
      metadata,
      ...(product.mode === 'payment'
        ? { payment_intent_data: { metadata } }
        : { subscription_data: { metadata } }),
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 })
    }

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error('[Plugin checkout] Stripe error', error)
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 502 })
  }
}
