'use client'

/**
 * Member + progress state for the experience.
 *
 * STAGE-1 ADAPTER: persists in this browser's localStorage so the full journey
 * is playable before the backend exists. The Master Brief makes the database
 * (Supabase) the authority for identity, entitlements and progress. When that
 * is wired in, replace load()/persist() and the actions below. Components only
 * talk to useExperience(), so nothing else changes. Puzzle answers are already
 * validated server-side in /api/fne/submit.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { CAMPAIGN, SECRETS, TOTAL_CHAPTERS } from './campaign'

const KEY = 'isiata.fne.v1'

/** Joining before this date earns the permanent Founding Member designation. */
export const FOUNDING_UNTIL = new Date('2027-01-01T00:00:00Z')

export interface Member {
  id: string
  /** Placeholder format. The database assigns the real sequential ID. */
  memberNumber: string
  displayName: string
  email: string
  emailConsent: boolean
  smsConsent: boolean
  joinedAt: string
  founding: boolean
  campaign: string
}

export interface ChapterProgress {
  viewedAt?: string
  solvedAt?: string
  attempts: number
  hintsUsed: number
  discovered: number[]
  /** Optional harder layer per chapter (brief 16: optional bonus challenges). */
  deeperAt?: string
}

export interface Contribution {
  id: string
  chapter: number
  text: string
  at: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface ExperienceState {
  member: Member | null
  chapters: Record<number, ChapterProgress>
  artifacts: number[]
  contributions: Contribution[]
  preview: boolean
  premiereConfirmedAt?: string
  secrets: string[]
  hiddenRoomAt?: string
  /** Chapters the member was present for during the live window. */
  live: number[]
  /** Calendar days with activity, used for the return streak. */
  activeDays: string[]
  whispersSeen: number[]
  introSeen: boolean
  sound: boolean
  /** Preview only: pretend the live window is open. */
  simulateLive: boolean
}

const EMPTY: ExperienceState = {
  member: null,
  chapters: {},
  artifacts: [],
  contributions: [],
  preview: !CAMPAIGN.startAt,
  secrets: [],
  live: [],
  activeDays: [],
  whispersSeen: [],
  introSeen: false,
  sound: true,
  simulateLive: false,
}

function load(): ExperienceState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return EMPTY
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<ExperienceState>) }
  } catch {
    return EMPTY
  }
}

function persist(state: ExperienceState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* private mode or storage blocked: the session still works */
  }
}

const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

export function newMemberNumber(): string {
  const bytes = new Uint8Array(7)
  window.crypto.getRandomValues(bytes)
  const body = Array.from(bytes, (b) => CROCKFORD[b % 32]).join('')
  return `ISI-${body.slice(0, 3)}-${body.slice(3)}`
}

function blankProgress(): ChapterProgress {
  return { attempts: 0, hintsUsed: 0, discovered: [] }
}

const today = () => new Date().toISOString().slice(0, 10)

/** Retention events (brief 15). Sent to GA when present; the backend will store them later. */
export function track(name: string, params?: Record<string, unknown>) {
  trackEvent(`fne_${name}`, params)
}

export interface Toast {
  id: number
  title: string
  line?: string
  kind: 'secret' | 'level' | 'whisper' | 'mark'
}

interface Ctx {
  state: ExperienceState
  hydrated: boolean
  solvedCount: number
  toasts: Toast[]
  notify: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
  register: (input: { displayName: string; email: string; emailConsent: boolean }) => Member
  markViewed: (n: number) => void
  markDiscovered: (n: number, i: number) => void
  recordAttempt: (n: number) => void
  takeHint: (n: number) => void
  markSolved: (n: number) => void
  markDeeper: (n: number) => void
  markLive: (n: number) => void
  findSecret: (id: string) => void
  enterHiddenRoom: () => void
  seeWhisper: (n: number) => void
  seeIntro: () => void
  addContribution: (chapter: number, text: string) => void
  setPreview: (on: boolean) => void
  setSound: (on: boolean) => void
  setSimulateLive: (on: boolean) => void
  confirmPremiere: () => void
  reset: () => void
}

