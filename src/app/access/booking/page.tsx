import { redirect } from 'next/navigation'
import { CONTACT_BOOKING_HREF } from '@/lib/contact/offerings'

export default function AccessBookingPage() {
  redirect(CONTACT_BOOKING_HREF)
}
