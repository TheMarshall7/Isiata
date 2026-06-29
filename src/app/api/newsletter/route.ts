import { NextRequest, NextResponse } from 'next/server'
import { GHL_NEWSLETTER_WEBHOOK_URL, NEWSLETTER_LEAD_NOTIFY_EMAIL } from '@/lib/constants'

const FORMSUBMIT_URL = 'https://formsubmit.co'

type NewsletterPayload = {
  email: string
  name: string
  first_name: string
  last_name: string
  source: string
  timestamp: string
}

async function sendGhlWebhook(payload: NewsletterPayload) {
  if (!GHL_NEWSLETTER_WEBHOOK_URL) {
    console.warn('[Newsletter] No GHL_NEWSLETTER_WEBHOOK_URL set. Add your webhook URL in lib/constants.ts.')
    console.log('Newsletter signup (no webhook):', payload)
    return
  }

  const webhookRes = await fetch(GHL_NEWSLETTER_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const text = await webhookRes.text()
  if (!webhookRes.ok) {
    console.error('[Newsletter] Webhook error', webhookRes.status, text)
  } else {
    console.log('Newsletter signup sent to webhook:', payload.email)
  }
}

async function sendFormsubmitNotification(payload: NewsletterPayload) {
  const formBody = new URLSearchParams({
    name: payload.name,
    email: payload.email,
    _subject: `[Mailing List] ${payload.source}`,
    message: [
      'New mailing list signup',
      '',
      `Email: ${payload.email}`,
      `Name: ${payload.name}`,
      `First name: ${payload.first_name}`,
      `Last name: ${payload.last_name}`,
      `Source: ${payload.source}`,
      `Time: ${payload.timestamp}`,
    ].join('\n'),
    _captcha: 'false',
  })

  const res = await fetch(`${FORMSUBMIT_URL}/${encodeURIComponent(NEWSLETTER_LEAD_NOTIFY_EMAIL)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody.toString(),
  })

  if (!res.ok) {
    console.error('[Newsletter] Formsubmit error', res.status, await res.text())
  } else {
    console.log('Newsletter lead notification sent via Formsubmit:', payload.email)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, source } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const fullName = (name || '').trim()
    const [firstName, ...lastParts] = fullName.split(/\s+/)
    const lastName = lastParts.join(' ') || fullName

    const payload: NewsletterPayload = {
      email,
      name: fullName || email,
      first_name: firstName || fullName || '',
      last_name: lastName || '',
      source: source || 'website_footer',
      timestamp: new Date().toISOString(),
    }

    await Promise.allSettled([
      sendGhlWebhook(payload),
      sendFormsubmitNotification(payload),
    ])

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
