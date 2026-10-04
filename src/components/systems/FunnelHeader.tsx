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
          className="inline-flex items-center justify-center w-[100px] h-[40px] rounded text-xl font-display tracking-widest text-white"
        >
          ISIATA
        </Link>

        <Link
          href={SYSTEMS_BOOKING_HREF}
          className="btn-primary min-h-10 px-5 text-[10px]"
        >
          Book a call
        </Link>
      </div>
    </nav>
  )
}
