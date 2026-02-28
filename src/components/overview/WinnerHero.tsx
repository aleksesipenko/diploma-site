import React from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import type { SummaryData } from '../../types';

import { findLlmProfileByName } from '../../data/llmProfiles';

interface WinnerHeroProps {
  winnerData: SummaryData['overallWinner'];
}

const WinnerHero: React.FC<WinnerHeroProps> = ({ winnerData }) => {
  const profile = findLlmProfileByName(winnerData.model);

  // Default to amber/Claude styling if profile not found (defensive)
  const colors = profile?.color === 'emerald' ? 'from-emerald-200 to-emerald-500' :
    profile?.color === 'blue' ? 'from-blue-200 to-blue-500' :
      'from-amber-200 to-amber-500';

  const winnerPrimary = profile?.shortName || winnerData.model;
  const winnerSuffix = profile
    ? (profile.name.replace(profile.shortName, '').trim() || 'Opus')
    : 'Opus';

  return (
    <div className="relative overflow-hidden rounded-[32px] mb-16 shadow-medium group">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] group-hover:scale-105"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Deep dark overlay with blue/amber tint matching the image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B1120]/95 via-[#0B1120]/80 to-[#0B1120]/40 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10 p-10 md:p-16">
        <div className="flex-shrink-0 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="w-28 h-28 md:w-36 md:h-36 glass-dark rounded-3xl flex items-center justify-center shadow-glow border border-blue-400/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent" />
            <Trophy className="w-14 h-14 md:w-16 md:h-16 text-amber-400 drop-shadow-md z-10 relative" />
          </div>
        </div>

        <div className="flex-grow text-center md:text-left text-white animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-semibold mb-6 tracking-wide shadow-lg">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-gray-200">Абсолютный лидер исследования</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-xl leading-tight">
            {winnerPrimary} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${colors}`}>
              {winnerSuffix}
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
            По результатам строгого лингвистического профилирования на корпусе из 10 разножанровых текстов,
            {winnerPrimary} продемонстрировал непревзойденную адаптивность и терминологическую точность.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-white/10 pt-10">
            <div>
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-semibold">Итоговый балл</div>
              <div className="text-4xl font-serif font-bold text-white drop-shadow-md">{winnerData.score}<span className="text-xl text-gray-500 font-sans">/10</span></div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-semibold">Победы</div>
              <div className="text-4xl font-serif font-bold text-white drop-shadow-md">{winnerData.wins}<span className="text-xl text-gray-500 font-sans">/10</span></div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-semibold">Жанровое лидерство</div>
              <div className="text-4xl font-serif font-bold text-white drop-shadow-md">{winnerData.genreWins}<span className="text-xl text-gray-500 font-sans">/5</span></div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-semibold">Отрыв от Gemini</div>
              <div className="text-4xl font-serif font-bold text-emerald-400 flex items-center justify-center md:justify-start gap-1 drop-shadow-md">
                <TrendingUp className="w-6 h-6" />
                +{winnerData.marginToGemini}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerHero;
