'use client'

import { CALENDAR_EMBED_URL } from '@/lib/constants'

/**
 * GHL calendar — plain iframe only. Do not load form_embed.js: it hides booking
 * iframes until a postMessage handshake that often fails outside GHL page builders.
 */
export function CalendarEmbed() {
  return (
    <div className="relative w-full rounded-lg border border-white/10 bg-surface-raised/20 overflow-hidden">
      <iframe
        src={CALENDAR_EMBED_URL}
        title="Book a session"
        className="w-full border-0 bg-white block"
        style={{ height: '1100px', minHeight: '800px' }}
        allow="clipboard-read; clipboard-write"
      />
    </div>
  )
}
