import React from 'react';
import WeightExplainer from '../components/criteria/WeightExplainer';
import CriteriaBreakdown from '../components/criteria/CriteriaBreakdown';
import diplomaData from '../data/diploma-data.json';
import type { DiplomaData } from '../types';
import { ShieldCheck, Info } from 'lucide-react';
import BackToHome from '../components/shared/BackToHome';

const CriteriaPage: React.FC = () => {
  const data = diplomaData as unknown as DiplomaData;
  const { criteriaAverages } = data.summary;

  return (
    <div className="space-y-16 py-8">
      <header className="relative mb-16 animate-fadeInUp">
        <BackToHome />
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-32 bg-accent rounded-full hidden md:block opacity-50 shadow-glow" />
        <div className="space-y-6 md:pl-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
            Методология оценки
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-text-primary leading-tight">
            Разбор по <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 italic">критериям</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
            Глубокое погружение в метрики качества перевода. Мы используем 5 ключевых лингвистических критериев
            для всесторонней оценки нейросетей-переводчиков.
          </p>
        </div>
      </header>

      <section className="bg-surface border border-border rounded-[32px] p-8 lg:p-12 shadow-soft">
        <WeightExplainer />
      </section>

      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              Сравнительные показатели
              <ShieldCheck className="w-8 h-8 text-success" />
            </h2>
            <p className="text-text-secondary">Средние баллы моделей по всем исследованным текстам</p>
          </div>
          <div className="flex items-center gap-2 p-2 bg-bg rounded-xl border border-border">
            <Info className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-text-secondary">Шкала от 1 до 10 баллов</span>
          </div>
        </div>
        <CriteriaBreakdown data={criteriaAverages} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="p-8 bg-text-primary text-surface rounded-3xl space-y-4">
          <h3 className="text-2xl font-bold">Почему это важно?</h3>
          <p className="text-surface/70 leading-relaxed">
            Простая оценка "хорошо/плохо" не дает понимания специализации моделей. Разделение на критерии позволяет увидеть,
            что одна модель может быть лучше в сохранении терминологии, в то время как другая — в естественности звучания.
          </p>
        </div>
        <div className="p-8 bg-accent text-surface rounded-3xl space-y-4">
          <h3 className="text-2xl font-bold">Автоматизация vs Эксперты</h3>
          <p className="text-surface/90 leading-relaxed">
            Данные баллы получены путем экспертной оценки лингвистами. Мы сравниваем их с автоматическими метриками (BLEU, METEOR)
            в разделе методологии для верификации результатов исследования.
          </p>
        </div>
      </section>
    </div>
  );
};


export default CriteriaPage;
