export const SITE_CONFIG = {
  name: 'ISIATA',
  description: 'Culture over category. Sound, objects, tools, and access.',
  url: 'https://isiata.com',
  ogImage: '/og-image.jpg',
  contactEmail: 'Brian@areoclient.com',
  links: {
    soundcloud: 'https://soundcloud.com/isiataofficial',
    tiktok: 'https://www.tiktok.com/@isiataOfficial',
    instagram: 'https://www.instagram.com/isiataofficial',
    youtube: 'https://www.youtube.com/channel/UCEUFkFiczRx7RXuunjA3Hmg',
  },
}

export const NAV_LINKS = [
  { href: '/sound', label: 'Sound' },
  { href: '/objects', label: 'Garments' },
  { href: '/tools', label: 'Tools' },
  { href: '/access', label: 'Access' },
]

export const FOOTER_LINKS = {
  explore: [
    { href: '/sound', label: 'Sound' },
    { href: '/objects', label: 'Garments' },
    { href: '/tools', label: 'Tools' },
    { href: '/access', label: 'Access' },
  ],
  information: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/legal/licensing', label: 'Licensing' },
    { href: '/legal/terms', label: 'Terms' },
    { href: '/legal/privacy', label: 'Privacy' },
  ],
}

export const STATUS_COLORS = {
  live: 'bg-green-500/20 text-green-200 border-green-500/30',
  upcoming: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
  archived: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  'sold-out': 'bg-red-500/20 text-red-200 border-red-500/30',
}

export const ANIMATION_DELAYS = {
  stagger: 100, // ms between staggered animations
  reveal: 1000, // ms for reveal animation
}

/** GoHighLevel order form URL for tools checkout (used on product page + full-page order) */
export const GHL_ORDER_FORM_URL =
  'https://link.fastpaydirect.com/payment-link/6982c3273533386a60c3d4c7'

/** Calendar embed URL for Access booking (Lead Connector / GHL widget). Leave empty to show placeholder. */
export const CALENDAR_EMBED_URL = 'https://api.leadconnectorhq.com/widget/booking/0RMK2V7TPRYpGm701Ain'

/**
 * GoHighLevel webhook URL for newsletter/mailing list signups.
 * To set this up in GHL:
 * 1. Go to Automations > Create Workflow
 * 2. Add trigger "Inbound Webhook"
 * 3. Copy the webhook URL and paste it here
 * 4. In the workflow, add actions to create/update contact with the email
 * Leave empty to disable newsletter functionality.
 */
export const GHL_NEWSLETTER_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/F1J2yvd2AUT4owDs9EPl/webhook-trigger/af5825e1-fc93-4ba9-99f1-b5c2968df234'

/**
 * GoHighLevel webhook URL for contact form submissions.
 * To set this up in GHL:
 * 1. Go to Automations > Create Workflow
 * 2. Add trigger "Inbound Webhook"
 * 3. Copy the webhook URL and paste it here
 * 4. In the workflow, add actions to send email notification to Brian@areoclient.com
 * Leave empty to only log submissions (no email notification).
 */
export const GHL_CONTACT_WEBHOOK_URL = ''
