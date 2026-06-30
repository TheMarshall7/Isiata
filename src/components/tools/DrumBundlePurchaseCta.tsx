import Link from 'next/link'
import {
  DRUM_BUNDLE,
  DRUM_BUNDLE_CHECKOUT_HREF,
  DRUM_BUNDLE_PRICE,
} from '@/lib/tools/drum-bundle'

type DrumBundlePurchaseCtaProps = {
  variant?: 'hero' | 'footer'
}

const TRUST_BADGES = [
  { icon: 'solar:download-linear', label: 'Instant download' },
  { icon: 'solar:shield-check-linear', label: 'Secure checkout' },
  { icon: 'solar:verified-check-linear', label: 'Royalty-free' },
]

export function DrumBundlePurchaseCta({ variant = 'hero' }: DrumBundlePurchaseCtaProps) {
  if (variant === 'footer') {
    return (
      <div className="relative overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.06] via-surface-raised/80 to-transparent depth-shadow-lg p-8 lg:p-12">
        <div className="glow-orb top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10" aria-hidden />

        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-center">
          <div className="mx-auto w-full max-w-xs lg:max-w-none">
            <div className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/20">
              <img
                src={DRUM_BUNDLE.image}
                alt={DRUM_BUNDLE.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight gradient-text text-white mb-4">
              Ready to produce?
            </h3>
            <p className="text-xl md:text-2xl font-oswald uppercase tracking-tight text-white mb-1">
              {DRUM_BUNDLE.title}
            </p>
            <p className="text-sm text-zinc-500 font-normal tracking-wide mb-6">
              {DRUM_BUNDLE.subtitle}
            </p>
            <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-8">
              <span className="text-3xl font-oswald font-semibold text-white">{DRUM_BUNDLE_PRICE.display}</span>
              <span className="text-sm text-zinc-600 line-through">{DRUM_BUNDLE_PRICE.original}</span>
            </div>
            <Link
              href={DRUM_BUNDLE_CHECKOUT_HREF}
              className="group cta-sheen inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-zinc-200 hover:scale-[1.02] transition-all"
            >
              Get the bundle
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="18"
                height="18"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              {TRUST_BADGES.map((badge) => (
                <span key={badge.label} className="inline-flex items-center gap-2 text-xs text-zinc-500">
                  <iconify-icon icon={badge.icon} width="16" height="16" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-surface-raised depth-shadow hover-glow overflow-hidden transition-all duration-500 gradient-border-tsukuyomi">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="aspect-square lg:aspect-auto overflow-hidden">
          <img src={DRUM_BUNDLE.image} alt={DRUM_BUNDLE.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1 w-fit mb-6">
            Sample Pack
          </span>
          <h3 className="text-2xl md:text-3xl font-oswald uppercase tracking-tight text-white mb-2">
            {DRUM_BUNDLE.title}
          </h3>
          <p className="text-sm text-zinc-500 uppercase tracking-widest mb-6">{DRUM_BUNDLE.subtitle}</p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-8">{DRUM_BUNDLE.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-zinc-500 mb-8">
            <span className="border border-white/10 px-3 py-1">{DRUM_BUNDLE.format}</span>
            <span className="border border-white/10 px-3 py-1">Royalty-Free</span>
            <span className="border border-white/10 px-3 py-1">100+ Sounds</span>
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold text-white">{DRUM_BUNDLE_PRICE.display}</span>
            <span className="text-sm text-zinc-600 line-through">{DRUM_BUNDLE_PRICE.original}</span>
          </div>
          <Link
            href={DRUM_BUNDLE_CHECKOUT_HREF}
            className="group cta-sheen inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors w-fit"
          >
            Get the bundle
            <iconify-icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
