import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { PLUGINS_HREF } from '@/lib/tools/plugins'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Checkout cancelled | Plugins',
    description: 'Your Isiata plugin checkout was cancelled. No charge was made.',
    path: `${PLUGINS_HREF}/billing/cancel`,
    keywords: ['Isiata', 'plugins', 'checkout'],
    noIndex: true,
  }),
}

export default function PluginBillingCancelPage() {
  return (
    <Container className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Isiata plugins</p>
        <h1 className="mb-4 font-display text-4xl uppercase tracking-normal text-gold md:text-5xl">
          Checkout cancelled
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-zinc-400 md:text-base">
          No charge was made. You can come back to the plugin page and start again whenever you are ready.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={PLUGINS_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8aa67]/60 px-6 py-3 text-sm font-medium text-[#f0dfc8] transition-colors hover:border-[#f0c681] hover:bg-[#b7792a]/10"
          >
            Back to plugins
            <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
          </Link>
        </div>
      </div>
    </Container>
  )
}
