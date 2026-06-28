import React from 'react';

interface PaywallProps {
    visible: boolean;
    onUnlock: () => void;
}

export const Paywall: React.FC<PaywallProps> = ({ visible, onUnlock }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-raised rounded-2xl border border-white/10 p-8 max-w-sm w-full text-center depth-shadow-lg animate-fade-in">
                <div className="w-16 h-16 bg-orange-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Session Limit Reached</h2>
                <p className="text-zinc-500 mb-8">
                    You've completed your free daily sets. Unlock unlimited training to continue mastering your ear.
                </p>
                <button
                    onClick={onUnlock}
                    className="w-full btn-primary mb-3"
                >
                    Unlock Unlimited Access
                </button>
                <button className="text-sm text-zinc-600 underline hover:text-zinc-400">
                    Restore Purchase
                </button>
            </div>
        </div>
    );
};
