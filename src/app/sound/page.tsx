'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { TypeWriter } from '@/components/ui/TypeWriter'

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
    title: 'Two Tales',
    type: 'Single',
    date: 'August 8, 2020',
    runtime: '4 minutes',
    notes: 'Early release. Introspective. Sets the emotional and thematic foundation of the catalog.',
    cover: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698569e01dfc02df0ab0d108.jpeg',
    spotify: 'https://open.spotify.com/track/27NZpNhtYUUrPa2t40jRVM?si=EYZnAQh1Rqmtn40E2OD3Xw',
    appleMusic: 'https://music.apple.com/ca/album/two-tales-single/1525969395',
  },
]

const EP = {
  title: 'THEY MIGHT BE MAD',
  type: 'EP',
  date: 'October 29, 2022',
  runtime: '18 minutes',
  trackCount: 5,
  cover: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/6733c6a0e40bddb43f5d3d0a.jpeg',
  spotify: 'https://open.spotify.com/album/76ajdmnFjm5nadqbVqRBqR?si=PB0ovGiFTrS6ll6C685HHg',
  appleMusic: 'https://music.apple.com/ca/album/they-might-be-mad-ep/1650275317',
  tracks: [
    { number: 1, title: 'THEY MIGHT BE MAD' },
    { number: 2, title: 'TELL ME WHAT YOU WANT' },
    { number: 3, title: 'GODSPEED' },
    { number: 4, title: 'SAY & IGNORANCE', featuring: 'Malone the Chemist' },
    { number: 5, title: 'WAR' },
  ],
  notes: 'Cohesive project. Themes of conflict, self-assertion, communication, and personal reckoning. More aggressive and declarative than earlier singles.',
  advisory: 'Explicit (select tracks)',
}

function DiscographyContent() {
  return (
    <div className="space-y-16">
      {/* EP */}
      <div className="border border-white/10 bg-surface-raised depth-shadow overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Album Cover */}
          <div className="aspect-square lg:aspect-auto overflow-hidden">
            <img
              src={EP.cover}
              alt={EP.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1">
                {EP.type}
              </span>
              <span className="text-xs text-zinc-600">{EP.date}</span>
              <span className="text-xs text-zinc-600">{EP.runtime}</span>
              <span className="text-xs text-red-400/80 border border-red-400/20 px-2 py-0.5">{EP.advisory}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-oswald uppercase tracking-tight text-white mb-6">
              {EP.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              {EP.notes}
            </p>

            {/* Streaming Links */}
            <div className="flex gap-3 mb-8">
              <a
                href={EP.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <iconify-icon icon="mdi:spotify" width="20" height="20" className="text-[#1DB954]" />
                <span className="text-sm text-white">Spotify</span>
              </a>
              <a
                href={EP.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <iconify-icon icon="mdi:apple" width="20" height="20" className="text-white" />
                <span className="text-sm text-white">Apple Music</span>
              </a>
            </div>

            <div className="border-t border-white/5 pt-6 mt-auto">
              <ol className="space-y-3">
                {EP.tracks.map((track) => (
                  <li key={track.number} className="flex items-baseline gap-4">
                    <span className="text-xs text-zinc-600 w-6 text-right shrink-0">{track.number}</span>
                    <span className="text-sm text-zinc-300">{track.title}</span>
                    {track.featuring && (
                      <span className="text-xs text-zinc-600">ft. {track.featuring}</span>
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
            <div key={single.title} className="group border border-white/10 bg-surface-raised depth-shadow overflow-hidden hover:border-white/20 transition-all duration-300">
              {/* Album Cover */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={single.cover}
                  alt={single.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1">
                    {single.type}
                  </span>
                  <span className="text-xs text-zinc-600">{single.runtime}</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{single.title}</h4>
                <p className="text-xs text-zinc-600 mb-4">{single.date}</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">{single.notes}</p>

                {/* Streaming Links */}
                <div className="flex gap-2">
                  <a
                    href={single.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full"
                    title="Listen on Spotify"
                  >
                    <iconify-icon icon="mdi:spotify" width="20" height="20" className="text-[#1DB954]" />
                  </a>
                  <a
                    href={single.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full"
                    title="Listen on Apple Music"
                  >
                    <iconify-icon icon="mdi:apple" width="20" height="20" className="text-white" />
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
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12">
            <TypeWriter text="The Sound" speed={100} />
          </h1>

          <div className="max-w-2xl space-y-6 text-xl text-zinc-300 leading-relaxed">
            <p>
              Atmosphere you can step into.
              <br />
              Movement that holds attention.
            </p>

            <p className="text-zinc-400">
              This is where ideas first take shape.
              <br />
              Listen closely.
            </p>
          </div>
        </Section>
      </Container>

      {/* Filter Bar */}
      <Container bordered className="py-6 border-y border-white/10">
        <div className="flex gap-4 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'text-white bg-white/5 border border-white/10'
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
