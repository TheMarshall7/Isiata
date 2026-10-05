'use client'

import Link from 'next/link'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { useEffect } from 'react'

const SOCIAL = [
  { href: SITE_CONFIG.links.soundcloud, label: 'SoundCloud', icon: 'mdi:soundcloud' },
  { href: SITE_CONFIG.links.tiktok, label: 'TikTok', icon: 'ic:baseline-tiktok' },
  { href: SITE_CONFIG.links.instagram, label: 'Instagram', icon: 'mdi:instagram' },
  { href: SITE_CONFIG.links.youtube, label: 'YouTube', icon: 'mdi:youtube' },
] as const

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

        <div className="mt-14 flex items-center gap-7">
          {SOCIAL.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-[#d5c8b8] transition-colors hover:text-[#ece3d7]"
            >
              <iconify-icon icon={item.icon} width="26" height="26" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
