'use client'

import { useRef, useState } from 'react'
import { FUNNEL_TESTIMONIALS } from '@/lib/systems/funnel-content'

export function TestimonialSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    const next = Math.max(0, Math.min(index, FUNNEL_TESTIMONIALS.length - 1))
    const card = el.children[next] as HTMLElement
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      setActiveIndex(next)
    }
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin"
        onScroll={() => {
          const el = scrollRef.current
          if (!el || el.children.length === 0) return
          const cardWidth = (el.children[0] as HTMLElement).offsetWidth + 24
          setActiveIndex(Math.round(el.scrollLeft / cardWidth))
        }}
      >
        {FUNNEL_TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.name}
            className="min-w-[85%] sm:min-w-[420px] snap-start shrink-0 border border-white/10 bg-surface-raised depth-shadow p-6 rounded-lg gradient-border"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-xs text-zinc-500">Artist</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <img
                src={testimonial.screenshot}
                alt={`Testimonial from ${testimonial.name}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/5 disabled:opacity-30 transition-colors"
          aria-label="Previous testimonial"
        >
          <iconify-icon icon="solar:alt-arrow-left-linear" width="18" height="18" className="text-white" />
        </button>
        <div className="flex gap-2">
          {FUNNEL_TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollTo(activeIndex + 1)}
          disabled={activeIndex === FUNNEL_TESTIMONIALS.length - 1}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/5 disabled:opacity-30 transition-colors"
          aria-label="Next testimonial"
        >
          <iconify-icon icon="solar:alt-arrow-right-linear" width="18" height="18" className="text-white" />
        </button>
      </div>
    </div>
  )
}
