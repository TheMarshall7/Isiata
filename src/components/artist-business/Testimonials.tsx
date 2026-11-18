'use client'

import { useEffect, useRef, useState } from 'react'
import { ARTIST_TESTIMONIALS } from '@/lib/artists/page-content'

type Testimonial = (typeof ARTIST_TESTIMONIALS)[number]

/**
 * A quote card that morphs into the original screenshot in place, then
 * eases back to the quote once the visitor scrolls it out of view.
 */
function TestimonialCard({ t }: { t: Testimonial }) {
  const [showOriginal, setShowOriginal] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!showOriginal) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.2) setShowOriginal(false)
      },
      { threshold: [0, 0.2] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [showOriginal])

  const layer = 'col-start-1 row-start-1 transition-all duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]'
  const hidden = 'opacity-0 scale-[0.97] blur-md pointer-events-none'
  const shown = 'opacity-100 scale-100 blur-0'

  return (
    <figure ref={ref} className="abs-panel abs-panel-glow p-6 md:p-8 flex flex-col">
      <div className="grid flex-1">
        {/* Quote */}
        <div className={`${layer} ${showOriginal ? hidden : shown}`} aria-hidden={showOriginal}>
          <iconify-icon icon="solar:quote-up-square-bold" width="28" height="28" className="text-[#d8aa67]/70 mb-5" />
          <p className="text-2xl md:text-3xl font-light text-white leading-snug mb-6">“{t.highlight}”</p>
          <blockquote className="space-y-3 text-sm text-zinc-400 leading-relaxed">
            {t.quote.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </blockquote>
        </div>
        {/* Original screenshot */}
        <div
          className={`${layer} flex items-center justify-center ${showOriginal ? shown : hidden}`}
          aria-hidden={!showOriginal}
        >
          <img
            src={t.screenshot}
            alt={`Original message from ${t.name}`}
            loading="lazy"
            className="max-h-[420px] w-auto rounded-lg border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
        <img
          src={t.avatar}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 rounded-full border border-[#d8aa67]/40 object-cover"
        />
        <div className="flex-1">
          <p className="text-white font-medium">{t.name}</p>
          <p className="text-xs text-zinc-500">{t.role}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowOriginal((v) => !v)}
          aria-pressed={showOriginal}
          className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-zinc-400 transition-colors hover:border-[#d8aa67]/50 hover:text-[#f0c681]"
        >
          <iconify-icon
            icon={showOriginal ? 'solar:text-square-linear' : 'solar:gallery-linear'}
            width="14"
            height="14"
          />
          {showOriginal ? 'Back to quote' : 'View original'}
        </button>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {ARTIST_TESTIMONIALS.map((t) => (
        <TestimonialCard key={t.name} t={t} />
      ))}
    </div>
  )
}
