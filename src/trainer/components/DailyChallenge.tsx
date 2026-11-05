import React from 'react';
import { Check, Flame, Gauge, Star, Target } from 'lucide-react';
import type { DailyChallenge } from '../logic/dailyChallenges';

const TYPE_ICON = {
    questions: Target,
    streak: Flame,
    perfect: Star,
    time: Gauge,
    difficulty: Gauge,
} as const;

interface DailyChallengeProps {
    challenge: DailyChallenge;
    index: number;
}

export const DailyChallengeCard: React.FC<DailyChallengeProps> = ({ challenge, index }) => {
    const pct = Math.min(100, (challenge.progress / challenge.target) * 100);
    const Icon = TYPE_ICON[challenge.type] ?? Target;
    const size = 40;
    const r = 17;
    const c = 2 * Math.PI * r;

    return (
        <div
            className={`et-anim-rise flex items-center gap-3 rounded-xl border p-3 transition-colors duration-300 ${
                challenge.completed ? 'border-green-500/30 bg-green-950/20' : 'border-white/[0.07] bg-white/[0.02] hover:border-[#d8aa67]/30'
            }`}
            style={{ animationDelay: `${index * 70}ms` }}
        >
            <div className="relative shrink-0" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    <circle cx={20} cy={20} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={2.5} />
                    <circle
                        cx={20}
                        cy={20}
                        r={r}
                        fill="none"
                        stroke={challenge.completed ? '#4ade80' : '#d8aa67'}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeDasharray={c}
                        strokeDashoffset={c * (1 - pct / 100)}
                        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center">
                    {challenge.completed ? (
                        <Check className="h-4 w-4 text-green-400" strokeWidth={3} />
                    ) : (
                        <Icon className="h-4 w-4 text-[#d8aa67]" strokeWidth={1.75} />
                    )}
                </span>
            </div>
            <div className="min-w-0 flex-1">
                <div className={`text-xs font-medium leading-snug ${challenge.completed ? 'text-zinc-500 line-through decoration-zinc-600' : 'text-zinc-200'}`}>
                    {challenge.description}
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] tabular-nums">
                    <span className="text-zinc-500">
                        {challenge.progress}/{challenge.target}
                    </span>
                    <span className={challenge.completed ? 'text-green-400/80' : 'text-[#f0c681]'}>+{challenge.reward.xp} XP</span>
                </div>
            </div>
        </div>
    );
};

interface DailyChallengesProps {
    challenges: DailyChallenge[];
}

export const DailyChallenges: React.FC<DailyChallengesProps> = ({ challenges }) => {
    if (challenges.length === 0) return null;
    const completedCount = challenges.filter((c) => c.completed).length;

    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <h3 className="et-label">Today&apos;s challenges</h3>
                <span className="flex items-center gap-1.5">
                    {challenges.map((c) => (
                        <span key={c.id} className={`h-1.5 w-4 rounded-full ${c.completed ? 'bg-green-400' : 'bg-white/10'}`} />
                    ))}
                    <span className="ml-1 text-[10px] tabular-nums text-zinc-500">
                        {completedCount}/{challenges.length}
                    </span>
                </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
                {challenges.map((challenge, index) => (
                    <DailyChallengeCard key={challenge.id} challenge={challenge} index={index} />
                ))}
            </div>
        </div>
    );
};
