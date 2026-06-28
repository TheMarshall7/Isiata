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
}

export const Player: React.FC<PlayerProps> = ({ onPlay, isPlaying, label = "Play", autoPlay = false }) => {
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
        <div className="flex flex-col items-center justify-center p-6 lg:p-8">
            <button
                onClick={handlePlay}
                disabled={isPlaying}
                className={`
          group relative w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center
          transition-all duration-300 transform
          ${isPlaying 
            ? 'scale-95 bg-gradient-to-br from-orange-500 to-orange-400' 
            : 'bg-white text-black hover:bg-zinc-200 hover:scale-110 shadow-xl shadow-white/10'
          }
          disabled:cursor-not-allowed
        `}
            >
                {/* Glow effect */}
                {!isPlaying && (
                    <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse-glow" />
                )}

                {hasPlayed ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`lg:w-12 lg:h-12 ${isPlaying ? 'text-white' : 'text-black'}`}>
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className={`ml-1 lg:w-16 lg:h-16 lg:ml-2 ${isPlaying ? 'text-white' : 'text-black'}`}>
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                )}
            </button>
            <div className="mt-4 lg:mt-6 text-zinc-500 font-medium tracking-wide text-sm lg:text-base">
                {isPlaying ? 'Listening...' : hasPlayed ? 'Re-listen' : label}
            </div>
        </div>
    );
};
