import React, { useState, useEffect } from 'react';
import { audioEngine } from '../audio/audioEngine';

/**
 * AudioEnableBanner - FALLBACK banner shown only if auto-unlock fails
 */
export const AudioEnableBanner: React.FC = () => {
    const [isUnlocked, setIsUnlocked] = useState(true); // Optimistic
    const [showBanner, setShowBanner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile
        const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobile(mobile);

        const check = () => sessionStorage.getItem('audioUnlocked') === 'true' || localStorage.getItem('audioUnlocked') === 'true';
        if (check()) {
            setIsUnlocked(true);
            return;
        }

        // Only run timeout logic if on mobile
        if (mobile) {
            // Show banner after 3 seconds if still not unlocked
            const timer = setTimeout(() => {
                if (!check()) {
                    setShowBanner(true);
                    setIsUnlocked(false);
                }
            }, 3000);

            const poll = setInterval(() => {
                if (check()) {
                    setIsUnlocked(true);
                    setShowBanner(false);
                    clearInterval(poll);
                }
            }, 500);

            return () => { clearTimeout(timer); clearInterval(poll); };
        }
    }, []);

    const handleEnableAudio = () => {
        setIsLoading(true);
        console.log('AudioEnableBanner: handleEnableAudio click');
        
        try {
            // CRITICAL: hardUnlock runs SYNCHRONOUSLY directly inside this onClick handler
            audioEngine.ensureUnlockedSync();
            
            const ctx = audioEngine.getContext();
            console.log('AudioEnableBanner: after sync unlock. State:', ctx?.state);

            // Give iOS a few ms to update state
            setTimeout(() => {
                if (ctx?.state === 'running') {
                    setIsUnlocked(true);
                    setShowBanner(false);
                    localStorage.setItem('audioUnlocked', 'true');
                    sessionStorage.setItem('audioUnlocked', 'true');
                }
                setIsLoading(false);
            }, 100);
        } catch (error) {
            console.error('Failed to enable audio:', error);
            setIsLoading(false);
        }
    };

    // Hide if not mobile, or if unlocked, or if we haven't determined we need to show the banner yet
    if (!isMobile || isUnlocked || !showBanner) return null;

    return (
        <div className="mx-auto mb-4 flex w-full max-w-xl items-center justify-between gap-3 rounded-xl border border-[#d8aa67]/30 bg-[#0b0a09]/90 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f0c681]">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <p className="text-sm font-medium text-zinc-200">Audio is locked on this device</p>
            </div>
            <button
                onClick={handleEnableAudio}
                disabled={isLoading}
                className="shrink-0 rounded-full bg-gradient-to-br from-[#f0c681] to-[#a67c3d] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1a1208] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
                {isLoading ? 'Enabling...' : 'Enable Audio'}
            </button>
        </div>
    );
};
