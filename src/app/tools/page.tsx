'use client'

import { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { TypeWriter } from '@/components/ui/TypeWriter'

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
  bonusKits: [
    { name: 'Thrashed', desc: 'Raw, gritty drum textures', image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e5f4312d640e48f679.png' },
    { name: 'Reel', desc: 'Vintage analog-style electronic drums', image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e5e519edfcf731e4bd.png' },
    { name: 'Pandiero', desc: 'Light, rhythmic percussion', image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e51870f4826b4ff353.png' },
    { name: 'Alt', desc: 'Darker, unconventional tones', image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e57cb4a87478b50ef9.png' },
    { name: 'Brush', desc: 'Soft, brushed drum sounds', image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e5903b502ee60a3a44.png' },
  ],
  style: [
    'Rich harmonic character',
    'Punch and clarity',
    'Low-end depth without muddiness',
    'Articulate highs with presence',
    'Tight dynamics',
    'Subtle vintage warmth',
  ],
  // One-shot previews
  oneShots: [
    { name: 'Kick 6', category: 'Kicks', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d5734233ae11.mpeg' },
    { name: 'Kick 9', category: 'Kicks', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d7a11863bbd75ec70.mpeg' },
    { name: '808 2', category: '808s', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d7a1186331a75ec6f.mpeg' },
    { name: '808 6', category: '808s', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d1b97ac0e15ffe804.mpeg' },
    { name: 'Snare 12', category: 'Snares', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d5ff0133ae13.mpeg' },
    { name: 'Snare 16', category: 'Snares', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d543c233ae10.mpeg' },
    { name: 'Claps 1', category: 'Claps', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d1b97ac5398ffe803.mpeg' },
    { name: 'Claps 8', category: 'Claps', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d1b97acaf05ffe802.mpeg' },
    { name: 'Gong 2', category: 'Gongs', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d7a1186524b75ec71.mpeg' },
    { name: 'Gong 6', category: 'Gongs', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d5725e33ae15.mpeg' },
    { name: 'Tape Drums 3', category: 'Tape Drum Fills', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d58f6f33ae12.mpeg' },
    { name: 'Tape Drums 10', category: 'Tape Drum Fills', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d51d9733ae14.mpeg' },
  ],
  // Instrumental examples made with the kit
  instrumentals: [
    { name: 'Nivea', category: 'Instrumental', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67b8d06df4c684b395b0b7f3.mpeg' },
    { name: 'Drowning Angels', category: '808 Mafia Style', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d602ff5106d5a20a33b2de.mpeg' },
    { name: 'Samba X RnB', category: 'Fusion', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d602ee5106d5417b33b2d4.mpeg' },
    { name: 'Latin X Hip Hop', category: 'Fusion', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d602fd5106d51e6033b2dd.mpeg' },
  ],
}

const BAR_COUNT = 12

function AudioPreview({ name, category, url }: { name: string; category: string; url: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Generate stable random heights once per component instance
  const barHeights = useMemo(
    () => Array.from({ length: BAR_COUNT }, () => Math.random() * 16 + 8),
    []
  )

  const togglePlay = () => {
    if (!url) return
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(progressPercent)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
  }

  return (
    <div className="group relative border border-white/10 bg-surface-raised hover:bg-surface-overlay hover:border-white/20 transition-all duration-300 p-4 flex items-center gap-4">
      {url && <audio ref={audioRef} src={url} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />}

      {/* Play button */}
      <button
        onClick={togglePlay}
        disabled={!url}
        className={`relative w-10 h-10 flex items-center justify-center border rounded-full transition-all duration-300 ${
          url
            ? 'border-white/20 hover:border-white/40 hover:bg-white/5'
            : 'border-white/10 opacity-40 cursor-not-allowed'
        }`}
      >
        <iconify-icon
          icon={isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}
          width="16"
          height="16"
          className="text-white"
        />
        {/* Progress ring */}
        {isPlaying && (
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeDasharray={`${progress * 1.13} 113`}
              className="transition-all duration-100"
            />
          </svg>
        )}
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{name}</p>
        <p className="text-xs text-zinc-500">{category}</p>
      </div>

      {/* Waveform placeholder */}
      <div className="hidden sm:flex items-center gap-[2px] h-6">
        {barHeights.map((height, i) => (
          <div
            key={i}
            className={`w-[3px] rounded-full transition-all duration-300 ${
              isPlaying && progress > (i / BAR_COUNT) * 100
                ? 'bg-white/60'
                : 'bg-white/20'
            }`}
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      {!url && (
        <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Preview Soon</span>
      )}
    </div>
  )
}

// Featured producer data
const FEATURED_PRODUCER = {
  name: 'J-Milly',
  handle: '@jmillyfr',
  instagram: 'https://www.instagram.com/jmillyfr?igsh=MWwxZHd5aDFocWo5cQ==',
  image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/69863cbc5f9399ca749611c3.jpeg',
  trackUrl: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698641603fae0ad2e4385336.mp3',
  trackTitle: 'Produced with Tsukuyomi Drums',
}

// DAW compatibility icons
const DAW_ICONS = [
  { name: 'FL Studio', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59dd775cd617e4ec240.png' },
  { name: 'Ableton', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59c0e32026d6395a96f.png' },
  { name: 'Pro Tools', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59c0e320217c795a96e.png' },
  { name: 'Logic Pro', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59c0e32023a8f95a970.png' },
  { name: 'Cubase', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59cd775cd7f0d4ec23f.png' },
]

function FeaturedProducer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newProgress = (clickX / rect.width) * 100
      const newTime = (newProgress / 100) * audioRef.current.duration
      audioRef.current.currentTime = newTime
      setProgress(newProgress)
    }
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Featured Producer</h4>
      <div className="relative border border-white/10 bg-surface-raised depth-shadow overflow-hidden">
        {/* Grunge texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0">
          {/* Producer Image - hover to darken + link to Instagram */}
          <a
            href={FEATURED_PRODUCER.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square md:aspect-auto block group/img overflow-hidden"
          >
            <img
              src={FEATURED_PRODUCER.image}
              alt={FEATURED_PRODUCER.name}
              className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/50 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-center px-4">
                Go to Instagram profile
              </span>
            </div>
          </a>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-center relative">
            <audio
              ref={audioRef}
              src={FEATURED_PRODUCER.trackUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => { setIsPlaying(false); setProgress(0) }}
            />

            {/* Producer info */}
            <div className="flex items-center gap-4 mb-6">
              <div>
                <h5 className="text-xl font-bold text-white tracking-tight">{FEATURED_PRODUCER.name}</h5>
                <a
                  href={FEATURED_PRODUCER.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  {FEATURED_PRODUCER.handle}
                </a>
              </div>
            </div>

            {/* Player controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-full hover:bg-zinc-200 transition-colors shrink-0"
                >
                  <iconify-icon
                    icon={isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}
                    width="24"
                    height="24"
                  />
                </button>

                <div className="flex-1">
                  <p className="text-sm text-zinc-400 mb-2">{FEATURED_PRODUCER.trackTitle}</p>
                  {/* Progress bar */}
                  <div
                    className="h-2 bg-white/10 rounded-full cursor-pointer group"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-white rounded-full relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Urban accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DAWCompatibility() {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Works With All Major DAWs</h4>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-8 border border-white/10 bg-surface-raised depth-shadow">
        {DAW_ICONS.map((daw) => (
          <div key={daw.name} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
              <img src={daw.icon} alt={daw.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{daw.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
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
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-semibold text-white">$77</span>
              <span className="text-sm text-zinc-600 line-through">$150</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <iconify-icon icon="solar:calendar-mark-linear" width="16" height="16" className="text-zinc-500" />
              <span className="text-sm text-zinc-400">Available February 28</span>
            </div>
            <button
              disabled
              className="inline-flex items-center justify-center bg-zinc-800 text-zinc-500 px-8 py-3 rounded-full text-sm font-semibold cursor-not-allowed w-fit"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Featured Producer - before previews to draw more attention */}
      <FeaturedProducer />

      {/* Audio Previews - One Shots */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">One-Shot Previews</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DRUM_BUNDLE.oneShots.map((preview) => (
            <AudioPreview key={preview.name} {...preview} />
          ))}
        </div>
      </div>

      {/* Audio Previews - Instrumentals */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Instrumentals Made With This Kit</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DRUM_BUNDLE.instrumentals.map((preview) => (
            <AudioPreview key={preview.name} {...preview} />
          ))}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {DRUM_BUNDLE.bonusKits.map((kit) => (
            <div key={kit.name} className="group border border-white/10 bg-surface-raised depth-shadow overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="aspect-square overflow-hidden bg-black/50">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h5 className="text-sm font-semibold text-white mb-1">{kit.name}</h5>
                <p className="text-xs text-zinc-500">{kit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DAW Compatibility */}
      <DAWCompatibility />

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

  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-56 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12">
            <TypeWriter text="The Tools" speed={100} />
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
          <Link
            href="/tools/toolbox"
            className="flashlight-card hover-glow w-full border border-white/10 bg-surface-raised depth-shadow p-8 md:p-10 flex items-center justify-between gap-6 group hover:border-white/20 transition-all duration-500"
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
          </Link>
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
