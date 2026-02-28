import React from 'react';
import type { TextReport } from '../../types';
import { MODEL_COLORS } from '../../types';
import { cn } from '../../lib/utils';
import { Cpu, Zap, Brain, MessageSquareQuote } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { findLlmProfileByName } from '../../data/llmProfiles';

interface ParallelViewerProps {
  report: TextReport;
}

const ColumnHeader = ({ title, icon, color, isOriginal = false }: { title: string, icon: React.ReactNode, color?: string, isOriginal?: boolean }) => (
  <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border p-4 flex items-center gap-3">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
      style={{ backgroundColor: color || '#6B7280' }}
    >
      {icon}
    </div>
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
        {isOriginal ? 'Источник' : 'Перевод'}
      </h4>
      <h3 className="font-serif font-medium text-text-primary">{title}</h3>
    </div>
  </div>
);

const ContentBox = ({ text }: { text: string }) => (
  <div className="h-full relative">
    <div className="p-6 text-text-primary leading-relaxed whitespace-pre-wrap font-serif text-[15px] sticky top-[80px]">
      {text}
    </div>
  </div>
);

const ParallelViewer: React.FC<ParallelViewerProps> = ({ report }) => {
  const modelIds = ['gemini', 'gigachat', 'claude'] as const;

  const models = modelIds.map(id => {
    const profile = findLlmProfileByName(id);
    let icon = <Cpu className="w-4 h-4" />;
    if (id === 'gigachat') icon = <Zap className="w-4 h-4" />;
    if (id === 'claude') icon = <Brain className="w-4 h-4" />;

    return {
      id,
      name: profile?.name || id,
      icon,
      color: profile ? `var(--${profile.color}-500, ${MODEL_COLORS[id]})` : MODEL_COLORS[id]
    };
  });

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-accent/10 rounded-lg">
          <MessageSquareQuote className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-text-primary tracking-tight">Параллельный просмотр</h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-0 border border-border rounded-3xl overflow-hidden shadow-soft bg-surface">
        <div className="border-r border-border bg-gray-50/50">
          <ColumnHeader title="Original (EN)" icon={<MessageSquareQuote className="w-4 h-4" />} isOriginal color="#6B7280" />
          <ContentBox text={report.original} />
        </div>

        {models.map((model) => (
          <div key={model.id} className={cn(
            "border-r border-border last:border-0 transition-colors",
            report.winner === model.id && "bg-accent-light/40"
          )}>
            <ColumnHeader title={model.name} icon={model.icon} color={model.color} />
            <ContentBox text={report.translations[model.id as keyof typeof report.translations]} />
          </div>
        ))}
      </div>

      {/* Tablet Grid */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
        <div className="card p-0 overflow-hidden">
          <ColumnHeader title="Original (EN)" icon={<MessageSquareQuote className="w-4 h-4" />} isOriginal color="#6B7280" />
          <ContentBox text={report.original} />
        </div>

        {models.map((model) => (
          <div key={model.id} className="card p-0 overflow-hidden">
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
            {models.map(model => (
              <TabsTrigger key={model.id} value={model.id} className="text-[10px] uppercase font-bold">
                {model.id === 'gigachat' ? 'Giga' : model.name.substring(0, 4)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="original" className="border border-border rounded-2xl bg-surface p-4 font-serif text-sm leading-relaxed shadow-sm">
            {report.original}
          </TabsContent>

          {models.map((model) => (
            <TabsContent key={model.id} value={model.id} className="border border-border rounded-2xl bg-surface p-4 font-serif text-sm leading-relaxed shadow-sm">
              {report.translations[model.id as keyof typeof report.translations]}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ParallelViewer;
