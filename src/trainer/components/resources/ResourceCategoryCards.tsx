import React from 'react';
import type { ResourceCategory } from '../../types/resources';
import { useNavigate } from 'react-router-dom';

interface CategoryCard {
    id: ResourceCategory;
    title: string;
    description: string;
    icon: React.ReactNode;
    count: number;
}

interface ResourceCategoryCardsProps {
    categories: CategoryCard[];
}

export const ResourceCategoryCards: React.FC<ResourceCategoryCardsProps> = ({ categories }) => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId: ResourceCategory) => {
        navigate(`/resources/${categoryId}`);
    };

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="et-hairline et-anim-rise group relative overflow-hidden rounded-2xl bg-[#0b0a09]/85 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#141210]/95 hover:shadow-[0_18px_50px_-20px_rgba(216,170,103,0.55)]"
                    style={{ animationDelay: `${i * 50}ms` }}
                >
                    <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#f0c681]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#f0c681]/15" />
                    <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d8aa67]/30 bg-gradient-to-br from-[#d8aa67]/20 to-transparent text-[#f0c681] transition-colors duration-300 group-hover:border-[#f0c681]/60 [&_svg]:h-5 [&_svg]:w-5">
                            {category.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-zinc-100 transition-colors group-hover:text-[#fff3dc]">{category.title}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-zinc-500">{category.description}</p>
                            <span className="mt-3 inline-flex rounded-full border border-white/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                                {category.count} {category.count === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0 text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#f0c681]">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </div>
                </button>
            ))}
        </div>
    );
};
