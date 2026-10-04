'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { analytics } from '@/lib/analytics'

interface ReleaseNotifyModalProps {
  isOpen: boolean
  onClose: () => void
  source: string
  title?: string
  description?: string
}

export function ReleaseNotifyModal({
  isOpen,
  onClose,
  source,
  title = 'Get notified on release',
  description = 'Leave your email and we will let you know the moment Tsukuyomi Drum Engine ships.',
}: ReleaseNotifyModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const handleClose = useCallback(() => {
    setError('')
    setLoading(false)
    onClose()
  }, [onClose])

  // Lock page scroll, close on Escape, and keep Tab focus inside the dialog.
  useEffect(() => {
    if (!isOpen) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = document.querySelectorAll<HTMLElement>(
        '[data-release-notify-modal] button:not([disabled]), [data-release-notify-modal] input:not([disabled])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)
    const focusTimer = window.setTimeout(() => {
      if (!success) nameInputRef.current?.focus()
    }, 50)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, handleClose, success])

  // Reset the form each time the modal is reopened.
  useEffect(() => {
    if (isOpen) return
    setName('')
    setEmail('')
    setError('')
    setLoading(false)
    setSuccess(false)
  }, [isOpen])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (loading) return

    const trimmedEmail = email.trim()
    if (!trimmedEmail.includes('@')) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          name: name.trim() || undefined,
          source,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      analytics.joinList(source)
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" aria-hidden />

      <div
        data-release-notify-modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="release-notify-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-lg border border-orange-300/20 bg-black/80 depth-shadow-lg"
      >
        <div className="glow-orb -right-16 -top-16 h-48 w-48 bg-orange-500/15" aria-hidden />

        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close notification form"
            className="absolute right-4 top-4 p-1 text-zinc-500 transition-colors hover:text-white"
          >
            <iconify-icon icon="solar:close-circle-linear" width="24" height="24" />
          </button>

          {success ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-orange-200/40 bg-orange-300/10 text-orange-100">
                <iconify-icon icon="solar:check-circle-linear" width="28" height="28" />
              </div>
              <h2
                id="release-notify-title"
                className="font-display text-2xl uppercase tracking-normal text-white"
              >
                You&apos;re on the list.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                We&apos;ll email you as soon as Tsukuyomi Drum Engine is ready to download.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-orange-100"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-200/70">
                Release notification
              </p>
              <h2
                id="release-notify-title"
                className="pr-8 font-display text-2xl uppercase leading-tight tracking-normal text-white sm:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Name"
                  autoComplete="name"
                  disabled={loading}
                  className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-orange-300/50 disabled:opacity-50"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-orange-300/50 disabled:opacity-50"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="cta-sheen flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-orange-100 disabled:opacity-50"
                >
                  {loading ? 'Signing you up...' : 'Notify me on release'}
                  <iconify-icon icon="solar:bell-linear" width="18" height="18" />
                </button>
                <p className="pt-1 text-center text-[11px] leading-relaxed text-zinc-600">
                  We&apos;ll only email you about the Tsukuyomi release. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}