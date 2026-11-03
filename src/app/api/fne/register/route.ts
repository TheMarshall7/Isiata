import { NextResponse } from 'next/server'
import { clientIp, limited } from '../_rate'

/**
 * Registration sync. The membership database is the authority for identity
 * (brief 11.1); this route only forwards marketing contact data to the CRM,
 * and only the consent the person actually gave.
 */
export async function POST(req: Request) {
  if (limited(`register:${clientIp(req)}`, 6, 60_000)) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const email = String(body.email ?? '').trim().toLowerCase()
  const displayName = String(body.displayName ?? '').trim().slice(0, 60)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !displayName) {
    return NextResponse.json({ error: 'Name and a valid email are required' }, { status: 400 })
  }

  const payload = {
    email,
    name: displayName,
    member_number: String(body.memberNumber ?? ''),
    email_consent: body.emailConsent === true,
    source: 'feel_no_evil_experience',
    founding_member: body.founding === true,
    timestamp: new Date().toISOString(),
  }

  const hook = process.env.GHL_EXPERIENCE_WEBHOOK_URL
  if (!hook) {
    console.warn('[FNE] GHL_EXPERIENCE_WEBHOOK_URL not set; registration kept local only.')
    return NextResponse.json({ success: true, synced: false })
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) console.error('[FNE] CRM webhook error', res.status)
    return NextResponse.json({ success: true, synced: res.ok })
  } catch (e) {
    console.error('[FNE] CRM webhook failed', e)
    return NextResponse.json({ success: true, synced: false })
  }
}
