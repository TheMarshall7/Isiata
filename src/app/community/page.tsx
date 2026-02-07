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
          <p className="text-xl text-zinc-400 mb-10 max-w-xl">
            A place for collaborators, supporters, and people who care about the work. Coming soon.
          </p>
          <Link
            href="/access"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to Access</span>
            <iconify-icon icon="solar:arrow-left-linear" width="20" height="20" />
          </Link>
        </Section>
      </Container>

      {/* Get notified — highlighted signup */}
      <Container bordered className="py-20 md:py-28 border-t border-white/10">
        <Section reveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
              Get notified when we open
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-2 leading-relaxed">
              Be first in. One email when the community is live—no spam, no clutter.
            </p>
            <p className="text-sm text-zinc-500 mb-10">
              Early access, exclusive drops, and a place for the people behind the work.
            </p>
            <div className="flex justify-center">
              <div className="w-full max-w-lg mx-auto p-8 md:p-10 rounded-lg border border-white/15 bg-white/[0.03]">
                <EmailCapture source="community" />
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}
