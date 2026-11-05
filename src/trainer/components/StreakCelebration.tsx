/**
 * Streak Celebration
 *
 * Non-blocking banner shown at streak milestones. It never covers the answer
 * buttons, so play continues uninterrupted.
 */

import React, { useEffect, useState, useRef } from 'react';
import { Flame } from 'lucide-react';
import { getComboMultiplier } from '../config/modeMeta';

interface StreakCelebrationProps {
    streak: number;
    onComplete?: () => void;
}

const STREAK_MILESTONES = [5, 10, 20, 50, 100];
const TITLES: Record<number, string> = { 5: 'On Fire', 10: 'Blazing', 20: 'Inferno', 50: 'Unstoppable', 100: 'Legendary' };

export const StreakCelebration: React.FC<StreakCelebrationProps> = ({ streak, onComplete }) => {
    const [shown, setShown] = useState<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const completeRef = useRef(onComplete);
    completeRef.current = onComplete;

    useEffect(() => {
        if (!STREAK_MILESTONES.includes(streak)) return;
        setShown(streak);
        timerRef.current = setTimeout(() => {
            setShown(null);
            completeRef.current?.();
        }, 2600);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [streak]);

    if (shown === null) return null;

    const flameCount = shown >= 100 ? 5 : shown >= 50 ? 4 : shown >= 20 ? 3 : shown >= 10 ? 2 : 1;
    const mult = getComboMultiplier(shown);

    return (
        <div
            className="pointer-events-none fixed left-1/2 top-16 z-[60] sm:top-20"
            style={{ animation: 'et-drop-in 0.45s cubic-bezier(0.2,1.3,0.4,1) both' }}
            role="status"
        >
            <div className="et-hairline flex items-center gap-3 rounded-full bg-[#0b0a09]/95 py-2 pl-2 pr-5 shadow-[0_18px_50px_-12px_rgba(249,115,22,0.45)] backdrop-blur-md" data-active="true">
                <span className="flex h-10 items-center gap-0.5 rounded-full bg-gradient-to-br from-orange-500/25 to-amber-400/10 px-2.5">
                    {Array.from({ length: flameCount }).map((_, i) => (
                        <Flame key={i} className="h-5 w-5 fill-orange-400/70 text-orange-300" style={{ animation: `et-bump 0.6s ease ${i * 0.08}s both` }} />
                    ))}
                </span>
                <div className="leading-tight">
                    <div className="et-gold-text font-display text-lg uppercase tracking-[0.12em]">{shown} Streak</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                        {TITLES[shown]}{mult > 1 ? ` · ${mult}× XP combo` : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};
