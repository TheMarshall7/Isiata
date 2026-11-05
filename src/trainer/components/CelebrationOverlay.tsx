import React, { useEffect, useRef, useState } from 'react';
import { Crown, Flame, Star, Trophy } from 'lucide-react';

interface CelebrationOverlayProps {
    type: 'level-up' | 'perfect-run' | 'achievement' | 'streak-milestone';
    message: string;
    subtitle?: string;
    onComplete: () => void;
}

const ICONS = {
    'level-up': Crown,
    'perfect-run': Star,
    achievement: Trophy,
    'streak-milestone': Flame,
} as const;

const EYEBROW = {
    'level-up': 'Level up',
    'perfect-run': 'Flawless',
    achievement: 'Unlocked',
    'streak-milestone': 'Streak',
} as const;

/** Full-screen moment for level-ups and perfect runs. Tap anywhere to continue. */
export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ type, message, subtitle, onComplete }) => {
    const [leaving, setLeaving] = useState(false);
    const doneRef = useRef(onComplete);
    doneRef.current = onComplete;

    const dismiss = () => {
        if (leaving) return;
        setLeaving(true);
        setTimeout(() => doneRef.current(), 250);
    };

    useEffect(() => {
        const t = setTimeout(dismiss, 2800);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Icon = ICONS[type] ?? Trophy;

    return (
        <div
            className={`fixed inset-0 z-[70] flex cursor-pointer items-center justify-center bg-black/70 backdrop-blur-md transition-opacity duration-300 ${leaving ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}
            onClick={dismiss}
            role="dialog"
            aria-label={message}
        >
            <div className="et-anim-rise relative mx-4 flex flex-col items-center text-center">
                {/* Burst rings */}
                <div className="pointer-events-none absolute left-1/2 top-[56px] -translate-x-1/2 -translate-y-1/2">
                    {[0, 0.25, 0.5].map((d) => (
                        <span
                            key={d}
                            className="absolute left-1/2 top-1/2 -ml-[56px] -mt-[56px] h-28 w-28 rounded-full border border-[#f0c681]/60"
                            style={{ animation: `et-burst 1.6s ease-out ${d}s infinite` }}
                        />
                    ))}
                </div>

                <div
                    className="relative flex h-28 w-28 items-center justify-center rounded-full"
                    style={{
                        background: 'radial-gradient(circle at 30% 25%, #fff1d6 0%, #f0c681 25%, #d8aa67 50%, #a67c3d 80%, #6b4e2a 100%)',
                        boxShadow: '0 0 80px -10px rgba(240,198,129,0.7), inset 0 -8px 16px rgba(80,50,20,0.4)',
                    }}
                >
                    <Icon className="h-12 w-12 text-[#1a1208]" strokeWidth={1.75} />
                </div>

                <div className="mt-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#a89a85]">{EYEBROW[type]}</div>
                <div className="et-gold-text mt-3 font-display text-4xl uppercase tracking-[0.1em] sm:text-5xl">{message}</div>
                {subtitle && <div className="mt-3 text-sm text-zinc-400">{subtitle}</div>}
                <div className="mt-8 text-[10px] uppercase tracking-[0.25em] text-zinc-600">Tap to continue</div>
            </div>
        </div>
    );
};
