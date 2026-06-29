'use client'

import { useState } from 'react'
import type { FunnelFaq } from '@/lib/systems/funnel-content'

type FaqAccordionProps = {
  items: FunnelFaq[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.question}
            className="border border-white/10 bg-surface-raised/50 depth-shadow overflow-hidden transition-colors hover:border-white/15"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-white">{item.question}</span>
              <iconify-icon
                icon={isOpen ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'}
                width="20"
                height="20"
                className="text-zinc-500 shrink-0 transition-transform duration-300"
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
