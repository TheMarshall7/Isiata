'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { AlbumCover } from '@/components/sound/AlbumCover'
import { THEY_MIGHT_BE_MAD_EP, TWO_TALES, TWO_TALES_COVER } from '@/lib/sound/releases'

const TABS = ['All', 'Discography', 'Live', 'Unreleased', 'Collaborations'] as const
type Tab = typeof TABS[number]

const SINGLES = [
  {
    title: 'Say',
    type: 'Single',
    date: 'June 10, 2023',
    runtime: '2 minutes',
    notes: 'Direct, reflective. Personal tone. Strong visual branding with portrait cover.',
    cover: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698569e0d017c38062cc20d1.jpeg',
    spotify: 'https://open.spotify.com/album/4pZ0NJano8ya4cnM73BeBQ?si=Dr7lccCVTDenlG58qLS_jw',
    appleMusic: 'https://music.apple.com/ca/album/say-single/1690948732',
  },
  {
    title: 'No Need',
    type: 'Single',
    date: 'March 31, 2023',
    runtime: '3 minutes',
    notes: 'Minimalist, emotionally resolved. Visual language ties into intimacy and clarity.',
    cover: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698569e00a7fd19237a286bd.jpeg',
    spotify: 'https://open.spotify.com/track/60YUULIajmH9etpI8lqt8G?si=DxzZFRL8RIGAei2Lt4fk2A',
    appleMusic: 'https://music.apple.com/ca/album/no-need/1678432815?i=1678432906',
  },
  {
    title: TWO_TALES.title,
    type: TWO_TALES.type,
    date: TWO_TALES.date,
    runtime: TWO_TALES.runtime,
    notes: TWO_TALES.notes,
    cover: TWO_TALES.cover,
    spotify: TWO_TALES.spotify,
    appleMusic: TWO_TALES.appleMusic,
    streams: TWO_TALES.streamsLabel,
  },
]

const EP = THEY_MIGHT_BE_MAD_EP

