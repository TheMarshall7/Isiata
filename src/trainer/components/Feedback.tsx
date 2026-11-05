import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface FeedbackProps {
    correct: boolean | null;
    points: number;
    multiplier?: number;
    onShowParticles?: () => void;
    variant?: 'toast' | 'inline';
}

export const Feedback: React.FC<FeedbackProps> = ({
    correct,
    points,
    multiplier = 1,
    onShowParticles,
    variant = 'toast',
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (correct !== null) {
            setIsVisible(true);
            if (correct && onShowParticles) onShowParticles();
        } else {
            setIsVisible(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correct, points, multiplier]);

    if (!isVisible || correct === null) return null;

    const finalPoints = correct ? Math.floor(points * multiplier) : 0;

    if (variant === 'inline') {
        if (!correct) return null;
        return (
            <div className="et-anim-float flex items-center gap-2 rounded-full border border-green-500/30 bg-green-950/80 px-3 py-1 text-xs font-semibold text-green-300 shadow-[0_0_24px_-6px_rgba(74,222,128,0.5)] backdrop-blur-sm">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                <span>+{finalPoints} XP</span>
                {multiplier > 1 && <span className="rounded-full bg-green-400/15 px-1.5 text-[10px] text-green-200">{multiplier}×</span>}
            </div>
        );
    }

    return (
        <div className="et-anim-float mb-1 flex items-center gap-2 text-sm font-semibold">
            {correct ? (
                <>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                        <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-green-300">Correct</span>
                    <span className="text-[#f0c681]">+{finalPoints} XP</span>
                    {multiplier > 1 && (
                        <span className="brand-eyebrow rounded-full px-2 py-0.5 text-[10px] font-bold">{multiplier}× combo</span>
                    )}
                </>
            ) : (
                <>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                        <X className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-red-300">Not quite. Streak reset.</span>
                </>
            )}
        </div>
    );
};
