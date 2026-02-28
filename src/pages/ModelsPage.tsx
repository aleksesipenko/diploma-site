import { useState } from 'react';
import BackToHome from '../components/shared/BackToHome';
import { Bot, Cpu, Layers, ChevronDown } from 'lucide-react';
import { getPrimaryModels, getSecondaryModels } from '../data/llmProfiles';
import type { LlmProfile } from '../data/llmProfiles';

function ModelCard({ profile }: { profile: LlmProfile }) {
    const colorStyles: Record<string, string> = {
        amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        green: 'text-green-400 bg-green-400/10 border-green-400/20',
        red: 'text-red-400 bg-red-400/10 border-red-400/20',
        teal: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
        slate: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
    };

    const badgeStyle = colorStyles[profile.color] || colorStyles.slate;

    return (
        <div className="group relative bg-surface backdrop-blur-md border border-border rounded-3xl p-6 sm:p-8 transition-all duration-400 ease-out hover:bg-gray-50/50 hover:border-gray-300 hover:shadow-medium hover:-translate-y-1">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <div className="flex-1 space-y-5">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl border ${badgeStyle} shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-text-primary tracking-tight font-serif">{profile.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="relative flex h-2 w-2">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${profile.status.includes('Active') || profile.status.includes('SOTA') ? 'bg-success' : 'bg-warning'}`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${profile.status.includes('Active') || profile.status.includes('SOTA') ? 'bg-success' : 'bg-warning'}`}></span>
                                </span>
                                <p className="text-xs font-medium text-text-secondary tracking-wide uppercase">{profile.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {profile.badges.map(badge => (
                            <span key={badge} className={`text-xs font-medium px-2 py-1 rounded-md border ${badgeStyle}`}>
                                {badge}
                            </span>
                        ))}
                    </div>

                    <div className="text-text-primary text-sm leading-relaxed space-y-3">
                        <p>{profile.fullDescription}</p>
                    </div>
                </div>

                <div className="md:w-1/3 lg:w-1/4 space-y-5 bg-gray-50/80 rounded-2xl p-6 border border-border h-fit shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 text-text-secondary mb-2">
                            <Layers size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Роль в исследовании</span>
                        </div>
                        <p className="text-sm text-text-primary leading-relaxed">{profile.roleInThesis}</p>
                    </div>

                    <div className="w-full h-[1px] bg-border" />

                    <div>
                        <div className="flex items-center gap-2 text-text-secondary mb-2">
                            <Cpu size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Контекст</span>
                        </div>
                        <p className="text-sm text-text-primary font-mono">{profile.contextWindow}</p>
                    </div>

                    {profile.futurePlansNote && (
                        <div className="mt-5 pt-5 border-t border-border">
                            <p className="text-xs text-amber-600 italic leading-relaxed">
                                * {profile.futurePlansNote}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function AccordionItem({ profile, isLast }: { profile: LlmProfile, isLast: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`w-full ${!isLast ? 'border-b border-border' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 md:px-8 py-5 hover:bg-gray-50/50 transition-colors flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-5">
                    <div className="p-2.5 rounded-xl border border-border bg-surface text-text-secondary group-hover:text-text-primary group-hover:border-gray-300 transition-all shadow-sm">
                        <Bot size={20} />
                    </div>
                    <div>
                        <div className="font-serif font-bold text-text-primary text-lg tracking-tight transition-colors">{profile.name}</div>
                        <div className="text-sm text-text-secondary font-normal mt-0.5">{profile.shortDescription}</div>
                    </div>
                </div>
                <ChevronDown size={20} className={`text-text-secondary transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180 text-text-primary' : ''}`} />
            </button>

            <div
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden bg-gray-50/30">
                    <div className="px-6 md:px-8 pb-8 pt-4 border-t border-border">
                        <div className="ml-16 space-y-5">
                            <div className="text-text-primary leading-relaxed text-sm">
                                {profile.fullDescription}
                            </div>

                            <div className="bg-surface rounded-xl p-5 border border-border shadow-sm">
                                <div className="flex items-center gap-2 text-text-secondary mb-2">
                                    <Layers size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Роль</span>
                                </div>
                                <p className="text-sm text-text-primary">{profile.roleInThesis}</p>
                            </div>

                            {profile.futurePlansNote && (
                                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm flex gap-3 items-start">
                                    <span className="font-serif font-bold text-amber-500 mt-0.5 text-lg leading-none">*</span>
                                    <span className="leading-relaxed">{profile.futurePlansNote}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ModelsPage() {
    const primaryModels = getPrimaryModels();
    const secondaryModels = getSecondaryModels();

    return (
        <div className="min-h-screen bg-bg text-text-primary selection:bg-accent/20 pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
            </div>

            <div className="max-w-5xl mx-auto border-l border-border pl-8 md:pl-16 relative z-10">
                <header className="mb-16">
                    <BackToHome />
                    <div className="inline-flex items-center gap-2 border border-border bg-surface shadow-sm px-3 py-1.5 rounded-full text-xs font-medium tracking-wide mb-6">
                        <Bot size={14} className="text-accent" />
                        <span className="text-text-secondary">Инструментарий исследования — 2026</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-text-primary">
                        Искусственный <br />Интеллект
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                        Архитектура исследования построена на сравнительном анализе передовых языковых моделей (State-of-the-Art LLM) по состоянию на февраль 2026 года.
                    </p>
                </header>

                <section className="space-y-8 mb-20">
                    <h2 className="text-2xl font-serif text-text-primary flex items-center gap-4">
                        <span className="w-10 h-[1px] bg-gradient-to-r from-border to-transparent"></span>
                        Основой стек (SOTA)
                    </h2>

                    <div className="flex flex-col gap-6">
                        {primaryModels.map(profile => (
                            <ModelCard key={profile.id} profile={profile} />
                        ))}
                    </div>
                </section>

                <section className="space-y-8 max-w-4xl">
                    <h2 className="text-2xl font-serif text-text-primary flex items-center gap-4">
                        <span className="w-10 h-[1px] bg-gradient-to-r from-border to-transparent"></span>
                        Дополнительно & Планы
                    </h2>

                    <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
                        <div className="w-full">
                            {secondaryModels.map((profile, i) => (
                                <AccordionItem
                                    key={profile.id}
                                    profile={profile}
                                    isLast={i === secondaryModels.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