const ExperienceContext = createContext<Ctx | null>(null)

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ExperienceState>(EMPTY)
  const [hydrated, setHydrated] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  // Latest state for one-shot side effects, so updaters stay pure (StrictMode runs them twice).
  const live = useRef(state)
  live.current = state

  useEffect(() => {
    setState(load())
    setHydrated(true)
  }, [])

  // Only save after the stored profile has been loaded, or the empty initial state would overwrite it.
  useEffect(() => {
    if (hydrated) persist(state)
  }, [state, hydrated])

  // Count today as an active day once the member is here.
  useEffect(() => {
    if (!hydrated || !state.member) return
    const d = today()
    if (!state.activeDays.includes(d)) setState((s) => ({ ...s, activeDays: [...s.activeDays, d].slice(-120) }))
  }, [hydrated, state.member, state.activeDays])

  const notify = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random()
    setToasts((all) => [...all, { ...t, id }])
    setTimeout(() => setToasts((all) => all.filter((x) => x.id !== id)), 6500)
  }, [])

  const patchChapter = useCallback((n: number, fn: (p: ChapterProgress) => ChapterProgress) => {
    setState((s) => ({ ...s, chapters: { ...s.chapters, [n]: fn(s.chapters[n] ?? blankProgress()) } }))
  }, [])

  const register: Ctx['register'] = useCallback((input) => {
    const joinedAt = new Date().toISOString()
    const member: Member = {
      id: window.crypto.randomUUID(),
      memberNumber: newMemberNumber(),
      displayName: input.displayName.trim(),
      email: input.email.trim().toLowerCase(),
      emailConsent: input.emailConsent,
      smsConsent: false,
      joinedAt,
      founding: new Date(joinedAt) < FOUNDING_UNTIL,
      campaign: CAMPAIGN.slug,
    }
    setState((s) => ({ ...s, member, premiereConfirmedAt: joinedAt }))
    track('register', { founding: member.founding, email_consent: member.emailConsent })
    return member
  }, [])

  const findSecret = useCallback(
    (id: string) => {
      const s = live.current
      if (s.secrets.includes(id)) return
      const def = SECRETS.find((x) => x.id === id)
      track('secret_found', { secret: id })
      notify({ kind: 'secret', title: `Secret found · ${s.secrets.length + 1} of ${SECRETS.length}`, line: def?.found })
      live.current = { ...s, secrets: [...s.secrets, id] }
      setState((prev) => (prev.secrets.includes(id) ? prev : { ...prev, secrets: [...prev.secrets, id] }))
    },
    [notify]
  )

  const value = useMemo<Ctx>(
    () => ({
      state,
      hydrated,
      solvedCount: state.artifacts.length,
      toasts,
      notify,
      dismiss: (id) => setToasts((all) => all.filter((x) => x.id !== id)),
      register,
      markViewed: (n) => {
        if (!state.chapters[n]?.viewedAt) track('transmission_viewed', { chapter: n })
        patchChapter(n, (p) => ({ ...p, viewedAt: p.viewedAt ?? new Date().toISOString() }))
      },
      markDiscovered: (n, i) =>
        patchChapter(n, (p) => (p.discovered.includes(i) ? p : { ...p, discovered: [...p.discovered, i] })),
      recordAttempt: (n) => {
        track('challenge_attempt', { chapter: n })
        patchChapter(n, (p) => ({ ...p, attempts: p.attempts + 1 }))
      },
      takeHint: (n) => {
        track('hint', { chapter: n })
        patchChapter(n, (p) => ({ ...p, hintsUsed: Math.min(3, p.hintsUsed + 1) }))
      },
      markSolved: (n) => {
        track('chapter_solved', { chapter: n })
        patchChapter(n, (p) => ({ ...p, solvedAt: p.solvedAt ?? new Date().toISOString() }))
        setState((s) => (s.artifacts.includes(n) ? s : { ...s, artifacts: [...s.artifacts, n].sort((a, b) => a - b) }))
      },
      markDeeper: (n) => {
        track('deeper_solved', { chapter: n })
        patchChapter(n, (p) => ({ ...p, deeperAt: p.deeperAt ?? new Date().toISOString() }))
      },
      markLive: (n) => {
        if (state.live.includes(n)) return
        track('present_live', { chapter: n })
        setState((s) => (s.live.includes(n) ? s : { ...s, live: [...s.live, n] }))
      },
      findSecret,
      enterHiddenRoom: () => setState((s) => ({ ...s, hiddenRoomAt: s.hiddenRoomAt ?? new Date().toISOString() })),
      seeWhisper: (n) => setState((s) => (s.whispersSeen.includes(n) ? s : { ...s, whispersSeen: [...s.whispersSeen, n] })),
      seeIntro: () => setState((s) => ({ ...s, introSeen: true })),
      addContribution: (chapter, text) => {
        track('contribution', { chapter })
        setState((s) => ({
          ...s,
          contributions: [
            ...s.contributions,
            { id: window.crypto.randomUUID(), chapter, text: text.trim(), at: new Date().toISOString(), status: 'pending' },
          ],
        }))
      },
      setPreview: (on) => setState((s) => ({ ...s, preview: on })),
      setSound: (on) => setState((s) => ({ ...s, sound: on })),
      setSimulateLive: (on) => setState((s) => ({ ...s, simulateLive: on })),
      confirmPremiere: () => setState((s) => ({ ...s, premiereConfirmedAt: new Date().toISOString() })),
      reset: () => setState({ ...EMPTY, preview: state.preview }),
    }),
    [state, hydrated, toasts, notify, register, patchChapter, findSecret]
  )

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperience(): Ctx {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error('useExperience must be used inside ExperienceProvider')
  return ctx
}

/* ------------------------------------------------------------------ Resonance */

/**
 * Resonance: points earned only through participation, never purchase
 * (brief 10.6). Derived from progress so it can never drift or double count.
 * Values are DRAFT.
 */
