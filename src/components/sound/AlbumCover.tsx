import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AlbumCoverProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  children?: ReactNode
  /** Gold outline on the outer black frame (default). */
  goldFrame?: boolean
  /** Black padded inset around the artwork (default). Set false for edge-to-edge cover. */
  padded?: boolean
  /** Gold border classes on the outer frame. */
  goldBorderClassName?: string
  /** Unveil the frame when its parent section becomes visible. */
  reveal?: boolean
}

/** Square album art frame — never crops the cover. */
export function AlbumCover({
  src,
  alt,
  className,
  imgClassName,
  children,
  goldFrame = true,
  padded = true,
  goldBorderClassName = 'border-[#d8aa67]/25',
  reveal = false,
}: AlbumCoverProps) {
  const goldClasses = goldFrame
    ? cn('border', goldBorderClassName)
    : 'border border-transparent'
  const revealProps = reveal
    ? { style: { '--d': 1 } as CSSProperties }
    : {}

  if (!padded) {
    return (
      <div
        {...revealProps}
        className={cn(
          'relative aspect-square w-full overflow-hidden bg-black',
          reveal && 'reveal-media',
          goldClasses,
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          className={cn('reveal-media-img h-full w-full object-contain', imgClassName)}
        />
        {children}
      </div>
    )
  }

  return (
    <div
      {...revealProps}
      className={cn(
        'aspect-square w-full overflow-hidden bg-black p-4 sm:p-5 md:p-6',
        reveal && 'reveal-media',
        goldClasses,
        className
      )}
    >
      <div className="relative h-full w-full">
        <img
          src={src}
          alt={alt}
          className={cn('reveal-media-img h-full w-full object-contain', imgClassName)}
        />
        {children}
      </div>
    </div>
  )
}
