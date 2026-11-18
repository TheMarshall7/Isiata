import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { BrandOverlay } from '@/components/ui/BrandOverlay'
import { ApplicationForm } from '@/components/artist-business/ApplicationForm'
import { ComponentExplorer } from '@/components/artist-business/ComponentExplorer'
import { RevenueCalculator } from '@/components/artist-business/RevenueCalculator'
import { SolutionMerge } from '@/components/artist-business/SolutionMerge'
import { Testimonials } from '@/components/artist-business/Testimonials'
import {
  AssetSelector,
  FitCheck,
  IncomeModes,
  InvestmentCard,
  LaunchTimeline,
  PlatformRisk,
  StickyAuditBar,
} from '@/components/artist-business/OfferInteractives'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'
import {
  ARTISTS_APPLY_LABEL,
  ARTISTS_BOOKING_HREF,
  ARTISTS_COPY,
  ARTISTS_HERO_CTA_LABEL,
} from '@/lib/artists/page-content'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.systems)

const sectionBorder = 'py-24 md:py-32 border-t border-[#d8aa67]/15'
const eyebrow = 'text-xs font-semibold uppercase tracking-widest text-[#d8aa67]/80 mb-4'
const h2 = 'text-2xl md:text-4xl font-display uppercase tracking-normal text-gold mb-6 max-w-4xl leading-[1.15]'
const bodyText = 'text-base font-light text-zinc-400 leading-[1.8] max-w-2xl'

const ADDITIONAL_ICONS: Record<string, string> = {
  support: 'solar:shield-check-linear',
  'lead-magnet': 'solar:magnet-linear',
  'social-audit': 'solar:magnifer-zoom-in-linear',
}

