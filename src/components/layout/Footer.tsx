'use client'

import Link from 'next/link'
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants'
import { EmailCapture } from '@/components/forms/EmailCapture'

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 font-sans relative overflow-hidden">
      {/* Top Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto border-x border-white/10 relative z-10">
        {/* Social Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10">
          <a
            href={SITE_CONFIG.links.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-4">
              <iconify-icon icon="solar:soundwave-linear" width="20" height="20" className="text-white" />
              <span className="text-sm font-medium text-white">SoundCloud</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </a>

          <a
            href={SITE_CONFIG.links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-4">
              <iconify-icon icon="solar:music-note-2-linear" width="20" height="20" className="text-white" />
              <span className="text-sm font-medium text-white">TikTok</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </a>

          <a
            href={SITE_CONFIG.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-4">
              <iconify-icon icon="solar:camera-linear" width="18" height="18" className="text-white" />
              <span className="text-sm font-medium text-white">Instagram</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </a>

          <a
            href={SITE_CONFIG.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 border-b md:border-b-0 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-4">
              <iconify-icon icon="solar:play-circle-linear" width="18" height="18" className="text-white" />
              <span className="text-sm font-medium text-white">YouTube</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 min-h-[300px]">
          {/* Column 1: Explore */}
          <div className="p-8 md:p-12 border-r border-white/10 border-b md:border-b-0">
            <h4 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-8">
              Explore
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Information */}
          <div className="p-8 md:p-12 border-r border-white/10 border-b md:border-b-0">
            <h4 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-8">
              Information
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.information.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="p-8 md:p-12 border-r border-white/10 border-b md:border-b-0">
            <h4 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-8">
              Legal
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="p-8 md:p-12">
            <h4 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-8">
              Connect
            </h4>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Stay informed about new releases and private offerings.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-8 md:px-12 pb-24 pt-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-semibold tracking-tighter text-white">
                ISIATA.
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs font-medium">
              Culture over category. Sound, objects, tools, and access.
            </p>
          </div>

          <EmailCapture source="footer" />
        </div>

        {/* Copyright */}
        <div className="px-8 md:px-12 pb-8 border-t border-white/10 pt-8 flex justify-between items-center text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} ISIATA</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  )
}
