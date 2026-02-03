'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ObjectDrop } from '@/types'
import { Badge } from '@/components/ui/Badge'

interface ObjectCardProps {
  drop: ObjectDrop
}

export function ObjectCard({ drop }: ObjectCardProps) {
  return (
    <Link
      href={`/objects/${drop.slug}`}
      className="group block flashlight-card"
      onMouseMove={(e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
        <Image
          src={drop.images[0].url}
          alt={drop.images[0].alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {drop.status !== 'live' && (
          <div className="absolute top-4 right-4">
            <Badge status={drop.status} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors">
          {drop.title}
        </h3>
        <p className="text-sm text-zinc-400">
          {drop.price || 'Price on request'}
        </p>
        {drop.availableQuantity !== undefined && drop.availableQuantity > 0 && (
          <p className="text-xs text-zinc-600">
            {drop.availableQuantity} remaining
          </p>
        )}
      </div>
    </Link>
  )
}
