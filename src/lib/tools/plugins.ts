import { TSUKUYOMI_DRUM_ENGINE_HREF, TSUKUYOMI_IMAGE_ROOT } from './tsukuyomi-drum-engine'

export const PLUGINS_HREF = '/tools/plugins'

export type PluginGroupId = 'instrument' | 'tab' | 'effect' | 'analog' | 'compressor'

export const PLUGIN_GROUPS: { id: PluginGroupId; label: string; blurb: string }[] = [
  {
    id: 'instrument',
    label: 'The instrument',
    blurb: 'The drum engine and its sound-design tab, each on its own.',
  },
  {
    id: 'tab',
    label: 'Tab plugins',
    blurb: 'Whole tabs of the drum engine, lifted onto any track or bus.',
  },
  {
    id: 'effect',
    label: 'Tsukuyomi effects',
    blurb: 'One effect, one plugin. The same plates and timing as the drum engine.',
  },
  {
    id: 'analog',
    label: 'Analog colour',
    blurb: 'Console and program EQ models with drive, noise and vinyl.',
  },
  {
    id: 'compressor',
    label: 'Compressors',
    blurb: 'Five characters, one slot each, with a built in parallel mix.',
  },
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
  /** One or two paragraphs of "what it does" */
  about: string[]
  controls: { label: string; body: string }[]
  notes?: string[]
  /** Character line for analog and compressor models */
  character?: string
  whoFor?: string
  /** Plugin code and category, for support pages and DAW lookup */
  target: string
  code: string
  dawCategory: string
  /** Optional faceplate screenshot, served from /public */
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

const SYNC_TIMES = '1/8, 1/4, 1/2 or 1 beat, then 1, 2, 4 or 8 bars'

export const PLUGINS: PluginSpec[] = [
  /* ───────────── The instrument ───────────── */
  {
    slug: 'tsukuyomi-drum-engine',
    name: 'Tsukuyomi Drum Engine',
    group: 'instrument',
    kind: 'Instrument · Drum engine',
    price: '$129',
    hero: 'Write the beat. Design the kit. Mix it in the same window.',
    short:
      'A 16-pad drum instrument with a step sequencer that follows your DAW, per-pad sound design, kit FX, analog colour, a parallel compressor rack, and a master section that finishes the kit.',
    about: [
      'Sixteen pads, a sequencer that locks to the host, and a full mix section in one window. Load the factory library or your own WAV, AIFF or FLAC files, program a groove, shape each pad, then mix and master the kit without leaving it.',
    ],
    controls: [],
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
    kind: 'Instrument · One-shot sampler',
    price: '$39',
    hero: 'The SOUND tab, on its own. One sample, one hit, your own sound design.',
    short:
      'A one-shot sample instrument for your own drums. Shape a sample with the same envelope, filter, drive and pitch controls as a Tsukuyomi pad, then play it from MIDI or export the edited hit as a WAV.',
    about: [
      'Tsukuyomi Sound is the drum engine’s SOUND tab as a standalone instrument. One voice path, one sample, no layers, sends or routing. The sample is saved inside the session, so the project opens with the sound intact.',
      'Load with the file button or by dropping a file on the window. It accepts WAV, AIFF, FLAC, OGG and MP3, up to 60 seconds.',
    ],
    controls: [
      { label: 'Waveform', body: 'Click to audition. Drag the START and END markers to trim. Drop an audio file anywhere on the window to load it.' },
      { label: 'Envelope', body: 'Attack, Decay, Sustain, Release.' },
      { label: 'Filter', body: 'Cutoff, Resonance, filter type, and 12 or 24 dB steepness. Velocity to filter.' },
      { label: 'Pitch', body: 'Pitch and Fine. Pitch can keep the sample length or change speed with pitch.' },
      { label: 'Character', body: 'Drive. Velocity to amplitude.' },
      { label: 'Output', body: 'Level, Pan, phase invert, and Reverse.' },
      { label: 'EQ and sweep', body: 'Low, mid and high EQ, and sweep, the same as the pad EQ on a Tsukuyomi pad.' },
      { label: 'Playback', body: 'One Shot, Key Track, and Choke.' },
    ],
    notes: [
      'One Shot (on by default): a note plays through the whole sample. Off, note-off releases it through the envelope.',
      'Key Track transposes the sample across the keyboard from its root note.',
      'Choke: a new hit cuts the previous one, like a closed hi-hat over an open one.',
      'Export renders the edited hit at full velocity to a 24-bit WAV file.',
    ],
    whoFor:
      'Producers with their own kick, snare or one-shot library who want the Tsukuyomi shaping tools on a single sound. Works as a sampler on an instrument track.',
    target: 'TsukuyomiSound',
    code: 'TsSd',
    dawCategory: 'Instrument',
    icon: 'solar:soundwave-linear',
  },

  /* ───────────── Tab plugins ───────────── */
  {
    slug: 'tsukuyomi-fx',
    name: 'Tsukuyomi FX',
    group: 'tab',
    kind: 'Insert FX · Full FX tab',
    price: '$59',
    hero: 'The whole FX tab as one insert.',
    short:
      'Delay, reverb, stutter, chorus, phaser, flanger and soft clip, plus the three analog colour models and the master LO-FI and 8 BIT, on a single plugin.',
    about: [
      'Put it on any track or bus. Every effect in the Tsukuyomi FX tab is here, with the same plates, parameters and timing. Tempo comes from the host when it reports one. Otherwise it runs from its own Tempo setting, so synced effects keep moving.',
    ],
    controls: [
      { label: 'Delay · TS-D1 Echo', body: 'Mix, feedback, time (synced or free milliseconds), tone and width.' },
      { label: 'Reverb · TS-R2 Space', body: 'Room, Custom impulse, or ISIVerb drum reverbs. Mix, size, damping, width, pre-delay, length, and low and high cuts.' },
      { label: 'Stutter · TS-S8 Repeat', body: 'Repeats a slice of the input in time. 1/32 to 1/2 note, or 1 or 2 bars. Probability, conditions, decay, repeats, reverse.' },
      { label: 'Chorus · TS-C1 Ensemble', body: 'Mix, rate and depth.' },
      { label: 'Phaser · TS-P4 Phase', body: 'Amount, sweep (synced or free), depth, feedback and centre frequency.' },
      { label: 'Flanger · TS-F2 Jet', body: 'Amount, sweep (synced or free), depth, feedback and delay.' },
      { label: 'Soft Clip · TS-K1', body: 'Threshold, knee shape (tanh, cubic or parabolic), knee width, output and anti-aliasing.' },
      { label: 'Analog colour', body: 'Iseve 1095, IPI and IsiTech, each with its own face and controls.' },
      { label: 'Master', body: 'LO-FI and 8 BIT, one knob each.' },
    ],
    notes: [
      'Effects at zero are off.',
      `Synced times are ${SYNC_TIMES}.`,
      'Reports a tail to the host so bounces and freezes include the ring-out.',
    ],
    whoFor:
      'Anyone who wants the drum engine’s effect and colour set on a mix bus, a send, or a drum group.',
    target: 'TsukuyomiFX',
    code: 'TsFx',
    dawCategory: 'Fx',
    icon: 'solar:tuning-2-linear',
  },
  {
    slug: 'tsukuyomi-comp',
    name: 'Tsukuyomi Comp',
    group: 'tab',
    kind: 'Insert FX · Parallel compressor rack',
    price: '$49',
    hero: 'The COMP tab as a parallel compressor rack.',
    short:
      'Three compressor slots blended in parallel, each with its own type, mix and output, with oversampling. Every slot hears the full input.',
    about: [
      'Three slots run side by side, each one of five types: Isheen, Isibox, Icarus, ISI 76 or IA2A. Each slot has its own on switch, oversampling switch, mix and output level. The rack output is blended with the dry input.',
    ],
    controls: [
      { label: 'Per slot', body: 'Type, on / bypass, and the faceplate controls for that type, opened from the rack.' },
      { label: 'Rack', body: 'Mix (how much of the summed slots sits against the dry input), Output, and Oversampling.' },
      { label: 'Routing', body: 'Each slot hears the input directly, with no per-pad sends.' },
      { label: 'Isheen', body: 'Harmonic colour compressor. Velvet or Bite before compression, presence, and Rage.' },
      { label: 'Isibox', body: 'Feedback variable-mu style. Thickness versus transient.' },
      { label: 'Icarus', body: 'Morphing tube style. Aggressive, Dense or Smooth.' },
      { label: 'ISI 76', body: 'Fast FET grab. Ratios 4, 8, 12, 20, and ALL.' },
      { label: 'IA2A', body: 'Slow optical glue. Peak Reduction and Gain.' },
    ],
    notes: [
      'Oversampling adds latency. The plugin reports it to the host and delays the dry signal to match, so parallel compression does not comb.',
    ],
    whoFor: 'Producers who want parallel drum compression with several characters on one insert.',
    target: 'TsukuyomiComp',
    code: 'TsCp',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:equalizer-linear',
  },

  /* ───────────── Tsukuyomi effects ───────────── */
  {
    slug: 'tsukuyomi-delay',
    name: 'Tsukuyomi Delay',
    group: 'effect',
    kind: 'Effect · Delay, Echo',
    price: '$29',
    hero: 'TS-D1 Echo. A drum-engine delay on its own.',
    short: 'The Tsukuyomi delay with mix, feedback, time, tone and width. Synced or free time.',
    about: ['The delay from the drum engine, as its own plugin. It exposes the delay’s own controls, plus tempo when synced.'],
    controls: [
      { label: 'Mix', body: 'Wet level. Starts at 30%.' },
      { label: 'Feedback', body: 'How many repeats.' },
      { label: 'Time', body: 'Tempo-synced note values or free milliseconds.' },
      { label: 'Tone', body: 'Darkens the repeats.' },
      { label: 'Width', body: 'Stereo spread.' },
    ],
    notes: ['Reports a 10-second tail.'],
    target: 'TsukuyomiDelay',
    code: 'TsDl',
    dawCategory: 'Fx, Delay',
    icon: 'solar:clock-circle-linear',
  },
  {
    slug: 'tsukuyomi-reverb',
    name: 'Tsukuyomi Reverb',
    group: 'effect',
    kind: 'Effect · Reverb',
    price: '$39',
    hero: 'TS-R2 Space. Drum reverbs and impulse reverbs in one plugin.',
    short:
      'The kit reverb as a plugin, with three types: the algorithmic Room, your own impulse responses (Custom), and ISIVerb drum reverbs that ship with the plugin.',
    about: [
      'Room is the original algorithmic reverb. Custom loads one impulse response from your IR folder. ISIVerb is a set of algorithmic drum reverbs that ship with the plugin: rooms, plates, halls and gated tails.',
      'Drop WAV, AIFF or FLAC files into %APPDATA%\\Isiata\\Tsukuyomi\\IR on Windows or ~/Library/Application Support/Isiata/Tsukuyomi/IR on macOS. Every file appears under Custom, and files in subfolders keep the folder name. Reopen the plugin after adding files. The plugin does not include impulse files, and ISIVerb does not use this folder.',
    ],
    controls: [
      { label: 'Core', body: 'Mix (starts at 30%), Size, Damp, Width, Pre-delay.' },
      { label: 'Length', body: 'Free up to 16 seconds, or synced to 1, 2 or 4 beats, or 1, 2, 4 or 8 bars. PRESET keeps the reverb’s own length.' },
      { label: 'Pre-delay sync', body: '1/32 to 1 beat.' },
      { label: 'Custom', body: 'IR level (−24 to +12 dB) and low and high cuts.' },
      { label: 'ISIVerb', body: 'Pre-delay and low and high cuts.' },
    ],
    notes: ['Reports a 10-second tail.'],
    target: 'TsukuyomiReverb',
    code: 'TsRv',
    dawCategory: 'Fx, Reverb',
    icon: 'solar:waterdrops-linear',
  },
  {
    slug: 'tsukuyomi-chorus',
    name: 'Tsukuyomi Chorus',
    group: 'effect',
    kind: 'Effect · Modulation',
    price: '$29',
    hero: 'TS-C1 Ensemble. A wide, moving chorus for drums.',
    short: 'A chorus with mix, rate and depth. Full mix and full depth gives a wide chorus. Half depth is the original widen.',
    about: ['The drum engine’s chorus as its own plugin. Three controls, no menu diving.'],
    controls: [
      { label: 'Mix', body: 'Starts at 50%.' },
      { label: 'Rate', body: 'Modulation speed in Hz.' },
      { label: 'Depth', body: 'Modulation amount.' },
    ],
    notes: ['Reports a 0.5-second tail.'],
    target: 'TsukuyomiChorus',
    code: 'TsCh',
    dawCategory: 'Fx, Modulation',
    icon: 'solar:soundwave-circle-linear',
  },
  {
    slug: 'tsukuyomi-phaser',
    name: 'Tsukuyomi Phaser',
    group: 'effect',
    kind: 'Effect · Modulation',
    price: '$29',
    hero: 'TS-P4 Phase. A mid-range sweep that can lock to your tempo.',
    short: 'A phaser that sweeps the mid range. Sync to the tempo or run free, from 20 milliseconds to 16 seconds.',
    about: ['Sweeps the mid range and can lock to the host tempo. Alt-click the time menu to return to 1 bar.'],
    controls: [
      { label: 'Amount', body: 'Starts at 50%.' },
      { label: 'Sweep', body: `Synced (${SYNC_TIMES}) or free in milliseconds.` },
      { label: 'Depth, Feedback, Centre', body: 'Shape how far, how resonant, and where in the spectrum it sweeps.' },
    ],
    notes: ['Reports a 0.5-second tail.'],
    target: 'TsukuyomiPhaser',
    code: 'TsPh',
    dawCategory: 'Fx, Modulation',
    icon: 'solar:round-transfer-diagonal-linear',
  },
  {
    slug: 'tsukuyomi-flanger',
    name: 'Tsukuyomi Flanger',
    group: 'effect',
    kind: 'Effect · Modulation',
    price: '$29',
    hero: 'TS-F2 Jet. Short, metallic sweeps.',
    short: 'A flanger tighter than chorus. Synced or free, with depth, feedback and delay controls.',
    about: ['Short, metallic sweeps that lock to tempo or run free.'],
    controls: [
      { label: 'Amount', body: 'Starts at 50%.' },
      { label: 'Sweep', body: 'The same synced bar times as the phaser, or free in Hz.' },
      { label: 'Depth, Feedback, Delay', body: 'Sweep range, resonance, and the base delay.' },
    ],
    notes: ['Reports a 0.5-second tail.'],
    target: 'TsukuyomiFlanger',
    code: 'TsFl',
    dawCategory: 'Fx, Modulation',
    icon: 'solar:wind-linear',
  },
  {
    slug: 'tsukuyomi-stutter',
    name: 'Tsukuyomi Stutter',
    group: 'effect',
    kind: 'Effect · Delay',
    price: '$29',
    hero: 'TS-S8 Repeat. Tempo-locked stutters for drums.',
    short: 'Repeats a slice of the input in time with the tempo. Choose where it happens in the bar, how often, and how it decays.',
    about: ['The stutter alone. Delay and reverb are not included.'],
    controls: [
      { label: 'Amount', body: 'Starts at 50%. Off at zero.' },
      { label: 'Time', body: '1/32 to 1/2 note, then 1 or 2 bars.' },
      { label: 'When', body: 'Where in the bar the repeat starts.' },
      { label: 'Probability and Condition', body: 'Always, every 2, 3 or 4 loops, or fill.' },
      { label: 'Decay and Repeats', body: 'How the repeats fade and how many there are.' },
      { label: 'Reverse', body: 'Plays the repeated slice backwards.' },
    ],
    notes: ['Reports a 10-second tail.'],
    target: 'TsukuyomiStutter',
    code: 'TsSt',
    dawCategory: 'Fx, Delay',
    icon: 'solar:repeat-linear',
  },
  {
    slug: 'tsukuyomi-soft-clip',
    name: 'Tsukuyomi Soft Clip',
    group: 'effect',
    kind: 'Effect · Distortion',
    price: '$29',
    hero: 'TS-K1 Soft Clip. Round off the peaks and keep the drive.',
    short: 'A soft clipper with a threshold, three knee shapes, adjustable knee width, output level, and anti-aliasing.',
    about: ['Turn Amount up to lower the threshold and round off what is above it.'],
    controls: [
      { label: 'Amount', body: 'Starts at 30%.' },
      { label: 'Knee', body: 'tanh, cubic or parabolic.' },
      { label: 'Knee width', body: 'How gradually the clip begins.' },
      { label: 'Output', body: 'Level after clipping.' },
      { label: 'Anti-alias', body: 'Keeps the added harmonics clean.' },
    ],
    notes: ['No tail.'],
    target: 'TsukuyomiSoftClip',
    code: 'TsCl',
    dawCategory: 'Fx, Distortion',
    icon: 'solar:graph-up-linear',
  },
  {
    slug: 'tsukuyomi-lo-fi',
    name: 'Tsukuyomi Lo-Fi',
    group: 'effect',
    kind: 'Effect · Distortion, one knob',
    price: '$19',
    hero: 'One knob. Worn tape, dull top, sample hold.',
    short: 'The master LO-FI from the Mix / Master section as its own plugin. Turn the knob to age the sound.',
    about: ['One knob, taken straight from the drum engine’s master section.'],
    controls: [{ label: 'Amount', body: 'Starts at 50%.' }],
    notes: ['No tail.'],
    target: 'TsukuyomiLoFi',
    code: 'TsLf',
    dawCategory: 'Fx, Distortion',
    icon: 'solar:cassette-2-linear',
  },
  {
    slug: 'tsukuyomi-8-bit',
    name: 'Tsukuyomi 8 Bit',
    group: 'effect',
    kind: 'Effect · Distortion, one knob',
    price: '$19',
    hero: 'One knob. Bit depth and sample-rate crush.',
    short: 'The master 8 BIT from the Mix / Master section as its own plugin. Low-bit crunch for sampler and game textures.',
    about: ['One knob, taken straight from the drum engine’s master section.'],
    controls: [{ label: 'Amount', body: 'Starts at 50%.' }],
    notes: ['No tail.'],
    target: 'TsukuyomiBit',
    code: 'Ts8b',
    dawCategory: 'Fx, Distortion',
    icon: 'solar:gameboy-linear',
  },

  /* ───────────── Analog colour ───────────── */
  {
    slug: 'iseve-1095',
    name: 'Iseve 1095',
    group: 'analog',
    kind: 'Analog colour · EQ',
    price: '$39',
    hero: 'Console EQ with analog colour.',
    short:
      'Neve-style console EQ with high, mid and low bands, a high-pass filter, and drive, input, output, noise, vinyl and blend controls.',
    about: ['The Iseve 1095 analog model on its own. The inserted analog stage is on by default.'],
    controls: [
      { label: 'EQ', body: 'High, mid and low; high-pass filter; EQ in and out; polarity.' },
      { label: 'Colour', body: 'Drive, colour, input, output, blend, noise and vinyl.' },
    ],
    character: 'Thick, warm and dimensional.',
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
    kind: 'Analog colour · EQ',
    price: '$39',
    hero: 'Punchy, forward EQ with graphic EQ mode.',
    short:
      'Preamp grit into a three-band parametric EQ plus a 10-band graphic EQ, with shelves and a filter.',
    about: ['The IPI analog model on its own.'],
    controls: [
      { label: 'Preamp', body: 'Grit and input.' },
      { label: 'Parametric EQ', body: 'Three bands.' },
      { label: 'Graphic EQ', body: '10 bands from 31 Hz to 16 kHz.' },
      { label: 'Shelves and filter', body: 'With independent EQ and GEQ power.' },
      { label: 'Colour', body: 'Output, blend, noise and vinyl.' },
    ],
    character: 'Punchy, forward and aggressive.',
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
    kind: 'Analog colour · EQ',
    price: '$39',
    hero: 'Boost-and-cut program EQ.',
    short:
      'Passive-style program EQ with low and high boost, attenuate and frequency controls, high bandwidth, and a high-cut selector.',
    about: ['The IsiTech analog model on its own. Boost and cut together for the classic big-but-tight low end.'],
    controls: [
      { label: 'Low', body: 'Boost, attenuate, and frequency.' },
      { label: 'High', body: 'Boost, attenuate, frequency, and bandwidth.' },
      { label: 'High cut', body: 'Selector.' },
      { label: 'Colour', body: 'Drive, input, output, blend, noise and vinyl.' },
    ],
    character: 'Smooth, big and polished.',
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
    kind: 'Compressor · Character',
    price: '$29',
    hero: 'A harmonic colour compressor.',
    short: 'Velvet or Bite before compression, presence, Rage, and a MIX control for parallel blend.',
    about: ['The Isheen compressor on one slot.'],
    controls: [
      { label: 'Core', body: 'On, OS (oversampling), MIX, OUT.' },
      { label: 'Velvet or Bite', body: 'Pre-compression colour.' },
      { label: 'Presence and Rage', body: 'Add top-end bite and push the character.' },
    ],
    notes: ['MIX at 100% is an insert. Lower it to blend the compressed signal with the dry, latency-aligned signal.'],
    target: 'IsiTop',
    code: 'ITop',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:sun-2-linear',
  },
  {
    slug: 'isibox',
    name: 'Isibox',
    group: 'compressor',
    kind: 'Compressor · Variable-mu',
    price: '$29',
    hero: 'Punch from a variable-mu style compressor.',
    short: 'A feedback variable-mu style design that trades thickness against transient.',
    about: ['The Isibox compressor on one slot.'],
    controls: [
      { label: 'Core', body: 'On, OS, MIX, OUT.' },
      { label: 'Thickness versus transient', body: 'Decide how much body and how much snap survives.' },
    ],
    notes: ['MIX at 100% is an insert. Lower it for parallel punch.'],
    target: 'IsiPunch',
    code: 'IPun',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:box-linear',
  },
  {
    slug: 'icarus',
    name: 'Icarus',
    group: 'compressor',
    kind: 'Compressor · Tube, Smash',
    price: '$29',
    hero: 'Smash and tube drive, from aggressive to smooth.',
    short: 'A morphing tube-style design with Aggressive, Dense and Smooth characters and impact.',
    about: ['The Icarus compressor on one slot.'],
    controls: [
      { label: 'Core', body: 'On, OS, MIX, OUT.' },
      { label: 'Character', body: 'Aggressive, Dense or Smooth, with character and compression controls.' },
    ],
    notes: ['MIX at 100% is an insert. Lower it for parallel smash.'],
    target: 'IsiSmash',
    code: 'ISma',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:fire-linear',
  },
  {
    slug: 'isi-76',
    name: 'ISI 76',
    group: 'compressor',
    kind: 'Compressor · FET',
    price: '$29',
    hero: 'A fast FET grab with ratio buttons.',
    short: 'A fast FET compressor with ratio buttons 4, 8, 12, 20 and ALL.',
    about: ['The ISI 76 compressor on one slot.'],
    controls: [
      { label: 'Core', body: 'On, OS, MIX, OUT.' },
      { label: 'Ratio', body: '4, 8, 12, 20 or ALL.' },
    ],
    notes: ['MIX at 100% is an insert. Lower it for parallel grab.'],
    target: 'Isi76',
    code: 'I76a',
    dawCategory: 'Fx, Dynamics',
    icon: 'solar:bolt-linear',
  },
  {
    slug: 'ia2a',
    name: 'IA2A',
    group: 'compressor',
    kind: 'Compressor · Optical',
    price: '$29',
    hero: 'Slow optical glue.',
    short: 'A slow optical leveller with Peak Reduction and Gain.',
    about: ['The IA2A compressor on one slot.'],
    controls: [
      { label: 'Core', body: 'On, OS, MIX, OUT.' },
      { label: 'Peak Reduction and Gain', body: 'How much it levels, and how much level you take back.' },
    ],
    notes: ['MIX at 100% is an insert. Lower it for parallel glue.'],
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
  launchPrice: string
  regularPrice: string
  includes: string[]
  badge?: string
}

const EFFECT_NAMES = PLUGINS.filter((p) => p.group === 'effect').map((p) => p.name)

export const PLUGIN_BUNDLES: PluginBundle[] = [
  {
    slug: 'tsukuyomi-complete',
    name: 'Tsukuyomi Complete',
    tagline: 'A complete drum production environment.',
    launchPrice: '$149',
    regularPrice: '$249',
    includes: [
      'Tsukuyomi Drum Engine',
      'Tsukuyomi Sound',
      'Tsukuyomi FX',
      'Tsukuyomi Comp',
      `All ${EFFECT_NAMES.length} individual Tsukuyomi effects`,
    ],
    badge: 'Flagship',
  },
  {
    slug: 'analog-collection',
    name: 'Isiata Analog Collection',
    tagline: 'Three console and program EQ models.',
    launchPrice: '$79',
    regularPrice: '$117',
    includes: ['Iseve 1095', 'IPI', 'IsiTech'],
  },
  {
    slug: 'compressor-collection',
    name: 'Isiata Compressor Collection',
    tagline: 'Five compressor characters, each on its own slot.',
    launchPrice: '$79',
    regularPrice: '$145',
    includes: ['Isheen', 'Isibox', 'Icarus', 'ISI 76', 'IA2A'],
  },
  {
    slug: 'everything',
    name: 'Isiata Everything Bundle',
    tagline: 'All 21 plugins, including future qualifying updates to these products.',
    launchPrice: '$199',
    regularPrice: '$399',
    includes: ['All 21 plugins'],
    badge: 'Best overall value',
  },
]

export const PLUGIN_SHARED_FACTS = [
  {
    label: 'Formats',
    body: 'Windows: VST3 and Standalone. macOS: VST3, AU and Standalone. The Tsukuyomi Drum Engine also ships AAX for Pro Tools.',
  },
  {
    label: 'Same engine, same sound',
    body: 'The plugins reuse the drum engine’s DSP and panels. A setting sounds the same in a plugin as on a Tsukuyomi pad.',
  },
  {
    label: 'Architectural models',
    body: 'The analog and compressor models are built from the behaviour of classic gear. They are not claimed clones of specific hardware.',
  },
  {
    label: 'Install',
    body: 'Every plugin ships as its own folder and zip, plus a bundle with Install All and Uninstall All.',
  },
  {
    label: 'Made by',
    body: 'Isiata. Created by Brian Marshall.',
  },
] as const

export const PLUGIN_PRICE_NOTE = 'Prices in USD.'

export function getPlugin(slug: string): PluginSpec | undefined {
  return PLUGINS.find((p) => p.slug === slug)
}

export function pluginHref(plugin: PluginSpec): string {
  return plugin.href ?? `${PLUGINS_HREF}/${plugin.slug}`
}

export function getPluginsByGroup(group: PluginGroupId): PluginSpec[] {
  return PLUGINS.filter((p) => p.group === group)
}

export const PLUGIN_COUNT = PLUGINS.length
