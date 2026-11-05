import React from 'react';
import type { IntervalDirection, Difficulty } from '../../types/resources';

interface ResourceFiltersProps {
    category: 'scales' | 'intervals' | 'chords' | 'progressions' | 'melodies' | 'scaleExercises';
    intervalDirection: IntervalDirection;
    onIntervalDirectionChange: (direction: IntervalDirection) => void;
    difficultyFilter: Difficulty | 'all';
    onDifficultyFilterChange: (difficulty: Difficulty | 'all') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
    category,
    intervalDirection,
    onIntervalDirectionChange,
    difficultyFilter,
    onDifficultyFilterChange,
    searchQuery,
    onSearchChange
}) => {
    const showIntervalToggle = category === 'intervals';
    const showDifficultyFilter = category === 'scales' || category === 'melodies' || category === 'progressions' || category === 'scaleExercises';
    const showSearch = category !== 'intervals';

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 px-4 lg:px-0">
            {showIntervalToggle && (
                <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/40 p-1 backdrop-blur-sm">
                    <span className="et-label px-3">Direction:</span>
                    <button
                        onClick={() => onIntervalDirectionChange('asc')}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                            intervalDirection === 'asc'
                                ? 'bg-gradient-to-b from-[#f0c681] to-[#b88a48] text-[#1a1208] shadow-md'
                                : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
                        }`}
                    >
                        Ascending
                    </button>
                    <button
                        onClick={() => onIntervalDirectionChange('desc')}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                            intervalDirection === 'desc'
                                ? 'bg-gradient-to-b from-[#f0c681] to-[#b88a48] text-[#1a1208] shadow-md'
                                : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
                        }`}
                    >
                        Descending
                    </button>
                </div>
            )}

            {showDifficultyFilter && (
                <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/40 p-1 backdrop-blur-sm">
                    <span className="et-label px-3">Difficulty:</span>
                    <select
                        value={difficultyFilter}
                        onChange={(e) => onDifficultyFilterChange(e.target.value as Difficulty | 'all')}
                        className="rounded-full bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-200 [&>option]:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#d8aa67]/60"
                    >
                        <option value="all">All</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            )}

            {showSearch && (
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-full px-5 py-2.5 text-sm bg-black/40 backdrop-blur-sm border border-white/[0.07] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#d8aa67]/60"
                    />
                </div>
            )}
        </div>
    );
};
