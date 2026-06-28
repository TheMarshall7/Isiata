import React from 'react';
import { Player } from './Player';

interface RoundControlsProps {
    onPlay: () => void;
    onReplay?: () => void;
    onClear?: () => void;
    isPlaying: boolean;
    label: string;
    showClear?: boolean;
}

export const RoundControls: React.FC<RoundControlsProps> = ({
    onPlay,
    onReplay,
    onClear,
    isPlaying,
    label,
    showClear = false
}) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <Player
                onPlay={onReplay || onPlay}
                isPlaying={isPlaying}
                label={onReplay ? 'Replay' : label}
                autoPlay={false}
            />
            {showClear && onClear && (
                <button
                    onClick={onClear}
                    disabled={isPlaying}
                    className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Clear
                </button>
            )}
        </div>
    );
};
