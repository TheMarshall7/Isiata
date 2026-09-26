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
  imageFit?: 'cover' | 'contain'
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
    description: 'A 16-pad drum instrument for loading, sequencing, shaping, mixing, and finishing drum tracks.',
    image: TSUKUYOMI_MAIN_UI_IMAGE,
    imageFit: 'contain',
    icon: 'solar:music-note-2-linear',
    category: 'plugins',
    categoryLabel: 'Plugin',
  },
  {
    slug: 'producer-toolbox',
    href: '/tools/toolbox',
    title: 'Producer Toolbox',
    description: 'BPM control, key & scale finder, delay calculator, reverb times, unit converter',
    icon: 'solar:tuning-2-linear',
    category: 'tools',
    categoryLabel: 'Tool',
    price: 'Free',
  },
  {
    slug: 'ear-trainer',
    href: '/tools/training/ear-trainer',
    title: 'Ear Mastery',
    description: 'Intervals, chords, scales, perfect pitch, gamified ear training',
    icon: 'solar:headphones-round-sound-linear',
    category: 'tools',
    categoryLabel: 'Tool',
    price: 'Free',
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
