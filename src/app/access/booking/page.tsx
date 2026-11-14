import { redirect } from 'next/navigation'
import { CONTACT_HREF } from '@/lib/contact/offerings'

export default function AccessBookingPage() {
  redirect(CONTACT_HREF)
}
