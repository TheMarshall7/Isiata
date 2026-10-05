'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_LINKS_LEFT, NAV_LINKS_RIGHT } from '@/lib/constants'
import { MobileMenu } from './MobileMenu'

type NavItem = {
  href: string
  label: string
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`artifact-nav-link ${active ? 'is-active' : ''}`}
    >
      <span>{item.label}</span>
      {active && (
        <span aria-hidden className="artifact-nav-active-mark">
          <span className="artifact-nav-active-diamond" />
        </span>
      )}
    </Link>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isActive = (href: string) =>
    pathname === href || Boolean(pathname?.startsWith(`${href}/`))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed z-50 top-5 md:top-6 inset-x-0 flex justify-center px-3 md:px-5"
        aria-label="Primary navigation"
      >
        <div
          className={`artifact-navbar group relative h-[52px] md:h-[58px] w-full max-w-5xl overflow-hidden rounded-full ${isHome ? 'is-home-hero' : ''} ${scrolled ? 'is-scrolled' : ''}`}
        >
          <div aria-hidden className="artifact-navbar-sheen" />

          {/* Left links — Music, Tools */}
          <div className="relative z-20 hidden h-full grid-cols-2 md:grid">
            <div className="flex items-center justify-end gap-6 lg:gap-10 pr-[7.5rem] lg:pr-[9.25rem] pl-8 lg:pl-12">
              {NAV_LINKS_LEFT.map((link) => (
                <NavLink key={link.href} item={link} active={isActive(link.href)} />
              ))}
            </div>

            {/* Right links — Garments, Contact */}
            <div className="flex items-center justify-start gap-5 lg:gap-8 pl-[7.5rem] lg:pl-[9.25rem] pr-8 lg:pr-12">
              {NAV_LINKS_RIGHT.map((link) => (
                <NavLink key={link.href} item={link} active={isActive(link.href)} />
              ))}
            </div>
          </div>

          {/* Absolute center keeps the wordmark mathematically centered. */}
          <div className="absolute z-30 left-1/2 top-[calc(50%+2px)] flex -translate-x-1/2 -translate-y-1/2 items-center gap-5 md:top-1/2 md:gap-7">
            <span aria-hidden className="artifact-nav-divider" />
            <Link
              href="/"
              className="inline-flex items-center justify-center whitespace-nowrap font-display font-normal text-xl leading-none tracking-[0.34em] text-[#ECE3D7]"
            >
              ISIATA
            </Link>
            <span aria-hidden className="artifact-nav-divider" />
          </div>

          {/* Mobile menu trigger. */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="absolute z-30 right-4 top-[calc(50%+2px)] flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#ECE3D7] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <iconify-icon icon="solar:hamburger-menu-linear" width="24" height="24" />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
