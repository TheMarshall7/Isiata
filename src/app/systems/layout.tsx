import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Systems | Backend Business Infrastructure for Artists',
  description:
    'Backend business systems for artists, musicians, and creatives. Booking Foundation from $2,500, Revenue System, Client Machine, and Growth Infrastructure. Turn your audience into paying clients.',
  openGraph: {
    title: 'ISIATA Systems | Backend Business Infrastructure for Artists',
    description:
      'Four tiers of backend systems for artists: booking, revenue, client automation, and full growth infrastructure.',
  },
  alternates: { canonical: '/systems' },
}

export default function SystemsLayout({ children }: { children: React.ReactNode }) {
  return children
}
