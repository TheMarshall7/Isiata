'use client'

import { useState } from 'react'
import type { FunnelAccent } from '@/lib/systems/funnel-content'

type VslPlaceholderProps = {
  posterSrc: string
  title: string
  accent: FunnelAccent
  videoSrc?: string
  vslEmbedUrl?: string
}

export function VslPlaceholder({ posterSrc, title, accent, videoSrc, vslEmbedUrl }: VslPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (videoSrc && isPlaying) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 depth-shadow-lg">
        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full h-full object-cover bg-black"
          poster={posterSrc}
        />
      </div>
    )
  }

  if (vslEmbedUrl && isPlaying) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 depth-shadow-lg">
        <iframe
          src={vslEmbedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  const hasVideo = Boolean(videoSrc || vslEmbedUrl)

  return (
    <button
      type="button"
      onClick={() => hasVideo && setIsPlaying(true)}
      disabled={!hasVideo}
      className={`group relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 depth-shadow-lg ${
        hasVideo ? 'cursor-pointer' : 'cursor-default'
      }`}
      aria-label={hasVideo ? `Play video: ${title}` : `Video coming soon: ${title}`}
    >
      <img src={posterSrc} alt={title} className="absolute inset-0 w-full h-full object-cover" />

      <div className={`absolute inset-0 ${accent.glow} mix-blend-soft-light`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div
          className={`relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border-2 ${accent.border} bg-black/50 backdrop-blur-sm transition-transform duration-300 ${
            hasVideo ? 'group-hover:scale-110' : ''
          }`}
        >
          <iconify-icon
            icon={hasVideo ? 'solar:play-bold' : 'solar:videocamera-record-linear'}
            width="36"
            height="36"
            className="text-white ml-1"
          />
          {hasVideo && (
            <div
              className={`absolute inset-0 rounded-full ${accent.glow} animate-ping opacity-30`}
              style={{ animationDuration: '2s' }}
            />
          )}
        </div>

        {!hasVideo && (
          <span className={`text-xs font-semibold uppercase tracking-widest ${accent.text} px-4 py-1.5 rounded-full border ${accent.border} bg-black/60 backdrop-blur-sm`}>
            Video coming soon
          </span>
        )}
      </div>
    </button>
  )
}
