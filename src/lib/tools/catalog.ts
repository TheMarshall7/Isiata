import { SAMPLE_PACKS } from './drum-bundle'
import {
  TSUKUYOMI_DRUM_ENGINE,
  TSUKUYOMI_DRUM_ENGINE_HREF,
  TSUKUYOMI_DRUM_ENGINE_SLUG,
  TSUKUYOMI_MAIN_UI_IMAGE,
} from './tsukuyomi-drum-engine'

export const TOOL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'sample-packs', label: 'Sample Packs' },
  { id: 'plugins', label: 'Plugins' },
  { id: 'presets', label: 'Presets' },
  { id: 'tools', label: 'Tools' },
] as const

export type ToolCategoryId = (typeof TOOL_CATEGORIES)[number]['id']

export type ToolCatalogItem = {
  slug: string
  href: string
  title: string
  description: string
  image?: string
  /** cover = fill crop; contain = full art in frame; wide = UI screenshots */
  imageFit?: 'cover' | 'contain' | 'wide'
  price?: string
  icon: string
  category: Exclude<ToolCategoryId, 'all'>
  categoryLabel: string
}

export const TOOL_CATALOG: ToolCatalogItem[] = [
  ...SAMPLE_PACKS.map((pack) => ({
    ...pack,
    category: 'sample-packs' as const,
    categoryLabel: 'Sample Pack',
  })),
  {
    slug: TSUKUYOMI_DRUM_ENGINE_SLUG,
    href: TSUKUYOMI_DRUM_ENGINE_HREF,
    title: TSUKUYOMI_DRUM_ENGINE.title,
    description: 'Sixteen pads to a finished drum track. Load, shape, mix, and print in one window.',
    image: TSUKUYOMI_MAIN_UI_IMAGE,
    imageFit: 'wide',
    icon: 'solar:music-note-2-linear',
    category: 'plugins',
    categoryLabel: 'Plugin',
  },
  {
    slug: 'producer-toolbox',
    href: '/tools/toolbox',
    title: 'Producer Toolbox',
    description: 'Knowledge for the work. Tempo, key, delay, reverb, and units, kept close.',
    image: '/brand/producer-toolbox.png',
    imageFit: 'contain',
    icon: 'solar:tuning-2-linear',
    category: 'tools',
    categoryLabel: 'Tool',
    price: 'Free',
  },
  {
    slug: 'ear-trainer',
    href: '/tools/training/ear-trainer',
    title: 'Ear Mastery',
    description: 'Train perception. Intervals, chords, scales, and pitch, practiced until hearing changes.',
    image: '/brand/ear-mastery-icon.png',
    imageFit: 'contain',
    icon: 'solar:headphones-round-sound-linear',
    category: 'tools',
    categoryLabel: 'Tool',
    price: 'Free',
  },
  {
    slug: 'isiata-systems',
    href: '/systems',
    title: 'ISIATA Systems',
    description: 'Structure that holds the work. Intake, delivery, and retention in one place.',
    image: '/brand/isiata-systems-icon.png',
    imageFit: 'contain',
    icon: 'solar:server-square-linear',
    category: 'tools',
    categoryLabel: 'System',
  },
]

export function getCatalogByCategory(category: ToolCategoryId): ToolCatalogItem[] {
  if (category === 'all') return TOOL_CATALOG
  return TOOL_CATALOG.filter((item) => item.category === category)
}

export function getCatalogGroups(): { category: Exclude<ToolCategoryId, 'all'>; label: string; items: ToolCatalogItem[] }[] {
  const categoryLabels: Record<Exclude<ToolCategoryId, 'all'>, string> = {
    'sample-packs': 'Sample Packs',
    plugins: 'Plugins',
    presets: 'Presets',
    tools: 'Tools',
  }

  return (Object.keys(categoryLabels) as Exclude<ToolCategoryId, 'all'>[])
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: TOOL_CATALOG.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0)
}
