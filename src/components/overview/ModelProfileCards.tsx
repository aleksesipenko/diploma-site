import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { MODEL_COLORS } from '../../types';
import type { SummaryData } from '../../types';
import { findLlmProfileByName } from '../../data/llmProfiles';


interface ModelProfileCardsProps {
  profiles: SummaryData['modelProfiles'];
  winner?: string;
}
const ModelProfileCards: React.FC<ModelProfileCardsProps> = ({ profiles, winner = 'claude' }) => {
  const modelIds = Object.keys(profiles);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {modelIds.map((modelId) => {
        const profile = profiles[modelId];
        const isWinner = modelId === winner;
        const llmProfile = findLlmProfileByName(modelId);

        return (
          <div
            key={modelId}
            className={`flex flex-col rounded-3xl border p-6 transition-all duration-300 ${isWinner
              ? 'bg-amber-50/30 border-amber-200 shadow-md ring-1 ring-amber-100'
              : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
              }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xl font-serif font-medium text-stone-900 mb-1">{llmProfile?.name || modelId}</h4>
                <div
                  className="h-1 w-12 rounded-full"
                  style={{ backgroundColor: llmProfile ? `var(--${llmProfile.color}-500, ${MODEL_COLORS[modelId]})` : MODEL_COLORS[modelId] || '#A8A29E' }}
                />
              </div>
              <div className="text-2xl font-serif font-bold text-stone-800">
                {profile.score}
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Характерные черты
                </div>
                <p className="text-stone-700 leading-relaxed text-[15px]">
                  {profile.traits}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  Типичные ошибки
                </div>
                <p className="text-stone-700 leading-relaxed text-[15px]">
                  {profile.errors}
                </p>
              </div>
            </div>

            {isWinner && (
              <div className="mt-8 pt-6 border-t border-amber-200/50">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-widest text-center">
                  Лучший результат в исследовании
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ModelProfileCards;
