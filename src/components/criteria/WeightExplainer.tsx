import React from 'react';
import { CRITERION_LABELS, CRITERION_WEIGHTS } from '../../types';
import { Info, BarChart3 } from 'lucide-react';

const WeightExplainer: React.FC = () => {
  const weights = [
    { key: 'adequacy', color: 'bg-blue-500' },
    { key: 'style', color: 'bg-green-500' },
    { key: 'naturalness', color: 'bg-amber-500' },
    { key: 'terminology', color: 'bg-purple-500' },
    { key: 'pragmatics', color: 'bg-rose-500' },
  ] as const;

  return (
    <div className="card border-none shadow-none bg-transparent p-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-text-primary/5 rounded-lg">
          <BarChart3 className="w-6 h-6 text-text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">Весовые коэффициенты</h3>
          <p className="text-sm text-text-secondary">Распределение значимости критериев в итоговой оценке</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative h-4 w-full bg-bg rounded-full overflow-hidden flex shadow-inner">
          {weights.map((w) => {
            const weight = CRITERION_WEIGHTS[w.key as keyof typeof CRITERION_WEIGHTS];
            return (
              <div 
                key={w.key}
                className={`${w.color} h-full transition-all duration-1000 ease-out border-r border-surface/20 last:border-0`}
                style={{ width: `${weight * 100}%` }}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {weights.map((w) => {
            const key = w.key as keyof typeof CRITERION_LABELS;
            const weight = CRITERION_WEIGHTS[key as keyof typeof CRITERION_WEIGHTS];
            return (
              <div 
                key={w.key} 
                className="group p-4 bg-surface border border-border rounded-2xl hover:border-accent/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full ${w.color}`} />
                  <span className="text-sm font-black text-text-primary">{(weight * 100).toFixed(0)}%</span>
                </div>
                <h4 className="text-sm font-bold text-text-primary leading-tight mb-1">
                  {CRITERION_LABELS[key]}
                </h4>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">
                    Коэффициент: {weight.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-bg rounded-2xl border border-dashed border-border flex gap-4 items-start">
          <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary leading-relaxed">
            Итоговый балл рассчитывается как сумма произведений оценок по каждому критерию на их соответствующие веса. 
            Наибольший приоритет отдается <strong>адекватности</strong> (точности передачи смысла) и <strong>соответствию жанру и стилю</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeightExplainer;
