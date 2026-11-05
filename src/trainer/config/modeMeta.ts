import { AudioLines, Hash, KeyRound, Layers, ListMusic, Music, SlidersHorizontal, Timer, Waves, type LucideIcon } from 'lucide-react';
import type { GameMode } from '../types/game';

export interface ModeMeta {
    name: string;
    blurb: string;
    icon: LucideIcon;
    /** Small tag shown on the mode card. */
    tag?: string;
}

export const MODE_ORDER: GameMode[] = ['frequency', 'interval', 'chord', 'progression', 'scale', 'keyFinder', 'numberSystem', 'melody', 'tempo'];

export const MODE_META: Record<GameMode, ModeMeta> = {
    interval: { name: 'Intervals', blurb: 'The distance between two notes', icon: AudioLines },
    chord: { name: 'Chords', blurb: 'Major, minor, sevenths and beyond', icon: Layers },
    progression: { name: 'Progressions', blurb: 'Follow harmony as it moves', icon: ListMusic },
    scale: { name: 'Scales', blurb: 'Modes and scale colours', icon: Waves },
    keyFinder: { name: 'Key Finder', blurb: 'Find home in a progression', icon: KeyRound },
    perfectPitch: { name: 'Key Finder', blurb: 'Find home in a progression', icon: KeyRound },
    numberSystem: { name: 'Number System', blurb: 'Hear scale degrees in a key', icon: Hash },
    melody: { name: 'Melody', blurb: 'Dictate short melodic lines', icon: Music },
    tempo: { name: 'Tempo', blurb: 'Feel the BPM of a groove', icon: Timer },
    frequency: { name: 'Frequencies', blurb: 'Hear EQ bands like a mix engineer', icon: SlidersHorizontal, tag: 'Mixing' },
};

/** Mastery tiers per mode, keyed off correct answers in that mode (mirrors mode achievements). */
export const MASTERY_TIERS = [
    { name: 'Unranked', at: 0 },
    { name: 'Bronze', at: 10 },
    { name: 'Silver', at: 50 },
    { name: 'Gold', at: 100 },
    { name: 'Platinum', at: 500 },
] as const;

export function getMastery(correct: number) {
    let tier = 0;
    MASTERY_TIERS.forEach((t, i) => {
        if (correct >= t.at) tier = i;
    });
    const next = MASTERY_TIERS[tier + 1];
    const floor = MASTERY_TIERS[tier].at;
    const progress = next ? (correct - floor) / (next.at - floor) : 1;
    return { tier, name: MASTERY_TIERS[tier].name, next, progress: Math.max(0, Math.min(1, progress)) };
}

/** Player rank title for a level. */
export function getRankTitle(level: number): string {
    if (level >= 17) return 'Golden Ear';
    if (level >= 12) return 'Maestro';
    if (level >= 8) return 'Virtuoso';
    if (level >= 5) return 'Adept';
    if (level >= 3) return 'Apprentice';
    return 'Listener';
}

export function getComboMultiplier(streak: number): number {
    if (streak >= 20) return 4;
    if (streak >= 10) return 3;
    if (streak >= 5) return 2;
    return 1;
}
