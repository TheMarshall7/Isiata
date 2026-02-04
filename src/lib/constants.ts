export const SITE_CONFIG = {
  name: 'ISIATA',
  description: 'Culture over category. Sound, objects, tools, and access.',
  url: 'https://isiata.com',
  ogImage: '/og-image.jpg',
  links: {
    soundcloud: '#',
    tiktok: '#',
    instagram: '#',
    youtube: '#',
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
