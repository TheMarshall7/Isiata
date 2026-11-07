import { TSUKUYOMI_DRUM_ENGINE_HREF } from './tsukuyomi-drum-engine'

export const PLUGINS_HREF = '/tools/plugins'
export const PLUGIN_BUNDLES_HREF = `${PLUGINS_HREF}/bundles`

export type PluginGroupId =
  | 'instrument'
  | 'tab'
  | 'effect'
  | 'creative'
  | 'saturation'
  | 'strip'
  | 'mix'
  | 'analog'
  | 'compressor'

export const PLUGIN_GROUPS: { id: PluginGroupId; label: string }[] = [
  { id: 'instrument', label: 'Instruments' },
  { id: 'tab', label: 'Multi-effects' },
  { id: 'effect', label: 'Effects' },
  { id: 'creative', label: 'Creative' },
  { id: 'saturation', label: 'Saturation' },
  { id: 'strip', label: 'Channel Strips' },
  { id: 'mix', label: 'Mix Tools' },
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
  target?: string
  code?: string
  dawCategory?: string
  /** Product image, served from /public */
  image?: { src: string; width: number; height: number }
  /** Optional link out for products that already have their own page */
  href?: string
  icon: string
}

/** Product screenshots in /public/Plugin Screenshots, named after each plugin. */
const SCREENSHOT_SIZES: Record<string, [number, number]> = {
  'IA2A': [780, 520],
  'IPI': [880, 560],
  'ISI 76': [780, 520],
  'ISI Pandora': [1060, 560],
  'Icarus': [780, 520],
  'Iseve 1095': [880, 560],
  'Isheen': [780, 520],
  'IsiTech': [880, 560],
  'Isibox': [780, 520],
  'Tsukuyomi 8 Bit': [380, 440],
  'Tsukuyomi Chorus': [760, 440],
  'Tsukuyomi Comp': [860, 440],
  'Tsukuyomi Delay': [760, 520],
  'Tsukuyomi Drum Engine': [1628, 1036],
  'Tsukuyomi FX': [900, 640],
  'Tsukuyomi Flanger': [760, 440],
  'Tsukuyomi Lo-Fi': [380, 440],
  'Tsukuyomi Phaser': [760, 440],
  'Tsukuyomi Reverb': [760, 520],
  'Tsukuyomi Soft Clip': [760, 440],
  'Tsukuyomi Sound': [900, 640],
  'Tsukuyomi Stutter': [760, 520],
  'IPI Strip': [2320, 1600],
  'Iseve Strip': [2320, 1600],
  'IsiTech Strip': [2320, 1600],
  'Tsukuyomi Bit Crush': [980, 580],
  'Tsukuyomi Crunch': [980, 580],
  'Tsukuyomi De-Esser': [1080, 640],
  'Tsukuyomi Filter': [980, 580],
  'Tsukuyomi Gain': [980, 580],
  'Tsukuyomi Gate': [1040, 600],
  'Tsukuyomi Ring Mod': [980, 580],
  'Tsukuyomi Synergy': [980, 580],
  'Tsukuyomi Tape Stop': [980, 580],
  'Tsukuyomi Transient': [980, 580],
  'Tsukuyomi Tri EQ': [980, 580],
  'Tsukuyomi Motion': [1180, 800],
}

function withScreenshot(plugin: PluginSpec): PluginSpec {
  const size = SCREENSHOT_SIZES[plugin.name]
  if (!size) return plugin
  return {
    ...plugin,
    image: {
      src: encodeURI(`/Plugin Screenshots/${plugin.name}.png`),
      width: size[0],
      height: size[1],
    },
  }
}

