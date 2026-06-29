import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { generateTempoQuestion, checkTempoAnswer, type TempoQuestion } from '../../logic/trainers/tempoTrainer';
import { audioEngine } from '../../audio/audioEngine';
import { loadClickSound } from '../../audio/sampleLoader';
import { ModeHeader } from '../ModeHeader';
import { RoundControls } from '../RoundControls';
import { ProgressMeter } from '../ProgressMeter';
import { ParticleEffect } from '../ParticleEffect';
import { BrandLogo } from '../BrandLogo';
import { Footer } from '../Footer';
import { recordAnswer, updateBestStreak, loadStats, saveStats } from '../../logic/statsTracker';
import { updateChallengeProgress, getDailyChallenges } from '../../logic/dailyChallenges';
import type { Difficulty } from '../../types/game';

interface TempoModeProps {
    difficulty: Difficulty;
    streak: number;
    runProgress: number;
    onCorrect: (points: number) => void;
    onWrong: () => void;
    onNext: () => void;
}

export const TempoMode: React.FC<TempoModeProps> = ({
    difficulty,
    streak,
    runProgress,
    onCorrect,
    onWrong,
    onNext
}) => {
    const navigate = useNavigate();
    const { state } = useGame();
    const [question, setQuestion] = useState<TempoQuestion | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [userBPM, setUserBPM] = useState<number>(120);
    const [checking, setChecking] = useState(false);
    const [result, setResult] = useState<{ correct: boolean; accuracy: string; difference: number } | null>(null);
    const [showParticles, setShowParticles] = useState(false);
    const [dailyChallenges, setDailyChallenges] = useState(getDailyChallenges());
    const hasAutoPlayedRef = useRef(false);
    const hasInitializedRef = useRef(false);
    const lastDifficultyRef = useRef<string>('');
    const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Only load question if difficulty actually changed or first init
        if (!hasInitializedRef.current || lastDifficultyRef.current !== difficulty) {
            hasInitializedRef.current = true;
            lastDifficultyRef.current = difficulty;

            const newQuestion = generateTempoQuestion(difficulty);
            setQuestion(newQuestion);
            setUserBPM(Math.floor((newQuestion.minBPM + newQuestion.maxBPM) / 2));
            hasAutoPlayedRef.current = false;
        } else { }
    }, [difficulty]);

    const playMetronome = useCallback(async () => {
        // CRITICAL: Unlock audio SYNCHRONOUSLY FIRST
        audioEngine.ensureUnlockedSync();

        if (!question || isPlaying) return;
        setIsPlaying(true);

        try {
            if (!question.beatInterval) {
                setIsPlaying(false);
                return;
            }

            // Force recreate audio context on user interaction
            await audioEngine.init();
            await loadClickSound();
            await new Promise(resolve => setTimeout(resolve, 100));

            // Double-check question is still valid
            if (!question) {
                setIsPlaying(false);
                return;
            }

            // Play metronome clicks using the click sound
            // Use middle C (60) as the base note for the click sample
            const clickNote = 60;
            const clickSampleId = 'click';

            for (let i = 0; i < question.beatsToPlay; i++) {
                const delay = (i * question.beatInterval) / 1000; // Convert to seconds
                audioEngine.playNote(clickSampleId, clickNote, 60, delay, 1.0);
            }

            // Calculate total duration
            const totalDuration = question.beatsToPlay * question.beatInterval + 200;

            // Clear any existing timeout
            if (playTimeoutRef.current) {
                clearTimeout(playTimeoutRef.current);
            }

            playTimeoutRef.current = setTimeout(() => {
                setIsPlaying(false);
                playTimeoutRef.current = null;
            }, totalDuration);
        } catch (error) {
            console.error('Error playing metronome:', error);
            setIsPlaying(false);
        }
    }, [question, isPlaying]);

    // Auto-play once when question loads
    useEffect(() => {
        if (!question) {
            return;
        }

        if (!hasAutoPlayedRef.current && !checking && !isPlaying) {
            hasAutoPlayedRef.current = true;
            const timer = setTimeout(async () => {
                if (!question) {
                    hasAutoPlayedRef.current = false;
                    return;
                }

                try {
                    await audioEngine.init();
                    await loadClickSound();
                    await new Promise(resolve => setTimeout(resolve, 300));

                    if (question && !isPlaying) {
                        playMetronome();
                    } else {
                        hasAutoPlayedRef.current = false;
                    }
                } catch (error) {
                    console.error('Error in auto-play:', error);
                    hasAutoPlayedRef.current = false;
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [question, isPlaying, checking, playMetronome]);

    const handleSubmit = () => {
        if (checking || !question) return;

        // Stop any playing audio immediately
        audioEngine.stopAll();
        if (playTimeoutRef.current) {
            clearTimeout(playTimeoutRef.current);
            playTimeoutRef.current = null;
        }
        setIsPlaying(false);

        setChecking(true);

        const answerResult = checkTempoAnswer(question.targetBPM, userBPM);

        setResult({
            correct: answerResult.isCorrect,
            accuracy: answerResult.accuracy,
            difference: answerResult.difference
        });

        if (answerResult.isCorrect) {
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 2000);

            const newStreak = streak + 1;
            const newRunProgress = runProgress + 1;
            const isPerfectRun = newRunProgress === 10;

            // Update stats
            let stats = loadStats();
            stats = recordAnswer(stats, true, 'tempo', isPerfectRun);
            stats = updateBestStreak(stats, newStreak);
            saveStats(stats);

            // Update daily challenges
            let updatedChallenges = dailyChallenges;
            const challengeUpdate = updateChallengeProgress(updatedChallenges, 'questions', 1);
            updatedChallenges = challengeUpdate.challenges;
            setDailyChallenges(updatedChallenges);

            const multiplier = streak >= 20 ? 4 : streak >= 10 ? 3 : streak >= 5 ? 2 : 1;
            const finalPoints = answerResult.points * multiplier;

            onCorrect(finalPoints);
        } else {
            // Update stats
            let stats = loadStats();
            stats = recordAnswer(stats, false, 'tempo');
            saveStats(stats);

            onWrong();
        }
    };

    const handleNext = () => {
        // Stop any playing audio
        audioEngine.stopAll();
        if (playTimeoutRef.current) {
            clearTimeout(playTimeoutRef.current);
            playTimeoutRef.current = null;
        }
        setIsPlaying(false);

        setChecking(false);
        setResult(null);
        hasAutoPlayedRef.current = false;
        const newQuestion = generateTempoQuestion(difficulty);
        setQuestion(newQuestion);
        setUserBPM(Math.floor((newQuestion.minBPM + newQuestion.maxBPM) / 2));
        onNext();
    };

    if (!question) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-white relative flex flex-col">
            <div className="fixed inset-0 -z-0">
                <div className="absolute -translate-x-1/2 -translate-y-1/2 animate-pulse-glow from-orange-500/10 via-white/5 to-transparent opacity-50 w-[500px] h-[500px] rounded-full top-1/4 left-1/4 blur-3xl"></div>
                <div className="absolute translate-x-1/2 translate-y-1/2 animate-pulse-glow from-orange-500/10 via-white/5 to-transparent opacity-50 w-[500px] h-[500px] rounded-full bottom-1/4 right-1/4 blur-3xl"></div>
            </div>

            <div className="absolute top-6 left-4 lg:top-8 lg:left-8 z-50">
                <BrandLogo showText={false} />
            </div>

            <div className="relative z-10 flex flex-col items-center pt-6 lg:pt-8 pb-6 flex-1 min-h-0 overflow-y-auto">
                <div className="w-full max-w-4xl px-4 flex justify-between items-center mb-4 relative z-50 pl-20 lg:pl-24">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate('/');
                        }}
                        className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-400 font-medium text-sm relative z-50 cursor-pointer transition-all duration-300 hover:gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300">
                            <path d="m12 19-7-7 7-7"></path>
                            <path d="M19 12H5"></path>
                        </svg>
                        <span>Home</span>
                    </button>
                    <div className="w-16"></div>
                </div>

                <ProgressMeter
                    current={runProgress + 1}
                    total={10}
                    streak={streak}
                    level={state.level}
                    xp={state.xp}
                />

                <ParticleEffect trigger={showParticles} />

                <ModeHeader
                    title="Tempo Trainer"
                    difficulty={difficulty}
                    streak={streak}
                    runProgress={runProgress}
                    tip="Listen to the metronome and guess the BPM."
                />

                <div className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center">
                    <div className="trainer-card w-full max-w-xl mx-auto mb-8 pt-6 pb-2">
                        <RoundControls
                            onPlay={playMetronome}
                            onReplay={playMetronome}
                            isPlaying={isPlaying}
                            label="Play Metronome"
                        />
                    </div>

                    {/* BPM Input Controls */}
                    <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                        <h3 className="text-center text-lg font-semibold text-zinc-300 mb-6">
                            What is the tempo?
                        </h3>

                        {/* Current BPM Display with Arrow Controls */}
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => {
                                        const step = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 5 : 1;
                                        setUserBPM(Math.max(question.minBPM, userBPM - step));
                                    }}
                                    disabled={checking || userBPM <= question.minBPM}
                                    className="p-3 rounded-full bg-surface-raised/80 hover:bg-white/10 border-2 border-white/10 hover:border-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95"
                                    title="Decrease BPM"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300">
                                        <path d="m15 18-6-6 6-6"></path>
                                    </svg>
                                </button>
                                <div>
                                    <div className="text-6xl font-bold text-white mb-2">
                                        {userBPM}
                                    </div>
                                    <div className="text-sm text-zinc-500 uppercase tracking-wide">
                                        BPM
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const step = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 5 : 1;
                                        setUserBPM(Math.min(question.maxBPM, userBPM + step));
                                    }}
                                    disabled={checking || userBPM >= question.maxBPM}
                                    className="p-3 rounded-full bg-surface-raised/80 hover:bg-white/10 border-2 border-white/10 hover:border-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95"
                                    title="Increase BPM"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Slider */}
                        <div className="mb-6">
                            <input
                                type="range"
                                min={question.minBPM}
                                max={question.maxBPM}
                                step={difficulty === 'easy' ? 10 : difficulty === 'medium' ? 5 : 1}
                                value={userBPM}
                                onChange={(e) => setUserBPM(parseInt(e.target.value))}
                                disabled={checking}
                                className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                                style={{
                                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${((userBPM - question.minBPM) / (question.maxBPM - question.minBPM)) * 100}%, #e5e5e5 ${((userBPM - question.minBPM) / (question.maxBPM - question.minBPM)) * 100}%, #e5e5e5 100%)`
                                }}
                            />
                            <div className="flex justify-between text-xs text-zinc-600 mt-2">
                                <span>{question.minBPM}</span>
                                <span>{question.maxBPM}</span>
                            </div>
                        </div>

                        {/* Number Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Or enter manually:
                            </label>
                            <input
                                type="number"
                                min={question.minBPM}
                                max={question.maxBPM}
                                value={userBPM}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val >= question.minBPM && val <= question.maxBPM) {
                                        setUserBPM(val);
                                    }
                                }}
                                disabled={checking}
                                className="w-full px-4 py-3 rounded-lg border-2 border-white/10 focus:border-orange-500 focus:outline-none text-center text-xl font-semibold"
                            />
                        </div>

                        {/* Submit Button */}
                        {!checking && (
                            <button
                                onClick={handleSubmit}
                                className="btn-primary w-full text-lg"
                            >
                                Submit Answer
                            </button>
                        )}
                    </div>
                </div>

                {checking && result && (
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-white/10 p-6 flex flex-col items-center animate-slide-up pb-8">
                        <div className={`w-full max-w-md mx-auto rounded-2xl p-8 backdrop-blur-lg shadow-2xl border transition-all duration-300 ${result.correct
                                ? 'bg-gradient-to-br from-orange-500/10/90 to-amber-100/80 border-orange-500/30/50'
                                : 'bg-white/10 border-white/10'
                            }`}>
                            <div className="text-center">
                                {result.correct ? (
                                    <>
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${result.accuracy === 'perfect'
                                                ? 'bg-gradient-to-br from-orange-500 to-white'
                                                : 'bg-gradient-to-br from-orange-300 to-orange-500/50'
                                            } shadow-lg`}>
                                            <span className="text-3xl">{result.accuracy === 'perfect' ? '🎯' : '✓'}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">
                                            {result.accuracy === 'perfect' ? 'Perfect!' : 'Close!'}
                                        </h3>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3 border border-orange-500/30/30">
                                            <div className="flex items-center justify-center gap-2 text-lg text-zinc-300 mb-2">
                                                <span className="text-zinc-500">Target:</span>
                                                <span className="font-bold text-orange-400">{question.targetBPM} BPM</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-lg text-zinc-300">
                                                <span className="text-zinc-500">Your guess:</span>
                                                <span className="font-bold text-white">{userBPM} BPM</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-zinc-400 bg-surface-raised/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 inline-block">
                                            Difference: ±{result.difference} BPM
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 mb-4 shadow-lg">
                                            <span className="text-3xl">✕</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-zinc-200 mb-4">
                                            Not quite
                                        </h3>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3 border border-white/10">
                                            <div className="flex items-center justify-center gap-2 text-lg text-zinc-300 mb-2">
                                                <span className="text-zinc-500">Target:</span>
                                                <span className="font-bold text-orange-400">{question.targetBPM} BPM</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-lg text-zinc-300">
                                                <span className="text-zinc-500">Your guess:</span>
                                                <span className="font-bold text-white">{userBPM} BPM</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-zinc-400 bg-surface-raised/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10/30 inline-block">
                                            Difference: {result.difference} BPM • Need ±6 or better
                                        </div>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={handleNext}
                                className="mt-6 btn-primary w-full text-lg"
                            >
                                Next Question
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

