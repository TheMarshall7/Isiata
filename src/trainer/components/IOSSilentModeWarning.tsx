import React, { useState, useEffect } from 'react';

/**
 * IOSSilentModeWarning - Persistent warning for iOS users about Silent mode
 * 
 * iOS hardware limitation: When the physical Silent switch is ON,
 * iOS mutes ALL Web Audio API sounds. This CANNOT be bypassed by code.
 * 
 * This component shows an immediate, dismissible warning to iOS users.
 */
export const IOSSilentModeWarning: React.FC = () => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS
        const iOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        setIsIOS(iOS);

        // Check if user previously dismissed
        const wasDismissed = sessionStorage.getItem('iosSilentWarningDismissed') === 'true';
        setIsDismissed(wasDismissed);
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem('iosSilentWarningDismissed', 'true');
    };

    // Only show on iOS and if not dismissed
    if (!isIOS || isDismissed) {
        return null;
    }

    return (
        <div className="mx-auto mb-3 flex w-full max-w-xl items-center gap-2 rounded-xl border border-[#d8aa67]/25 bg-[#0b0a09]/90 px-3 py-2 text-xs text-zinc-300 backdrop-blur-sm">
            <span className="font-semibold text-[#f0c681]">iPhone:</span>
            <span>Turn off vibrate/silent mode to hear sound.</span>
            <button
                onClick={handleDismiss}
                className="ml-auto text-zinc-500 hover:text-zinc-200"
                aria-label="Dismiss"
            >
                ✕
            </button>
        </div>
    );
};
