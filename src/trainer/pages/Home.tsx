import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Award, BookOpen, Flame, Target, Trophy, Zap } from 'lucide-react';
import { useGame, getXPForLevel } from '../context/GameContext';
import { ModeSelect } from '../components/ModeSelect';
import { loadInstrument } from '../audio/sampleLoader';
import { DailyChallenges } from '../components/DailyChallenge';
import { getDailyChallenges } from '../logic/dailyChallenges';
import { loadStats as loadGameStats } from '../logic/statsTracker';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { InstrumentSelector } from '../components/InstrumentSelector';
import { InstrumentOnboarding } from '../components/InstrumentOnboarding';
import { AudioEnableBanner } from '../components/AudioEnableBanner';
import { IOSSilentModeWarning } from '../components/IOSSilentModeWarning';
import { PageShell } from '../components/PageShell';
import { TrainerOverlayTextures } from '../components/TrainerOverlayTextures';
import { EarTrainerEmailGate } from '../components/EarTrainerEmailGate';
import { LevelRing } from '../components/ProgressMeter';
import { hasEarTrainerAccess } from '../lib/access';
import { MODE_META, getRankTitle } from '../config/modeMeta';
import { instruments } from '../config/instruments';
import type { Difficulty } from '../types/game';

const CHORD_BASED_MODES = ['chord', 'progression', 'keyFinder', 'numberSystem'];

