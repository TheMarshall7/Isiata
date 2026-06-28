import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ModeSelect } from '../components/ModeSelect';
import { loadInstrument } from '../audio/sampleLoader';
import { DailyChallenges } from '../components/DailyChallenge';
import { getDailyChallenges } from '../logic/dailyChallenges';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { InstrumentSelector } from '../components/InstrumentSelector';
import { InstrumentOnboarding } from '../components/InstrumentOnboarding';
import { AudioEnableBanner } from '../components/AudioEnableBanner';
import { IOSSilentModeWarning } from '../components/IOSSilentModeWarning';
import { PageShell } from '../components/PageShell';
import { trainerLogoSrc } from '../lib/logo';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useGame();
    const [dailyChallenges, setDailyChallenges] = useState(getDailyChallenges());

    useEffect(() => {
        // Preload current instrument
        loadInstrument(state.currentInstrument);
    }, [state.currentInstrument]);

    useEffect(() => {
        document.title = 'ISIATA - Master Your Musical Ear | Interactive Ear Training';
    }, []);

    const handleInstrumentChange = async (instrumentId: string) => {
        dispatch({ type: 'SET_INSTRUMENT', payload: instrumentId });
        // Preload the new instrument
        await loadInstrument(instrumentId);
    };

    // Refresh daily challenges when component mounts or state changes
    useEffect(() => {
        setDailyChallenges(getDailyChallenges());
    }, [state.xp, state.level]);

    const handleStart = () => {
        // Auto-switch from bass to guitar if entering chord-based modes
        // Bass is disabled for: chord, progression, keyFinder, numberSystem (all use chords)
        const chordBasedModes = ['chord', 'progression', 'keyFinder', 'numberSystem'];
        if (chordBasedModes.includes(state.currentMode) && state.currentInstrument === 'bass') {
            dispatch({ type: 'SET_INSTRUMENT', payload: 'guitar' });
        }
        dispatch({ type: 'RESET_RUN' });
        navigate('/train');
    };

    // Determine which instruments should be disabled based on current mode
    // Bass is disabled for chord-based modes: chord, progression, keyFinder, numberSystem
    const chordBasedModes = ['chord', 'progression', 'keyFinder', 'numberSystem'];
    const disabledInstruments = chordBasedModes.includes(state.currentMode) ? ['bass'] : [];

    return (
        <PageShell>
            <InstrumentOnboarding onSelectInstrument={handleInstrumentChange} />

            <div className="absolute top-6 left-4 lg:top-8 lg:left-8 z-50">
                <BrandLogo />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 min-h-0 overflow-y-auto p-4 lg:p-8 pt-24 lg:pt-8 pb-6">
                <div className="w-full max-w-5xl mx-auto">
                    <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
                        <div className="inline-flex items-center justify-center mb-8 group">
                            <img
                                src={trainerLogoSrc}
                                alt="ISIATA"
                                className="w-20 h-20 lg:w-24 lg:h-24 object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-md"
                            />
                        </div>
                        <h1 className="text-5xl lg:text-7xl xl:text-8xl font-oswald uppercase tracking-tight leading-[0.95] mb-6 text-white">
                            <span className="block">Master Your</span>
                            <span className="block">Ear</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            The gamified path to perfect pitch. Identify intervals, chords, and progressions with instant feedback and AI-powered training.
                        </p>
                    </div>

                    {/* iOS Silent Mode Warning - Shows immediately for iOS users */}
                    <div className="mb-4">
                        <IOSSilentModeWarning />
                    </div>

                    {/* Audio Enable Banner */}
                    <div className="mb-6">
                        <AudioEnableBanner />
                    </div>

                    {/* Daily Challenges */}
                    <div className="mb-8">
                        <DailyChallenges challenges={dailyChallenges} />
                    </div>

                    {/* Mode Selection Card */}
                    <div className="mb-8">
                        <ModeSelect
                            currentMode={state.currentMode}
                            currentDifficulty={state.difficulty}
                            isPremium={state.isPremium}
                            onSelectMode={(mode) => dispatch({ type: 'SET_MODE', payload: mode })}
                            onSelectDifficulty={(diff) => dispatch({ type: 'SET_DIFFICULTY', payload: diff })}
                            onStart={handleStart}
                        />
                    </div>

                    {/* Instrument Selector */}
                    <div className="mb-8">
                        <InstrumentSelector
                            currentInstrument={state.currentInstrument}
                            onSelectInstrument={handleInstrumentChange}
                            disabledInstruments={disabledInstruments}
                        />
                    </div>

                    {/* Stats and Resources Links */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => navigate('/resources')}
                            className="group flex items-center gap-3 text-zinc-500 hover:text-zinc-300 font-medium text-sm transition-all duration-300 hover:gap-4"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-raised/80 backdrop-blur-sm border border-white/10 shadow-sm group-hover:shadow-md transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18V5l12-2v13"></path>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <circle cx="18" cy="16" r="3"></circle>
                                </svg>
                            </div>
                            <span>Resources</span>
                        </button>
                        <button
                            onClick={() => navigate('/stats')}
                            className="group flex items-center gap-3 text-zinc-500 hover:text-zinc-300 font-medium text-sm transition-all duration-300 hover:gap-4"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-raised/80 backdrop-blur-sm border border-white/10 shadow-sm group-hover:shadow-md transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="6"></circle>
                                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                                </svg>
                            </div>
                            <span>Achievements</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </PageShell>
    );
};
