import React from 'react';
import { findLlmProfileByName } from '../../data/llmProfiles';
import { Link } from 'react-router-dom';
import { Bot, ChevronRight } from 'lucide-react';

interface LlmTooltipProps {
    name: string; // The text to display in the paragraph
    children?: React.ReactNode;
}

export function LlmTooltip({ name, children }: LlmTooltipProps) {
    const profile = findLlmProfileByName(name);
    const displayText = children || name;

    if (!profile) {
        // Если профиль не найден (опечатка или старая модель), рендерим просто текст
        return <span className="font-semibold">{displayText}</span>;
    }

    // Определение цвета для акцентов
    const colorStyles: Record<string, string> = {
        amber: 'text-amber-400 bg-amber-400/10 ring-amber-400/30',
        blue: 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
        emerald: 'text-emerald-400 bg-emerald-400/10 ring-emerald-400/30',
        green: 'text-green-400 bg-green-400/10 ring-green-400/30',
        red: 'text-red-400 bg-red-400/10 ring-red-400/30',
        teal: 'text-teal-400 bg-teal-400/10 ring-teal-400/30',
        slate: 'text-slate-400 bg-slate-400/10 ring-slate-400/30',
    };

    const iconColor = colorStyles[profile.color] || colorStyles.slate;

    return (
        <span className="relative inline-block group cursor-help z-10">
            {/* Текст ссылки, который видит пользователь */}
            <span className="border-b border-dashed border-current/40 hover:border-current/80 transition-colors duration-200">
                <span className="font-semibold text-inherit opacity-90 group-hover:opacity-100 transition-opacity duration-200">
                    {displayText}
                </span>
            </span>

            {/* Всплывающая карточка (Tooltip) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out translate-y-3 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto">
                {/* Shadow and inner glow effects for depth */}
                <div className="relative p-5 rounded-2xl border border-border bg-surface/95 backdrop-blur-xl shadow-medium flex flex-col gap-3">

                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${iconColor}`}>
                            <Bot size={18} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-text-primary">{profile.name}</span>
                            <span className="text-xs font-medium text-text-secondary uppercase tracking-widest">{profile.status}</span>
                        </div>
                    </div>

                    <div className="text-sm font-medium text-text-primary leading-snug">
                        {profile.shortDescription}
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold mt-1 uppercase tracking-wider">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-text-secondary border border-border">{profile.category}</span>
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-text-secondary border border-border font-mono">{profile.contextWindow}</span>
                    </div>

                    <Link to="/models" className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors w-max uppercase tracking-wider mt-1">
                        Подробнее
                        <ChevronRight size={14} />
                    </Link>

                    {/* Треугольник указателя */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-[1px] border-[7px] border-transparent border-t-border pointer-events-none">
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-[1px] border-[6px] border-transparent border-t-surface pointer-events-none" />
                    </div>        </div>
            </div>
        </span>
    );
}