function DiscographyContent() {
  return (
    <div className="space-y-16">
      {/* EP */}
      <div className="overflow-hidden border border-[#d8aa67]/25 bg-[#080808]">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2">
          <AlbumCover
            src={EP.cover}
            alt={EP.displayTitle}
            padded={false}
            className="m-6 sm:m-7 md:m-8"
            goldBorderClassName="border-2 border-[#d8aa67]/70 shadow-[inset_0_0_14px_rgba(211,157,83,0.14)]"
          />

          <div className="relative flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 lg:px-14 lg:py-16">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d6ad72]" />
              <p className="font-spaced text-[10px] uppercase tracking-[0.34em] text-[#d8c3a4]">
                Sound
              </p>
              <span className="h-px w-12 bg-gradient-to-r from-[#d6ad72] to-transparent" />
            </div>

            <h3 className="max-w-lg font-display text-4xl font-normal uppercase leading-[0.94] tracking-[0.06em] text-[#f3ede3] sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
              {EP.displayTitle}
            </h3>

            <p className="mt-4 font-spaced text-[10px] uppercase tracking-[0.38em] text-[#bca98e]">
              {EP.type} · {EP.date}
            </p>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#d5c8b8]/78 sm:text-base">
              {EP.notes}
            </p>

            <div className="mt-8 grid grid-cols-3 border-y border-[#d8aa67]/25 py-5">
              <div className="pr-4">
                <iconify-icon
                  icon="solar:playlist-minimalistic-2-linear"
                  width="24"
                  height="24"
                  className="text-[#dfc094]"
                />
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#eee3d5]">
                  {EP.trackCount} Tracks
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
                  {EP.runtime.replace(' minutes', ' Min')}
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

            <div className="mt-7 flex max-w-md flex-col gap-4">
              <a
                href={EP.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 w-full items-center justify-between rounded-full border border-[#d8aa67]/75 bg-black/20 px-7 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f0dfc8] transition-all duration-300 hover:border-[#f0c681] hover:bg-[#b7792a]/10 hover:shadow-[0_0_28px_rgba(211,157,83,0.18)]"
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

              <a
                href={EP.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-[#baa990] transition-colors hover:text-[#f1dfc5]"
              >
                <span>Apple Music</span>
                <span className="h-px w-16 bg-gradient-to-r from-[#b9925e] to-transparent transition-all duration-300 group-hover:w-24" />
              </a>
            </div>

            <div className="mt-10 border-t border-[#d8aa67]/25 pt-6">
              <ol className="space-y-3">
                {EP.tracks.map((track) => (
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
      </div>

      {/* Singles */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-8">Singles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SINGLES.map((single) => (
            <div key={single.title} className="group overflow-hidden border border-[#d8aa67]/20 bg-transparent transition-all duration-300 hover:border-[#d8aa67]/65">
              {/* Album Cover */}
              <AlbumCover src={single.cover} alt={single.title} />

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="border border-[#d8aa67]/25 bg-[#d8aa67]/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#b8a890]">
                    {single.type}
                  </span>
                  <span className="text-xs text-zinc-600">{single.runtime}</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{single.title}</h4>
                <p className="text-xs text-zinc-600 mb-4">{single.date}</p>
                {'streams' in single && single.streams && (
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-400 mb-4">
                    {single.streams}
                  </p>
                )}
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">{single.notes}</p>

                {/* Streaming Links */}
                <div className="flex gap-2">
                  <a
                    href={single.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8aa67]/30 bg-black/20 transition-all duration-300 hover:border-[#d8aa67]/65 hover:bg-[#b7792a]/10"
                    title="Listen on Spotify"
                  >
                    <iconify-icon icon="mdi:spotify" width="20" height="20" className="text-[#1DB954]" />
                  </a>
                  <a
                    href={single.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8aa67]/30 bg-black/20 transition-all duration-300 hover:border-[#d8aa67]/65 hover:bg-[#b7792a]/10"
                    title="Listen on Apple Music"
                  >
                    <iconify-icon icon="mdi:apple" width="20" height="20" className="text-gold" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="text-center py-24">
      <iconify-icon
        icon="solar:music-library-2-linear"
        width="64"
        height="64"
        className="text-zinc-700 mx-auto mb-6"
      />
      <p className="text-zinc-500 text-lg">Coming Soon</p>
    </div>
  )
}

export default function SoundPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  return (
    <>
      {/* Page Header */}
      <Container bordered className="relative min-h-[100svh] flex flex-col justify-center pt-24 md:pt-28 pb-12 md:pb-16">
        <Section reveal className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-display uppercase tracking-normal leading-[0.9] text-gold mb-8">
                <TypeWriter text="The Sound" speed={100} />
              </h1>

              <div className="max-w-2xl space-y-5 text-lg md:text-xl text-gold leading-relaxed">
                <p>
                  Sonic atmosphere you can step into.
                  <br />
                  Moments that hold attention.
                </p>

                <p className="text-[#d5c8b8]">
                  Unlocking frequency, the key to the world.
                  <br />
                  Listen closely.
                </p>
              </div>
            </div>

            <AlbumCover
              src={TWO_TALES_COVER}
              alt="Two Tales"
              className="mx-auto w-full max-w-[min(100%,min(36rem,64svh))] depth-shadow lg:mx-0 lg:ml-auto"
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display uppercase tracking-normal text-gold text-lg">{TWO_TALES.title}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#d5c8b8] mt-1">{TWO_TALES.streamsLabel}</p>
                </div>
                <a
                  href={TWO_TALES.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d8aa67]/75 bg-black/20 transition-all duration-300 hover:border-[#f0c681] hover:bg-[#b7792a]/10"
                  title="Listen on Spotify"
                  aria-label="Listen to Two Tales on Spotify"
                >
                  <iconify-icon icon="mdi:spotify" width="22" height="22" className="text-[#f0dfc8]" />
                </a>
              </div>
            </AlbumCover>
          </div>
        </Section>
      </Container>

      {/* Filter Bar */}
      <Container bordered className="py-5 border-y border-[#d8aa67]/15">
        <div className="flex gap-4 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'border border-[#d8aa67]/40 bg-[#d8aa67]/10 text-[#ece3d7]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Container>

      {/* Content */}
      <Container bordered className="py-24">
        <Section reveal>
          {(activeTab === 'All' || activeTab === 'Discography') ? (
            <DiscographyContent />
          ) : (
            <ComingSoon />
          )}
        </Section>
      </Container>
    </>
  )
}
