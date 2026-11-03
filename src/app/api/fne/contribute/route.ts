import { NextResponse } from 'next/server'
import { TOTAL_CHAPTERS } from '@/lib/experience/campaign'
import { clientIp, limited } from '../_rate'

/** Audience contributions land as 'pending'. Nothing shows publicly until moderated (brief 11.5). */
export async function POST(req: Request) {
  if (limited(`contribute:${clientIp(req)}`, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many submissions' }, { status: 429 })
  }
  let body: { chapter?: unknown; text?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  const chapter = Number(body.chapter)
  const text = String(body.text ?? '').trim()
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > TOTAL_CHAPTERS || text.length < 2 || text.length > 280) {
    return NextResponse.json({ error: 'Invalid contribution' }, { status: 400 })
  }
  console.log('[FNE] contribution pending moderation', { chapter, length: text.length })
  return NextResponse.json({ success: true, status: 'pending' })
}
