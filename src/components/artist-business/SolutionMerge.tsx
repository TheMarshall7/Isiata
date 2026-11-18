'use client'

import { SEPARATE_HIRES } from '@/lib/artists/page-content'
import { useInViewOnce } from './motion'

/**
 * "Hiring separately" vs "One system". On first view, each separate hire dims in turn,
 * the arrow lights up, and the gold system panel switches on: fragments become one.
 */
export function SolutionMerge() {
  const [ref, on] = useInViewOnce<HTMLDivElement>(0.4)
  const hireCount = SEPARATE_HIRES.length
  const mergeDelay = hireCount * 120 + 250

  return (
    <div
      ref={ref}
      className={`abs-merge ${on ? 'is-on' : ''} grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch`}
    >
      <div className="abs-panel p-6">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-5">Hiring separately</p>
        <ul className="space-y-3">
          {SEPARATE_HIRES.map((hire, i) => (
            <li
              key={hire}
              className="abs-merge-hire flex items-center justify-between gap-4 text-sm"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="flex items-center gap-2 text-zinc-300">
                <span className="abs-merge-dot h-1.5 w-1.5 rounded-full bg-[#6C6B6E]" />
                {hire}
              </span>
              <span className="abs-merge-meta text-[10px] uppercase tracking-widest text-zinc-600">
                Own brief · invoice · timeline
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center">
        <span
          className="abs-merge-arrow flex h-12 w-12 items-center justify-center rounded-full border border-[#d8aa67]/40 text-[#f0c681]"
          style={{ transitionDelay: `${mergeDelay - 150}ms` }}
        >
          <iconify-icon icon="solar:arrow-right-linear" width="18" height="18" className="rotate-90 md:rotate-0" />
        </span>
      </div>

      <div
        className="abs-merge-system abs-panel abs-panel-glow abs-frame p-6 flex flex-col justify-between"
        style={{ transitionDelay: `${mergeDelay}ms` }}
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-[#d8aa67] mb-5">The Artist Business System</p>
          <p className="text-2xl md:text-3xl text-white font-light leading-snug">
            One integrated implementation. One team. One connected business.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {['1 brief', '1 build', '30 days'].map((tag, i) => (
            <span
              key={tag}
              className="abs-merge-tag rounded-full border border-[#d8aa67]/40 px-3 py-1 text-xs text-[#f0dfc8]"
              style={{ transitionDelay: `${mergeDelay + 200 + i * 120}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
