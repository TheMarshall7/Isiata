'use client'

import { useEffect, useMemo, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { AnimatedFlow } from '@/components/systems/page/AnimatedFlow'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'
import { SYSTEM_MODULES } from '@/lib/systems/modules'
import { cn } from '@/lib/utils'

export function ModuleWorkbench() {
  const { lens } = useSystemsLens()
  const [selected, setSelected] = useState<string[]>(lens.modules)
  const [openId, setOpenId] = useState<string | null>(lens.modules[0] ?? null)

  useEffect(() => {
    setSelected(lens.modules)
    setOpenId(lens.modules[0] ?? null)
  }, [lens.id, lens.modules])

  const assembled = useMemo(() => {
    if (selected.length === 0) return lens.assembledFlow
    return SYSTEM_MODULES.filter((module) => selected.includes(module.id)).map((module) => module.label)
  }, [selected, lens.assembledFlow])

  const openModule = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const toggleSelected = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Build your system
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        The pieces inside the machine
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        You do not need every module. You need the ones that actually matter to your business. Click to inspect. Toggle to assemble.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 items-start">
        {SYSTEM_MODULES.map((module) => {
          const isSelected = selected.includes(module.id)
          const isOpen = openId === module.id
          const emphasized = lens.modules.includes(module.id)
          return (
            <div
              key={module.id}
              className={cn(
                'self-start w-full rounded-lg border bg-surface-raised/40 overflow-hidden transition-colors',
                isOpen && 'border-white/30',
                !isOpen && isSelected && 'border-white/20',
                !isOpen && !isSelected && 'border-white/10',
                emphasized && 'shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
              )}
            >
              <div className="flex items-start justify-between gap-2 p-4">
                <button
                  type="button"
                  className="text-left min-w-0 flex-1"
                  onClick={() => openModule(module.id)}
                  aria-expanded={isOpen}
                >
                  <p className="text-xs font-oswald uppercase tracking-widest text-white">{module.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{module.lede}</p>
                </button>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Close ${module.label}` : `Open ${module.label}`}
                  onClick={() => openModule(module.id)}
                  className={cn(
                    'shrink-0 w-8 h-8 rounded-full border text-sm font-semibold leading-none transition-colors',
                    isOpen
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 text-zinc-400 hover:border-white/40 hover:text-zinc-200'
                  )}
                >
                  {isOpen ? '−' : '+'}
                </button>
              </div>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3">
                  <ul className="space-y-1.5 mb-4">
                    {module.items.map((item) => (
                      <li key={item} className="text-[11px] uppercase tracking-widest text-zinc-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleSelected(module.id)}
                    className={cn(
                      'text-[10px] font-semibold uppercase tracking-widest transition-colors',
                      isSelected ? 'text-white hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-300'
                    )}
                  >
                    {isSelected ? 'Remove from build' : 'Add to build'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-lg border border-white/10 bg-black/40 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
          {selected.length ? "That's a system." : 'Add a module to assemble.'}
        </p>
        <AnimatedFlow steps={assembled.length ? assembled : ['+ Module']} />
      </div>
    </Section>
  )
}
