import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import { CONTACT_INQUIRY_HREF } from '@/lib/contact/offerings'

export default function ContactPage() {
  return (
    <>
      <Container bordered className="flex min-h-[100svh] flex-col justify-center pt-24 pb-12 md:pt-28 md:pb-16">
        <Section reveal className="w-full">
          <div className="hero-pair">
            <div className="min-w-0">
              <div data-reveal style={{ '--d': 0 } as CSSProperties}>
                <PageTitle
                  text="Contact"
                  className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold"
                  speed={120}
                />
              </div>

              <div data-reveal style={{ '--d': 2 } as CSSProperties} className="max-w-2xl space-y-5 text-lg leading-relaxed text-gold md:text-xl">
                <p>Send a message to get started.</p>
                <p className="text-[#d5c8b8]">
                  Looking for music or business services? See the Services page. Anything else, send a
                  general inquiry.
                </p>
              </div>

              <div data-reveal style={{ '--d': 3 } as CSSProperties} className="mt-8 flex flex-wrap gap-4 md:mt-10">
                <a href={CONTACT_INQUIRY_HREF} className="btn-primary">
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
