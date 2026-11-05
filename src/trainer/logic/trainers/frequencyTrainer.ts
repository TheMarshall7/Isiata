/**
 * Frequency trainer: identify the centre of a band of filtered noise.
 *
 * Easy   – which mix zone (sub, bass, low mids…), wide band
 * Medium – which octave band (63 Hz … 16 kHz), narrower band
 * Hard   – pinpoint on a continuous log scale, within ⅓ octave
 */
import type { Difficulty } from '../../types/game';

export const FREQ_MIN = 40;
export const FREQ_MAX = 16000;

export interface FrequencyZone {
    id: string;
    name: string;
    lo: number;
    hi: number;
    character: string;
}

export const FREQUENCY_ZONES: FrequencyZone[] = [
    { id: 'sub', name: 'Sub', lo: 40, hi: 60, character: 'Rumble you feel more than hear' },
    { id: 'bass', name: 'Bass', lo: 60, hi: 250, character: 'Weight, punch and low-end power' },
    { id: 'lowmid', name: 'Low mids', lo: 250, hi: 500, character: 'Warmth, or mud and boxiness when overdone' },
    { id: 'mid', name: 'Mids', lo: 500, hi: 2000, character: 'Body and honk, where most instruments live' },
    { id: 'uppermid', name: 'Upper mids', lo: 2000, hi: 4000, character: 'Bite and attack, harshness when pushed' },
    { id: 'presence', name: 'Presence', lo: 4000, hi: 6000, character: 'Clarity, definition and sibilance' },
    { id: 'air', name: 'Air', lo: 6000, hi: 16000, character: 'Sparkle, sheen and openness' },
];

export const OCTAVE_BANDS = [63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

/** ⅓-octave ISO centres used as Hard targets (kept inside speaker-friendly range). */
const THIRD_OCTAVE = [50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500];

export const DIFFICULTY_Q: Record<Difficulty, number> = { easy: 2, medium: 4, hard: 6 };

/** Accuracy falls linearly from 100% (exact) to 0% at this many octaves away. */
export const ACCURACY_SPAN_OCT = 2;
/** Accuracy needed on Hard to count as a hit (= within half an octave). */
export const HARD_PASS_ACCURACY = 75;
export const BULLSEYE_ACCURACY = 92;

/** 0–100 accuracy for a Hard guess. */
export function guessAccuracy(guess: number, target: number): number {
    const dist = Math.abs(Math.log2(guess / target));
    return Math.max(0, Math.round(100 * (1 - dist / ACCURACY_SPAN_OCT)));
}

export function accuracyLabel(acc: number): string {
    if (acc >= BULLSEYE_ACCURACY) return 'Bullseye';
    if (acc >= HARD_PASS_ACCURACY) return 'On target';
    if (acc >= 55) return 'Close';
    return 'Off target';
}

export interface FrequencyQuestion {
    frequency: number;
    q: number;
    difficulty: Difficulty;
    /** Discrete answers for Easy / Medium; empty on Hard (slider). */
    options: { id: string; name: string; hint?: string }[];
    answerId: string | null;
}

export function formatHz(hz: number): string {
    if (hz >= 1000) {
        const k = hz / 1000;
        return `${k >= 10 ? k.toFixed(1).replace(/\.0$/, '') : k.toFixed(2).replace(/0$/, '').replace(/\.0$/, '')} kHz`;
    }
    return `${Math.round(hz)} Hz`;
}

/** Compact range label, e.g. "60–250 Hz", "500 Hz–2 kHz", "2–4 kHz". */
export function rangeLabel(lo: number, hi: number): string {
    if (lo >= 1000) return `${lo / 1000}–${hi / 1000} kHz`;
    if (hi < 1000) return `${lo}–${hi} Hz`;
    return `${lo} Hz–${hi / 1000} kHz`;
}

export function zoneFor(hz: number): FrequencyZone {
    return FREQUENCY_ZONES.find((z) => hz >= z.lo && hz < z.hi) ?? FREQUENCY_ZONES[FREQUENCY_ZONES.length - 1];
}

export function octaveDistance(a: number, b: number): number {
    return Math.abs(Math.log2(a / b));
}

/** 0..1 position of a frequency on the log axis. */
export function freqToPos(hz: number): number {
    return Math.log(hz / FREQ_MIN) / Math.log(FREQ_MAX / FREQ_MIN);
}

export function posToFreq(pos: number): number {
    return FREQ_MIN * Math.pow(FREQ_MAX / FREQ_MIN, pos);
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

let lastFrequency = 0;

export function generateFrequencyQuestion(difficulty: Difficulty): FrequencyQuestion {
    const q = DIFFICULTY_Q[difficulty];

    if (difficulty === 'easy') {
        let zone = pick(FREQUENCY_ZONES);
        // Avoid repeating the same zone twice in a row.
        if (lastFrequency && zoneFor(lastFrequency).id === zone.id) zone = pick(FREQUENCY_ZONES);
        // Random point in the inner 60% of the zone (log scale) so it never sits on a border.
        const lo = Math.log(zone.lo);
        const hi = Math.log(zone.hi);
        const frequency = Math.round(Math.exp(lo + (hi - lo) * (0.2 + Math.random() * 0.6)));
        lastFrequency = frequency;
        return {
            frequency,
            q,
            difficulty,
            options: FREQUENCY_ZONES.map((z) => ({ id: z.id, name: z.name, hint: rangeLabel(z.lo, z.hi) })),
            answerId: zone.id,
        };
    }

    if (difficulty === 'medium') {
        let frequency = pick(OCTAVE_BANDS);
        if (frequency === lastFrequency) frequency = pick(OCTAVE_BANDS);
        lastFrequency = frequency;
        return {
            frequency,
            q,
            difficulty,
            options: OCTAVE_BANDS.map((f) => ({ id: String(f), name: formatHz(f) })),
            answerId: String(frequency),
        };
    }

    let frequency = pick(THIRD_OCTAVE);
    if (frequency === lastFrequency) frequency = pick(THIRD_OCTAVE);
    lastFrequency = frequency;
    return { frequency, q, difficulty, options: [], answerId: null };
}
