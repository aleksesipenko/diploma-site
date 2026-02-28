import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { TextReport } from '../../types';
import { GENRE_LABELS } from '../../types';
import { cn } from '../../lib/utils';
import { FileText, Newspaper, BookOpen, Briefcase, Sparkles, Languages } from 'lucide-react';

interface TextSelectorProps {
  reports: TextReport[];
}

const genreIcons: Record<string, React.ReactNode> = {
  'news': <Newspaper className="w-4 h-4" />,
  'scipop': <BookOpen className="w-4 h-4" />,
  'business': <Briefcase className="w-4 h-4" />,
  'advertising': <Sparkles className="w-4 h-4" />,
  'fiction': <Languages className="w-4 h-4" />,
};

const TextSelector: React.FC<TextSelectorProps> = ({ reports }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentId = parseInt(searchParams.get('id') || '1');

  const handleSelect = (id: number) => {
    navigate(`?id=${id}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
      {reports.map((report) => {
        const isActive = report.id === currentId;
        const genreLabel = GENRE_LABELS[report.genreRu] || report.genreRu;
        
        return (
          <button
            key={report.id}
            onClick={() => handleSelect(report.id)}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 group",
              isActive 
                ? "bg-stone-900 border-stone-900 shadow-xl shadow-stone-200" 
                : "bg-white border-stone-100 hover:border-stone-300 hover:bg-stone-50"
            )}
          >
            <div className={cn(
              "flex items-center justify-between w-full mb-3",
              isActive ? "text-stone-400" : "text-stone-500"
            )}>
              <span className="text-xs font-bold tracking-widest uppercase">Текст #{report.id}</span>
              {genreIcons[report.genre] || <FileText className="w-4 h-4" />}
            </div>
            
            <h3 className={cn(
              "text-sm font-serif font-medium line-clamp-1 mb-2",
              isActive ? "text-white" : "text-stone-900"
            )}>
              {report.title}
            </h3>
            
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
              isActive 
                ? "bg-stone-800 text-stone-300" 
                : "bg-stone-100 text-stone-500"
            )}>
              {genreLabel}
            </span>

            {isActive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TextSelector;
