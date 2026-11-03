import { NextResponse } from 'next/server'
import { checkAnswer, checkDeeper } from '@/lib/experience/answers'
import { TOTAL_CHAPTERS } from '@/lib/experience/campaign'
import { clientIp, limited } from '../_rate'

export async function POST(req: Request) {
  const ip = clientIp(req)
  if (limited(`submit:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: 'Slow down. Try again in a minute.' }, { status: 429 })
  }

  let body: { chapter?: unknown; answer?: unknown; layer?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const chapter = Number(body.chapter)
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > TOTAL_CHAPTERS) {
    return NextResponse.json({ error: 'Unknown chapter' }, { status: 400 })
  }

  const correct = body.layer === 'deeper' ? checkDeeper(chapter, body.answer) : checkAnswer(chapter, body.answer)
  return NextResponse.json({ correct })
}
