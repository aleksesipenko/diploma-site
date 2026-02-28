import React from 'react';
import type { TextReport } from '../../types';
import { CRITERION_LABELS, CRITERION_WEIGHTS, MODEL_COLORS } from '../../types';
import { cn } from '../../lib/utils';
import { Trophy, Scale } from 'lucide-react';
import { findLlmProfileByName } from '../../data/llmProfiles';

interface ScoreCardProps {
  report: TextReport;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ report }) => {
  const criteriaKeys = Object.keys(CRITERION_LABELS) as Array<keyof typeof CRITERION_LABELS>;
  const models = ['gemini', 'gigachat', 'claude'] as const;

  const getWinner = (criterion: keyof typeof CRITERION_LABELS) => {
    const scores = models.map(m => report.scores[m][criterion]);
    const max = Math.max(...scores);
    return models.filter(m => report.scores[m][criterion] === max);
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-stone-400" />
          <h2 className="text-xl font-serif font-medium text-stone-900">Матрица оценок</h2>
        </div>

        <div className="flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-xl border border-stone-100">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-stone-600">
            Победитель: <span className="text-stone-900 font-bold capitalize">{report.winner}</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest text-stone-400 w-1/4">Критерий (Вес)</th>
              {models.map(model => {
                const profile = findLlmProfileByName(model);
                return (
                  <th key={model} className="py-4 px-6 text-center text-xs font-bold uppercase tracking-widest text-stone-400">
                    {profile?.shortName || model}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {criteriaKeys.map((key) => {
              const winners = getWinner(key);
              const weight = CRITERION_WEIGHTS[key as keyof typeof CRITERION_WEIGHTS];

              return (
                <tr key={key} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-serif font-medium text-stone-900">{CRITERION_LABELS[key]}</span>
                      <span className="text-[10px] text-stone-400 font-bold tracking-tighter uppercase">Weight: {weight * 100}%</span>
                    </div>
                  </td>
                  {models.map(model => {
                    const isWinner = winners.includes(model);
                    const score = report.scores[model][key];

                    return (
                      <td key={model} className="py-4 px-6 text-center">
                        <div className={cn(
                          "inline-flex items-center justify-center w-12 h-12 rounded-2xl text-lg font-mono font-bold transition-all",
                          isWinner
                            ? "bg-white border-2 shadow-sm scale-110"
                            : "text-stone-400"
                        )} style={{
                          borderColor: isWinner ? MODEL_COLORS[model] : 'transparent',
                          color: isWinner ? MODEL_COLORS[model] : undefined
                        }}>
                          {score.toFixed(1)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* Final Row */}
            <tr className="bg-stone-900 text-white rounded-b-3xl">
              <td className="py-6 px-6 rounded-bl-3xl">
                <span className="font-serif text-lg">Итоговый взвешенный балл</span>
              </td>
              {models.map((model, index) => (
                <td key={model} className={cn(
                  "py-6 px-6 text-center text-2xl font-mono font-black",
                  index === models.length - 1 && "rounded-br-3xl"
                )}>
                  {report.scores[model].weighted.toFixed(2)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ScoreCard;
