import { PLUGINS } from '@/lib/tools/plugins'

/**
 * Every paid plugin has its own licence, under the product id its plugin sends to the licence
 * Worker (licensing/worker/src/catalog.js). The Drum Engine predates the catalogue and uses
 * "tsukuyomi". Free plugins carry no serial. A bundle or the subscription serial unlocks
 * several of these, but each plugin activates under its own id.
 */
export const LICENSED_PLUGINS: { id: string; name: string }[] = PLUGINS.filter(
  (plugin) => plugin.price !== 'FREE',
).map((plugin) => ({
  id: plugin.slug === 'tsukuyomi-drum-engine' ? 'tsukuyomi' : plugin.slug,
  name: plugin.name,
}))
