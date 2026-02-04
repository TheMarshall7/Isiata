import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Licensing — Sample Packs, Tools & Content',
  description: 'Licensing terms for ISIATA sample packs, digital tools, and content. Royalty-free drum samples for commercial use. Melody licensing details included.',
  alternates: { canonical: '/legal/licensing' },
}

export default function LicensingPage() {
  return (
    <Container bordered className="pt-44 pb-24">
      <Section reveal>
        <h1 className="text-5xl md:text-6xl font-oswald uppercase tracking-tight text-white mb-12">
          Licensing
        </h1>
        <div className="max-w-2xl space-y-8 text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Sound & Sample Packs</h2>
            <p>All drum and percussion samples are royalty-free for use in commercial and non-commercial productions. Melody layers are royalty-free for up to 1,000,000 streams or until a major placement is secured.</p>
            <p className="mt-3">Sounds may not be resold, redistributed, or repackaged as standalone sample packs or libraries.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Digital Products & Tools</h2>
            <p>Digital tools and plugins are licensed per-user. One purchase grants a single-user license for personal and commercial use across unlimited projects.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Content & Media</h2>
            <p>All visual, written, and audio content on this site is the property of ISIATA unless otherwise noted. Unauthorized reproduction or distribution is prohibited.</p>
          </div>
          <p className="text-xs text-zinc-600 pt-8 border-t border-white/10">
            For licensing inquiries beyond standard terms, reach out via the contact page.
          </p>
        </div>
      </Section>
    </Container>
  )
}
