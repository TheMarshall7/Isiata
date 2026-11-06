import { NextRequest, NextResponse } from 'next/server'
import { LICENSED_PLUGINS } from '@/lib/tools/license-products'
import {
  TSUKUYOMI_INSTALLATION_ID_PATTERN,
  TSUKUYOMI_LICENSE_API_BASE,
  TSUKUYOMI_SERIAL_PATTERN,
} from '@/lib/tools/tsukuyomi-license-api'

export const runtime = 'nodejs'

type OfflineLicenseBody = {
  serial?: string
  installation_id?: string
  product?: string
}

const ERROR_MESSAGES: Record<string, string> = {
  unknown_serial: 'That serial was not found. Check it and try again.',
  revoked: 'This licence has been revoked. Contact support.',
  seats_exhausted: 'All 3 activations for this serial are in use. Deactivate another computer first.',
  wrong_product: 'This serial is for a different product.',
  rate_limited: 'Too many attempts. Wait a few minutes and try again.',
}

export async function POST(request: NextRequest) {
  let body: OfflineLicenseBody
  try {
    body = (await request.json()) as OfflineLicenseBody
  } catch {
    return NextResponse.json({ error: 'Send the serial and installation ID.' }, { status: 400 })
  }

  const serial = typeof body.serial === 'string' ? body.serial.trim().toUpperCase().replace(/\s+/g, '') : ''
  const installationId = typeof body.installation_id === 'string' ? body.installation_id.trim().toLowerCase() : ''
  // Older callers sent no product and meant the Drum Engine.
  const product = typeof body.product === 'string' && body.product ? body.product.trim() : 'tsukuyomi'

  if (!LICENSED_PLUGINS.some((plugin) => plugin.id === product)) {
    return NextResponse.json({ error: 'Choose the plugin to activate.' }, { status: 400 })
  }
  if (!TSUKUYOMI_SERIAL_PATTERN.test(serial)) {
    return NextResponse.json({ error: 'Enter the serial as XXX-XXXX-XXXX-XXXX.' }, { status: 400 })
  }
  if (!TSUKUYOMI_INSTALLATION_ID_PATTERN.test(installationId)) {
    return NextResponse.json(
      { error: 'Copy the installation ID exactly as shown in the plugin.' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${TSUKUYOMI_LICENSE_API_BASE}/v1/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial, installation_id: installationId, product }),
      cache: 'no-store',
    })

    const data = (await response.json().catch(() => ({}))) as {
      payload?: string
      signature?: string
      error?: string
    }

    if (!response.ok || !data.payload || !data.signature) {
      const message = ERROR_MESSAGES[data.error ?? ''] ?? 'Could not create the licence file. Try again later.'
      return NextResponse.json({ error: message }, { status: response.status >= 400 ? response.status : 502 })
    }

    return NextResponse.json({ payload: data.payload, signature: data.signature })
  } catch (error) {
    console.error('[Tsukuyomi offline licence] Worker error', error)
    return NextResponse.json({ error: 'Could not reach the licence server. Try again later.' }, { status: 502 })
  }
}
