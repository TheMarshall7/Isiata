export const ISIATA_LOGO_URL =
  'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67acbb51f52f42753175f9fe.png'

export const SITE_CONFIG = {
  name: 'ISIATA',
  description: 'Culture and innovation. Sound, objects, tools, and access.',
  url: 'https://isiata.com',
  ogImage: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/6777a197ce41a65e1d80127d.jpeg',
  contactEmail: 'isiataofficial@gmail.com',
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
  { href: '/systems', label: 'Systems' },
  { href: '/contact', label: 'Contact' },
]

export const FOOTER_LINKS = {
  explore: [
    { href: '/sound', label: 'Sound' },
    { href: '/objects', label: 'Garments' },
    { href: '/tools', label: 'Tools' },
    { href: '/systems', label: 'Systems' },
    { href: '/contact', label: 'Contact' },
  ],
  information: [
    { href: '/about', label: 'About' },
    { href: 'mailto:isiataofficial@gmail.com', label: 'General Inquiry' },
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

/** GoHighLevel order form URL for tools checkout (used on product page + full-page order).
 *  Update the product price in GHL to match DRUM_BUNDLE_PRICE ($49.97). */
export const GHL_ORDER_FORM_URL =
  'https://link.fastpaydirect.com/payment-link/6982c3273533386a60c3d4c7'

/** Calendar embed URL for Access booking (Lead Connector / GHL widget). Leave empty to show placeholder. */
export const CALENDAR_EMBED_URL = 'https://api.leadconnectorhq.com/widget/booking/0RMK2V7TPRYpGm701Ain'

/**
 * GoHighLevel webhook URL for newsletter / community “get notified” signups.
 * Payload (JSON): email, name, first_name, last_name, source, timestamp.
 *
 * In the workflow Create/Update Contact action, use INBOUND WEBHOOK variables, not contact:
 *   Email field  → {{inboundWebhookRequest.email}}
 *   Name field  → {{inboundWebhookRequest.name}}
 *   First name  → {{inboundWebhookRequest.first_name}}
 *   Last name   → {{inboundWebhookRequest.last_name}}
 *   Source      → {{inboundWebhookRequest.source}}
 * (Contact placeholders like {{contact.email}} are for the contact record after it’s created; the action needs to pull from inboundWebhookRequest to fill those.)
 * Leave empty to disable.
 */
export const GHL_NEWSLETTER_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/F1J2yvd2AUT4owDs9EPl/webhook-trigger/c1a53b5c-caf4-4703-9d45-03b9f0ca3119'

/** Formsubmit.co inbox for mailing list lead email notifications (runs alongside the GHL webhook). */
export const NEWSLETTER_LEAD_NOTIFY_EMAIL = 'brian.marshallca@gmail.com'

/**
 * Optional. Contact form uses Formsubmit.co (no API key). Leave empty.
 * Legacy: GHL webhook fallback if you ever switch.
 */
export const GHL_CONTACT_WEBHOOK_URL = ''
