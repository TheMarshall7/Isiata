'use client'

import Link from 'next/link'
import { FOOTER_LINKS, ISIATA_LOGO_URL, SITE_CONFIG } from '@/lib/constants'

const SOCIAL = [
  {
    href: SITE_CONFIG.links.soundcloud,
    label: 'SoundCloud',
    icon: 'solar:soundwave-linear',
  },
  {
    href: SITE_CONFIG.links.tiktok,
    label: 'TikTok',
    icon: 'solar:music-note-2-linear',
  },
  {
    href: SITE_CONFIG.links.instagram,
    label: 'Instagram',
    icon: 'solar:camera-linear',
  },
  {
    href: SITE_CONFIG.links.youtube,
    label: 'YouTube',
    icon: 'solar:play-circle-linear',
  },
] as const

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <span
        aria-hidden
        className="mb-3 block h-px w-8 bg-gradient-to-r from-[#d8aa67]/80 to-transparent"
      />
      <h4 className="font-display text-[11px] font-normal uppercase tracking-[0.28em] text-[#d8c3a4]">
        {children}
      </h4>
    </div>
  )
}

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith('mailto:') || href.startsWith('http')
  const className =
    'group relative inline-block text-sm text-[#b8a890]/90 transition-colors duration-300 hover:text-[#ece3d7]'

  const inner = (
    <>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d8aa67]/50 transition-all duration-300 group-hover:w-full" />
    </>
  )

  if (external) {
    return (
      <a href={href} className={className} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#d8aa67]/20 bg-background font-sans text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/45 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl border-x border-[#d8aa67]/15">
        {/* Social */}
        <div className="grid grid-cols-1 border-b border-[#d8aa67]/15 md:grid-cols-4">
          {SOCIAL.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between px-6 py-5 transition-colors duration-300 hover:bg-[#d8aa67]/[0.04] md:px-7 ${
                i < SOCIAL.length - 1
                  ? 'border-b border-[#d8aa67]/15 md:border-b-0 md:border-r'
                  : 'border-b border-[#d8aa67]/15 md:border-b-0'
              }`}
            >
              <span className="flex items-center gap-3.5">
                <iconify-icon
                  icon={item.icon}
                  width="18"
                  height="18"
                  className="text-[#d8c3a4] transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-sm tracking-wide text-[#d5c8b8] transition-colors duration-300 group-hover:text-[#ece3d7]">
                  {item.label}
                </span>
              </span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="14"
                height="14"
                className="text-[#d8aa67]/55 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#d8aa67]"
              />
            </a>
          ))}
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 border-b border-[#d8aa67]/15 md:grid-cols-4">
          <div className="border-b border-r border-[#d8aa67]/15 p-8 md:border-b-0 md:p-10 lg:p-12">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-4">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-[#d8aa67]/15 p-8 md:border-b-0 md:border-r md:p-10 lg:p-12">
            <ColumnHeading>About</ColumnHeading>
            <ul className="space-y-4">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="border-r border-[#d8aa67]/15 p-8 md:p-10 lg:p-12">
            <ColumnHeading>Legal</ColumnHeading>
            <ul className="space-y-4">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 md:p-10 lg:p-12">
            <ColumnHeading>Stay Close</ColumnHeading>
            <p className="text-sm leading-relaxed text-[#b8a890]/85">
              New releases.
              <br />
              Private offerings.
              <br />
              First access.
            </p>
          </div>
        </div>

        {/* Brand mark */}
        <div className="relative flex flex-col items-center overflow-hidden px-8 py-20 text-center md:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src="/brand/overlays/footer-brand.png"
              alt=""
              className="h-full w-full object-cover object-center opacity-80 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <img
              src={ISIATA_LOGO_URL}
              alt=""
              aria-hidden
              className="-translate-y-5 mb-6 h-10 w-auto object-contain opacity-70 md:h-12"
            />
            <p className="translate-x-[5px] font-display text-4xl font-normal uppercase tracking-[0.42em] text-[#ece3d7] gradient-text-gold sm:text-5xl md:text-6xl md:tracking-[0.48em]">
              ISIATA
            </p>
            <div className="mt-8 flex w-full max-w-md items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8aa67]/40" />
              <p className="shrink-0 text-[10px] uppercase tracking-[0.32em] text-[#9a8b74]">
                Music · Artifacts · Systems
              </p>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8aa67]/40" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#d8aa67]/15 px-8 py-6 text-[10px] uppercase tracking-[0.22em] text-[#7a6f5f] md:flex-row md:px-12">
          <span className="font-display tracking-[0.2em]">
            © {new Date().getFullYear()} ISIATA
          </span>
          <span className="font-display tracking-[0.2em]">All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}
