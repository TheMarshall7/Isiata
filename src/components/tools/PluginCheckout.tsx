'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { Price } from '@/components/ui/Price'
import { PluginNotifyButton } from '@/components/tools/PluginNotifyButton'
import type { BillingKind, SubscriptionPlan } from '@/lib/tools/plugin-checkout'

export type CheckoutSummary = {
  kind: BillingKind
  /** Product slug (plugin or bundle). Unused for the subscription. */
  slug: string
  /** Subscription plan, when kind is 'subscription' */
  plan?: SubscriptionPlan
  available: boolean
  eyebrow: string
  name: string
  tagline: string
  heroSrc?: string
  heroAlt: string
  price: string
  priceNote?: string
  /** Regular price shown struck through beside the launch price */
  regularPrice?: string
  /** Names of what the buyer gets */
  included: string[]
  includedLabel: string
  formats: string
  install: string
  notifySource: string
  notifyLabel?: string
  backHref: string
  backLabel: string
}

const inputClass =
  'w-full border border-[#d8aa67]/30 bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-[#d8aa67] focus:outline-none'

const primaryButtonClass =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#d8aa67]/75 bg-black/20 px-7 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f0dfc8] backdrop-blur-sm transition-all duration-300 hover:border-[#f0c681] hover:bg-[#b7792a]/10 hover:shadow-[0_0_28px_rgba(211,157,83,0.18)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'

export function PluginCheckout({
  summary,
  planSwitcher,
}: {
  summary: CheckoutSummary
  planSwitcher?: ReactNode
}) {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setError(null)
    setBusy(true)
    try {
      const response = await fetch('/api/plugins/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: summary.kind,
          slug: summary.slug,
          plan: summary.plan,
          email: email.trim() || undefined,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!response.ok || !data.url) {
        setError(data.error || 'Checkout is unavailable right now.')
        setBusy(false)
        return
      }
      window.location.assign(data.url)
    } catch {
      setError('Network error. Please try again.')
      setBusy(false)
    }
  }

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <a
          href={summary.backHref}
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          {summary.backLabel}
        </a>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Order summary */}
          <section>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">{summary.eyebrow}</p>
            <h1 className="mb-5 font-display text-4xl uppercase tracking-normal text-gold md:text-5xl">
              {summary.name}
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#ece3d7] md:text-xl">{summary.tagline}</p>

            {summary.heroSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={summary.heroSrc}
                alt={summary.heroAlt}
                className="mb-10 w-full border border-[#d8aa67]/25"
              />
            ) : null}

            <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-600">
              {summary.includedLabel}
            </h2>
            <ul className="mb-12 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {summary.included.map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-[#d8aa67]/15 pt-3 text-sm text-zinc-300">
                  <iconify-icon icon="solar:check-circle-linear" width="16" height="16" className="mt-0.5 shrink-0 text-[#d8aa67]" />
                  {item}
                </li>
              ))}
            </ul>

            <dl className="grid grid-cols-1 gap-x-10 gap-y-5 text-sm md:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Formats</dt>
                <dd className="mt-1 leading-relaxed text-zinc-300">{summary.formats}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Install</dt>
                <dd className="mt-1 leading-relaxed text-zinc-300">{summary.install}</dd>
              </div>
            </dl>
          </section>

          {/* Payment card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-[#d8aa67]/25 bg-black/40 p-6 backdrop-blur-sm md:p-8">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Order summary</p>
              <p className="mb-6 text-lg text-[#f0dfc8]">{summary.name}</p>

              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <span className="text-4xl text-white">
                  <Price value={summary.price} />
                </span>
                {summary.regularPrice ? (
                  <span className="text-sm text-zinc-500">
                    Regular <Price value={summary.regularPrice} strikethrough />
                  </span>
                ) : null}
              </div>
              {summary.priceNote ? <p className="mb-6 text-sm leading-relaxed text-zinc-400">{summary.priceNote}</p> : null}

              {planSwitcher ? <div className="mb-6">{planSwitcher}</div> : null}

              <div className="my-6 border-t border-[#d8aa67]/15" />

              {summary.available ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Email for your receipt (optional)
                    </span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </label>

                  {error ? (
                    <p role="alert" className="border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                      {error}
                    </p>
                  ) : null}

                  <button type="submit" disabled={busy} className={primaryButtonClass}>
                    {busy ? 'Opening secure checkout' : 'Continue to payment'}
                    {busy ? null : <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />}
                  </button>

                  <p className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <iconify-icon icon="solar:lock-keyhole-linear" width="14" height="14" />
                    Payment is handled by Stripe. We never see your card details.
                  </p>
                </form>
              ) : (
                <div className="space-y-5">
                  <p className="border border-[#d8aa67]/20 bg-[#b7792a]/5 px-4 py-3 text-sm leading-relaxed text-[#ece3d7]">
                    Not on sale yet. Leave your email and we will tell you the moment {summary.name} is available.
                  </p>
                  <div className="[&>button]:w-full">
                    <PluginNotifyButton
                      productName={summary.name}
                      source={summary.notifySource}
                      label={summary.notifyLabel ?? 'Notify me on launch'}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-2 text-xs leading-relaxed text-zinc-500">
                <p>Prices in USD. Any taxes are shown at checkout.</p>
                <p>
                  By paying you agree to the{' '}
                  <Link href="/legal/terms" className="text-zinc-300 underline underline-offset-4 hover:text-white">
                    terms
                  </Link>{' '}
                  and the{' '}
                  <Link href="/legal/licensing" className="text-zinc-300 underline underline-offset-4 hover:text-white">
                    licensing
                  </Link>{' '}
                  page.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
