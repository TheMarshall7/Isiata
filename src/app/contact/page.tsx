import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import {
  CONTACT_ALONGSIDE,
  CONTACT_BOOKING_HREF,
  CONTACT_DELIVERED,
  CONTACT_INQUIRY_HREF,
  type ContactOffering,
} from '@/lib/contact/offerings'

function OfferingCard({ offering }: { offering: ContactOffering }) {
  return (
    <Link
      href={offering.href}
      className="group flashlight-card hover-glow block h-full border border-[#d8aa67]/20 bg-transparent p-10 transition-all duration-300 hover:border-[#d8aa67]/65 lg:p-12"
    >
      <iconify-icon
        icon={offering.icon}
        width="48"
        height="48"
        className="icon-hover-drift mb-6 text-gold"
      />
      <h3 className="mb-6 text-2xl font-semibold text-gold">{offering.title}</h3>
      <div className="mb-6 space-y-1">
        {offering.lines.map((line) => (
          <p key={line} className="leading-relaxed text-zinc-400">
            {line}
          </p>
        ))}
      </div>
      <p className="mb-8 text-sm italic text-zinc-500">{offering.tagline}</p>
      <span className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-all duration-300 group-hover:gap-3">
        {offering.cta}
        <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
      </span>
    </Link>
  )
}

function SectionHeader({ label, description }: { label: string; description: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</p>
      <p className="text-lg leading-relaxed text-zinc-400">{description}</p>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <Container bordered className="flex min-h-[100svh] flex-col justify-center pt-24 pb-12 md:pt-28 md:pb-16">
        <Section reveal className="w-full">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <div data-reveal style={{ '--d': 0 } as CSSProperties}>
                <PageTitle
                  text="Contact"
                  className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold"
                  speed={120}
                />
              </div>

              <div data-reveal style={{ '--d': 2 } as CSSProperties} className="max-w-2xl space-y-5 text-lg leading-relaxed text-gold md:text-xl">
                <p>Select what fits below, then book a call to get started.</p>
                <p className="text-[#d5c8b8]">
                  Collaborative work and fully delivered services. Coaching, systems, and community.
                  Not sure yet? Send a general inquiry.
                </p>
              </div>

              <div data-reveal style={{ '--d': 3 } as CSSProperties} className="mt-8 flex flex-wrap gap-4 md:mt-10">
                <Link href={CONTACT_BOOKING_HREF} className="btn-primary">
                  Book a call
                  <iconify-icon icon="solar:calendar-linear" width="16" height="16" />
                </Link>
                <a href={CONTACT_INQUIRY_HREF} className="btn-secondary">
                  General inquiry
                  <iconify-icon icon="solar:letter-linear" width="16" height="16" />
                </a>
              </div>
            </div>

            <div
              style={{ '--d': 1 } as CSSProperties}
              className="reveal-media relative mx-auto flex aspect-[3/4] w-full max-h-[min(68svh,38rem)] max-w-[min(100%,28rem)] items-center justify-center overflow-hidden border border-[#d8aa67]/25 bg-black p-10 sm:p-14 lg:mx-0 lg:ml-auto"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <img
                  src="/brand/overlays/overlay-6.png"
                  alt=""
                  className="reveal-media-img h-full w-full object-cover object-center opacity-90 mix-blend-screen"
                />
              </div>
              <img
                src="/brand/isiata-logo-contact.png"
                alt="ISIATA"
                className="relative z-10 h-auto w-full max-w-[200px] object-contain sm:max-w-[260px]"
              />
            </div>
          </div>
        </Section>
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 py-24">
        <Section reveal>
          <SectionHeader
            label="Alongside you"
            description="Collaborative work. You stay in the process."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {CONTACT_ALONGSIDE.map((offering) => (
              <OfferingCard key={offering.title} offering={offering} />
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 py-24">
        <Section reveal>
          <SectionHeader
            label="Fully delivered"
            description="We execute. You receive the finished result."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CONTACT_DELIVERED.map((offering) => (
              <OfferingCard key={offering.title} offering={offering} />
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 py-24">
        <Section reveal>
          <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Coming soon
          </p>

          <Link
            href="/community"
            className="group flashlight-card hover-glow flex flex-col items-start gap-6 border border-[#d8aa67]/20 bg-transparent p-8 transition-all duration-300 hover:border-[#d8aa67]/65 sm:flex-row sm:items-center sm:gap-8 sm:p-10"
          >
            <div className="flex-shrink-0">
              <iconify-icon
                icon="solar:users-group-two-rounded-linear"
                width="56"
                height="56"
                className="icon-hover-drift text-gold"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="mb-2 text-2xl font-semibold text-gold">Community</h2>
              <p className="leading-relaxed text-zinc-400">
                A place for collaborators, supporters, and people who care about the work. Early
                access, exclusive drops, and updates. Join the waitlist.
              </p>
            </div>
            <div className="flex-shrink-0 self-center sm:self-auto">
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="24"
                height="24"
                className="text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
              />
            </div>
          </Link>
        </Section>
      </Container>
    </>
  )
}
