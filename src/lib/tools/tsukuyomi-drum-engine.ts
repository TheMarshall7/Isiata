import { SITE_CONFIG } from '@/lib/constants'

export const TSUKUYOMI_DRUM_ENGINE_SLUG = 'tsukuyomi-drum-engine'
export const TSUKUYOMI_DRUM_ENGINE_HREF = `/tools/${TSUKUYOMI_DRUM_ENGINE_SLUG}`
export const TSUKUYOMI_DRUM_ENGINE_DEMO_HREF = '#demo-video'
export const TSUKUYOMI_DRUM_ENGINE_BUY_HREF = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
  'Tsukuyomi Drum Engine release notification'
)}`
export const TSUKUYOMI_BUY_HREF = TSUKUYOMI_DRUM_ENGINE_BUY_HREF
export const TSUKUYOMI_DEMO_HREF = TSUKUYOMI_DRUM_ENGINE_DEMO_HREF


export const TSUKUYOMI_DRUM_ENGINE = {
  title: 'Tsukuyomi Drum Engine',
  label: 'Drum Instrument / Plugin',
  version: 'Beta 2',
  description:
    'A 16-pad drum instrument that takes you from raw samples to a finished drum track without leaving the plugin.',
  heroLines: ['Make the beat.', 'Shape the sound.', 'Finish the record.'],
  formatLine: 'VST3 · Standalone · AU coming soon',
} as const

export const TSUKUYOMI_DEMO_VIDEO_URL = ''

export const TSUKUYOMI_IMAGE_ROOT = '/Tsukyomi Drum Engine Pics'

export const TSUKUYOMI_MAIN_UI_IMAGE = `${TSUKUYOMI_IMAGE_ROOT}/Main UI - Tsukyomi Drum Engine.png`

export const TSUKUYOMI_HIT_CONTROLS = [
  { title: 'VELOCITY', body: 'Softer or harder.' },
  { title: 'PROBABILITY', body: 'A chance of playing instead of a guarantee.' },
  { title: 'MICRO-TIMING', body: 'Push or pull a hit off the grid.' },
  { title: 'RATCHET', body: 'Up to 8 repeats per step.' },
  { title: 'PITCH', body: 'Up to ±24 semitones.' },
  { title: 'CONDITIONS', body: 'Every 2nd, 3rd or 4th loop, or fills only.' },
] as const

export const TSUKUYOMI_SCENES = [
  { label: 'SCENE A', title: 'The main groove.' },
  { label: 'SCENE B', title: 'The stripped-back verse.' },
  { label: 'SCENE C', title: 'The variation.' },
  { label: 'SCENE D', title: 'The fill.' },
] as const

export const TSUKUYOMI_ANALOG_MODELS = [
  {
    name: 'ISEVE 1095',
    body: 'A three-band console-style EQ with high-pass filter and polarity.',
    file: 'Iseve 1095 Compressor - Tsukyomi Drum Engine.png',
    width: 1172,
    height: 640,
  },
  {
    name: 'IPI',
    body: 'A parametric EQ paired with a 10-band graphic EQ, 31 Hz to 16 kHz.',
    file: 'IPI Compressor - Tsukyomi Drum Engine.png',
    width: 1182,
    height: 646,
  },
  {
    name: 'ISITECH',
    body: 'A boost-and-cut program-style EQ. Shape the low end, open the highs, find that big-but-tight feeling.',
    file: 'Isitech Compressor - Tsukyomi Drum Engine.png',
    width: 1176,
    height: 644,
  },
] as const

export const TSUKUYOMI_COMPRESSORS = ['TOP', 'PUNCH', 'SMASH', 'ISI 76', 'IA2A'] as const

export const TSUKUYOMI_PROCESS_STEPS = [
  ['01', 'LOAD', 'Factory kit or your own samples.'],
  ['02', 'LOCK', 'Keep what you love, randomize the rest.'],
  ['03', 'SHAPE', 'Tune, filter, envelope and drive each sound.'],
  ['04', 'PROGRAM', 'Build the groove.'],
  ['05', 'HUMANIZE', 'Use probability, velocity and micro-timing.'],
  ['06', 'PERFORM', 'Move across Scenes A–D.'],
  ['07', 'MIX / FINISH', 'Set the mix, then finish with the master section.'],
] as const

export const TSUKUYOMI_SPECS = [
  ['Pads / layers', '16 / 3 per pad'],
  ['Polyphony', '32 voices'],
  ['Scenes', 'A–D'],
  ['Samples', 'WAV, AIFF, FLAC, up to 30 s'],
  ['Outputs', '22 stereo'],
  ['Formats', 'VST3, Standalone (AU coming soon)'],
] as const

