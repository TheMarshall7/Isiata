import React from 'react';
import { FREQUENCY_ZONES, formatHz, freqToPos } from '../logic/trainers/frequencyTrainer';

const GRID = [50, 100, 200, 500, 1000, 2000, 5000, 10000];

interface SpectrumScaleProps {
    /** Revealed target frequency. */
    target?: number | null;
    /** Player's guess (Hard) or chosen band centre. */
    guess?: number | null;
    /** Highlight a whole zone (Easy) as [lo, hi]. */
    band?: [number, number] | null;
    correct?: boolean | null;
    /** Optional interactive layer rendered on top (the Hard slider). */
    children?: React.ReactNode;
    className?: string;
}

/** Log-frequency axis from 40 Hz to 16 kHz, tinted by mix zone. */
export const SpectrumScale: React.FC<SpectrumScaleProps> = ({ target, guess, band, correct, children, className = '' }) => {
    const pct = (hz: number) => `${(freqToPos(hz) * 100).toFixed(2)}%`;

    return (
        <div className={`relative w-full select-none ${className}`}>
            <div className="relative h-20 overflow-hidden rounded-xl border border-white/[0.07] bg-black/40">
                {/* Zone tints */}
                {FREQUENCY_ZONES.map((z, i) => (
                    <div
                        key={z.id}
                        className="absolute inset-y-0 border-r border-white/[0.04]"
                        style={{
                            left: pct(z.lo),
                            width: `calc(${pct(z.hi)} - ${pct(z.lo)})`,
                            background: i % 2 ? 'rgba(216,170,103,0.035)' : 'transparent',
                        }}
                    >
                        <span className="absolute left-1.5 top-1.5 hidden whitespace-nowrap text-[8px] uppercase tracking-[0.16em] text-zinc-600 sm:block">
                            {z.name}
                        </span>
                    </div>
                ))}

                {/* Pink-noise silhouette */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40" aria-hidden>
                    <defs>
                        <linearGradient id="spec-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d8aa67" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#d8aa67" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M0 40 L0 26 C 20 22, 40 24, 60 25 S 90 27, 100 30 L100 40 Z" fill="url(#spec-fill)" />
                </svg>

                {/* Highlighted zone */}
                {band && (
                    <div
                        className="absolute inset-y-0 animate-fade-in"
                        style={{
                            left: pct(band[0]),
                            width: `calc(${pct(band[1])} - ${pct(band[0])})`,
                            background: correct ? 'rgba(74,222,128,0.16)' : 'rgba(240,198,129,0.16)',
                            boxShadow: `inset 0 0 0 1px ${correct ? 'rgba(74,222,128,0.5)' : 'rgba(240,198,129,0.5)'}`,
                        }}
                    />
                )}

                {/* Target peak */}
                {target && (
                    <div className="absolute inset-y-0 -translate-x-1/2 animate-fade-in" style={{ left: pct(target) }}>
                        <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-t from-[#f0c681]/40 to-transparent blur-md" />
                        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#f0c681]" />
                        <div className="absolute left-1/2 top-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f0c681] px-1.5 py-0.5 text-[9px] font-semibold text-[#1a1208]">
                            {formatHz(target)}
                        </div>
                    </div>
                )}

                {/* Guess marker */}
                {guess && target && (
                    <div className="absolute inset-y-0 -translate-x-1/2" style={{ left: pct(guess) }}>
                        <div className={`absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 ${correct ? 'bg-green-400' : 'bg-red-400'}`} />
                        <div
                            className={`absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                                correct ? 'bg-green-400 text-green-950' : 'bg-red-400 text-red-950'
                            }`}
                        >
                            You · {formatHz(guess)}
                        </div>
                    </div>
                )}

                {children}
            </div>

            {/* Axis labels */}
            <div className="relative mt-1.5 h-3">
                {GRID.map((hz) => (
                    <span
                        key={hz}
                        className="absolute -translate-x-1/2 text-[9px] tabular-nums text-zinc-600"
                        style={{ left: pct(hz) }}
                    >
                        {hz >= 1000 ? `${hz / 1000}k` : hz}
                    </span>
                ))}
            </div>
        </div>
    );
};
