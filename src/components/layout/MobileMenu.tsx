'use client'

import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { useEffect } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gold"
          aria-label="Close menu"
        >
          <iconify-icon icon="solar:close-circle-linear" width="32" height="32" />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-3xl font-medium text-white hover:text-gold-light transition-colors"
              style={{
                animation: `reveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both ${index * 50}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
