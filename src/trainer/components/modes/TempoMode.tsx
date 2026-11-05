import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { generateTempoQuestion, checkTempoAnswer, type TempoQuestion } from '../../logic/trainers/tempoTrainer';
import { audioEngine } from '../../audio/audioEngine';
import { loadClickSound } from '../../audio/sampleLoader';
import { Minus, Plus, Hand, Check, X } from 'lucide-react';
import { RoundControls } from '../RoundControls';
import { ProgressMeter } from '../ProgressMeter';
import { ParticleEffect } from '../ParticleEffect';
import { BrandLogo } from '../BrandLogo';
import { TrainerAmbientBackground } from '../TrainerAmbientBackground';
import { TrainerOverlayTextures } from '../TrainerOverlayTextures';
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

    // ── Tap tempo ────────────────────────────────────────────
    const tapsRef = useRef<number[]>([]);
    const [tapFlash, setTapFlash] = useState(0);
    const handleTap = useCallback(() => {
        if (checking || !question) return;
        const now = performance.now();
        const taps = tapsRef.current.filter((t) => now - t < 2000);
        taps.push(now);
        tapsRef.current = taps.slice(-8);
        setTapFlash((n) => n + 1);
        if (tapsRef.current.length >= 2) {
            const t = tapsRef.current;
            const avg = (t[t.length - 1] - t[0]) / (t.length - 1);
            const bpm = Math.round(60000 / avg);
            setUserBPM(Math.max(question.minBPM, Math.min(question.maxBPM, bpm)));
        }
    }, [checking, question]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement | null;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
            if ((e.key === 't' || e.key === 'T') && !e.repeat) {
                e.preventDefault();
                handleTap();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleTap]);

    if (!question) return <div className="p-8 text-center">Loading...</div>;

    const step = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 5 : 1;
    const pct = ((userBPM - question.minBPM) / (question.maxBPM - question.minBPM)) * 100;
    const nudge = (dir: 1 | -1) => setUserBPM((b) => Math.max(question.minBPM, Math.min(question.maxBPM, b + dir * step)));

    return (
        <div className="min-h-screen bg-background text-white relative flex flex-col">
            <TrainerAmbientBackground orbs={false} />
            <TrainerOverlayTextures />

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-50 flex items-center gap-2">
                <BrandLogo showText={false} />
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-1 text-zinc-500 hover:text-zinc-300 font-medium text-[10px] sm:text-xs transition-all duration-200 border border-white/10 hover:border-white/20 rounded-full px-2.5 py-1 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                    <span>Home</span>
                </button>
            </div>

            <div className="relative z-10 flex flex-col items-center pt-8 sm:pt-10 flex-1">
                <div className="w-full max-w-4xl px-4 flex justify-center mt-5 mb-4 shrink-0">
                    <div className="flex items-center gap-2 rounded-full border border-[#d8aa67]/25 bg-black/40 px-3 py-1 backdrop-blur-sm">
                        <span className="font-display text-[11px] uppercase tracking-[0.2em] text-[#f0dfc8]">Tempo</span>
                        <span className="h-1 w-1 rounded-full bg-[#d8aa67]/60" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{difficulty}</span>
                    </div>
                </div>

                <ProgressMeter current={runProgress + 1} total={10} streak={streak} level={state.level} xp={state.xp} compact />
                <ParticleEffect trigger={showParticles} />

                <div className="w-full max-w-2xl flex-1 flex flex-col items-center gap-8 px-4 pb-6 pt-[clamp(1.5rem,8vh,5rem)]">
                    <div className="trainer-card w-full max-w-xl mx-auto pt-5 pb-2">
                        <div className="relative z-[2] text-center et-label !text-[#a89a85]">Listen to the click</div>
                        <RoundControls onPlay={playMetronome} onReplay={playMetronome} isPlaying={isPlaying} label="Play metronome" />
                    </div>

                    <div className="glass-card w-full max-w-xl mx-auto !p-5 sm:!p-6">
                        <div className="relative z-[2]">
                            <div className="et-label">Your tempo</div>

                            {/* BPM readout with a beat light that pulses at your guess */}
                            <div className="mt-4 flex items-center justify-center gap-5 sm:gap-8">
                                <button
                                    onClick={() => nudge(-1)}
                                    disabled={checking || userBPM <= question.minBPM}
                                    aria-label="Decrease BPM"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8aa67]/30 text-[#f0c681] transition-all hover:border-[#f0c681]/70 hover:bg-[#d8aa67]/10 active:scale-90 disabled:opacity-30"
                                >
                                    <Minus className="h-5 w-5" />
                                </button>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-3">
                                        <span
                                            key={userBPM}
                                            className="h-2.5 w-2.5 rounded-full bg-[#f0c681]"
                                            style={{ animation: `et-beat ${(60 / userBPM).toFixed(3)}s ease-out infinite`, boxShadow: '0 0 12px rgba(240,198,129,0.8)' }}
                                            title="Pulses at your guess"
                                        />
                                        <span className="et-gold-text font-display text-6xl tabular-nums leading-none sm:text-7xl">{userBPM}</span>
                                    </div>
                                    <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-zinc-500">BPM</span>
                                </div>
                                <button
                                    onClick={() => nudge(1)}
                                    disabled={checking || userBPM >= question.maxBPM}
                                    aria-label="Increase BPM"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8aa67]/30 text-[#f0c681] transition-all hover:border-[#f0c681]/70 hover:bg-[#d8aa67]/10 active:scale-90 disabled:opacity-30"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-6">
                                <input
                                    type="range"
                                    min={question.minBPM}
                                    max={question.maxBPM}
                                    step={step}
                                    value={userBPM}
                                    onChange={(e) => setUserBPM(parseInt(e.target.value))}
                                    disabled={checking}
                                    className="et-slider w-full"
                                    style={{ background: `linear-gradient(90deg, #6b4e2a 0%, #d8aa67 ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }}
                                    aria-label="BPM"
                                />
                                <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-zinc-600">
                                    <span>{question.minBPM}</span>
                                    <span>{question.maxBPM}</span>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                                <button
                                    onClick={handleTap}
                                    disabled={checking}
                                    className="relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#d8aa67]/30 bg-[#d8aa67]/[0.06] py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f0dfc8] transition-all hover:border-[#f0c681]/60 active:scale-[0.98] disabled:opacity-40"
                                >
                                    <span key={tapFlash} className="pointer-events-none absolute inset-0 bg-[#f0c681]/25" style={{ animation: 'et-tap 0.4s ease-out both' }} />
                                    <Hand className="h-4 w-4" /> Tap tempo
                                    <span className="et-keycap hidden sm:inline-flex">T</span>
                                </button>
                                <input
                                    type="number"
                                    min={question.minBPM}
                                    max={question.maxBPM}
                                    value={userBPM}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val) && val >= question.minBPM && val <= question.maxBPM) setUserBPM(val);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                    disabled={checking}
                                    aria-label="Type a BPM"
                                    className="w-24 rounded-xl border border-white/[0.08] bg-black/40 px-3 text-center text-base font-semibold tabular-nums text-zinc-100 focus:border-[#d8aa67]/60 focus:outline-none"
                                />
                            </div>

                            {!checking && (
                                <button onClick={handleSubmit} className="btn-primary mt-5 w-full">
                                    Lock in {userBPM} BPM
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {checking && result && (
                    <div className="trainer-next-bar p-4 sm:p-6 flex flex-col items-center animate-slide-up">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${result.correct ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                                {result.correct ? <Check className="h-4 w-4" strokeWidth={3} /> : <X className="h-4 w-4" strokeWidth={3} />}
                            </span>
                            <span className={result.correct ? 'text-green-300' : 'text-red-300'}>
                                {result.correct ? (result.accuracy === 'perfect' ? 'Perfect tempo' : 'Close enough') : 'Not quite. Streak reset.'}
                            </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs">
                            <span className="rounded-full border border-[#d8aa67]/40 bg-[#d8aa67]/10 px-3 py-1 text-[#f0c681]">Target {question.targetBPM}</span>
                            <span className="rounded-full border border-white/10 px-3 py-1 text-zinc-300">You {userBPM}</span>
                            <span className="text-zinc-500">±{result.difference} BPM</span>
                        </div>
                        <button onClick={handleNext} className="btn-primary mt-4 w-full max-w-md text-base sm:text-lg">
                            Next Question
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};
