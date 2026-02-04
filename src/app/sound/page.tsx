'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const TABS = ['All', 'Discography', 'Live', 'Unreleased', 'Collaborations'] as const
type Tab = typeof TABS[number]

const SINGLES = [
  {
    title: 'Say',
    type: 'Single',
    date: 'June 10, 2023',
    runtime: '2 minutes',
    notes: 'Direct, reflective. Personal tone. Strong visual branding with portrait cover.',
  },
  {
    title: 'No Need',
    type: 'Single',
    date: 'March 31, 2023',
    runtime: '3 minutes',
    notes: 'Minimalist, emotionally resolved. Visual language ties into intimacy and clarity.',
  },
  {
    title: 'Two Tales',
    type: 'Single',
    date: 'August 8, 2020',
    runtime: '4 minutes',
    notes: 'Early release. Introspective. Sets the emotional and thematic foundation of the catalog.',
  },
]

const EP = {
  title: 'THEY MIGHT BE MAD',
  type: 'EP',
  date: 'October 29, 2022',
  runtime: '18 minutes',
  trackCount: 5,
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
      <div className="border border-white/10 bg-black/40 p-8 md:p-12">
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
        <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-2xl">
          {EP.notes}
        </p>
        <div className="border-t border-white/5 pt-6">
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

      {/* Singles */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-8">Singles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SINGLES.map((single) => (
            <div key={single.title} className="border border-white/10 bg-black/40 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1">
                  {single.type}
                </span>
                <span className="text-xs text-zinc-600">{single.runtime}</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{single.title}</h4>
              <p className="text-xs text-zinc-600 mb-4">{single.date}</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{single.notes}</p>
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
            The Sound
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
