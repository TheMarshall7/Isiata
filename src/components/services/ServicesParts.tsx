import Link from 'next/link'
import { SERVICE_TERMS, TEARDOWN, type ServiceOffer } from '@/lib/services/content'
import { cn } from '@/lib/utils'

export const sectionLabel = 'text-xs font-semibold uppercase tracking-widest text-zinc-600'

const isInternal = (href: string) => href.startsWith('/') || href.startsWith('#')

function CtaLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return isInternal(href) ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export function OfferCard({ offer, compact = false }: { offer: ServiceOffer; compact?: boolean }) {
  return (
    <article
      id={offer.id}
      className={cn(
        'relative flex scroll-mt-32 flex-col overflow-hidden rounded-lg bg-surface-raised p-7 depth-shadow lg:p-8',
        offer.featured ? 'gradient-border-tsukuyomi hover-glow' : 'border border-[#d8aa67]/25'
      )}
    >
      {offer.featured && <div className="glow-orb -top-20 right-0 h-64 w-64 bg-amber-500/15" aria-hidden />}

      <div className="relative mb-5 flex min-h-[26px] flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{offer.timeline}</p>
        {offer.badge && (
          <span className="rounded-full border border-[#d8aa67]/40 bg-[#d8aa67]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#f0dfc8]">
            {offer.badge}
          </span>
        )}
      </div>

      <h3 className="relative font-display text-2xl uppercase tracking-normal text-gold md:text-3xl">{offer.name}</h3>
      <div className="relative mb-5 mt-4 h-px w-10 bg-white/25" />
      <p className="relative mb-2 text-base font-light leading-[1.7] text-zinc-300">{offer.pitch}</p>
      {offer.forWho && <p className="relative mb-2 text-sm font-light leading-relaxed text-zinc-500">{offer.forWho}</p>}

      {offer.includes && !compact && (
        <div className="relative mb-6 mt-4">
          {offer.includesLead && <p className="mb-1 text-[11px] uppercase tracking-widest text-zinc-500">{offer.includesLead}</p>}
          <ul className="divide-y divide-white/[0.06]">
            {offer.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 py-2.5 text-sm font-light text-zinc-300">
                <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-[#d8aa67]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative mt-auto pt-4">
        {offer.apply ? (
          <div className="mb-2 flex items-baseline gap-3">
            <span className="font-display text-2xl uppercase tracking-normal text-white">By application</span>
          </div>
        ) : (
          <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-3xl font-semibold text-white">{offer.price}</span>
            {offer.perSong && <span className="text-sm text-zinc-500">{offer.perSong}</span>}
          </div>
        )}
        {offer.payment && <p className="mb-1 text-xs leading-relaxed text-zinc-500">{offer.payment}</p>}
        {offer.note && <p className="mb-1 text-xs leading-relaxed text-[#d8aa67]/80">{offer.note}</p>}
        <CtaLink
          href={offer.href}
          className={cn('mt-5 w-fit', offer.featured || offer.apply ? 'btn-primary cta-sheen' : 'btn-secondary')}
        >
          {offer.cta}
          <iconify-icon icon="solar:arrow-right-linear" width="18" height="18" />
        </CtaLink>
      </div>
    </article>
  )
}

export function TermsBlock({ kind }: { kind: 'music' | 'business' | 'all' }) {
  const groups =
    kind === 'all'
      ? [
          { title: 'Music', items: SERVICE_TERMS.music },
          { title: 'Business builds', items: SERVICE_TERMS.business },
          { title: 'Everything', items: SERVICE_TERMS.all },
        ]
      : [
          { title: kind === 'music' ? 'Music' : 'Business builds', items: SERVICE_TERMS[kind] },
          { title: 'Everything', items: SERVICE_TERMS.all },
        ]
  return (
    <section id="terms" className="scroll-mt-32">
      <h2 className={`${sectionLabel} mb-6`}>Terms</h2>
      <div className={cn('grid grid-cols-1 gap-4', groups.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
        {groups.map((g) => (
          <div key={g.title} className="border border-white/10 bg-black/30 p-6">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-zinc-500">{g.title}</p>
            <ul className="space-y-2">
              {g.items.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm font-light leading-relaxed text-zinc-400">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TeardownCta({ title = 'Not sure where to start?' }: { title?: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.06] via-surface-raised/80 to-transparent p-8 depth-shadow-lg lg:p-12">
      <div className="glow-orb left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-amber-500/10" aria-hidden />
      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p className="mb-3 font-spaced text-[10px] uppercase tracking-[0.28em] text-[#d8c3a4]">Paid Teardown · {TEARDOWN.price}</p>
          <h2 className="mb-4 font-display text-3xl uppercase tracking-normal text-white gradient-text md:text-4xl">{title}</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">{TEARDOWN.line}</p>
        </div>
        <a href={TEARDOWN.href} className="btn-primary cta-sheen w-fit">
          {TEARDOWN.label}
          <iconify-icon icon="solar:calendar-linear" width="18" height="18" />
        </a>
      </div>
    </div>
  )
}

export function ServicesHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: string
  lede: string[]
  children?: React.ReactNode
}) {
  return (
    <div className="max-w-4xl pt-6">
      <span className="mb-6 inline-block w-fit border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
        {eyebrow}
      </span>
      <h1 className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold">{title}</h1>
      <div className="max-w-2xl space-y-4 text-base font-light leading-[1.8] text-[#d5c8b8] md:text-lg">
        {lede.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {children}
    </div>
  )
}
