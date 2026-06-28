import { redirect } from 'next/navigation'
import { DRUM_BUNDLE_CHECKOUT_HREF } from '@/lib/tools/drum-bundle'

export default function CheckoutPage() {
  redirect(DRUM_BUNDLE_CHECKOUT_HREF)
}
