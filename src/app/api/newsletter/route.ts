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

    // Send to GoHighLevel webhook if configured (name + email for contact creation)
    if (GHL_NEWSLETTER_WEBHOOK_URL) {
      try {
        await fetch(GHL_NEWSLETTER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: name || '',
            source: source || 'website_footer',
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (webhookError) {
        console.error('GHL webhook error:', webhookError)
        // Continue even if webhook fails - we still want to show success to user
      }
    }

    console.log('Newsletter signup:', { email, name, source, timestamp: new Date().toISOString() })

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
