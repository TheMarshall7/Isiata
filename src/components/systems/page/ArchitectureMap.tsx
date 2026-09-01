'use client'

import { useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { LensSelector } from '@/components/systems/page/LensSelector'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'
import { ARCHITECTURE_STAGES } from '@/lib/systems/page-content'

export function ArchitectureMap() {
  const { lens } = useSystemsLens()
  const [openId, setOpenId] = useState<string | null>(lens.architectureEmphasis[0] ?? 'capture')

  useEffect(() => {
    setOpenId(lens.architectureEmphasis[0] ?? 'capture')
  }, [lens.id, lens.architectureEmphasis])

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        The machine
      </p>
      <h1 className="text-5xl md:text-7xl font-oswald uppercase tracking-tight text-white mb-4">
        Architecture
      </h1>
      <p className="text-base font-light text-zinc-400 leading-[1.8] max-w-2xl mb-10">
        Capture. Organize. Convert. Deliver. Retain. Measure. Click a stage. The map expands. Change the business type and the emphasis moves.
      </p>

      <LensSelector heading="See it as" />

      <ol className="mt-12 space-y-3">
        {ARCHITECTURE_STAGES.map((stage, index) => {
          const open = openId === stage.id
          const emphasized = lens.architectureEmphasis.includes(stage.id)
          return (
            <li key={stage.id}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : stage.id)}
                className={`w-full text-left rounded-lg border px-5 py-5 transition-colors ${
                  emphasized
                    ? 'border-white/35 bg-white/[0.06]'
                    : 'border-white/10 bg-surface-raised/30'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-2xl font-oswald uppercase tracking-tight text-white">
                      {stage.title}
                    </span>
                  </div>
                  <iconify-icon
                    icon={open ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'}
                    width="18"
                    height="18"
                    className="text-zinc-500"
                  />
                </div>
                {open && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stage.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] uppercase tracking-widest text-zinc-300 border border-white/15 rounded-full px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
