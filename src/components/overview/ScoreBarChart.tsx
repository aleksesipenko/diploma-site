import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { MODEL_COLORS } from '../../types';

import { findLlmProfileByName } from '../../data/llmProfiles';

interface ScoreBarChartProps {
  data: Record<string, number>;
}

const ScoreBarChart: React.FC<ScoreBarChartProps> = ({ data }) => {
  const chartData = Object.keys(data).map((key) => {
    const profile = findLlmProfileByName(key);
    return {
      name: profile?.shortName || key,
      score: data[key],
      color: profile ? `var(--${profile.color}-500, ${MODEL_COLORS[key]})` : MODEL_COLORS[key] || '#A8A29E',
    };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="card h-full flex flex-col">
      <h3 className="text-xl font-serif font-semibold text-text-primary mb-6">Сравнение итоговых баллов</h3>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            <XAxis type="number" domain={[0, 10]} hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ fill: '#4B5563', fontSize: 14, fontWeight: 600, fontFamily: 'Inter' }}
            />
            <Tooltip
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            />
            <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={40} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
              ))}
              <LabelList
                dataKey="score"
                position="right"
                style={{ fill: '#111827', fontWeight: 700, fontSize: 14, fontFamily: 'Inter' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-sm text-text-secondary italic">
        * Баллы рассчитаны на основе взвешенной суммы по 5 критериям оценки.
      </div>
    </div>
  );
};

export default ScoreBarChart;
