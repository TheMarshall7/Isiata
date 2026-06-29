import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ear Mastery, Interactive Ear Training',
  description:
    'Tune your ear with ISIATA Ear Mastery. Practice intervals, chords, scales, and more with interactive training.',
  alternates: { canonical: '/tools/training/ear-trainer' },
}

export default function EarTrainerLayout({ children }: { children: React.ReactNode }) {
  return children
}
