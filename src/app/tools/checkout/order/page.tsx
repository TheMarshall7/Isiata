'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { GHL_ORDER_FORM_URL } from '@/lib/constants'

function OrderOverlay() {
  const router = useRouter()

  const handleLeaveClick = () => {
    const message = 'You are about to leave the product page / checkout. Are you sure?'
    if (window.confirm(message)) {
      router.push('/')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background text-white"
      style={{ backgroundColor: '#020202' }}
    >
      {/* Site-matching background styling */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] rounded-full bg-zinc-700/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-zinc-600/10 blur-[120px]" />
      </div>
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Header — site styling, centered ISIATA with leave confirmation */}
      <div className="shrink-0 border-b border-white/10 relative z-10" style={{ backgroundColor: '#020202' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/tools/checkout"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
            Back to product
          </Link>

          <button
            type="button"
            onClick={handleLeaveClick}
            className="absolute left-1/2 -translate-x-1/2 font-oswald text-xl tracking-widest text-white hover:text-zinc-300 transition-colors cursor-pointer"
          >
            ISIATA
          </button>

          <div className="w-[120px]" aria-hidden />
        </div>
      </div>

      {/* Full-space iframe */}
      <div className="flex-1 min-h-0 w-full relative z-10">
        <iframe
          src={GHL_ORDER_FORM_URL}
          className="w-full h-full border-0"
          title="Checkout"
        />
      </div>
    </div>
  )
}

export default function OrderPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || typeof document === 'undefined') {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col bg-background text-white items-center justify-center"
        style={{ backgroundColor: '#020202' }}
      >
        <p className="text-zinc-500 text-sm">Loading checkout…</p>
      </div>
    )
  }

  return createPortal(<OrderOverlay />, document.body)
}
