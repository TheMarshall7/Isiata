/**
 * Campaign definition for the ISIATA interactive album experience.
 *
 * Everything here is DATA so a future release can ship its own campaign file.
 * DRAFT: story, titles, copy, artifacts and puzzles are working proposals that
 * need creative approval (see Master Brief, section 21.1). Nothing here is canon.
 */

export type PuzzleKind =
  | 'oddglyphs'
  | 'testimony'
  | 'sequence'
  | 'morse'
  | 'missing'
  | 'anamorph'
  | 'order'
  | 'phrase'

export type GlyphName =
  | 'eye'
  | 'mirror'
  | 'echo'
  | 'signal'
  | 'void'
  | 'prism'
  | 'thread'
  | 'threshold'

export interface ChapterDef {
  n: number
  title: string
  theme: string
  glyph: GlyphName
  /** Caption lines for the transmission, spoken in sequence. */
  transmission: string[]
  /** Hotspots explored in the Discovery step. */
  discovery: { intro: string; notes: { label: string; text: string }[] }
  challenge: { kind: PuzzleKind; prompt: string; hints: [string, string, string] }
  /** Fact is real-world; lore is campaign fiction. Kept separate on purpose. */
  revelation: { how: string; fact: string; lore: string }
  continuation: string
  /** Surprise event shown once in the hub some time after solving (brief 7.2). */
  whisper: string
  /** The music layer this artifact adds to the composition (brief 8). */
  layer: string
  /** Optional harder layer for highly engaged members (brief 16). Answer is server-side. */
  deeper: { prompt: string; placeholder: string }
  artifact: { name: string; word: string; description: string }
  /** Public puzzle data only. Answers live server-side. */
  puzzle: Record<string, unknown>
}

export const CAMPAIGN = {
  slug: 'feel-no-evil',
  name: 'Feel No Evil',
  /** Working subtitle, not locked. */
  subtitle: 'The Eight Revelations',
  hubName: 'The Threshold',
  collectionName: 'The Grimoire',
  premiere: {
    runtime: '30–40 minutes',
    /** ISO date when set, e.g. NEXT_PUBLIC_PREMIERE_AT=2026-12-20T20:00:00-05:00 */
    at: process.env.NEXT_PUBLIC_PREMIERE_AT || '',
  },
  /** ISO date of Chapter 1. Unset = preview build with every chapter open. */
  startAt: process.env.NEXT_PUBLIC_CAMPAIGN_START || '',
  finalPhrase: ['WHAT', 'YOU', 'REFUSE', 'TO', 'FEEL', 'STILL', 'FEELS', 'YOU'],
} as const

export const WEEK_MS = 7 * 24 * 60 * 60 * 1000

/** Each chapter premieres live at its release time; the window stays open this long (brief 5.2). DRAFT. */
export const LIVE_WINDOW_MS = 60 * 60 * 1000

export function chapterReleaseAt(n: number): Date | null {
  if (!CAMPAIGN.startAt) return null
  const start = new Date(CAMPAIGN.startAt).getTime()
  if (Number.isNaN(start)) return null
  return new Date(start + (n - 1) * WEEK_MS)
}

export function isChapterReleased(n: number, preview: boolean): boolean {
  if (preview) return true
  const at = chapterReleaseAt(n)
  return at ? at.getTime() <= Date.now() : true
}

const EYE_GRID = Array.from({ length: 16 }, (_, i) => i)

