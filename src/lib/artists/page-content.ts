import { CONTACT_BOOKING_HREF } from '@/lib/contact/offerings'

export const ARTISTS_BOOKING_HREF = CONTACT_BOOKING_HREF
export const ARTISTS_CTA_LABEL = 'Start the conversation'
export const ARTISTS_APPLY_LABEL = 'Apply for a partnership'

export const ARTISTS_COPY = {
  eyebrow: 'Artist development',
  title: 'Sound. Systems. Revenue.',
  lede: [
    'You make the music. Everything around it decides whether anyone hears it, buys it, or comes back.',
    'I develop the artist: the sound, the infrastructure behind it, and the way it makes money. One person, one partnership, one direction.',
  ],
  problem: {
    eyebrow: 'The problem',
    title: 'Most artists have a great record and a scattered business.',
    items: [
      'The song is finished, but the release plan is a guess.',
      'The website is a template nobody updates.',
      'The fans who showed up once are gone.',
      'Merch lives on one platform, email on another, bookings in a text thread.',
      'Three people each own a piece of the picture, and none of them talk to each other.',
    ],
    punch: "That isn't a talent problem. It's a structure problem.",
  },
  what: {
    eyebrow: 'What this is',
    title: 'A partnership, not a service menu.',
    body: 'I work as your creative director and producer, and I build and run the systems your career sits on.',
    pillars: [
      {
        id: 'sound',
        number: '01',
        title: 'Sound',
        body: 'Production, arrangement, mixing and mastering. A sonic identity that holds across the whole catalog, so the next record sounds like it belongs with the last one.',
      },
      {
        id: 'systems',
        number: '02',
        title: 'Systems',
        body: 'Your website, audience capture, email, merch and digital products, release workflow and distribution. Built once, connected, and maintained.',
      },
      {
        id: 'revenue',
        number: '03',
        title: 'Revenue',
        body: 'A plan for how the work earns: releases, direct sales, licensing, memberships, merch. Reviewed and adjusted as it runs.',
      },
    ],
    punch: 'The system does not replace the art. It removes everything around the art that drains it.',
  },
  process: {
    eyebrow: 'How it works',
    title: 'Map. Direct. Build. Release. Review.',
    steps: [
      {
        id: 'map',
        title: 'Map',
        body: 'We look at where you are: catalog, audience, income, gaps.',
      },
      {
        id: 'direct',
        title: 'Direct',
        body: 'We set the sound, the release rhythm and the revenue plan.',
      },
      {
        id: 'build',
        title: 'Build',
        body: 'Production starts, and the systems get built alongside it.',
      },
      {
        id: 'release',
        title: 'Release',
        body: 'Each release runs through the same machine, so each one starts from where the last one ended.',
      },
      {
        id: 'review',
        title: 'Review',
        body: 'We look at what worked, what sold and what to change.',
      },
    ],
  },
  monthly: {
    eyebrow: 'Monthly partnerships',
    title: 'Ongoing support, with defined capacity.',
    body: 'You get a dedicated slice of my time, not an open-ended inbox.',
    note: 'Every tier has defined production hours, track allocations and revision limits.',
  },
  projects: {
    eyebrow: 'Project partnerships',
    title: 'A defined transformation over a set period.',
    body: 'For artists who want a clear beginning and end.',
  },
  roster: {
    eyebrow: 'Labels and rosters',
    title: 'Infrastructure and direction for more than one artist.',
    body: 'Scoped to the size of the roster. Reviewed by application.',
  },
  fit: {
    eyebrow: 'Who this is for',
    for: [
      'Artists with real material who want to be treated like a business.',
      'Independent artists who have outgrown doing it all alone.',
      'Labels building a roster who need shared creative and operational infrastructure.',
    ],
    notFor: 'Looking for the lowest-price mix, or unlimited revisions on demand? This is not that.',
    notManagement:
      "I'm not your manager and I don't take a cut of your career. This is creative and technical work with a defined scope and a clear price.",
  },
  closing: {
    title: "Let's see what you've got.",
    body: "Tell me where you are, and we'll figure out whether this is the right fit.",
  },
}

export type ArtistOffer = {
  id: string
  name: string
  /** Shown only on the lower tiers; everything else is by application. */
  price?: string
  meta?: string
  includesNote?: string
  features: string[]
}

export const MONTHLY_OFFERS: ArtistOffer[] = [
  {
    id: 'support',
    name: 'Artist Support',
    price: '$2,000/mo',
    features: [
      'Mixing and mastering',
      'Production and arrangement',
      'Creative direction',
      'Release planning and distribution support',
      'Website management',
      'Monthly strategy session',
    ],
  },
  {
    id: 'infrastructure',
    name: 'Artist Infrastructure',
    price: '$3,500/mo',
    includesNote: 'Everything in Artist Support, plus:',
    features: [
      'Larger production allocation',
      'Brand development',
      'Audience capture and CRM',
      'Email marketing and automation',
      'Merch and digital product setup',
      'Monetization strategy',
      'Release campaign infrastructure',
      'Monthly performance review',
    ],
  },
  {
    id: 'executive',
    name: 'Executive Artist Partnership',
    features: [
      'Executive creative direction',
      'Production, sonic identity and engineering',
      'Full artist business infrastructure',
      'Content and marketing systems',
      'Multiple revenue streams',
      'Advanced automation',
      'Release and campaign management',
      'Ongoing strategic development',
    ],
  },
]

export const PROJECT_OFFERS: ArtistOffer[] = [
  {
    id: 'foundation',
    name: 'Artist Foundation',
    meta: '90 days · 3 tracks',
    features: [
      'Three fully developed songs',
      'Production, mixing and mastering',
      'Artist identity development',
      'Visual direction',
      'Release strategy',
    ],
  },
  {
    id: 'growth',
    name: 'Artist Growth',
    meta: '6 months · 6-track EP',
    features: [
      'Full EP development',
      'Production and engineering',
      'Sonic identity',
      'Branding and creative direction',
      'Release infrastructure',
      'Marketing and rollout planning',
    ],
  },
  {
    id: 'signature',
    name: 'Signature Artist Partnership',
    meta: '12 months · up to 10 tracks',
    features: [
      'Executive creative direction',
      'Complete sonic identity',
      'Artist positioning',
      'Website and digital infrastructure',
      'Release and content systems',
      'Long-term monetization strategy',
    ],
  },
]

export const ROSTER_OFFERS: ArtistOffer[] = [
  {
    id: 'independent-label',
    name: 'Independent Label Partnership',
    meta: '12 months · up to 3 artists · up to 30 tracks',
    features: [
      'Shared sonic direction',
      'Artist branding and release infrastructure',
      'Centralized operational systems',
    ],
  },
  {
    id: 'advanced-label',
    name: 'Advanced Label Partnership',
    meta: '12 months · up to 4 artists · up to 40 tracks',
    features: [
      'Coordinated creative direction',
      'Release operations',
      'Executive reviews',
      'Shared digital systems',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Ecosystem',
    meta: '24 months · up to 10 artists',
    features: [
      'Artist development',
      'Production and sonic direction',
      'Identity and releases',
      'Infrastructure and technology',
      'Marketing and audience systems',
      'Operations and strategic oversight',
    ],
  },
]
