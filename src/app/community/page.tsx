import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageTitle } from '@/components/ui/PageTitle'
import { EmailCapture } from '@/components/forms/EmailCapture'

export const metadata: Metadata = {
  title: 'Community — ISIATA',
  description: 'Join the ISIATA community. Get notified when we open.',
  openGraph: {
    title: 'Community — ISIATA',
    description: 'Join the ISIATA community. Get notified when we open.',
  },
  alternates: { canonical: '/community' },
}

export default function CommunityPage() {
  return (
    <>
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <PageTitle
            text="Community"
            className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12"
            speed={120}
          />
          <p className="text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
            A place for collaborators, supporters, and people who care about the work. Coming soon.
          </p>
          <Link
            href="/access"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white tracking-wide transition-all duration-300"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-300">Back to Access</span>
            <iconify-icon icon="solar:arrow-left-linear" width="20" height="20" className="group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </Section>
      </Container>

      {/* Get notified — highlighted signup */}
      <Container bordered className="py-20 md:py-28 border-t border-white/10">
        <Section reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6 transition-colors duration-300 hover:text-zinc-400">
              Notify me
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-oswald uppercase tracking-tight text-white mb-6 leading-[1.05] transition-all duration-300 hover:tracking-wide">
              Get notified when I open Access
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed max-w-lg mx-auto transition-colors duration-300 hover:text-zinc-300">
              Be first in and be notified of community and ISIATA updates.
            </p>
            <div className="flex justify-center">
              <div className="group/form w-full max-w-lg mx-auto p-8 md:p-10 rounded-lg border border-white/15 bg-white/[0.03] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-white/[0.04] focus-within:border-white/25 focus-within:bg-white/[0.06] focus-within:shadow-lg focus-within:shadow-white/[0.04]">
                <EmailCapture source="community" />
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}
