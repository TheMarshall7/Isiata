import React from 'react';
import type { LucideProps } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ComponentType<LucideProps>;
    subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, subtitle }) => {
    return (
        <div className="glass-card group hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-start justify-between mb-3">
                <div className="text-xs font-semibold text-zinc-600 uppercase tracking-widest group-hover:text-orange-400 transition-colors duration-300">
                    {title}
                </div>
                {Icon && (
                    <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30 group-hover:shadow-md transition-all duration-300">
                        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                    </div>
                )}
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">
                {value}
            </div>
            {subtitle && (
                <div className="text-xs text-zinc-500 mt-2">
                    {subtitle}
                </div>
            )}
        </div>
    );
};
