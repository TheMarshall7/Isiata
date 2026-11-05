import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface Option {
    id: string;
    name: string;
    /** Optional secondary label shown at the right of the tile. */
    hint?: string;
}

interface AnswerGridProps {
    options: Option[];
    onSelect: (id: string) => void;
    disabled: boolean;
    correctId?: string | null;
    selectedId?: string | null;
    compact?: boolean;
}

/** Answer tiles with number-key shortcuts (1–9) and dark-theme result states. */
export const AnswerGrid: React.FC<AnswerGridProps> = ({
    options,
    onSelect,
    disabled,
    correctId,
    selectedId,
    compact = false,
}) => {
    useEffect(() => {
        if (disabled) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const t = e.target as HTMLElement | null;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
            const n = parseInt(e.key, 10);
            if (n >= 1 && n <= Math.min(9, options.length)) {
                e.preventDefault();
                onSelect(options[n - 1].id);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [disabled, options, onSelect]);

    const answered = Boolean(selectedId && correctId);
    const cols = options.length > 6 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2';

    return (
        <div className={`grid ${cols} w-full mx-auto ${compact ? 'max-w-xl gap-2 sm:gap-2.5' : 'max-w-2xl gap-3 p-1'}`}>
            {options.map((option, i) => {
                const isSelected = selectedId === option.id;
                const isCorrect = correctId === option.id;
                let state = '';
                if (answered) {
                    if (isSelected && isCorrect) state = 'is-correct';
                    else if (isSelected) state = 'is-wrong';
                    else if (isCorrect) state = 'is-reveal';
                    else state = 'is-dim';
                }

                return (
                    <button
                        key={option.id}
                        onClick={() => onSelect(option.id)}
                        disabled={disabled}
                        className={`et-answer ${state} ${compact ? 'h-12 sm:h-[3.25rem] text-sm' : 'h-14 lg:h-16 text-sm lg:text-base'}`}
                    >
                        {i < 9 && (
                            <span className={`et-keycap shrink-0 ${state ? 'opacity-0' : ''}`} aria-hidden>
                                {i + 1}
                            </span>
                        )}
                        <span className="flex-1 truncate">{option.name}</span>
                        {option.hint && !state && (
                            <span className="shrink-0 text-[10px] tabular-nums tracking-wide text-zinc-500">{option.hint}</span>
                        )}
                        {state === 'is-correct' || state === 'is-reveal' ? (
                            <Check className="h-4 w-4 shrink-0 text-green-400" strokeWidth={2.5} />
                        ) : state === 'is-wrong' ? (
                            <X className="h-4 w-4 shrink-0 text-red-400" strokeWidth={2.5} />
                        ) : null}
                    </button>
                );
            })}
        </div>
    );
};
