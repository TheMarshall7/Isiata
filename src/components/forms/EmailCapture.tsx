'use client'

import { useState, useRef, useEffect } from 'react'
import { analytics } from '@/lib/analytics'

interface EmailCaptureProps {
  source: string
  placeholder?: string
  buttonLabel?: string
  className?: string
  /** Extra classes on the fused input/button shell */
  shellClassName?: string
}

const fieldClass =
  'min-h-12 w-full rounded-full border border-[#d8aa67]/75 bg-black/20 px-7 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f0dfc8] outline-none transition-all duration-300 placeholder:text-[#baa990] focus:border-[#f0c681] focus:bg-[#b7792a]/10 disabled:opacity-50'

const fusedShellClass =
  'group/shell flex min-h-12 w-full max-w-md items-stretch overflow-hidden rounded-full border border-[#d8aa67]/75 bg-black/20 transition-all duration-300 focus-within:border-[#f0c681] focus-within:bg-[#b7792a]/10'

const fusedInputClass =
  'min-w-0 flex-1 bg-transparent px-6 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f0dfc8] outline-none placeholder:text-[#baa990] disabled:opacity-50'

const fusedButtonClass =
  'group inline-flex shrink-0 items-center justify-center gap-2 border-l border-[#d8aa67]/40 bg-transparent px-5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f0dfc8] transition-all duration-300 hover:bg-[#b7792a]/15 hover:text-[#f8ecd8] disabled:opacity-50 whitespace-nowrap'

export function EmailCapture({
  source,
  placeholder = 'PRODUCER@EMAIL.COM',
  buttonLabel = 'Subscribe',
  className,
  shellClassName,
}: EmailCaptureProps) {
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
    } catch {
      setError('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <p className="text-[11px] uppercase tracking-[0.24em] text-[#d8c3a4]">
        Thank you for subscribing.
      </p>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 lg:w-auto ${className ?? ''}`}
    >
      {showNameField && (
        <div className="w-full md:w-80">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="NAME"
            disabled={loading}
            className={fieldClass}
          />
        </div>
      )}
      <div className={`${fusedShellClass}${shellClassName ? ` ${shellClassName}` : ''}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setShowNameField(true)}
          placeholder={placeholder}
          required
          disabled={loading}
          className={fusedInputClass}
        />
        <button type="submit" disabled={loading} className={fusedButtonClass}>
          {loading ? '...' : buttonLabel}
          {!loading && (
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="14"
              height="14"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          )}
        </button>
      </div>
      {error && (
        <p className="text-[10px] uppercase tracking-[0.2em] text-red-400/90">{error}</p>
      )}
    </form>
  )
}
