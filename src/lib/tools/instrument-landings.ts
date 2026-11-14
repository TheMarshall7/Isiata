/** Landing-page content for the instrument detail pages (ISI Bass, Isynth 7). */

export type LandingShot = {
  file: string
  /** Pixel size of the file */
  width: number
  height: number
  /** Size of the plugin section on screen, in CSS pixels. Screens never display larger than ~1.35x this, so they stay sharp. */
  cssWidth: number
  alt: string
}

export type LandingFeature = {
  eyebrow: string
  title: string
  body: string
  /** Short label/body pairs shown beside the screenshot */
  points?: [string, string][]
  /** Small chips under the copy */
  chips?: string[]
  shot: LandingShot
  /** Put the screenshot on the left on wide screens */
  flip?: boolean
  /** Render the screenshot full width under the copy (for wide strips) */
  wide?: boolean
  /** Heading and paragraph on top, then the points beside the picture */
  split?: boolean
  /** A second feature shown beside this one in two columns */
  pair?: LandingFeature
}

export type InstrumentLanding = {
  slug: string
  hero: string[]
  heroShot: LandingShot
  /** Leave empty until the walkthrough video is uploaded */
  videoUrl: string
  videoTitle: string
  videoCaption: string
  videoBlurb: string
  problem: { title: string; body: string; emphasis: string; shot?: LandingShot }
  features: LandingFeature[]
  /** Short grid of extra things worth knowing */
  extras: { title: string; body: string }[]
  closing: [string, string]
}

const root = '/Plugin Screenshots/Details'
export const landingShotSrc = (file: string) => encodeURI(`${root}/${file}`)

