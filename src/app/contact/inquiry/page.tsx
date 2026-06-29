import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import {
  CONTACT_HREF,
  CONTACT_INQUIRY_EMAIL,
  CONTACT_INQUIRY_HREF,
} from '@/lib/contact/offerings'

export default function ContactInquiryPage() {
  return (
    <>
      <Container bordered className="pt-28 pb-4">
        <Link
          href={CONTACT_HREF}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Contact
        </Link>
      </Container>

      <Container bordered maxWidth="2xl" className="pt-8 pb-24">
        <Section reveal>
          <div className="text-center max-w-lg mx-auto py-12">
            <iconify-icon
              icon="solar:letter-linear"
              width="56"
              height="56"
              className="text-white mx-auto mb-6"
            />
            <h1 className="text-4xl md:text-5xl font-oswald uppercase tracking-tight text-white mb-4">
              General inquiry
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              Open your email app and send us a message. We typically respond within 2 to 3 business
              days.
            </p>
            <a
              href={CONTACT_INQUIRY_HREF}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Email {CONTACT_INQUIRY_EMAIL}
              <iconify-icon icon="solar:arrow-right-linear" width="18" height="18" />
            </a>
          </div>
        </Section>
      </Container>
    </>
  )
}
