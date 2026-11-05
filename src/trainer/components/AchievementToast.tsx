/**
 * Achievement Toast Component
 * 
 * Displays achievement unlock notifications with premium icons.
 * Stays visible longer on mobile and allows tap-to-dismiss.
 */

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Achievement } from '../logic/achievements';
import { Trophy, Star, BookOpen, GraduationCap, Crown, Calendar, CalendarDays, Music, Piano, Music2, Flame, Gift } from 'lucide-react';

interface AchievementToastProps {
    achievement: Achievement | null;
    onClose: () => void;
}

// Map achievement icons to premium Lucide icons
const getAchievementIcon = (achievement: Achievement) => {
    const iconMap: Record<string, React.ReactNode> = {
        'streak_5': <Flame className="w-8 h-8 text-orange-400" />,
        'streak_10': <Flame className="w-8 h-8 text-orange-500" />,
        'streak_25': <Flame className="w-8 h-8 text-red-500" />,
        'streak_50': <Flame className="w-8 h-8 text-red-600" />,
        'streak_100': <Flame className="w-8 h-8 text-red-700" />,
        'total_50': <BookOpen className="w-8 h-8 text-blue-400" />,
        'total_100': <BookOpen className="w-8 h-8 text-blue-500" />,
        'total_500': <GraduationCap className="w-8 h-8 text-orange-500" />,
        'total_1000': <Crown className="w-8 h-8 text-yellow-500" />,
        'perfect_1': <Star className="w-8 h-8 text-yellow-400" />,
        'perfect_5': <Star className="w-8 h-8 text-yellow-500" />,
        'perfect_10': <Star className="w-8 h-8 text-yellow-600" />,
        'mode_interval_100': <Music className="w-8 h-8 text-green-500" />,
        'mode_chord_100': <Piano className="w-8 h-8 text-indigo-500" />,
        'mode_progression_100': <Music2 className="w-8 h-8 text-pink-500" />,
        'daily_7': <Calendar className="w-8 h-8 text-cyan-500" />,
        'daily_30': <CalendarDays className="w-8 h-8 text-teal-500" />,
        'mystery_platinum_gift': <Gift className="w-8 h-8 text-yellow-400" />,
    };
    
    return iconMap[achievement.id] || <Trophy className="w-8 h-8 text-yellow-500" />;
};

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleDismiss = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setIsVisible(false);
        setTimeout(() => {
            onClose();
            // If it's the Mystery Platinum Gift, navigate to the special page
            if (achievement?.id === 'mystery_platinum_gift') {
                navigate('/platinum-gift');
            }
        }, 300);
    };

    useEffect(() => {
        if (achievement) {
            setIsVisible(true);
            // Longer display time: 4000ms (4 seconds) for better visibility on mobile
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Wait for fade out
            }, 4000);
            return () => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
            };
        }
    }, [achievement, onClose]);

    if (!achievement || !isVisible) return null;

    const isPlatinumGift = achievement.id === 'mystery_platinum_gift';

    return (
        <div
            className="fixed left-1/2 top-16 z-[65] w-[min(92vw,380px)] -translate-x-1/2 cursor-pointer sm:left-auto sm:right-5 sm:top-5 sm:translate-x-0 animate-fade-in"
            onClick={handleDismiss}
            role="status"
        >
            <div
                className={`et-hairline overflow-hidden rounded-2xl bg-[#0b0a09]/95 p-3.5 shadow-[0_20px_60px_-15px_rgba(216,170,103,0.45)] backdrop-blur-md ${isPlatinumGift ? 'ring-1 ring-[#f0c681]/60' : ''}`}
                data-active="true"
            >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d8aa67]/15 blur-2xl" />
                <div className="relative flex items-center gap-3.5">
                    <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full [&_svg]:!h-6 [&_svg]:!w-6 [&_svg]:!text-[#1a1208]"
                        style={{
                            background: 'radial-gradient(circle at 30% 25%, #fff1d6 0%, #f0c681 25%, #d8aa67 55%, #6b4e2a 100%)',
                            boxShadow: '0 0 24px -4px rgba(240,198,129,0.6)',
                        }}
                    >
                        {getAchievementIcon(achievement)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a89a85]">
                            {isPlatinumGift ? 'Special achievement' : 'Achievement unlocked'}
                        </div>
                        <div className="et-gold-text mt-0.5 truncate font-display text-base uppercase tracking-[0.08em]">{achievement.name}</div>
                        <div className="mt-0.5 text-xs text-zinc-400">{achievement.description}</div>
                        {isPlatinumGift && <div className="mt-1 text-[11px] text-[#f0c681]">Tap to claim 25% off the drum bundle</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};
