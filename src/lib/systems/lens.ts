export type SystemLensId =
  | 'artist'
  | 'producer'
  | 'musician'
  | 'educator'
  | 'agency'
  | 'hybrid'

export type WorkflowStep = {
  id: string
  label: string
}

export type CrmState = {
  id: string
  label: string
}

export type CrmLead = {
  name: string
  offer: string
  status: string
  tone: 'new' | 'pending' | 'active' | 'done'
}

export type FanProfile = {
  name: string
  since: string
  source: string
  activity: string[]
  value: string
  status: string
}

export type SystemLens = {
  id: SystemLensId
  label: string
  short: string
  description: string
  heroPath: string[]
  workflow: WorkflowStep[]
  modules: string[]
  recommendedTierId: string
  crmStates: CrmState[]
  crmLeads: CrmLead[]
  fanProfile?: FanProfile
  assembledFlow: string[]
  architectureEmphasis: string[]
}

export const SYSTEM_LENSES: SystemLens[] = [
  {
    id: 'artist',
    label: 'Artist',
    short: 'Audience, releases, products, fans',
    description:
      'Build your audience, releases, products, licensing and fan relationships into one system.',
    heroPath: ['Content', 'Hub', 'Fan', 'Email', 'Vault', 'Purchase', 'Repeat'],
    workflow: [
      { id: 'content', label: 'Content' },
      { id: 'hub', label: 'Hub' },
      { id: 'fan', label: 'Fan capture' },
      { id: 'email', label: 'Email' },
      { id: 'vault', label: 'Vault' },
      { id: 'purchase', label: 'Purchase' },
      { id: 'repeat', label: 'Repeat' },
    ],
    modules: ['audience', 'products', 'licensing', 'payments', 'automation', 'analytics'],
    recommendedTierId: 'revenue-system',
    crmStates: [
      { id: 'lead', label: 'Lead' },
      { id: 'fan', label: 'Fan' },
      { id: 'buyer', label: 'Buyer' },
      { id: 'repeat', label: 'Repeat buyer' },
      { id: 'superfan', label: 'Superfan' },
    ],
    crmLeads: [
      { name: 'Maya', offer: 'Vault download', status: 'Repeat buyer', tone: 'active' },
      { name: 'Chris', offer: 'Release email', status: 'Opened', tone: 'pending' },
      { name: 'Jules', offer: 'Merch drop', status: 'New fan', tone: 'new' },
    ],
    fanProfile: {
      name: 'Maya',
      since: 'Jan 2026',
      source: 'Instagram',
      activity: ['Downloaded demo', 'Bought Vault', 'Opened release email', 'Purchased merch'],
      value: '$87',
      status: 'Repeat Buyer',
    },
    assembledFlow: ['Fan capture', 'Vault', 'Purchase', 'Delivery', 'Follow-up', 'Repeat buyer'],
    architectureEmphasis: ['capture', 'convert', 'deliver', 'retain'],
  },
  {
    id: 'producer',
    label: 'Producer',
    short: 'Inquiries, bookings, repeat clients',
    description: 'Turn inquiries into booked sessions, paid projects and repeat clients.',
    heroPath: ['Content', 'Inquiry', 'Qualified', 'Booking', 'Deposit', 'Session', 'Delivery', 'Rebooking'],
    workflow: [
      { id: 'content', label: 'Content / Referral' },
      { id: 'inquiry', label: 'Inquiry' },
      { id: 'qualification', label: 'Qualification' },
      { id: 'booking', label: 'Booking' },
      { id: 'deposit', label: 'Deposit' },
      { id: 'session', label: 'Session' },
      { id: 'delivery', label: 'Delivery' },
      { id: 'rebooking', label: 'Rebooking' },
    ],
    modules: ['bookings', 'clients', 'payments', 'automation', 'analytics'],
    recommendedTierId: 'client-machine',
    crmStates: [
      { id: 'lead', label: 'Lead' },
      { id: 'qualified', label: 'Qualified' },
      { id: 'client', label: 'Client' },
      { id: 'project', label: 'Active project' },
      { id: 'completed', label: 'Completed' },
      { id: 'repeat', label: 'Repeat client' },
    ],
    crmLeads: [
      { name: 'Marcus', offer: 'Beat session', status: 'Qualified', tone: 'new' },
      { name: 'Sarah', offer: 'Mixing', status: 'Deposit pending', tone: 'pending' },
      { name: 'Daniel', offer: 'Production', status: 'Booked', tone: 'active' },
    ],
    assembledFlow: ['Inquiry', 'Booking', 'Payment', 'Client', 'Delivery', 'Follow-up'],
    architectureEmphasis: ['capture', 'organize', 'convert', 'deliver', 'retain'],
  },
  {
    id: 'musician',
    label: 'Musician',
    short: 'Audience, gigs, payments, follow-up',
    description: 'Connect your audience, bookings, gigs, payments and follow-up.',
    heroPath: ['Audience', 'Hub', 'Inquiry', 'Availability', 'Deposit', 'Gig', 'Payment', 'Follow-up'],
    workflow: [
      { id: 'audience', label: 'Audience' },
      { id: 'hub', label: 'Hub' },
      { id: 'inquiry', label: 'Booking request' },
      { id: 'availability', label: 'Availability' },
      { id: 'deposit', label: 'Deposit' },
      { id: 'gig', label: 'Gig' },
      { id: 'payment', label: 'Payment' },
      { id: 'followup', label: 'Follow-up' },
      { id: 'next', label: 'Next booking' },
    ],
    modules: ['audience', 'bookings', 'payments', 'clients', 'products'],
    recommendedTierId: 'booking-foundation',
    crmStates: [
      { id: 'lead', label: 'Lead' },
      { id: 'inquiry', label: 'Inquiry' },
      { id: 'booked', label: 'Booked' },
      { id: 'played', label: 'Played' },
      { id: 'paid', label: 'Paid' },
      { id: 'repeat', label: 'Repeat booking' },
    ],
    crmLeads: [
      { name: 'The Loft', offer: 'Friday set', status: 'Deposit paid', tone: 'active' },
      { name: 'Nora', offer: 'Private event', status: 'Availability check', tone: 'pending' },
      { name: 'Red Room', offer: 'Residency', status: 'New inquiry', tone: 'new' },
    ],
    assembledFlow: ['Booking request', 'Availability', 'Deposit', 'Gig', 'Payment', 'Follow-up'],
    architectureEmphasis: ['capture', 'convert', 'deliver', 'retain'],
  },
  {
    id: 'educator',
    label: 'Educator',
    short: 'Scheduling, payments, retention',
    description: 'Manage inquiries, scheduling, payments, students and retention.',
    heroPath: ['Interest', 'Inquiry', 'Trial', 'Booking', 'Payment', 'Lesson', 'Follow-up', 'Retention'],
    workflow: [
      { id: 'interest', label: 'Interest' },
      { id: 'inquiry', label: 'Inquiry' },
      { id: 'trial', label: 'Trial' },
      { id: 'booking', label: 'Booking' },
      { id: 'payment', label: 'Payment' },
      { id: 'lesson', label: 'Lesson' },
      { id: 'followup', label: 'Follow-up' },
      { id: 'retention', label: 'Retention' },
    ],
    modules: ['bookings', 'clients', 'payments', 'automation', 'analytics'],
    recommendedTierId: 'client-machine',
    crmStates: [
      { id: 'lead', label: 'Lead' },
      { id: 'trial', label: 'Trial' },
      { id: 'student', label: 'Student' },
      { id: 'active', label: 'Active' },
      { id: 'renewal', label: 'Renewal' },
    ],
    crmLeads: [
      { name: 'Elena', offer: 'Vocal coaching', status: 'Active student', tone: 'active' },
      { name: 'Malik', offer: 'Trial lesson', status: 'Scheduled', tone: 'pending' },
      { name: 'Rin', offer: 'Production class', status: 'New inquiry', tone: 'new' },
    ],
    assembledFlow: ['Inquiry', 'Trial', 'Booking', 'Payment', 'Lesson', 'Retention'],
    architectureEmphasis: ['capture', 'convert', 'deliver', 'retain', 'measure'],
  },
  {
    id: 'agency',
    label: 'Agency',
    short: 'Roster, routing, reporting',
    description: 'Manage multiple creatives, clients, revenue streams and systems from one backend.',
    heroPath: ['Lead', 'Qualification', 'Routing', 'Creative', 'Project', 'Delivery', 'Reporting'],
    workflow: [
      { id: 'lead', label: 'Lead' },
      { id: 'qualification', label: 'Qualification' },
      { id: 'routing', label: 'Routing' },
      { id: 'creative', label: 'Creative' },
      { id: 'project', label: 'Project' },
      { id: 'delivery', label: 'Delivery' },
      { id: 'reporting', label: 'Reporting' },
    ],
    modules: ['clients', 'bookings', 'payments', 'automation', 'analytics'],
    recommendedTierId: 'growth-infrastructure',
    crmStates: [
      { id: 'lead', label: 'Lead' },
      { id: 'qualified', label: 'Qualified' },
      { id: 'routed', label: 'Routed' },
      { id: 'project', label: 'Project' },
      { id: 'delivered', label: 'Delivered' },
      { id: 'reported', label: 'Reported' },
    ],
    crmLeads: [
      { name: 'Northline', offer: 'Campaign', status: 'Routed to roster', tone: 'active' },
      { name: 'Kira', offer: 'Sync brief', status: 'Qualified', tone: 'pending' },
      { name: 'Atlas', offer: 'Retainer', status: 'New lead', tone: 'new' },
    ],
    assembledFlow: ['Lead', 'Qualification', 'Routing', 'Project', 'Delivery', 'Reporting'],
    architectureEmphasis: ['organize', 'convert', 'deliver', 'measure'],
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    short: 'Because sometimes you are all of the above',
    description: 'Because sometimes you are all of the above.',
    heroPath: ['Content', 'Hub', 'Audience', 'Inquiry', 'Offer', 'Payment', 'Delivery', 'Retain'],
    workflow: [
      { id: 'content', label: 'Content' },
      { id: 'hub', label: 'Hub' },
      { id: 'audience', label: 'Audience' },
      { id: 'inquiry', label: 'Inquiry' },
      { id: 'offer', label: 'Offer' },
      { id: 'payment', label: 'Payment' },
      { id: 'delivery', label: 'Delivery' },
      { id: 'retain', label: 'Retain' },
    ],
    modules: ['audience', 'bookings', 'clients', 'products', 'payments', 'automation'],
    recommendedTierId: 'revenue-system',
    crmStates: [
      { id: 'lead', label: 'Lead' },
      { id: 'fan', label: 'Fan' },
      { id: 'client', label: 'Client' },
      { id: 'buyer', label: 'Buyer' },
      { id: 'repeat', label: 'Repeat' },
    ],
    crmLeads: [
      { name: 'Amina', offer: 'Session + pack', status: 'Client + buyer', tone: 'active' },
      { name: 'Leo', offer: 'Newsletter', status: 'Fan', tone: 'pending' },
      { name: 'Sky', offer: 'Booking form', status: 'New inquiry', tone: 'new' },
    ],
    assembledFlow: ['Hub', 'Capture', 'Offer', 'Payment', 'Delivery', 'Follow-up'],
    architectureEmphasis: ['capture', 'organize', 'convert', 'deliver', 'retain', 'measure'],
  },
]

export const DEFAULT_LENS_ID: SystemLensId = 'producer'

export function getLens(id: SystemLensId): SystemLens {
  return SYSTEM_LENSES.find((lens) => lens.id === id) ?? SYSTEM_LENSES[1]
}
