/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
  // Systems became Services. The old Systems page now lives under Services → Business,
  // and the short-lived /mix-master page folded into Services → Music.
  async redirects() {
    const system = '/services/business/artist-business-system'
    return [
      { source: '/artists', destination: system, permanent: true },
      { source: '/systems', destination: system, permanent: true },
      { source: '/systems/:path+', destination: system, permanent: true },
      { source: '/mix-master', destination: '/services/music', permanent: true },
    ]
  },
  // Unreleased campaign: unlisted and never indexed. Not mentioned in robots.txt on purpose.
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' }]
    return [
      { source: '/fne-preview', headers: noindex },
      { source: '/fne-preview/:path*', headers: noindex },
      { source: '/api/fne/:path*', headers: noindex },
    ]
  },
}

module.exports = nextConfig
