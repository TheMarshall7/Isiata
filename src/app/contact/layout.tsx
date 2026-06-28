import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | ISIATA',
  description:
    'Book creative direction, mixing, session work, coaching, live performance, or explore business systems. Collaborative and fully delivered services for artists.',
  openGraph: {
    title: 'ISIATA Contact',
    description:
      'Creative direction, session work, coaching, mixing, live performance, and business systems. Book a call or send an inquiry.',
  },
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
