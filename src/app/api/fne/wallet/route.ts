import { NextResponse } from 'next/server'

/**
 * Apple Wallet / Google Wallet pass issuing needs signing certificates and a
 * pass provider (brief 10.3). Until those exist this reports "not configured"
 * so the UI can show an honest state instead of a fake button.
 */
export async function GET() {
  return NextResponse.json(
    { available: false, apple: false, google: false, reason: 'Wallet pass issuing is not configured yet.' },
    { status: 501 }
  )
}
