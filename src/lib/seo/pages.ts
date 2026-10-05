import type { PageMetadataInput } from '@/lib/seo/metadata'
import { ISIATA_LOGO_URL } from '@/lib/constants'

/** SEO-optimized meta copy per route (not visible on page). */
export const SEO_PAGES = {
  home: {
    title: 'Create and Transform — Music, Garments, Tools & Systems',
    description:
      'Isiata is a visionary creator building a multidisciplinary universe. Music, garments, tools, and systems that change how people experience reality.',
    path: '/',
    keywords: [
      'ISIATA',
      'music producer',
      'sample packs',
      'limited garments',
      'artist business systems',
      'creative universe',
    ],
  },
  sound: {
    title: 'Sound — Music Releases, EPs & Discography',
    description:
      'Music from Isiata meant to change how you feel. Releases including the THEY MIGHT BE MAD EP, singles, and visual media.',
    path: '/sound',
    keywords: ['ISIATA music', 'THEY MIGHT BE MAD', 'hip hop EP', 'music releases', 'discography'],
  },
  objects: {
    title: 'Garments — Limited Fashion Drops & Archive',
    description:
      'Garments as artifacts of the Isiata universe. Limited runs worn as character, then archived.',
    path: '/objects',
    keywords: ['ISIATA garments', 'limited fashion drops', 'streetwear', 'Champion tee', 'archive'],
  },
  tools: {
    title: 'Tools — Producer Sample Packs & Free Training',
    description:
      'Artifacts for creation and perception: sample packs, Ear Mastery, the Producer Toolbox, and Tsukuyomi. Built to change how you hear and make.',
    path: '/tools',
    keywords: [
      'producer tools',
      'drum sample pack',
      'ear training',
      'music production',
      'beat making tools',
    ],
  },
  toolbox: {
    title: 'Producer Toolbox — Free Music Production Resources',
    description:
      'Free producer toolbox with curated music production resources, guides, and utilities for beat makers and artists.',
    path: '/tools/toolbox',
    keywords: ['producer toolbox', 'free music production resources', 'beat making guides'],
  },
  earTrainer: {
    title: 'Ear Mastery — Free Ear Training for Producers',
    description:
      'Free ear training for music producers. Practice intervals, chords, and melody by ear. Level up your production skills with daily challenges.',
    path: '/tools/training/ear-trainer',
    keywords: [
      'ear training',
      'music theory',
      'interval training',
      'producer ear training',
      'free music training',
    ],
  },
  drumBundle: {
    title: 'Tsukuyomi Drum Bundle — Premium Drum Sample Pack',
    description:
      'Premium drum sample pack with kicks, 808s, snares, hats, and percussion. High-quality WAV files for FL Studio, Ableton, Logic Pro, and more.',
    path: '/tools/sample-packs/tsukuyomi-drum-bundle',
    keywords: [
      'drum sample pack',
      'Tsukuyomi',
      '808 samples',
      'trap drums',
      'hip hop drum kit',
      'WAV samples',
    ],
  },
  drumEngine: {
    title: 'Tsukuyomi Drum Engine — 16-Pad Drum Instrument',
    description:
      'A 16-pad drum instrument that takes you from raw samples to a finished drum track without leaving the plugin. VST3 and Standalone available; AU coming soon.',
    path: '/tools/tsukuyomi-drum-engine',
    keywords: [
      'Tsukuyomi Drum Engine',
      'drum plugin',
      'drum instrument',
      'drum sequencer',
      'VST3 drum instrument',
      'standalone drum instrument',
      'music production',
    ],
  },

  systems: {
    title: 'Systems — Backend Business Infrastructure for Artists',
    description:
      'Structure that holds the creative work in the physical world. Booking, delivery, and retention for artists and producers.',
    path: '/systems',
    image: ISIATA_LOGO_URL,
    keywords: [
      'artist business systems',
      'music producer CRM',
      'booking system for artists',
      'creative business infrastructure',
      'ISIATA',
    ],
  },
  systemsArchitecture: {
    title: 'Systems Architecture — How ISIATA Infrastructure Works',
    description:
      'Interactive map of ISIATA systems architecture: capture, organize, convert, deliver, retain, and measure. See how the machine reconfigures for artists, producers, and agencies.',
    path: '/systems/architecture',
    image: ISIATA_LOGO_URL,
    keywords: [
      'artist business architecture',
      'music producer CRM architecture',
      'creative operating system',
      'ISIATA systems',
    ],
  },
  contact: {
    title: 'Contact — Book Sessions, Mixing & Creative Direction',
    description:
      'Book creative direction, mixing, session work, coaching, live performance, or explore business systems. Collaborative services for artists.',
    path: '/contact',
    keywords: [
      'book music producer',
      'mixing services',
      'creative direction',
      'artist coaching',
      'session booking',
    ],
  },
  contactBooking: {
    title: 'Book a Call — Sessions, Mixing & Creative Services',
    description:
      'Schedule a call for creative direction, mixing, session work, coaching, or live performance. ISIATA collaborative and delivered services.',
    path: '/contact/booking',
    keywords: ['book producer session', 'schedule mixing', 'artist booking calendar'],
  },
  contactInquiry: {
    title: 'General Inquiry — Questions & Collaborations',
    description:
      'Send a general inquiry about ISIATA sound, garments, tools, systems, or collaborations. We respond to all serious inquiries.',
    path: '/contact/inquiry',
    keywords: ['contact ISIATA', 'music collaboration inquiry', 'general inquiry'],
  },
  explore: {
    title: 'Explore — Sound, Garments, Tools & Systems',
    description:
      'Enter the Isiata universe across music, garments, tools, and systems. Different manifestations of one creative philosophy.',
    path: '/explore',
    keywords: ['explore ISIATA', 'creative universe'],
  },
  community: {
    title: 'Community — Join the ISIATA Mailing List',
    description:
      'Join the ISIATA community for early access to drops, releases, tools, and news. Get notified before the public.',
    path: '/community',
    keywords: ['ISIATA newsletter', 'music community', 'drop notifications'],
  },
  about: {
    title: 'About — The Universe',
    description:
      'Isiata searches beyond the surface of reality and transforms what he discovers into music, art, technology, and experience. Create and transform.',
    path: '/about',
    keywords: ['about ISIATA', 'creative universe', 'music and fashion'],
  },
  archive: {
    title: 'Archive — Past Releases & Sold-Out Drops',
    description:
      'Archive of past ISIATA sound releases, garment drops, and tools. Documented history of limited runs and sold-out objects.',
    path: '/archive',
    keywords: ['ISIATA archive', 'sold out drops', 'past releases'],
  },
  legalTerms: {
    title: 'Terms of Service',
    description: 'Terms of service for ISIATA website, products, tools, and services.',
    path: '/legal/terms',
  },
  legalPrivacy: {
    title: 'Privacy Policy',
    description: 'Privacy policy for ISIATA. How we collect, use, and protect your information.',
    path: '/legal/privacy',
  },
  legalLicensing: {
    title: 'Licensing',
    description: 'Licensing terms for ISIATA sample packs, tools, and digital products.',
    path: '/legal/licensing',
  },
  checkoutOrder: {
    title: 'Checkout',
    description: 'Complete your ISIATA purchase.',
    path: '/tools/checkout/order',
    noIndex: true,
  },
} as const satisfies Record<string, PageMetadataInput & { keywords?: string[]; noIndex?: boolean }>

export function garmentMeta(slug: string, title: string, description: string, image: string) {
  const shortDesc = description.length > 155 ? `${description.slice(0, 152)}...` : description
  return {
    title: `${title} — Limited ISIATA Garment`,
    description: shortDesc,
    path: `/objects/${slug}`,
    image,
    imageAlt: `${title} — ISIATA Garments`,
    keywords: ['ISIATA garments', title, 'limited drop', 'archive fashion'],
  } satisfies PageMetadataInput & { keywords?: string[] }
}

export function systemTierMeta(
  slug: string,
  name: string,
  tagline: string,
  outcome: string,
  heroImage: string,
  isScoped?: boolean
) {
  return {
    title: isScoped
      ? `${name} — Custom Artist Business System`
      : `${name} — Artist Business System`,
    description: `${tagline} ${outcome}`.slice(0, 160),
    path: `/systems/${slug}`,
    image: heroImage,
    imageAlt: `${name} — ISIATA Systems`,
    keywords: isScoped
      ? [name, 'custom artist business system', 'bespoke CRM', 'scoped systems build']
      : [name, 'artist business system', 'music producer CRM', 'booking automation'],
  } satisfies PageMetadataInput & { keywords?: string[] }
}
