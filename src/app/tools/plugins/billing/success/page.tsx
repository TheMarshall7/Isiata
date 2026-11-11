import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { PLUGINS_HREF } from '@/lib/tools/plugins'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Payment received | Plugins',
    description: 'Your Isiata plugin purchase went through.',
    path: `${PLUGINS_HREF}/billing/success`,
    keywords: ['Isiata', 'plugins', 'receipt'],
    noIndex: true,
  }),
}

export default function PluginBillingSuccessPage() {
  return (
    <Container className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Isiata plugins</p>
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#d8aa67]/50">
          <iconify-icon icon="solar:check-read-linear" width="26" height="26" className="text-[#d8aa67]" />
        </div>
        <h1 className="mb-4 font-display text-4xl uppercase tracking-normal text-gold md:text-5xl">
          Payment received
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-zinc-400 md:text-base">
          Thank you. Your receipt is on its way to your email, with the download and install steps. Keep the
          email somewhere safe, since it is your record of purchase.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={PLUGINS_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8aa67]/60 px-6 py-3 text-sm font-medium text-[#f0dfc8] transition-colors hover:border-[#f0c681] hover:bg-[#b7792a]/10"
          >
            Back to plugins
            <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
          </Link>
          <Link
            href="/contact/inquiry"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
          >
            Need help? Contact us
          </Link>
        </div>
      </div>
    </Container>
  )
}
