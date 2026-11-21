import { CONTACT_INQUIRY_EMAIL } from '@/lib/contact/offerings'

const mailto = (subject: string) => `mailto:${CONTACT_INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}`

export const SERVICES_HREF = '/services'
export const MUSIC_HREF = '/services/music'
export const BUSINESS_HREF = '/services/business'
export const SYSTEM_HREF = '/services/business/artist-business-system'

/** The easiest way in. Swap for a booking/payment link when one exists. */
export const TEARDOWN = {
  label: 'Book a Teardown',
  price: '$300',
  href: mailto('Book a Paid Teardown ($300)'),
  line: '60 minutes on your brand, store, email and products, then a written 90-day roadmap. The $300 comes off any build you book after.',
}

export type ServiceOffer = {
  id: string
  name: string
  price: string
  /** Shown instead of a price when we'd rather talk first. */
  apply?: boolean
  timeline: string
  pitch: string
  forWho?: string
  includes?: string[]
  includesLead?: string
  payment?: string
  perSong?: string
  note?: string
  badge?: string
  featured?: boolean
  cta: string
  href: string
}

export const MUSIC_OFFERS: ServiceOffer[] = [
  {
    id: 'finish-my-track',
    name: 'Finish My Track',
    price: '$400–$1,500',
    timeline: '1–2 weeks',
    pitch: "You have a track that's close. I finish it: production touch-ups, mix and master.",
    note: 'Price depends on how much work the track needs. Send it and I will quote it.',
    includes: ['Production touch-ups', 'Full mix', 'Master', '2 revision rounds'],
    cta: 'Send my track',
    href: mailto('Finish My Track'),
  },
  {
    id: 'release-ready',
    name: 'Release-Ready Single',
    price: '$2,500',
    timeline: '2–3 weeks',
    pitch: 'One song, taken all the way to release.',
    includes: ['Production polish', 'Full mix', 'Master', 'Release-ready files', '2 revision rounds'],
    payment: 'Paid in full to start.',
    cta: 'Book a single',
    href: mailto('Release-Ready Single'),
  },
  {
    id: 'signature-single',
    name: 'Signature Single',
    price: '$5,000',
    timeline: '3–4 weeks',
    pitch: 'The single, plus the world around it.',
    includesLead: 'Everything in Release-Ready, plus:',
    includes: [
      'Creative direction',
      'Clean edit',
      'Release setup',
      'Mini brand and a one-page lookbook',
      '10-clip content pack',
      'Sample pack from your song',
    ],
    payment: '$2,500 to start and $2,500 on delivery, or pay in full at a discount.',
    badge: 'Most complete single',
    featured: true,
    cta: 'Book a Signature Single',
    href: mailto('Signature Single'),
  },
  {
    id: 'ep-build',
    name: 'EP Build',
    price: '$8,500',
    timeline: '60–90 days · 4 songs',
    pitch: 'Four songs produced, mixed and mastered as one cohesive project, with the release setup and brand pieces.',
    perSong: '≈ $2,125 a song',
    includes: ['4 songs produced, mixed and mastered', 'One cohesive sound across the project', 'Release setup', 'Brand pieces'],
    payment: '$4,250 to start and $4,250 on delivery, or $7,997 in full.',
    badge: '2 at a time',
    cta: 'Apply for an EP',
    href: mailto('EP Build (4 songs)'),
  },
  {
    id: 'album-build',
    name: 'Album Build',
    price: '$14,500–$17,500',
    timeline: '4–6 months · 8–10 songs',
    pitch: 'A full album with production, mixing and mastering, plus the brand and release setup.',
    perSong: '≈ $1,800 a song',
    includes: ['8–10 songs produced, mixed and mastered', 'Brand', 'Release setup'],
    payment: '50% to start, 25% at the halfway point and 25% on delivery.',
    cta: 'Apply for an album',
    href: mailto('Album Build (8–10 songs)'),
  },
]

