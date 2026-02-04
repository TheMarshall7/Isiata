import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions governing the use of the ISIATA website, digital products, and services. All sales of digital products are final.',
  alternates: { canonical: '/legal/terms' },
}

export default function TermsPage() {
  return (
    <Container bordered className="pt-44 pb-24">
      <Section reveal>
        <h1 className="text-5xl md:text-6xl font-oswald uppercase tracking-tight text-white mb-12">
          Terms of Use
        </h1>
        <div className="max-w-2xl space-y-8 text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Acceptance</h2>
            <p>By accessing this website, you agree to these terms. If you do not agree, do not use the site.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Purchases</h2>
            <p>All sales of digital products are final. Refunds are handled on a case-by-case basis at our discretion. Products are delivered digitally via email after purchase.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Use of Content</h2>
            <p>You may not reproduce, distribute, or create derivative works from site content without written permission. Purchased products are subject to their specific license terms.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Limitation of Liability</h2>
            <p>ISIATA provides products and services as-is. We are not liable for any damages arising from the use of our products or website.</p>
          </div>
          <p className="text-xs text-zinc-600 pt-8 border-t border-white/10">
            These terms may be updated at any time. Continued use of the site constitutes acceptance of any changes.
          </p>
        </div>
      </Section>
    </Container>
  )
}
