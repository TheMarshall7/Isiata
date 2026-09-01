import { CONTACT_BOOKING_HREF } from '@/lib/contact/offerings'

export const SYSTEMS_BOOKING_HREF = CONTACT_BOOKING_HREF
export const SYSTEMS_CTA_LABEL = 'Talk it through'
export const SYSTEMS_MAP_CTA_LABEL = 'Map my system'

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
  ctaLabel: string
  bestFor: string[]
  /** Custom / scoped engagement — no fixed package */
  isScoped?: boolean
}

export const SYSTEMS_TIERS: SystemsTier[] = [
  {
    id: 'booking-foundation',
    tier: 1,
    name: 'The Booking Foundation',
    timeline: '7–10 days',
    tagline: 'Get the core pieces connected.',
    forYouIf:
      'You have people interested. You have clients, fans, students, bookings or opportunities. But everything is scattered. Your website is one place. Your inquiries are somewhere else. Your calendar is somewhere else. Your payments are somewhere else. And you are the person connecting all of it.',
    features: [
      'Custom creative hub / website',
      'Lead or fan capture',
      'CRM setup',
      'Core pipeline',
      'Booking or inquiry flow',
      'Payment setup',
      'Essential integrations',
      'Basic automation',
      'Basic analytics',
    ],
    outcome:
      'A clean foundation for the business you are already running. Someone can find you. They know what to do next. You know where they came from. And the important information is not living exclusively in your head.',
    icon: 'solar:calendar-mark-linear',
    ctaLabel: 'Build the foundation',
    bestFor: ['Producer', 'Musician', 'Educator', 'Creative Business'],
  },
  {
    id: 'revenue-system',
    tier: 2,
    name: 'The Revenue System',
    timeline: '1–3 weeks',
    tagline: 'Connect the ways you actually make money.',
    forYouIf:
      'People are already interested. Some are buying. Some are booking. Some are asking questions. But there is no clean system connecting those interactions to revenue. You are manually following up, sending things, and figuring out who bought what. Every new offer creates another little system to maintain.',
    includesNote: 'Everything in The Booking Foundation, plus:',
    features: [
      'Advanced lead capture',
      'CRM segmentation',
      'Booking workflows',
      'Service workflows',
      'Digital products',
      'Product delivery',
      'Payment automation',
      'Email / SMS follow-up',
      'Customer journeys',
      'Rebooking / repeat purchase flows',
      'Revenue tracking',
      'Additional integrations',
    ],
    outcome:
      'Your revenue process stops being a collection of individual tasks. It becomes a connected system.',
    icon: 'solar:graph-up-linear',
    ctaLabel: 'Build the revenue system',
    bestFor: ['Artist', 'Producer', 'Musician'],
  },
  {
    id: 'client-machine',
    tier: 3,
    name: 'The Client Machine',
    timeline: '2–4+ weeks',
    tagline: 'Systemize the entire journey.',
    forYouIf:
      'The business works. That is not the problem. The problem is that you are still the system. You remember who needs a follow-up. You know which clients are waiting. You manually move people through the process. You send the same emails. You chase payments. You dig through conversations. If you step away, things start falling apart.',
    includesNote: 'Everything in The Revenue System, plus:',
    features: [
      'Advanced CRM',
      'Multiple pipelines',
      'Lead qualification',
      'Booking infrastructure',
      'Client onboarding',
      'Service workflows',
      'Product infrastructure',
      'Automated fulfillment',
      'Email / SMS journeys',
      'Rebooking',
      'Retention systems',
      'Membership',
      'Licensing',
      'Advanced integrations',
      'Reporting',
      'Internal notifications',
      'Custom workflow logic',
    ],
    outcome:
      'The business does not depend on you remembering every next step. The system handles the predictable stuff. You handle the creative decisions, relationships and work that actually require you.',
    icon: 'solar:cpu-bolt-linear',
    ctaLabel: 'Build the client machine',
    bestFor: ['Producer', 'Educator', 'Creative Business', 'Hybrid'],
  },
  {
    id: 'growth-infrastructure',
    tier: 4,
    name: 'The Growth Infrastructure',
    timeline: 'Custom',
    tagline: 'When the business is bigger than one workflow.',
    forYouIf:
      'You are not just managing one offer anymore. There are multiple people. Multiple brands. Multiple client types. Multiple revenue streams. Maybe multiple CRMs. Maybe multiple spreadsheets. Maybe a beautiful mess that somehow works. It is time to make the infrastructure match the business.',
    includesNote: 'Everything in The Client Machine, plus:',
    features: [
      'Multi-brand infrastructure',
      'Multiple creative profiles',
      'Central CRM',
      'Lead routing',
      'Multiple pipelines',
      'Team workflows',
      'Revenue tracking',
      'Individual customer journeys',
      'Shared automation',
      'Custom integrations',
      'Advanced reporting',
      'Permissions and access',
      'Cross-brand analytics',
      'Operational dashboards',
    ],
    outcome:
      'A backend that can support the business as a system rather than treating every person, client or revenue stream like a separate project.',
    icon: 'solar:buildings-3-linear',
    ctaLabel: 'Build the infrastructure',
    bestFor: ['Agency', 'Hybrid', 'Creative Business'],
  },
  {
    id: 'custom',
    tier: 5,
    name: 'Custom Build',
    timeline: 'Varies by project',
    tagline: 'When your business needs more than a fixed tier.',
    forYouIf:
      'Your setup does not fit cleanly into a tier. Multiple revenue streams, an unusual workflow, or specific integrations already in place.',
    includesNote: 'What a custom engagement can include:',
    isScoped: true,
    features: [
      'A discovery call to map your offers, audience, workflows, and goals',
      'A written scope and system architecture before anything gets built',
      'Any mix of the above tiers, plus net-new automation and integrations built for you specifically',
      'Phased delivery, built around your priorities and budget',
      'Custom pages, funnels, and client journeys designed around how you actually sell',
      'A flexible retainer sized to the work, not a fixed package',
    ],
    outcome: 'A backend built for your business. Nothing you do not need, nothing missing that you do.',
    icon: 'solar:slider-vertical-linear',
    ctaLabel: 'Map my system',
    bestFor: ['Hybrid', 'Agency', 'Creative Business'],
  },
]

export const SYSTEMS_FUNNEL_SLUGS = SYSTEMS_TIERS.map((tier) => tier.id)
