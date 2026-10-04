'use client'

import Link from 'next/link'
import { ToolCatalogItem } from '@/lib/tools/catalog'

interface ToolCatalogCardProps {
  item: ToolCatalogItem
}

export function ToolCatalogCard({ item }: ToolCatalogCardProps) {
  const isContained = item.imageFit === 'contain'

  return (
    <Link
      href={item.href}
      className="group flashlight-card hover-glow overflow-hidden border border-[#d8aa67]/20 bg-transparent transition-all duration-500 hover:border-[#d8aa67]/65"
      onMouseMove={(e) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
    >
      <div
        className={`relative overflow-hidden bg-black/40 ${
          isContained ? 'aspect-[16/10]' : 'aspect-square'
        }`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className={`h-full w-full group-hover:scale-105 transition-transform duration-500 ${
              isContained ? 'object-contain p-2' : 'object-cover'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]">
            <iconify-icon
              icon={item.icon}
              width="72"
              height="72"
              className="text-gold/40 group-hover:text-gold/70 group-hover:scale-110 transition-all duration-500"
            />
          </div>
        )}
        <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded border border-[#d8aa67]/25 bg-black/60 backdrop-blur-sm">
          <iconify-icon icon={item.icon} width="20" height="20" className="text-[#f0dfc8]" />
        </div>
      </div>
      <div className="p-6">
        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mb-2">
          {item.categoryLabel}
        </p>
        <h3 className="text-lg font-semibold text-gold mb-2 group-hover:text-zinc-200 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-zinc-500 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          {item.price ? (
            <span className="text-sm font-medium text-white">{item.price}</span>
          ) : (
            <span className="text-sm text-zinc-600">Explore</span>
          )}
          <iconify-icon
            icon="solar:arrow-right-linear"
            width="18"
            height="18"
            className="text-zinc-600 group-hover:text-gold group-hover:translate-x-1 transition-all"
          />
        </div>
      </div>
    </Link>
  )
}

interface ToolCatalogGridProps {
  items: ToolCatalogItem[]
  title?: string
}

export function ToolCatalogGrid({ items, title }: ToolCatalogGridProps) {
  return (
    <div>
      {title && (
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ToolCatalogCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  )
}
