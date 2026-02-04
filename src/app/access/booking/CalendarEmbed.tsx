'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { CALENDAR_EMBED_URL } from '@/lib/constants'

const IFRAME_ID = '0RMK2V7TPRYpGm701Ain_1770183133670'

export function CalendarEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(1100)

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const data = e.data
      if (data == null) return
      const h = typeof data === 'object' && 'height' in data ? Number((data as { height: number }).height) : typeof data === 'number' ? data : null
      if (typeof h === 'number' && h > 0) {
        setHeight(Math.max(h, 800))
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="rounded-lg overflow-hidden min-h-[800px]">
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
      <iframe
        ref={iframeRef}
        id={IFRAME_ID}
        src={CALENDAR_EMBED_URL}
        title="Book a session"
        style={{
          width: '100%',
          height: `${height}px`,
          minHeight: '800px',
          border: 0,
          overflow: 'hidden',
          background: 'transparent',
        }}
        scrolling="no"
      />
    </div>
  )
}
