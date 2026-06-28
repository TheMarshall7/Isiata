import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ear Trainer — Interactive Ear Training',
  description:
    'Master your musical ear with ISIATA. Practice intervals, chords, scales, perfect pitch, and more with gamified interactive training.',
  alternates: { canonical: '/tools/training/ear-trainer' },
}

export default function EarTrainerLayout({ children }: { children: React.ReactNode }) {
  return children
}
