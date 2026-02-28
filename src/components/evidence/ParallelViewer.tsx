import React from 'react';
import type { TextReport } from '../../types';
import { MODEL_COLORS } from '../../types';
import { cn } from '../../lib/utils';
import { Cpu, Zap, Brain, MessageSquareQuote } from 'lucide-react';
import { calculateWeightedScore } from '../../utils/calculations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { findLlmProfileByName } from '../../data/llmProfiles';

interface ParallelViewerProps {
  report: TextReport;
}

const SOURCE_BY_REPORT_ID: Record<number, { label: string; url?: string }> = {
  1: { label: 'BBC News', url: 'https://www.bbc.com/news/articles/c2lrn8q2q24o' },
  2: { label: 'BBC News', url: 'https://www.bbc.com/news/articles/c04gvx7egw5o' },
  3: { label: 'Webb / научпоп корпус' },
  4: { label: 'Astronomy corpus' },
  5: { label: 'Business communication corpus' },
  6: { label: 'Board meeting minutes corpus' },
  7: { label: 'Product copy corpus (SonicX)' },
  8: { label: 'Beauty product copy corpus (Radiance)' },
  9: { label: 'Fiction corpus (short story)' },
  10: { label: 'Fiction corpus (short story)' },
};

const cleanTextForDisplay = (input: string): string => {
  if (!input) return '';

  let text = input.replace(/\r\n/g, '\n');

  // markdown links: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1');

  const cleanedLines = text
    .split('\n')
    .map((line) => {
      let l = line;

      // remove markdown heading markers
      l = l.replace(/^\s{0,3}#{1,6}\s*/g, '');

      // remove bold/italic markers
      l = l.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');

      // normalize strange nbsp spaces
      l = l.replace(/\u00A0/g, ' ');

      return l;
    })
    .filter((line) => {
      const t = line.trim();
      if (!t) return true;

      // remove markdown separator and metadata tails
      if (t === '---') return false;
      if (/^\*\*(источник|url|ссылка|тип|количество слов|объём текста)\*\*:/i.test(t)) return false;

      // remove common assistant prefaces that are not part of source text
      if (/^(выполняю перевод|вот перевод|ниже перевод|перевод текста|предлагаю перевод)/i.test(t)) return false;

      return true;
    });

  return cleanedLines.join('\n').trim();
};

const ColumnHeader = ({ title, icon, color, isOriginal = false }: { title: string; icon: React.ReactNode; color?: string; isOriginal?: boolean }) => (
  <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border p-4 flex items-center gap-3">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
      style={{ backgroundColor: color || '#6B7280' }}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
        {isOriginal ? 'Источник' : 'Перевод'}
      </h4>
      <h3 className="font-serif font-medium text-text-primary truncate">{title}</h3>
    </div>
  </div>
);

const ContentBox = ({ text }: { text: string }) => (
  <div className="h-full relative min-w-0">
    <div className="p-6 text-text-primary leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-serif text-[15px]">
      {cleanTextForDisplay(text)}
    </div>
  </div>
);

const ParallelViewer: React.FC<ParallelViewerProps> = ({ report }) => {
  const modelIds = ['gemini', 'gigachat', 'claude'] as const;
  const sourceMeta = SOURCE_BY_REPORT_ID[report.id];

  const winner = modelIds.reduce((currentWinner, model) => {
    const score = calculateWeightedScore((report.scores as any)[model]);
    const maxScore = calculateWeightedScore((report.scores as any)[currentWinner]);
    return score > maxScore ? model : currentWinner;
  }, 'claude');

  const models = modelIds.map((id) => {
    const profile = findLlmProfileByName(id);
    let icon = <Cpu className="w-4 h-4" />;
    if (id === 'gigachat') icon = <Zap className="w-4 h-4" />;
    if (id === 'claude') icon = <Brain className="w-4 h-4" />;

    return {
      id,
      name: profile?.name || id,
      icon,
      color: profile ? `var(--${profile.color}-500, ${MODEL_COLORS[id]})` : MODEL_COLORS[id],
    };
  });

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent/10 rounded-lg">
          <MessageSquareQuote className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-text-primary tracking-tight">Параллельный просмотр</h2>
      </div>


      <div className="mb-6 text-xs text-text-secondary">
        <span className="font-semibold">Источник оригинала:</span>{' '}
        {sourceMeta?.url ? (
          <a className="text-accent hover:underline" href={sourceMeta.url} target="_blank" rel="noreferrer">{sourceMeta.label}</a>
        ) : (
          <span>{sourceMeta?.label || 'N/A'}</span>
        )}
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-0 border border-border rounded-3xl overflow-hidden shadow-soft bg-surface">
        <div className="border-r border-border bg-gray-50/50 min-w-0">
          <ColumnHeader title="Original (EN)" icon={<MessageSquareQuote className="w-4 h-4" />} isOriginal color="#6B7280" />
          <ContentBox text={report.original} />
        </div>

        {models.map((model) => (
          <div
            key={model.id}
            className={cn(
              'border-r border-border last:border-0 transition-colors min-w-0',
              winner === model.id && 'bg-accent-light/40'
            )}
          >
            <ColumnHeader title={model.name} icon={model.icon} color={model.color} />
            <ContentBox text={report.translations[model.id as keyof typeof report.translations]} />
          </div>
        ))}
      </div>

      {/* Tablet Grid */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
        <div className="card p-0 overflow-hidden min-w-0">
          <ColumnHeader title="Original (EN)" icon={<MessageSquareQuote className="w-4 h-4" />} isOriginal color="#6B7280" />
          <ContentBox text={report.original} />
        </div>

        {models.map((model) => (
          <div key={model.id} className="card p-0 overflow-hidden min-w-0">
            <ColumnHeader title={model.name} icon={model.icon} color={model.color} />
            <ContentBox text={report.translations[model.id as keyof typeof report.translations]} />
          </div>
        ))}
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden">
        <Tabs defaultValue="original" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="original" className="text-[10px] uppercase font-bold">Orig</TabsTrigger>
            {models.map((model) => (
              <TabsTrigger key={model.id} value={model.id} className="text-[10px] uppercase font-bold">
                {model.id === 'gigachat' ? 'Giga' : model.name.substring(0, 4)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="original" className="border border-border rounded-2xl bg-surface p-4 font-serif text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
            {cleanTextForDisplay(report.original)}
          </TabsContent>

          {models.map((model) => (
            <TabsContent key={model.id} value={model.id} className="border border-border rounded-2xl bg-surface p-4 font-serif text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
              {cleanTextForDisplay(report.translations[model.id as keyof typeof report.translations])}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ParallelViewer;
