import { TSUKUYOMI_DRUM_ENGINE_HREF, TSUKUYOMI_IMAGE_ROOT } from './tsukuyomi-drum-engine'

export const PLUGINS_HREF = '/tools/plugins'
export const PLUGIN_BUNDLES_HREF = `${PLUGINS_HREF}/bundles`

export type PluginGroupId = 'instrument' | 'tab' | 'effect' | 'analog' | 'compressor'

export const PLUGIN_GROUPS: { id: PluginGroupId; label: string }[] = [
  { id: 'instrument', label: 'Instruments' },
  { id: 'tab', label: 'Multi-effects' },
  { id: 'effect', label: 'Effects' },
  { id: 'analog', label: 'Analog EQ' },
  { id: 'compressor', label: 'Compressors' },
]

export type PluginSpec = {
  slug: string
  name: string
  group: PluginGroupId
  /** Short type line shown on cards and the detail page */
  kind: string
  /** Display price in USD */
  price: string
  hero: string
  short: string
  about: string[]
  /** What's inside: label + selling copy */
  features: { label: string; body: string }[]
  notes?: string[]
  whoFor?: string
  /** Plugin ID info, kept for support/DAW lookup */
  target: string
  code: string
  dawCategory: string
  /** Product image, served from /public */
  image?: { src: string; width: number; height: number }
  /** Optional link out for products that already have their own page */
  href?: string
  icon: string
}

const shot = (file: string, width: number, height: number) => ({
  src: `${TSUKUYOMI_IMAGE_ROOT}/${file}`,
  width,
  height,
})

