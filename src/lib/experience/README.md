# Feel No Evil experience (unreleased)

Interactive album experience and membership identity, built from
`src/Interactive & Mebership Ecosystem/ISIATA_Interactive_Album_Experience_Master_Brief.md`.

## Access

Unlisted. Live at `/fne-preview` only. It is not linked from the site, not in
`sitemap.xml`, not in `robots.txt` (a Disallow line would publish the path), and is
served with `X-Robots-Tag: noindex` plus a robots meta tag. The site header and footer
are hidden on these routes. To move it, change `EXPERIENCE_BASE` in `config.ts`, rename
`src/app/fne-preview`, and update the matching `headers()` entry in `next.config.js` and
the check in `SiteChrome.tsx`.

## Map

| Route | Purpose (brief section) |
| --- | --- |
| `/fne-preview` | Landing, promise, free registration with separate marketing consent (4.3, 11.5) |
| `/fne-preview/card` | Permanent identity card, Wallet readiness, shareable achievement cards (10) |
| `/fne-preview/world` | The Threshold hub, chapter list, shared progress (6) |
| `/fne-preview/chapter/[n]` | Transmission, Discovery, Challenge, Revelation, Continuation (5.1) |
| `/fne-preview/grimoire` | Personal archive and the eight-word sentence (6.4, 5.4) |
| `/fne-preview/premiere` | Access, countdown, bonus unlock status (9) |
| `/api/fne/submit` | Server-side puzzle validation and rate limit |
| `/api/fne/register` | Best-effort CRM forward (needs `GHL_EXPERIENCE_WEBHOOK_URL`) |
| `/api/fne/contribute` | Audience contributions, held as pending moderation |
| `/api/fne/wallet` | Honest "not configured" until pass issuing exists |

| `/fne-preview/hidden` | The hidden room: opens only after all five secrets (5.4 deeper layer) |

## Systems

- **Resonance** (`store.tsx`): points earned only by participating. They come from transmissions, exploring, solving
  (hints cost points), Clear Sight (first try with no hints), the optional deeper layer, secrets, contributions,
  live presence and return streaks. Points are derived from progress, so they can't drift. They drive the recognition
  levels New Member, Initiate, Insider and Inner Circle (brief 10.6). Nothing can be bought.
- **Composition** (`composition.ts`): each artifact adds a music layer, and all eight make the full piece; the hidden
  room adds a ninth. The sound is generated in the browser for now, and each voice can be swapped for a mastered stem.
  The door's light in the Threshold and the spectrum meters react to it.
- **Weekly ritual**: each chapter premieres live at its release time, with a 60-minute window. Being present earns
  the Present mark. Preview builds can simulate the live hour.
- **Secrets**: five optional secrets hidden in the world itself, each with a clue in the Grimoire. Finding all
  five opens the hidden room.
- **Whispers**: surprise events. One per visit, for a room solved a while ago (brief 7.2: "use sparingly").
- **Deeper layer**: an optional harder question per chapter, checked on the server.
- **Ceremony, onboarding, motion** (`Ceremony.tsx`, `Onboarding.tsx`, `Motion.tsx`): built from Brand Core 19 —
  transmitted typography, particles converging, kinetic release, a portal opening, waves where you touch, a slow
  gravitational light, and film grain. Everything has a reduced-motion path.
- **Events**: `track()` sends `fne_*` retention events to GA when it is present (brief 15).
- **Premiere pass and calendar file**: in the Grimoire and on the premiere page.

Campaign content lives in `campaign.ts` as data. A future album ships its own campaign
file; the member, card and Grimoire persist.

## Stubbed on purpose (the brief says build the vertical slice first)

- **Persistence is browser localStorage** (`store.tsx`). The brief makes Supabase the
  authority for identity, entitlements and progress. Swap `load`/`persist`; components only use
  `useExperience()`. Member numbers are placeholders until the database assigns them.
- **Shared progress is simulated** (`communityProgress`).
- **Transmissions are timed captions over a waveform** until the cinematic videos exist.
  The player is where the video element goes; the captions stay as the transcript.
- **Wallet passes** need signing certificates and a pass provider. The card back's seal is
  decorative until a verification view exists that exposes no private data.
- **Not built, per brief section 18:** factions, voting, theory board, live chat,
  multiplayer, Evolution Kit.

## Needs creative approval (nothing here is canon)

The brief asks that story, puzzle answers and membership rules not be decided silently.
These are working drafts: the hub name "The Threshold" and subtitle "The Eight Revelations";
all eight chapter titles, scripts, lore lines and artifacts; the final sentence
("WHAT YOU REFUSE TO FEEL STILL FEELS YOU") and its eight fragment words; all puzzle
mechanics and answers; the 5 achievements; "Initiate" as the first recognition level;
"Founding Member · Est. 2026" (anyone joining before 2027-01-01; the landing page counts down to it).
Also drafts: the Resonance values and level thresholds (`POINTS`, `LEVELS`); the live window (each chapter's
release time, open for 60 minutes); the five secrets and the hidden room's script; the eight deeper-layer questions
and answers; the whisper lines; the layer names; and the chapter 6 transmission, which is rewritten as an acrostic
of STAND.

Not built: audience voting (brief 7.2). Votes have to change something real, and nothing has been decided for a vote
to change yet.

Brand flag: the Brand Core says Isiata should not be defined by witchcraft and to use
"magic" carefully. "Grimoire" (and "Spellbook") are witchcraft-coded; the name is one string,
`CAMPAIGN.collectionName` in `campaign.ts`.

Known limits: Week 1 and Week 6 puzzle data is visible in client code (they are visual
puzzles); the other answers are checked only on the server.

## Env

```
GHL_EXPERIENCE_WEBHOOK_URL=      # CRM forward for registrations
NEXT_PUBLIC_CAMPAIGN_START=      # ISO date of week 1. Unset = every chapter open (preview)
NEXT_PUBLIC_PREMIERE_AT=         # ISO date. Unset = "date to be announced"
```
