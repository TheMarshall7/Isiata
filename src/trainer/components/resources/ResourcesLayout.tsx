import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ResourceCategory } from '../../types/resources';
import { BrandLogo } from '../BrandLogo';
import { AppInfo } from '../AppInfo';
import { TrainerAmbientBackground } from '../TrainerAmbientBackground';

interface ResourcesLayoutProps {
    children: React.ReactNode;
    category?: ResourceCategory;
}

const categories: { id: ResourceCategory; label: string }[] = [
    { id: 'scales', label: 'Scales' },
    { id: 'intervals', label: 'Intervals' },
    { id: 'chords', label: 'Chords' },
    { id: 'progressions', label: 'Progressions' },
    { id: 'melodies', label: 'Melodies' },
    { id: 'scaleExercises', label: 'Scale Exercises' }
];

export const ResourcesLayout: React.FC<ResourcesLayoutProps> = ({ children, category }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isOverview = location.pathname === '/resources' || location.pathname === '/resources/';

    return (
        <div className="min-h-screen bg-background text-white relative flex flex-col">
            <TrainerAmbientBackground orbs={false} />

            {/* Top bar */}
            <header className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-5 lg:px-8 lg:pt-7">
                <BrandLogo />
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-zinc-400 backdrop-blur-sm transition-colors hover:border-[#d8aa67]/40 hover:text-zinc-100"
                >
                    <span>←</span> Train
                </button>
            </header>

            {/* Header */}
            <div className="relative z-10 px-4 pb-6 pt-10 lg:px-8 lg:pt-12">
                <div className="mx-auto max-w-6xl">
                    <div className="et-label">Ear Mastery · Library</div>
                    <h1 className="mt-3 font-display text-4xl uppercase leading-none text-gold lg:text-6xl">
                        <span className="et-gold-text">Resources</span>
                    </h1>
                    <p className="mt-3 max-w-xl text-sm text-zinc-400 lg:text-base">
                        Hear how every interval, chord and scale sounds before you train it.
                    </p>

                    {/* Category tabs */}
                    <nav className="-mx-4 mt-8 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0">
                        <div className="inline-flex min-w-max gap-1 rounded-full border border-white/[0.07] bg-black/40 p-1 backdrop-blur-sm">
                            {[{ id: 'overview', label: 'Overview' }, ...categories].map((cat) => {
                                const active = cat.id === 'overview' ? isOverview : category === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => navigate(cat.id === 'overview' ? '/resources' : `/resources/${cat.id}`)}
                                        aria-current={active ? 'page' : undefined}
                                        className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                                            active
                                                ? 'bg-gradient-to-b from-[#f0c681] to-[#b88a48] text-[#1a1208] shadow-[0_6px_20px_-8px_rgba(240,198,129,0.7)]'
                                                : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 px-4 pb-12 lg:px-8">
                <div className="mx-auto max-w-6xl">{children}</div>
            </div>

            <div className="relative z-10 px-4 pb-6 pt-4">
                <div className="mx-auto flex max-w-6xl justify-center">
                    <AppInfo />
                </div>
            </div>
        </div>
    );
};
