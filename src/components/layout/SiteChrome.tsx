'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackgroundEffects } from '@/components/layout/BackgroundEffects'
import { ScrollbarVisibility } from '@/components/layout/ScrollbarVisibility'

const TRAINER_PREFIX = '/tools/training/ear-trainer'
const CHECKOUT_ORDER_PREFIX = '/tools/checkout/order'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isTrainer = pathname?.startsWith(TRAINER_PREFIX)
  const isCheckoutOrder = pathname?.startsWith(CHECKOUT_ORDER_PREFIX)

  if (isTrainer || isCheckoutOrder) {
    return <>{children}</>
  }

  return (
    <>
      <ScrollbarVisibility />
      <BackgroundEffects />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  )
}
