import { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_CONFIG } from '@/lib/constants'
import {
  musicAlbumSchema,
  musicRecordingSchema,
} from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { SEO_PAGES } from '@/lib/seo/pages'

export const metadata: Metadata = buildPageMetadata(SEO_PAGES.sound)

const musicSchemas = [
  musicAlbumSchema({
    name: 'THEY MIGHT BE MAD',
    datePublished: '2022-10-29',
    numTracks: 5,
    url: '/sound',
    image: SITE_CONFIG.ogImage,
    tracks: [
      { name: 'THEY MIGHT BE MAD', position: 1 },
      { name: 'TELL ME WHAT YOU WANT', position: 2 },
      { name: 'GODSPEED', position: 3 },
      { name: 'SAY & IGNORANCE', position: 4 },
      { name: 'WAR', position: 5 },
    ],
  }),
  musicRecordingSchema({
    name: 'Say',
    datePublished: '2023-06-10',
    duration: 'PT2M',
  }),
  musicRecordingSchema({
    name: 'No Need',
    datePublished: '2023-03-31',
    duration: 'PT3M',
  }),
  musicRecordingSchema({
    name: 'Two Tales',
    datePublished: '2020-08-08',
    duration: 'PT4M',
  }),
]

export default function SoundLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={musicSchemas} />
      {children}
    </>
  )
}
