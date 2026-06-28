import { SAMPLE_PACKS } from './drum-bundle'

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
    title: 'Ear Trainer',
    description: 'Intervals, chords, scales, perfect pitch — gamified ear training',
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