export const CHAPTERS: ChapterDef[] = [
  {
    n: 1,
    title: 'The Eyes That Open',
    theme: 'Perception',
    glyph: 'eye',
    transmission: [
      'I was taught what to fear before I was taught what it was.',
      'The first thing a child learns is where to look.',
      'The second is where not to.',
      'Sixteen eyes are watching this room. Thirteen of them agree.',
      'Find the ones that do not.',
    ],
    discovery: {
      intro: 'The room is quiet. Something is looking at you. Look back.',
      notes: [
        { label: 'The wall of eyes', text: 'Sixteen eyes, set in a grid. Each one follows the center of the room.' },
        { label: 'The pupils', text: 'Most are fixed on the middle. A few are fixed on something else.' },
        { label: 'The silence', text: 'Whatever pulled them away is not in the room. It is somewhere you have not been told to look.' },
      ],
    },
    challenge: {
      kind: 'oddglyphs',
      prompt: 'Select the three eyes that are not looking at the center.',
      hints: [
        'Ignore the shape of the eye. Watch only the dark center.',
        'Most pupils sit in the middle of the eye. Look for the ones pushed to a side.',
        'They are not all in the same row.',
      ],
    },
    revelation: {
      how: 'Three pupils were offset. You found them by noticing where attention was pointed rather than what the eye looked like.',
      fact: 'Humans read gaze direction almost automatically. People turn to look where another person is looking, often before they decide to.',
      lore: 'Isiata first noticed the eyes that looked away. They were the only ones that knew something was there.',
    },
    continuation: 'Something in the wall has begun to listen back.',
    whisper: 'One of the eyes in the first room has started to blink.',
    layer: 'Drone',
    deeper: { prompt: 'Of the sixteen eyes, how many agreed?', placeholder: 'A number' },
    artifact: {
      name: 'The First Eye',
      word: 'WHAT',
      description: 'An eye that opened because someone refused to look where they were told.',
    },
    puzzle: { cells: EYE_GRID, odd: 'server' },
  },
  {
    n: 2,
    title: 'Three Accounts',
    theme: 'Truth',
    glyph: 'mirror',
    transmission: [
      'Three people stood in the same room.',
      'They will tell you three different nights.',
      'Truth is rarely a single story. It is the place the stories cannot all be true.',
      'One of them cannot be right.',
    ],
    discovery: {
      intro: 'Three testimonies were recorded. They are not asked to agree.',
      notes: [
        { label: 'What is certain', text: 'The lights went out. The music began. Everyone agrees both things happened.' },
        { label: 'What is not', text: 'They do not agree on the order. Only one detail separates the accounts.' },
        { label: 'The method', text: 'Compare each account against the other two. Whoever contradicts both is the one that does not fit.' },
      ],
    },
    challenge: {
      kind: 'testimony',
      prompt: 'Whose account contradicts the other two?',
      hints: [
        'Write down the order of events each person gives.',
        'Two accounts place the music before the lights went out.',
        'One account reverses that order.',
      ],
    },
    revelation: {
      how: 'Accounts A and C both put the music first. Only B put the dark first, so B contradicts both others.',
      fact: 'Eyewitness memory is reconstructive. Honest witnesses to the same event regularly disagree on sequence and detail.',
      lore: 'The mirror did not lie. It showed each of them what they needed to have seen.',
    },
    continuation: 'The room remembers differently than the people in it.',
    whisper: 'The mirror is showing a fourth account. It is yours.',
    layer: 'Pulse',
    deeper: { prompt: 'What shows a different face to everyone who looks into it, and never lies about what it shows?', placeholder: 'One word' },
    artifact: {
      name: 'The Mirror of Accounts',
      word: 'YOU',
      description: 'A mirror that shows the story you can defend, not the one that happened.',
    },
    puzzle: {
      accounts: [
        { id: 'A', who: 'The one by the door', text: 'The music began at nine. The lights went out a minute later. I remember because I could still see the speakers shaking.' },
        { id: 'B', who: 'The one at the back', text: 'The lights went out at nine, and only then did the music begin. I stood in the dark and waited for it.' },
        { id: 'C', who: 'The one in the middle', text: 'I only know the lights were still on when the music started. After that I stopped counting.' },
      ],
    },
  },
  {
    n: 3,
    title: 'The Echo Room',
    theme: 'Memory',
    glyph: 'echo',
    transmission: [
      'Memory is not a recording. It is a performance.',
      'Every time you replay it, you are the one performing.',
      'Four voices will speak. Remember the order they spoke in.',
      'Then say it back.',
    ],
    discovery: {
      intro: 'Four pads rest on the floor. Each has a tone. Each has a mark.',
      notes: [
        { label: 'The pads', text: 'Eye, circle, diamond, line. Each lights when it speaks.' },
        { label: 'The order', text: 'They will speak five times. The same pad can speak more than once.' },
        { label: 'The trap', text: 'You will want to remember the shapes. Remember the movement instead.' },
      ],
    },
    challenge: {
      kind: 'sequence',
      prompt: 'Watch the sequence, then repeat it.',
      hints: [
        'Press Watch as many times as you need. There is no penalty.',
        'Say the pattern to yourself as positions: left, right, top, bottom.',
        'The first and last pads are the same.',
      ],
    },
    revelation: {
      how: 'The sequence was five steps long. The pad that opened it also closed it, which made the pattern a loop.',
      fact: 'Memory is rebuilt each time it is recalled, which is why vivid memories can still be wrong, and why chunking a sequence helps hold it.',
      lore: 'The Echo Room keeps everything you tell it, and returns it slightly changed.',
    },
    continuation: 'Somewhere in the room, a sound has started that no one played.',
    whisper: 'The Echo rang once tonight. Nobody touched it.',
    layer: 'Bells',
    deeper: { prompt: 'Name the shape that opened and closed the sequence.', placeholder: 'A shape' },
    artifact: {
      name: 'The Echo',
      word: 'REFUSE',
      description: 'A small bell that rings the memory back to you, never exactly as it was.',
    },
    puzzle: { pads: ['eye', 'circle', 'diamond', 'line'], sequence: [2, 0, 3, 1, 2] },
  },
  {
    n: 4,
    title: 'The Signal',
    theme: 'Sound',
    glyph: 'signal',
    transmission: [
      'Before words there was rhythm.',
      'Before rhythm there was a pulse.',
      'Something is sending a pulse through the floor.',
      'Short and long. Short and long.',
      'It is spelling something.',
    ],
    discovery: {
      intro: 'A signal runs through the room. Headphones help. You do not need them.',
      notes: [
        { label: 'The pulse', text: 'Two lengths: a short tone and a long tone, separated by silence.' },
        { label: 'The alphabet', text: 'An old code maps patterns of short and long to letters.' },
        { label: 'The access', text: 'If you cannot hear it, the same signal is available as a pattern you can read.' },
      ],
    },
    challenge: {
      kind: 'morse',
      prompt: 'Decode the four-letter word sent through the signal.',
      hints: [
        'Dot is short. Dash is long. A longer pause separates letters.',
        'Four letters. The first is three dashes.',
        'It is what the Threshold is, when it is not closed.',
      ],
    },
    revelation: {
      how: 'The signal spelled OPEN in Morse: dash dash dash, dot dash dash dot, dot, dash dot.',
      fact: 'Morse code encodes letters as patterns of short and long signals. Operators learn it by sound and rhythm, not by memorizing dots and dashes on paper.',
      lore: 'The signal is not from a person. It is how the Threshold has always asked to be heard.',
    },
    continuation: 'Now the room knows you can hear it.',
    whisper: 'The signal changed. It is sending something new.',
    layer: 'Signal',
    deeper: { prompt: 'A reply came back through the floor:  •••  •  •  —•—   Decode it.', placeholder: 'Four letters' },
    artifact: {
      name: 'The Signal',
      word: 'TO',
      description: 'A pulse made physical. It does not carry words. It carries the willingness to receive them.',
    },
    puzzle: { unit: 140, length: 4 },
  },
  {
    n: 5,
    title: 'The Absence',
    theme: 'Ignorance',
    glyph: 'void',
    transmission: [
      'We notice what is there.',
      'We almost never notice what is not.',
      'There is a gap in this room that has always been here.',
      'It has been shaping everything you saw.',
    ],
    discovery: {
      intro: 'Sixteen symbols, in a grid, with one missing. The grid keeps its own rules.',
      notes: [
        { label: 'The rule', text: 'No symbol repeats in a row.' },
        { label: 'The other rule', text: 'No symbol repeats in a column.' },
        { label: 'The gap', text: 'The missing cell is not random. It is the only symbol the rest of the grid still needs.' },
      ],
    },
    challenge: {
      kind: 'missing',
      prompt: 'Which symbol belongs in the empty cell?',
      hints: [
        'Four symbols. Every row has all four. So does every column.',
        'Look at the row containing the gap. Which symbol is missing from it?',
        'Check the column too. The same symbol is missing there.',
      ],
    },
    revelation: {
      how: 'The row and column of the gap were each missing the circle. Only one symbol could fit both.',
      fact: 'People tend to notice present features more easily than absent ones. Missing information is harder to detect than misleading information.',
      lore: 'The Absence is not empty. It is where the room keeps what you were taught not to ask about.',
    },
    continuation: 'What the gap was hiding has just noticed you noticing.',
    whisper: 'The gap in the grid is wider than it was.',
    layer: 'Rhythm',
    deeper: { prompt: 'Look again at the grid. Which symbol sits directly below the gap?', placeholder: 'A symbol' },
    artifact: {
      name: 'The Absence',
      word: 'FEEL',
      description: 'A hollow with edges. Whatever fits it is something you have not yet named.',
    },
    puzzle: {
      symbols: ['circle', 'triangle', 'diamond', 'cross'],
      grid: [
        ['circle', 'triangle', 'diamond', 'cross'],
        ['diamond', 'cross', null, 'triangle'],
        ['triangle', 'circle', 'cross', 'diamond'],
        ['cross', 'diamond', 'triangle', 'circle'],
      ],
      hidden: [1, 2],
    },
  },
  {
    n: 6,
    title: 'The Angle',
    theme: 'Perspective',
    glyph: 'prism',
    // Acrostic: the first letters spell the deeper answer.
    transmission: [
      'Stand in the wrong place and the world is noise.',
      'Take one step, and the noise becomes a word.',
      'And nothing in the room has changed.',
      'Nothing, except where you are standing.',
      'Decide where you stand.',
    ],
    discovery: {
      intro: 'A cloud of points floats in the room. It means nothing from where you are standing.',
      notes: [
        { label: 'The cloud', text: 'Hundreds of points, each at a different depth.' },
        { label: 'The slider', text: 'Moving your viewpoint shifts near points more than far ones.' },
        { label: 'The moment', text: 'At exactly one angle the points line up. Everywhere else they are only dust.' },
      ],
    },
    challenge: {
      kind: 'anamorph',
      prompt: 'Find the angle where the points resolve. Type the word.',
      hints: [
        'Move the slider slowly. Stop when the dust gets sharper, not just different.',
        'The word is three letters.',
        'It is the thing you have been doing all along.',
      ],
    },
    revelation: {
      how: 'Points at different depths shift by different amounts as the viewpoint moves. They line up into a word only at a single position.',
      fact: 'This is anamorphosis: an image that looks distorted until it is viewed from one particular position. Artists have used it since at least the Renaissance.',
      lore: 'The Angle is where the Magician stands. He does not change the room. He changes where you stand in it.',
    },
    continuation: 'Now that you can stand in the right place, what else has been standing in the wrong one?',
    whisper: 'The points are drifting toward a new word.',
    layer: 'Choir',
    deeper: { prompt: 'The transmission hid a word in plain sight. Read it again, from the edge.', placeholder: 'One word' },
    artifact: {
      name: 'The Angle',
      word: 'STILL',
      description: 'A prism with no light inside it. It only works if you are in the right place to look.',
    },
    puzzle: { word: 'server' },
  },
  {
    n: 7,
    title: 'The Thread',
    theme: 'Awareness',
    glyph: 'thread',
    transmission: [
      'Six objects. Six words. One sentence.',
      'The room has been speaking all along.',
      'You were never given the order.',
      'You were given the pieces, and the ability to feel what belongs next to what.',
    ],
    discovery: {
      intro: 'The artifacts you carry have begun to hum. Each one holds a word.',
      notes: [
        { label: 'The pieces', text: 'Every artifact you have solved holds a single word.' },
        { label: 'The order', text: 'They were not given in the order they belong in.' },
        { label: 'The missing', text: 'If a word is blank, the chapter that holds it is still waiting. You can return to it at any time.' },
      ],
    },
    challenge: {
      kind: 'order',
      prompt: 'Arrange the words you hold into the sentence they form.',
      hints: [
        'Read the words aloud. Which one sounds like a beginning?',
        'The sentence is about what happens to something you refuse.',
        'It begins with a question word.',
      ],
    },
    revelation: {
      how: 'The six words, placed in order, form the first six words of a longer sentence.',
      fact: 'The mind completes patterns even when pieces are missing. Gestalt psychology studies this tendency to see wholes instead of parts.',
      lore: 'The Thread is not a path. It is the shape the path was always going to make.',
    },
    continuation: 'There is one more word. And it is not in any room you have been in.',
    whisper: 'The thread is pulling toward the door.',
    layer: 'Bass',
    deeper: { prompt: 'Count every letter in the six words you placed.', placeholder: 'A number' },
    artifact: {
      name: 'The Thread',
      word: 'FEELS',
      description: 'A line that is not drawn until someone follows it.',
    },
    puzzle: { words: ['WHAT', 'YOU', 'REFUSE', 'TO', 'FEEL', 'STILL'] },
  },
  {
    n: 8,
    title: 'The Threshold',
    theme: 'Revelation',
    glyph: 'threshold',
    transmission: [
      'Eight rooms. Eight objects. One door.',
      'It was never locked.',
      'What you are afraid of is not behind it.',
      'What you are afraid of is the part of you that has not walked through.',
      'Say the last word.',
    ],
    discovery: {
      intro: 'The door stands open. The sentence is almost whole.',
      notes: [
        { label: 'The sentence', text: 'Seven words are held. The last one is already in your voice.' },
        { label: 'The door', text: 'It is made of every room you passed through.' },
        { label: 'The question', text: 'Who is the sentence about?' },
      ],
    },
    challenge: {
      kind: 'phrase',
      prompt: 'Complete the sentence.',
      hints: [
        'The sentence turns back toward the one reading it.',
        'The word appears earlier in the same sentence.',
        'It is two words you already used.',
      ],
    },
    revelation: {
      how: 'The final word closes the sentence on the reader. It is the same word that began it.',
      fact: 'Avoidance often strengthens fear. Approaching what frightens us in small, voluntary steps is the basis of exposure-based therapies.',
      lore: 'Feel no evil is not an instruction to feel nothing. It is the choice to find out what was never evil in the first place.',
    },
    continuation: 'The door is open. The album is on the other side.',
    whisper: 'The door did not close behind you.',
    layer: 'Melody',
    deeper: { prompt: "Which two words of the album's title does the sentence never say?", placeholder: 'Two words' },
    artifact: {
      name: 'The Threshold Key',
      word: 'YOU',
      description: 'The last piece. It is not a key. It is the proof that the door was never locked.',
    },
    puzzle: { prefix: ['WHAT', 'YOU', 'REFUSE', 'TO', 'FEEL', 'STILL', 'FEELS'] },
  },
]

