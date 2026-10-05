'use client'

import { useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { AlbumCover } from '@/components/sound/AlbumCover'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { THEY_MIGHT_BE_MAD_EP } from '@/lib/sound/releases'
import { useParallax } from '@/hooks/useParallax'

export function TheyMightBeMadSection() {
  const boundsRef = useRef<HTMLDivElement>(null)
  const mediaRef = useParallax({ factor: 0.18, boundsRef })

  return (
    <Section reveal className="overflow-hidden">
      <Container bordered className="rule-draw border-t border-[#d8aa67]/15 py-24 md:py-32">
        <div ref={boundsRef} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div ref={mediaRef} className="will-change-transform">
              <AlbumCover
                src={THEY_MIGHT_BE_MAD_EP.cover}
                alt={THEY_MIGHT_BE_MAD_EP.displayTitle}
                reveal
              />
            </div>

            <div className="relative flex flex-col justify-center">
              <div data-reveal style={{ '--d': 0 } as CSSProperties} className="mb-5 flex items-center gap-4">
                <span className="reveal-rail reveal-rail-left h-px w-8 bg-gradient-to-r from-transparent to-[#d6ad72]" />
                <p className="font-spaced text-[10px] uppercase tracking-[0.34em] text-[#d8c3a4]">
                  Sound
                </p>
                <span className="reveal-rail reveal-rail-right h-px w-12 bg-gradient-to-r from-[#d6ad72] to-transparent" />
              </div>

              <h2 data-reveal style={{ '--d': 1 } as CSSProperties} className="max-w-full font-display text-3xl font-normal uppercase leading-[0.94] tracking-[0.04em] text-[#f3ede3] sm:text-5xl sm:tracking-[0.06em] lg:text-[2.75rem] xl:text-[3.25rem]">
                <TypeWriter text={THEY_MIGHT_BE_MAD_EP.displayTitle} speed={80} />
              </h2>

              <p data-reveal style={{ '--d': 2 } as CSSProperties} className="mt-4 font-spaced text-[10px] uppercase tracking-[0.38em] text-[#bca98e]">
                {THEY_MIGHT_BE_MAD_EP.type} · {THEY_MIGHT_BE_MAD_EP.date}
              </p>

              <p data-reveal style={{ '--d': 3 } as CSSProperties} className="mt-6 max-w-md text-sm leading-relaxed text-[#d5c8b8]/78 sm:text-base">
                {THEY_MIGHT_BE_MAD_EP.notes}
              </p>

              <div data-reveal style={{ '--d': 4 } as CSSProperties} className="mt-8 grid grid-cols-3 border-y border-[#d8aa67]/25 py-5">
                <div className="pr-4">
                  <iconify-icon
                    icon="solar:playlist-minimalistic-2-linear"
                    width="24"
                    height="24"
                    className="text-[#dfc094]"
                  />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">
                    {THEY_MIGHT_BE_MAD_EP.trackCount} Tracks
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">Full EP</p>
                </div>
                <div className="border-x border-[#d8aa67]/25 px-4">
                  <iconify-icon
                    icon="solar:clock-circle-linear"
                    width="24"
                    height="24"
                    className="text-[#dfc094]"
                  />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">
                    {THEY_MIGHT_BE_MAD_EP.runtime.replace(' minutes', ' Min')}
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">Runtime</p>
                </div>
                <div className="pl-4">
                  <iconify-icon
                    icon="solar:danger-triangle-linear"
                    width="24"
                    height="24"
                    className="text-[#dfc094]"
                  />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">Explicit</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#9f907d]">
                    Select Tracks
                  </p>
                </div>
              </div>

              <div data-reveal style={{ '--d': 5 } as CSSProperties} className="mt-7 flex max-w-md flex-col gap-4">
                <a
                  href={THEY_MIGHT_BE_MAD_EP.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-pill group inline-flex min-h-12 w-full items-center justify-between rounded-full border border-[#d8aa67]/75 bg-black/20 px-7 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f0dfc8] transition-all hover:border-[#f0c681] hover:bg-[#b7792a]/10 hover:shadow-[0_0_28px_rgba(211,157,83,0.18)]"
                >
                  <span className="inline-flex items-center gap-3">
                    <iconify-icon icon="mdi:spotify" width="18" height="18" />
                    Listen on Spotify
                  </span>
                  <iconify-icon
                    icon="solar:arrow-right-linear"
                    width="18"
                    height="18"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  <a
                    href={THEY_MIGHT_BE_MAD_EP.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lux-link group inline-flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-[#baa990] transition-colors hover:text-[#f1dfc5]"
                  >
                    <span>Apple Music</span>
                    <span className="h-px w-16 bg-gradient-to-r from-[#b9925e] to-transparent transition-all group-hover:w-24" />
                  </a>
                  <Link
                    href={THEY_MIGHT_BE_MAD_EP.soundHref}
                    className="lux-link group inline-flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-[#baa990] transition-colors hover:text-[#f1dfc5]"
                  >
                    <span>Full discography</span>
                    <span className="h-px w-16 bg-gradient-to-r from-[#b9925e] to-transparent transition-all group-hover:w-24" />
                  </Link>
                </div>
              </div>

              <div data-reveal style={{ '--d': 6 } as CSSProperties} className="mt-10 border-t border-[#d8aa67]/25 pt-6">
                <ol className="space-y-3">
                  {THEY_MIGHT_BE_MAD_EP.tracks.map((track) => (
                    <li
                      key={track.number}
                      className="flex items-baseline gap-4 text-[11px] uppercase tracking-[0.14em] text-[#c8b9a5]"
                    >
                      <span className="w-4 shrink-0 tabular-nums text-[#8d7b66]">
                        {String(track.number).padStart(2, '0')}
                      </span>
                      <span className="text-[#eee3d5]">{track.title}</span>
                      {'featuring' in track && track.featuring && (
                        <span className="normal-case tracking-normal text-[#8d7b66]">
                          feat. {track.featuring}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
        </div>
      </Container>
    </Section>
  )
}
