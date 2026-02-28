import React from 'react';
import { cn } from '../../lib/utils';

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  className?: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, maxScore = 10, className }) => {
  const formattedScore = score.toFixed(2);
  
  let colorClass = 'text-danger';
  if (score >= 9) {
    colorClass = 'text-success';
  } else if (score >= 7) {
    colorClass = 'text-warning';
  }

  return (
    <div className={cn('flex items-baseline gap-1', className)}>
      <span className={cn('text-2xl font-bold tracking-tight', colorClass)}>
        {formattedScore}
      </span>
      <span className="text-sm text-text-secondary">/ {maxScore}</span>
    </div>
  );
};

export default ScoreDisplay;
