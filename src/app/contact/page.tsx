import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import { ISIATA_LOGO_URL } from '@/lib/constants'
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
      className="group flashlight-card hover-depth hover-glow border border-white/10 bg-surface-raised depth-shadow p-10 lg:p-12 block h-full"
    >
      <iconify-icon
        icon={offering.icon}
        width="48"
        height="48"
        className="text-white mb-6 group-hover:scale-110 transition-transform duration-500"
      />
      <h3 className="text-2xl font-semibold text-white mb-6">{offering.title}</h3>
      <div className="space-y-1 mb-6">
        {offering.lines.map((line) => (
          <p key={line} className="text-zinc-400 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
      <p className="text-sm text-zinc-500 italic mb-8">{offering.tagline}</p>
      <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all duration-300">
        {offering.cta}
        <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
      </span>
    </Link>
  )
}

function SectionHeader({ label, description }: { label: string; description: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">{label}</p>
      <p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <Container bordered className="pt-32 pb-20">
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <PageTitle
                text="Contact"
                className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-8"
                speed={120}
              />

              <div className="max-w-2xl space-y-6 text-xl text-zinc-300 leading-relaxed">
                <p>Select what fits below, then book a call to get started.</p>
                <p className="text-zinc-400">
                  Collaborative work and fully delivered services. Coaching, systems, and community.
                  Not sure yet? Send a general inquiry.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={CONTACT_BOOKING_HREF}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Book a call
                  <iconify-icon icon="solar:calendar-linear" width="18" height="18" />
                </Link>
                <a
                  href={CONTACT_INQUIRY_HREF}
                  className="inline-flex items-center justify-center gap-2 border border-white/15 text-zinc-300 px-8 py-3 rounded-full text-sm font-medium hover:text-white hover:border-white/30 transition-colors"
                >
                  General inquiry
                  <iconify-icon icon="solar:letter-linear" width="18" height="18" />
                </a>
              </div>
            </div>

            <div className="relative aspect-[3/4] max-w-md lg:max-w-none mx-auto lg:mx-0 w-full border border-white/10 bg-black overflow-hidden depth-shadow flex items-center justify-center p-12 sm:p-16">
              <img
                src={ISIATA_LOGO_URL}
                alt="ISIATA"
                className="w-full max-w-[180px] sm:max-w-[220px] h-auto object-contain"
              />
            </div>
          </div>
        </Section>
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <Section reveal>
          <SectionHeader
            label="Alongside you"
            description="Collaborative work. You stay in the process."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CONTACT_ALONGSIDE.map((offering) => (
              <OfferingCard key={offering.title} offering={offering} />
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <Section reveal>
          <SectionHeader
            label="Fully delivered"
            description="We execute. You receive the finished result."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONTACT_DELIVERED.map((offering) => (
              <OfferingCard key={offering.title} offering={offering} />
            ))}
          </div>
        </Section>
      </Container>

      <Container bordered className="py-24 border-t border-white/10">
        <Section reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-8">
            Coming soon
          </p>

          <Link
            href="/community"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 p-8 sm:p-10 flashlight-card hover-depth hover-glow border border-white/10 bg-surface-raised depth-shadow"
          >
            <div className="flex-shrink-0">
              <iconify-icon
                icon="solar:users-group-two-rounded-linear"
                width="56"
                height="56"
                className="text-white group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-white mb-2">Community</h2>
              <p className="text-zinc-400 leading-relaxed">
                A place for collaborators, supporters, and people who care about the work. Early
                access, exclusive drops, and updates. Join the waitlist.
              </p>
            </div>
            <div className="flex-shrink-0 self-center sm:self-auto">
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="24"
                height="24"
                className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </Link>
        </Section>
      </Container>
    </>
  )
}
