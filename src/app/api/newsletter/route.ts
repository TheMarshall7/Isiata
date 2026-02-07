import { NextRequest, NextResponse } from 'next/server'
import { GHL_NEWSLETTER_WEBHOOK_URL } from '@/lib/constants'

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

    const payload = {
      email,
      name: fullName || email,
      first_name: firstName || fullName || '',
      last_name: lastName || '',
      source: source || 'website_footer',
      timestamp: new Date().toISOString(),
    }

    if (!GHL_NEWSLETTER_WEBHOOK_URL) {
      console.warn('[Newsletter] No GHL_NEWSLETTER_WEBHOOK_URL set. Add your webhook URL in lib/constants.ts.')
      console.log('Newsletter signup (no webhook):', payload)
    } else {
      try {
        const webhookRes = await fetch(GHL_NEWSLETTER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const text = await webhookRes.text()
        if (!webhookRes.ok) {
          console.error('[Newsletter] Webhook error', webhookRes.status, text)
        } else {
          console.log('Newsletter signup sent to webhook:', email)
        }
      } catch (webhookError) {
        console.error('GHL newsletter webhook error:', webhookError)
      }
    }

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