export const PLUGINS: PluginSpec[] = [
  /* ───────────── Instruments ───────────── */
  {
    slug: 'tsukuyomi-drum-engine',
    name: 'Tsukuyomi Drum Engine',
    group: 'instrument',
    kind: 'Drum instrument',
    price: '$129',
    hero: 'Write the beat. Design the kit. Mix it in the same window.',
    short:
      'Sixteen pads, a sequencer that follows your DAW, kit effects, analog colour, a parallel compressor rack and a master section that finishes the drums.',
    about: [
      'Load the factory library or your own samples, program a groove, shape every pad, then mix and master the kit without leaving the plugin.',
    ],
    features: [],
    target: 'Tsukuyomi',
    code: 'Tsuk',
    dawCategory: 'Instrument',
    href: TSUKUYOMI_DRUM_ENGINE_HREF,
    image: shot('Main UI - Tsukyomi Drum Engine.png', 1280, 780),
    icon: 'solar:music-note-2-linear',
  },
  {
    slug: 'tsukuyomi-sound',
    name: 'Tsukuyomi Sound',
    group: 'instrument',
    kind: 'One-shot sampler',
    price: '$39',
    hero: 'One sample. Total control.',
    short:
      'Bring your own kick, snare or one-shot and sculpt it into something that is yours. Shape the tone, tune it, drive it, then play it from MIDI or print the finished hit as a WAV.',
    about: [
      'Drop any sample onto the window and start shaping. The sound is saved inside your session, so the project always opens exactly the way you left it.',
    ],
    features: [
      { label: 'Trim and audition', body: 'See the waveform, set your start and end, and hear the hit before you commit.' },
      { label: 'Shape the attack and tail', body: 'A full envelope turns a soft sample into a snap, or a snap into a bloom.' },
      { label: 'Filter that moves with your playing', body: 'Choose 12 or 24 dB slopes and let velocity open the filter on harder hits.' },
      { label: 'Tune it', body: 'Pitch and fine tune, with the choice of keeping the length or letting it speed up and slow down.' },
      { label: 'Drive and EQ', body: 'Add weight and grit, then carve the low, mid and high end.' },
      { label: 'Play it your way', body: 'One-shot, key tracking across the keyboard, and choke for hi-hat style cutting.' },
      { label: 'Print the result', body: 'Export the edited hit as a 24-bit WAV, ready for any sampler or kit.' },
    ],
    notes: ['Loads WAV, AIFF, FLAC, OGG and MP3.'],
    whoFor: 'Producers with their own kick, snare or one-shot library who want to turn single sounds into signature ones.',
    target: 'TsukuyomiSound',
    code: 'TsSd',
    dawCategory: 'Instrument',
    icon: 'solar:soundwave-linear',
  },

  /* ───────────── Multi-effects ───────────── */
  {
    slug: 'tsukuyomi-fx',
    name: 'Tsukuyomi FX',
    group: 'tab',
    kind: 'Multi-effect',
    price: '$59',
    hero: 'Every effect. One insert.',
    short:
      'Delay, reverb, stutter, chorus, phaser, flanger and soft clip, plus three analog colour stages and lo-fi and 8-bit crush, all on a single plugin for any track or bus.',
    about: [
      'Instead of stacking seven plugins, drop one on a drum bus, a vocal or a whole mix and reach for whatever the moment needs. Every effect follows the tempo of your session.',
    ],
    features: [
      { label: 'Echo', body: 'Tempo-synced or free delays with tone and stereo width.' },
      { label: 'Space', body: 'Rooms, your own impulse responses, and drum-ready plates, halls and gated tails.' },
      { label: 'Repeat', body: 'Tempo-locked stutters with probability, fills and reverse.' },
      { label: 'Motion', body: 'Chorus, phaser and flanger for width, sweep and jet.' },
      { label: 'Soft clip', body: 'Round off the peaks and keep the punch.' },
      { label: 'Analog colour', body: 'Iseve 1095, IPI and IsiTech EQ stages with their own character.' },
      { label: 'Lo-Fi and 8 Bit', body: 'One knob each for worn tape and crunchy digital grit.' },
    ],
    whoFor: 'Anyone who wants a full effects rack on a bus, a send, or a drum group without the plugin pile.',
    target: 'TsukuyomiFX',
    code: 'TsFx',
    dawCategory: 'Fx',
    icon: 'solar:tuning-2-linear',
  },
  {
    slug: 'tsukuyomi-comp',
    name: 'Tsukuyomi Comp',
    group: 'tab',
    kind: 'Parallel compressor rack',
    price: '$49',
    hero: 'Three compressors. One blend.',
    short:
      'Run three different compressors side by side and blend them against the dry signal. Pick the character for each slot and build the punch, glue and grab you want.',
    about: [
      'Every slot hears the full signal, so you can stack a fast grab with a slow glue and a harmonic push, then dial in how much of it sits under the original. Latency is aligned for you, so parallel mixing stays clean.',
    ],
    features: [
      { label: 'Isheen', body: 'Harmonic colour compression with Velvet or Bite, presence and Rage.' },
      { label: 'Isibox', body: 'Variable-mu thickness with punch you can trade against weight.' },
      { label: 'Icarus', body: 'Tube-style smash that moves from aggressive to dense to smooth.' },
      { label: 'ISI 76', body: 'Fast FET grab with ratios up to all-buttons-in.' },
      { label: 'IA2A', body: 'Slow optical glue that levels without fuss.' },
      { label: 'Per-slot control', body: 'Each slot has its own mix, output and oversampling.' },
    ],
    whoFor: 'Producers who want serious parallel compression with several characters on one insert.',
    target: 'TsukuyomiComp',
    code: 'TsCp',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:equalizer-linear',
  },

  /* ───────────── Effects ───────────── */
  {
    slug: 'tsukuyomi-delay',
    name: 'Tsukuyomi Delay',
    group: 'effect',
    kind: 'Delay',
    price: '$29',
    hero: 'Echoes with character.',
    short: 'A tempo-synced or free-running echo that sits in the mix instead of cluttering it. Darken the repeats, widen the image and let the tails ring out.',
    about: ['Fast slapbacks, wide dotted echoes, long dark tails. Dial it in and it stays out of the way until you need it.'],
    features: [
      { label: 'Synced or free time', body: 'Lock to note values or set any time in milliseconds.' },
      { label: 'Tone', body: 'Roll off the highs so repeats sit behind the source.' },
      { label: 'Width', body: 'Spread the echoes across the stereo field.' },
      { label: 'Feedback', body: 'From a single slap to a long, evolving trail.' },
    ],
    target: 'TsukuyomiDelay',
    code: 'TsDl',
    dawCategory: 'Fx, Delay',
    icon: 'solar:clock-circle-linear',
  },
  {
    slug: 'tsukuyomi-reverb',
    name: 'Tsukuyomi Reverb',
    group: 'effect',
    kind: 'Reverb',
    price: '$39',
    hero: 'Rooms, plates and gated tails.',
    short: 'Three kinds of reverb in one plugin: a natural room, your own impulse responses, and a set of drum-ready plates, halls and gated tails.',
    about: [
      'Make a snare feel huge, put a vocal in a real space, or load your favourite impulse responses and shape them. Set the length free or lock it to the tempo.',
    ],
    features: [
      { label: 'Room', body: 'A smooth, natural space with size, damping and width.' },
      { label: 'ISIVerb', body: 'Drum-ready rooms, plates, halls and gated tails, built in.' },
      { label: 'Your impulses', body: 'Drop WAV, AIFF or FLAC files into your IR folder and they appear in the plugin.' },
      { label: 'Tempo-synced length', body: 'Lock the tail to beats or bars, or leave it free up to 16 seconds.' },
      { label: 'Pre-delay and filters', body: 'Keep the front of the sound clear and the low end clean.' },
    ],
    target: 'TsukuyomiReverb',
    code: 'TsRv',
    dawCategory: 'Fx, Reverb',
    icon: 'solar:waterdrops-linear',
  },
  {
    slug: 'tsukuyomi-chorus',
    name: 'Tsukuyomi Chorus',
    group: 'effect',
    kind: 'Chorus',
    price: '$29',
    hero: 'Wide and moving.',
    short: 'A chorus that goes from a subtle widen to a lush, swirling ensemble with three simple controls.',
    about: ['Turn it up for width on drums, shimmer on keys, or movement on a bass that needs to breathe.'],
    features: [
      { label: 'Mix', body: 'Blend in as much movement as the sound needs.' },
      { label: 'Rate', body: 'From a slow drift to a fast shimmer.' },
      { label: 'Depth', body: 'Half for a gentle widen, full for a big, wide chorus.' },
    ],
    target: 'TsukuyomiChorus',
    code: 'TsCh',
    dawCategory: 'Fx, Modulation',
    icon: 'solar:soundwave-circle-linear',
  },
  {
    slug: 'tsukuyomi-phaser',
    name: 'Tsukuyomi Phaser',
    group: 'effect',
    kind: 'Phaser',
    price: '$29',
    hero: 'A sweep that locks to your tempo.',
    short: 'A mid-range phaser that moves in time with your track, or runs free from fast wobble to a sweep that takes sixteen seconds.',
    about: ['Put slow motion into pads and guitars, or lock a sweep to the bar so a loop breathes with the song.'],
    features: [
      { label: 'Synced or free sweep', body: 'From eighth-note movement to eight-bar sweeps, or any time in between.' },
      { label: 'Depth and feedback', body: 'Gentle swirl or deep, resonant phase.' },
      { label: 'Centre frequency', body: 'Choose where in the spectrum the sweep lives.' },
    ],
    target: 'TsukuyomiPhaser',
    code: 'TsPh',
    dawCategory: 'Fx, Modulation',
    icon: 'solar:round-transfer-diagonal-linear',
  },
  {
    slug: 'tsukuyomi-flanger',
    name: 'Tsukuyomi Flanger',
    group: 'effect',
    kind: 'Flanger',
    price: '$29',
    hero: 'Short, metallic sweeps.',
    short: 'A tight, jet-like flanger that is sharper than a chorus and locks to tempo when you want it to.',
    about: ['Add a whoosh to a fill, a sweep to a break, or a constant metallic edge to hats and loops.'],
    features: [
      { label: 'Synced or free sweep', body: 'Lock the sweep to the bar or set it by rate.' },
      { label: 'Depth and feedback', body: 'From subtle comb to full jet engine.' },
      { label: 'Delay', body: 'Move the centre of the effect to change its colour.' },
    ],
    target: 'TsukuyomiFlanger',
    code: 'TsFl',
    dawCategory: 'Fx, Modulation',
    icon: 'solar:wind-linear',
  },
  {
    slug: 'tsukuyomi-stutter',
    name: 'Tsukuyomi Stutter',
    group: 'effect',
    kind: 'Stutter',
    price: '$29',
    hero: 'Tempo-locked repeats on demand.',
    short: 'Grab a slice of the sound and repeat it in time. Choose where in the bar it hits, how often, and how it fades.',
    about: ['Glitch a drum loop, chop a vocal tail, or add a fill that never repeats the same way twice.'],
    features: [
      { label: 'Time', body: 'From thirty-second notes up to two bars.' },
      { label: 'Probability and conditions', body: 'Always, every second, third or fourth loop, or only on fills.' },
      { label: 'Decay and repeats', body: 'Control how many repeats land and how fast they fade.' },
      { label: 'Reverse', body: 'Flip the repeated slice for a pulling-back effect.' },
    ],
    target: 'TsukuyomiStutter',
    code: 'TsSt',
    dawCategory: 'Fx, Delay',
    icon: 'solar:repeat-linear',
  },
  {
    slug: 'tsukuyomi-soft-clip',
    name: 'Tsukuyomi Soft Clip',
    group: 'effect',
    kind: 'Soft clipper',
    price: '$29',
    hero: 'Round off the peaks. Keep the punch.',
    short: 'A clean, controllable soft clipper that adds loudness and weight without turning the transients to mush.',
    about: ['Drive drums harder, tame a rogue peak, or push a mix bus a little louder with a clip that stays musical.'],
    features: [
      { label: 'Three knee shapes', body: 'Tanh, cubic or parabolic, each with its own feel.' },
      { label: 'Adjustable knee', body: 'Choose how gently or sharply the clipping begins.' },
      { label: 'Anti-aliasing', body: 'Keeps the added harmonics clean and free of digital fizz.' },
      { label: 'Output', body: 'Level match before and after to hear what the clip is really doing.' },
    ],
    target: 'TsukuyomiSoftClip',
    code: 'TsCl',
    dawCategory: 'Fx, Distortion',
    icon: 'solar:graph-up-linear',
  },
  {
    slug: 'tsukuyomi-lo-fi',
    name: 'Tsukuyomi Lo-Fi',
    group: 'effect',
    kind: 'Lo-fi',
    price: '$19',
    hero: 'Age anything with one knob.',
    short: 'Worn tape, a dull top end and the grit of a sample hold. Turn it up and the sound gets older.',
    about: ['Dirty up a drum loop, push a sample into a dusty memory, or give a clean track some history.'],
    features: [
      { label: 'One knob', body: 'Everything you need, nothing you have to tweak.' },
    ],
    target: 'TsukuyomiLoFi',
    code: 'TsLf',
    dawCategory: 'Fx, Distortion',
    icon: 'solar:cassette-2-linear',
  },
  {
    slug: 'tsukuyomi-8-bit',
    name: 'Tsukuyomi 8 Bit',
    group: 'effect',
    kind: 'Bit crusher',
    price: '$19',
    hero: 'Crush it down to crunch.',
    short: 'Bit depth and sample rate reduction on a single knob, for low-bit crunch and game-console grit.',
    about: ['Turn a clean drum hit into a crunchy chip-tune hit, or add a gritty edge to a sampler layer.'],
    features: [
      { label: 'One knob', body: 'Bit depth and sample rate crush together, from a hint of grit to pure noise.' },
    ],
    target: 'TsukuyomiBit',
    code: 'Ts8b',
    dawCategory: 'Fx, Distortion',
    icon: 'solar:gameboy-linear',
  },

  /* ───────────── Analog EQ ───────────── */
  {
    slug: 'iseve-1095',
    name: 'Iseve 1095',
    group: 'analog',
    kind: 'Console EQ',
    price: '$39',
    hero: 'Console weight for any track.',
    short:
      'Thick, warm, dimensional EQ with a console-style stage behind it. Three bands, a high-pass filter, and drive, noise and vinyl for extra character.',
    about: [
      'Put it across a drum bus, a vocal or a mix and the sound gets wider and heavier. The analog stage is on from the first moment you open it.',
    ],
    features: [
      { label: 'Three-band EQ', body: 'High, mid and low bands with a high-pass filter for clean low end.' },
      { label: 'Drive and colour', body: 'Push the stage for warmth, weight and harmonics.' },
      { label: 'Noise and vinyl', body: 'Add the texture of old gear when the track needs it.' },
      { label: 'Blend', body: 'Mix the coloured signal against the original.' },
    ],
    notes: ['Modeled on the behaviour of classic console gear. Not a claimed clone of specific hardware.'],
    target: 'Iseve',
    code: 'Isev',
    dawCategory: 'Fx, EQ',
    image: shot('Iseve 1095 Compressor - Tsukyomi Drum Engine.png', 1172, 640),
    icon: 'solar:tuning-square-2-linear',
  },
  {
    slug: 'ipi',
    name: 'IPI',
    group: 'analog',
    kind: 'Parametric and graphic EQ',
    price: '$39',
    hero: 'Punchy, forward, aggressive.',
    short:
      'Preamp grit into a three-band parametric EQ and a ten-band graphic EQ. Surgical when you need it, forceful when you do not.',
    about: ['Dig into a problem with the parametric bands, then shape the whole curve on the graphic side. The preamp adds the bite that makes it feel alive.'],
    features: [
      { label: 'Preamp grit', body: 'Add attitude before the EQ ever touches the signal.' },
      { label: 'Parametric EQ', body: 'Three bands for precise cuts and boosts.' },
      { label: 'Graphic EQ', body: 'Ten bands from 31 Hz to 16 kHz for fast, broad shaping.' },
      { label: 'Shelves and filter', body: 'Clean up the extremes and open up the top.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    target: 'IPI',
    code: 'IpiA',
    dawCategory: 'Fx, EQ',
    image: shot('IPI Compressor - Tsukyomi Drum Engine.png', 1182, 646),
    icon: 'solar:equalizer-minimalistic-linear',
  },
  {
    slug: 'isitech',
    name: 'IsiTech',
    group: 'analog',
    kind: 'Program EQ',
    price: '$39',
    hero: 'Boost and cut. Big but tight.',
    short:
      'A passive-style program EQ for low-end force and open highs. Boost and cut at the same frequency and the bottom gets big without getting soft.',
    about: ['Smooth, polished and generous. It is the EQ you reach for when a kick, a bass or a mix bus needs to feel bigger without losing control.'],
    features: [
      { label: 'Low boost and attenuate', body: 'Stack both at the same frequency for a full, controlled low end.' },
      { label: 'High boost and bandwidth', body: 'Open the top with a width you choose.' },
      { label: 'High cut', body: 'Soften harsh top end with a simple selector.' },
      { label: 'Drive and colour', body: 'Add warmth, noise and vinyl as needed.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    target: 'IsiTech',
    code: 'Istc',
    dawCategory: 'Fx, EQ',
    image: shot('Isitech Compressor - Tsukyomi Drum Engine.png', 1176, 644),
    icon: 'solar:sort-vertical-linear',
  },

  /* ───────────── Compressors ───────────── */
  {
    slug: 'isheen',
    name: 'Isheen',
    group: 'compressor',
    kind: 'Colour compressor',
    price: '$29',
    hero: 'Compression with a shine.',
    short: 'A harmonic colour compressor. Choose Velvet or Bite before it squeezes, add presence, and push it with Rage.',
    about: ['For sounds that need to be controlled and exciting at the same time. Use it as an insert, or blend it in for parallel shine.'],
    features: [
      { label: 'Velvet or Bite', body: 'Pick the colour the signal gets before compression.' },
      { label: 'Presence', body: 'Lift the top and bring the sound forward.' },
      { label: 'Rage', body: 'Push it hard when the track needs attitude.' },
      { label: 'Mix', body: 'Blend with the dry signal for parallel compression, latency aligned.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    target: 'IsiTop',
    code: 'ITop',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:sun-2-linear',
  },
  {
    slug: 'isibox',
    name: 'Isibox',
    group: 'compressor',
    kind: 'Variable-mu compressor',
    price: '$29',
    hero: 'Thickness with punch.',
    short: 'A feedback variable-mu style compressor that lets you trade weight for snap with a single move.',
    about: ['Beefy on drums, glue on a bus, and still lively when you want the transients to speak.'],
    features: [
      { label: 'Thickness versus transient', body: 'Decide how much body and how much bite survives.' },
      { label: 'Mix', body: 'Blend with the dry signal for parallel punch, latency aligned.' },
      { label: 'Oversampling', body: 'Cleaner high end when you push it.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    target: 'IsiPunch',
    code: 'IPun',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:box-linear',
  },
  {
    slug: 'icarus',
    name: 'Icarus',
    group: 'compressor',
    kind: 'Tube compressor',
    price: '$29',
    hero: 'Smash it, or let it glow.',
    short: 'A tube-style compressor that morphs between Aggressive, Dense and Smooth, with the impact to flatten a drum bus or the grace to polish a vocal.',
    about: ['One compressor with three personalities. Pick the character, push the drive, and blend it in to taste.'],
    features: [
      { label: 'Aggressive, Dense, Smooth', body: 'Three characters, from raw to polished.' },
      { label: 'Impact', body: 'Add weight and presence to the hit.' },
      { label: 'Mix', body: 'Blend with the dry signal for parallel smash, latency aligned.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    target: 'IsiSmash',
    code: 'ISma',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:fire-linear',
  },
  {
    slug: 'isi-76',
    name: 'ISI 76',
    group: 'compressor',
    kind: 'FET compressor',
    price: '$29',
    hero: 'A fast grab with ratio buttons.',
    short: 'A fast FET compressor with 4, 8, 12, 20 and all-buttons-in ratios. Snappy, forward and exciting on drums, bass and vocals.',
    about: ['Catch transients, add excitement and bring a sound right to the front of the mix.'],
    features: [
      { label: 'Ratio buttons', body: '4, 8, 12, 20 or ALL for everything from gentle to violent.' },
      { label: 'Fast response', body: 'Grabs the hit instantly and lets the body bloom.' },
      { label: 'Mix', body: 'Blend with the dry signal for parallel grab, latency aligned.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    target: 'Isi76',
    code: 'I76a',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:bolt-linear',
  },
  {
    slug: 'ia2a',
    name: 'IA2A',
    group: 'compressor',
    kind: 'Optical compressor',
    price: '$29',
    hero: 'Slow, smooth glue.',
    short: 'A slow optical leveller that evens out a performance and holds a track together without drawing attention to itself.',
    about: ['Two controls and a lot of feel. Ideal for vocals, bass, and any sound that just needs to sit.'],
    features: [
      { label: 'Peak Reduction', body: 'Decide how much it levels.' },
      { label: 'Gain', body: 'Take the level back and enjoy the glue.' },
      { label: 'Mix', body: 'Blend with the dry signal for parallel glue, latency aligned.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    target: 'IsiIA2A',
    code: 'IIA2',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:layers-minimalistic-linear',
  },
]

export type PluginBundle = {
  slug: string
  name: string
  tagline: string
  description: string
  launchPrice: string
  regularPrice: string
  /** Which plugins are in it */
  groups?: PluginGroupId[]
  all?: boolean
  extras?: string[]
  badge?: string
  icon: string
}

export const PLUGIN_BUNDLES: PluginBundle[] = [
  {
    slug: 'tsukuyomi-complete',
    name: 'Tsukuyomi Complete',
    tagline: 'A complete drum production environment.',
    description:
      'The drum instrument, the sound designer, the full effects rack, the parallel compressor rack and every single Tsukuyomi effect. Everything you need to write, shape, colour and finish drums, in one purchase.',
    launchPrice: '$149',
    regularPrice: '$249',
    extras: ['tsukuyomi-drum-engine', 'tsukuyomi-sound', 'tsukuyomi-fx', 'tsukuyomi-comp'],
    groups: ['effect'],
    badge: 'Flagship',
    icon: 'solar:music-note-2-linear',
  },
  {
    slug: 'analog-collection',
    name: 'Isiata Analog Collection',
    tagline: 'Three EQs with real weight.',
    description:
      'Console warmth, punchy parametric and graphic control, and boost-and-cut program EQ. Three different ways to shape a sound, each with its own character.',
    launchPrice: '$79',
    regularPrice: '$117',
    groups: ['analog'],
    icon: 'solar:equalizer-minimalistic-linear',
  },
  {
    slug: 'compressor-collection',
    name: 'Isiata Compressor Collection',
    tagline: 'Five compressors. Five personalities.',
    description:
      'Colour, variable-mu thickness, tube smash, FET grab and optical glue. Everything from gentle levelling to full-on parallel destruction.',
    launchPrice: '$79',
    regularPrice: '$145',
    groups: ['compressor'],
    icon: 'solar:layers-minimalistic-linear',
  },
  {
    slug: 'everything',
    name: 'Isiata Everything Bundle',
    tagline: 'The entire Isiata plugin catalog.',
    description:
      'Every plugin we make, including future qualifying updates to these products. The best way to own the lot.',
    launchPrice: '$199',
    regularPrice: '$399',
    all: true,
    badge: 'Best overall value',
    icon: 'solar:crown-linear',
  },
]

export const PLUGIN_SHARED_FACTS = [
  {
    label: 'Formats',
    body: 'Windows: VST3 and Standalone. macOS: VST3, AU and Standalone. The Tsukuyomi Drum Engine also ships AAX for Pro Tools.',
  },
  {
    label: 'Install',
    body: 'Every plugin ships as its own folder and zip, plus a bundle with Install All and Uninstall All.',
  },
  { label: 'Made by', body: 'Isiata. Created by Brian Marshall.' },
] as const

export const PLUGIN_PRICE_NOTE = 'Prices in USD.'

export function getPlugin(slug: string): PluginSpec | undefined {
  return PLUGINS.find((p) => p.slug === slug)
}

export function getBundle(slug: string): PluginBundle | undefined {
  return PLUGIN_BUNDLES.find((b) => b.slug === slug)
}

export function getBundlePlugins(bundle: PluginBundle): PluginSpec[] {
  if (bundle.all) return PLUGINS
  const extras = (bundle.extras ?? [])
    .map((slug) => getPlugin(slug))
    .filter((p): p is PluginSpec => Boolean(p))
  const grouped = PLUGINS.filter((p) => bundle.groups?.includes(p.group) && !bundle.extras?.includes(p.slug))
  return [...extras, ...grouped]
}

export function bundleHref(bundle: PluginBundle): string {
  return `${PLUGIN_BUNDLES_HREF}/${bundle.slug}`
}

export function pluginHref(plugin: PluginSpec): string {
  return plugin.href ?? `${PLUGINS_HREF}/${plugin.slug}`
}

export function getPluginsByGroup(group: PluginGroupId): PluginSpec[] {
  return PLUGINS.filter((p) => p.group === group)
}

export const PLUGIN_COUNT = PLUGINS.length

/** Plugins surfaced on the main Tools page before "See all". */
export const FEATURED_PLUGIN_SLUGS = [
  'tsukuyomi-drum-engine',
  'tsukuyomi-sound',
  'tsukuyomi-fx',
  'iseve-1095',
  'isheen',
  'tsukuyomi-reverb',
] as const
