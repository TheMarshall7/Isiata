'use client'

import { useState, type FormEvent } from 'react'
import { ARTISTS_EMAIL_HREF, ASSET_STREAMS, FIT_QUESTIONS } from '@/lib/artists/page-content'
import { useSelection } from './selection-store'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const ROLES = ['Artist', 'Producer', 'Music educator', 'Label', 'Other']
const INCOME = ['Under $1k / month', '$1k–$5k / month', '$5k–$15k / month', '$15k+ / month', 'Prefer not to say']
const AUDIENCE = ['Under 5k', '5k–20k', '20k–100k', '100k+']

const field =
  'w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-[#d8aa67]/70 focus:bg-black/60'
const labelCls = 'mb-1.5 block text-[10px] uppercase tracking-widest text-zinc-500'

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <select name={name} defaultValue="" className={`${field} appearance-none`}>
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0b0b0b]">
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function ApplicationForm({ ctaLabel }: { ctaLabel: string }) {
  const selection = useSelection()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [fallbackHref, setFallbackHref] = useState(ARTISTS_EMAIL_HREF)

  const assets = ASSET_STREAMS.filter((a) => selection.assets.includes(a.id))
  const fitYes = FIT_QUESTIONS.filter((q) => selection.fit[q.id] === true).length
  const fitAnswered = FIT_QUESTIONS.filter((q) => q.id in selection.fit).length
  const calc = selection.calculator

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    const body = {
      ...data,
      consent: data.consent === 'on',
      selections: { assets: selection.assets, calculator: selection.calculator, fit: selection.fit },
    }
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/artist-business/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setStatus('sent')
        return
      }
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (res.status === 400 || res.status === 429) {
        setError(json.error ?? 'Please check the form and try again.')
        setStatus('idle')
        return
      }
      throw new Error(json.error ?? 'delivery_failed')
    } catch {
      // Delivery failed: offer email with the same details so nothing is lost.
      const summary = [
        `Name: ${data.name ?? ''}`,
        `Email: ${data.email ?? ''}`,
        `Artist / brand: ${data.artistName ?? ''}`,
        `Role: ${data.role ?? ''}`,
        `Link: ${data.link ?? ''}`,
        `Monthly income: ${data.monthlyIncome ?? ''}`,
        `Audience: ${data.audienceSize ?? ''}`,
        `Assets: ${assets.map((a) => a.asset).join(', ')}`,
        `Fit check: ${fitYes}/${FIT_QUESTIONS.length}`,
        '',
        String(data.message ?? ''),
      ].join('\n')
      setFallbackHref(
        `${ARTISTS_EMAIL_HREF}?subject=${encodeURIComponent('Artist Business Audit application')}&body=${encodeURIComponent(summary)}`
      )
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center py-12 text-center animate-fade-in-up" aria-live="polite">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8aa67]/60 bg-[#d8aa67]/10">
          <iconify-icon icon="solar:check-read-linear" width="28" height="28" className="text-[#f0c681]" />
        </span>
        <h3 className="text-2xl font-display uppercase tracking-normal text-gold mb-3">Application received</h3>
        <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
          We&apos;ll review your brand, audience and the assets you selected, then reach out about your Artist
          Business Audit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="text-left" noValidate={false}>
      {/* What travels with the application */}
      <div className="mb-8 rounded-xl border border-[#2D516C]/60 bg-[#1B2232]/40 p-4 md:p-5">
        <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#9cc3df]">
          <iconify-icon icon="solar:paperclip-linear" width="14" height="14" />
          Included from this page
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <a href="#opportunity" className="rounded-lg bg-black/30 p-3 hover:bg-black/50 transition-colors">
            <p className="text-zinc-500 mb-1">Assets</p>
            <p className="text-white">{assets.length ? `${assets.length} selected` : 'None yet'}</p>
          </a>
          <a href="#roi" className="rounded-lg bg-black/30 p-3 hover:bg-black/50 transition-colors">
            <p className="text-zinc-500 mb-1">Your numbers</p>
            <p className="text-white">{calc ? `${usd.format(calc.monthlyRevenue)} / month` : 'Not run yet'}</p>
          </a>
          <a href="#fit" className="rounded-lg bg-black/30 p-3 hover:bg-black/50 transition-colors">
            <p className="text-zinc-500 mb-1">Fit check</p>
            <p className="text-white">
              {fitAnswered ? `${fitYes} / ${FIT_QUESTIONS.length} yes` : 'Not taken yet'}
            </p>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className={labelCls}>Name *</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={labelCls}>Email *</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className={labelCls}>Artist or brand name</span>
          <input name="artistName" className={field} />
        </label>
        <label className="block">
          <span className={labelCls}>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>Main link (Instagram, website or Spotify)</span>
          <input name="link" type="url" placeholder="https://" className={field} />
        </label>
        <Select name="role" label="You are" options={ROLES} />
        <Select name="audienceSize" label="Engaged audience" options={AUDIENCE} />
        <div className="sm:col-span-2">
          <Select name="monthlyIncome" label="Current monthly income (music or otherwise)" options={INCOME} />
        </div>
        <label className="block sm:col-span-2">
          <span className={labelCls}>Anything we should know?</span>
          <textarea name="message" rows={3} className={`${field} resize-y`} />
        </label>
      </div>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="mt-5 flex items-start gap-3 text-xs text-zinc-400">
        <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#d8aa67]" />
        I agree to be contacted about my application.
      </label>

      {error && <p className="mt-4 text-sm text-[#ff8a7a]">{error}</p>}

      {status === 'error' && (
        <div className="mt-5 rounded-lg border border-[#C9372C]/40 bg-[#971E1A]/15 p-4 text-sm text-zinc-300">
          We couldn&apos;t send that just now. Email it instead and your answers come with it.
          <a href={fallbackHref} className="ml-2 text-[#f0c681] underline underline-offset-4">
            Send by email
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary cta-sheen mt-6 w-full sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : ctaLabel}
        <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
      </button>
    </form>
  )
}
