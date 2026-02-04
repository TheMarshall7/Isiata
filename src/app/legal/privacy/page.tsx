import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How ISIATA handles your data',
}

export default function PrivacyPage() {
  return (
    <Container bordered className="pt-44 pb-24">
      <Section reveal>
        <h1 className="text-5xl md:text-6xl font-oswald uppercase tracking-tight text-white mb-12">
          Privacy Policy
        </h1>
        <div className="max-w-2xl space-y-8 text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">What We Collect</h2>
            <p>We collect information you provide directly: email addresses for newsletter subscriptions, names and messages through the contact form, and purchase information processed through our payment provider.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">How We Use It</h2>
            <p>Your information is used to deliver purchased products, send updates you opted into, and respond to inquiries. We do not sell or share your data with third parties for marketing purposes.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Third-Party Services</h2>
            <p>We use third-party services for payment processing and email delivery. These services have their own privacy policies governing data handling.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Your Rights</h2>
            <p>You can request deletion of your data or unsubscribe from communications at any time by contacting us directly.</p>
          </div>
          <p className="text-xs text-zinc-600 pt-8 border-t border-white/10">
            This policy may be updated periodically. Last updated February 2026.
          </p>
        </div>
      </Section>
    </Container>
  )
}
