'use client'

import { Section } from '@/components/ui/Section'
import { BrandOverlay } from '@/components/ui/BrandOverlay'
import { EmailCapture } from '@/components/forms/EmailCapture'

export function StayCloseSection() {
  return (
    <Section reveal className="relative w-full overflow-hidden border-t border-[#d8aa67]/20 py-28 md:py-36">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent"
      />
      <BrandOverlay variant={4} opacity={0.55} />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-8 text-center md:px-12">
        <h2 className="font-display text-4xl font-normal uppercase tracking-[0.28em] text-[#ece3d7] md:text-5xl md:tracking-[0.32em]">
          Stay Close
        </h2>

        <p className="mt-6 max-w-md font-display text-base italic leading-relaxed tracking-wide text-[#c4a574] md:text-lg">
          Some things aren&apos;t announced. They&apos;re revealed.
        </p>

        <div
          aria-hidden
          className="mt-8 mb-8 flex w-full max-w-xs items-center gap-3"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8aa67]/55" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#d8aa67]/80" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8aa67]/55" />
        </div>

        <p className="max-w-sm text-sm leading-relaxed tracking-wide text-[#b8a890]/85 md:text-[0.95rem]">
          Join the private list for first access to new music, unreleased work,
          and what comes next.
        </p>

        <div className="mt-10 flex w-full justify-center">
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
