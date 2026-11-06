/**
 * Every plugin that has its own licence, by the product id its plugin sends to the licence
 * Worker (licensing/worker/src/catalog.js). A bundle or the subscription serial unlocks
 * several of these, but each plugin activates under its own id.
 */
export const LICENSED_PLUGINS: { id: string; name: string }[] = [
  { id: 'tsukuyomi', name: 'Tsukuyomi Drum Engine' },
  { id: 'tsukuyomi-sound', name: 'Tsukuyomi Sound' },
  { id: 'tsukuyomi-fx', name: 'Tsukuyomi FX' },
  { id: 'tsukuyomi-comp', name: 'Tsukuyomi Comp' },
  { id: 'tsukuyomi-delay', name: 'Tsukuyomi Delay' },
  { id: 'tsukuyomi-reverb', name: 'Tsukuyomi Reverb' },
  { id: 'tsukuyomi-chorus', name: 'Tsukuyomi Chorus' },
  { id: 'tsukuyomi-phaser', name: 'Tsukuyomi Phaser' },
  { id: 'tsukuyomi-flanger', name: 'Tsukuyomi Flanger' },
  { id: 'tsukuyomi-stutter', name: 'Tsukuyomi Stutter' },
  { id: 'tsukuyomi-soft-clip', name: 'Tsukuyomi Soft Clip' },
  { id: 'tsukuyomi-lo-fi', name: 'Tsukuyomi Lo-Fi' },
  { id: 'tsukuyomi-8-bit', name: 'Tsukuyomi 8 Bit' },
  { id: 'isi-pandora', name: 'ISI Pandora' },
  { id: 'iseve-1095', name: 'Iseve 1095' },
  { id: 'ipi', name: 'IPI' },
  { id: 'isitech', name: 'IsiTech' },
  { id: 'isheen', name: 'Isheen' },
  { id: 'isibox', name: 'Isibox' },
  { id: 'icarus', name: 'Icarus' },
  { id: 'isi-76', name: 'ISI 76' },
  { id: 'ia2a', name: 'IA2A' },
]