const PLUGIN_DEFS: PluginSpec[] = [
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
      'Instead of stacking seven plugins, drop one on the bus and reach for whatever the moment needs. Every effect follows the tempo of your session.',
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

  /* ───────────── Saturation ───────────── */
  {
    slug: 'isi-pandora',
    name: 'ISI Pandora',
    group: 'saturation',
    kind: 'Dual tube saturator',
    price: '$39',
    hero: 'Two tubes. Endless heat.',
    short:
      'A dual tube saturator that takes a sound from a warm glow to a full-blown burn. Stack a pentode and a triode, pick where the heat lands, and finish with a touch of air.',
    about: [
      'Pandora gives you two tube stages that work together. Drive the pentode for bite and edge, lean on the triode for body and richness, and watch the Heat meter show you exactly how hard you are pushing. It works on a single drum hit, a bass, a vocal or a whole mix.',
    ],
    features: [
      { label: 'Pentode and Triode', body: 'Two distinct tube voices that you can run on their own or push together.' },
      { label: 'Saturation', body: 'A dedicated drive stage ahead of the tubes for extra weight and harmonics.' },
      { label: 'Sat Freq', body: 'Aim the saturation at the lows, the highs, or the whole signal.' },
      { label: 'Heat meter', body: 'See the heat building on the way in and out, so you know what the tubes are doing.' },
      { label: 'Style', body: 'Switch the character between Tube and the Iseve, IPI and IsiTech flavours.' },
      { label: 'Air', body: 'Add open, silky top end after the saturation, without making it harsh.' },
      { label: 'Tight and Mix', body: 'Keep the low end controlled, and blend in as much or as little as you want.' },
      { label: 'Stereo, Mid or Side', body: 'Saturate the whole image, the centre, or just the sides.' },
      { label: 'Oversampling and Auto Gain', body: 'Up to 4x oversampling for clean harmonics, and level matching so you judge it by ear, not loudness.' },
    ],
    whoFor: 'Producers who want warmth, grit and presence on drums, bass, vocals and buses, from subtle glue to heavy distortion.',
    icon: 'solar:fire-linear',
  },
  {
    slug: 'tsukuyomi-crunch',
    name: 'Tsukuyomi Crunch',
    group: 'saturation',
    kind: 'Distortion',
    price: '$29',
    hero: 'Three flavours of dirt.',
    short:
      'A distortion with three personalities: crunchy, fuzzy and warm. Push it from a little bite to a lot of attitude, and shape how it breathes with bias, width and shadow.',
    about: [
      'Drive guitars, bass, drums, synths or a whole loop. Switch modes to change the whole character in a click, then use the touch control to decide how much of your playing comes through.',
    ],
    features: [
      { label: 'Crunch, Fuzz and Warm', body: 'Three distortion modes, from tight and biting to thick and furry to soft and round.' },
      { label: 'Drive and Touch', body: 'Pile on the gain, then choose how dynamic the distortion feels.' },
      { label: 'Bias, Width and Shadow', body: 'Sculpt the harmonics, stretch the stereo image, and fill in the low-level detail.' },
      { label: 'Live scope', body: 'Watch the waveform get chewed up in real time.' },
      { label: 'Mix and Output', body: 'Blend in the dirt for parallel distortion and level match the result.' },
    ],
    whoFor: 'Anyone who wants a single distortion that can go from subtle edge to full destruction.',
    icon: 'solar:fire-minimalistic-linear',
  },

  /* ───────────── Creative ───────────── */
  {
    slug: 'tsukuyomi-synergy',
    name: 'Tsukuyomi Synergy',
    group: 'creative',
    kind: 'Ensemble',
    price: '$29',
    hero: 'One sound. A whole ensemble.',
    short:
      'Turn a single voice into a lush, wide ensemble. Stack up to several detuned voices, pick how they move, and spread them across the stereo field.',
    about: [
      'Fatten a pad, widen a synth, thicken a vocal or give a plucked sound a shimmering halo. Four movement styles keep the motion from ever feeling the same.',
    ],
    features: [
      { label: 'Voices and Detune', body: 'Choose how many voices stack up and how far they drift apart in pitch.' },
      { label: 'Four movement styles', body: 'Sine and Triangle for smooth sweeps, Wander for organic drift, Swirl for rich, rotating motion.' },
      { label: 'Width and Rate', body: 'Open up the stereo image and set the speed of the movement.' },
      { label: 'Mix and Dry', body: 'Balance the ensemble against the original so the core of the sound stays solid.' },
      { label: 'Live scope', body: 'See the motion as you shape it.' },
    ],
    whoFor: 'Producers who want instant width and thickness on pads, synths, vocals and plucks.',
    icon: 'solar:users-group-rounded-linear',
  },
  {
    slug: 'tsukuyomi-tape-stop',
    name: 'Tsukuyomi Tape Stop',
    group: 'creative',
    kind: 'Spin down and spin up',
    price: '$19',
    hero: 'Pull the plug on the groove.',
    short:
      'Slow a sound to a stop like a record losing power, then spin it back up. Set how long each takes, bend the curve, and hit the button whenever the moment calls for it.',
    about: [
      'The classic end-of-bar drop, a dramatic transition, or a one-shot gag on a loop. Automate the Stop button to land it exactly where you want.',
    ],
    features: [
      { label: 'Stop', body: 'One big button to spin the sound down, and to bring it back.' },
      { label: 'Spin Down and Spin Up', body: 'Set how long the slowdown and the restart take, from a quick snap to a long slow drag.' },
      { label: 'Bend', body: 'Shape the curve of the slowdown for a smooth fade or a sudden drop.' },
      { label: 'Status display', body: 'See at a glance whether the tape is running or stopped.' },
    ],
    whoFor: 'Anyone who wants dramatic stops and restarts on drums, loops, vocals or full mixes.',
    icon: 'solar:stop-circle-linear',
  },
  {
    slug: 'tsukuyomi-ring-mod',
    name: 'Tsukuyomi Ring Mod',
    group: 'creative',
    kind: 'Ring modulator',
    price: '$19',
    hero: 'Metallic, robotic, otherworldly.',
    short:
      'Multiply your sound with an oscillator to create bell-like, metallic and robotic tones. Pick the waveform, set the frequency, and blend in as much as you want.',
    about: [
      'From subtle shimmer to full-on alien voice. Great on vocals, synths, drums and anything that needs to sound like it came from somewhere else.',
    ],
    features: [
      { label: 'Five waveforms', body: 'Sine, Triangle, Saw, Square or Noise, each with its own flavour of metal.' },
      { label: 'Frequency and Offset', body: 'Tune the modulation and nudge it away from the note for inharmonic textures.' },
      { label: 'Bleed and Rectify', body: 'Let some of the original through, or fold the signal for harder, edgier results.' },
      { label: 'Live scope', body: 'Watch the waveform get torn apart in real time.' },
      { label: 'Mix and Output', body: 'Blend it in and level match the result.' },
    ],
    whoFor: 'Sound designers and producers who want robotic, bell-like and experimental textures.',
    icon: 'solar:soundwave-square-linear',
  },
  {
    slug: 'tsukuyomi-bit-crush',
    name: 'Tsukuyomi Bit Crush',
    group: 'creative',
    kind: 'Bit crusher',
    price: '$29',
    hero: 'Crush it. Then shape the damage.',
    short:
      'Sample rate and bit depth reduction with the controls to tame it. Go from a hint of lo-fi grit to full digital destruction, with dither and smoothing to keep it musical.',
    about: [
      'Dirty up drums, give samples a vintage-sampler crunch, or wreck a synth into pure digital noise. Smoothing on the way in and out lets you decide how harsh the edges get.',
    ],
    features: [
      { label: 'Quantize', body: 'Reduce the sample rate for the aliasing crunch of old samplers and game consoles.' },
      { label: 'Bits', body: 'Drop the bit depth to flatten the dynamics and add grit.' },
      { label: 'Dither', body: 'Add noise to smooth out the harshest steps.' },
      { label: 'Smooth In and Smooth Out', body: 'Soften the edges before and after the crush for a more musical result.' },
      { label: 'Live scope', body: 'See the signal turn into steps as you turn the knobs.' },
    ],
    whoFor: 'Producers who want controllable lo-fi crunch on drums, samples and synths.',
    icon: 'solar:chart-square-linear',
  },

  {
    slug: 'tsukuyomi-motion',
    name: 'Tsukuyomi Motion',
    group: 'creative',
    kind: 'Rhythmic chop, duck and warp',
    price: '$39',
    hero: 'Make every sound move in time.',
    short:
      'Chop a sound into a rhythm, duck it around the beat, and warp it with repeating shapes, all locked to your tempo. Draw the pattern, play it from your keyboard, and let the groove do the work.',
    about: [
      'Turn a held pad into a pulsing gate, carve space for the kick with a ducking curve, or add repeating warp shapes for movement that never sits still. Eight slots let you build and switch between patterns instantly.',
    ],
    features: [
      { label: 'Chop', body: 'A 16-step pattern that slices a sound into rhythm, with rate, attack, decay, sustain and release for tight pulses or long swells.' },
      { label: 'Duck', body: 'Pumping, sidechain-style volume shapes with adjustable length, band and depth. Trigger them from the tempo or from your playing.' },
      { label: 'Warp', body: 'Repeating shapes that bend the sound in time for stuttering, rhythmic movement.' },
      { label: 'Eight patterns', body: 'Build up to eight setups and jump between them from your keyboard.' },
      { label: 'Live display', body: 'See the chop pattern, duck curve and warp shape move with the tempo.' },
      { label: 'Mix per section', body: 'Blend each section in separately, and match the output level.' },
    ],
    whoFor: 'Producers who want rhythmic gating, sidechain-style pumping and groove-locked movement from a single plugin.',
    icon: 'solar:soundwave-linear',
  },

  /* ───────────── Channel Strips ───────────── */
  {
    slug: 'iseve-strip',
    name: 'Iseve Strip',
    group: 'strip',
    kind: 'Channel strip',
    price: '$59',
    hero: 'A whole console channel in one plugin.',
    short:
      'The Iseve 1095 console EQ, a gate, and your choice of FET or optical compression, wired into one strip. Shape the tone, tighten the dynamics and add analog weight without stacking three plugins.',
    about: [
      'Reach for it first on drums, vocals, bass or anything that needs to sit in the mix fast. Run the EQ before the dynamics or flip the order, and let drive, noise and vinyl add the character of the real thing.',
    ],
    features: [
      { label: 'Console EQ', body: 'High, mid and low bands with a high-pass filter, for thick, warm, dimensional tone.' },
      { label: 'Drive and colour', body: 'Push the analog stage for weight, harmonics and a little bit of noise and vinyl texture.' },
      { label: 'Two compressors', body: 'Switch between the ISI 76 for fast FET grab and the IA2A for slow optical glue.' },
      { label: 'Gate and expander', body: 'Clean up bleed and tighten tails, with key filters to keep it from false triggering.' },
      { label: 'Process order', body: 'Run EQ into dynamics or dynamics into EQ, whichever the sound needs.' },
      { label: 'Metering', body: 'Input and output meters, plus gain reduction on both dynamics sections.' },
    ],
    notes: ['Modeled on the behaviour of classic console gear. Not a claimed clone of specific hardware.'],
    whoFor: 'Producers and mixers who want a complete channel, from first touch to final polish, in one plugin.',
    icon: 'solar:tuning-square-2-linear',
  },
  {
    slug: 'ipi-strip',
    name: 'IPI Strip',
    group: 'strip',
    kind: 'Channel strip',
    price: '$59',
    hero: 'Punchy, forward and ready to mix.',
    short:
      'The IPI EQ with its preamp grit, a gate, and FET or optical compression, all in one strip. Surgical when you want it, aggressive when you need it.',
    about: [
      'Bring a track to the front of the mix in a single plugin. Dig into problems with the parametric bands, shape the curve with the graphic EQ, then control and glue it with the compressor.',
    ],
    features: [
      { label: 'IPI EQ', body: 'Preamp grit into three parametric bands and a ten-band graphic EQ.' },
      { label: 'Drive and colour', body: 'Add attitude, noise and vinyl texture right in the strip.' },
      { label: 'Two compressors', body: 'ISI 76 for fast FET grab, IA2A for slow optical glue.' },
      { label: 'Gate and expander', body: 'Tidy up bleed and tighten tails, with key filters for precise control.' },
      { label: 'Process order', body: 'Switch between EQ first and dynamics first.' },
      { label: 'Metering', body: 'Input, output and gain reduction meters across the strip.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    whoFor: 'Producers who want a punchy, all-in-one channel for drums, bass, guitars and vocals.',
    icon: 'solar:equalizer-minimalistic-linear',
  },
  {
    slug: 'isitech-strip',
    name: 'IsiTech Strip',
    group: 'strip',
    kind: 'Channel strip',
    price: '$59',
    hero: 'Big, polished and complete.',
    short:
      'The IsiTech boost-and-cut program EQ, a gate, and FET or optical compression on one strip. Low-end force, open highs and polished dynamics from a single plugin.',
    about: [
      'Make a kick, bass, vocal or mix bus feel bigger without losing control. Boost and cut the low end together for the classic big-but-tight sound, then finish with compression.',
    ],
    features: [
      { label: 'Program EQ', body: 'Low boost and attenuate, high boost with adjustable bandwidth, and a high attenuation selector.' },
      { label: 'Drive and colour', body: 'Add warmth, weight, noise and vinyl texture.' },
      { label: 'Two compressors', body: 'ISI 76 for fast FET grab, IA2A for slow optical glue.' },
      { label: 'Gate and expander', body: 'Control bleed and tails with key filters to avoid false triggers.' },
      { label: 'Process order', body: 'Run EQ before dynamics or flip it.' },
      { label: 'Metering', body: 'Input, output and gain reduction metering.' },
    ],
    notes: ['Modeled on the behaviour of classic gear. Not a claimed clone of specific hardware.'],
    whoFor: 'Producers who want a smooth, polished channel with serious low-end authority.',
    icon: 'solar:sort-vertical-linear',
  },

  /* ───────────── Mix Tools ───────────── */
  {
    slug: 'tsukuyomi-gate',
    name: 'Tsukuyomi Gate',
    group: 'mix',
    kind: 'Gate and expander',
    price: '$29',
    hero: 'Silence the noise. Keep the hit.',
    short:
      'A gate and expander with a live scope that shows exactly what it is doing. Tighten drums, clean up bleed and cut the hiss between phrases.',
    about: [
      'Choose a hard gate for a clean cut or an expander for a more natural fade. Dial in the envelope, filter what the gate listens to, and hear exactly what is triggering it.',
    ],
    features: [
      { label: 'Gate or Expander', body: 'A clean cut or a natural, gradual closing.' },
      { label: 'Threshold and Range', body: 'Decide when it opens and how far it closes.' },
      { label: 'Attack, Hold and Release', body: 'Keep the front of every hit and shape the tail.' },
      { label: 'Key filters', body: 'High-pass and low-pass what the gate listens to, so snares ignore the kick.' },
      { label: 'Key Listen', body: 'Hear the trigger signal to dial it in perfectly.' },
      { label: 'Live scope', body: 'Watch the waveform and the threshold as the gate opens and closes.' },
    ],
    whoFor: 'Anyone who wants tight drums, clean vocals and no bleed.',
    icon: 'solar:shield-minimalistic-linear',
  },
  {
    slug: 'tsukuyomi-de-esser',
    name: 'Tsukuyomi De-Esser',
    group: 'mix',
    kind: 'De-esser',
    price: '$39',
    hero: 'Tame the sibilance. Keep the air.',
    short:
      'A de-esser for harsh S sounds with a clear view of the band it is working on. Tune it for a single vocal or for a full mix, and listen to exactly what it is removing.',
    about: [
      'Smooth out a bright vocal without dulling it. Pick a single-vocal or all-round mode, choose wide-band or split-band processing, and use the audition button to hear the sibilance you are cutting.',
    ],
    features: [
      { label: 'Single Vocal or Allround', body: 'Two detection modes tuned for solo voices or full material.' },
      { label: 'Wide Band or Split Band', body: 'Pull down the whole signal for transparency, or only the problem band for a more surgical touch.' },
      { label: 'Frequency range', body: 'Set exactly where the de-esser listens and works.' },
      { label: 'Lookahead', body: 'Catch sibilance before it hits, with no pumping.' },
      { label: 'Stereo Link and Mid/Side', body: 'Keep the image steady, or treat the centre and sides separately.' },
      { label: 'Audition and GR display', body: 'Hear what is being removed and see the gain reduction as it happens.' },
    ],
    whoFor: 'Vocalists, producers and mixers who want smooth, natural, non-lispy vocals.',
    icon: 'solar:microphone-3-linear',
  },
  {
    slug: 'tsukuyomi-transient',
    name: 'Tsukuyomi Transient',
    group: 'mix',
    kind: 'Transient shaper',
    price: '$29',
    hero: 'Shape the punch.',
    short:
      'Turn the attack up for snap or down for softness, and lengthen or shorten the sustain. Reshape drums, plucks and loops without touching the EQ.',
    about: [
      'Bring a snare forward, tame a harsh pick attack or tighten a boomy kick.',
    ],
    features: [
      { label: 'Attack', body: 'Boost the initial hit for snap or cut it for a smoother, softer front.' },
      { label: 'Sustain', body: 'Extend the tail for body or shorten it for tightness.' },
      { label: 'Carve and Response', body: 'Shape how the effect behaves and how quickly it reacts.' },
      { label: 'Soft clip', body: 'Catch the extra level from big boosts before it clips.' },
      { label: 'Mix and Output', body: 'Parallel blend and level match the result.' },
    ],
    whoFor: 'Producers who want punchier drums and more control over how sounds hit.',
    icon: 'solar:bolt-circle-linear',
  },
  {
    slug: 'tsukuyomi-tri-eq',
    name: 'Tsukuyomi Tri EQ',
    group: 'mix',
    kind: 'Three-band EQ',
    price: '$29',
    hero: 'Three bands. Set in seconds.',
    short:
      'A simple, powerful three-band EQ with adjustable crossovers and a live spectrum. Boost the lows, tame the mids and open the highs without a maze of knobs.',
    about: [
      'When you need to shape a sound quickly, nothing beats low, mid and high. Move the crossover points to choose exactly where each band begins and ends, and watch the curve respond.',
    ],
    features: [
      { label: 'Low, Mid and High', body: 'Three big gain controls for fast, musical tone shaping.' },
      { label: 'Adjustable crossovers', body: 'Choose where the lows end and the highs begin.' },
      { label: 'Live spectrum', body: 'See your sound and the EQ curve together.' },
      { label: 'Output', body: 'Level match the result.' },
    ],
    whoFor: 'Anyone who wants a fast, no-nonsense EQ for any track or bus.',
    icon: 'solar:tuning-linear',
  },
  {
    slug: 'tsukuyomi-filter',
    name: 'Tsukuyomi Filter',
    group: 'mix',
    kind: 'Low cut and high cut',
    price: '$19',
    hero: 'Clean up. Or close it down.',
    short:
      'A low cut and a high cut with a choice of 12 or 24 dB slopes and a resonance control, with a live spectrum to see what you are removing.',
    about: [
      'Clear the rumble from a vocal, darken a loop for a breakdown, or sweep a filter through a build. Use the steeper slope for a decisive cut and add resonance for a squelchy edge.',
    ],
    features: [
      { label: 'Low Cut and High Cut', body: 'Remove low rumble and top-end hiss, or narrow the sound down to a thin band.' },
      { label: '12 or 24 dB slopes', body: 'A gentle roll-off or a steep, decisive cut.' },
      { label: 'Resonance', body: 'Add a peak at the cutoff for a more vocal, dramatic sweep.' },
      { label: 'Live spectrum', body: 'See the frequencies being cut as you move the controls.' },
    ],
    whoFor: 'Producers who want clean mixes, smooth transitions and expressive filter sweeps.',
    icon: 'solar:filter-linear',
  },
  {
    slug: 'tsukuyomi-gain',
    name: 'Tsukuyomi Gain',
    group: 'mix',
    kind: 'Gain and balance',
    price: '$9',
    hero: 'Level, balance and polarity.',
    short:
      'A clean, simple utility for setting the level, adjusting the stereo balance, flipping the phase or collapsing to mono.',
    about: [
      'The tool you always need. Match levels between plugins, check your mix in mono, or flip the phase to fix a cancelling pair.',
    ],
    features: [
      { label: 'Gain', body: 'Turn the level down or up with a single clean control.' },
      { label: 'Balance', body: 'Shift the stereo image left or right.' },
      { label: 'Mono and Phase', body: 'Check your mix in mono or flip the polarity to fix phase problems.' },
      { label: 'Level display', body: 'A live meter shows what you are sending out.' },
    ],
    whoFor: 'Everyone, on every project.',
    icon: 'solar:volume-loud-linear',
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

export const PLUGINS: PluginSpec[] = PLUGIN_DEFS.map(withScreenshot)

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

export const SUBSCRIPTION_HREF = `${PLUGINS_HREF}/subscription`

export const ISI_CREATE_SUBSCRIPTION = {
  name: 'Isi Access',
  price: '$9/month',
  tagline: 'Every Isiata plugin for $9 a month.',
  description:
    'One low monthly price opens up the whole Isiata plugin catalog: the Tsukuyomi Drum Engine, sound design, effects, saturation, analog EQ and compressors.',
} as const

export function getSubscriptionPlugins(): PluginSpec[] {
  return PLUGINS
}

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
  'isi-pandora',
  'iseve-1095',
  'isheen',
] as const
