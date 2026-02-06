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

const WHAT_TO_EXPECT = [
  { icon: 'solar:clock-circle-linear', text: 'Confirmation within 24 hours' },
  { icon: 'solar:lock-password-linear', text: 'Confidential and professional' },
  { icon: 'solar:calendar-mark-linear', text: 'Easy reschedule if needed' },
]

const TESTIMONIALS = [
  {
    name: 'Moqemae',
    avatar: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a014e0890b9.png',
    screenshot: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a323c0890ba.png',
  },
  {
    name: 'Jozy',
    avatar: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc120a7728534876c64b.png',
    screenshot: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc1276f60c1083fd0333.png',
  },
]

const TRUST_SIGNALS = [
  { value: '50+', label: 'Sessions Delivered' },
  { value: '100%', label: 'Response Rate' },
  { value: '24h', label: 'Avg. Response' },
]

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

      {/* Page header with urgency */}
      <Container bordered className="pb-8">
        <Section reveal>
          {/* Scarcity indicator */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-zinc-400">Limited availability this month</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-oswald uppercase tracking-tight text-white mb-4">
            Secure Your Session
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mb-8">
            Select your preferred time below. Sessions fill quickly — book now to lock in your spot.
          </p>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.label} className="text-center">
                <p className="text-2xl font-semibold text-white">{signal.value}</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider">{signal.label}</p>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      {/* Main content grid */}
      <Container bordered className="py-12">
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar - takes 2 columns */}
            <div className="lg:col-span-2">
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
            </div>

            {/* Sidebar - conversion elements */}
            <div className="space-y-6">
              {/* What to expect */}
              <div className="border border-white/10 bg-surface-raised depth-shadow p-6 rounded-lg">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">What to Expect</h3>
                <ul className="space-y-4">
                  {WHAT_TO_EXPECT.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <iconify-icon
                        icon={item.icon}
                        width="20"
                        height="20"
                        className="text-white shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-zinc-400">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process steps */}
              <div className="border border-white/10 bg-surface-raised depth-shadow p-6 rounded-lg">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-xs text-white shrink-0">1</span>
                    <div>
                      <p className="text-sm text-white font-medium">Choose a time</p>
                      <p className="text-xs text-zinc-500">Pick any available slot</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-xs text-white shrink-0">2</span>
                    <div>
                      <p className="text-sm text-white font-medium">Confirm details</p>
                      <p className="text-xs text-zinc-500">Brief overview of your project</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-xs text-white shrink-0">3</span>
                    <div>
                      <p className="text-sm text-white font-medium">Get confirmed</p>
                      <p className="text-xs text-zinc-500">Receive calendar invite within 24h</p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Questions CTA */}
              <div className="border border-white/10 bg-surface-raised depth-shadow p-6 rounded-lg text-center">
                <iconify-icon
                  icon="solar:chat-round-dots-linear"
                  width="32"
                  height="32"
                  className="text-zinc-600 mx-auto mb-3"
                />
                <p className="text-sm text-zinc-400 mb-4">Have questions before booking?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-white hover:text-zinc-300 transition-colors"
                >
                  Get in touch
                  <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </Container>

      {/* Testimonials */}
      <Container bordered className="py-16">
        <Section reveal>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-8 text-center">What Artists Are Saying</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="border border-white/10 bg-surface-raised depth-shadow p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-zinc-500">Artist</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={testimonial.screenshot}
                    alt={`Testimonial from ${testimonial.name}`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      {/* ISIATA Logo */}
      <Container bordered className="py-8">
        <div className="flex justify-center">
          <img
            src="https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67acbb51f52f42753175f9fe.png"
            alt="ISIATA"
            className="h-8 opacity-40"
          />
        </div>
      </Container>

      {/* Bottom reassurance */}
      <Container bordered className="py-8 border-t border-white/10">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <iconify-icon icon="solar:shield-check-linear" width="18" height="18" />
            <span>Secure booking</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <iconify-icon icon="solar:calendar-linear" width="18" height="18" />
            <span>Free to reschedule</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <iconify-icon icon="solar:chat-round-check-linear" width="18" height="18" />
            <span>Quick confirmation</span>
          </div>
        </div>
      </Container>
    </>
  )
}
