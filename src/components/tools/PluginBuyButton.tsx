'use client'

import { useState } from 'react'

/** Starts Stripe Checkout for one product (a plugin, a bundle, or the subscription). */
export function PluginBuyButton({ sku, label = 'Buy now' }: { sku: string; label?: string }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function start() {
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku }),
      })
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!response.ok || !data.url) {
        setError(data.error || 'Checkout is unavailable right now.')
        setBusy(false)
        return
      }
      window.location.assign(data.url)
    } catch {
      setError('Network error starting checkout.')
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={start}
        disabled={busy}
        className="group cta-sheen inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-orange-100 disabled:opacity-60"
      >
        {busy ? 'Opening checkout…' : label}
        <iconify-icon icon="solar:cart-large-2-linear" width="18" height="18" />
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
