/**
 * Frequency Mode
 *
 * Mix-engineer ear training: band-passed pink noise, guess the frequency.
 *   Easy   – pick the mix zone (wide band)
 *   Medium – pick the octave band (narrower)
 *   Hard   – drag to pinpoint on a log scale, within ⅓ octave
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Target } from 'lucide-react';
import { useGame, getLevelFromXP } from '../../context/GameContext';
import { audioEngine } from '../../audio/audioEngine';
import { Player } from '../Player';
import { AnswerGrid } from '../AnswerGrid';
import { Feedback } from '../Feedback';
import { ProgressMeter } from '../ProgressMeter';
import { ParticleEffect } from '../ParticleEffect';
import { StreakCelebration } from '../StreakCelebration';
import { CelebrationOverlay } from '../CelebrationOverlay';
import { AchievementToast } from '../AchievementToast';
import { BrandLogo } from '../BrandLogo';
import { TrainerAmbientBackground } from '../TrainerAmbientBackground';
import { TrainerOverlayTextures } from '../TrainerOverlayTextures';
import { SpectrumScale } from '../SpectrumScale';
import { recordAnswer, updateBestStreak, loadStats, saveStats } from '../../logic/statsTracker';
import { checkAchievements, loadAchievements, type Achievement } from '../../logic/achievements';
import { updateChallengeProgress, getDailyChallenges } from '../../logic/dailyChallenges';
import {
    BULLSEYE_ACCURACY,
    FREQUENCY_ZONES,
    HARD_PASS_ACCURACY,
    accuracyLabel,
    guessAccuracy,
    formatHz,
    generateFrequencyQuestion,
    octaveDistance,
    posToFreq,
    zoneFor,
    type FrequencyQuestion,
} from '../../logic/trainers/frequencyTrainer';
import { getComboMultiplier } from '../../config/modeMeta';
import type { Difficulty } from '../../types/game';

interface FrequencyModeProps {
    difficulty: Difficulty;
    streak: number;
    runProgress: number;
    onCorrect: (points: number) => void;
    onWrong: () => void;
    onNext: () => void;
}

const BASE_POINTS = 30;
const BULLSEYE_BONUS = 20;

/** Round a guess to a sensible display resolution. */
const tidy = (hz: number) => (hz < 100 ? Math.round(hz) : hz < 1000 ? Math.round(hz / 5) * 5 : Math.round(hz / 50) * 50);