export const BUSINESS_OFFERS: ServiceOffer[] = [
  {
    id: 'teardown',
    name: 'Paid Teardown',
    price: '$300',
    timeline: '60-minute call',
    pitch: 'I review your brand, store, email and product setup. You leave with a written 90-day roadmap.',
    note: 'Credited toward any build you book afterward.',
    includes: ['Brand review', 'Store and checkout review', 'Email and product setup review', 'Written 90-day roadmap'],
    badge: 'Start here if unsure',
    cta: TEARDOWN.label,
    href: TEARDOWN.href,
  },
  {
    id: 'brand-lookbook',
    name: 'Brand and Lookbook Starter',
    price: '$2,500',
    timeline: '2–3 weeks',
    pitch: 'The identity and the press kit, done properly.',
    includes: [
      'Brand identity and a lite brand doc: story, palette, type, logo rules, photo direction, sonic principles',
      'A one-page interactive lookbook that doubles as a press kit',
      '2 revision rounds',
    ],
    note: 'Credited toward the Business Starter or Artist Business System if you upgrade within 60 days.',
    cta: 'Start my brand',
    href: mailto('Brand and Lookbook Starter'),
  },
  {
    id: 'business-starter',
    name: 'Business Starter',
    price: '$5,000',
    timeline: '3 weeks',
    pitch: 'For artists who sell something but have no system behind it.',
    includes: [
      'Brand identity and lite brand doc',
      'One-page lookbook',
      'One-page website with a store for one product',
      'Email capture and a welcome sequence',
      'One product listed with checkout live',
      '2 revision rounds',
    ],
    payment: '$2,500 to start and $2,500 on delivery.',
    note: 'The $5,000 is credited toward the Artist Business System if you upgrade within 60 days.',
    featured: true,
    badge: 'Most popular start',
    cta: 'Book the Starter',
    href: mailto('Business Starter'),
  },
  {
    id: 'artist-business-system',
    name: 'Artist Business System',
    price: '$13,982',
    apply: true,
    timeline: '30 days',
    pitch: 'The full backend for your music business, built for you.',
    forWho: 'For artists who already earn or have an audience. 3 builds per quarter.',
    includes: [
      'Revenue-leak audit and a written 90-day roadmap',
      'Brand identity and full brand doc',
      'Interactive lookbook',
      'Website and store',
      'Email and fan capture with automations',
      'Product ladder: low, mid and premium offers, live with checkout',
      'Your first product built and launched',
      'Offer and page copy',
      'Launch and content system',
      'A done-for-you launch month',
      'Bonuses: 30 days of post-launch support, a lead magnet build and a social template kit',
    ],
    badge: '3 per quarter',
    cta: 'See the system and apply',
    href: SYSTEM_HREF,
  },
]

export const COHORT = {
  id: 'cohort',
  name: 'Cohort',
  timeline: '4 weeks · starts January',
  pitch: 'The same system, built with you in a group.',
  includes: [
    'Weekly live teaching',
    'Templates for your brand, store, emails and offers',
    'Small pods of about 5, with weekly office hours',
  ],
  tiers: [
    { name: 'Standard', price: '$1,500', detail: 'Everything above.' },
    { name: 'Plus', price: '$2,500', detail: 'Adds a personal review of your pages and a one-to-one check-in. About 8 spots.' },
  ],
  cta: 'Join the January cohort',
  href: mailto('Cohort (January)'),
}

/** Landing page: which door fits which artist. */
export const ROUTE_PICKER = [
  {
    id: 'day-job',
    situation: "I'm working a day job and want my music to sound right",
    offer: 'Finish My Track or the Cohort',
    why: 'The lowest cost way to get a finished song, or to build the system yourself with help.',
    links: [
      { label: 'Finish My Track', href: `${MUSIC_HREF}#finish-my-track` },
      { label: 'Cohort', href: `${BUSINESS_HREF}#cohort` },
    ],
  },
  {
    id: 'ready',
    situation: "I'm ready to release a song",
    offer: 'Release-Ready or Signature Single',
    why: 'One song taken all the way to release. Signature adds the brand, content and sample pack around it.',
    links: [
      { label: 'Release-Ready Single', href: `${MUSIC_HREF}#release-ready` },
      { label: 'Signature Single', href: `${MUSIC_HREF}#signature-single` },
    ],
  },
  {
    id: 'selling',
    situation: "I already sell something, but there's no system behind it",
    offer: 'Business Starter, then the full System',
    why: 'Brand, a one-product store and email capture in 3 weeks. The $5,000 is credited if you upgrade.',
    links: [
      { label: 'Business Starter', href: `${BUSINESS_HREF}#business-starter` },
      { label: 'Artist Business System', href: SYSTEM_HREF },
    ],
  },
  {
    id: 'audience',
    situation: 'I have an audience or real income already',
    offer: 'The Artist Business System',
    why: 'The full backend built for you in 30 days, with a done-for-you launch month.',
    links: [{ label: 'See the system', href: SYSTEM_HREF }],
  },
  {
    id: 'unsure',
    situation: "I'm not sure yet",
    offer: 'The Paid Teardown',
    why: 'One hour, a written 90-day roadmap, and the $300 comes off whatever you book next.',
    links: [{ label: TEARDOWN.label, href: TEARDOWN.href }],
  },
]

/** How payments carry forward into bigger builds. */
export const UPGRADE_PATH = [
  { step: 'Single', detail: 'Get the song finished and released.', price: 'from $400' },
  { step: 'Brand and Lookbook', detail: 'Add the identity and press kit.', price: '$2,500' },
  { step: 'Business Starter', detail: 'Store, email and one product live.', price: '$5,000' },
  { step: 'Artist Business System', detail: 'The full backend, built for you.', price: 'Apply' },
]

export const SERVICE_TERMS = {
  all: [
    'Deposits are non-refundable.',
    'No income or results are guaranteed. I deliver the work, not the sales.',
    'Upgrade credits expire after 60 days.',
  ],
  music: ['2 revision rounds per song.'],
  business: [
    '2 revision rounds.',
    'A delivery credit if I miss the agreed date: $500 a week, capped at $2,000.',
    "A 30-day fix window for anything that doesn't work as described.",
  ],
}
