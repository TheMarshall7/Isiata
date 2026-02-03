// Base types
export type DropStatus = 'upcoming' | 'live' | 'archived'
export type Category = 'sound' | 'objects' | 'tools' | 'access'

export interface BaseContent {
  id: string
  slug: string
  title: string
  description: string
  category: Category
  publishedAt: Date
  updatedAt: Date
  featured: boolean
  seo: SEOMetadata
}

export interface SEOMetadata {
  metaTitle: string
  metaDescription: string
  ogImage: string
  ogType: string
  structuredData?: Record<string, any>
}

// Sound Release
export interface SoundRelease extends BaseContent {
  category: 'sound'
  artist: string
  releaseDate: Date
  coverArt: MediaAsset
  trackList: Track[]
  streamingLinks: StreamingLink[]
  credits: Credit[]
  visualMedia?: MediaAsset[]
  pressQuotes?: PressQuote[]
  status: DropStatus
  editions?: Edition[]
}

export interface Track {
  position: number
  title: string
  duration: string
  audioPreview?: string
  isrc?: string
}

export interface StreamingLink {
  platform: string
  url: string
  icon?: string
}

export interface Credit {
  role: string
  name: string
  url?: string
}

// Objects (Fashion/Physical)
export interface ObjectDrop extends BaseContent {
  category: 'objects'
  dropDate: Date
  status: DropStatus
  price?: string
  currency?: string
  availableQuantity?: number
  totalQuantity?: number
  images: MediaAsset[]
  sizingChart?: MediaAsset
  materials?: string[]
  careInstructions?: string
  productDetails: ProductDetail[]
  purchaseLink?: string
  waitlistEnabled?: boolean
}

export interface ProductDetail {
  label: string
  value: string
}

// Tools (Digital Products)
export interface ToolProduct extends BaseContent {
  category: 'tools'
  releaseDate: Date
  status: DropStatus
  price: string
  fileSize?: string
  format: string[]
  compatibility: string[]
  downloadLink?: string
  previewMedia: MediaAsset[]
  specifications: ProductDetail[]
  license: LicenseType
  demoLink?: string
}

export type LicenseType = 'personal' | 'commercial' | 'enterprise'

// Access Offers
export interface AccessOffer extends BaseContent {
  category: 'access'
  offerType: 'session' | 'direction' | 'collaboration' | 'workshop'
  status: DropStatus
  availability: 'open' | 'waitlist' | 'closed'
  duration?: string
  deliverables?: string[]
  applicationForm: FormField[]
  capacity?: number
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'email' | 'url' | 'select'
  required: boolean
  placeholder?: string
  options?: string[]
}

// Collection
export interface Collection {
  id: string
  slug: string
  title: string
  description: string
  coverImage: MediaAsset
  items: (SoundRelease | ObjectDrop | ToolProduct)[]
  publishedAt: Date
}

// Press/Story
export interface PressItem {
  id: string
  outlet: string
  title: string
  excerpt?: string
  url: string
  publishedAt: Date
  featured: boolean
}

export interface Story {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: MediaAsset
  content: string
  publishedAt: Date
  category?: string
}

// Mailing List
export interface MailingListSubscriber {
  email: string
  subscribedAt: Date
  source: string
  preferences?: {
    sound: boolean
    objects: boolean
    tools: boolean
    access: boolean
  }
}

// Media Assets
export interface MediaAsset {
  url: string
  alt: string
  width?: number
  height?: number
  blurDataURL?: string
  caption?: string
  credits?: string
}

export interface PressQuote {
  quote: string
  source: string
  url?: string
}

export interface Edition {
  format: string
  price?: string
  status: DropStatus
  purchaseLink?: string
}
