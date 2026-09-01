'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSystemsLens } from '@/components/systems/page/SystemsLensContext'

type Point = { x: number; y: number; label: string }

function layoutPath(labels: string[]): Point[] {
  const width = 640
  const height = 420
  const top = 36
  const bottom = height - 36
  return labels.map((label, index) => {
    const t = labels.length === 1 ? 0.5 : index / (labels.length - 1)
    const y = top + t * (bottom - top)
    const stagger = index % 2 === 0 ? -72 : 72
    const x = width / 2 + (index === 0 || index === labels.length - 1 ? 0 : stagger)
    return { x, y, label }
  })
}

export function SystemGraph() {
  const { lens } = useSystemsLens()
  const reduced = usePrefersReducedMotion()
  const nodes = useMemo(() => layoutPath(lens.heroPath), [lens.heroPath])
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
    if (reduced || nodes.length < 2) return
    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % nodes.length)
    }, 1200)
    return () => window.clearInterval(id)
  }, [nodes, reduced])

  const pathD = nodes
    .map((node, index) => `${index === 0 ? 'M' : 'L'} ${node.x} ${node.y}`)
    .join(' ')

  const token = nodes[Math.min(active, nodes.length - 1)]

  return (
    <div className="relative rounded-lg border border-white/10 bg-black/40 overflow-hidden depth-shadow">
      <svg
        viewBox="0 0 640 420"
        className="w-full h-auto"
        role="img"
        aria-label={`${lens.label} system path: ${lens.heroPath.join(' to ')}`}
      >
        <rect width="640" height="420" fill="#0A0A0A" />
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.25"
          className={reduced ? undefined : 'system-draw'}
        />
        {nodes.map((node, index) => {
          const isActive = reduced || index === active
          const isPast = !reduced && index < active
          return (
            <g key={`${node.label}-${index}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 7 : 5}
                fill={isActive ? '#ffffff' : isPast ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)'}
                className={isActive && !reduced ? 'system-node-pulse' : undefined}
              />
              <text
                x={node.x + (node.x >= 320 ? 14 : -14)}
                y={node.y + 4}
                textAnchor={node.x >= 320 ? 'start' : 'end'}
                fill={isActive ? '#ffffff' : 'rgba(255,255,255,0.45)'}
                fontSize="11"
                fontFamily="Oswald, sans-serif"
                letterSpacing="0.14em"
                style={{ textTransform: 'uppercase' }}
              >
                {node.label}
              </text>
            </g>
          )
        })}
        {token && (
          <circle
            cx={token.x}
            cy={token.y}
            r="11"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            className={reduced ? undefined : 'system-token'}
          />
        )}
      </svg>
    </div>
  )
}
