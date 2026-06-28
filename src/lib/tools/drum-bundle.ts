export const DRUM_BUNDLE_PRICE = {
  display: '$49.97',
  amount: '49.97',
  original: '$150',
} as const

/** Ear trainer platinum reward — 25% off drum bundle */
export const DRUM_BUNDLE_REWARD_DISCOUNT = 0.25

export const DRUM_BUNDLE_REWARD_PRICE = {
  display: '$37.48',
  amount: '37.48',
} as const

export const DRUM_BUNDLE_SLUG = 'tsukuyomi-drum-bundle'
export const DRUM_BUNDLE_HREF = '/tools/sample-packs/tsukuyomi-drum-bundle'
export const DRUM_BUNDLE_CHECKOUT_HREF = '/tools/checkout/order'

export const DRUM_BUNDLE = {
  title: 'Tsukuyomi Drum Bundle',
  subtitle: 'Premium Archive',
  image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67b7ebca7c922f63503b66c7.png',
  description:
    'A premium drum sample pack focused on high-quality, impactful drum sounds — designed for use in major DAWs (FL Studio, Ableton, Logic Pro, etc.).',
  format: 'High-quality 32-bit WAV files',
  sounds: [
    { name: 'Kicks', count: 20 },
    { name: '808s', count: 16 },
    { name: 'Snares', count: 16 },
    { name: 'Snaps', count: 16 },
    { name: 'Rims', count: 16 },
    { name: 'Claps', count: 16 },
    { name: 'Percs', count: 27 },
    { name: 'Chimes', count: 10 },
    { name: 'Tambourines', count: 8 },
    { name: 'Risers', count: 11 },
    { name: 'Shakers', count: 10 },
    { name: 'Open Hats', count: 16 },
    { name: 'Closed Hats', count: 16 },
    { name: 'Hand Claps', count: 10 },
    { name: 'Gongs', count: 9 },
    { name: 'Reverse Cymbals', count: 8 },
    { name: 'Cymbals', count: 19 },
    { name: 'Tape Drum Fills', count: 18 },
    { name: 'Stomps & Impacts', count: 16 },
  ],
  bonusKits: [
    {
      name: 'Thrashed',
      desc: 'Raw, gritty drum textures',
      image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e5f4312d640e48f679.png',
    },
    {
      name: 'Reel',
      desc: 'Vintage analog-style electronic drums',
      image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e5e519edfcf731e4bd.png',
    },
    {
      name: 'Pandiero',
      desc: 'Light, rhythmic percussion',
      image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e51870f4826b4ff353.png',
    },
    {
      name: 'Alt',
      desc: 'Darker, unconventional tones',
      image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e57cb4a87478b50ef9.png',
    },
    {
      name: 'Brush',
      desc: 'Soft, brushed drum sounds',
      image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67ec41e5903b502ee60a3a44.png',
    },
  ],
  style: [
    'Rich harmonic character',
    'Punch and clarity',
    'Low-end depth without muddiness',
    'Articulate highs with presence',
    'Tight dynamics',
    'Subtle vintage warmth',
  ],
  oneShots: [
    { name: 'Kick 6', category: 'Kicks', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d5734233ae11.mpeg' },
    { name: 'Kick 9', category: 'Kicks', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d7a11863bbd75ec70.mpeg' },
    { name: '808 2', category: '808s', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d7a1186331a75ec6f.mpeg' },
    { name: '808 6', category: '808s', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d1b97ac0e15ffe804.mpeg' },
    { name: 'Snare 12', category: 'Snares', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d5ff0133ae13.mpeg' },
    { name: 'Snare 16', category: 'Snares', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d543c233ae10.mpeg' },
    { name: 'Claps 1', category: 'Claps', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d1b97ac5398ffe803.mpeg' },
    { name: 'Claps 8', category: 'Claps', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d1b97acaf05ffe802.mpeg' },
    { name: 'Gong 2', category: 'Gongs', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d7a1186524b75ec71.mpeg' },
    { name: 'Gong 6', category: 'Gongs', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d5725e33ae15.mpeg' },
    { name: 'Tape Drums 3', category: 'Tape Drum Fills', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d58f6f33ae12.mpeg' },
    { name: 'Tape Drums 10', category: 'Tape Drum Fills', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d5fe3d5106d51d9733ae14.mpeg' },
  ],
  instrumentals: [
    { name: 'Nivea', category: 'Instrumental', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67b8d06df4c684b395b0b7f3.mpeg' },
    { name: 'Drowning Angels', category: '808 Mafia Style', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d602ff5106d5a20a33b2de.mpeg' },
    { name: 'Samba X RnB', category: 'Fusion', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d602ee5106d5417b33b2d4.mpeg' },
    { name: 'Latin X Hip Hop', category: 'Fusion', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67d602fd5106d51e6033b2dd.mpeg' },
  ],
}

export type FeaturedProducerSong = { title: string; url: string }
export type FeaturedProducer = {
  name: string
  handle: string
  instagram: string
  image: string
  songs: FeaturedProducerSong[]
}

export const FEATURED_PRODUCERS: FeaturedProducer[] = [
  {
    name: 'J-Milly',
    handle: '@jmillyfr',
    instagram: 'https://www.instagram.com/jmillyfr?igsh=MWwxZHd5aDFocWo5cQ==',
    image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/69863cbc5f9399ca749611c3.jpeg',
    songs: [
      { title: 'mooongod 138 jmilly.m4a', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698641603fae0ad2e4385336.mp3' },
    ],
  },
  {
    name: 'Harrison Song',
    handle: '@realharrisonsong',
    instagram: 'https://www.instagram.com/realharrisonsong?igsh=YnpmejdpcDlxemxs',
    image: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/69866af70708e4c2cb2ca0b4.jpeg',
    songs: [
      { title: 'slide.m4a', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698662ebd017c36f65f4b210.mp3' },
      { title: 'generations v2.1 78bpm', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698662eb5f93997f509d0836.mp3' },
      { title: 'MONOSHPHERE 140 harrison adore.mp3', url: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/698662675f939962329ceefc.mp3' },
    ],
  },
]

export const DAW_ICONS = [
  { name: 'FL Studio', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59dd775cd617e4ec240.png' },
  { name: 'Ableton', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59c0e32026d6395a96f.png' },
  { name: 'Pro Tools', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59c0e320217c795a96e.png' },
  { name: 'Logic Pro', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59c0e32023a8f95a970.png' },
  { name: 'Cubase', icon: 'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67f2e59cd775cd7f0d4ec23f.png' },
]

export const SAMPLE_PACKS = [
  {
    slug: DRUM_BUNDLE_SLUG,
    href: DRUM_BUNDLE_HREF,
    title: DRUM_BUNDLE.title,
    description: '100+ premium drum sounds for modern production',
    image: DRUM_BUNDLE.image,
    price: DRUM_BUNDLE_PRICE.display,
    icon: 'solar:soundwave-linear',
  },
]
