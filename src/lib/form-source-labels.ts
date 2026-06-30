const NEWSLETTER_SOURCE_LABELS: Record<string, string> = {
  homepage: 'Homepage — Mailing List',
  footer: 'Footer — Mailing List',
  community: 'Community — Waitlist',
  garments: 'Objects / Garments — Notify',
  ear_trainer_gate: 'Ear Mastery — Access Gate',
  website_footer: 'Website — Mailing List',
}

export function formatNewsletterSource(source: string): string {
  if (NEWSLETTER_SOURCE_LABELS[source]) {
    return NEWSLETTER_SOURCE_LABELS[source]
  }

  if (source.startsWith('garment-')) {
    const slug = source.slice('garment-'.length)
    return `Garment product page — ${slug}`
  }

  return `Mailing List — ${source}`
}
