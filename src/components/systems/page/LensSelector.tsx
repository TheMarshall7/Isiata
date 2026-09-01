'use client'

import { SYSTEM_LENSES } from '@/lib/systems/lens'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'

type LensSelectorProps = {
  heading?: string
}

export function LensSelector({ heading = 'What are you building?' }: LensSelectorProps) {
  const { lensId, setLensId, lens } = useSystemsLens()

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">{heading}</p>
      <div
        role="radiogroup"
        aria-label="Business type"
        className="flex flex-wrap gap-2"
      >
        {SYSTEM_LENSES.map((item) => {
          const selected = item.id === lensId
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setLensId(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border transition-colors ${
                selected
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-zinc-400 border-white/15 hover:text-white hover:border-white/40'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <p className="mt-4 text-sm text-zinc-500 max-w-xl">{lens.description}</p>
    </div>
  )
}
