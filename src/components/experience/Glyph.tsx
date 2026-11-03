import type { GlyphName } from '@/lib/experience/campaign'

const PATHS: Record<GlyphName, React.ReactNode> = {
  eye: (
    <>
      <path d="M4 32C14 16 50 16 60 32C50 48 14 48 4 32Z" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  mirror: (
    <>
      <ellipse cx="32" cy="30" rx="15" ry="22" />
      <path d="M24 18C21 24 21 32 24 40" opacity=".7" />
      <path d="M32 52V60M24 60H40" />
    </>
  ),
  echo: (
    <>
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
      <path d="M22 22A14 14 0 0 0 22 42M42 22A14 14 0 0 1 42 42" />
      <path d="M15 15A24 24 0 0 0 15 49M49 15A24 24 0 0 1 49 49" opacity=".6" />
    </>
  ),
  signal: <polyline points="2,32 12,32 18,12 26,52 34,18 40,46 46,32 62,32" />,
  void: (
    <>
      <path d="M32 6A26 26 0 1 0 58 32" />
      <circle cx="48" cy="14" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  prism: (
    <>
      <path d="M32 8L56 50H8Z" />
      <path d="M2 36L22 34M42 34L62 24M42 38L62 38M42 42L62 52" opacity=".7" />
    </>
  ),
  thread: (
    <>
      <path d="M8 46C20 10 30 54 40 28S56 14 56 14" />
      <circle cx="8" cy="46" r="3" fill="currentColor" stroke="none" />
      <circle cx="30" cy="38" r="3" fill="currentColor" stroke="none" />
      <circle cx="56" cy="14" r="3" fill="currentColor" stroke="none" />
    </>
  ),
  threshold: (
    <>
      <path d="M14 58V26A18 18 0 0 1 50 26V58" />
      <path d="M24 58V30A8 8 0 0 1 40 30V58" opacity=".7" />
      <path d="M32 24V58" opacity=".35" />
      <path d="M6 58H58" />
    </>
  ),
}

export function Glyph({
  name,
  size = 48,
  className,
  strokeWidth = 1.5,
}: {
  name: GlyphName
  size?: number
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}

export type ShapeName = 'circle' | 'triangle' | 'diamond' | 'cross' | 'eye' | 'line'

export function Shape({ name, size = 40, className }: { name: ShapeName; size?: number; className?: string }) {
  const body: Record<ShapeName, React.ReactNode> = {
    circle: <circle cx="20" cy="20" r="12" />,
    triangle: <path d="M20 6L34 32H6Z" />,
    diamond: <path d="M20 5L35 20L20 35L5 20Z" />,
    cross: <path d="M20 6V34M6 20H34" />,
    eye: (
      <>
        <path d="M3 20C10 10 30 10 37 20C30 30 10 30 3 20Z" />
        <circle cx="20" cy="20" r="4" />
      </>
    ),
    line: <path d="M6 20H34" />,
  }
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {body[name]}
    </svg>
  )
}
