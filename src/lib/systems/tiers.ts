import { CONTACT_BOOKING_HREF } from '@/lib/contact/offerings'

export const SYSTEMS_BOOKING_HREF = CONTACT_BOOKING_HREF

export type SystemsTier = {
  id: string
  tier: number
  name: string
  startingAt: string
  retainer: string
  timeline: string
  tagline: string
  includesNote?: string
  features: string[]
  outcome: string
  icon: string
  /** Scoped pricing — no fixed dollar amounts; discovery call first */
  isScoped?: boolean
}

export const SYSTEMS_TIERS: SystemsTier[] = [
  {
    id: 'booking-foundation',
    tier: 1,
    name: 'The Booking Foundation',
    startingAt: '$2,500',
    retainer: '$497/month',
    timeline: '7 days',
    tagline: 'Get your first paying clients from your existing audience in 7 days.',
    features: [
      'Lead capture page (turn followers into contacts you own)',
      'Booking calendar for sessions, beats, services, or consultations',
      'Automated follow-up (SMS + email) at 1hr, 24hr, and 72hr',
      'Instant reply system for inquiries and requests',
      'Missed message recovery system',
      'No-show reminder + rebooking automation',
      'Basic tracking so you see who\'s moving toward buying',
    ],
    outcome: 'The audience you already have starts paying and booking automatically.',
    icon: 'solar:calendar-mark-linear',
  },
  {
    id: 'revenue-system',
    tier: 2,
    name: 'The Revenue System',
    startingAt: '$4,997',
    retainer: '$597/month',
    timeline: '3 weeks',
    tagline: 'Monetize your existing audience AND recover the leads you\'ve already lost.',
    includesNote: 'Everything in The Booking Foundation, plus:',
    features: [
      'Conversion website built around what you sell',
      'Dedicated sales page for your core offer',
      'Higher-converting lead capture pages',
      'Cold Lead Revival system (re-engages past DMs, emails, old inquiries)',
      'Stronger email + SMS follow-up sequences',
      'Full CRM setup so no lead goes untracked',
    ],
    outcome: 'New content brings in leads. The system converts the ones you already had. Income becomes consistent.',
    icon: 'solar:graph-up-linear',
  },
  {
    id: 'client-machine',
    tier: 3,
    name: 'The Client Machine',
    startingAt: '$8,997',
    retainer: '$997/month',
    timeline: '8 to 10 weeks',
    tagline: 'Fully automated from first inquiry to paid and onboarded, without you managing it.',
    includesNote: 'Everything in The Revenue System, plus:',
    features: [
      'Full client journey automation (inquiry to follow-up to booking to payment to onboarding)',
      'Application system to filter serious buyers',
      'Automated client onboarding (welcome, delivery, next steps)',
      'Behavior-based follow-up sequences',
      'Re-engagement campaigns for cold leads',
      'Upsell and retention messaging for existing clients',
    ],
    outcome: 'Clients move through your business on autopilot. You create. The system closes.',
    icon: 'solar:cpu-bolt-linear',
  },
  {
    id: 'growth-infrastructure',
    tier: 4,
    name: 'The Growth Infrastructure',
    startingAt: '$14,997',
    retainer: '$1,500/month',
    timeline: '12 to 16 weeks',
    tagline: 'A fully connected, continuously optimized creative business that generates income whether you\'re working or not.',
    includesNote: 'Everything in The Client Machine, plus:',
    features: [
      'Multiple income streams connected (beats, services, coaching, email, funnels)',
      'Content-to-lead system (posts and releases capture leads automatically)',
      'Owned audience growth system (email list, not algorithm-dependent)',
      'Launch and release campaign system',
      'Ongoing page, message, and conversion optimization',
      'Performance dashboard (leads, bookings, revenue in one view)',
      'Weekly strategy support',
    ],
    outcome: 'Your business runs like a catalog. Generating income in the background while you focus on the work.',
    icon: 'solar:buildings-3-linear',
  },
  {
    id: 'custom',
    tier: 5,
    name: 'Custom Build',
    startingAt: 'Scoped on call',
    retainer: 'Based on scope',
    timeline: 'Varies by project',
    tagline:
      'When your vision needs more than a fixed tier — we scope your goals, design the architecture, and build exactly what your business requires.',
    includesNote: 'What a custom engagement can include:',
    isScoped: true,
    features: [
      'Discovery call to map your offers, audience, workflows, and revenue goals',
      'Written scope and system architecture before anything gets built',
      'Mix capabilities from any tier — plus net-new automations and integrations',
      'Phased delivery aligned to your priorities, timeline, and budget',
      'Custom pages, funnels, and client journeys designed around how you actually sell',
      'Flexible retainer structured around what the project needs — not a one-size package',
    ],
    outcome:
      'A backend built for your business — not a template with your name on it. You get what you need, nothing you do not.',
    icon: 'solar:slider-vertical-linear',
  },
]
