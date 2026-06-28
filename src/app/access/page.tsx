import { redirect } from 'next/navigation'
import { CONTACT_HREF } from '@/lib/contact/offerings'

export default function AccessPage() {
  redirect(CONTACT_HREF)
}
