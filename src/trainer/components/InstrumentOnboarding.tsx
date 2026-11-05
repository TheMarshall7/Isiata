import React, { useState, useEffect } from 'react';
import { Bell, Guitar, Music } from 'lucide-react';
import { PianoIcon } from './icons/InstrumentIcons';
import { instruments } from '../config/instruments';

interface InstrumentOnboardingProps {
    onSelectInstrument: (instrumentId: string) => void;
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

export const InstrumentOnboarding: React.FC<InstrumentOnboardingProps> = ({
    onSelectInstrument
}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if user has already selected an instrument
        const hasSelected = localStorage.getItem('has_selected_instrument');
        if (!hasSelected) {
            setShow(true);
        }
    }, []);

    const handleSelect = (instrumentId: string) => {
        localStorage.setItem('has_selected_instrument', 'true');
        onSelectInstrument(instrumentId);
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="glass-card !p-6 sm:!p-8 max-w-2xl w-full animate-slide-up">
                <div className="relative z-[2] text-center mb-8">
                    <h2 className="text-3xl font-display uppercase tracking-normal text-gold mb-3">
                        Welcome to ISIATA
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Choose your instrument to get started
                    </p>
                    <p className="text-zinc-500 text-sm mt-2">
                        You can change this anytime from the home screen
                    </p>
                </div>

                <div className="relative z-[2] grid grid-cols-2 gap-3 sm:gap-4">
                    {instruments.map(instrument => {
                        const Icon = getInstrumentIcon(instrument.id);
                        
                        return (
                            <button
                                key={instrument.id}
                                onClick={() => handleSelect(instrument.id)}
                                className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 et-hairline bg-black/40 hover:-translate-y-1 hover:bg-[#d8aa67]/[0.06] hover:shadow-[0_14px_40px_-16px_rgba(216,170,103,0.5)] active:translate-y-0"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d8aa67]/20 to-transparent border border-[#d8aa67]/30 flex items-center justify-center group-hover:border-[#f0c681]/60 transition-colors duration-300">
                                        <Icon 
                                            className="w-8 h-8 text-[#f0c681] group-hover:text-white transition-colors duration-300" 
                                            strokeWidth={2} 
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-lg text-white group-hover:text-[#f0c681] transition-colors duration-300">
                                            {instrument.name}
                                        </h3>
                                        <p className="text-sm text-zinc-500 mt-1">
                                            {instrument.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
