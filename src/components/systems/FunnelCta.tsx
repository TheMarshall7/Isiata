import Link from 'next/link'
import { SYSTEMS_CTA_LABEL, SYSTEMS_BOOKING_HREF } from '@/lib/systems/tiers'
import { FUNNEL_SHARED } from '@/lib/systems/funnel-content'

type FunnelCtaProps = {
  label?: string
  microcopy?: string
  className?: string
  align?: 'left' | 'center'
  accentGlow?: string
  showAvatars?: boolean
}

const AVATAR_URLS = [
  'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a014e0890b9.png',
  'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc120a7728534876c64b.png',
]

export function FunnelCta({
  label = SYSTEMS_CTA_LABEL,
  microcopy = FUNNEL_SHARED.ctaMicrocopy,
  className = '',
  align = 'center',
  accentGlow = '',
  showAvatars = false,
}: FunnelCtaProps) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center' : 'items-start'} ${className}`}>
      {showAvatars && (
        <div className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
          <div className="flex -space-x-2">
            {AVATAR_URLS.map((url) => (
              <div key={url} className="w-7 h-7 rounded-full border-2 border-black overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs text-zinc-500">Join many creators</span>
        </div>
      )}
      <Link
        href={SYSTEMS_BOOKING_HREF}
        className={`group cta-sheen inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${accentGlow}`}
      >
        {label}
        <iconify-icon
          icon="solar:arrow-right-linear"
          width="18"
          height="18"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </Link>
      {microcopy && <p className="text-xs text-zinc-500">{microcopy}</p>}
    </div>
  )
}
