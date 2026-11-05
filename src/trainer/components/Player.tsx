/**
 * Player Component
 *
 * Gold play/replay control with listening rings and an EQ readout.
 * Press R (or Space when nothing is focused) to replay.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

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
    label = 'Play',
    autoPlay = false,
    size = 'default',
}) => {
    const isCompact = size === 'compact';
    const [hasPlayed, setHasPlayed] = useState(false);
    const playRef = useRef<() => void>(() => {});

    const handlePlay = () => {
        onPlay();
        setHasPlayed(true);
    };
    playRef.current = handlePlay;

    useEffect(() => {
        if (autoPlay) handlePlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
            const t = e.target as HTMLElement | null;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
            const isSpace = e.code === 'Space' && (!t || t === document.body);
            if (e.key === 'r' || e.key === 'R' || isSpace) {
                e.preventDefault();
                if (!isPlaying) playRef.current();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isPlaying]);

    const dim = isCompact ? 'w-[4.5rem] h-[4.5rem]' : 'w-24 h-24 lg:w-28 lg:h-28';
    const iconSize = isCompact ? 26 : 34;

    return (
        <div className={`flex flex-col items-center justify-center ${isCompact ? 'pt-3 pb-0 px-3' : 'p-6 lg:p-8'}`}>
            <div className="relative flex items-center justify-center">
                {/* Listening rings */}
                {isPlaying && (
                    <>
                        <span className={`absolute ${dim} rounded-full border border-[#f0c681]/60`} style={{ animation: 'et-ring 1.4s ease-out infinite' }} />
                        <span className={`absolute ${dim} rounded-full border border-[#d8aa67]/50`} style={{ animation: 'et-ring 1.4s ease-out 0.45s infinite' }} />
                        <span className={`absolute ${dim} rounded-full border border-[#a67c3d]/40`} style={{ animation: 'et-ring 1.4s ease-out 0.9s infinite' }} />
                    </>
                )}
                {!isPlaying && !hasPlayed && (
                    <span className={`absolute ${dim} rounded-full bg-[#d8aa67]/20 blur-xl animate-pulse-glow`} />
                )}
                <button
                    onClick={handlePlay}
                    disabled={isPlaying}
                    aria-label={hasPlayed ? 'Replay' : label}
                    className={`group relative ${dim} rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-default
                        ${isPlaying ? 'scale-95' : 'hover:scale-105 active:scale-95'}`}
                    style={{
                        background: 'radial-gradient(circle at 30% 25%, #fff1d6 0%, #f0c681 22%, #d8aa67 48%, #a67c3d 78%, #6b4e2a 100%)',
                        boxShadow: isPlaying
                            ? '0 0 0 1px rgba(240,198,129,0.4), 0 0 40px -6px rgba(240,198,129,0.65)'
                            : '0 0 0 1px rgba(240,198,129,0.35), 0 12px 32px -10px rgba(216,170,103,0.6), inset 0 -6px 12px rgba(80,50,20,0.35)',
                    }}
                >
                    {isPlaying ? (
                        <span className="flex h-7 items-end gap-[3px]" aria-hidden>
                            {[0, 0.15, 0.3, 0.1, 0.25].map((d, i) => (
                                <span
                                    key={i}
                                    className="w-[3px] h-full rounded-full bg-[#1a1208] origin-bottom"
                                    style={{ animation: `et-eq 0.7s ease-in-out ${d}s infinite` }}
                                />
                            ))}
                        </span>
                    ) : hasPlayed ? (
                        <RotateCcw size={iconSize - 4} strokeWidth={2.5} className="text-[#1a1208] transition-transform duration-500 group-hover:-rotate-180" />
                    ) : (
                        <Play size={iconSize} fill="currentColor" strokeWidth={0} className="ml-1 text-[#1a1208]" />
                    )}
                </button>
            </div>
            <div className={`flex items-center gap-2 ${isCompact ? 'mt-3' : 'mt-5'}`}>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d8c3a4]">
                    {isPlaying ? 'Listening…' : hasPlayed ? 'Replay' : label}
                </span>
                {!isPlaying && <span className="et-keycap hidden sm:inline-flex">R</span>}
            </div>
        </div>
    );
};