/** The chapter currently inside its live window, if any. */
export function liveChapterNow(): number | null {
  const now = Date.now()
  for (let n = 1; n <= CHAPTERS.length; n++) {
    const at = chapterReleaseAt(n)?.getTime()
    if (at && now >= at && now < at + LIVE_WINDOW_MS) return n
  }
  return null
}

/** Next scheduled transmission after now, if the campaign has a start date. */
export function nextTransmission(): { n: number; at: Date } | null {
  for (let n = 1; n <= CHAPTERS.length; n++) {
    const at = chapterReleaseAt(n)
    if (at && at.getTime() > Date.now()) return { n, at }
  }
  return null
}

/**
 * Hidden secrets (brief 7.2): unannounced, optional, never required. Found by
 * paying attention to the world itself. Finding all five opens the hidden room.
 */
export const SECRETS = [
  { id: 'eye', clue: 'Something above the door is watching. Let it know you see it.', found: 'The eye blinked back.' },
  { id: 'seal', clue: 'Not every mark on your card is meant to be scanned.', found: 'Some marks are meant to be touched.' },
  { id: 'live', clue: 'Evil reads differently in a mirror.', found: 'Evil, reversed, is live.' },
  { id: 'silence', clue: 'Stand in the Threshold and do nothing at all.', found: 'You stopped looking for it. That is when it appeared.' },
  { id: 'absence', clue: 'There is a fourth note in the room where things go missing.', found: 'The gap had something to say.' },
] as const

export const HIDDEN_ROOM = {
  title: 'The Room Not on the Map',
  layer: 'The Unseen',
  transmission: [
    'You found the room that was never on the map.',
    'Every secret was a door someone told you not to open.',
    'None of them were evil.',
    'Some of them were only waiting for someone to stop being afraid.',
    'This room is yours. It will still be here when the album is.',
  ],
}

export function getChapter(n: number): ChapterDef | undefined {
  return CHAPTERS.find((c) => c.n === n)
}

export const TOTAL_CHAPTERS = CHAPTERS.length
