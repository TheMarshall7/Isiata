import React from 'react';
import { audioEngine } from '../../audio/audioEngine';

interface AudioStatusBannerProps {
    isUnlocked: boolean;
    onUnlock: () => void;
}

export const AudioStatusBanner: React.FC<AudioStatusBannerProps> = ({ isUnlocked, onUnlock }) => {
    if (isUnlocked) return null;

    const handleUnlock = () => {
        try {
            // Unlock audio synchronously inside user gesture
            audioEngine.ensureUnlockedSync();
            
            // Wait a brief moment for state change
            setTimeout(() => {
                const ctx = audioEngine.getContext();
                if (ctx?.state === 'running') {
                    onUnlock();
                } else {
                    console.warn('AudioStatusBanner: Unlock triggered but state is not running:', ctx?.state);
                    // Still call onUnlock to hide the banner if it was a user click
                    onUnlock();
                }
            }, 100);
        } catch (error) {
            console.error('Failed to unlock audio:', error);
            alert('Unable to enable audio. Please try refreshing the page or using a different browser.');
        }
    };

    return (
        <div className="mb-6 rounded-2xl border border-[#d8aa67]/30 bg-[#0b0a09]/90 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#f0c681]"
                    >
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                    <p className="text-sm text-zinc-300">
                        <span className="font-medium">Audio not enabled.</span> Tap the button to activate sound playback.
                    </p>
                </div>
                <button
                    onClick={handleUnlock}
                    className="px-4 py-2 bg-gradient-to-b from-[#f0c681] to-[#b88a48] text-[#1a1208] rounded-full hover:brightness-110 transition-colors text-sm font-medium shadow-sm hover:shadow"
                >
                    Enable Audio
                </button>
            </div>
        </div>
    );
};
