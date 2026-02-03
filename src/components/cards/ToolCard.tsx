'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ToolProduct } from '@/types'
import { Badge } from '@/components/ui/Badge'

interface ToolCardProps {
  tool: ToolProduct
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block flashlight-card"
      onMouseMove={(e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-900 mb-4 flex items-center justify-center">
        {tool.previewMedia[0] ? (
          <Image
            src={tool.previewMedia[0].url}
            alt={tool.previewMedia[0].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <iconify-icon
            icon="solar:diskette-linear"
            width="48"
            height="48"
            className="text-zinc-600"
          />
        )}
        {tool.status !== 'live' && (
          <div className="absolute top-4 right-4">
            <Badge status={tool.status} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors">
          {tool.title}
        </h3>
        <div className="flex gap-2 flex-wrap">
          {tool.format.slice(0, 3).map((format) => (
            <span
              key={format}
              className="text-xs text-zinc-400 border border-white/10 px-2 py-0.5"
            >
              {format}
            </span>
          ))}
        </div>
        <p className="text-sm text-zinc-400">{tool.price}</p>
      </div>
    </Link>
  )
}
