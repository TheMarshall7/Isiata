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
  // Artist Development replaces Systems. Keep old links and search results working.
  async redirects() {
    return [
      { source: '/systems', destination: '/artists', permanent: true },
      { source: '/systems/:path*', destination: '/artists', permanent: true },
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
