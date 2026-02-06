'use client'

import { useState, useRef, useEffect } from 'react'
import { analytics } from '@/lib/analytics'

interface EmailCaptureProps {
  source: string
}

export function EmailCapture({ source }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [showNameField, setShowNameField] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!showNameField) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (formRef.current && !formRef.current.contains(target)) {
        setShowNameField(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNameField])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name.trim() || undefined, source }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      analytics.joinList(source)
      setSuccess(true)
      setEmail('')
      setName('')
      setShowNameField(false)
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
    <form ref={formRef} onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col gap-0">
      {showNameField && (
        <div className="relative w-full md:w-80 mb-0">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            disabled={loading}
            className="bg-white text-black text-xs font-mono font-medium placeholder:text-black/50 px-5 py-4 w-full outline-none transition-colors rounded-none disabled:opacity-50 border-b border-zinc-200"
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-0">
        <div className="relative w-full md:w-80">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setShowNameField(true)}
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
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-2">{error}</p>
      )}
    </form>
  )
}
