import React from 'react';

interface Option {
    id: string;
    name: string;
}

interface AnswerGridProps {
    options: Option[];
    onSelect: (id: string) => void;
    disabled: boolean;
    correctId?: string | null;
    selectedId?: string | null;
    compact?: boolean;
}

export const AnswerGrid: React.FC<AnswerGridProps> = ({
    options,
    onSelect,
    disabled,
    correctId,
    selectedId,
    compact = false,
}) => {
    return (
        <div className={`grid grid-cols-2 w-full max-w-xl mx-auto ${compact ? 'gap-2 p-1' : 'gap-4 max-w-2xl p-4 md:grid-cols-2'}`}>
            {options.map((option) => {
                let statusClass = "bg-surface-raised/80 backdrop-blur-sm border-2 border-white/20 text-zinc-300 hover:border-orange-500 hover:text-orange-400 hover:bg-white/10 shadow-sm";

                if (selectedId === option.id) {
                    if (correctId === option.id) {
                        statusClass = "bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-400 text-green-700 font-bold shadow-lg shadow-green-500/20";
                    } else if (correctId !== null) {
                        statusClass = "bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-300 text-red-600 shadow-md";
                    } else {
                        // Selected but not validated yet (immediate feedback usually comes with validation)
                        statusClass = "bg-white/10 border-2 border-orange-500 text-orange-400 font-semibold shadow-md";
                    }
                }

                // Show correct answer if wrong one was picked
                if (selectedId && correctId === option.id && selectedId !== option.id) {
                    statusClass = "bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-300 text-green-700 shadow-md";
                }

                return (
                    <button
                        key={option.id}
                        onClick={() => onSelect(option.id)}
                        disabled={disabled}
                        className={`
              rounded-xl font-medium transition-all duration-300
              ${compact ? 'h-11 sm:h-12 text-sm' : 'h-16 lg:h-20 rounded-2xl text-base lg:text-lg'}
              ${statusClass}
              disabled:cursor-not-allowed disabled:transform-none
              active:scale-95 hover:scale-105
            `}
                    >
                        {option.name}
                    </button>
                );
            })}
        </div>
    );
};
