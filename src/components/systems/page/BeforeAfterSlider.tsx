'use client'

import { useCallback, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { BEFORE_AFTER } from '@/lib/systems/page-content'

export function BeforeAfterSlider() {
  const [value, setValue] = useState(58)
  const trackRef = useRef<HTMLDivElement>(null)

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setValue(Math.min(100, Math.max(0, next)))
  }, [])

  return (
    <Section reveal>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Scattered to connected
      </p>
      <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-3">
        Before / After
      </h2>
      <p className="text-sm text-zinc-500 mb-8 max-w-xl">
        Drag the divider. The tools do not disappear. They stop living in seven different places.
      </p>

      <div
        ref={trackRef}
        className="relative min-h-[320px] md:min-h-[380px] rounded-lg border border-white/10 overflow-hidden bg-black select-none"
      >
        <div className="absolute inset-0 p-6 md:p-10">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-6">{BEFORE_AFTER.before.label}</p>
          <div className="space-y-3">
            {BEFORE_AFTER.before.nodes.map((node, index) => (
              <div
                key={node}
                className="max-w-xs rounded-md border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400"
                style={{ marginLeft: `${(index % 4) * 12}px` }}
              >
                {node}
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 bg-background"
          style={{ clipPath: `inset(0 0 0 ${value}%)` }}
        >
          <div className="absolute inset-0 p-6 md:p-10">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-6">{BEFORE_AFTER.after.label}</p>
            <div className="flex flex-col items-center justify-center h-[80%] gap-3">
              <p className="text-xs font-oswald uppercase tracking-widest text-white mb-2">System</p>
              <div className="flex flex-wrap justify-center gap-2">
                {BEFORE_AFTER.after.nodes.slice(0, 3).map((node) => (
                  <span
                    key={node}
                    className="px-3 py-1.5 rounded-md border border-white/20 text-[11px] uppercase tracking-widest text-white"
                  >
                    {node}
                  </span>
                ))}
              </div>
              <span className="h-8 w-px bg-white/20" aria-hidden />
              {BEFORE_AFTER.after.nodes.slice(3).map((node) => (
                <span
                  key={node}
                  className="px-3 py-1.5 rounded-md border border-white/20 text-[11px] uppercase tracking-widest text-white"
                >
                  {node}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-px bg-white z-10"
          style={{ left: `${value}%` }}
          aria-hidden
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
            <iconify-icon icon="solar:transfer-horizontal-linear" width="14" height="14" />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label="Before and after comparison"
          onChange={(event) => setValue(Number(event.target.value))}
          onPointerDown={(event) => setFromClientX(event.clientX)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>
    </Section>
  )
}
