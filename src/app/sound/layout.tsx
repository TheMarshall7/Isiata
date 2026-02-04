import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sound — Music Releases, Discography & Visual Media',
  description: 'Explore ISIATA sound releases, singles, and the THEY MIGHT BE MAD EP. Atmosphere you can step into. Movement that holds attention.',
  openGraph: {
    title: 'ISIATA Sound — Music Releases & Discography',
    description: 'Singles, EPs, and visual media. Atmosphere you can step into. Movement that holds attention.',
  },
  alternates: { canonical: '/sound' },
}

const musicSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: 'THEY MIGHT BE MAD',
    albumProductionType: 'StudioAlbum',
    albumReleaseType: 'EPRelease',
    byArtist: { '@type': 'MusicGroup', name: 'ISIATA' },
    datePublished: '2022-10-29',
    numTracks: 5,
    track: [
      { '@type': 'MusicRecording', name: 'THEY MIGHT BE MAD', position: 1 },
      { '@type': 'MusicRecording', name: 'TELL ME WHAT YOU WANT', position: 2 },
      { '@type': 'MusicRecording', name: 'GODSPEED', position: 3 },
      { '@type': 'MusicRecording', name: 'SAY & IGNORANCE', position: 4 },
      { '@type': 'MusicRecording', name: 'WAR', position: 5 },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: 'Say',
    byArtist: { '@type': 'MusicGroup', name: 'ISIATA' },
    datePublished: '2023-06-10',
    duration: 'PT2M',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: 'No Need',
    byArtist: { '@type': 'MusicGroup', name: 'ISIATA' },
    datePublished: '2023-03-31',
    duration: 'PT3M',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: 'Two Tales',
    byArtist: { '@type': 'MusicGroup', name: 'ISIATA' },
    datePublished: '2020-08-08',
    duration: 'PT4M',
  },
]

export default function SoundLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {musicSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  )
}
