import React from 'react';
import Link from 'next/link';
import { trainerLogoSrc } from '../lib/logo';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full shrink-0 border-t border-white/10 bg-surface/95 backdrop-blur-sm relative z-20">
            <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                        <div className="flex items-center gap-2 group">
                            <img
                                src={trainerLogoSrc}
                                alt="ISIATA"
                                className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-md"
                            />
                            <span className="text-sm font-oswald uppercase tracking-widest text-white">ISIATA</span>
                        </div>
                        <Link
                            href="/tools"
                            className="text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                        >
                            ← Back to Tools
                        </Link>
                    </div>
                    <div className="text-xs text-zinc-500">
                        © {currentYear} ISIATA. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};
