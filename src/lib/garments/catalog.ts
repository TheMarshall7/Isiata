import type { BadgeStatus } from '@/types'

export type GarmentProduct = {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  images: { url: string; alt: string }[]
  status: BadgeStatus
  type: 'tee' | 'jacket'
  releaseName: string
  releaseHref: string
  releaseDate: string
  story: string[]
  details: { label: string; value: string }[]
  materials: string[]
}

const TEE_DIR = 'They might be mad champion TEE'
const RAP_TEE_DIR = 'ISIATA 90s rap TEE'
const JACKET_DIR = 'samples/They might be mad champion jacket'

function publicAsset(...parts: string[]) {
  return `/${parts.map((part) => encodeURIComponent(part)).join('/')}`
}

function teeImage(filename: string, alt: string) {
  return { url: publicAsset(TEE_DIR, filename), alt }
}

function rapTeeImage(filename: string, alt: string) {
  return { url: publicAsset(RAP_TEE_DIR, filename), alt }
}

function jacketImage(filename: string, alt: string) {
  return { url: publicAsset(JACKET_DIR, filename), alt }
}

export const THEY_MIGHT_BE_MAD_RELEASE = {
  name: 'They Might Be Mad',
  href: '/sound',
  date: 'October 29, 2022',
  type: 'EP',
} as const

