'use client'

import type { CSSProperties } from 'react'
import { Section } from '@/components/ui/Section'
import { BrandOverlay } from '@/components/ui/BrandOverlay'
import { EmailCapture } from '@/components/forms/EmailCapture'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { useParallax } from '@/hooks/useParallax'

export function StayCloseSection() {
  const bgRef = useParallax({ factor: 0.58 })
  const copyRef = useParallax({ factor: 0.22, invert: true })

  return (
    <Section
      reveal
      className="rule-draw relative w-full overflow-hidden border-t border-[#d8aa67]/20 py-28 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent"
      />
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-x-0 -top-[30%] h-[160%] will-change-transform"
      >
        <BrandOverlay variant={4} opacity={0.58} className="inset-0" />
      </div>

      <div
        ref={copyRef}
        className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-8 text-center will-change-transform md:px-12"
      >
        <h2 data-reveal style={{ '--d': 0 } as CSSProperties} className="font-display text-4xl font-normal uppercase tracking-[0.28em] text-[#ece3d7] md:text-5xl md:tracking-[0.32em]">
          <TypeWriter text="Stay Close" speed={90} delay={200} />
        </h2>

        <p data-reveal style={{ '--d': 2 } as CSSProperties} className="mt-6 max-w-md font-display text-base italic leading-relaxed tracking-wide text-[#c4a574] md:text-lg">
          Some things aren&apos;t announced. They&apos;re{' '}
          <span
            className="text-shine-in text-[#e8d4a8]"
            style={{ '--shine-delay': '1.5s' } as CSSProperties}
          >
            revealed
          </span>
          .
        </p>

        <div
          data-reveal
          style={{ '--d': 2 } as CSSProperties}
          aria-hidden
          className="mt-8 mb-8 flex w-full max-w-xs items-center gap-3"
        >
          <span className="reveal-rail h-px flex-1 bg-gradient-to-r from-transparent to-[#d8aa67]/55" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#d8aa67]/80" />
          <span className="reveal-rail h-px flex-1 bg-gradient-to-l from-transparent to-[#d8aa67]/55" />
        </div>

        <p data-reveal style={{ '--d': 3 } as CSSProperties} className="max-w-sm text-sm leading-relaxed tracking-wide text-[#b8a890]/85 md:text-[0.95rem]">
          Join to discover alongside. First access to new music, unreleased work,
          and what comes next.
        </p>

        <div data-reveal style={{ '--d': 4 } as CSSProperties} className="mt-10 flex w-full justify-center">
          <EmailCapture
            source="homepage"
            placeholder="EMAIL"
            buttonLabel="Enter"
            className="w-full max-w-md items-center"
          />
        </div>

        <div className="mt-14 flex w-full max-w-sm items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8aa67]/35" />
          <p className="shrink-0 text-[10px] uppercase tracking-[0.28em] text-[#9a8b74]">
            Private Access · ISIATA
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8aa67]/35" />
        </div>
      </div>
    </Section>
  )
}
