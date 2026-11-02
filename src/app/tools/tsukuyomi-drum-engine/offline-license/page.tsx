'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { TSUKUYOMI_DRUM_ENGINE, TSUKUYOMI_DRUM_ENGINE_HREF } from '@/lib/tools/tsukuyomi-drum-engine'
import {
  TSUKUYOMI_INSTALLATION_ID_PATTERN,
  TSUKUYOMI_SERIAL_PATTERN,
} from '@/lib/tools/tsukuyomi-license-api'

const inputClass =
  'w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-gold/60 focus:outline-none'

export default function TsukuyomiOfflineLicensePage() {
  const [serial, setSerial] = useState('')
  const [installationId, setInstallationId] = useState('')
  const [status, setStatus] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanSerial = serial.trim().toUpperCase().replace(/\s+/g, '')
    const cleanId = installationId.trim().toLowerCase()

    if (!TSUKUYOMI_SERIAL_PATTERN.test(cleanSerial)) {
      setStatus('error')
      setMessage('Enter the serial as TSU-XXXX-XXXX-XXXX.')
      return
    }
    if (!TSUKUYOMI_INSTALLATION_ID_PATTERN.test(cleanId)) {
      setStatus('error')
      setMessage('Copy the installation ID exactly as shown in the plugin.')
      return
    }

    setStatus('working')
    setMessage('')

    try {
      const response = await fetch('/api/tsukuyomi/offline-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial: cleanSerial, installation_id: cleanId }),
      })
      const data = (await response.json()) as { payload?: string; signature?: string; error?: string }

      if (!response.ok || !data.payload || !data.signature) {
        setStatus('error')
        setMessage(data.error ?? 'Could not create the licence file. Try again later.')
        return
      }

      // Same JSON shape the plugin writes itself, so Activate → Import licence file accepts it.
      const file = JSON.stringify({ payload: data.payload, signature: data.signature })
      const url = URL.createObjectURL(new Blob([file], { type: 'application/json' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'license.json'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)

      setStatus('done')
      setMessage('Your licence file has downloaded. In Tsukuyomi, choose Activate, then Import licence file, and select it.')
    } catch {
      setStatus('error')
      setMessage('Could not reach the licence server. Check your connection and try again.')
    }
  }

  return (
    <Container className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-xl">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          {TSUKUYOMI_DRUM_ENGINE.title}
        </p>
        <h1 className="mb-4 font-display text-4xl uppercase tracking-normal text-gold md:text-5xl">
          Offline activation
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-zinc-400 md:text-base">
          Use this only if Tsukuyomi cannot reach the internet to activate. Enter your serial and the
          installation ID shown in the plugin&apos;s Activate panel. You&apos;ll get a licence file to import.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Serial
            </span>
            <input
              type="text"
              value={serial}
              onChange={(event) => setSerial(event.target.value)}
              placeholder="TSU-XXXX-XXXX-XXXX"
              autoComplete="off"
              spellCheck={false}
              required
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Installation ID
            </span>
            <input
              type="text"
              value={installationId}
              onChange={(event) => setInstallationId(event.target.value)}
              placeholder="From the plugin's Activate panel"
              autoComplete="off"
              spellCheck={false}
              required
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            disabled={status === 'working'}
            className="inline-flex w-full items-center justify-center rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
          >
            {status === 'working' ? 'Creating licence…' : 'Get licence file'}
          </button>
        </form>

        {message && (
          <p
            role="status"
            className={`mt-6 text-sm leading-relaxed ${status === 'error' ? 'text-red-400' : 'text-zinc-300'}`}
          >
            {message}
          </p>
        )}

        <Link
          href={TSUKUYOMI_DRUM_ENGINE_HREF}
          className="mt-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
        >
          Back to Tsukuyomi
        </Link>
      </div>
    </Container>
  )
}
