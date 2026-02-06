import { NextRequest, NextResponse } from 'next/server'
import { GHL_CONTACT_WEBHOOK_URL, SITE_CONFIG } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const submission = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      notifyEmail: SITE_CONFIG.contactEmail, // Brian@areoclient.com
    }

    // Send to GoHighLevel webhook if configured
    if (GHL_CONTACT_WEBHOOK_URL) {
      try {
        await fetch(GHL_CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission),
        })
      } catch (webhookError) {
        console.error('GHL contact webhook error:', webhookError)
        // Continue even if webhook fails
      }
    }

    console.log('Contact form submission:', submission)

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
