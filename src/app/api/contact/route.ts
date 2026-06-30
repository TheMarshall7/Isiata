import { NextRequest, NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/constants'

const FORMSUBMIT_URL = 'https://formsubmit.co'

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

    const toEmail = SITE_CONFIG.contactEmail
    const formBody = new URLSearchParams({
      name,
      email,
      _subject: `[ISIATA Contact] ${subject}`,
      message: [
        'Form: Contact page',
        '',
        `From: ${name} <${email}>`,
        `Subject: ${subject}`,
        '',
        message,
      ].join('\n'),
      _captcha: 'false',
    })

    const res = await fetch(`${FORMSUBMIT_URL}/${encodeURIComponent(toEmail)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
    })

    if (!res.ok) {
      console.error('[Contact] Formsubmit error', res.status, await res.text())
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

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
