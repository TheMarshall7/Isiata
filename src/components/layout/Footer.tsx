'use client'

import Link from 'next/link'
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants'
import { EmailCapture } from '@/components/forms/EmailCapture'

export function Footer() {
  return (
    <footer className="bg-background text-white border-t border-white/10 font-sans relative overflow-hidden depth-shadow-xl shadow-2xl shadow-black/60">
      {/* Animated grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      {/* Top Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-48 bg-white/[0.06] blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle inner glow at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto border-x border-white/10 relative z-10">
        {/* Social Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10">
          <a
            href={SITE_CONFIG.links.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <iconify-icon icon="solar:soundwave-linear" width="20" height="20" className="text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">SoundCloud</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </a>

          <a
            href={SITE_CONFIG.links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <iconify-icon icon="solar:music-note-2-linear" width="20" height="20" className="text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">TikTok</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </a>

          <a
            href={SITE_CONFIG.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <iconify-icon icon="solar:camera-linear" width="18" height="18" className="text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">Instagram</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </a>

          <a
            href={SITE_CONFIG.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 border-b md:border-b-0 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <iconify-icon icon="solar:play-circle-linear" width="18" height="18" className="text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">YouTube</span>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="16"
              height="16"
              className="text-white relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 min-h-[300px]">
          {/* Column 1: Explore */}
          <div className="p-8 md:p-12 border-r border-white/10 border-b md:border-b-0 bg-gradient-to-b from-transparent to-white/[0.01]">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">
              Explore
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-zinc-400 hover:text-white transition-all duration-300 block relative"
                  >
                    <span className="relative z-10 group-hover:translate-x-1 inline-block transition-transform duration-300">{link.label}</span>
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-white/30 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Information */}
          <div className="p-8 md:p-12 border-r border-white/10 border-b md:border-b-0 bg-gradient-to-b from-transparent to-white/[0.01]">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">
              Information
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.information.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-zinc-400 hover:text-white transition-all duration-300 block relative"
                  >
                    <span className="relative z-10 group-hover:translate-x-1 inline-block transition-transform duration-300">{link.label}</span>
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-white/30 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="p-8 md:p-12 border-r border-white/10 border-b md:border-b-0 bg-gradient-to-b from-transparent to-white/[0.01]">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">
              Legal
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-zinc-400 hover:text-white transition-all duration-300 block relative"
                  >
                    <span className="relative z-10 group-hover:translate-x-1 inline-block transition-transform duration-300">{link.label}</span>
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-white/30 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="p-8 md:p-12 bg-gradient-to-b from-transparent to-white/[0.01]">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">
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
          <span>Ran on AreoClient™</span>
        </div>
      </div>
    </footer>
  )
}
