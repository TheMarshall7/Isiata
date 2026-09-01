'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FunnelHeader } from '@/components/systems/FunnelHeader'
import { BackgroundEffects } from '@/components/layout/BackgroundEffects'
import { ScrollbarVisibility } from '@/components/layout/ScrollbarVisibility'
import { SYSTEMS_FUNNEL_SLUGS } from '@/lib/systems/tiers'

const TRAINER_PREFIX = '/tools/training/ear-trainer'
const CHECKOUT_ORDER_PREFIX = '/tools/checkout/order'

function isSystemsFunnel(pathname: string | null) {
  if (!pathname?.startsWith('/systems/')) return false
  const slug = pathname.slice('/systems/'.length).split('/')[0]
  return SYSTEMS_FUNNEL_SLUGS.includes(slug)
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isTrainer = pathname?.startsWith(TRAINER_PREFIX)
  const isCheckoutOrder = pathname?.startsWith(CHECKOUT_ORDER_PREFIX)
  const isFunnel = isSystemsFunnel(pathname)

  if (isTrainer || isCheckoutOrder) {
    return <>{children}</>
  }

  return (
    <>
      <ScrollbarVisibility />
      <BackgroundEffects />
      {isFunnel ? <FunnelHeader /> : <Header />}
      <main className="relative z-10">{children}</main>
      {!isFunnel && <Footer />}
    </>
  )
}
