import Image from 'next/image'
import { cn } from '@/lib/utils'

const OVERLAYS = {
  1: '/brand/overlays/overlay-1.jpg',
  2: '/brand/overlays/overlay-2.png',
  3: '/brand/overlays/overlay-3.png',
  4: '/brand/overlays/overlay-4.png',
} as const

type BrandOverlayProps = {
  variant?: keyof typeof OVERLAYS
  opacity?: number
  className?: string
}

/**
 * Gold-marble / celestial-line brand texture layered behind a section.
 * mix-blend-screen drops the overlay's black base so only the gold
 * veining and geometry show; the gradient fades the edges into the page.
 * Parent must be `relative`; content above it should be `relative z-10`.
 */
export function BrandOverlay({ variant = 1, opacity = 0.35, className }: BrandOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ opacity }}
    >
      <Image
        src={OVERLAYS[variant]}
        alt=""
        fill
        sizes="100vw"
        quality={70}
        className="object-cover mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  )
}
