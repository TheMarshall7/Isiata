export type SystemModule = {
  id: string
  label: string
  lede: string
  items: string[]
  icon: string
}

export const SYSTEM_MODULES: SystemModule[] = [
  {
    id: 'audience',
    label: 'Audience',
    lede: 'Turn attention into something you actually own.',
    items: ['Email capture', 'SMS', 'Lead magnets', 'Fan CRM', 'Segmentation', 'Release campaigns', 'Follow-up', 'Community'],
    icon: 'solar:users-group-rounded-linear',
  },
  {
    id: 'bookings',
    label: 'Bookings',
    lede: 'Stop running your calendar through DMs.',
    items: [
      'Inquiry forms',
      'Availability',
      'Booking',
      'Deposits',
      'Payments',
      'Reminders',
      'Rescheduling',
      'Cancellations',
      'Rebooking',
    ],
    icon: 'solar:calendar-mark-linear',
  },
  {
    id: 'clients',
    label: 'Clients',
    lede: 'Move people from someone who messaged you to an actual client relationship.',
    items: [
      'Lead capture',
      'Qualification',
      'Pipelines',
      'Proposals',
      'Onboarding',
      'Client communication',
      'Project tracking',
      'Delivery',
      'Follow-up',
      'Retention',
    ],
    icon: 'solar:user-check-linear',
  },
  {
    id: 'products',
    label: 'Products',
    lede: 'Turn your creative work into things people can actually buy.',
    items: [
      'Digital products',
      'Music',
      'Sample packs',
      'Presets',
      'Templates',
      'Stems',
      'Merch',
      'Limited releases',
      'Automated delivery',
    ],
    icon: 'solar:box-linear',
  },
  {
    id: 'licensing',
    label: 'Licensing',
    lede: 'Give your catalog another way to make money.',
    items: [
      'Catalog organization',
      'Ownership tracking',
      'Metadata',
      'Sync opportunities',
      'Licensing inquiries',
      'Direct licensing',
      'License delivery',
      'Customer tracking',
    ],
    icon: 'solar:document-text-linear',
  },
  {
    id: 'payments',
    label: 'Payments',
    lede: 'Make getting paid part of the system instead of another manual step.',
    items: [
      'Deposits',
      'Service payments',
      'Product checkout',
      'Subscriptions',
      'Payment plans',
      'Automated receipts',
      'Purchase tracking',
    ],
    icon: 'solar:card-linear',
  },
  {
    id: 'automation',
    label: 'Automation',
    lede: 'If you have to remember to do it every time, it probably should not stay manual.',
    items: [
      'Lead follow-up',
      'Booking confirmations',
      'Reminders',
      'Purchase delivery',
      'Client onboarding',
      'Rebooking',
      'Release campaigns',
      'Retention',
      'Internal notifications',
    ],
    icon: 'solar:bolt-linear',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    lede: 'Know what is actually happening.',
    items: [
      'Leads',
      'Bookings',
      'Customers',
      'Purchases',
      'Conversion',
      'Revenue',
      'Repeat business',
      'Campaign performance',
    ],
    icon: 'solar:chart-2-linear',
  },
]

export function getModule(id: string): SystemModule | undefined {
  return SYSTEM_MODULES.find((module) => module.id === id)
}
