'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CONTACT_HREF } from '@/lib/contact/offerings'

export default function ContactInquiryPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to send')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

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

      <Container bordered className="pt-8 pb-16">
        <Section reveal>
          <h1 className="text-4xl md:text-5xl font-oswald uppercase tracking-tight text-white mb-4">
            General inquiry
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
            Not ready to book? Send a message and we will respond within 2 to 3 business days.
          </p>
        </Section>
      </Container>

      <Container bordered maxWidth="2xl" className="py-24 border-t border-white/10">
        <Section reveal>
          {status === 'sent' ? (
            <div className="text-center py-16">
              <iconify-icon
                icon="solar:check-circle-linear"
                width="64"
                height="64"
                className="text-white mx-auto mb-6"
              />
              <h2 className="text-2xl font-semibold text-white mb-3">Message sent</h2>
              <p className="text-zinc-400 mb-8">We typically respond within 2 to 3 business days.</p>
              <button
                onClick={() => setStatus('idle')}
                className="border border-white/10 text-zinc-400 px-6 py-2.5 text-sm hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-surface-raised border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 hover:border-white/20 transition-all duration-300"
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
                  className="w-full bg-surface-raised border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 hover:border-white/20 transition-all duration-300"
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
                  className="w-full bg-surface-raised border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 hover:border-white/20 transition-all duration-300"
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
                  className="w-full bg-surface-raised border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 hover:border-white/20 transition-all duration-300 resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-white text-black px-8 py-3 font-semibold hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/5 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </Section>
      </Container>
    </>
  )
}