const DIFFICULTIES: { id: Difficulty; label: string; hint: string }[] = [
    { id: 'easy', label: 'Easy', hint: 'Core set' },
    { id: 'medium', label: 'Medium', hint: 'Extended' },
    { id: 'hard', label: 'Hard', hint: 'Full range' },
];

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useGame();
    const [dailyChallenges, setDailyChallenges] = useState(getDailyChallenges());
    const [unlocked, setUnlocked] = useState(false);
    const stats = useMemo(() => loadGameStats(), [state.xp]);
    const startRef = useRef<HTMLButtonElement>(null);
    const [startVisible, setStartVisible] = useState(true);

    useEffect(() => {
        const el = startRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(([entry]) => setStartVisible(entry.isIntersecting), { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, [unlocked]);

    useEffect(() => {
        setUnlocked(hasEarTrainerAccess());
    }, []);

    useEffect(() => {
        loadInstrument(state.currentInstrument);
    }, [state.currentInstrument]);

    useEffect(() => {
        document.title = 'ISIATA - Ear Mastery | Interactive Ear Training';
    }, []);

    useEffect(() => {
        setDailyChallenges(getDailyChallenges());
    }, [state.xp, state.level]);

    const handleInstrumentChange = async (instrumentId: string) => {
        dispatch({ type: 'SET_INSTRUMENT', payload: instrumentId });
        await loadInstrument(instrumentId);
    };

    const handleStart = () => {
        if (CHORD_BASED_MODES.includes(state.currentMode) && state.currentInstrument === 'bass') {
            dispatch({ type: 'SET_INSTRUMENT', payload: 'guitar' });
        }
        dispatch({ type: 'RESET_RUN' });
        navigate('/train');
    };

    const disabledInstruments = CHORD_BASED_MODES.includes(state.currentMode) ? ['bass'] : [];

    if (!unlocked) {
        return <EarTrainerEmailGate onUnlock={() => setUnlocked(true)} />;
    }

    const lvlFloor = getXPForLevel(state.level);
    const lvlNext = getXPForLevel(state.level + 1);
    const xpIn = state.xp - lvlFloor;
    const xpSpan = lvlNext - lvlFloor;
    const xpPct = xpSpan > 0 ? Math.min(100, (xpIn / xpSpan) * 100) : 100;
    const accuracy = stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : null;
    const modeMeta = MODE_META[state.currentMode];
    const ModeIcon = modeMeta.icon;
    const isFrequency = state.currentMode === 'frequency';
    const instrumentName = isFrequency ? 'Pink noise' : instruments.find((i) => i.id === state.currentInstrument)?.name ?? 'Bell';

    const statTiles = [
        { icon: Flame, label: 'Day streak', value: stats.dailyStreak || 0, accent: stats.dailyStreak > 0 },
        { icon: Zap, label: 'Best streak', value: Math.max(stats.bestStreak, state.bestStreak) },
        { icon: Target, label: 'Accuracy', value: accuracy === null ? '—' : `${accuracy}%` },
        { icon: Trophy, label: 'Perfect runs', value: stats.perfectRuns || 0 },
    ];

    return (
        <PageShell className="ear-trainer-home" ambientOrbs={false}>
            <InstrumentOnboarding onSelectInstrument={handleInstrumentChange} />
            <TrainerOverlayTextures />

            {/* Top bar */}
            <header className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-5 lg:px-8 lg:pt-7">
                <BrandLogo />
                <nav className="flex items-center gap-2">
                    <button
                        onClick={() => navigate('/resources')}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-zinc-400 backdrop-blur-sm transition-colors hover:border-[#d8aa67]/40 hover:text-zinc-100"
                    >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Resources</span>
                    </button>
                    <button
                        onClick={() => navigate('/stats')}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-zinc-400 backdrop-blur-sm transition-colors hover:border-[#d8aa67]/40 hover:text-zinc-100"
                    >
                        <Award className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Achievements</span>
                    </button>
                </nav>
            </header>

            <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 lg:px-8 lg:pt-10">
                {/* Hero */}
                <section className="animate-fade-in-up text-center">
                    <div className="et-label">ISIATA · Ear training</div>
                    <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] text-gold sm:text-6xl lg:text-7xl">
                        Ear <span className="et-gold-text">Mastery</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                        Hear intervals, chords and progressions clearly, then carry that clarity into everything you make.
                    </p>
                </section>

                <div className="mx-auto mt-6 max-w-xl">
                    <IOSSilentModeWarning />
                    <AudioEnableBanner />
                </div>

                {/* Player profile */}
                <section className="glass-card et-anim-rise mt-8 !p-5 sm:!p-6">
                    <div className="relative z-[2] grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="relative">
                                <span className="absolute inset-0 rounded-full bg-[#d8aa67]/20 blur-xl" />
                                <LevelRing level={state.level} pct={xpPct} size={76} stroke={4} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="et-label">Level {state.level}</div>
                                <div className="et-gold-text mt-1 font-display text-2xl uppercase tracking-[0.08em] sm:text-3xl">
                                    {getRankTitle(state.level)}
                                </div>
                                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                                    <div className="brand-progress-fill h-full rounded-full transition-all duration-700" style={{ width: `${xpPct}%` }} />
                                </div>
                                <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-zinc-500">
                                    <span>{xpIn} / {xpSpan} XP</span>
                                    <span>{Math.max(0, xpSpan - xpIn)} to level {state.level + 1}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            {statTiles.map(({ icon: Icon, label, value, accent }) => (
                                <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                                    <div className="flex items-center gap-1.5 whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-zinc-500">
                                        <Icon className={`h-3 w-3 ${accent ? 'text-orange-400' : 'text-[#a67c3d]'}`} />
                                        {label}
                                    </div>
                                    <div className="mt-1 font-display text-xl tabular-nums text-zinc-100">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-[2] mt-5 border-t border-white/[0.06] pt-5">
                        <DailyChallenges challenges={dailyChallenges} />
                    </div>
                </section>

                {/* Mode + session setup */}
                <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
                    <div>
                        <div className="mb-3 flex items-end justify-between">
                            <h2 className="et-label">Choose your training</h2>
                            <span className="hidden text-[10px] text-zinc-600 sm:inline">Double-click a mode to jump straight in</span>
                        </div>
                        <ModeSelect
                            currentMode={state.currentMode}
                            isPremium={state.isPremium}
                            modeStats={stats.modeStats ?? {}}
                            onSelectMode={(mode) => dispatch({ type: 'SET_MODE', payload: mode })}
                            onStart={handleStart}
                        />
                    </div>

                    <aside className="glass-card !p-5 lg:sticky lg:top-6">
                        <div className="relative z-[2]">
                            <div className="et-label">Session</div>
                            <div className="mt-3 flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0c681] to-[#a67c3d] text-[#1a1208]">
                                    <ModeIcon className="h-5 w-5" strokeWidth={1.75} />
                                </span>
                                <div>
                                    <div className="font-display text-lg uppercase tracking-[0.1em] text-[#fff3dc]">{modeMeta.name}</div>
                                    <div className="text-[11px] text-zinc-500">10 questions · {instrumentName}</div>
                                </div>
                            </div>

                            <div className="mt-5 et-label">Difficulty</div>
                            <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl border border-white/[0.07] bg-black/30 p-1">
                                {DIFFICULTIES.map((d) => {
                                    const active = state.difficulty === d.id;
                                    return (
                                        <button
                                            key={d.id}
                                            onClick={() => dispatch({ type: 'SET_DIFFICULTY', payload: d.id })}
                                            aria-pressed={active}
                                            className={`rounded-lg px-2 py-2 text-center transition-all duration-300 ${
                                                active
                                                    ? 'bg-gradient-to-b from-[#f0c681] to-[#b88a48] text-[#1a1208] shadow-[0_6px_20px_-8px_rgba(240,198,129,0.7)]'
                                                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100'
                                            }`}
                                        >
                                            <div className="text-xs font-semibold">{d.label}</div>
                                            <div className={`whitespace-nowrap text-[9px] uppercase tracking-[0.1em] ${active ? 'text-[#3a2a12]' : 'text-zinc-600'}`}>{d.hint}</div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-5 et-label">{isFrequency ? 'Source' : 'Instrument'}</div>
                            <div className="mt-2">
                                {isFrequency ? (
                                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-[11px] leading-relaxed text-zinc-400">
                                        <span className="text-[#f0c681]">Pink noise</span> through a band-pass filter.{' '}
                                        {state.difficulty === 'easy'
                                            ? 'Name the mix zone, sub to air.'
                                            : state.difficulty === 'medium'
                                                ? 'Name the octave band, 63 Hz to 16 kHz.'
                                                : 'Pinpoint it on the spectrum. Scored by accuracy.'}{' '}
                                        Use headphones or monitors.
                                    </div>
                                ) : (
                                    <InstrumentSelector
                                        currentInstrument={state.currentInstrument}
                                        onSelectInstrument={handleInstrumentChange}
                                        disabledInstruments={disabledInstruments}
                                    />
                                )}
                            </div>

                            <button ref={startRef} onClick={handleStart} className="btn-primary et-cta group mt-6 w-full !py-4 text-sm font-semibold">
                                <span className="flex items-center justify-center gap-2">
                                    Start training
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                            </button>
                            <p className="mt-3 text-center text-[10px] text-zinc-600">
                                Correct answers build streaks. 5, 10 and 20 in a row multiply your XP.
                            </p>
                        </div>
                    </aside>
                </section>
            </main>

            {/* Mobile quick-start: stays in reach while browsing modes */}
            <div
                className={`fixed inset-x-0 bottom-0 z-40 px-4 pt-3 transition-all duration-500 lg:hidden ${
                    startVisible ? 'pointer-events-none translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                }`}
                style={{
                    paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
                    background: 'linear-gradient(180deg, transparent, rgba(2,2,2,0.92) 35%)',
                }}
            >
                <button onClick={handleStart} className="btn-primary et-cta w-full !py-3.5 text-xs font-semibold">
                    <span className="flex items-center justify-center gap-2.5">
                        <ModeIcon className="h-4 w-4" strokeWidth={1.75} />
                        Start {modeMeta.name} · {state.difficulty}
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </button>
            </div>

            <Footer />
        </PageShell>
    );
};
