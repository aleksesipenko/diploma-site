import React from 'react';
import BackToHome from '../components/shared/BackToHome';
import { Terminal, Copy, Check, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const PromptsPage: React.FC = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const prompts = [
        {
            id: 'system',
            title: 'Системный промпт (Translation)',
            description: 'Использовался для генерации переводов всеми тремя моделями для обеспечения консистентности.',
            content: 'Translate the following text into Russian, preserving the original style and tone: [TEXT]',
            role: 'System / Input'
        },
        {
            id: 'judge',
            title: 'Промпт для LLM-as-a-Judge',
            description: 'Использовался Claude 4.6 Opus для оценки качества переводов по 5 критериям.',
            content: `Вы — эксперт-лингвист и переводчик. Оцените качество перевода следующего текста с английского на русский язык.
Используйте 5 критериев:
1. Точность (Accuracy)
2. Естественность (Fluency)
3. Терминология (Terminology)
4. Стиль (Style)
5. Пунктуация (Punctuation)

Для каждого критерия выставьте балл от 1 до 10 и дайте краткое обоснование.`,
            role: 'Evaluation'
        },
        {
            id: 'reference',
            title: 'Промпт для Gold Standard Reference',
            description: 'Использовался для генерации эталонного человекоподобного перевода через OpenRouter API.',
            content: 'Act as a professional human translator. Translate the following English text into Russian. Provide only the translation, no explanations, no formatting, just the text.',
            role: 'Reference Generation'
        }
    ];

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-16 animate-fadeInUp">
                <BackToHome />
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg">
                        <Terminal className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em]">Приложение I</h2>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-text-primary tracking-tight mb-6">
                    Матрица промптов
                </h1>
                <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
                    Прозрачность исследования обеспечивается открытостью всех инструкций, подаваемых на вход моделям.
                    Здесь собраны системные и оценочные промпты, использованные в дипломной работе.
                </p>
            </header>

            <div className="space-y-12">
                {prompts.map((prompt) => (
                    <section key={prompt.id} className="card p-8 md:p-12 border-0 shadow-medium overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <MessageSquare size={120} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/3 space-y-4">
                                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    {prompt.role}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-text-primary">{prompt.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {prompt.description}
                                </p>
                            </div>

                            <div className="md:w-2/3">
                                <div className="bg-bg rounded-2xl border border-border overflow-hidden relative">
                                    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-border">
                                        <span className="text-[10px] font-mono text-text-secondary uppercase">Prompt Content</span>
                                        <button
                                            onClick={() => handleCopy(prompt.content, prompt.id)}
                                            className="p-1.5 hover:bg-white rounded-md transition-colors text-text-secondary hover:text-accent"
                                        >
                                            {copied === prompt.id ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                    <pre className="p-6 overflow-x-auto font-mono text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                                        {prompt.content}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <section className="mt-20 p-8 md:p-12 bg-accent rounded-[40px] text-surface overflow-hidden relative">
                <div className="relative z-10 max-w-3xl">
                    <h3 className="text-3xl font-serif font-bold mb-6">Важность формулировок</h3>
                    <p className="text-lg opacity-90 leading-relaxed mb-8">
                        Точность перевода и объективность оценки критически зависят от "Zero-shot" или "Few-shot" техник.
                        В данном исследовании использовался подход <strong>Zero-shot</strong> без примеров (examples),
                        чтобы минимизировать влияние подсказок на естественные способности моделей к переводу.
                    </p>
                </div>
                <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-[80px]"></div>
            </section>
        </div>
    );
};

export default PromptsPage;
