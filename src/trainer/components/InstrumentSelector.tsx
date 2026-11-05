import React from 'react';
import { instruments } from '../config/instruments';
import { Bell, Guitar, Music } from 'lucide-react';
import { PianoIcon } from './icons/InstrumentIcons';

interface InstrumentSelectorProps {
    currentInstrument: string;
    onSelectInstrument: (instrumentId: string) => void;
    disabledInstruments?: string[];
}

const getInstrumentIcon = (id: string) => {
    switch (id) {
        case 'bell':
            return Bell;
        case 'guitar':
            return Guitar;
        case 'bass':
            return Music;
        case 'piano':
        default:
            return PianoIcon;
    }
};

/** Four-up instrument picker, sized to sit inside the session setup panel. */
export const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({
    currentInstrument,
    onSelectInstrument,
    disabledInstruments = [],
}) => (
    <div className="grid grid-cols-4 gap-1.5">
        {instruments.map((instrument) => {
            const Icon = getInstrumentIcon(instrument.id);
            const isSelected = currentInstrument === instrument.id;
            const isDisabled = disabledInstruments.includes(instrument.id);

            return (
                <button
                    key={instrument.id}
                    onClick={() => !isDisabled && onSelectInstrument(instrument.id)}
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    title={isDisabled ? 'Not available for chord-based modes' : instrument.description}
                    className={`group flex flex-col items-center gap-1.5 rounded-xl border py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                        isDisabled
                            ? 'cursor-not-allowed border-white/5 text-zinc-700'
                            : isSelected
                                ? 'border-[#f0c681]/70 bg-[#d8aa67]/[0.12] text-[#fff3dc] shadow-[0_0_20px_-8px_rgba(240,198,129,0.6)]'
                                : 'border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:border-[#d8aa67]/40 hover:text-zinc-200'
                    }`}
                >
                    <Icon
                        className={`h-[18px] w-[18px] transition-transform duration-300 ${isSelected ? 'text-[#f0c681]' : ''} ${!isDisabled ? 'group-hover:scale-110' : ''}`}
                        strokeWidth={1.75}
                    />
                    {instrument.name}
                </button>
            );
        })}
    </div>
);
