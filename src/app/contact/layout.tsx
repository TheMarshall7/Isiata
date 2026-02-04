import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Get in Touch with ISIATA',
  description: 'Reach out to ISIATA for inquiries, collaborations, or support. We typically respond within 2-3 business days.',
  openGraph: {
    title: 'Contact ISIATA',
    description: 'Reach out for inquiries, collaborations, or support.',
  },
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