function CtaButton({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' }) {
  return (
    <Link href={ARTISTS_BOOKING_HREF} className={variant === 'primary' ? 'btn-primary cta-sheen' : 'btn-secondary'}>
      {label}
      <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
    </Link>
  )
}

export default function SystemsPage() {
  const c = ARTISTS_COPY

  return (
    <>
      {/* Hero */}
      <div id="abs-hero" className="relative overflow-hidden">
        <div aria-hidden className="abs-hero-glow pointer-events-none absolute inset-0" />
        <Container bordered className="relative pt-28 md:pt-36 pb-16 md:pb-24">
          <Section reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8aa67]/30 bg-black/30 px-3 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8aa67] animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest text-[#f0dfc8]">{c.hero.eyebrow}</span>
            </div>
            <h1 className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold max-w-5xl">
              {c.hero.title}
            </h1>
            <div className="max-w-2xl space-y-5 text-base md:text-lg font-light text-[#d5c8b8] leading-[1.8]">
              {c.hero.lede.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 text-white font-medium max-w-2xl">{c.hero.tagline}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CtaButton label={ARTISTS_HERO_CTA_LABEL} />
              <a href="#roi" className="btn-secondary">
                Calculate your return
                <iconify-icon icon="solar:calculator-linear" width="16" height="16" />
              </a>
            </div>
          </Section>
        </Container>
      </div>

      {/* 01 Problem */}
      <div className="abs-section-ember">
      <Container bordered className={sectionBorder}>
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className={eyebrow}>{c.problem.eyebrow}</p>
              <h2 className={h2}>{c.problem.title}</h2>
              <p className={`${bodyText} mb-4`}>{c.problem.intro}</p>
              <p className="text-xl text-white font-light mb-6">{c.problem.question}</p>
              <div className={`${bodyText} space-y-4 mb-10`}>
                {c.problem.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <PlatformRisk />
            </div>
            <div className="lg:pt-12 lg:sticky lg:top-24">
              <IncomeModes />
              <div className="mt-6 border-l-2 border-[#A44429] pl-5">
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">{c.problem.resultLabel}</p>
                <p className="text-[#d5c8b8] mb-3">{c.problem.result}</p>
                <p className="text-gold font-medium">{c.problem.punch}</p>
              </div>
            </div>
          </div>
        </Section>
      </Container>
      </div>

      {/* 02 Opportunity */}
      <div id="opportunity" className="abs-section-indigo scroll-mt-24">
        <Container bordered className={sectionBorder}>
          <Section reveal>
            <p className={eyebrow}>{c.opportunity.eyebrow}</p>
            <h2 className={h2}>{c.opportunity.title}</h2>
            <p className={`${bodyText} mb-10`}>{c.opportunity.lead} Select what applies to you.</p>
            <AssetSelector />
            <div className="mt-12 max-w-3xl">
              <p className="text-lg text-zinc-400">{c.opportunity.punch[0]}</p>
              <p className="text-2xl md:text-3xl text-white font-light leading-snug mt-2">{c.opportunity.punch[1]}</p>
            </div>
          </Section>
        </Container>
      </div>

      {/* 03 Solution */}
      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.solution.eyebrow}</p>
          <h2 className={h2}>{c.solution.title}</h2>
          <div className={`${bodyText} space-y-4 mb-12`}>
            {c.solution.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <SolutionMerge />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.solution.split.map((line, i) => (
              <div key={line} className="flex items-center gap-4 rounded-lg border border-white/10 bg-surface-raised/30 p-5">
                <span className="font-mono text-xs text-[#d8aa67]">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm text-zinc-200">{line}</p>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      {/* 04 What we build */}
      <div className="abs-section-indigo">
        <Container bordered className={sectionBorder}>
          <Section reveal>
            <p className={eyebrow}>{c.build.eyebrow}</p>
            <h2 className={`${h2} mb-4`}>{c.build.title}</h2>
            <p className={`${bodyText} mb-12`}>Explore each component. Every piece connects back to the same business.</p>
            <ComponentExplorer />
          </Section>
        </Container>
      </div>

      {/* 05 Experience */}
      <div className="abs-section-gold">
      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.experience.eyebrow}</p>
          <h2 className={`${h2} mb-12`}>{c.experience.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 items-center">
            {/* INSERT DEMONSTRATION VIDEO HERE */}
            <div
              role="img"
              aria-label={c.experience.videoPlaceholder}
              className="abs-panel abs-frame relative flex aspect-video w-full items-center justify-center overflow-hidden"
            >
              <div aria-hidden className="abs-hero-glow absolute inset-0" />
              <div className="relative flex flex-col items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d8aa67]/60 bg-black/40">
                  <iconify-icon icon="solar:play-bold" width="22" height="22" className="text-[#f0c681] ml-1" />
                </span>
                <p className="text-xs uppercase tracking-widest text-zinc-400">{c.experience.videoPlaceholder}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-5">{c.experience.intro}</p>
              <ol className="space-y-3">
                {c.experience.items.map((item, i) => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2D516C] bg-[#1B2232]/60 font-mono text-[11px] text-[#9cc3df]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-zinc-200">{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-zinc-600 leading-relaxed">{c.experience.disclaimer}</p>
            </div>
          </div>
        </Section>
      </Container>
      </div>

      {/* Testimonials */}
      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>In their words</p>
          <h2 className={`${h2} mb-12`}>Artists who have worked with Isiata.</h2>
          <Testimonials />
        </Section>
      </Container>

      {/* 06 Additional value */}
      <div className="abs-section-ember">
      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.additional.eyebrow}</p>
          <h2 className={`${h2} mb-12`}>{c.additional.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.additional.items.map((item, i) => (
              <div key={item.id} className={`abs-panel ${['abs-panel-gold', 'abs-panel-indigo', 'abs-panel-ember'][i]} hover-lift p-6 md:p-8`}>
                <span
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full border ${
                    ['border-[#d8aa67]/40 bg-[#d8aa67]/10 text-[#f0c681]', 'border-[#4F86AE]/60 bg-[#2D516C]/20 text-[#9cc3df]', 'border-[#D0663F]/50 bg-[#A44429]/15 text-[#f0a184]'][i]
                  }`}
                >
                  <iconify-icon icon={ADDITIONAL_ICONS[item.id]} width="22" height="22" />
                </span>
                <h3 className="text-xl font-display uppercase tracking-normal text-gold mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Container>
      </div>

      {/* 07 Implementation */}
      <div className="abs-section-indigo">
        <Container bordered className={sectionBorder}>
          <Section reveal>
            <p className={eyebrow}>{c.implementation.eyebrow}</p>
            <h2 className={`${h2} mb-4`}>{c.implementation.title}</h2>
            <p className={`${bodyText} mb-12`}>{c.implementation.subtitle}</p>
            <LaunchTimeline />
            <p className="mt-8 text-sm text-zinc-500 max-w-2xl">{c.implementation.note}</p>
          </Section>
        </Container>
      </div>

      {/* 08 Bonuses */}
      <div className="abs-section-gold">
      <Container bordered className={sectionBorder}>
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className={eyebrow}>{c.bonuses.eyebrow}</p>
              <h2 className={h2}>{c.bonuses.title}</h2>
              <p className={bodyText}>{c.bonuses.note}</p>
            </div>
            <ul className="space-y-3">
              {c.bonuses.items.map((item, i) => {
                const tone = [
                  { panel: 'abs-panel-gold', num: 'border-[#f0c681]/60 bg-[#f0c681]/10 text-[#f0c681]', icon: 'solar:shield-check-linear' },
                  { panel: 'abs-panel-bronze', num: 'border-[#c98a45]/60 bg-[#b0783c]/15 text-[#e0a869]', icon: 'solar:magnet-linear' },
                  { panel: 'abs-panel-ember', num: 'border-[#D0663F]/60 bg-[#A44429]/20 text-[#f0a184]', icon: 'solar:magnifer-zoom-in-linear' },
                ][i % 3]
                return (
                  <li
                    key={item}
                    className={`abs-panel ${tone.panel} abs-bonus flex items-center gap-5 p-5`}
                    style={{ ['--i' as string]: i }}
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${tone.num}`}>
                      <iconify-icon icon={tone.icon} width="20" height="20" />
                    </span>
                    <span className="flex-1 text-[#f0dfc8]">{item}</span>
                    <span className="font-mono text-xs text-[#d8aa67]/70">+{String(i + 1).padStart(2, '0')}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Section>
      </Container>
      </div>

      {/* 09 Fit */}
      <div id="fit" className="scroll-mt-24">
        <Container bordered className={sectionBorder}>
          <Section reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className={eyebrow}>{c.fit.eyebrow}</p>
                <h2 className={h2}>{c.fit.title}</h2>
                <p className={`${bodyText} mb-5`}>{c.fit.lead}</p>
                <ul className="mb-8 space-y-2.5">
                  {c.fit.for.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <iconify-icon icon="solar:check-circle-linear" width="16" height="16" className="mt-0.5 shrink-0 text-[#d8aa67]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={`${bodyText} space-y-4`}>
                  <p>{c.fit.requirements}</p>
                  <p className="text-white font-medium">{c.fit.notFor}</p>
                </div>
              </div>
              <div className="lg:pt-12">
                <FitCheck ctaLabel={ARTISTS_APPLY_LABEL} />
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* ROI calculator */}
      <div id="roi" className="abs-section-indigo scroll-mt-24">
        <Container bordered className={sectionBorder}>
          <Section reveal>
            <p className={eyebrow}>Run the numbers</p>
            <h2 className={h2}>See what your connected music business could return.</h2>
            <p className={`${bodyText} mb-12`}>
              Move the sliders to match your audience and what you sell. Watch traffic become subscribers,
              subscribers become customers, and see when the investment pays for itself.
            </p>
            <RevenueCalculator />
          </Section>
        </Container>
      </div>

      {/* 10 Investment */}
      <Container bordered className={sectionBorder}>
        <Section reveal>
          <p className={eyebrow}>{c.investment.eyebrow}</p>
          <h2 className={`${h2} mb-12`}>{c.investment.title}</h2>
          <InvestmentCard ctaLabel={ARTISTS_HERO_CTA_LABEL} />
        </Section>
      </Container>

      {/* Closing + application */}
      <div id="abs-closing" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src="/brand/overlays/molten-gold-marble-frame.png"
            alt=""
            className="h-full w-full object-cover opacity-60 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
        <BrandOverlay variant={3} opacity={0.25} />
        <Container bordered className={`relative z-10 ${sectionBorder}`}>
          <Section reveal>
            <div id="apply" className="mx-auto max-w-3xl scroll-mt-24 text-center">
              <p className={eyebrow}>{c.closing.eyebrow}</p>
              <h2 className="text-2xl md:text-4xl font-display uppercase tracking-normal gradient-text-gold mb-4 leading-[1.15]">
                {c.closing.title}
              </h2>
              <p className="text-xl md:text-2xl text-[#d5c8b8] font-light mb-12">{c.closing.subtitle}</p>

              <div className="abs-panel abs-frame relative overflow-hidden p-6 md:p-10 text-left shadow-[0_0_80px_-20px_rgba(216,170,103,0.35)] backdrop-blur-md">
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-display uppercase tracking-normal text-gold mb-3">{c.closing.heading}</h3>
                    <p className="text-sm text-zinc-400 leading-[1.8] max-w-lg">{c.closing.body}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {[1, 2, 3].map((slot) => (
                      <span key={slot} className="h-3 w-3 rotate-45 border border-[#d8aa67]/70 bg-[#d8aa67]/20" />
                    ))}
                    <span className="ml-1 text-[10px] uppercase tracking-widest text-[#f0dfc8]">{c.closing.capacity}</span>
                  </div>
                </div>
                <ApplicationForm ctaLabel={ARTISTS_APPLY_LABEL} />
              </div>
              <p className="mt-12 text-xs text-zinc-600 leading-relaxed">{c.closing.disclaimer}</p>
            </div>
          </Section>
        </Container>
      </div>

      <StickyAuditBar label="Book your audit" />
    </>
  )
}
