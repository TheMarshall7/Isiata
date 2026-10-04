import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AlbumCoverProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  children?: ReactNode
  /** Gold frame around the artwork (default). */
  goldFrame?: boolean
  /** Black padded inset around the artwork (default). Set false for edge-to-edge cover. */
  padded?: boolean
  /** Gold border opacity class, e.g. "border-[#d8aa67]/30". */
  goldBorderClassName?: string
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
  goldBorderClassName = 'border-[#d8aa67]/75 shadow-[inset_0_0_12px_rgba(211,157,83,0.12)]',
}: AlbumCoverProps) {
  const goldClasses = goldFrame
    ? cn('border', goldBorderClassName)
    : 'border border-transparent'

  if (!padded) {
    return (
      <div className={cn('relative aspect-square w-full overflow-hidden bg-black', goldClasses, className)}>
        <img
          src={src}
          alt={alt}
          className={cn('h-full w-full object-contain', imgClassName)}
        />
        {children}
      </div>
    )
  }

  return (
    <div className={cn('aspect-square w-full overflow-hidden bg-black p-4 sm:p-5 md:p-6', className)}>
      <div className={cn('relative h-full w-full', goldClasses)}>
        <img
          src={src}
          alt={alt}
          className={cn('h-full w-full object-contain', imgClassName)}
        />
        {children}
      </div>
    </div>
  )
}
