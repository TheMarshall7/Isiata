import React, { useEffect, useState } from 'react';

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
            
            if (correct) {
                // Trigger particle effect only once when correct becomes true
                if (onShowParticles) {
                    onShowParticles();
                }
                
                // Animation handled by finalPoints calculation
            }
        } else {
            setIsVisible(false);
        }
    }, [correct, points, multiplier]); // Removed onShowParticles to prevent infinite loop

    if (!isVisible || correct === null) return null;

    const finalPoints = correct ? Math.floor(points * multiplier) : 0;
    const showMultiplier = multiplier > 1 && correct;

    if (!correct) return null;

    if (variant === 'inline') {
        return (
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-950/70 border border-green-500/25 text-green-300 backdrop-blur-sm shadow-sm">
                <span>Correct</span>
                <span className="text-green-400/90 ml-1.5">+{finalPoints}</span>
                {showMultiplier && (
                    <span className="text-green-500/70 ml-1">{multiplier}x</span>
                )}
            </div>
        );
    }

    return (
        <div className={`
            fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none
            px-4 py-2 rounded-full shadow-lg font-medium text-sm
            transition-all duration-300
            bg-green-950/80 border border-green-500/30 text-green-300 backdrop-blur-sm
        `}>
            <div className="flex items-center gap-1.5">
                <span>Correct</span>
                <span className="text-green-400">+{finalPoints}</span>
                {showMultiplier && (
                    <span className="text-xs text-green-500/80 px-1.5 py-0.5 rounded-full border border-green-500/20">
                        {multiplier}x
                    </span>
                )}
            </div>
        </div>
    );
};
