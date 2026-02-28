import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDiplomaData } from '../hooks/useDiplomaData';
import TextSelector from '../components/evidence/TextSelector';
import ParallelViewer from '../components/evidence/ParallelViewer';
import ScoreCard from '../components/evidence/ScoreCard';
import ObservationsAccordion from '../components/evidence/ObservationsAccordion';
import { FileSearch, AlertCircle } from 'lucide-react';
import BackToHome from '../components/shared/BackToHome';
import type { TextReport } from '../types';
import { calculateWeightedScore } from '../utils/calculations';

const EvidencePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { reports, getReportById } = useDiplomaData() as {
    reports: TextReport[];
    getReportById: (id: number) => TextReport | undefined;
  };

  const currentId = parseInt(searchParams.get('id') || '1');
  const report = getReportById(currentId);

  // Default to first report if not found or no ID
  useEffect(() => {
    if (!searchParams.get('id') && reports.length > 0) {
      setSearchParams({ id: reports[0].id.toString() });
    }
  }, [reports, searchParams, setSearchParams]);

  if (reports.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-stone-200 mb-6" />
        <h1 className="text-3xl font-serif font-medium text-stone-900 mb-4">Данные не загружены</h1>
        <p className="text-stone-500 max-w-md">
          Не удалось найти отчеты в базе данных. Пожалуйста, проверьте наличие данных в diploma-data.json.
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-serif">Текст #{currentId} не найден</h1>
        <button
          onClick={() => setSearchParams({ id: reports[0].id.toString() })}
          className="mt-4 text-stone-600 underline"
        >
          Вернуться к первому тексту
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 animate-fadeInUp">
        <BackToHome />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <FileSearch className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xs font-bold text-accent uppercase tracking-[0.3em]">LinguaMetrics Evidence</h2>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-text-primary tracking-tight">
              Доказательная база
            </h1>
            <p className="text-text-secondary max-w-2xl text-lg md:text-xl leading-relaxed">
              Детальный разбор каждого из 10 контрольных текстов. Сравнивайте оригиналы с результатами
              разных моделей и изучайте оценки нейросети-судьи.
            </p>
          </div>
        </div>
      </header>

      {/* Text Selection Grid */}
      <TextSelector reports={reports} />

      {/* Selected Report Content */}
      <div className="space-y-12 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        <div className="card border-0 shadow-medium p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-surface to-accent-light/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-border">
            <div>
              <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                {report.genreRu}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary leading-tight">{report.title}</h2>
            </div>
            <div className="flex gap-6 items-center bg-white p-4 rounded-2xl border border-border shadow-sm">
              <div className="text-right">
                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Победитель</div>
                <div className="text-xl font-serif font-bold capitalize text-text-primary flex items-center justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {
                    ['gemini', 'gigachat', 'claude'].reduce((winner, model) => {
                      const score = calculateWeightedScore((report.scores as any)[model]);
                      const maxScore = calculateWeightedScore((report.scores as any)[winner]);
                      return score > maxScore ? model : winner;
                    }, 'claude')
                  }
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-right">
                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Балл</div>
                <div className="text-2xl font-mono font-bold text-accent">
                  {Math.max(
                    calculateWeightedScore(report.scores.gemini as any),
                    calculateWeightedScore(report.scores.gigachat as any),
                    calculateWeightedScore(report.scores.claude as any)
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <ParallelViewer report={report} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScoreCard report={report} />
            <ObservationsAccordion report={report} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EvidencePage;
