'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const PRODUCT = {
  title: 'Tsukuyomi Drum Bundle',
  subtitle: 'Premium Archive',
  image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67b7ebca7c922f63503b66c7.png',
  price: '$50',
  originalPrice: '$150',
  description: 'A premium drum sample pack focused on high-quality, impactful drum sounds — designed for use in major DAWs.',
  format: '32-bit WAV',
  highlights: [
    '100+ premium drum sounds',
    '19 core sound categories',
    '5 bonus acoustic kits',
    'Royalty-free for commercial use',
    'Compatible with all major DAWs',
  ],
  // ── GoHighLevel Configuration ──────────────────────────────────
  // Replace this with your GHL order form / funnel URL.
  // Option A: Embed an order form via iframe
  // Option B: Redirect to a GHL-hosted checkout page
  ghlOrderFormUrl: '',
}

export default function CheckoutPage() {
  const hasGhlForm = PRODUCT.ghlOrderFormUrl.length > 0

  return (
    <>
      {/* Back link */}
      <Container bordered className="pt-28 pb-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Tools
        </Link>
      </Container>

      {/* Checkout Layout */}
      <Container bordered className="py-12">
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — Product Summary */}
            <div>
              <div className="aspect-square overflow-hidden border border-white/10 mb-8">
                <img
                  src={PRODUCT.image}
                  alt={PRODUCT.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-600 mb-2">What you get</p>
                  <ul className="space-y-2.5">
                    {PRODUCT.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                        <iconify-icon
                          icon="solar:check-circle-linear"
                          width="18"
                          height="18"
                          className="text-white shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Format</span>
                    <span className="text-zinc-300">{PRODUCT.format}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Delivery</span>
                    <span className="text-zinc-300">Instant download via email</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">License</span>
                    <span className="text-zinc-300">Royalty-free</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Pricing + GHL Payment */}
            <div>
              <div className="sticky top-28">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1 inline-block mb-6">
                  Sample Pack
                </span>
                <h1 className="text-3xl md:text-4xl font-oswald uppercase tracking-tight text-white mb-2">
                  {PRODUCT.title}
                </h1>
                <p className="text-sm text-zinc-500 uppercase tracking-widest mb-8">
                  {PRODUCT.subtitle}
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                  {PRODUCT.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-4xl font-semibold text-white">{PRODUCT.price}</span>
                  <span className="text-lg text-zinc-600 line-through">{PRODUCT.originalPrice}</span>
                </div>

                {/* GoHighLevel Payment Integration */}
                <div className="border border-white/10 bg-black/40 rounded">
                  {hasGhlForm ? (
                    // ── GHL Embedded Order Form ──────────────────────
                    // Your GoHighLevel order form loads here.
                    // If you prefer a redirect instead, replace the
                    // iframe with a button that links to the GHL URL.
                    <iframe
                      src={PRODUCT.ghlOrderFormUrl}
                      className="w-full min-h-[500px] rounded"
                      title="Order Form"
                    />
                  ) : (
                    // ── Placeholder until GHL is connected ───────────
                    <div className="p-8 text-center">
                      <iconify-icon
                        icon="solar:cart-large-minimalistic-linear"
                        width="48"
                        height="48"
                        className="text-zinc-700 mx-auto mb-4"
                      />
                      <p className="text-zinc-400 text-sm mb-2">
                        Payment integration loading
                      </p>
                      <p className="text-zinc-600 text-xs">
                        Connect your GoHighLevel order form URL to enable checkout
                      </p>
                    </div>
                  )}
                </div>

                {/* Trust signals */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <iconify-icon icon="solar:shield-check-linear" width="24" height="24" className="text-zinc-600 mx-auto mb-2" />
                    <p className="text-[11px] text-zinc-600">Secure Checkout</p>
                  </div>
                  <div className="text-center">
                    <iconify-icon icon="solar:download-minimalistic-linear" width="24" height="24" className="text-zinc-600 mx-auto mb-2" />
                    <p className="text-[11px] text-zinc-600">Instant Download</p>
                  </div>
                  <div className="text-center">
                    <iconify-icon icon="solar:chat-round-check-linear" width="24" height="24" className="text-zinc-600 mx-auto mb-2" />
                    <p className="text-[11px] text-zinc-600">Email Support</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Section>
      </Container>
    </>
  )
}
