import { SITE_CONFIG } from '@/lib/constants'

export const TSUKUYOMI_DRUM_ENGINE_SLUG = 'tsukuyomi-drum-engine'
export const TSUKUYOMI_DRUM_ENGINE_HREF = `/tools/${TSUKUYOMI_DRUM_ENGINE_SLUG}`
export const TSUKUYOMI_DRUM_ENGINE_DEMO_HREF = '#demo-video'
export const TSUKUYOMI_DRUM_ENGINE_BUY_HREF = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
  'Tsukuyomi Drum Engine release notification'
)}`
/** Legacy mailto notify link. Live purchase uses /api/tsukuyomi/checkout when TSUKUYOMI_PURCHASE_ENABLED=true. */
export const TSUKUYOMI_BUY_HREF = TSUKUYOMI_DRUM_ENGINE_BUY_HREF
export const TSUKUYOMI_DEMO_HREF = TSUKUYOMI_DRUM_ENGINE_DEMO_HREF
export const TSUKUYOMI_CHECKOUT_API_HREF = '/api/tsukuyomi/checkout'


export const TSUKUYOMI_DRUM_ENGINE = {
  title: 'Tsukuyomi Drum Engine',
  label: 'Drum Instrument / Plugin',
  version: 'Beta 2',
  description:
    'Sixteen pads. A sequencer that breathes. Mix, character, and finish, all in one window. Load a sound, build a groove, leave with a drum track.',
  heroLines: ['Make the beat.', 'Shape the kit.', 'Finish the drums.'],
  formatLine: 'VST3 · Standalone · AU coming soon',
} as const

export const TSUKUYOMI_DEMO_VIDEO_URL = ''

export const TSUKUYOMI_IMAGE_ROOT = '/Tsukyomi Drum Engine Pics'

export const TSUKUYOMI_MAIN_UI_IMAGE = `${TSUKUYOMI_IMAGE_ROOT}/Main UI - Tsukyomi Drum Engine.png`

export const TSUKUYOMI_HIT_CONTROLS = [
  { title: 'VELOCITY', body: 'How hard the hit lands.' },
  { title: 'PROBABILITY', body: 'Sometimes it plays. Sometimes it waits.' },
  { title: 'MICRO TIMING', body: 'Push ahead. Pull behind. Leave the grid.' },
  { title: 'RATCHET', body: 'Up to eight repeats inside a single step.' },
  { title: 'PITCH', body: 'Tune the hit ±24 semitones.' },
  { title: 'CONDITIONS', body: 'Every 2nd, 3rd, or 4th loop, or fills only.' },
] as const

export const TSUKUYOMI_SCENES = [
  { label: 'SCENE A', title: 'The groove that carries the track.' },
  { label: 'SCENE B', title: 'The verse that gives it air.' },
  { label: 'SCENE C', title: 'The turn that keeps it moving.' },
  { label: 'SCENE D', title: 'The fill that opens the next idea.' },
] as const

export const TSUKUYOMI_ANALOG_MODELS = [
  {
    name: 'ISEVE 1095',
    body: 'Console weight. Three bands, high pass, and polarity. The kit sits like it was tracked through something real.',
    file: 'Iseve 1095 Compressor - Tsukyomi Drum Engine.png',
    width: 1172,
    height: 640,
  },
  {
    name: 'IPI',
    body: 'Surgical and graphic in one pass. Parametric detail, then a 10-band curve from 31 Hz to 16 kHz.',
    file: 'IPI Compressor - Tsukyomi Drum Engine.png',
    width: 1182,
    height: 646,
  },
  {
    name: 'ISITECH',
    body: 'Boost, cut, commit. Program style EQ for low end force and open highs. Big without getting soft.',
    file: 'Isitech Compressor - Tsukyomi Drum Engine.png',
    width: 1176,
    height: 644,
  },
] as const

export const TSUKUYOMI_COMPRESSORS = [
  {
    name: 'ISHEEN',
    body: 'Harmonic colour compressor. VELVET or BITE before compression, presence, RAGE.',
  },
  {
    name: 'ISIBOX',
    body: 'Feedback variable mu style. Thickness vs transient.',
  },
  {
    name: 'ICARUS',
    body: 'Morphing tube style. Aggressive to Dense to Smooth.',
  },
  {
    name: 'ISI 76',
    body: 'Fast FET grab. Ratios 4 / 8 / 12 / 20 / ALL.',
  },
  {
    name: 'IA2A',
    body: 'Slow optical glue. Peak Reduction and Gain.',
  },
] as const

export const TSUKUYOMI_PROCESS_STEPS = [
  ['01', 'LOAD', 'Factory kit or your own samples.'],
  ['02', 'LOCK', 'Keep what works. Randomize what doesn’t.'],
  ['03', 'SHAPE', 'Tune, filter, envelope, and drive each layer.'],
  ['04', 'PROGRAM', 'Write the groove inside the instrument.'],
  ['05', 'HUMANIZE', 'Velocity, probability, micro timing. Feel over math.'],
  ['06', 'PERFORM', 'Move across Scenes A to D without stopping.'],
  ['07', 'MIX / FINISH', 'Balance the kit, then print it ready.'],
] as const

export const TSUKUYOMI_SPECS = [
  ['Pads / layers', '16 / 3 per pad'],
  ['Polyphony', '32 voices'],
  ['Scenes', 'A to D'],
  ['Samples', 'WAV, AIFF, FLAC, up to 30 s'],
  ['Outputs', '22 stereo'],
  ['Formats', 'VST3, Standalone (AU coming soon)'],
] as const

