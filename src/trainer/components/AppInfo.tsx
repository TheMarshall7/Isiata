/**
 * App Info Component
 * 
 * Displays app information in a premium translucent popup on hover.
 * Matches the site's glass-card styling with gradient accents.
 */

import React, { useState } from 'react';
import { trainerLogoSrc } from '../lib/logo';

export const AppInfo: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="text-xs text-zinc-500 hover:text-white transition-all duration-300 cursor-default font-medium tracking-wide">
                App Info
            </button>
            
            {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-5 bg-surface-raised backdrop-blur-2xl rounded-2xl border border-white/10 depth-shadow-lg z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-t-2xl"></div>
                    
                    <div className="absolute top-3 right-3 z-10">
                        <img 
                            src={trainerLogoSrc} 
                            alt="ISIATA" 
                            className="w-10 h-10 object-contain opacity-90 drop-shadow-md"
                        />
                    </div>
                    
                    <div className="relative text-xs space-y-3">
                        <div className="mb-3 pb-3 border-b border-white/10">
                            <div className="font-oswald uppercase text-base text-white tracking-tight mb-1">
                                Master Your Ear
                            </div>
                            <div className="text-xs text-zinc-500 font-medium">
                                Ear Training Platform
                            </div>
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-500 font-medium min-w-[80px]">Version:</span>
                                <span className="text-white font-semibold">1.0</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-500 font-medium min-w-[80px]">Created by:</span>
                                <span className="text-zinc-200 font-semibold">Brian Marshall</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-500 font-medium min-w-[80px]">Hosted by:</span>
                                <span className="text-zinc-200 font-semibold">ISIATA</span>
                            </div>
                        </div>
                        <div className="pt-3 mt-3 border-t border-white/10">
                            <div className="text-zinc-500 text-[10px] leading-relaxed">
                                <div className="font-medium text-zinc-400 mb-1">Built with:</div>
                                <div className="font-mono text-[9px] tracking-wider text-zinc-600">
                                    React 19.2 • Vite 7.2 • TypeScript 5.9
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                        <div className="w-3 h-3 bg-surface-raised border-r border-b border-white/10 rotate-45"></div>
                    </div>
                </div>
            )}
        </div>
    );
};
