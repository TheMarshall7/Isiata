'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { EmailCapture } from '@/components/forms/EmailCapture'
import type { GarmentProduct } from '@/lib/garments/catalog'

interface GarmentProductViewProps {
  product: GarmentProduct
}

export function GarmentProductView({ product }: GarmentProductViewProps) {
  const [activeImage, setActiveImage] = useState(0)
  const current = product.images[activeImage] ?? product.images[0]

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] mb-4 flex items-center justify-center bg-black">
            <img
              src={current.url}
              alt={current.alt}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square flex items-center justify-center bg-black p-1 transition-opacity ${
                    activeImage === index
                      ? 'opacity-100 ring-1 ring-white/30'
                      : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="max-w-full max-h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <div className="sticky top-28">
            <div className="flex items-center gap-3 mb-6">
              <Badge status={product.status} />
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                {product.subtitle}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-4">
              {product.title}
            </h1>

            <p className="text-sm text-zinc-400 leading-relaxed mb-6">{product.description}</p>

            <Link
              href={product.releaseHref}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
            >
              <iconify-icon icon="solar:music-library-2-linear" width="18" height="18" />
              <span>
                From the <span className="text-white group-hover:underline">{product.releaseName}</span> EP
                <span className="text-zinc-600"> · {product.releaseDate}</span>
              </span>
            </Link>

            {/* Story */}
            <div className="space-y-4 mb-8 border-t border-white/10 pt-8">
              {product.story.map((paragraph) => (
                <p key={paragraph} className="text-sm text-zinc-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Details */}
            <div className="border border-white/10 bg-surface-raised depth-shadow rounded mb-8">
              <div className="p-6 space-y-3">
                {product.details.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-zinc-500 shrink-0">{row.label}</span>
                    <span className="text-zinc-300 text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">Construction</p>
              <ul className="space-y-2">
                {product.materials.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                    <iconify-icon
                      icon="solar:check-circle-linear"
                      width="16"
                      height="16"
                      className="text-zinc-500 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sold out — checkout area */}
            <div className="border border-white/10 bg-surface-raised depth-shadow rounded">
              <div className="p-8">
                <p className="text-xs uppercase tracking-widest text-zinc-600 mb-2">Purchase</p>
                <p className="text-lg text-white font-medium mb-2">This drop has sold out</p>
                <p className="text-sm text-zinc-500 mb-6">
                  This piece is archived and no longer available for checkout. Join the list for the next garment release.
                </p>
                <button
                  type="button"
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800 text-zinc-500 font-semibold px-8 py-4 rounded cursor-not-allowed mb-8"
                >
                  Sold Out
                </button>
                <EmailCapture source={`garment-${product.slug}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
