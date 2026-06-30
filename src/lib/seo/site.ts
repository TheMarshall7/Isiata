import { SITE_CONFIG } from '@/lib/constants'

/** Canonical site origin (no trailing slash). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || SITE_CONFIG.url
).replace(/\/$/, '')

export function absoluteUrl(path = ''): string {
  if (!path) return siteUrl
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalized}`
}

export function absoluteImageUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return absoluteUrl(url)
}
