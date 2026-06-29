'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SYSTEMS_BOOKING_HREF } from '@/lib/systems/tiers'

export function FunnelHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed flex z-50 px-4 top-6 right-0 left-0 justify-center">
      <div
        className={`flex w-full max-w-2xl border rounded-full pt-2 pr-2 pb-2 pl-6 backdrop-blur-xl items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 border-white/10 depth-shadow-nav'
            : 'bg-transparent border-white/0 shadow-none'
        }`}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center w-[100px] h-[40px] rounded text-xl font-oswald tracking-widest text-white"
        >
          ISIATA
        </Link>

        <Link
          href={SYSTEMS_BOOKING_HREF}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 ${
            scrolled
              ? 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          Book a call
        </Link>
      </div>
    </nav>
  )
}
