'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  DAW_ICONS,
  DRUM_BUNDLE,
  FEATURED_PRODUCERS,
  FeaturedProducer,
  LIVE_KIT,
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
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          url
            ? 'bg-[#d8aa67] text-black hover:bg-[#f0c681]'
            : 'border border-[#d8aa67]/20 bg-[#d8aa67]/10 text-[#d8aa67]/40 opacity-40 cursor-not-allowed'
        }`}
      >
        <iconify-icon
          icon={isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}
          width="16"
          height="16"
          className="relative z-10"
        />
        {/* Progress ring */}
        {isPlaying && (
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(216,170,103,0.25)"
              strokeWidth="2"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(247,230,192,0.95)"
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
                ? 'bg-[#d8aa67]'
                : 'bg-[#d8aa67]/25'
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
  const profileUrl = producer.links ?? producer.instagram
  const profileCta = producer.links ? 'All links' : 'Go to Instagram profile'

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
        {/* Producer Image - hover links to socials */}
        <div className="relative aspect-square md:aspect-auto md:min-h-[200px] group/img overflow-hidden bg-black/60">
          {producer.image ? (
            <img
              src={producer.image}
              alt={producer.name}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500 pointer-events-none"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center border-r border-white/5 pointer-events-none">
              <p className="font-display uppercase tracking-normal text-gold text-2xl leading-none">
                {producer.name}
              </p>
              <p className="text-xs text-zinc-500">{producer.handle}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {producer.tiktok && producer.instagram ? (
            <div className="absolute inset-0 flex flex-col opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
              <a
                href={producer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-black/55 hover:bg-black/70 border-b border-white/15 transition-colors"
              >
                <iconify-icon icon="mdi:instagram" width="18" height="18" className="text-gold" />
                <span className="text-white text-sm font-medium">Instagram</span>
              </a>
              <a
                href={producer.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-black/55 hover:bg-black/70 transition-colors"
              >
                <iconify-icon icon="ic:baseline-tiktok" width="18" height="18" className="text-gold" />
                <span className="text-white text-sm font-medium">TikTok</span>
              </a>
            </div>
          ) : profileUrl ? (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black/0 group-hover/img:bg-black/50 transition-colors duration-300 flex items-center justify-center"
            >
              <span className="text-white text-sm font-medium opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-center px-4">
                {profileCta}
              </span>
            </a>
          ) : null}
        </div>

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
              {profileUrl ? (
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  {producer.handle}
                </a>
              ) : (
                <p className="text-sm text-zinc-500">{producer.handle}</p>
              )}
            </div>
          </div>

          {/* Player controls + track carousel */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-14 h-14 flex shrink-0 items-center justify-center rounded-full bg-[#d8aa67] text-black transition-colors hover:bg-[#f0c681]"
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
                    <span className="ml-auto flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => goToTrack(currentTrackIndex - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8aa67]/35 bg-[#d8aa67]/[0.06] transition-all duration-200 hover:border-[#d8aa67]/70 hover:bg-[#d8aa67]/15"
                        aria-label="Previous track"
                      >
                        <iconify-icon icon="solar:alt-arrow-left-linear" width="16" height="16" className="text-[#d8aa67]" />
                      </button>
                      <span className="min-w-[2.5rem] text-center text-xs font-medium tabular-nums text-[#d8aa67]/80">
                        {currentTrackIndex + 1} / {producer.songs.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => goToTrack(currentTrackIndex + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8aa67]/35 bg-[#d8aa67]/[0.06] transition-all duration-200 hover:border-[#d8aa67]/70 hover:bg-[#d8aa67]/15"
                        aria-label="Next track"
                      >
                        <iconify-icon icon="solar:alt-arrow-right-linear" width="16" height="16" className="text-[#d8aa67]" />
                      </button>
                    </span>
                  )}
                </div>
                {/* Progress bar — gold ink stroke toward the tip */}
                <div className="progress-ink-track group" onClick={handleSeek}>
                  <div
                    className="progress-ink-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs tabular-nums text-[#d8aa67]/70">
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
                            ? 'h-2 w-6 bg-[#d8aa67] shadow-[0_0_10px_rgba(216,170,103,0.55)]'
                            : 'h-2 w-2 bg-[#d8aa67]/35 hover:scale-110 hover:bg-[#d8aa67]/65'
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

const FL_STUDIO_LOGO = DAW_ICONS.find((daw) => daw.name === 'FL Studio')?.icon ?? ''

function FlStudioTemplates() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (!lightbox) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightbox])

  return (
    <div className="relative overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.05] via-surface-raised/90 to-black/40 depth-shadow-lg p-6 md:p-8">
      <div className="glow-orb -top-16 left-8 w-64 h-64 bg-orange-500/15" aria-hidden />
      <div className="glow-orb -bottom-20 right-0 w-72 h-72 bg-amber-200/5" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        {FL_STUDIO_LOGO && (
          <div className="relative shrink-0 w-14 h-14">
            <div className="absolute inset-0 rounded-full bg-orange-500/25 blur-md animate-pulse-glow" aria-hidden />
            <div className="relative w-full h-full rounded-full border border-orange-400/25 bg-black/50 flex items-center justify-center">
              <img src={FL_STUDIO_LOGO} alt="FL Studio" className="w-8 h-8 object-contain" />
            </div>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">
            FL Studio Templates
          </h4>
          <p className="text-sm text-zinc-400">
            I&apos;m adding two FL Studio templates to the bundle, included with purchase.
          </p>
        </div>
        <span className="self-start sm:self-center text-[10px] font-semibold uppercase tracking-widest text-amber-100/90 bg-orange-500/10 border border-orange-400/25 px-3 py-1.5 rounded-full">
          Included
        </span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
        {DRUM_BUNDLE.flStudioTemplates.map((template, index) => (
          <div
            key={template.name}
            className="template-card-frame group flashlight-card"
            onMouseMove={(e) => {
              const el = e.currentTarget
              const rect = el.getBoundingClientRect()
              el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
              el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
            }}
          >
            <div className="template-card-inner">
              <span className="absolute top-3 left-3 z-20 text-[10px] font-semibold uppercase tracking-wider text-amber-50/90 bg-black/70 border border-orange-400/20 px-2 py-1 rounded pointer-events-none">
                {index === 0 ? 'Template 01' : 'Template 02'}
              </span>
              <div className="aspect-[16/10] overflow-hidden bg-black/60">
                {template.image ? (
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: template.image!, alt: template.name })}
                    className="cta-sheen relative block w-full h-full cursor-zoom-in"
                    aria-label={`View ${template.name} full screen`}
                  >
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                    <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/90 bg-black/70 border border-white/15 px-2.5 py-1 rounded opacity-70 group-hover:opacity-100 transition-opacity">
                      <iconify-icon icon="solar:full-screen-linear" width="12" height="12" />
                      Expand
                    </span>
                  </button>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-600">
                    <iconify-icon icon="solar:soundwave-linear" width="32" height="32" />
                    <span className="text-[10px] uppercase tracking-widest">Preview coming</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{template.format}</p>
                <h5 className="text-lg font-display uppercase tracking-normal gradient-text mb-3">{template.name}</h5>
                <p className={`text-sm text-zinc-400 leading-relaxed${template.highlights.length ? ' mb-4' : ''}`}>
                  {template.desc}
                </p>
                {template.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {template.highlights.map((item) => (
                      <li key={item} className="text-sm text-zinc-500 flex items-start gap-2">
                        <span className="w-1 h-1 bg-orange-400/60 rounded-full shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/25 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center p-4 md:p-10 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/92 backdrop-blur-sm"
              onClick={() => setLightbox(null)}
              aria-label="Close full screen preview"
            />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 z-10 text-zinc-400 hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              <iconify-icon icon="solar:close-circle-linear" width="28" height="28" />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="lightbox-image relative z-10 max-w-full max-h-[85vh] object-contain depth-shadow-xl rounded-sm"
            />
            <p className="relative z-10 mt-4 text-xs uppercase tracking-widest text-zinc-500">{lightbox.alt}</p>
          </div>,
          document.body
        )}
    </div>
  )
}

function LiveKit() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 bg-gradient-to-b from-[#d8aa67]/[0.08] via-black/40 to-transparent p-8 depth-shadow md:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-56 w-56 rounded-full bg-[#d8aa67]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8aa67]/55 to-transparent"
      />

      <div className="relative mb-6 flex flex-wrap items-center gap-3">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8aa67]/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d8aa67]" />
        </span>
        <p className="font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8c3a4]">Live Kit</p>
        <span className="rounded-full border border-[#d8aa67]/40 bg-[#d8aa67]/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#f0dfc8]">
          Currently {LIVE_KIT.version}
        </span>
      </div>

      <h4 className="relative mb-4 font-display text-3xl font-normal uppercase tracking-normal text-[#f3ede3] md:text-4xl">
        {LIVE_KIT.title}
      </h4>
      <div className="relative mb-7 flex w-full max-w-[10rem] items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-[#d8aa67]/70 to-transparent" />
        <span className="h-1 w-1 rotate-45 bg-[#d8aa67]/80" />
      </div>
      <p className="relative mb-10 max-w-2xl text-base font-light leading-[1.8] text-[#d5c8b8]/85">
        {LIVE_KIT.lede}
      </p>
      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
        {LIVE_KIT.points.map((point, index) => (
          <div key={point.label}>
            <p className="mb-3 font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8aa67]/65">
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="mb-2 font-display text-lg font-normal uppercase tracking-normal text-[#f0dfc8]">
              {point.label}
            </p>
            <p className="text-sm font-light leading-relaxed text-[#b8a890]/85">{point.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StarterSamples() {
  const featured = DRUM_BUNDLE.starterSamples.items.find((sample) => sample.url) ?? DRUM_BUNDLE.starterSamples.items[0]
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (!featured.url || !audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    if (!time || Number.isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nextTime = ((e.clientX - rect.left) / rect.width) * audioRef.current.duration
    audioRef.current.currentTime = nextTime
  }

  return (
    <div className="relative overflow-hidden rounded-lg gradient-border-blood bg-gradient-to-br from-[#7f1d1d]/20 via-surface-raised/90 to-black/50 depth-shadow-lg p-6 md:p-8">
      <div className="glow-orb -top-16 left-8 w-64 h-64 bg-orange-700/25" aria-hidden />
      <div className="glow-orb -bottom-24 right-0 w-80 h-80 bg-red-800/15" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="relative shrink-0 w-14 h-14">
          <div className="absolute inset-0 rounded-full bg-orange-700/40 blur-md animate-pulse-glow" aria-hidden />
          <div className="relative w-full h-full rounded-full border border-orange-600/30 bg-black/50 flex items-center justify-center text-orange-200">
            <iconify-icon icon="solar:soundwave-linear" width="26" height="26" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-200/60 mb-1">
            {String(DRUM_BUNDLE.starterSamples.count).padStart(2, '0')} Samples
          </p>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
            {DRUM_BUNDLE.starterSamples.title}
          </h4>
          <p className="text-sm text-zinc-400 mt-1">{DRUM_BUNDLE.starterSamples.lede}</p>
        </div>
        <span className="self-start sm:self-center text-[10px] font-semibold uppercase tracking-widest text-orange-100/90 bg-orange-700/20 border border-orange-500/30 px-3 py-1.5 rounded-full">
          Included
        </span>
      </div>

      <div
        className="relative sample-card-frame group flashlight-card mb-6"
        onMouseMove={(e) => {
          const el = e.currentTarget
          const rect = el.getBoundingClientRect()
          el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
          el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
        }}
      >
        <div className="sample-card-inner p-6 md:p-8">
          {featured.url && (
            <audio
              ref={audioRef}
              src={featured.url}
              onTimeUpdate={() => {
                if (!audioRef.current) return
                setCurrentTime(audioRef.current.currentTime)
                const d = audioRef.current.duration
                setProgress(d ? (audioRef.current.currentTime / d) * 100 : 0)
              }}
              onLoadedMetadata={() => {
                if (audioRef.current) setDuration(audioRef.current.duration)
              }}
              onEnded={() => {
                setIsPlaying(false)
                setProgress(0)
              }}
            />
          )}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={togglePlay}
              disabled={!featured.url}
              className={`relative w-14 h-14 flex items-center justify-center rounded-full shrink-0 transition-colors disabled:opacity-40 ${
                isPlaying
                  ? 'bg-orange-600 text-white hover:bg-orange-500'
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
              aria-label={isPlaying ? `Pause ${featured.name}` : `Play ${featured.name}`}
            >
              {isPlaying && (
                <span className="absolute inset-0 rounded-full bg-orange-500/40 animate-ping" aria-hidden />
              )}
              <iconify-icon
                icon={isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}
                width="24"
                height="24"
                className="relative z-10"
              />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-display uppercase tracking-normal gradient-text">{featured.name}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-orange-200/50 mt-1 mb-3">
                {featured.bpm} BPM · {featured.key}
              </p>
              <div className="h-1.5 bg-white/10 rounded-full cursor-pointer group/seek" onClick={handleSeek}>
                <div
                  className="h-full rounded-full relative bg-gradient-to-r from-red-800 via-orange-600 to-orange-400"
                  style={{ width: `${progress || 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-orange-200 rounded-full opacity-0 group-hover/seek:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1.5 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-[3px] h-8 shrink-0">
              {WAVEFORM_HEIGHTS.map((height, i) => (
                <div
                  key={i}
                  className={`w-[3px] rounded-full transition-all duration-300 ${
                    isPlaying && progress > (i / BAR_COUNT) * 100
                      ? 'bg-orange-400'
                      : 'bg-white/15'
                  }`}
                  style={{ height: `${height + 6}px` }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent" />
        </div>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DRUM_BUNDLE.starterSamples.items.map((sample) => {
          const isActive = sample.name === featured.name
          return (
            <div
              key={sample.name}
              className={`transition-all duration-300 ${
                isActive
                  ? 'sample-card-frame'
                  : 'border border-white/[0.06] bg-black/30 hover:border-orange-700/40 px-4 py-4'
              }`}
            >
              <div className={isActive ? 'sample-card-inner px-4 py-4' : ''}>
                <p className="text-[10px] uppercase tracking-widest text-orange-200/50 mb-1">
                  {sample.url ? 'Preview' : 'Included'}
                </p>
                <p className="text-sm font-display uppercase tracking-normal text-gold mb-1">{sample.name}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  {sample.bpm} BPM · {sample.key}
                </p>
              </div>
            </div>
          )
        })}
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
      <p className="mt-3 text-[10px] text-zinc-600 tracking-wide">
        FL Studio templates only work with FL Studio.
      </p>
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
        <p className="text-sm text-zinc-500 mb-6">
          Additional kits paired with the Tsukuyomi Drum Bundle, included at no extra cost when you purchase — plus extra uncut kits.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {DRUM_BUNDLE.bonusKits.map((kit) => (
            <div key={kit.name} className="group relative border border-white/5 bg-black/30 overflow-hidden transition-all duration-300">
              <span className="absolute top-2 left-2 z-10 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 bg-black/60 border border-white/10 px-2 py-1 rounded">
                {kit.image ? 'Included' : 'Extra'}
              </span>
              <div className="aspect-square overflow-hidden bg-black/50">
                {kit.image ? (
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-white/[0.04] to-transparent">
                    <span className="font-display text-2xl uppercase tracking-normal text-white/80 group-hover:text-white transition-colors">
                      {kit.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h5 className="text-sm font-semibold text-white mb-1">{kit.name}</h5>
                <p className="text-xs text-zinc-500">{kit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LiveKit />

      <FlStudioTemplates />

      <StarterSamples />

      {/* DAW Compatibility */}
      <DAWCompatibility />

      {/* Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 p-8 lg:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-3">01</p>
          <h4 className="text-2xl md:text-3xl font-display uppercase tracking-normal text-gold">
            Style & Intent
          </h4>
          <div className="mt-5 mb-7 h-px w-10 bg-white/25" />
          <p className="text-base font-light text-zinc-400 leading-[1.8] mb-8">
            Designed to elevate production across modern genres with hard-hitting low end, crisp transient detail, and textured percussive elements.
          </p>
          <ul className="divide-y divide-white/[0.06]">
            {DRUM_BUNDLE.style.map((item) => (
              <li key={item} className="py-3 text-sm font-light tracking-wide text-zinc-300">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <div className="space-y-8">
          <article className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 p-8 lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-3">02</p>
            <h4 className="text-2xl md:text-3xl font-display uppercase tracking-normal text-gold">
              Licensing
            </h4>
            <div className="mt-5 mb-7 h-px w-10 bg-white/25" />
            <p className="text-base font-light text-zinc-300 leading-[1.8] mb-5">
              All sounds are royalty-free, except the melody layers.
            </p>
            <p className="text-sm font-light text-zinc-400 leading-[1.8] mb-6">
              Melody layers are royalty-free for up to
            </p>
            <p className="font-display text-3xl uppercase tracking-normal text-white mb-2">1,000,000</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 mb-6">
              Streams, or until a major placement is secured
            </p>
            <p className="text-xs font-light text-zinc-500 leading-relaxed">
              You cannot resell the sounds as standalone products, but you can use them in commercial compositions.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-lg border border-[#d8aa67]/25 p-8 lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-3">03</p>
            <h4 className="text-2xl md:text-3xl font-display uppercase tracking-normal text-gold">
              Compatibility
            </h4>
            <div className="mt-5 mb-7 h-px w-10 bg-white/25" />
            <p className="text-base font-light text-zinc-300 leading-[1.8] mb-6">
              Works with all major digital audio workstations and sample systems.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {DAW_ICONS.map((daw) => daw.name).join('  ·  ')}
            </p>
          </article>
        </div>
      </div>

      <DrumBundlePurchaseCta variant="footer" />
    </div>
  )
}
