import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import type { GameMode } from '../types/game';
import { isModeLocked } from '../config/features';
import { MODE_META, MODE_ORDER, getMastery } from '../config/modeMeta';
import { PaywallModal } from './PaywallModal';
import { redirectToCheckout } from '../utils/stripe';

interface ModeSelectProps {
    currentMode: GameMode;
    isPremium: boolean;
    modeStats: Record<string, number>;
    onSelectMode: (mode: GameMode) => void;
    onStart?: () => void;
}

const TIER_COLORS = ['#3f3a33', '#b07a4a', '#c9ccd1', '#f0c681', '#e5e4f5'];

/** Mode cards with icon, blurb and per-mode mastery tier. Double-click starts. */
export const ModeSelect: React.FC<ModeSelectProps> = ({ currentMode, isPremium, modeStats, onSelectMode, onStart }) => {
    const [showPaywall, setShowPaywall] = useState(false);

    const handleModeClick = (mode: GameMode) => {
        if (isModeLocked(mode, isPremium)) setShowPaywall(true);
        else onSelectMode(mode);
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {MODE_ORDER.map((mode, i) => {
                    const meta = MODE_META[mode];
                    const Icon = meta.icon;
                    const locked = isModeLocked(mode, isPremium);
                    const active = currentMode === mode;
                    const correct = modeStats[mode] ?? 0;
                    const mastery = getMastery(correct);

                    return (
                        <button
                            key={mode}
                            onClick={() => handleModeClick(mode)}
                            onDoubleClick={() => !locked && onStart?.()}
                            data-active={active}
                            aria-pressed={active}
                            className={`${meta.tag ? 'col-span-2 sm:col-span-1' : ''} et-hairline et-anim-rise group relative flex min-h-[8.5rem] flex-col overflow-hidden rounded-2xl p-3.5 text-left transition-all duration-300 sm:p-4 ${
                                active
                                    ? 'bg-gradient-to-b from-[#d8aa67]/[0.14] to-[#0b0a09]/95 shadow-[0_18px_50px_-20px_rgba(216,170,103,0.6)] -translate-y-0.5'
                                    : 'bg-[#0b0a09]/85 hover:-translate-y-1 hover:bg-[#141210]/95'
                            } ${locked ? 'opacity-60' : ''}`}
                            style={{ animationDelay: `${i * 45}ms` }}
                        >
                            {active && <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f0c681]/20 blur-2xl" />}

                            <div className="relative flex items-start justify-between">
                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-300 ${
                                        active
                                            ? 'border-transparent bg-gradient-to-br from-[#f0c681] to-[#a67c3d] text-[#1a1208]'
                                            : 'border-[#d8aa67]/25 bg-white/[0.03] text-[#d8aa67] group-hover:border-[#d8aa67]/60'
                                    }`}
                                >
                                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                                </span>
                                {meta.tag && !active && (
                                    <span className="rounded-full border border-[#d8aa67]/40 bg-[#d8aa67]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f0c681]">
                                        New · {meta.tag}
                                    </span>
                                )}
                                {locked ? (
                                    <Lock className="h-3.5 w-3.5 text-zinc-500" />
                                ) : active ? (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0c681] text-[#1a1208]">
                                        <Check className="h-3 w-3" strokeWidth={3} />
                                    </span>
                                ) : null}
                            </div>

                            <div className="relative mt-3 flex-1">
                                <div className={`text-sm font-semibold ${active ? 'text-[#fff3dc]' : 'text-zinc-200'}`}>{meta.name}</div>
                                <div className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-zinc-500">{meta.blurb}</div>
                            </div>

                            <div className="relative mt-3">
                                <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.18em]">
                                    <span className="flex items-center gap-1.5" style={{ color: mastery.tier ? TIER_COLORS[mastery.tier] : '#6b665e' }}>
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: TIER_COLORS[mastery.tier] }} />
                                        {mastery.name}
                                    </span>
                                    <span className="tabular-nums text-zinc-600">
                                        {mastery.next ? `${correct}/${mastery.next.at}` : correct}
                                    </span>
                                </div>
                                <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                                    <div className="h-full rounded-full brand-progress-fill" style={{ width: `${Math.max(mastery.progress * 100, correct ? 4 : 0)}%`, animation: 'none' }} />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {showPaywall && (
                <PaywallModal
                    onClose={() => setShowPaywall(false)}
                    onUpgrade={async () => {
                        setShowPaywall(false);
                        await redirectToCheckout();
                    }}
                />
            )}
        </>
    );
};
