import React from 'react';
import { cn } from '../../lib/utils';
import { findLlmProfileByName } from '../../data/llmProfiles';

interface ModelBadgeProps {
  model: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ModelBadge: React.FC<ModelBadgeProps> = ({ model, size = 'md', className }) => {
  const profile = findLlmProfileByName(model);

  const colorStyles: Record<string, string> = {
    amber: 'bg-amber-400/10 text-amber-600 border-amber-400/20',
    blue: 'bg-blue-400/10 text-blue-600 border-blue-400/20',
    emerald: 'bg-emerald-400/10 text-emerald-600 border-emerald-400/20',
    green: 'bg-green-400/10 text-green-600 border-green-400/20',
    red: 'bg-red-400/10 text-red-600 border-red-400/20',
    teal: 'bg-teal-400/10 text-teal-600 border-teal-400/20',
    slate: 'bg-slate-400/10 text-slate-600 border-slate-400/20',
  };

  const badgeStyle = profile ? colorStyles[profile.color] : 'bg-stone-100 text-stone-600 border-stone-200';
  const label = profile?.shortName || model;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold uppercase tracking-widest border rounded-full transition-colors',
        badgeStyle,
        sizeClasses[size],
        className
      )}
    >
      {label}
    </span>
  );
};

export default ModelBadge;
