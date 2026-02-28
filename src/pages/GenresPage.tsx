import React from 'react';
import GenreTable from '../components/genres/GenreTable';
import GenreInsights from '../components/genres/GenreInsights';
import diplomaData from '../data/diploma-data.json';
import type { DiplomaData } from '../types';
import { Link } from 'react-router-dom';
import BackToHome from '../components/shared/BackToHome';

const GenresPage: React.FC = () => {
  const data = diplomaData as unknown as DiplomaData;
  const { genreRankings } = data.summary;

  return (
    <div className="space-y-16 py-8">
      <header className="relative mb-16 animate-fadeInUp">
        <BackToHome />
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-32 bg-accent rounded-full hidden md:block opacity-50 shadow-glow" />
        <div className="space-y-6 md:pl-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
            Аналитика данных
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-text-primary leading-tight">
            Оценка моделей по <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 italic">жанрам</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
            Сравнительная эффективность систем искусственного интеллекта в зависимости от функционального стиля текста.
            Исследована специфика работы LLM на корпусе из 5 различных категорий.
          </p>
        </div>
      </header>

      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Сводная таблица оценок</h2>
            <p className="text-text-secondary mt-1">Средневзвешенный балл по всем критериям для каждого жанра</p>
          </div>
        </div>
        <GenreTable data={genreRankings} />
      </section>

      <section className="space-y-8 pt-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight">Качественный разбор</h2>
          <p className="text-text-secondary mt-2">
            Детальный анализ поведения моделей, специфических ошибок и удачных находок
            в контексте жанровых особенностей.
          </p>
        </div>
        <GenreInsights data={genreRankings} />
      </section>

      <footer className="pt-12">
        <div className="bg-bg border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Готовы увидеть детали?</h3>
            <p className="text-text-secondary">Перейдите к анализу по отдельным критериям или изучите примеры.</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/criteria"
              className="px-6 py-3 bg-text-primary text-surface rounded-xl font-bold hover:bg-accent transition-colors duration-300"
            >
              Критерии
            </Link>
            <Link
              to="/evidence"
              className="px-6 py-3 bg-surface border border-border rounded-xl font-bold hover:bg-bg transition-colors duration-300"
            >
              Доказательная база
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GenresPage;
