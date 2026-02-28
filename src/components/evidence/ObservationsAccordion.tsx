import React from 'react';
import type { TextReport } from '../../types';
import { MODEL_COLORS } from '../../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import { Eye, ChevronDown, CheckCircle2 } from 'lucide-react';
import { findLlmProfileByName } from '../../data/llmProfiles';

interface ObservationsAccordionProps {
  report: TextReport;
}

const ObservationsAccordion: React.FC<ObservationsAccordionProps> = ({ report }) => {
  const modelIds = ['gemini', 'gigachat', 'claude'] as const;

  const models = modelIds.map(id => {
    const profile = findLlmProfileByName(id);
    return {
      id,
      name: profile?.name || id,
      color: profile ? `var(--${profile.color}-500, ${MODEL_COLORS[id]})` : MODEL_COLORS[id]
    };
  });

  return (
    <section className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="w-5 h-5 text-stone-400" />
        <h2 className="text-xl font-serif font-medium text-stone-900">Лингвистические наблюдения</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {models.map((model) => {
          const obs = report.observations[model.id as keyof typeof report.observations] || [];

          return (
            <AccordionItem
              key={model.id}
              value={model.id}
              className="border border-stone-100 rounded-3xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-stone-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div
                    className="w-2 h-8 rounded-full"
                    style={{ backgroundColor: model.color }}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Модель</span>
                    <span className="font-serif font-medium text-stone-900 text-lg">{model.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-auto mr-4">
                  <span className="text-xs font-bold text-stone-400">{obs.length} пунктов</span>
                  <ChevronDown className="w-5 h-5 text-stone-300 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 pt-2">
                <ul className="space-y-4">
                  {obs.map((item, idx) => (
                    <li key={idx} className="flex gap-4 group">
                      <CheckCircle2 className="w-5 h-5 text-stone-200 mt-0.5 flex-shrink-0 group-hover:text-stone-400 transition-colors" />
                      <p className="text-stone-600 leading-relaxed italic border-l-2 border-stone-50 pl-4">
                        {item}
                      </p>
                    </li>
                  ))}
                  {obs.length === 0 && (
                    <p className="text-stone-400 italic text-sm">Наблюдения отсутствуют для данного текста.</p>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};

export default ObservationsAccordion;
