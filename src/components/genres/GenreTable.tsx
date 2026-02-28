import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { MODEL_COLORS, type GenreStats } from '../../types';
import { ArrowUpDown, Trophy } from 'lucide-react';

import { findLlmProfileByName } from '../../data/llmProfiles';

interface GenreTableProps {
  data: GenreStats[];
}

type SortKey = string;

const GenreTable: React.FC<GenreTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>('genreRu');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const ignoredKeys = ['genre', 'genreRu', 'textIds', 'leader', 'leaderMargin', 'observations'];
  const models = data.length > 0 ? Object.keys(data[0]).filter(k => !ignoredKeys.includes(k)) : [];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-bg/50">
              <th
                className="px-6 py-4 text-sm font-semibold text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => handleSort('genreRu')}
              >
                <div className="flex items-center gap-2">
                  Жанр
                  <ArrowUpDown className="w-4 h-4 opacity-50" />
                </div>
              </th>
              {models.map((model) => {
                const profile = findLlmProfileByName(model);
                return (
                  <th
                    key={model}
                    className="px-6 py-4 text-sm font-semibold text-text-secondary cursor-pointer hover:text-text-primary transition-colors text-right"
                    onClick={() => handleSort(model)}
                  >
                    <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest font-bold">
                      {profile?.shortName || model}
                      <ArrowUpDown className="w-4 h-4 opacity-50" />
                    </div>
                  </th>
                );
              })}
              <th className="px-6 py-4 text-sm font-semibold text-text-secondary text-center">
                Лидер
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData.map((row) => (
              <tr
                key={row.genre}
                className="group hover:bg-bg/30 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-text-primary">
                  {row.genreRu}
                </td>
                {models.map((model) => {
                  const val = row[model];
                  const numValue = typeof val === 'number' ? val : 0;
                  return (
                    <td
                      key={model}
                      className={cn(
                        "px-6 py-4 text-sm text-right font-mono",
                        row.leader === model ? "font-bold text-text-primary" : "text-text-secondary"
                      )}
                    >
                      <span
                        className="inline-block px-2 py-0.5 rounded transition-colors"
                        style={{
                          backgroundColor: row.leader === model ? `${MODEL_COLORS[model] || '#A8A29E'}15` : 'transparent',
                          color: row.leader === model ? MODEL_COLORS[model] || '#A8A29E' : 'inherit'
                        }}
                      >
                        {numValue.toFixed(2)}
                      </span>
                    </td>
                  );
                })}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: `${MODEL_COLORS[row.leader] || '#A8A29E'}15`,
                        color: MODEL_COLORS[row.leader] || '#A8A29E',
                        border: `1px solid ${MODEL_COLORS[row.leader] || '#A8A29E'}30`
                      }}
                    >
                      <Trophy className="w-3 h-3" />
                      {row.leader}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenreTable;