export const INSTRUMENT_LANDINGS: Record<string, InstrumentLanding> = {
  'isi-bass': {
    slug: 'isi-bass',
    hero: ['Key bass. Synth bass. 808.', 'Amp, cab and tone built in.', 'The whole low end. One window.'],
    heroShot: {
      file: 'bass-hero.png',
      width: 2360,
      height: 1712,
      cssWidth: 1180,
      alt: 'ISI Bass main interface with keyboard, tone, character, amp and cabinet',
    },
    videoUrl: '',
    videoTitle: 'Hear the whole low end.',
    videoCaption: 'Key bass, synth bass and 808. One instrument, from the first note.',
    videoBlurb: 'Key bass, bass synth, and 808. One take through the whole instrument.',
    problem: {
      title: 'The whole low end. One instrument.',
      body: 'A key bass for the pocket. A synth for the round lows. An 808 for the slide. Then an amp, a cabinet, some compression and the key noise that makes it feel played. Most of the time that is a pile of separate tools.',
      emphasis: 'ISI Bass puts all of it in one window: three engines, tone, drive, amp and cab, sidechain and a real keyboard bass feel.',
    },
    features: [
      {
        eyebrow: 'Play it',
        title: 'Feels like a real key bass.',
        body: 'Mono by default with true legato, so a line keeps singing when you roll from one key to the next. Hold one note, play the next, let go of the first: the new note keeps ringing. Release the top key and it falls back to the one still held.',
        chips: ['True mono legato', 'Glide', 'Pitch bend', 'Full width keyboard'],
        shot: {
          file: 'bass-keyboard.png',
          width: 2600,
          height: 543,
          cssWidth: 1160,
          alt: 'ISI Bass full width playable keyboard with volume and tone faders',
        },
        wide: true,
      },
      {
        eyebrow: 'Three engines',
        title: 'Key bass, synth or 808. One switch.',
        body: 'Play the sampled key bass, switch to the dual oscillator synth, or flip to a dedicated 808 with its own decay, pitch drop, punch, drive and tone. Every engine runs through the same tone, amp and cabinet.',
        points: [
          ['Sample', 'The key bass, with real key noise.'],
          ['Synth', 'Round lows, plucks, Reese and drones.'],
          ['808', 'Long, sliding sub hits for hip-hop.'],
        ],
        shot: {
          file: 'bass-engines.png',
          width: 2600,
          height: 680,
          cssWidth: 746,
          alt: 'ISI Bass engine selector with the 808 controls: decay, pitch drop, drop time, punch, drive, tone and octave',
        },
      },
      {
        eyebrow: '808 mode',
        title: 'Long, sliding sub hits.',
        body: 'Tap a key and the 808 rings out. Every press hits again, and holding one key while you press the next slides. A gate switch lets key up release it instead. Start from an 808 preset or shape your own.',
        points: [
          ['Glide and bend', 'Set slide time and bend range.'],
          ['808 presets', 'Slide, Classic, Short Punch, Distorted, Trap Sub, Dark Long, Boom Bap, Long Glide, Gated, Hard Hit and Deep Rumble.'],
        ],
        shot: {
          file: 'bass-slide-presets.png',
          width: 1633,
          height: 780,
          cssWidth: 408,
          alt: 'ISI Bass slide controls and eleven 808 presets',
        },
        flip: true,
      },
      {
        eyebrow: 'Bass synth',
        title: 'Round lows, plucks, Reese and drones.',
        body: 'Two oscillators, each with its own octave, plus a sub, a 24 dB filter with its own envelope, and drive. Enough to build a sound from nothing without a menu in sight.',
        chips: ['2 oscillators + sub', '24 dB filter', 'Filter envelope', 'Drive'],
        shot: {
          file: 'bass-synth.png',
          width: 2600,
          height: 437,
          cssWidth: 1160,
          alt: 'ISI Bass synth page with oscillators, filter and voice controls',
        },
        wide: true,
      },
      {
        eyebrow: 'Voicing and tone',
        title: 'Dial in the tone, then push it.',
        body: 'Pick Classic, Round, Sub or Reese, then set Bass, Mid and Treble with Soft, Normal and Hard key response. Drive, Compress and Saturate in Clean, Warm, Punch or Grit make it sit without another plugin on the track.',
        points: [
          ['Four voicings', 'Classic, Round, Sub and Reese.'],
          ['Key response', 'Soft, Normal or Hard, depending on how the keys should feel.'],
          ['Drive, Compress, Saturate', 'Three stages of weight and glue, in four characters.'],
        ],
        shot: {
          file: 'bass-voicing-tone.png',
          width: 2600,
          height: 798,
          cssWidth: 652,
          alt: 'ISI Bass instrument voicings with tone and character controls',
        },
        flip: true,
      },
      {
        eyebrow: 'Amp and cabinet',
        title: 'Straight into an amp and a cab.',
        body: 'Classic, Bright and Fuzz amps into Vintage 1x15, Modern 4x10 or Tight 1x12 cabinets, blended with a wet and dry mix. Watch the Isiata LED meter move while you play.',
        chips: ['Classic / Bright / Fuzz', 'Vintage 1x15', 'Modern 4x10', 'Tight 1x12', 'LED meter'],
        shot: {
          file: 'bass-amp-cab.png',
          width: 2007,
          height: 801,
          cssWidth: 502,
          alt: 'ISI Bass amp and cabinet selection with output level, pan and LED meter',
        },
      },
      {
        eyebrow: 'Real key noise',
        title: 'The little sounds that sell it.',
        body: 'Mechanical key click, key off tick, pedal thud and damper release noise, each with its own level and an on and off switch. Add humanize for timing and velocity so a pattern breathes.',
        points: [
          ['Noise', 'Mechanical, Key Off and Pedal, each with its own level.'],
          ['Humanize', 'Loosen timing and velocity.'],
        ],
        shot: {
          file: 'bass-humanize-noise.png',
          width: 2402,
          height: 780,
          cssWidth: 600,
          alt: 'ISI Bass humanize and noise controls',
        },
        split: true,
      },
      {
        eyebrow: 'Velocity',
        title: 'Your touch, drawn as a curve.',
        body: 'Drag the curve to make soft playing louder, hard playing wilder, or anything in between. See exactly how your velocity turns into level.',
        shot: {
          file: 'bass-velocity.png',
          width: 2215,
          height: 780,
          cssWidth: 554,
          alt: 'ISI Bass draggable velocity curve and release control',
        },
      },
      {
        eyebrow: 'Performance',
        title: 'Mono, poly, glide and envelope.',
        body: 'Switch between mono and poly, set glide, pitch bend range and velocity sensitivity, and shape attack, decay, sustain and release with a live envelope display.',
        chips: ['Mono / Poly', 'Glide', 'Bend range', 'Vel sense', 'ADSR'],
        shot: {
          file: 'bass-performance.png',
          width: 2600,
          height: 437,
          cssWidth: 1160,
          alt: 'ISI Bass performance page with voice and envelope controls',
        },
        wide: true,
      },
      {
        eyebrow: 'Modulation and sidechain',
        title: 'Movement, and room for the kick.',
        body: 'Route four sources to four destinations, run the LFO with a macro, and duck the bass from your kick with a built in sidechain. No extra compressor required.',
        points: [
          ['LFO and macro', 'Rate, amount, and a macro that moves several things at once.'],
          ['Sidechain ducking', 'Amount, attack and release, driven by your kick.'],
          ['Your own samples', 'Load audio from your content folder for the sample engine.'],
        ],
        shot: {
          file: 'bass-mod.png',
          width: 2600,
          height: 437,
          cssWidth: 1160,
          alt: 'ISI Bass modulation, sidechain, source and sample controls',
        },
        wide: true,
      },
    ],
    extras: [
      { title: 'Presets', body: 'Over 30 factory sounds across key bass, R&B, gospel, funk, hip-hop, synth, drone and 808.' },
      { title: 'A/B compare', body: 'Hold two versions of a sound and flip between them while you decide.' },
      { title: 'Undo and redo', body: 'Step back from a knob you pushed too far, without losing the idea.' },
      { title: 'Hold', body: 'Latch a note while you shape the sound with both hands.' },
    ],
    closing: ['The whole low end.', 'One instrument.'],
  },

  'isynth-7': {
    slug: 'isynth-7',
    hero: ['Six operators of real FM.', 'Finished sounds in seconds.', 'Six macros to make them yours.'],
    heroShot: {
      file: 'isynth-hero.png',
      width: 2304,
      height: 1536,
      cssWidth: 1536,
      alt: 'Isynth 7 main page with preset browser, macros, algorithm, envelope, operator levels and filter',
    },
    videoUrl: '',
    videoTitle: 'Hear it play.',
    videoCaption: 'Electric pianos, bells, basses and glassy leads, from real FM.',
    videoBlurb: 'Pick a preset, turn a macro, then open FM Edit. One take through the instrument.',
    problem: {
      title: 'FM with the depth. Without the homework.',
      body: 'Real six operator FM has always been able to make electric pianos, bells and glass. It has also always made you learn the matrix first. Most people never get past the presets.',
      emphasis: 'Isynth 7 starts at a finished sound and six macros, then opens all the way down to operator ratios, envelopes and the algorithm when you want to build.',
      shot: {
        file: 'isynth-depth.png',
        width: 1425,
        height: 1920,
        cssWidth: 475,
        alt: 'Isynth 7 algorithm diagram, feedback and operator envelope in FM Edit',
      },
    },
    features: [
      {
        eyebrow: 'Presets',
        title: 'Find the sound in seconds.',
        body: 'Factory, User and Favorites, with searchable folders for keys, electric pianos, basses, leads, pads, plucks, strings and brass. Step through with the arrows, or search by name.',
        chips: ['Factory', 'User', 'Favorites', 'Search'],
        shot: {
          file: 'isynth-presets.png',
          width: 1065,
          height: 1185,
          cssWidth: 355,
          alt: 'Isynth 7 preset browser with Factory, User and Favorites tabs and folders',
        },
      },
      {
        eyebrow: 'Six macros',
        title: 'Reshape the whole sound with six knobs.',
        body: 'Brightness, Body, Attack, Release, Motion and Space move the sound without touching the FM matrix. The algorithm on screen shows how the operators are wired.',
        points: [
          ['Brightness and Body', 'Open up the tone, or fatten it.'],
          ['Attack and Release', 'Set how the sound starts and how it lets go.'],
          ['Motion and Space', 'Add movement and depth in one move.'],
        ],
        shot: {
          file: 'isynth-macros.png',
          width: 2600,
          height: 950,
          cssWidth: 1095,
          alt: 'Isynth 7 current preset display, algorithm and six macro knobs',
        },
        wide: true,
      },
      {
        eyebrow: 'FM Edit',
        title: 'Build it operator by operator.',
        body: 'Six operators, each with ratio, fixed frequency, detune, level, velocity, amp mod and key scale. Switch any operator on or off, and choose carrier or modulator roles through the algorithm.',
        points: [
          ['Ratio or fixed Hz', 'Tune operators musically, or lock them to a frequency.'],
          ['Velocity and key scale', 'Let touch and register change the timbre.'],
          ['Amp mod', 'Add tremolo-style movement per operator.'],
        ],
        shot: {
          file: 'isynth-operators.png',
          width: 2600,
          height: 1711,
          cssWidth: 977,
          alt: 'Isynth 7 FM Edit page showing six operators with ratio, detune, level and velocity controls',
        },
        wide: true,
      },
      {
        eyebrow: 'Algorithms',
        title: 'See how the sound is wired.',
        body: 'Choose from classic FM algorithms with the operator layout drawn on screen, then dial in feedback. Each operator has its own envelope you shape by dragging its points.',
        chips: ['Classic algorithms', 'Feedback', 'Operator envelopes', 'Draggable curves'],
        shot: {
          file: 'isynth-algorithm.png',
          width: 1425,
          height: 900,
          cssWidth: 475,
          alt: 'Isynth 7 algorithm diagram and feedback knob',
        },
        flip: true,
      },
      {
        eyebrow: 'Envelopes',
        title: 'Shape it. Draw it.',
        body: 'Amp, mod and pitch envelopes you shape by dragging points, with the six operator levels right beside them.',
        chips: ['Amp env', 'Mod env', 'Pitch env', 'Operator levels'],
        shot: {
          file: 'isynth-envelope.png',
          width: 1455,
          height: 690,
          cssWidth: 485,
          alt: 'Isynth 7 amp envelope editor and operator levels',
        },
        pair: {
                eyebrow: 'Filter and voicing',
                title: 'Tight keys or wide pads.',
                body: 'A multimode filter with LP24 and more, plus polyphony, unison, detune and stereo spread for anything from tight electric pianos to wide pads.',
                chips: ['Polyphony', 'Unison', 'Detune', 'Spread', 'LP24', 'Cutoff / Res'],
                shot: {
                  file: 'isynth-filter-voicing.png',
                  width: 1755,
                  height: 690,
                  cssWidth: 585,
                  alt: 'Isynth 7 voicing and filter controls',
                },
              },
      },
      {
        eyebrow: 'Mod',
        title: 'Movement from every direction.',
        body: 'An LFO with six shapes, controller routing for the mod wheel and aftertouch, a pitch envelope, and voice settings. Play the way you play, and let the sound respond.',
        points: [
          ['LFO', 'Sine, Tri, Saw Up, Saw Down, Square and S&H.'],
          ['Controllers', 'Wheel and aftertouch to pitch, amp and brightness.'],
          ['Pitch envelope', 'Shape how every note starts.'],
        ],
        shot: {
          file: 'isynth-lfo.png',
          width: 2600,
          height: 536,
          cssWidth: 1470,
          alt: 'Isynth 7 LFO and controller routing',
        },
        wide: true,
      },
      {
        eyebrow: 'Effects',
        title: 'Finish the sound without leaving.',
        body: 'Saturation, distortion, EQ, compressor, chorus, delay, reverb and stereo width, in a fixed signal flow. Switch each one on when it helps, leave it off when it does not.',
        shot: {
          file: 'isynth-fx.png',
          width: 2600,
          height: 1131,
          cssWidth: 1465,
          alt: 'Isynth 7 effects page with saturation, distortion, EQ, compressor, chorus, delay, reverb and stereo width',
        },
        wide: true,
      },
    ],
    extras: [
      { title: 'Four pages', body: 'Main, FM Edit, Mod and FX. Everything lives one click away.' },
      { title: 'Playable keyboard', body: 'On screen keys with pitch and mod wheels, so you can audition without a controller.' },
      { title: 'Favorites', body: 'Heart the sounds you reach for and find them again in a click.' },
      { title: 'Save your own', body: 'Store your sounds in the User folder and recall them in any project.' },
    ],
    closing: ['Build it operator by operator.', 'Or just play it.'],
  },
  'isi-vox': {
    slug: 'isi-vox',
    hero: ['Sing it. Play it. Harmonize it.', 'Ten voices from one vocal.', 'Your own choir, played from the keys.'],
    heroShot: {
      file: 'vox-hero.png',
      width: 2016,
      height: 1343,
      cssWidth: 1344,
      alt: 'ISI Vox main interface with input, vocal pitch, output, ten voice pads, harmony controls and keyboard',
    },
    videoUrl: '',
    videoTitle: 'Hear the choir.',
    videoCaption: 'One vocal in. Up to ten harmony voices out, played from the keys.',
    videoBlurb: 'Sing a line, hold a chord, and hear the choir follow. One take through the whole instrument.',
    problem: {
      title: 'A choir without the stack of takes.',
      body: 'Layering harmonies means recording the same line again and again, then tuning and timing every take. A basic harmonizer gives you one or two fixed intervals and little say in how they sound.',
      emphasis: 'ISI Vox turns your voice into the source and your keys into the arranger, so ten voices follow what you play while keeping the life of your real performance.',
    },
    features: [
      {
        eyebrow: 'Listen',
        title: 'See the note you are singing.',
        body: 'The input meter, vocal pitch display and output controls show your voice going in, the note it is tracked to, and the balance of voice and choir coming out.',
        points: [
          ['Input', 'Set how hot your voice hits the plugin.'],
          ['Vocal pitch', 'See the tracked note, frequency and cents.'],
          ['Dry, Harmony, Output', 'Balance your voice against the choir.'],
        ],
        shot: {
          file: 'vox-top.png',
          width: 1980,
          height: 290,
          cssWidth: 1470,
          alt: 'ISI Vox input meter, vocal pitch display and dry, harmony and output controls',
        },
        wide: true,
      },
      {
        eyebrow: 'Ten voices',
        title: 'Shape every voice on its own.',
        body: 'Ten pads, one per harmony voice. Pick a pad and set its volume, pan, detune and formant, then mute or solo it. The pad shows the note it is singing as you play.',
        points: [
          ['Volume and pan', 'Place each voice in the mix.'],
          ['Detune and formant', 'Make a voice thicker, younger or deeper.'],
          ['Mute and solo', 'Audition any voice alone.'],
        ],
        shot: {
          file: 'vox-orchestra.png',
          width: 1980,
          height: 345,
          cssWidth: 1470,
          alt: 'ISI Vox ten voice pads and the selected voice editor with volume, pan, detune and formant',
        },
        wide: true,
      },
      {
        eyebrow: 'Harmony',
        title: 'Play the harmonies from your keys.',
        body: 'Choose how held keys become harmony. MIDI sings each key as itself, Chord snaps voices to the chord you hold, and Smart stays in your key and avoids clashes. Glide, humanize and the spread controls decide how natural or wide it sounds.',
        chips: ['MIDI', 'Chord', 'Smart', 'Key and scale', 'Glide', 'Humanize', 'Spread'],
        shot: {
          file: 'vox-harmony.png',
          width: 1980,
          height: 482,
          cssWidth: 1470,
          alt: 'ISI Vox harmony mode, key and scale, voices, glide, humanize and spread controls above the keyboard',
        },
        wide: true,
      },
      {
        eyebrow: 'Output',
        title: 'Keep your voice, add the choir.',
        body: 'Dry sets your own voice, Harmony sets the choir, and Output sets the master level, each with its own value. The mirrored LED meter shows what leaves the plugin.',
        shot: {
          file: 'vox-output.png',
          width: 717,
          height: 288,
          cssWidth: 530,
          alt: 'ISI Vox dry, harmony and output knobs with the mirrored LED meter',
        },
      },
    ],
    extras: [
      { title: 'Live and DAW modes', body: 'Zero reported latency for performing, or aligned dry and harmonies for mixing.' },
      { title: 'Two pitch engines', body: 'ISI PSOLA for low latency and natural formants, plus an experimental engine.' },
      { title: 'Sixteen presets', body: 'Factory sounds plus your own, with favourites and one-click init.' },
      { title: 'Hover help', body: 'Hover over any control to see what it does.' },
    ],
    closing: ['Sing a line.', 'Hold a chord.'],
  },
}
