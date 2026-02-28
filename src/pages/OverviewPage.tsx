import React from 'react';
import WinnerHero from '../components/overview/WinnerHero';
import ScoreBarChart from '../components/overview/ScoreBarChart';
import CriteriaRadar from '../components/overview/CriteriaRadar';
import ModelProfileCards from '../components/overview/ModelProfileCards';
import diplomaData from '../data/diploma-data.json';
import type { DiplomaData } from '../types';


const OverviewPage: React.FC = () => {
  const data = diplomaData as unknown as DiplomaData;
  const { summary } = data;

  const barChartData: Record<string, number> = {};
  for (const [model, scores] of Object.entries(summary.criteriaAverages)) {
    barChartData[model] = scores.weighted;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 animate-fadeInUp">
        <h2 className="text-xs font-bold text-accent uppercase tracking-[0.3em] mb-4">LinguaMetrics Overview</h2>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary tracking-tight">
          Сравнительный анализ LLM в машинном переводе
        </h1>
      </header>

      {/* Hero Section */}
      <WinnerHero winnerData={summary.overallWinner} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <ScoreBarChart data={barChartData} />
        <CriteriaRadar data={summary.criteriaAverages} />
      </div>

      {/* Detailed Profiles */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-medium text-stone-900 mb-2">Профили моделей</h3>
            <p className="text-stone-600 max-w-2xl">
              Детальный разбор сильных сторон и типичных недостатков каждой системы на основе
              анализа всех протестированных текстов.
            </p>
          </div>
        </div>

        <ModelProfileCards
          profiles={summary.modelProfiles}
          winner={summary.overallWinner.model}
        />
      </section>

      {/* Footer Note */}
      <footer className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
        <h4 className="font-serif font-medium text-stone-900 mb-3">Методологическая справка</h4>
        <p className="text-stone-600 text-sm leading-relaxed">
          Оценка производилась по 5-балльной шкале (приведенной к 10-балльной для наглядности)
          с использованием взвешенных коэффициентов: Адекватность (35%), Жанр и стиль (25%),
          Естественность (20%), Терминология (10%), Прагматика (10%).
          Итоговый балл является средним арифметическим взвешенным по 10 контрольным текстам.
        </p>
      </footer>
    </div>
  );
};

export default OverviewPage;
