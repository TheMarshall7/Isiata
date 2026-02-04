'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className="fixed flex z-50 px-4 top-6 right-0 left-0 justify-center">
        <div className={`flex w-full max-w-4xl border rounded-full pt-2 pr-2 pb-2 pl-6 backdrop-blur-xl items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 border-white/10 shadow-2xl shadow-black/50'
            : 'bg-transparent border-white/0 shadow-none'
        }`}>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] bg-cover rounded text-xl font-oswald tracking-widest text-white"
          >
            ISIATA
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative hover:text-white transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/explore"
              className={`hidden md:block px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 ${
                scrolled
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              Explore
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <iconify-icon icon="solar:hamburger-menu-linear" width="24" height="24" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
