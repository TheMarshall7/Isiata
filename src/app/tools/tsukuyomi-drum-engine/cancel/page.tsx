import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { TSUKUYOMI_DRUM_ENGINE, TSUKUYOMI_DRUM_ENGINE_HREF } from '@/lib/tools/tsukuyomi-drum-engine'

export default function TsukuyomiCheckoutCancelPage() {
  return (
    <Container className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          {TSUKUYOMI_DRUM_ENGINE.title}
        </p>
        <h1 className="mb-4 font-display text-4xl uppercase tracking-normal text-gold md:text-5xl">
          Checkout cancelled
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-zinc-400 md:text-base">
          No charge was made. You can return to the product page anytime.
        </p>
        <Link
          href={TSUKUYOMI_DRUM_ENGINE_HREF}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
        >
          Back to Tsukuyomi
          <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
        </Link>
      </div>
    </Container>
  )
}
