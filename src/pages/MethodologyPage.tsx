import React from 'react';
import CriteriaDefinition from '../components/methodology/CriteriaDefinition';
import LimitationsList from '../components/methodology/LimitationsList';
import { useDiplomaData } from '../hooks/useDiplomaData';
import { LlmTooltip } from '../components/ui/LlmTooltip';
import BackToHome from '../components/shared/BackToHome';

const MethodologyPage: React.FC = () => {
  const { summary } = useDiplomaData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-16 border-b border-border pb-12 animate-fadeInUp">
        <BackToHome />
        <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4">Раздел III</h2>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-text-primary tracking-tight mb-6">
          Методология исследования
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
          Описание процесса оценки качества машинного перевода, используемых критериев
          и характеристик тестируемых моделей искусственного интеллекта.
        </p>
      </header>

      {/* Pipeline Description */}
      <section className="mb-20">
        <h3 className="text-2xl font-serif font-medium text-stone-900 mb-8">1. Процесс оценки (Pipeline)</h3>
        <div className="prose prose-stone max-w-none text-text-secondary leading-relaxed">
          <p className="mb-4 text-lg">
            Исследование проводилось в несколько этапов для обеспечения максимальной объективности
            и воспроизводимости результатов:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="card shadow-soft hover:shadow-medium transition-shadow">
              <h4 className="font-bold text-text-primary mb-2 font-serif text-lg">Этап 1: Подготовка корпуса</h4>
              <p className="text-sm text-text-secondary">Отбор 10 оригинальных англоязычных текстов различных жанров (новости, научпоп, деловая переписка, реклама, литература).</p>
            </div>
            <div className="card shadow-soft hover:shadow-medium transition-shadow">
              <h4 className="font-bold text-text-primary mb-2 font-serif text-lg">Этап 2: Генерация переводов</h4>
              <p className="text-sm text-text-secondary">Получение переводов от трех LLM (<LlmTooltip name="Gemini 3.1 Pro">Gemini</LlmTooltip>, <LlmTooltip name="GigaChat 2 Max">GigaChat</LlmTooltip>, <LlmTooltip name="Claude 4.6 Opus">Claude</LlmTooltip>) с использованием идентичных системных промптов.</p>
            </div>
            <div className="card shadow-soft hover:shadow-medium transition-shadow">
              <h4 className="font-bold text-text-primary mb-2 font-serif text-lg">Этап 3: Экспертная оценка (LLM-as-a-Judge)</h4>
              <p className="text-sm text-text-secondary">Поаспектный анализ каждого текста передовой языковой моделью Claude 4.6 Opus в рамках методологии LLM-as-a-Judge, выступающей в качестве эксперта-лингвиста. Это является методическим экспериментом, призванным минимизировать субъективность человеческого фактора.</p>
            </div>
            <div className="card shadow-soft hover:shadow-medium transition-shadow">
              <h4 className="font-bold text-text-primary mb-2 font-serif text-lg">Этап 4: Статистический анализ</h4>
              <p className="text-sm text-text-secondary">Агрегация баллов, расчет средневзвешенных показателей и выявление закономерностей.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Criteria Definitions */}
      <section className="mb-20">
        <h3 className="text-2xl font-serif font-medium text-stone-900 mb-4">2. Критерии оценки</h3>
        <p className="text-stone-600 mb-8">
          Каждый перевод оценивался по пяти параметрам, имеющим различный удельный вес в итоговой оценке:
        </p>
        <CriteriaDefinition />
      </section>

      {/* Model Information */}
      <section className="mb-20">
        <h3 className="text-2xl font-serif font-medium text-text-primary mb-8">3. Исследуемые модели</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-gradient-to-br from-surface to-blue-50/30 border-blue-100/50">
            <h4 className="text-xl font-bold font-serif text-text-primary mb-4"><LlmTooltip name="Gemini 3.1 Pro">Google Gemini 3.1 Pro</LlmTooltip></h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Мультимодальная модель от Google, отличающаяся широким контекстным окном и высокой скоростью работы.
              В исследовании использовалась версия Pro для обеспечения максимального качества.
            </p>
          </div>
          <div className="card bg-gradient-to-br from-surface to-green-50/30 border-green-100/50">
            <h4 className="text-xl font-bold font-serif text-text-primary mb-4"><LlmTooltip name="GigaChat 2 Max">Sber GigaChat 2 MAX</LlmTooltip></h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Российская разработка от Сбера, оптимизированная для работы с русским языком и учитывающая
              культурные особенности русскоязычного дискурса.
            </p>
          </div>
          <div className="card bg-gradient-to-br from-surface to-amber-50/30 border-amber-100/50">
            <h4 className="text-xl font-bold font-serif text-text-primary mb-4"><LlmTooltip name="Claude 4.6 Opus">Anthropic Claude 4.6 Opus</LlmTooltip></h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Модель, известная своим "человечным" стилем изложения и способностью к тонкому пониманию нюансов.
              Считается одной из лучших в творческих задачах.
            </p>
          </div>
        </div>
      </section>

      {/* Automatic Metrics */}
      <section className="mb-20">
        <h3 className="text-2xl font-serif font-medium text-stone-900 mb-4">4. Автоматические метрики (BLEU / METEOR / COMET)</h3>
        <p className="text-stone-600 mb-6 leading-relaxed">
          Для верификации оценок LLM-as-a-Judge (Claude Opus) применялся расчет метрик <strong>BLEU</strong>, <strong>METEOR</strong> и <strong>COMET</strong>. В качестве эталонного («человеческого») перевода (Reference) использовались ответы, сгенерированные Claude 4.6 Opus через API OpenRouter, которым была дана строгая инструкция (Prompt) выступить в роли эталонного человеческого переводчика. Это позволило алгоритмически сопоставить семантическую (COMET) и n-граммную (BLEU/METEOR) близость каждой модели к профессиональному эталону.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wider text-xs">BLEU Score</h4>
            <div className="flex justify-between items-end mt-4">
              <div className="space-y-1">
                <div className="text-sm text-text-secondary">Claude (Model)</div>
                <div className="text-2xl font-mono text-accent">23.85</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-text-secondary">Gemini 3.1 Pro</div>
                <div className="text-2xl font-mono text-stone-500">13.38</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-sm text-text-secondary">GigaChat 2 MAX</div>
                <div className="text-2xl font-mono text-stone-400">3.18</div>
              </div>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wider text-xs">METEOR Score</h4>
            <div className="flex justify-between items-end mt-4">
              <div className="space-y-1">
                <div className="text-sm text-text-secondary">Claude (Model)</div>
                <div className="text-2xl font-mono text-accent">0.4198</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-text-secondary">Gemini 3.1 Pro</div>
                <div className="text-2xl font-mono text-stone-500">0.3069</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-sm text-text-secondary">GigaChat 2 MAX</div>
                <div className="text-2xl font-mono text-stone-400">0.1332</div>
              </div>
            </div>
          </div>
          <div className="bg-surface border-border border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(200,200,225,0.1) 100%)' }}>
            <h4 className="font-bold text-stone-800 mb-1 uppercase tracking-wider text-xs">COMET Score <span className="text-neutral-500 ml-1 font-normal lowercase">(Semantic)</span></h4>
            <div className="flex justify-between items-end mt-4">
              <div className="space-y-1">
                <div className="text-sm text-stone-600">Claude (Model)</div>
                <div className="text-2xl font-mono text-indigo-700 font-medium">0.9008</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-stone-600">Gemini 3.1 Pro</div>
                <div className="text-2xl font-mono text-stone-600">0.7691</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-sm text-stone-600">GigaChat 2 MAX</div>
                <div className="text-2xl font-mono text-stone-500">0.6626</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-20">
        <h3 className="text-2xl font-serif font-medium text-stone-900 mb-4">5. Ограничения исследования</h3>
        <p className="text-stone-600 mb-6">
          При интерпретации результатов следует учитывать следующие факторы, ограничивающие универсальность выводов:
        </p>
        <LimitationsList limitations={summary.limitations} />
      </section>

      {/* Reproducibility */}
      <section className="bg-text-primary text-surface rounded-[40px] p-8 md:p-12 overflow-hidden relative shadow-2xl mt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-0"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-serif font-bold mb-8">Воспроизводимость (Reproducibility)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-stone-300 leading-relaxed text-lg">
                Для обеспечения возможности повторения эксперимента все промпты были стандартизированы.
                Использовался формат: <br /><br />
                <code className="bg-black/40 px-3 py-2 rounded-lg text-accent-light flex font-mono text-sm border border-white/10">Translate the following text into Russian, preserving the original style and tone: [TEXT]</code>
              </p>
              <p className="text-stone-300 leading-relaxed text-lg">
                Все параметры генерации (temperature, top_p) были оставлены в значениях по умолчанию для каждой модели
                на момент проведения тестов (февраль 2025).
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <h5 className="font-bold text-xl mb-6 text-white font-serif">Технические детали</h5>
              <ul className="text-stone-300 space-y-4 font-mono text-sm">
                <li className="flex items-start gap-3"><span className="text-accent-light shrink-0">→</span> API версии моделей: <LlmTooltip name="Gemini 3.1 Pro">Gemini 3.1 Pro</LlmTooltip> (latest), <LlmTooltip name="GigaChat 2 Max">GigaChat 2 MAX</LlmTooltip>, <LlmTooltip name="Claude 4.6 Opus">Claude 4.6 Opus</LlmTooltip></li>
                <li className="flex items-start gap-3"><span className="text-accent-light shrink-0">→</span> Дата проведения тестов: 27 февраля 2026 года</li>
                <li className="flex items-start gap-3"><span className="text-accent-light shrink-0">→</span> Метод оценки: LLM-as-a-Judge (Claude 4.6 Opus)</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-accent opacity-20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      </section>
    </div>
  );
};

export default MethodologyPage;
