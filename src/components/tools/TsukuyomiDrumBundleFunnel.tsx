'use client'

import { useState, useRef } from 'react'
import {
  DAW_ICONS,
  DRUM_BUNDLE,
  FEATURED_PRODUCERS,
  FeaturedProducer,
} from '@/lib/tools/drum-bundle'
import { DrumBundlePurchaseCta } from '@/components/tools/DrumBundlePurchaseCta'

const BAR_COUNT = 12
// Deterministic heights so server and client match (avoids hydration warning)
const WAVEFORM_HEIGHTS = [10, 14, 18, 20, 22, 18, 14, 16, 20, 16, 12, 10]

function AudioPreview({ name, category, url }: { name: string; category: string; url: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

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
        {WAVEFORM_HEIGHTS.map((height, i) => (
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

// Featured producers: each can have multiple songs (carousel)

function FeaturedProducerCard({ producer }: { producer: FeaturedProducer }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSong = producer.songs[currentTrackIndex]
  const hasMultipleSongs = producer.songs.length > 1

  const goToTrack = (index: number) => {
    const next = (index + producer.songs.length) % producer.songs.length
    if (audioRef.current) audioRef.current.pause()
    setCurrentTrackIndex(next)
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
  }

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
    <div className="relative rounded-lg gradient-border-tsukuyomi bg-surface-raised depth-shadow overflow-hidden">
      {/* Grunge texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0">
        {/* Producer Image - hover to darken + link to Instagram */}
        <a
          href={producer.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square md:aspect-auto block group/img overflow-hidden"
        >
          <img
            src={producer.image}
            alt={producer.name}
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
            key={currentTrackIndex}
            ref={audioRef}
            src={currentSong.url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => { setIsPlaying(false); setProgress(0) }}
          />

          {/* Producer info */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h5 className="text-xl font-bold text-white tracking-tight">{producer.name}</h5>
              <a
                href={producer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                {producer.handle}
              </a>
            </div>
          </div>

          {/* Player controls + track carousel */}
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

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 w-full mb-2">
                  <p className="text-sm text-zinc-400 truncate flex-1 min-w-0 mr-0">{currentSong.title}</p>
                  {hasMultipleSongs && (
                    <span className="flex items-center gap-2 shrink-0 ml-auto">
                      <button
                        type="button"
                        onClick={() => goToTrack(currentTrackIndex - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                        aria-label="Previous track"
                      >
                        <iconify-icon icon="solar:alt-arrow-left-linear" width="16" height="16" className="text-white" />
                      </button>
                      <span className="text-xs text-zinc-400 tabular-nums font-medium min-w-[2.5rem] text-center">
                        {currentTrackIndex + 1} / {producer.songs.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => goToTrack(currentTrackIndex + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                        aria-label="Next track"
                      >
                        <iconify-icon icon="solar:alt-arrow-right-linear" width="16" height="16" className="text-white" />
                      </button>
                    </span>
                  )}
                </div>
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
                {hasMultipleSongs && (
                  <div className="flex justify-center items-center gap-2 mt-3">
                    {producer.songs.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goToTrack(i)}
                        className={`rounded-full transition-all duration-300 ease-out ${
                          i === currentTrackIndex
                            ? 'w-6 h-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                            : 'w-2 h-2 bg-white/40 hover:bg-white/60 hover:scale-110'
                        }`}
                        aria-label={`Track ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Urban accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  )
}

function DAWCompatibility() {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Works With All Major DAWs</h4>
      <div className="flex flex-wrap justify-center gap-10 md:gap-16 py-10 md:py-12 border border-white/10 bg-surface-raised depth-shadow">
        {DAW_ICONS.map((daw) => (
          <div key={daw.name} className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
              <img src={daw.icon} alt={daw.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{daw.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TsukuyomiDrumBundleFunnel() {
  return (
    <div className="space-y-12">
      <DrumBundlePurchaseCta variant="hero" />

      {/* Featured Producers - before previews to draw more attention */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-1">Featured Producers</h4>
        <p className="text-sm text-zinc-500 mb-6">Uses Tsukuyomi Drums in Their Production</p>
        <div className="space-y-6">
          {FEATURED_PRODUCERS.map((producer) => (
            <FeaturedProducerCard key={producer.handle} producer={producer} />
          ))}
        </div>
      </div>

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

      {/* Bonus Kits - included with Tsukuyomi Drum Bundle */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">Bonus Kits Included With Purchase</h4>
        <p className="text-sm text-zinc-500 mb-6">Additional kits paired with the Tsukuyomi Drum Bundle, included at no extra cost when you purchase.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {DRUM_BUNDLE.bonusKits.map((kit) => (
            <div key={kit.name} className="group relative border border-white/5 bg-black/30 overflow-hidden transition-all duration-300">
              <span className="absolute top-2 left-2 z-10 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 bg-black/60 border border-white/10 px-2 py-1 rounded">Included</span>
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

      <DrumBundlePurchaseCta variant="footer" />
    </div>
  )
}
