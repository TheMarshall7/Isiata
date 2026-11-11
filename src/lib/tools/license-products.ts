import { PLUGINS } from '@/lib/tools/plugins'

/**
 * Site slugs that differ from the licence product id (licensing/worker/src/catalog.js):
 * the Drum Engine's id predates the catalogue, and Isynth 7 is "isynth7" in the plugin.
 */
const SKU_BY_SLUG: Record<string, string> = {
  'tsukuyomi-drum-engine': 'tsukuyomi',
  'isynth-7': 'isynth7',
}

export function skuForPluginSlug(slug: string): string {
  return SKU_BY_SLUG[slug] ?? slug
}

/**
 * Every paid plugin has its own licence, under the product id its plugin sends to the licence
 * Worker (licensing/worker/src/catalog.js). The Drum Engine predates the catalogue and uses
 * "tsukuyomi". Free plugins carry no serial. A bundle or the subscription serial unlocks
 * several of these, but each plugin activates under its own id.
 */
export const LICENSED_PLUGINS: { id: string; name: string }[] = PLUGINS.filter(
  (plugin) => plugin.price !== 'FREE',
).map((plugin) => ({
  id: skuForPluginSlug(plugin.slug),
  name: plugin.name,
}))
