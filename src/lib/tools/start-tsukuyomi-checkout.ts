/**
 * Client helper: start Stripe Checkout for Tsukuyomi Drum Engine.
 * Safe to call while purchase is gated — the API returns 403 until enabled.
 */
export async function startTsukuyomiCheckout(options?: {
  email?: string
}): Promise<{ ok: true } | { ok: false; error: string; status?: number }> {
  try {
    const response = await fetch('/api/tsukuyomi/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(options?.email ? { email: options.email } : {}),
      }),
    })

    const data = (await response.json().catch(() => ({}))) as {
      url?: string
      error?: string
    }

    if (!response.ok) {
      return {
        ok: false,
        error: data.error || 'Checkout is unavailable.',
        status: response.status,
      }
    }

    if (!data.url) {
      return { ok: false, error: 'Checkout URL missing.' }
    }

    window.location.assign(data.url)
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error starting checkout.' }
  }
}
