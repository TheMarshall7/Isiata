export const SYSTEMS_PAGE_COPY = {
  eyebrow: 'The infrastructure behind the creative work.',
  lede: [
    'You make the music. You build the brand. You work with clients. You teach. You perform. You sell things.',
    'The problem is everything around it.',
  ],
  problems: [
    'The inquiry sitting in your DMs.',
    'The client you forgot to follow up with.',
    'The booking living in a text thread.',
    'The fan who bought something six months ago and disappeared.',
    'The spreadsheet nobody updates.',
  ],
  punch: "That's what the system is for.",
  closer:
    'I build the digital infrastructure that connects the creative work to the business around it.',
  aroundHowYouWork: {
    eyebrow: 'Built around how you actually work',
    body: [
      'Not every creative business makes money the same way.',
      "An artist might need a fan system. A producer might need bookings and client follow-up. A musician might need both. An educator might need scheduling, payments and student retention. An agency might need to manage several creatives and several client pipelines at once.",
    ],
    punch: "So the system isn't a template you squeeze yourself into.",
    closer:
      "It's built around the way your business already works, then cleaned up, connected and automated where it makes sense.",
  },
  combine: {
    eyebrow: 'You can combine the pieces',
    body: 'The tiers are not boxes you have to force yourself into. The level tells us how much we are building. The modules tell us what we are building. That is how the system stays standardized without making your business generic.',
  },
  process: {
    eyebrow: 'What happens after you choose',
    steps: [
      {
        id: 'map',
        title: 'Map',
        body: 'We look at how the business actually works. Where people come from. What they are supposed to do. Where they get stuck. What you are doing manually. What is already working. What is not.',
      },
      {
        id: 'configure',
        title: 'Configure',
        body: 'We determine which parts of the system you actually need. No giant software stack because it looks impressive. No automation for the sake of automation. Just the infrastructure that supports the business.',
      },
      {
        id: 'build',
        title: 'Build',
        body: 'The hub, CRM, workflows, payments, integrations and automations get connected. Your existing tools get used where they make sense. New tools only get added when they are actually necessary.',
      },
      {
        id: 'test',
        title: 'Test',
        body: 'We do not just hand you a pile of workflows and call it done. We run through the actual customer journey. Inquiry. Booking. Payment. Purchase. Delivery. Follow-up. Whatever your business requires.',
      },
      {
        id: 'handoff',
        title: 'Hand off',
        body: 'You know what is happening. You know where things live. You know what the system is doing. And you have a foundation that can be expanded instead of rebuilt every time the business changes.',
      },
    ],
  },
  rule: {
    eyebrow: 'The rule',
    title: "Don't automate a problem you haven't understood.",
    body: 'More software does not automatically mean a better business. If nobody is clicking the offer, another automation will not fix it. If people are booking but not showing up, a new website will not fix it. If nobody knows you exist, a CRM is not the answer. First figure out what is actually broken. Then build around it.',
  },
  disappear: {
    eyebrow: 'The system should disappear into the business',
    body: 'The best infrastructure is not something you constantly think about. Someone fills out a form. The system knows where they go. Someone books. The system confirms it. Someone pays. The system records it. Someone buys. The system delivers it. Someone finishes a project. The system follows up. Someone comes back. The system already knows who they are.',
    punch: 'You should not have to babysit the backend for the backend to work.',
  },
}

export const BEFORE_AFTER = {
  before: {
    label: 'Before',
    nodes: [
      'Instagram DM',
      'Email',
      'Text',
      'Google Calendar',
      'Stripe',
      'Spreadsheet',
      'Did I follow up?',
    ],
  },
  after: {
    label: 'After',
    nodes: ['Leads', 'Bookings', 'Sales', 'CRM', 'Follow-up'],
  },
}

export const WHAT_HAPPENS_WHEN = [
  {
    id: 'inquiry',
    question: 'Someone fills out your inquiry form?',
    steps: ['Lead created', 'Tagged', 'Notified', 'Follow-up starts'],
  },
  {
    id: 'books',
    question: 'Someone books?',
    steps: ['Calendar updated', 'Confirmation', 'Payment', 'Reminder'],
  },
  {
    id: 'buys',
    question: 'Someone buys?',
    steps: ['Payment', 'Delivery', 'Customer tagged', 'Follow-up'],
  },
  {
    id: 'silent',
    question: "Someone doesn't respond?",
    steps: ['Reminder', 'Second follow-up', 'Pipeline updated'],
  },
  {
    id: 'returns',
    question: 'Someone comes back six months later?',
    steps: ['History is already there'],
  },
]