export const POINTS = {
  solve: 100,
  hintCost: 15,
  clearSight: 50,
  transmission: 10,
  discovery: 15,
  deeper: 80,
  secret: 75,
  hiddenRoom: 150,
  contribution: 25,
  live: 50,
  streakDay: 20,
}

export interface ResonanceLine {
  label: string
  points: number
}

export function chapterResonance(p: ChapterProgress | undefined, n: number, state: ExperienceState): ResonanceLine[] {
  if (!p) return []
  const lines: ResonanceLine[] = []
  if (p.viewedAt) lines.push({ label: 'Transmission received', points: POINTS.transmission })
  if (p.discovered.length >= 3) lines.push({ label: 'Room explored', points: POINTS.discovery })
  if (p.solvedAt) {
    lines.push({ label: 'Revelation', points: Math.max(55, POINTS.solve - p.hintsUsed * POINTS.hintCost) })
    if (p.attempts <= 1 && p.hintsUsed === 0) lines.push({ label: 'Clear sight: first try, no hints', points: POINTS.clearSight })
  }
  if (p.deeperAt) lines.push({ label: 'The deeper layer', points: POINTS.deeper })
  if (state.live.includes(n)) lines.push({ label: 'Present for the live transmission', points: POINTS.live })
  if (state.contributions.some((c) => c.chapter === n)) lines.push({ label: 'Left something behind', points: POINTS.contribution })
  return lines
}

export function streakFor(state: ExperienceState): number {
  const days = [...state.activeDays].sort()
  if (days.length === 0) return 0
  let streak = 1
  for (let i = days.length - 1; i > 0; i--) {
    const gap = (new Date(days[i]).getTime() - new Date(days[i - 1]).getTime()) / 86_400_000
    // A weekly campaign: returning within 8 days keeps the streak alive.
    if (gap <= 8) streak++
    else break
  }
  return streak
}

export function resonanceFor(state: ExperienceState): number {
  let total = 0
  for (let n = 1; n <= TOTAL_CHAPTERS; n++) {
    total += chapterResonance(state.chapters[n], n, state).reduce((a, l) => a + l.points, 0)
  }
  total += state.secrets.length * POINTS.secret
  if (state.hiddenRoomAt) total += POINTS.hiddenRoom
  total += Math.max(0, Math.min(streakFor(state), 10) - 1) * POINTS.streakDay
  return total
}

/** Recognition levels (brief 10.6). Names and thresholds are DRAFT. */
export const LEVELS = [
  { name: 'New Member', min: 0 },
  { name: 'Initiate', min: 100 },
  { name: 'Insider', min: 700 },
  { name: 'Inner Circle', min: 1500 },
]

export function levelFor(points: number) {
  let i = 0
  LEVELS.forEach((l, idx) => {
    if (points >= l.min) i = idx
  })
  const next = LEVELS[i + 1]
  return {
    index: i,
    name: LEVELS[i].name,
    next: next?.name ?? null,
    toNext: next ? next.min - points : 0,
    pct: next ? ((points - LEVELS[i].min) / (next.min - LEVELS[i].min)) * 100 : 100,
  }
}

/* ------------------------------------------------------------------ Marks */

export interface Achievement {
  id: string
  title: string
  line: string
  earned: boolean
}

/** Deliberately few, so every one means something (brief section 18, risk 8). */
export function achievementsFor(state: ExperienceState): Achievement[] {
  const solved = state.artifacts.length
  const chapters = Object.values(state.chapters)
  return [
    { id: 'crossed', title: 'Crossed the Threshold', line: 'Joined the first ISIATA experience.', earned: !!state.member },
    { id: 'first', title: 'First Sight', line: 'Opened the first revelation.', earned: solved >= 1 },
    {
      id: 'clear',
      title: 'Clear Sight',
      line: 'Solved a chapter on the first try, without a hint.',
      earned: chapters.some((c) => c.solvedAt && c.attempts <= 1 && c.hintsUsed === 0),
    },
    { id: 'returned', title: 'Returned', line: 'Came back and kept going.', earned: state.activeDays.length >= 2 },
    { id: 'present', title: 'Present', line: 'Was there for a live transmission.', earned: state.live.length >= 1 },
    { id: 'voice', title: 'A Voice in the Room', line: 'Left something behind.', earned: state.contributions.length >= 1 },
    { id: 'half', title: 'Half Open', line: 'Four revelations held.', earned: solved >= TOTAL_CHAPTERS / 2 },
    { id: 'full', title: 'Full Sight', line: 'All eight revelations held.', earned: solved >= TOTAL_CHAPTERS },
    { id: 'unseen', title: 'The Unseen', line: 'Found every secret and entered the hidden room.', earned: !!state.hiddenRoomAt },
  ]
}

/**
 * Community objective. SIMULATED until the backend aggregates real members:
 * a seeded baseline plus this browser's own contribution.
 */
export const COMMUNITY_GOAL = 8000
export const COMMUNITY_BASELINE = 2840
export function communityProgress(ownSolves: number) {
  const value = COMMUNITY_BASELINE + ownSolves
  return { value, goal: COMMUNITY_GOAL, pct: Math.min(100, (value / COMMUNITY_GOAL) * 100) }
}
