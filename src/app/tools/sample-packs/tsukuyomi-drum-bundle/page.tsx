'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { TsukuyomiDrumBundleFunnel } from '@/components/tools/TsukuyomiDrumBundleFunnel'

export default function TsukuyomiDrumBundlePage() {
  return (
    <>
      <Container bordered className="pt-28 pb-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          Back to Tools
        </Link>
      </Container>

      <Container bordered className="py-12">
        <TsukuyomiDrumBundleFunnel />
      </Container>
    </>
  )
}
