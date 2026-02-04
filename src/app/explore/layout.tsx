import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore — Discover Sound, Garments, Tools & Access',
  description: 'Discover everything ISIATA offers across sound, garments, production tools, and private access. Culture over category.',
  openGraph: {
    title: 'Explore ISIATA — Sound, Garments, Tools & Access',
    description: 'Discover everything across sound, garments, production tools, and private access.',
  },
  alternates: { canonical: '/explore' },
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
