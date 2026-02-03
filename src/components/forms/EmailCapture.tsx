'use client'

import { useState } from 'react'
import { analytics } from '@/lib/analytics'

interface EmailCaptureProps {
  source: string
}

export function EmailCapture({ source }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      analytics.joinList(source)
      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-sm text-green-400">
        Thank you for subscribing.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col md:flex-row gap-0">
      <div className="relative w-full md:w-80 group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="PRODUCER@EMAIL.COM"
          required
          disabled={loading}
          className="bg-white text-black text-xs font-mono font-medium placeholder:text-black/50 px-5 py-4 w-full h-full outline-none uppercase transition-colors rounded-none disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-zinc-900 text-white text-[11px] tracking-wide font-semibold px-8 py-4 border border-zinc-800 hover:bg-zinc-800 transition-colors uppercase whitespace-nowrap disabled:opacity-50"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && (
        <p className="text-xs text-red-400 mt-2">{error}</p>
      )}
    </form>
  )
}
