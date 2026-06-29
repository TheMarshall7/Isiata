import { AREOCLIENT_LOGO_WHITE } from '@/lib/systems/funnel-content'

type AreoClientWhiteLogoProps = {
  alt?: string
  className?: string
}

/** White AC mark — PNG is keyed out; screen blend hides any residual black on dark UI. */
export function AreoClientWhiteLogo({ alt = '', className = '' }: AreoClientWhiteLogoProps) {
  return (
    <img
      src={AREOCLIENT_LOGO_WHITE}
      alt={alt}
      className={`logo-knockout object-contain ${className}`.trim()}
    />
  )
}
