import React from 'react';
import type { GenreStats } from '../../types';
import { MODEL_COLORS } from '../../types';
import { ChevronDown, MessageSquare, Target, BookOpen } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';


interface GenreInsightsProps {
  data: GenreStats[];
}

const GenreInsights: React.FC<GenreInsightsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-accent/10 rounded-lg">
          <MessageSquare className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Качественные инсайты по жанрам</h2>
      </div>

      <Accordion.Root type="multiple" className="space-y-4">
        {data.map((genre) => (
          <Accordion.Item
            key={genre.genre}
            value={genre.genre}
            className="border border-border rounded-2xl bg-surface overflow-hidden shadow-soft transition-all duration-300 data-[state=open]:ring-2 data-[state=open]:ring-accent/20"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left group transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/5 transition-colors">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-text-primary">{genre.genreRu}</h3>
                    <p className="text-sm text-text-secondary">Лидер: <span className="text-accent font-medium uppercase tracking-wider">{genre.leader}</span></p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-text-secondary group-data-[state=open]:rotate-180 transition-transform duration-300" />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
              <div className="pt-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Ключевые наблюдения
                    </h4>
                    <ul className="space-y-3">
                      {genre.observations.map((obs, i) => (
                        <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                          {obs}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Исследуемые тексты
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {genre.textIds.map((id) => (
                        <span
                          key={id}
                          className="px-3 py-1 bg-bg border border-border rounded-lg text-xs font-medium text-text-primary"
                        >
                          Текст #{id}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MODEL_COLORS.gemini }} /> Gemini</div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MODEL_COLORS.gigachat }} /> GigaChat</div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MODEL_COLORS.claude }} /> Claude</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex-grow h-2 bg-bg rounded-full overflow-hidden flex">
                      <div
                        className="h-full transition-all duration-1000"
                        style={{ width: `${(Number(genre.gemini ?? 0) / 10) * 100}%`, backgroundColor: MODEL_COLORS.gemini }}
                      />
                      <div
                        className="h-full transition-all duration-1000"
                        style={{ width: `${(Number(genre.gigachat ?? 0) / 10) * 100}%`, backgroundColor: MODEL_COLORS.gigachat }}
                      />
                      <div
                        className="h-full transition-all duration-1000"
                        style={{ width: `${(Number(genre.claude ?? 0) / 10) * 100}%`, backgroundColor: MODEL_COLORS.claude }}
                      />
                    </div>
                    <span className="text-text-secondary font-mono text-xs">Разрыв: {genre.leaderMargin.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default GenreInsights;
