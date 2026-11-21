/**
 * Before/after examples for the audio slider.
 * Both clips in a pair must be the same length and start at the same moment so the
 * slider can crossfade between them in sync. Make them with:
 *   node scripts/prepare-ab-clip.mjs --before <rough> --after <final> --out public/audio/mix-master/<id>
 * Set `after: null` while the final mix is still being made — the page shows it as in progress.
 */
export type ArtistSocial = { label: string; href: string; icon: string }

/** Measured live from the audio. Pick the ones that tell each song's story. */
export type TransformationStat = 'mud' | 'air' | 'presence' | 'punch' | 'width'

export type MixMasterExample = {
  id: string
  song: string
  artist: string
  /** Square photo in /public. Leave empty to show the artist's name as a monogram. */
  image?: string
  socials: ArtistSocial[]
  service: 'Mix + Master' | 'Master'
  before: string
  after: string | null
  beforeLabel: string
  afterLabel: string
  story: string
  work: string[]
  stats: TransformationStat[]
}

export const MIX_MASTER_EXAMPLES: MixMasterExample[] = [
  {
    id: 'lionel-richie',
    song: "I Ain't Lionel Richie",
    artist: 'JOZY.',
    image: '',
    socials: [{ label: 'Spotify', href: 'https://open.spotify.com/artist/7gwvQo5J74arTNKiGuZuVP', icon: 'mdi:spotify' }],
    service: 'Mix + Master',
    before: '/audio/mix-master/lionel-richie-before.mp3',
    after: '/audio/mix-master/lionel-richie-after.mp3',
    beforeLabel: 'Early bounce',
    afterLabel: 'Final mix & master',
    story: 'An acoustic record that was drowning in its own low end. We cleared the mud, pulled the voice forward and let the guitars breathe.',
    work: [
      'Cleared low-end build-up so the guitar and bass stop fighting',
      'Brought the vocal forward with presence, not volume',
      'Opened up the top end for air and detail',
      'Restored dynamics so every hit lands',
    ],
    stats: ['mud', 'presence', 'air', 'punch'],
  },
  {
    id: 'space-cadet',
    song: 'Space Cadet',
    artist: 'Jag Hulligan',
    image: '',
    socials: [],
    service: 'Mix + Master',
    before: '/audio/mix-master/space-cadet-before.mp3',
    after: null,
    beforeLabel: "Artist's own mix",
    afterLabel: 'Final mix & master',
    story: 'Sent over as stems with a rough mix. The final mix is on the board right now.',
    work: [
      'Full mix from the original stems',
      'Vocal placement and cleanup',
      'Width and space so the record feels bigger',
      'Master for streaming',
    ],
    stats: ['mud', 'presence', 'air', 'width'],
  },
]

export const MUSIC_COPY = {
  listen: {
    title: 'Hear the difference',
    body: 'Real songs from real artists. Press play and drag the divider: left is what they sent, right is what they got back. Both play in sync, so you hear exactly what changed. Headphones recommended.',
  },
  changes: [
    { icon: 'solar:tuning-2-linear', title: 'Balance', body: 'Every part gets its own space. Nothing fights the vocal, nothing gets lost.' },
    { icon: 'solar:soundwave-linear', title: 'Clarity', body: 'Mud comes out of the low mids. Detail and air come back into the top.' },
    { icon: 'solar:widget-linear', title: 'Width', body: 'The mix opens past the speakers instead of sitting in one flat line in the middle.' },
    { icon: 'solar:volume-loud-linear', title: 'Loudness', body: 'Competitive level for streaming, with the punch and dynamics still intact.' },
  ],
  process: [
    { title: 'Send it', body: 'Email your song or stems with one or two reference tracks you love.' },
    { title: 'Notes', body: 'We agree on the vibe, the goal and any problem spots before we start.' },
    { title: 'First pass', body: 'You get the first version within the timeline for your tier.' },
    { title: 'Revise & release', body: 'Two revision rounds per song, then final files ready to upload.' },
  ],
  faq: [
    {
      question: 'Which one do I need?',
      answer:
        'If the song is close and just needs finishing, Finish My Track. If you want one song taken all the way to release, Release-Ready. Want the brand, content and sample pack around it too? Signature Single. Multiple songs as one project, the EP or Album Build.',
    },
    {
      question: 'How should I send my files?',
      answer:
        'WAV files at the session sample rate, all starting at the same point, with no effects printed on unless they are part of the sound. A Google Drive or Dropbox link is perfect.',
    },
    {
      question: 'Can I send a two-track beat with vocals on top?',
      answer:
        'Yes. Send the beat as one file and the vocals as separate tracks. Separated beat stems give the best result, but a two-track beat works.',
    },
    {
      question: 'How do payments work?',
      answer:
        'Finish My Track and Release-Ready are paid up front. Signature Single and the EP split into a start and a delivery payment. Albums are paid 50 / 25 / 25. Deposits are non-refundable.',
    },
  ],
}
