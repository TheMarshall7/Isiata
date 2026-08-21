import { CONTACT_BOOKING_HREF } from '@/lib/contact/offerings'

export const SYSTEMS_BOOKING_HREF = CONTACT_BOOKING_HREF
export const SYSTEMS_STARTING_AT = '$2,500'
export const SYSTEMS_CTA_LABEL = 'Talk it through'

export type SystemsTier = {
  id: string
  tier: number
  name: string
  timeline: string
  tagline: string
  forYouIf: string
  includesNote?: string
  features: string[]
  outcome: string
  icon: string
  /** Custom / scoped engagement — no fixed package */
  isScoped?: boolean
}

export const SYSTEMS_TIERS: SystemsTier[] = [
  {
    id: 'booking-foundation',
    tier: 1,
    name: 'The Booking Foundation',
    timeline: '7 days',
    tagline: 'Turn the audience you already have into paying clients. Fast.',
    forYouIf:
      'You have an audience but no way to capture or convert them consistently, and you want something working in a week, not a quarter.',
    features: [
      'A lead capture page that turns followers into contacts you actually own',
      'A booking calendar for sessions, beats, mixes, or consults',
      'Automated follow-up (SMS + email) so no inquiry goes cold',
      'Instant replies to DMs and requests, even when you\'re not online',
      'Missed message recovery. nothing falls through the cracks',
      'No-show reminders and automatic rebooking',
      'Basic tracking so you can see who\'s actually close to buying',
    ],
    outcome: 'The audience you already have starts paying and booking on its own.',
    icon: 'solar:calendar-mark-linear',
  },
  {
    id: 'revenue-system',
    tier: 2,
    name: 'The Revenue System',
    timeline: '3 weeks',
    tagline: 'Monetize what you have. Recover what you already lost.',
    forYouIf:
      'You\'re already getting inquiries but leads are slipping through the cracks, and you know there\'s revenue sitting in your old DMs and inbox.',
    includesNote: 'Everything in The Booking Foundation, plus:',
    features: [
      'A real website built around what you sell, not a template with your name on it',
      'A dedicated sales page for your core offer',
      'Higher-converting lead capture, tuned for your actual audience',
      'Cold Lead Revival: old DMs, old inquiries, dead leads, brought back',
      'Stronger email + SMS sequences that do the follow-up you don\'t have time for',
      'A full CRM, so every lead is tracked instead of buried in your inbox',
    ],
    outcome:
      'New content brings leads in. The system converts the ones you already had. Income stops being random.',
    icon: 'solar:graph-up-linear',
  },
  {
    id: 'client-machine',
    tier: 3,
    name: 'The Client Machine',
    timeline: '8 to 10 weeks',
    tagline: 'Inquiry to paid to onboarded, without you touching it.',
    forYouIf:
      'You\'re busy enough that manual follow-up and onboarding are eating your creative time, and you want the business to run without you chasing it.',
    includesNote: 'Everything in The Revenue System, plus:',
    features: [
      'Full client journey automation: inquiry, follow-up, booking, payment, onboarding',
      'An application layer that filters out tire-kickers before they reach you',
      'Automated onboarding: welcome, delivery, next steps, no manual work',
      'Behavior-based follow-up (what happens next depends on what they actually did)',
      'Re-engagement campaigns that keep working the cold list in the background',
      'Upsell and retention messaging for clients you\'ve already closed',
    ],
    outcome: 'Clients move through your business on their own. You create. The system closes.',
    icon: 'solar:cpu-bolt-linear',
  },
  {
    id: 'growth-infrastructure',
    tier: 4,
    name: 'The Growth Infrastructure',
    timeline: '12 to 16 weeks',
    tagline: 'A creative business that runs whether you\'re working or not.',
    forYouIf:
      'You have more than one income stream (beats, coaching, services) running separately, and you want them connected into one system with one view of the numbers.',
    includesNote: 'Everything in The Client Machine, plus:',
    features: [
      'Every income stream connected: beats, services, coaching, email, funnels. One system, not five disconnected tools',
      'Content-to-lead: your posts and releases capture leads automatically',
      'An owned audience system (email list) that isn\'t at the mercy of an algorithm',
      'A full launch and release campaign engine',
      'Ongoing optimization: pages, messaging, conversion, always improving',
      'One dashboard for leads, bookings, and revenue',
      'Weekly strategy support',
    ],
    outcome:
      'Your business runs like a catalog, generating in the background while you focus on the work that actually matters.',
    icon: 'solar:buildings-3-linear',
  },
  {
    id: 'custom',
    tier: 5,
    name: 'Custom Build',
    timeline: 'Varies by project',
    tagline: 'When your business needs more than a fixed tier.',
    forYouIf:
      'Your setup doesn\'t fit cleanly into a tier. multiple revenue streams, an unusual workflow, or specific integrations already in place.',
    includesNote: 'What a custom engagement can include:',
    isScoped: true,
    features: [
      'A discovery call to map your offers, audience, workflows, and goals',
      'A written scope and system architecture before anything gets built',
      'Any mix of the above tiers, plus net-new automation and integrations built for you specifically',
      'Phased delivery, built around your priorities and budget',
      'Custom pages, funnels, and client journeys designed around how you actually sell, not how a template assumes you sell',
      'A flexible retainer sized to the work, not a fixed package',
    ],
    outcome: 'A backend built for your business. Nothing you don\'t need, nothing missing that you do.',
    icon: 'solar:slider-vertical-linear',
  },
]