export const FrequencyMode: React.FC<FrequencyModeProps> = ({ difficulty, streak, runProgress, onCorrect, onWrong, onNext }) => {
    const navigate = useNavigate();
    const { state } = useGame();
    const [question, setQuestion] = useState<FrequencyQuestion>(() => generateFrequencyQuestion(difficulty));
    const [questionKey, setQuestionKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [checking, setChecking] = useState(false);
    const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
    const [guessPos, setGuessPos] = useState(0.5);
    const [lastPoints, setLastPoints] = useState(BASE_POINTS);
    const [showParticles, setShowParticles] = useState(false);
    const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
    const [celebration, setCelebration] = useState<{ type: 'level-up' | 'perfect-run'; message: string; subtitle?: string } | null>(null);
    const playingRef = useRef(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const autoPlayedRef = useRef(false);
    const revealRef = useRef<HTMLDivElement>(null);

    const isHard = difficulty === 'hard';
    const guessHz = tidy(posToFreq(guessPos));

    useEffect(() => {
        document.title = 'Frequency Training - ISIATA';
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            audioEngine.stopAll();
        };
    }, []);

    const play = useCallback(
        async (reference = false) => {
            audioEngine.ensureUnlockedSync();
            if (playingRef.current) return;
            playingRef.current = true;
            setIsPlaying(true);
            try {
                await audioEngine.init();
                const ms = audioEngine.playFilteredNoise(reference ? null : question.frequency, question.q, reference ? 1.6 : 2.2);
                timerRef.current = setTimeout(() => {
                    playingRef.current = false;
                    setIsPlaying(false);
                }, ms + 80);
            } catch (e) {
                console.error('Frequency playback failed', e);
                playingRef.current = false;
                setIsPlaying(false);
            }
        },
        [question],
    );

    // Auto-play each new question once.
    useEffect(() => {
        if (autoPlayedRef.current || checking) return;
        const t = setTimeout(() => {
            autoPlayedRef.current = true;
            play();
        }, 650);
        return () => clearTimeout(t);
    }, [question, checking, play]);

    // Bring the spectrum reveal into view above the bottom bar (matters on phones).
    useEffect(() => {
        if (!checking) return;
        const t = setTimeout(() => revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 120);
        return () => clearTimeout(t);
    }, [checking]);

    // F plays the flat reference.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
            if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                play(true);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [play]);

    const resolve = (correct: boolean, points: number) => {
        setChecking(true);
        setWasCorrect(correct);
        let stats = loadStats();

        if (correct) {
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 100);
            const newStreak = streak + 1;
            const isPerfectRun = runProgress + 1 === 10;

            stats = recordAnswer(stats, true, 'frequency', isPerfectRun);
            stats = updateBestStreak(stats, newStreak);
            saveStats(stats);

            const unlocked = checkAchievements(loadAchievements(), {
                bestStreak: stats.bestStreak,
                totalQuestions: stats.totalQuestions,
                totalCorrect: stats.totalCorrect,
                perfectRuns: stats.perfectRuns,
                modeStats: stats.modeStats,
                dailyStreak: stats.dailyStreak,
                level: state.level,
                currentSessionQuestions: runProgress,
            });
            if (unlocked.length) setNewAchievement(unlocked[0]);

            let challenges = updateChallengeProgress(getDailyChallenges(), 'questions', 1).challenges;
            if (difficulty === 'hard') challenges = updateChallengeProgress(challenges, 'difficulty', 1).challenges;
            const streakGoal = challenges.find((c) => c.type === 'streak' && !c.completed && newStreak >= c.target);
            if (streakGoal) challenges = updateChallengeProgress(challenges, 'streak', streakGoal.target - streakGoal.progress).challenges;
            if (isPerfectRun) updateChallengeProgress(challenges, 'perfect', 1);

            const multiplier = getComboMultiplier(streak);
            const finalPoints = points * multiplier;
            const xpAfter = state.xp + Math.floor(finalPoints * (1 + streak * 0.1));
            const newLevel = getLevelFromXP(xpAfter);
            if (isPerfectRun) setCelebration({ type: 'perfect-run', message: 'Perfect Run!', subtitle: '10 out of 10 by ear' });
            else if (newLevel > state.level) setCelebration({ type: 'level-up', message: `Level ${newLevel}!`, subtitle: 'Your ears are sharpening' });

            setLastPoints(points);
            onCorrect(finalPoints);
        } else {
            stats = recordAnswer(stats, false, 'frequency');
            saveStats(stats);
            onWrong();
        }
    };

    const handleChoice = (id: string) => {
        if (checking || isHard) return;
        setSelectedId(id);
        resolve(id === question.answerId, BASE_POINTS);
    };

    const handleLockIn = () => {
        if (checking || !isHard) return;
        const acc = guessAccuracy(guessHz, question.frequency);
        // XP scales with accuracy; a bullseye adds a bonus on top.
        const points = Math.max(5, Math.round((BASE_POINTS * acc) / 100)) + (acc >= BULLSEYE_ACCURACY ? BULLSEYE_BONUS : 0);
        resolve(acc >= HARD_PASS_ACCURACY, points);
    };

    const handleNext = () => {
        audioEngine.stopAll();
        if (timerRef.current) clearTimeout(timerRef.current);
        playingRef.current = false;
        setIsPlaying(false);
        setSelectedId(null);
        setChecking(false);
        setWasCorrect(null);
        setGuessPos(0.5);
        autoPlayedRef.current = false;
        setQuestion(generateFrequencyQuestion(difficulty));
        setQuestionKey((k) => k + 1);
        onNext();
    };

    // What to show on the spectrum once answered.
    const zone = zoneFor(question.frequency);
    const revealBand: [number, number] | null =
        checking && difficulty === 'easy' ? [FREQUENCY_ZONES.find((z) => z.id === question.answerId)!.lo, FREQUENCY_ZONES.find((z) => z.id === question.answerId)!.hi] : null;
    const pickedHz =
        checking && !isHard && selectedId && difficulty === 'medium' ? Number(selectedId) : checking && isHard ? guessHz : null;
    const offBy = checking && isHard ? octaveDistance(guessHz, question.frequency) : 0;
    const accuracy = checking && isHard ? guessAccuracy(guessHz, question.frequency) : 0;

    const tierLabel = { easy: 'Find the zone', medium: 'Name the octave', hard: 'Pinpoint it' }[difficulty];

    return (
        <div className="min-h-dvh bg-background text-white relative flex flex-col trainer-play-shell">
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
                        <span className="font-display text-[11px] uppercase tracking-[0.2em] text-[#f0dfc8]">Frequencies</span>
                        <span className="h-1 w-1 rounded-full bg-[#d8aa67]/60" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{difficulty}</span>
                    </div>
                </div>

                <ProgressMeter current={runProgress + 1} total={10} streak={streak} level={state.level} xp={state.xp} compact />

                <StreakCelebration streak={streak} />
                <ParticleEffect trigger={showParticles} />
                {celebration && (
                    <CelebrationOverlay type={celebration.type} message={celebration.message} subtitle={celebration.subtitle} onComplete={() => setCelebration(null)} />
                )}
                <AchievementToast achievement={newAchievement} onClose={() => setNewAchievement(null)} />

                <div className="w-full max-w-2xl flex-1 flex flex-col items-center gap-10 sm:gap-12 px-4 pb-6 pt-[clamp(1.5rem,13vh,8rem)]">
                    {/* Listen card */}
                    <div className="trainer-card trainer-listen-card relative w-full max-w-xl mx-auto shrink-0">
                        <div className="relative z-[2] flex items-center justify-between px-1">
                            <span className="et-label !text-[#a89a85]">{tierLabel}</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-zinc-600" title="Laptop speakers can't reproduce the low end">
                                <Headphones className="h-3.5 w-3.5" /> Headphones advised
                            </span>
                        </div>
                        <Player key={questionKey} onPlay={() => play(false)} isPlaying={isPlaying} size="compact" label="Play band" />
                        <div className="relative z-[2] mt-4 flex justify-center">
                            <button
                                onClick={() => play(true)}
                                disabled={isPlaying}
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-[#d8aa67]/40 hover:text-zinc-100 disabled:opacity-40"
                            >
                                Flat reference
                                <span className="et-keycap hidden sm:inline-flex">F</span>
                            </button>
                        </div>
                    </div>

                    {/* Answer surface */}
                    {isHard ? (
                        <div className="w-full max-w-xl mx-auto">
                            <div className="mb-3 flex items-end justify-between px-1">
                                <div>
                                    <div className="et-label">Your guess</div>
                                    <div className="mt-1 font-display text-3xl tabular-nums text-[#fff3dc]">{formatHz(guessHz)}</div>
                                </div>
                                <div className="text-right text-[11px] text-zinc-500">{zoneFor(guessHz).name}</div>
                            </div>

                            <div ref={revealRef} className="scroll-mb-52" />
                            <SpectrumScale target={checking ? question.frequency : null} guess={pickedHz} correct={wasCorrect}>
                                {!checking && (
                                    <>
                                        <div className="pointer-events-none absolute inset-y-0 -translate-x-1/2" style={{ left: `${guessPos * 100}%` }}>
                                            <div className="absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 bg-gradient-to-t from-[#d8aa67]/30 to-transparent blur-md" />
                                            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[#f0c681] shadow-[0_0_12px_rgba(240,198,129,0.8)]" />
                                            <div className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f0c681] bg-[#1a1208]" />
                                        </div>
                                        <input
                                            type="range"
                                            min={0}
                                            max={1000}
                                            value={Math.round(guessPos * 1000)}
                                            onChange={(e) => setGuessPos(Number(e.target.value) / 1000)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleLockIn();
                                                }
                                            }}
                                            aria-label="Frequency guess"
                                            aria-valuetext={formatHz(guessHz)}
                                            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                                            autoFocus
                                        />
                                    </>
                                )}
                            </SpectrumScale>

                            {!checking && (
                                <button onClick={handleLockIn} className="btn-primary mt-5 w-full">
                                    <span className="flex items-center justify-center gap-2">
                                        <Target className="h-4 w-4" /> Lock in {formatHz(guessHz)}
                                    </span>
                                </button>
                            )}
                            {!checking && (
                                <p className="mt-2 hidden text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:block">
                                    Drag or use <span className="et-keycap">←</span> <span className="et-keycap">→</span> · <span className="et-keycap">Enter</span> to lock in · scored by accuracy
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <AnswerGrid
                                options={question.options}
                                onSelect={handleChoice}
                                disabled={checking}
                                selectedId={selectedId}
                                correctId={checking ? question.answerId : null}
                                compact
                            />
                            {checking && (
                                <div ref={revealRef} className="w-full max-w-xl mx-auto et-anim-float scroll-mb-52">
                                    <SpectrumScale target={question.frequency} band={revealBand} guess={pickedHz} correct={wasCorrect} />
                                </div>
                            )}
                        </>
                    )}

                    {!checking && !isHard && (
                        <div className="h-4 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                            <span className="hidden sm:inline">
                                Press <span className="et-keycap">1</span>–<span className="et-keycap">{Math.min(9, question.options.length)}</span> to answer
                            </span>
                        </div>
                    )}
                </div>

                {checking && (
                    <div className="trainer-next-bar p-4 sm:p-6 flex flex-col items-center">
                        <Feedback correct={wasCorrect} points={lastPoints} multiplier={getComboMultiplier(Math.max(0, streak - 1))} variant="toast" />
                        <p className="mt-1 max-w-md text-center text-xs text-zinc-400">
                            <span className="text-[#f0c681]">{formatHz(question.frequency)}</span>
                            {' · '}
                            {zone.name}: {zone.character.toLowerCase()}
                        </p>
                        {isHard && (
                            <div className="mt-3 w-full max-w-md">
                                <div className="flex items-baseline justify-between">
                                    <span className="et-label">Accuracy · {accuracyLabel(accuracy)}</span>
                                    <span className={`font-display text-2xl tabular-nums ${accuracy >= HARD_PASS_ACCURACY ? 'et-gold-text' : accuracy >= 55 ? 'text-[#d8c3a4]' : 'text-red-300'}`}>
                                        {accuracy}%
                                    </span>
                                </div>
                                <div className="relative mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                                    <div
                                        className={`h-full rounded-full transition-[width] duration-700 ${accuracy >= HARD_PASS_ACCURACY ? 'brand-progress-fill' : accuracy >= 55 ? 'bg-[#a67c3d]' : 'bg-red-400/70'}`}
                                        style={{ width: `${accuracy}%` }}
                                    />
                                    <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: `${HARD_PASS_ACCURACY}%` }} title="Pass line" />
                                </div>
                                <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
                                    <span>{offBy < 0.02 ? 'Dead on' : `${offBy.toFixed(2)} octaves ${guessHz > question.frequency ? 'high' : 'low'}`}</span>
                                    <span>{accuracy >= BULLSEYE_ACCURACY ? '+20 bullseye bonus' : `${HARD_PASS_ACCURACY}% to keep your streak`}</span>
                                </div>
                            </div>
                        )}
                        <button onClick={handleNext} className="btn-primary mt-3 w-full max-w-md text-base sm:text-lg">
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
