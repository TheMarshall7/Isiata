'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GHL_ORDER_FORM_URL } from '@/lib/constants'
import { DRUM_BUNDLE_HREF } from '@/lib/tools/drum-bundle'

export default function OrderPage() {
  const router = useRouter()

  const handleLeaveClick = () => {
    const message = 'You are about to leave the product page / checkout. Are you sure?'
    if (window.confirm(message)) {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back + ISIATA bar */}
      <div className="border-b border-white/10 bg-background shrink-0">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href={DRUM_BUNDLE_HREF}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
            Back to Tsukuyomi Drum Bundle
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

      {/* GHL payment embed — dark surround; form itself is hosted by GoHighLevel */}
      <div className="flex-1 w-full bg-background">
        <iframe
          src={GHL_ORDER_FORM_URL}
          className="w-full h-[calc(100vh-3.5rem)] min-h-[calc(100vh-3.5rem)] border-0 bg-background"
          title="Checkout"
          allow="payment"
        />
      </div>
    </div>
  )
}
