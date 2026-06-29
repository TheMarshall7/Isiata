import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import {
  DRUM_BUNDLE,
  DRUM_BUNDLE_CHECKOUT_HREF,
  DRUM_BUNDLE_HREF,
  DRUM_BUNDLE_PRICE,
} from '@/lib/tools/drum-bundle'

export function DrumBundleFeaturedSection() {
  return (
    <Section reveal>
      <Container bordered className="py-24 md:py-32">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
            Tools
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald uppercase tracking-tight text-white leading-tight">
            {DRUM_BUNDLE.title}
          </h2>
          <p className="text-sm text-zinc-500 uppercase tracking-widest mt-3">
            {DRUM_BUNDLE.subtitle}
          </p>
          <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
            {DRUM_BUNDLE.description}
          </p>
        </div>

        <div className="border border-white/10 bg-surface-raised depth-shadow overflow-hidden gradient-border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-square lg:aspect-auto overflow-hidden">
              <img
                src={DRUM_BUNDLE.image}
                alt={DRUM_BUNDLE.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <div className="flex flex-wrap gap-3 text-xs text-zinc-500 mb-8">
                <span className="border border-white/10 px-3 py-1">{DRUM_BUNDLE.format}</span>
                <span className="border border-white/10 px-3 py-1">Royalty-Free</span>
                <span className="border border-white/10 px-3 py-1">100+ Sounds</span>
              </div>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-3xl font-oswald font-semibold text-white">
                  {DRUM_BUNDLE_PRICE.display}
                </span>
                <span className="text-sm text-zinc-600 line-through">{DRUM_BUNDLE_PRICE.original}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={DRUM_BUNDLE_HREF}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  Explore the kit
                  <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
                </Link>
                <Link
                  href={DRUM_BUNDLE_CHECKOUT_HREF}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Get the bundle
                  <iconify-icon icon="solar:cart-large-2-linear" width="16" height="16" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
