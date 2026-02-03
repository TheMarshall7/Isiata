import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch',
}

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white">
            Contact
          </h1>
        </Section>
      </Container>

      {/* Contact Form */}
      <Container bordered maxWidth="2xl" className="py-24">
        <Section reveal>
          <form className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={8}
                required
                className="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-white text-black px-8 py-3 font-semibold hover:bg-zinc-200 transition-colors"
            >
              Send
            </button>
          </form>

          <p className="text-xs text-zinc-600 mt-8">
            We typically respond within 2-3 business days.
          </p>
        </Section>
      </Container>
    </>
  )
}
