# ISIATA

Premium, minimal, category-agnostic website for the ISIATA brand.

## Overview

ISIATA spans:
- **Sound**: Music releases, playlists, videos
- **Objects**: Fashion drops, garments, accessories
- **Tools**: Sample packs, plugins, digital products
- **Access**: Private sessions, creative direction, collaborations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Content**: File-based (MDX/JSON) with CMS migration path
- **Icons**: Iconify

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── explore/           # Explore page
│   ├── sound/             # Sound pages
│   ├── objects/           # Objects pages
│   ├── tools/             # Tools pages
│   ├── access/            # Access page
│   ├── archive/           # Archive page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── api/               # API routes
├── components/
│   ├── layout/            # Layout components
│   ├── ui/                # UI components
│   ├── cards/             # Card components
│   └── forms/             # Form components
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript types
└── content/               # Content files (future)
```

## Design System

### Colors
- Background: `#020202`
- Surface: `#0A0A0A`
- Primary text: White
- Secondary text: Zinc-400/500
- Accent: Purple-500

### Typography
- Body: Plus Jakarta Sans
- Headings: Oswald (uppercase)
- Mono: System mono

### Components
- Flashlight card hover effects
- Reveal animations on scroll
- Glassmorphic navigation
- Minimal badge system
- Responsive grid layouts

## Content Management

Currently file-based. To migrate to CMS:

1. Choose CMS (Sanity, Contentful, or Strapi)
2. Map TypeScript interfaces to CMS schema
3. Update `lib/api.ts` to fetch from CMS
4. Configure preview mode

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Other Platforms

Build static export:

```bash
npm run build
```

Deploy the `.next` directory.

## Environment Variables

Create `.env.local`:

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-id

# Email service (when integrated)
NEWSLETTER_API_KEY=your-key
CONTACT_EMAIL=contact@isiata.com
```

## Key Features

- ✅ Premium minimal design
- ✅ Fully responsive
- ✅ SEO optimized
- ✅ Accessible (WCAG guidelines)
- ✅ Performance optimized
- ✅ Type-safe with TypeScript
- ✅ Drop system with status (upcoming, live, archived)
- ✅ Email capture
- ✅ Contact form
- ✅ Archive system

## Brand Rules

1. **No genre labels** - Culture and innovation
2. **Restraint** - Subtle CTAs, no hype language
3. **Limited offerings** - Drops can be archived
4. **Premium tone** - Clarity and atmosphere
5. **Artist-first** - Products are artifacts of practice

## Analytics Events

Tracked events:
- `view_item`: Detail page views
- `play_track`: Audio playback
- `join_list`: Newsletter signups
- `request_access`: Access requests
- `purchase_click`: External purchase clicks
- `category_filter`: Filter usage

## License

Private - All rights reserved

## Contact

For questions or support, visit [isiata.com/contact](https://isiata.com/contact)
