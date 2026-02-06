# ISIATA Website Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Design System](#design-system)
3. [Component Architecture](#component-architecture)
4. [Page Structure](#page-structure)
5. [Content Model](#content-model)
6. [Drop System](#drop-system)
7. [Data Flow](#data-flow)
8. [Future Enhancements](#future-enhancements)

---

## Overview

ISIATA is a premium, minimal website that spans four core categories:
- **Sound**: Music releases, playlists, videos
- **Objects**: Fashion drops, garments, accessories
- **Tools**: Sample packs, plugins, digital products
- **Access**: Private sessions, creative direction, collaborations

### Brand Principles
- Culture and innovation
- No genre labels or excessive explanations
- Premium restraint and clarity
- Limited, intentional offerings
- Subtle CTAs (Explore, Listen, Access, Join)

---

## Design System

### Color Palette

```css
/* Core Colors */
--background: #020202
--surface: #0A0A0A
--border: rgba(255, 255, 255, 0.1)

/* Text */
--text-primary: #ffffff
--text-secondary: #a1a1aa (zinc-400)
--text-tertiary: #71717a (zinc-500)
--text-muted: #52525b (zinc-600)

/* Accent */
--accent: #a855f7 (purple-500)
```

### Typography

**Font Families:**
- Body: Plus Jakarta Sans
- Display: Oswald (uppercase for large headings)
- Mono: System monospace

**Scale:**
```
text-xs:   12px  - Metadata, captions
text-sm:   14px  - Secondary text, labels
text-base: 16px  - Body text (default)
text-lg:   18px  - Emphasized body
text-xl:   20px  - Small headings
text-2xl:  24px  - Section subheadings
text-3xl:  30px  - Section headings
text-4xl:  36px  - Page titles
text-5xl:  48px  - Hero headings (mobile)
text-7xl:  72px  - Hero headings (tablet)
text-8xl:  96px  - Hero headings (desktop)
```

### Spacing System

Based on 4px (0.25rem) increments:
- `space-4`: 16px - Default gap
- `space-6`: 24px - Card padding
- `space-8`: 32px - Component spacing
- `space-12`: 48px - Between sections (mobile)
- `space-16`: 64px - Between sections (tablet)
- `space-24`: 96px - Between sections (desktop)

### Animation System

**Reveal Animation:**
```css
@keyframes reveal {
  0% {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

**Timing:** cubic-bezier(0.2, 0.8, 0.2, 1)
**Duration:** 1s
**Stagger Delay:** 100ms between elements

**Flashlight Effect:**
- Mouse-tracking spotlight on cards
- Subtle glow at cursor position
- Opacity: 0 → 1 on hover
- Transition: 500ms

### UI Components

#### Button Variants
- **Primary**: White background, black text
- **Secondary**: Black background, white border, white text
- **Ghost**: Transparent, white text

#### Badge Status
- **Live**: Green (available now)
- **Upcoming**: Amber (coming soon)
- **Archived**: Gray (past release)
- **Sold Out**: Red (unavailable)

---

## Component Architecture

### Layout Components

**`<BackgroundEffects />`**
- Diagonal stripe pattern
- Fixed position overlay
- Subtle texture

**`<Header />`**
- Floating navigation bar
- Glassmorphic backdrop
- Responsive mobile menu
- Max-width: 1024px (4xl)

**`<Footer />`**
- Social media grid (4 columns)
- Footer links (4 columns)
- Email capture
- Copyright bar

### UI Components

**`<Container />`**
- Max-width wrapper
- Optional borders (left/right)
- Responsive padding
- Variants: full, 7xl, 4xl, 2xl

**`<Section />`**
- Vertical rhythm
- Optional reveal animation
- Intersection observer for scroll-triggered animations

**`<Button />`**
- Three variants (primary, secondary, ghost)
- Three sizes (sm, md, lg)
- Can render as link or button

**`<Badge />`**
- Status indicator
- Four states (live, upcoming, archived, sold-out)
- Color-coded with borders

### Card Components

**`<SoundCard />`**
- Square aspect ratio
- Cover art image
- Title, artist, date
- Status badge (if not live)
- Flashlight hover effect

**`<ObjectCard />`**
- 3:4 aspect ratio (portrait)
- Product image
- Title, price
- Available quantity
- Status badge

**`<ToolCard />`**
- Square aspect ratio
- Preview image or icon
- Title, format badges
- Price
- Status badge

### Form Components

**`<EmailCapture />`**
- Email input + submit
- Loading state
- Success message
- Error handling
- Tracks `join_list` event

---

## Page Structure

### Home (`/`)
1. **Hero**: ISIATA branding, tagline, single CTA
2. **Featured Categories**: 3-column grid (Sound, Objects, Tools)
3. **Mailing List**: Email capture section

### Explore (`/explore`)
1. **Page Header**: Title + subtitle
2. **Category Grid**: 4 large cards with descriptions

### Category Index Pages (`/sound`, `/objects`, `/tools`)
1. **Page Header**: Large title
2. **Filter Bar**: Status/format filters
3. **Grid**: Card grid (3-4 columns desktop, 1 mobile)
4. **Empty State**: When no content

### Detail Pages (`/sound/[slug]`, `/objects/[slug]`, `/tools/[slug]`)
1. **Hero**: Large media + metadata
2. **Description**: Product/release details
3. **Specifications**: Details list
4. **CTA**: Purchase/download/listen
5. **Related Items**: 3-4 similar items

### Access (`/access`)
1. **Page Header**: Title + description
2. **Offer Cards**: Grid of access types
3. **Request Form**: Application form (when active)

### Archive (`/archive`)
1. **Page Header**: Title + description
2. **Filter Bar**: Category + year filters
3. **Timeline/Grid**: Chronological display

### About (`/about`)
1. **Hero**: Title
2. **Story**: 2-3 paragraphs
3. **Principles**: 3-column grid

### Contact (`/contact`)
1. **Page Header**: Title
2. **Contact Form**: Name, email, subject, message
3. **Note**: Response time expectation

---

## Content Model

### Base Content Interface
```typescript
interface BaseContent {
  id: string
  slug: string
  title: string
  description: string
  category: 'sound' | 'objects' | 'tools' | 'access'
  publishedAt: Date
  updatedAt: Date
  featured: boolean
  seo: SEOMetadata
}
```

### Content Types

**SoundRelease**
- Extends `BaseContent`
- `artist`, `releaseDate`, `coverArt`
- `trackList[]`, `streamingLinks[]`
- `credits[]`, `visualMedia[]`
- `status: DropStatus`

**ObjectDrop**
- Extends `BaseContent`
- `dropDate`, `price`, `currency`
- `availableQuantity`, `totalQuantity`
- `images[]`, `materials[]`
- `status: DropStatus`

**ToolProduct**
- Extends `BaseContent`
- `price`, `fileSize`, `format[]`
- `compatibility[]`, `specifications[]`
- `license: LicenseType`
- `status: DropStatus`

**AccessOffer**
- Extends `BaseContent`
- `offerType`, `availability`
- `duration`, `deliverables[]`
- `applicationForm[]`

---

## Drop System

### Status Flow

```
UPCOMING → LIVE → ARCHIVED
         ↘ SOLD OUT → ARCHIVED
```

### Status Behavior

**Upcoming**
- Display: Countdown or launch date
- CTA: "Notify Me" / "Join Waitlist"
- Badge: Amber color

**Live**
- Display: "Available Now"
- Show quantity if limited
- CTA: "Purchase" / "Download" / "Listen"
- Badge: Green color

**Archived**
- Display: "Archived"
- Still viewable
- No purchase CTA
- Badge: Gray color

### Scarcity Language Rules

**DO:**
- "Limited availability"
- "X remaining"
- "Available until [date]"
- "One-time offering"

**DON'T:**
- "HURRY!" / "ACT NOW!"
- "LAST CHANCE!"
- "GOING FAST!"
- Red countdown timers
- Artificial pressure

---

## Data Flow

### Current: File-Based

```
/content
  /sound
    release-1.mdx
  /objects
    drop-1.mdx
  /tools
    tool-1.mdx
```

**Frontmatter (YAML)**
```yaml
---
id: "001"
slug: "tsukuyomi-drum-bundle"
title: "Tsukuyomi Drum Bundle"
category: "tools"
status: "live"
price: "$59.00"
publishedAt: "2024-01-15"
---
```

### Future: CMS Integration

**Recommended Options:**
1. **Sanity.io** - Real-time, structured content
2. **Contentful** - Enterprise-ready
3. **Strapi** - Self-hosted

**Migration Path:**
1. Map TypeScript interfaces to CMS schema
2. Create content types in CMS
3. Update `lib/api.ts` to fetch from CMS
4. Add preview mode for editors
5. Keep static generation for performance

---

## Analytics Events

### Tracked Events

```typescript
// Item views
analytics.viewItem(itemId, itemName, category, status)

// Media interaction
analytics.playTrack(trackId, releaseId, releaseName)
analytics.watchVideo(videoId, itemId, itemName)

// Conversions
analytics.joinList(source, preferences)
analytics.requestAccess(accessType)
analytics.purchaseClick(itemId, itemName, price, category)

// Navigation
analytics.categoryFilter(category, filterType, filterValue)
analytics.contactSubmit(subject)
```

### Privacy Considerations
- Cookie consent (if required)
- Respect Do Not Track
- Anonymous IP tracking
- No PII in events
- Clear privacy policy

---

## Future Enhancements

### Phase 1: Content Population
- Add real content via MDX files
- Create 3-5 items per category
- Add imagery and media assets

### Phase 2: Interactive Features
- Working audio player component
- Video player with custom controls
- Image lightbox/gallery
- Working contact/access forms

### Phase 3: CMS Migration
- Choose and configure CMS
- Migrate content
- Set up preview environment
- Train content editors

### Phase 4: Advanced Features
- Search functionality
- Related items algorithm
- User accounts (optional)
- Order management system
- Waitlist management

### Phase 5: Performance
- Image optimization audit
- Bundle size optimization
- Lighthouse score > 90
- Core Web Vitals optimization

---

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Prefer composition over inheritance
- Keep components small and focused
- Use semantic HTML
- Follow WCAG accessibility guidelines

### Performance
- Lazy load images with blur placeholders
- Use Next.js Image component
- Static generation where possible
- Minimize JavaScript bundle
- Optimize fonts

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

### SEO
- Unique meta titles and descriptions
- OpenGraph tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration

---

## Contact & Support

For questions about this architecture, contact the development team or refer to the project README.
