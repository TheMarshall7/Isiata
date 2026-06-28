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
                <div className="flex items-center gap-2 bg-surface-raised/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                    <span className="text-sm font-medium text-zinc-300 px-2">Direction:</span>
                    <button
                        onClick={() => onIntervalDirectionChange('asc')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            intervalDirection === 'asc'
                                ? 'bg-orange-500 text-black shadow-md'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                    >
                        Ascending
                    </button>
                    <button
                        onClick={() => onIntervalDirectionChange('desc')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            intervalDirection === 'desc'
                                ? 'bg-orange-500 text-black shadow-md'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                    >
                        Descending
                    </button>
                </div>
            )}

            {showDifficultyFilter && (
                <div className="flex items-center gap-2 bg-surface-raised/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                    <span className="text-sm font-medium text-zinc-300 px-2">Difficulty:</span>
                    <select
                        value={difficultyFilter}
                        onChange={(e) => onDifficultyFilterChange(e.target.value as Difficulty | 'all')}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-surface-raised border border-white/10 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        className="w-full px-4 py-2 rounded-lg text-sm bg-surface-raised/50 backdrop-blur-sm border border-white/10 text-zinc-300 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            )}
        </div>
    );
};
