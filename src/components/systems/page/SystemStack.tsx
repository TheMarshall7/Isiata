'use client'

import { useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SYSTEM_STACK_LAYERS } from '@/lib/systems/page-content'

export function SystemStack() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-layer]'))
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.stackLayer)
        if (!Number.isNaN(index)) setActive(index)
      },
      { threshold: 0.45, rootMargin: '-10% 0px -35% 0px' }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        How it is built
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        Your creative business, in layers
      </h2>
      <p className="text-sm text-zinc-500 mb-10 max-w-xl">
        Technical depth without the jargon dump. Each layer activates as you reach it.
      </p>

      <ol className="space-y-3">
        {SYSTEM_STACK_LAYERS.map((layer, index) => {
          const isActive = active === index
          return (
            <li
              key={layer.id}
              data-stack-layer={index}
              className={`rounded-lg border p-5 md:p-6 transition-colors duration-500 ${
                isActive ? 'border-white/30 bg-white/[0.06]' : 'border-white/10 bg-surface-raised/30'
              }`}
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-[10px] font-oswald tracking-widest text-zinc-500">{layer.number}</span>
                <h3 className="text-xl font-oswald uppercase tracking-tight text-white">{layer.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] uppercase tracking-widest text-zinc-400 border border-white/10 rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