export const GARMENT_CATALOG: GarmentProduct[] = [
  {
    slug: 'they-might-be-mad-champion-tee',
    title: 'ISIATA They Might Be Mad Champion T',
    subtitle: 'Heritage Tee · Signature Release',
    description:
      'Limited run Champion heritage tee produced for the They Might Be Mad EP. Documented, numbered in spirit, and archived after the run sold through.',
    image: publicAsset(TEE_DIR, 'mens-champion-heritage-t-shirt-black-front-6a4061b203323.png'),
    images: [
      teeImage('mens-champion-heritage-t-shirt-black-front-6a4061b203323.png', 'Front view'),
      teeImage('mens-champion-heritage-t-shirt-black-back-6a4061b204cc4.png', 'Back view'),
      teeImage('mens-champion-heritage-t-shirt-black-front-6a4061b203559.png', 'Front detail'),
      teeImage('mens-champion-heritage-t-shirt-black-product-details-6a4061b20343d.png', 'Product details'),
      teeImage('mens-champion-heritage-t-shirt-black-zoomed-in-6a4061b203667.png', 'Close up'),
    ],
    status: 'sold-out',
    type: 'tee',
    releaseName: THEY_MIGHT_BE_MAD_RELEASE.name,
    releaseHref: THEY_MIGHT_BE_MAD_RELEASE.href,
    releaseDate: THEY_MIGHT_BE_MAD_RELEASE.date,
    story: [
      'This piece was released as a limited garment drop tied directly to the They Might Be Mad EP, a focused run of objects built around the same period of work as the sound.',
      'Each release arrived in small quantities. Once the run was gone, it was archived. This tee is no longer available for purchase.',
      'The Champion heritage construction was chosen for daily wear: simple, durable, and intentional, the same restraint that shaped the EP.',
    ],
    details: [
      { label: 'Release', value: 'They Might Be Mad EP (2022)' },
      { label: 'Drop type', value: 'Limited signature release' },
      { label: 'Partner', value: 'Champion' },
      { label: 'Availability', value: 'Sold out, archived' },
    ],
    materials: ['Champion heritage cotton tee', 'ISIATA They Might Be Mad artwork', 'Black colorway'],
  },
  {
    slug: 'isiata-90s-rap-tee',
    title: 'ISIATA 90s rap TEE',
    subtitle: 'Heritage Tee · Signature Release',
    description:
      'Limited run Champion heritage tee with bootleg-era ISIATA artwork from the They Might Be Mad period. Sold out and preserved in the archive.',
    image: publicAsset(RAP_TEE_DIR, 'mens-champion-heritage-t-shirt-black-front-alt.png'),
    images: [
      rapTeeImage('mens-champion-heritage-t-shirt-black-front.png', 'Front view'),
      rapTeeImage('mens-champion-heritage-t-shirt-black-front-alt.png', 'Front alternate'),
      rapTeeImage('mens-champion-heritage-t-shirt-black-back.png', 'Back view'),
      rapTeeImage('mens-champion-heritage-t-shirt-black-product-details.png', 'Champion logo detail'),
      rapTeeImage('mens-champion-heritage-t-shirt-black-zoomed-in.png', 'Neck tag detail'),
    ],
    status: 'sold-out',
    type: 'tee',
    releaseName: THEY_MIGHT_BE_MAD_RELEASE.name,
    releaseHref: THEY_MIGHT_BE_MAD_RELEASE.href,
    releaseDate: THEY_MIGHT_BE_MAD_RELEASE.date,
    story: [
      'A bootleg-inspired graphic tee from the same release cycle as the They Might Be Mad EP. ISIATA lettering, collage photography, and T.M.B.M. marks on a Champion heritage blank.',
      'Built for daily wear with the same restraint as the rest of the drop. Small run, no restock.',
      'The full run has sold out. This page documents the piece for the archive.',
    ],
    details: [
      { label: 'Release', value: 'They Might Be Mad EP (2022)' },
      { label: 'Drop type', value: 'Limited signature release' },
      { label: 'Partner', value: 'Champion' },
      { label: 'Availability', value: 'Sold out, archived' },
    ],
    materials: ['Champion heritage cotton tee', 'ISIATA 90s rap artwork', 'Black colorway'],
  },
  {
    slug: 'they-might-be-mad-champion-jacket',
    title: 'ISIATA They Might Be Mad Champion Jacket',
    subtitle: 'Packable Anorak · Signature Release',
    description:
      'Limited run Champion packable anorak from the They Might Be Mad EP era. A heavier layer from the same release cycle, sold out and preserved in the archive.',
    image: publicAsset(JACKET_DIR, 'unisex-champion-packable-anorak-black-front-6a4062358149a.png'),
    images: [
      jacketImage('unisex-champion-packable-anorak-black-front-6a4062358149a.png', 'Front view'),
      jacketImage('unisex-champion-packable-anorak-black-front-6a406235812b8.png', 'Front alternate'),
      jacketImage('unisex-champion-packable-anorak-black-front-6a40623581454.png', 'Front layout'),
      jacketImage('unisex-champion-packable-anorak-black-front-6a406235811ac.png', 'Front view alternate'),
      jacketImage('unisex-champion-packable-anorak-black-left-6a406235815ee.png', 'Left view'),
      jacketImage('unisex-champion-packable-anorak-black-right-6a40623581638.png', 'Right view'),
      jacketImage('unisex-champion-packable-anorak-black-product-details-6a40623581429.png', 'Packable pouch'),
      jacketImage('unisex-champion-packable-anorak-black-front-6a406235813fd.png', 'Front detail'),
    ],
    status: 'sold-out',
    type: 'jacket',
    releaseName: THEY_MIGHT_BE_MAD_RELEASE.name,
    releaseHref: THEY_MIGHT_BE_MAD_RELEASE.href,
    releaseDate: THEY_MIGHT_BE_MAD_RELEASE.date,
    story: [
      'The jacket was part of the same limited garment drop as the They Might Be Mad EP, objects released in parallel with the sound, not as an afterthought.',
      'Built on Champion packable anorak construction, it was meant for movement: lightweight, functional, and marked with ISIATA artwork from that release period.',
      'The full run has sold out. This page exists as documentation of what was, not an open purchase.',
    ],
    details: [
      { label: 'Release', value: 'They Might Be Mad EP (2022)' },
      { label: 'Drop type', value: 'Limited signature release' },
      { label: 'Partner', value: 'Champion' },
      { label: 'Availability', value: 'Sold out, archived' },
    ],
    materials: ['Champion packable anorak', 'ISIATA They Might Be Mad artwork', 'Black colorway', 'Unisex fit'],
  },
]

export function getGarmentBySlug(slug: string): GarmentProduct | undefined {
  return GARMENT_CATALOG.find((item) => item.slug === slug)
}

export function getAllGarmentSlugs(): string[] {
  return GARMENT_CATALOG.map((item) => item.slug)
}
