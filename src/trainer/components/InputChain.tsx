import React from 'react';

interface InputChainProps {
    degrees: number[];
    onClear: () => void;
    disabled: boolean;
}

export const InputChain: React.FC<InputChainProps> = ({
    degrees,
    onClear,
    disabled
}) => {
    if (degrees.length === 0) {
        return (
            <div className="text-center py-4 text-zinc-600 text-sm">
                Tap degrees in order
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <div className="text-zinc-400 text-sm font-medium mr-2">Your Answer:</div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {degrees.map((degree, index) => (
                    <React.Fragment key={index}>
                        <span className="bg-surface-raised border-2 border-white/10 rounded-lg px-4 py-2 text-lg font-bold text-white min-w-[3rem] text-center">
                            {degree}
                        </span>
                        {index < degrees.length - 1 && (
                            <span className="text-zinc-600 text-xl">→</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
            {degrees.length > 0 && (
                <button
                    onClick={onClear}
                    disabled={disabled}
                    className="ml-4 px-3 py-1 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-stone-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Clear
                </button>
            )}
        </div>
    );
};
