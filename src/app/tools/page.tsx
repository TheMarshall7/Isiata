'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ProducerToolbox } from '@/components/tools/ProducerToolbox'

const TABS = ['All', 'Sample Packs', 'Plugins', 'Presets'] as const
type Tab = typeof TABS[number]

const DRUM_BUNDLE = {
  title: 'Tsukuyomi Drum Bundle',
  subtitle: 'Premium Archive',
  image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67b7ebca7c922f63503b66c7.png',
  description: 'A premium drum sample pack focused on high-quality, impactful drum sounds — designed for use in major DAWs (FL Studio, Ableton, Logic Pro, etc.).',
  format: 'High-quality 32-bit WAV files',
  sounds: [
    { name: 'Kicks', count: 20 },
    { name: '808s', count: 16 },
    { name: 'Snares', count: 16 },
    { name: 'Snaps', count: 16 },
    { name: 'Rims', count: 16 },
    { name: 'Claps', count: 16 },
    { name: 'Percs', count: 27 },
    { name: 'Chimes', count: 10 },
    { name: 'Tambourines', count: 8 },
    { name: 'Risers', count: 11 },
    { name: 'Shakers', count: 10 },
    { name: 'Open Hats', count: 16 },
    { name: 'Closed Hats', count: 16 },
    { name: 'Hand Claps', count: 10 },
    { name: 'Gongs', count: 9 },
    { name: 'Reverse Cymbals', count: 8 },
    { name: 'Cymbals', count: 19 },
    { name: 'Tape Drum Fills', count: 18 },
    { name: 'Stomps & Impacts', count: 16 },
  ],
  bonusKits: ['Thrashed', 'Reel', 'Pandiero', 'Alt', 'Brush'],
  bonusDescriptions: {
    Thrashed: 'Raw, gritty drum textures',
    Reel: 'Vintage analog-style electronic drums',
    Pandiero: 'Light, rhythmic percussion',
    Alt: 'Darker, unconventional tones',
    Brush: 'Soft, brushed drum sounds',
  } as Record<string, string>,
  style: [
    'Rich harmonic character',
    'Punch and clarity',
    'Low-end depth without muddiness',
    'Articulate highs with presence',
    'Tight dynamics',
    'Subtle vintage warmth',
  ],
}

function SamplePackContent() {
  return (
    <div className="space-y-12">
      {/* Hero Card */}
      <div className="border border-white/10 bg-surface-raised depth-shadow hover-glow overflow-hidden transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square lg:aspect-auto overflow-hidden">
            <img
              src={DRUM_BUNDLE.image}
              alt={DRUM_BUNDLE.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1 w-fit mb-6">
              Sample Pack
            </span>
            <h3 className="text-2xl md:text-3xl font-oswald uppercase tracking-tight text-white mb-2">
              {DRUM_BUNDLE.title}
            </h3>
            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-6">{DRUM_BUNDLE.subtitle}</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              {DRUM_BUNDLE.description}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-zinc-500 mb-8">
              <span className="border border-white/10 px-3 py-1">{DRUM_BUNDLE.format}</span>
              <span className="border border-white/10 px-3 py-1">Royalty-Free</span>
              <span className="border border-white/10 px-3 py-1">100+ Sounds</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-semibold text-white">$67</span>
              <span className="text-sm text-zinc-600 line-through">$150</span>
            </div>
            <Link
              href="/tools/checkout"
              className="inline-flex items-center justify-center bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors w-fit"
            >
              Get It Now
            </Link>
          </div>
        </div>
      </div>

      {/* Sound Grid */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Included Sounds</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {DRUM_BUNDLE.sounds.map((sound) => (
            <div key={sound.name} className="border border-white/5 bg-black/40 px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-zinc-300">{sound.name}</span>
              <span className="text-xs text-zinc-600 ml-2">{sound.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bonus Kits */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Bonus Kits</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DRUM_BUNDLE.bonusKits.map((kit) => (
            <div key={kit} className="border border-white/10 bg-surface-raised depth-shadow p-5">
              <h5 className="text-sm font-semibold text-white mb-1">{kit}</h5>
              <p className="text-xs text-zinc-500">{DRUM_BUNDLE.bonusDescriptions[kit]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Style & Processing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-white/10 bg-surface-raised depth-shadow p-8">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Style & Intent</h4>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            Designed to elevate production across modern genres with hard-hitting low end, crisp transient detail, and textured percussive elements.
          </p>
          <ul className="space-y-2">
            {DRUM_BUNDLE.style.map((item) => (
              <li key={item} className="text-sm text-zinc-500 flex items-center gap-2">
                <span className="w-1 h-1 bg-zinc-600 rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="border border-white/10 bg-surface-raised depth-shadow p-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Licensing</h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              All sounds are royalty-free, except the melody layers.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              Melody layers are royalty-free for up to 1,000,000 streams or until a major placement is secured.
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              You cannot resell the sounds as standalone products, but you can use them in commercial compositions.
            </p>
          </div>

          <div className="border border-white/10 bg-surface-raised depth-shadow p-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Compatibility</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Works with all major digital audio workstations and sample systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="text-center py-24">
      <iconify-icon
        icon="solar:diskette-linear"
        width="64"
        height="64"
        className="text-zinc-700 mx-auto mb-6"
      />
      <p className="text-zinc-500 text-lg">Coming Soon</p>
    </div>
  )
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const [toolboxOpen, setToolboxOpen] = useState(false)

  return (
    <>
      {/* Producer Toolbox Modal */}
      <ProducerToolbox isOpen={toolboxOpen} onClose={() => setToolboxOpen(false)} />

      {/* Page Header */}
      <Container bordered className="pt-56 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12">
            The Tools
          </h1>

          <div className="max-w-2xl space-y-6 text-xl text-zinc-300 leading-relaxed">
            <p>
              Some tools are created out of necessity.
            </p>

            <p>
              Designed to support the work when nothing else felt right.
              <br />
              Used in real conditions. Kept only if they proved essential.
            </p>

            <p className="text-zinc-400">
              Available in small batches.
              <br />
              Quiet by design.
            </p>
          </div>
        </Section>
      </Container>

      {/* Producer Toolbox Card */}
      <Container bordered className="py-8 border-t border-white/10">
        <Section reveal>
          <button
            onClick={() => setToolboxOpen(true)}
            className="flashlight-card hover-glow w-full border border-white/10 bg-surface-raised depth-shadow p-8 md:p-10 flex items-center justify-between gap-6 group text-left hover:border-white/20 transition-all duration-500"
          >
            <div className="flex items-center gap-6">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-white/10 rounded bg-white/5">
                <iconify-icon icon="solar:tuning-2-linear" width="24" height="24" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Producer Toolbox</h3>
                <p className="text-sm text-zinc-500">BPM control, key & scale finder, delay calculator, reverb times, unit converter</p>
              </div>
            </div>
            <iconify-icon
              icon="solar:arrow-right-linear"
              width="20"
              height="20"
              className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0"
            />
          </button>
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
          {(activeTab === 'All' || activeTab === 'Sample Packs') ? (
            <SamplePackContent />
          ) : (
            <ComingSoon />
          )}
        </Section>
      </Container>
    </>
  )
}
