import React from 'react';
import { Flame } from 'lucide-react';
import { getXPForLevel } from '../context/GameContext';
import { getComboMultiplier, getRankTitle } from '../config/modeMeta';

interface ProgressMeterProps {
    current: number;
    total: number;
    streak: number;
    level?: number;
    xp?: number;
    compact?: boolean;
}

/** Level ring with XP, a segmented run track and streak / combo chips. */
export const LevelRing: React.FC<{ level: number; pct: number; size?: number; stroke?: number }> = ({
    level,
    pct,
    size = 44,
    stroke = 3,
}) => {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const id = `lr-${size}`;
    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <defs>
                    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6b4e2a" />
                        <stop offset="55%" stopColor="#d8aa67" />
                        <stop offset="100%" stopColor="#f0c681" />
                    </linearGradient>
                </defs>
                <circle cx={size / 2} cy={size / 2} r={r} fill="rgba(10,10,10,0.9)" stroke="rgba(216,170,103,0.14)" strokeWidth={stroke} />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={`url(#${id})`}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={c * (1 - pct / 100)}
                    style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.2,0.8,0.2,1)' }}
                />
            </svg>
            <span
                key={level}
                className="et-anim-bump absolute inset-0 flex items-center justify-center font-display text-[#f0dfc8]"
                style={{ fontSize: size * 0.36 }}
            >
                {level}
            </span>
        </div>
    );
};

export const ProgressMeter: React.FC<ProgressMeterProps> = ({
    current,
    total,
    streak,
    level = 1,
    xp = 0,
    compact = false,
}) => {
    const currentLevelXP = getXPForLevel(level);
    const nextLevelXP = getXPForLevel(level + 1);
    const xpInLevel = xp - currentLevelXP;
    const xpNeededForNext = nextLevelXP - currentLevelXP;
    const xpPercentage = xpNeededForNext > 0 ? Math.min(100, (xpInLevel / xpNeededForNext) * 100) : 100;
    const multiplier = getComboMultiplier(streak);
    const done = Math.max(0, Math.min(total, current - 1));

    return (
        <div className={`w-full max-w-xl mx-auto px-4 shrink-0 ${compact ? 'mb-3' : 'mb-6 lg:mb-8'}`}>
            <div className="glass-card !p-3 sm:!p-3.5">
                <div className="relative z-[2] flex items-center gap-3">
                    <LevelRing level={level} pct={xpPercentage} />

                    <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                            <span className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-[#f0dfc8]">
                                {getRankTitle(level)}
                            </span>
                            <span className="shrink-0 text-[10px] tabular-nums text-zinc-500">
                                {xpInLevel}/{xpNeededForNext} XP
                            </span>
                        </div>

                        {/* Run track: one segment per question */}
                        <div className="mt-2 flex gap-1" aria-label={`Question ${current} of ${total}`}>
                            {Array.from({ length: total }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                        i < done
                                            ? 'brand-progress-fill'
                                            : i === done
                                                ? 'bg-[#d8aa67]/35 animate-pulse'
                                                : 'bg-white/[0.06]'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500 tabular-nums">
                            Question {Math.min(current, total)} <span className="text-zinc-700">/</span> {total}
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1">
                        <span
                            key={`s-${streak}`}
                            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                                streak > 0 ? 'et-anim-bump text-orange-300 bg-orange-500/10 border border-orange-400/25' : 'text-zinc-600 border border-white/5'
                            }`}
                            title="Current streak"
                        >
                            <Flame className={`h-3.5 w-3.5 ${streak >= 5 ? 'fill-orange-400/60' : ''}`} />
                            {streak}
                        </span>
                        {multiplier > 1 && (
                            <span key={`m-${multiplier}`} className="et-anim-bump brand-eyebrow rounded-full px-2 py-0.5 text-[10px] font-bold">
                                {multiplier}× XP
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
