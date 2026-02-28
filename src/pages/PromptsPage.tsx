import React, { useState } from 'react';
import BackToHome from '../components/shared/BackToHome';
import { Terminal, Copy, Check, MessageSquare } from 'lucide-react';

const translationPrompt = `Переведи следующий текст с английского языка на русский.

Сохрани жанрово-стилистические особенности исходного текста.

Если это:
- Новостной текст: используй точность, нейтральность, избегай экспрессивных оборотов
- Научно-популярный текст: делай ясным и доступным, сохраняй терминологию
- Официально-деловой текст: используй клишированность, точные термины, официальный стиль
- Рекламный текст: передавай эмоциональность, адаптируй к целевой аудитории
- Художественный текст: сохраняй образность, экспрессивность, авторский стиль

Текст для перевода:
{TEXT}

Перевод:`;

const judgeSystemPrompt = `Ты — независимый эксперт по переводоведению (уровень: исследователь ВКР/научный рецензент).
Задача: сравнить СЫРЫЕ переводы трёх моделей (Gemini, GigaChat, Claude) относительно оригинала на английском языке.
Оценивай только raw outputs без постредактуры.
Критерии и веса: A адекватность(35), B жанр/стиль(25), C естественность RU(20), D терминология(10), E прагматика(10).
Формат: жанр+функция, сравнение A-E, таблица баллов, 2-4 наблюдения на модель с цитатами, победитель с обоснованием.
Не переписывай переводы.`;

const goldReferencePrompt = `Вы профессиональный и высококвалифицированный переводчик с английского на русский язык.
Вам предоставлен фрагмент текста. Ваша задача — создать ИДЕАЛЬНЫЙ, естественный, точный и стилистически адекватный эталонный (reference) перевод на русский язык.
В вашем ответе должен быть ТОЛЬКО текст перевода, без каких-либо вводных слов, пояснений или кавычек. Не добавляйте лишнего форматирования.

ТЕКСТ:
{TEXT}`;

const PromptsPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const prompts = [
    {
      id: 'translation-system',
      title: 'System Prompt — Translation (фактически использованный)',
      description:
        'Источник: tools/run_tests.py (PROMPT_TEMPLATE). Использовался для генерации переводов.',
      content: translationPrompt,
      role: 'Translation',
    },
    {
      id: 'judge-system',
      title: 'System Prompt — LLM-as-a-Judge (фактически использованный)',
      description:
        'Источник: АДМИН/OPUS_JUDGE_SYSTEM_PROMPT.md. Использовался в judge_opus контуре.',
      content: judgeSystemPrompt,
      role: 'Evaluation',
    },
    {
      id: 'gold-reference',
      title: 'Prompt — Gold Standard Reference (фактически использованный)',
      description:
        'Источник: scripts/calc_all_metrics.py (get_human_reference). Использовался через OpenRouter.',
      content: goldReferencePrompt,
      role: 'Reference Generation',
    },
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
          Ниже — промпты, реально использованные в исследовательском контуре (translation, judge, gold reference).
        </p>
      </header>

      <div className="space-y-12">
        {prompts.map((prompt) => (
          <section
            key={prompt.id}
            className="card p-8 md:p-12 border-0 shadow-medium overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <MessageSquare size={120} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3 space-y-4">
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {prompt.role}
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary">{prompt.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{prompt.description}</p>
              </div>

              <div className="md:w-2/3">
                <div className="bg-bg rounded-2xl border border-border overflow-hidden relative">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-border">
                    <span className="text-[10px] font-mono text-text-secondary uppercase">Prompt Content</span>
                    <button
                      onClick={() => handleCopy(prompt.content, prompt.id)}
                      className="p-1.5 hover:bg-white rounded-md transition-colors text-text-secondary hover:text-accent"
                    >
                      {copied === prompt.id ? (
                        <Check size={14} className="text-success" />
                      ) : (
                        <Copy size={14} />
                      )}
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
    </div>
  );
};

export default PromptsPage;
