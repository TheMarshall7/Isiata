import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'General Inquiry | ISIATA Contact',
  description: 'Send a general inquiry to ISIATA. We typically respond within 2 to 3 business days.',
  alternates: { canonical: '/contact/inquiry' },
}

export default function ContactInquiryLayout({ children }: { children: React.ReactNode }) {
  return children
}
