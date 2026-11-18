import { NextResponse } from 'next/server'
import { clientIp, limited } from '../../fne/_rate'
import { ASSET_STREAMS, FIT_QUESTIONS } from '@/lib/artists/page-content'

/**
 * Artist Business System application. Forwards the contact details plus
 * everything the visitor chose on /systems (assets, calculator numbers,
 * fit answers) to a GoHighLevel inbound webhook as JSON.
 */
const str = (v: unknown, max = 200) => String(v ?? '').trim().slice(0, max)
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

export async function POST(req: Request) {
  if (limited(`artist-business:${clientIp(req)}`, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a minute.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never fill this.
  if (str(body.website)) return NextResponse.json({ success: true })

  const name = str(body.name, 80)
  const email = str(body.email, 120).toLowerCase()
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 })
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Please agree to be contacted about your application.' }, { status: 400 })
  }

  const selections = (body.selections ?? {}) as Record<string, unknown>
  const assetIds = Array.isArray(selections.assets) ? selections.assets.map(String) : []
  const assets = ASSET_STREAMS.filter((a) => assetIds.includes(a.id)).map((a) => ({
    id: a.id,
    group: a.group,
    asset: a.asset,
    revenue_stream: a.stream,
  }))
  const calc = (selections.calculator ?? null) as Record<string, unknown> | null
  const fitRaw = (selections.fit ?? {}) as Record<string, unknown>
  const fit = FIT_QUESTIONS.map((q) => ({
    id: q.id,
    question: q.question,
    answer: fitRaw[q.id] === true ? 'yes' : fitRaw[q.id] === false ? 'not yet' : 'unanswered',
  }))

  const payload = {
    source: 'artist_business_system',
    timestamp: new Date().toISOString(),
    name,
    email,
    phone: str(body.phone, 40),
    artist_name: str(body.artistName, 120),
    role: str(body.role, 40),
    primary_link: str(body.link, 300),
    monthly_income: str(body.monthlyIncome, 40),
    audience_size: str(body.audienceSize, 40),
    message: str(body.message, 2000),
    email_consent: true,
    selections: {
      assets,
      asset_count: assets.length,
      calculator: calc
        ? {
            monthly_visitors: num(calc.visitors),
            opt_in_rate_pct: num(calc.optInRate),
            conversion_rate_pct: num(calc.conversionRate),
            average_order_value_usd: num(calc.averageOrderValue),
            paid_in_full: calc.paidInFull === true,
            projected_monthly_revenue_usd: num(calc.monthlyRevenue),
            projected_yearly_revenue_usd: num(calc.yearlyRevenue),
          }
        : null,
      fit_check: fit,
      fit_score: fit.filter((f) => f.answer === 'yes').length,
    },
    // Flat copies for GHL custom fields, which map top-level keys most easily.
    assets_summary: assets.map((a) => a.asset).join('; '),
    revenue_streams_summary: assets.map((a) => a.revenue_stream).join('; '),
    fit_score: fit.filter((f) => f.answer === 'yes').length,
  }

  const hook = process.env.GHL_ARTIST_BUSINESS_WEBHOOK_URL
  if (!hook) {
    console.error('[artist-business] GHL_ARTIST_BUSINESS_WEBHOOK_URL not set; application not delivered.')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('[artist-business] GHL webhook error', res.status)
      return NextResponse.json({ error: 'delivery_failed' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[artist-business] GHL webhook failed', e)
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 })
  }
}
