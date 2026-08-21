import { ISIATA_LOGO_URL } from '@/lib/constants'

type IsiataSystemsLogoProps = {
  alt?: string
  className?: string
}

/** ISIATA mark for systems pages. */
export function AreoClientWhiteLogo({ alt = 'ISIATA', className = '' }: IsiataSystemsLogoProps) {
  return (
    <img
      src={ISIATA_LOGO_URL}
      alt={alt}
      className={`object-contain ${className}`.trim()}
    />
  )
}
