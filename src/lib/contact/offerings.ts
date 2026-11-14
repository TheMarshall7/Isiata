export const CONTACT_HREF = '/contact'
export const CONTACT_INQUIRY_EMAIL = 'brianmarshallca@gmail.com'
export const CONTACT_INQUIRY_HREF = `mailto:${CONTACT_INQUIRY_EMAIL}`
// Booking is paused: the /contact/booking page still exists but nothing links to it.
// Every former "book a call" link now opens an email instead.
export const CONTACT_BOOKING_HREF = CONTACT_INQUIRY_HREF

export type ContactOffering = {
  icon: string
  title: string
  lines: string[]
  tagline: string
  href: string
  cta: string
}

export const CONTACT_ALONGSIDE: ContactOffering[] = [
  {
    icon: 'solar:lightbulb-minimalistic-linear',
    title: 'Creative Direction',
    lines: [
      'Project-level guidance from concept to finish.',
      'Decisions, structure, and refinement.',
    ],
    tagline: 'For work that needs clarity and a point of view.',
    href: CONTACT_BOOKING_HREF,
    cta: 'Send a message',
  },
  {
    icon: 'solar:music-note-slider-linear',
    title: 'Session Work',
    lines: [
      'Focused one-on-one work in the room.',
      'Production, sound development, or problem-solving in real time.',
    ],
    tagline: 'Direct. Intentional. Limited.',
    href: CONTACT_BOOKING_HREF,
    cta: 'Send a message',
  },
  {
    icon: 'solar:microphone-3-linear',
    title: 'Coaching as an Artist',
    lines: [
      'Develop your voice, brand, and creative direction.',
      'Strategy for releases, positioning, and long-term growth.',
    ],
    tagline: 'For artists building a career with intention.',
    href: CONTACT_BOOKING_HREF,
    cta: 'Send a message',
  },
  {
    icon: 'solar:slider-vertical-linear',
    title: 'Coaching as a Producer',
    lines: [
      'Level up your sound, workflow, and client process.',
      'Feedback, systems, and standards for professional work.',
    ],
    tagline: 'For producers ready to operate at the next level.',
    href: CONTACT_BOOKING_HREF,
    cta: 'Send a message',
  },
]

export const CONTACT_DELIVERED: ContactOffering[] = [
  {
    icon: 'solar:tuning-2-linear',
    title: 'Mix & Sonic Refinement',
    lines: [
      'Precision mixing and final polish.',
      'Balance, depth, and cohesion without losing character.',
    ],
    tagline: 'Built to translate everywhere.',
    href: CONTACT_BOOKING_HREF,
    cta: 'Send a message',
  },
  {
    icon: 'solar:sticker-smile-circle-2-linear',
    title: 'Live Performance',
    lines: [
      'Sound experienced in the room.',
      'Solo or collaborative performances shaped by the space and moment.',
    ],
    tagline: 'Unrepeatable by design.',
    href: CONTACT_BOOKING_HREF,
    cta: 'Send a message',
  },
  {
    icon: 'solar:server-square-linear',
    title: 'Systems',
    lines: [
      'Production, mixing and mastering, and creative direction.',
      'The business infrastructure that turns the music into revenue.',
    ],
    tagline: 'Sound. Systems. Revenue.',
    href: '/systems',
    cta: 'View systems',
  },
]
