import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import { SYSTEMS_BOOKING_HREF, SYSTEMS_TIERS } from '@/lib/systems/tiers'

export default function SystemsPage() {
  return (
    <>
      {/* Hero */}
      <Container bordered className="pt-32 pb-20">
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                For artists, producers, and creatives
              </p>
              <PageTitle
                text="Systems"
                className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-8"
                speed={100}
              />
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-2xl mb-8">
                Full backend business systems for artists, musicians, and creatives.
              </p>

              <div className="max-w-2xl space-y-5 text-base font-light text-zinc-500 leading-[1.8]">
                <p>
                  The creative work is only half the job. Your audience, bookings, and revenue need
                  infrastructure behind them.
                </p>
                <p>
                  Through our collaboration with AreoClient, you get the most premium systems
                  available. Built to turn your audience into consistent members of your ecosystem.
                </p>
              </div>
            </div>

            <div className="relative max-w-md lg:max-w-none mx-auto lg:mx-0 w-full flex items-center justify-center bg-transparent">
              <img
                src="/systems/areoclient-hero.png"
                alt="AreoClient"
                className="w-full max-w-sm lg:max-w-md h-auto object-contain bg-transparent"
              />
            </div>
          </div>
        </Section>
      </Container>

      {/* Tiers */}
      <Container bordered className="py-24 border-t border-white/10">
        <Section reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              Offerings
            </p>
            <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white">
              Choose your foundation
            </h2>
          </div>

          <div className="space-y-8">
            {SYSTEMS_TIERS.map((tier) => (
              <Link
                key={tier.id}
                href={`/systems/${tier.id}`}
                className="block group"
              >
              <article
                className="flashlight-card hover-depth hover-glow gradient-border-brand rounded-lg bg-surface-raised/50 depth-shadow overflow-hidden"
              >
                <div className="p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
                    <div className="lg:w-72 shrink-0">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 bg-black/30">
                          <iconify-icon icon={tier.icon} width="28" height="28" className="text-white" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                          Tier {tier.tier}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-oswald uppercase tracking-tight text-white mb-2 leading-tight">
                        {tier.name}
                      </h3>

                      <p className="text-sm text-zinc-500 italic leading-relaxed mb-6">
                        {tier.tagline}
                      </p>

                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Timeline</p>
                        <p className="text-sm text-zinc-300">{tier.timeline}</p>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                        {tier.includesNote ?? 'What it does for you'}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                            <iconify-icon
                              icon="solar:check-circle-linear"
                              width="18"
                              height="18"
                              className="text-white shrink-0 mt-0.5 opacity-60"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="p-5 rounded-lg border border-white/10 bg-white/[0.03] mb-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                          Outcome
                        </p>
                        <p className="text-zinc-200 leading-relaxed">{tier.outcome}</p>
                      </div>

                      <span
                        className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold group-hover:bg-zinc-200 transition-colors"
                      >
                        Explore system
                        <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center">
            <a
              href="https://areoclient.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              areoclient.com
            </a>
          </p>
        </Section>
      </Container>

      {/* CTA */}
      <Container bordered className="py-24 border-t border-white/10">
        <Section reveal>
          <div className="relative max-w-3xl mx-auto text-center p-10 lg:p-14 rounded-lg border border-white/15 bg-gradient-to-br from-white/[0.06] via-surface-raised/80 to-transparent depth-shadow-lg overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-4">
                Not sure which tier fits?
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 max-w-lg mx-auto">
                Book a call. We&apos;ll look at your audience, offers, and gaps, then recommend the
                right starting point.
              </p>
              <Link
                href={SYSTEMS_BOOKING_HREF}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
              >
                Book a call
                <iconify-icon icon="solar:calendar-linear" width="18" height="18" />
              </Link>
              <p className="mt-6 text-xs text-zinc-600">
                Built for artists, producers, and creatives.
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}
