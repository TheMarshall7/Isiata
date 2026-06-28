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

export const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({
    currentInstrument,
    onSelectInstrument,
    disabledInstruments = []
}) => {
    return (
        <div className="glass-card hover:shadow-xl transition-all duration-300">
            <h3 className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-4">Instrument</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {instruments.map(instrument => {
                    const Icon = getInstrumentIcon(instrument.id);
                    const isSelected = currentInstrument === instrument.id;
                    const isDisabled = disabledInstruments.includes(instrument.id);
                    
                    return (
                        <button
                            key={instrument.id}
                            onClick={() => !isDisabled && onSelectInstrument(instrument.id)}
                            disabled={isDisabled}
                            className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                                isDisabled
                                    ? 'bg-white/5 text-zinc-600 opacity-50 cursor-not-allowed border border-white/20'
                                    : isSelected
                                        ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                                        : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white hover:scale-[1.08] hover:shadow-lg border border-white/20 hover:border-white/20'
                            }`}
                            title={isDisabled ? 'Not recommended for chords' : instrument.description}
                        >
                            {isSelected && !isDisabled && (
                                <div className="absolute inset-0 bg-white/20 translate-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            )}
                            <div className="flex flex-col items-center gap-2 relative">
                                <Icon 
                                    className={`w-6 h-6 group-hover:scale-110 transition-transform duration-300 ${
                                        isSelected ? 'text-black' : 'text-orange-400'
                                    }`} 
                                    strokeWidth={2} 
                                />
                                <span className="text-xs font-medium group-hover:scale-105 inline-block transition-transform duration-300">
                                    {instrument.name}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
