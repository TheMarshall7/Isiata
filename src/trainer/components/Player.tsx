/**
 * Player Component
 * 
 * Reusable play/replay button component for audio playback.
 * Displays a large circular button with play or replay icon.
 * Handles auto-play functionality and visual feedback during playback.
 * 
 * Features:
 * - Large, accessible play button
 * - Visual state changes (playing vs idle)
 * - Auto-play support
 * - Disabled state during playback
 */

import React, { useState, useEffect } from 'react';

interface PlayerProps {
    onPlay: () => void;
    isPlaying?: boolean;
    label?: string;
    autoPlay?: boolean;
    size?: 'default' | 'compact';
}

export const Player: React.FC<PlayerProps> = ({
    onPlay,
    isPlaying,
    label = "Play",
    autoPlay = false,
    size = 'default',
}) => {
    const isCompact = size === 'compact';
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        if (autoPlay) {
            handlePlay();
        }
    }, [autoPlay]);

    const handlePlay = () => {
        onPlay();
        setHasPlayed(true);
    };

    return (
        <div className={`flex flex-col items-center justify-center ${isCompact ? 'pt-3 pb-5 px-3' : 'p-6 lg:p-8'}`}>
            <button
                onClick={handlePlay}
                disabled={isPlaying}
                className={`
          group relative rounded-full flex items-center justify-center
          transition-all duration-300 transform
          ${isCompact ? 'w-16 h-16' : 'w-24 h-24 lg:w-32 lg:h-32'}
          ${isPlaying 
            ? 'scale-95 bg-gradient-to-br from-orange-600 to-orange-400' 
            : 'bg-gradient-to-br from-orange-500 to-orange-400 text-black hover:from-orange-400 hover:to-orange-300 hover:scale-110 shadow-xl shadow-orange-500/30'
          }
          disabled:cursor-not-allowed
        `}
            >
                {/* Glow effect */}
                {!isPlaying && (
                    <div className="absolute inset-0 rounded-full bg-orange-300/20 animate-pulse-glow" />
                )}

                {hasPlayed ? (
                    <svg width={isCompact ? 24 : 32} height={isCompact ? 24 : 32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${!isCompact ? 'lg:w-12 lg:h-12' : ''} ${isPlaying ? 'text-white' : 'text-black'}`}>
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                ) : (
                    <svg width={isCompact ? 28 : 40} height={isCompact ? 28 : 40} viewBox="0 0 24 24" fill="currentColor" className={`${isCompact ? 'ml-0.5' : 'ml-1 lg:w-16 lg:h-16 lg:ml-2'} ${isPlaying ? 'text-white' : 'text-black'}`}>
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                )}
            </button>
            <div className={`text-orange-300/80 font-medium tracking-wide ${isCompact ? 'mt-1.5 text-xs' : 'mt-4 lg:mt-6 text-sm lg:text-base'}`}>
                {isPlaying ? 'Listening...' : hasPlayed ? 'Re-listen' : label}
            </div>
        </div>
    );
};
