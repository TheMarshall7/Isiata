import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Price } from '@/components/ui/Price'
import {
  DRUM_BUNDLE,
  DRUM_BUNDLE_CHECKOUT_HREF,
  DRUM_BUNDLE_HREF,
  DRUM_BUNDLE_PRICE,
} from '@/lib/tools/drum-bundle'

export function DrumBundleFeaturedSection() {
  return (
    <Section reveal>
      <Container bordered className="rule-draw relative border-t border-[#d8aa67]/15 py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 xl:gap-20">
          <div
            style={{ '--d': 1 } as CSSProperties}
            className="reveal-media relative flex min-h-[20rem] items-center justify-center overflow-hidden sm:min-h-[28rem] lg:min-h-0"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-[8%] bottom-[2%] h-1/4 rounded-[50%] bg-black/70 blur-3xl"
            />
            <img
              src={DRUM_BUNDLE.image}
              alt={DRUM_BUNDLE.title}
              className="reveal-media-img relative z-10 h-auto w-full max-w-[31rem] object-contain drop-shadow-[0_30px_38px_rgba(0,0,0,0.82)] xl:max-w-[35rem]"
            />
          </div>

          <div className="relative max-w-xl lg:justify-self-end">
            <div data-reveal style={{ '--d': 0 } as CSSProperties} className="mb-5 flex items-center gap-4">
              <span className="reveal-rail reveal-rail-left h-px w-8 bg-gradient-to-r from-transparent to-[#d6ad72]" />
              <p className="font-spaced text-[10px] uppercase tracking-[0.34em] text-[#d8c3a4]">
                Tools
              </p>
              <span className="reveal-rail reveal-rail-right h-px w-12 bg-gradient-to-r from-[#d6ad72] to-transparent" />
            </div>

            <h2 data-reveal style={{ '--d': 1 } as CSSProperties} className="max-w-lg font-display text-4xl font-normal uppercase leading-[0.94] tracking-[0.06em] text-[#f3ede3] sm:text-5xl lg:text-[3rem] xl:text-[3.5rem]">
              {DRUM_BUNDLE.title}
            </h2>

            <p data-reveal style={{ '--d': 2 } as CSSProperties} className="mt-4 font-spaced text-[10px] uppercase tracking-[0.38em] text-[#bca98e]">
              {DRUM_BUNDLE.subtitle}
            </p>

            <p data-reveal style={{ '--d': 3 } as CSSProperties} className="mt-6 max-w-md text-sm leading-relaxed text-[#d5c8b8]/78 sm:text-base">
              A cinematic drum collection built for producers who want impact, texture, and atmosphere.
            </p>

            <div data-reveal style={{ '--d': 4 } as CSSProperties} className="mt-8 grid grid-cols-3 border-y border-[#d8aa67]/25 py-5">
              <div className="pr-4">
                <iconify-icon
                  icon="solar:soundwave-linear"
                  width="24"
                  height="24"
                  className="text-[#dfc094]"
                />
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">100 Sounds</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">Curated Kit</p>
              </div>
              <div className="border-x border-[#d8aa67]/25 px-4">
                <iconify-icon
                  icon="solar:layers-minimalistic-linear"
                  width="24"
                  height="24"
                  className="text-[#dfc094]"
                />
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">32-Bit WAV</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">High Quality</p>
              </div>
              <div className="pl-4">
                <iconify-icon
                  icon="solar:infinity-linear"
                  width="24"
                  height="24"
                  className="text-[#dfc094]"
                />
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">Royalty-Free</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">Use Anywhere</p>
              </div>
            </div>

            <div data-reveal style={{ '--d': 5 } as CSSProperties} className="mt-7 flex items-baseline gap-4">
              <Price
                amount={DRUM_BUNDLE_PRICE.amount}
                className="font-display text-4xl font-normal text-[#f4ede3]"
              />
              <Price
                value={DRUM_BUNDLE_PRICE.original}
                className="text-xs tracking-widest text-[#807668]"
                strikethrough
              />
            </div>

            <div data-reveal style={{ '--d': 6 } as CSSProperties} className="mt-6 flex max-w-md flex-col gap-4">
              <Link
                href={DRUM_BUNDLE_HREF}
                className="lux-pill group inline-flex min-h-12 w-full items-center justify-between rounded-full border border-[#d8aa67]/75 bg-black/20 px-7 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f0dfc8] backdrop-blur-sm transition-all hover:border-[#f0c681] hover:bg-[#b7792a]/10 hover:shadow-[0_0_28px_rgba(211,157,83,0.18)]"
              >
                <span>Explore the kit</span>
                <iconify-icon
                  icon="solar:arrow-right-linear"
                  width="18"
                  height="18"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href={DRUM_BUNDLE_CHECKOUT_HREF}
                className="lux-link group inline-flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-[#baa990] transition-colors hover:text-[#f1dfc5]"
              >
                <span>Get the bundle</span>
                <span className="h-px w-20 bg-gradient-to-r from-[#b9925e] to-transparent transition-all group-hover:w-28" />
              </Link>
            </div>
          </div>
        </div>

        <div data-reveal style={{ '--d': 7 } as CSSProperties} className="mt-14 flex items-end justify-between border-t border-[#d8aa67]/25 pt-4 text-[8px] uppercase tracking-[0.28em] text-[#8d7b66]">
          <div>
            <p>Archive</p>
            <p className="mt-1 text-[#b89a72]">001</p>
          </div>
          <div className="text-right">
            <p>Isiata</p>
            <p className="mt-1 text-[#b89a72]">Systems</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
