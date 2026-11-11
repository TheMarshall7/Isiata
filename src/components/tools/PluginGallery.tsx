'use client'

import { useState } from 'react'

export type GalleryShot = { src: string; label: string; width: number; height: number }

export function PluginGallery({ name, shots }: { name: string; shots: GalleryShot[] }) {
  const [active, setActive] = useState(0)
  const shot = shots[active]
  return (
    <section className="mb-14">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">Take a look</h2>
      <figure className="overflow-hidden border border-[#d8aa67]/25 bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={`${name} ${shot.label}`}
          className="h-auto w-full"
        />
      </figure>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4" role="tablist" aria-label={`${name} screens`}>
        {shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`group overflow-hidden border text-left transition ${
              i === active ? 'border-[#d8aa67]' : 'border-[#d8aa67]/20 opacity-60 hover:opacity-100'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} width={s.width} height={s.height} alt="" loading="lazy" className="h-auto w-full" />
            <span className="block bg-black/50 px-3 py-2 text-xs uppercase tracking-widest text-[#f0dfc8]">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
