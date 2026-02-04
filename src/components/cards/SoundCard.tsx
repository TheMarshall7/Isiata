'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SoundRelease } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

interface SoundCardProps {
  release: SoundRelease
}

export function SoundCard({ release }: SoundCardProps) {
  return (
    <Link
      href={`/sound/${release.slug}`}
      className="group block flashlight-card depth-shadow hover-depth border border-white/10 rounded-lg overflow-hidden"
      onMouseMove={(e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-900 mb-4">
        <Image
          src={release.coverArt.url}
          alt={release.coverArt.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {release.status !== 'live' && (
          <div className="absolute top-4 right-4">
            <Badge status={release.status} />
          </div>
        )}
      </div>

      <div className="space-y-2 px-4 pb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors">
          {release.title}
        </h3>
        <p className="text-sm text-zinc-400">{release.artist}</p>
        <p className="text-xs text-zinc-600 font-mono uppercase tracking-wider">
          {formatDate(release.releaseDate)}
        </p>
      </div>
    </Link>
  )
}