export const SYSTEM_STACK_LAYERS = [
  {
    id: 'frontend',
    number: '01',
    title: 'Front end',
    items: ['Website', 'Social', 'Content', 'Booking pages', 'Store'],
  },
  {
    id: 'capture',
    number: '02',
    title: 'Capture',
    items: ['Forms', 'Email', 'SMS', 'Lead magnets'],
  },
  {
    id: 'crm',
    number: '03',
    title: 'CRM',
    items: ['Contacts', 'Tags', 'Pipelines', 'Customer states'],
  },
  {
    id: 'transactions',
    number: '04',
    title: 'Transactions',
    items: ['Bookings', 'Payments', 'Products', 'Subscriptions'],
  },
  {
    id: 'automation',
    number: '05',
    title: 'Automation',
    items: ['Follow-up', 'Delivery', 'Reminders', 'Retention'],
  },
  {
    id: 'data',
    number: '06',
    title: 'Data',
    items: ['Revenue', 'Conversion', 'Customers', 'Performance'],
  },
]

export const MANUAL_VS_SYSTEM = {
  you: ['Creative decisions', 'Client relationships', 'Making music', 'Teaching', 'Performing', 'Approving work'],
  system: [
    'Capture',
    'Scheduling',
    'Payment',
    'Reminders',
    'Delivery',
    'Follow-up',
    'Tagging',
    'Reporting',
  ],
  punch: 'The system does not replace the creative work. It removes the repetitive work around it.',
}

export const SYSTEM_ACTIVITY = [
  { value: '12', label: 'New leads' },
  { value: '4', label: 'Bookings' },
  { value: '7', label: 'Payments' },
  { value: '3', label: 'Follow-ups' },
  { value: '2', label: 'Repeat clients' },
]

export const DIAGNOSTICS = [
  {
    id: 'leads',
    label: "I'm losing leads",
    body: 'You probably do not need more traffic yet. You need capture, CRM, follow-up and conversion.',
    flow: ['Capture', 'CRM', 'Follow-up', 'Conversion'],
  },
  {
    id: 'chasing',
    label: "I'm chasing clients",
    body: 'The inquiry is landing. The follow-through is not. You need booking, reminders, payments and rebooking.',
    flow: ['Inquiry', 'Booking', 'Reminders', 'Payment'],
  },
  {
    id: 'repeat',
    label: "I'm struggling to get repeat business",
    body: 'People buy or book once, then disappear. You need delivery, tagging, follow-up and a reason to come back.',
    flow: ['Delivery', 'Tagging', 'Follow-up', 'Repeat offer'],
  },
  {
    id: 'scattered',
    label: 'Everything is scattered',
    body: 'The tools exist. They just do not talk to each other. You need a hub, a CRM, and the connections between them.',
    flow: ['Hub', 'CRM', 'Integrations', 'One view'],
  },
]

export type ArchitectureStageId =
  | 'capture'
  | 'organize'
  | 'convert'
  | 'deliver'
  | 'retain'
  | 'measure'

export const ARCHITECTURE_STAGES: {
  id: ArchitectureStageId
  title: string
  items: string[]
}[] = [
  {
    id: 'capture',
    title: 'Capture',
    items: ['Forms', 'Email', 'SMS', 'Lead magnets', 'Social', 'Content'],
  },
  {
    id: 'organize',
    title: 'Organize',
    items: ['Contacts', 'Tags', 'Pipelines', 'Routing', 'Customer states'],
  },
  {
    id: 'convert',
    title: 'Convert',
    items: ['Bookings', 'Products', 'Services', 'Memberships', 'Licensing'],
  },
  {
    id: 'deliver',
    title: 'Deliver',
    items: ['Onboarding', 'Fulfillment', 'Sessions', 'Files', 'Confirmations'],
  },
  {
    id: 'retain',
    title: 'Retain',
    items: ['Follow-up', 'Email', 'SMS', 'Rebooking', 'Repeat purchases', 'Membership'],
  },
  {
    id: 'measure',
    title: 'Measure',
    items: ['Leads', 'Conversion', 'Revenue', 'Repeat business', 'Campaigns'],
  },
]
