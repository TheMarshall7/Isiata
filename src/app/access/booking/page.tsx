import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CALENDAR_EMBED_URL } from '@/lib/constants'
import { CalendarEmbed } from './CalendarEmbed'

export const metadata: Metadata = {
  title: 'Book a session',
  description: 'Schedule creative direction, mixing, private sessions, or live performance with ISIATA.',
  openGraph: {
    title: 'Book a session | ISIATA Access',
    description: 'Schedule creative direction, mixing, private sessions, or live performance with ISIATA.',
  },
  alternates: { canonical: '/access/booking' },
}

export default function BookingPage() {
  return (
    <>
      {/* Back link */}
      <Container bordered className="pt-28 pb-4">
        <Link
          href="/access"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Access
        </Link>
      </Container>

      {/* Page header */}
      <Container bordered className="pb-8">
        <Section reveal>
          <h1 className="text-5xl md:text-6xl font-oswald uppercase tracking-tight text-white mb-4">
            Make an appointment
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Choose a time below. Sessions are by request and subject to availability.
          </p>
        </Section>
      </Container>

      {/* Calendar embed — iframe is transparent and sized to avoid scroll/cutoff */}
      <Container bordered className="py-12">
        <Section reveal>
          {CALENDAR_EMBED_URL ? (
            <CalendarEmbed />
          ) : (
            <div className="min-h-[600px] flex items-center justify-center p-8 border border-white/10 bg-surface-raised rounded-lg">
              <div className="text-center max-w-md">
                <iconify-icon
                  icon="solar:calendar-linear"
                  width="48"
                  height="48"
                  className="text-zinc-600 mx-auto mb-4"
                />
                <p className="text-zinc-400 text-sm mb-2">Calendar embed</p>
                <p className="text-zinc-500 text-xs">
                  Set <code className="text-zinc-600 bg-white/5 px-1 py-0.5 rounded">CALENDAR_EMBED_URL</code> in{' '}
                  <code className="text-zinc-600 bg-white/5 px-1 py-0.5 rounded">src/lib/constants.ts</code> to
                  enable scheduling.
                </p>
              </div>
            </div>
          )}
        </Section>
      </Container>
    </>
  )
}
