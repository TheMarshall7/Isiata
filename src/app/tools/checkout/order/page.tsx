'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GHL_ORDER_FORM_URL } from '@/lib/constants'

export default function OrderPage() {
  const router = useRouter()

  const handleLeaveClick = () => {
    const message = 'You are about to leave the product page / checkout. Are you sure?'
    if (window.confirm(message)) {
      router.push('/')
    }
  }

  return (
    <>
      {/* Back + ISIATA bar */}
      <div className="border-b border-white/10 bg-background">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
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

      {/* Iframe */}
      <div className="w-full min-h-[calc(100vh-3.5rem)]">
        <iframe
          src={GHL_ORDER_FORM_URL}
          className="w-full h-full min-h-[calc(100vh-3.5rem)] border-0"
          title="Checkout"
        />
      </div>
    </>
  )
}
