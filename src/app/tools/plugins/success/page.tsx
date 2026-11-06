import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { PLUGINS_HREF } from '@/lib/tools/plugins'
import { describeSku } from '@/lib/tools/purchase-skus'

export default function PluginCheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { sku?: string }
}) {
  const product = searchParams.sku ? describeSku(searchParams.sku) : null

  return (
    <Container className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          {product?.name ?? 'Isiata'}
        </p>
        <h1 className="mb-4 font-display text-4xl uppercase tracking-normal text-gold md:text-5xl">
          Payment received
        </h1>
        <p className="mb-4 text-sm leading-relaxed text-zinc-400 md:text-base">
          Check your email for your serial. Open the plugin, go to Activate, and paste the serial.
          Each serial works on up to 3 computers.
        </p>
        {product?.kind === 'bundle' && (
          <p className="mb-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            One serial unlocks every plugin in the bundle.
          </p>
        )}
        {product?.kind === 'subscription' && (
          <p className="mb-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            One serial unlocks every Isiata plugin while your subscription is active.
          </p>
        )}
        <p className="mb-8 text-xs text-zinc-500">
          No email after a few minutes? Check spam, or contact us from the contact page.
        </p>
        <Link
          href={product?.href ?? PLUGINS_HREF}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
        >
          Back to {product ? product.name : 'plugins'}
          <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
        </Link>
      </div>
    </Container>
  )
}
