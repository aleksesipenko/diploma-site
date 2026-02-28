import React from 'react';
import { type ModelScores, type CriteriaScores, CRITERION_LABELS, MODEL_COLORS } from '../../types';
import { calculateWeightedScore } from '../../utils/calculations';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface CriteriaBreakdownProps {
  data: ModelScores;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
    [key: string]: unknown;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border p-4 rounded-xl shadow-lg backdrop-blur-md">
        <p className="font-bold text-text-primary mb-3">{label}</p>
        <div className="space-y-2">
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-text-secondary capitalize">
                  {entry.name}
                </span>
              </div>
              <span className="text-sm font-bold font-mono">
                {entry.value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const CriteriaBreakdown: React.FC<CriteriaBreakdownProps> = ({ data }) => {
  const models = Object.keys(data);
  const chartData = Object.keys(CRITERION_LABELS).map((key) => {
    const entry: Record<string, string | number> = { name: CRITERION_LABELS[key as keyof typeof CRITERION_LABELS] };
    models.forEach(model => {
      entry[model] = data[model][key as keyof CriteriaScores];
    });
    return entry;
  });

  return (
    <div className="space-y-12">
      <div className="h-[500px] w-full bg-surface border border-border rounded-3xl p-8 shadow-soft">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={8}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E6E2DD"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5B5752', fontSize: 12, fontWeight: 600 }}
              dy={15}
            />
            <YAxis
              domain={[0, 10]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5B5752', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#FAF9F7' }} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '40px' }}
              formatter={(value) => (
                <span className="text-sm font-bold text-text-primary capitalize ml-2">
                  {value}
                </span>
              )}
            />
            {models.map(model => (
              <Bar
                key={model}
                dataKey={model}
                name={model}
                fill={MODEL_COLORS[model] || '#A8A29E'}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model}
            className="card border-l-4 overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            style={{ borderLeftColor: MODEL_COLORS[model] || '#A8A29E' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight capitalize">
                {model}
              </h3>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: `${MODEL_COLORS[model] || '#A8A29E'}15`, color: MODEL_COLORS[model] || '#A8A29E' }}
              >
                Балл: {calculateWeightedScore(data[model] as any).toFixed(2)}
              </div>
            </div>

            <div className="space-y-4">
              {Object.keys(CRITERION_LABELS).map((key) => {
                const score = data[model][key as keyof CriteriaScores];
                return (
                  <div key={key} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-text-secondary">{CRITERION_LABELS[key as keyof typeof CRITERION_LABELS]}</span>
                      <span className="text-text-primary">{score.toFixed(1)}</span>
                    </div>
                    <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${score * 10}%`,
                          backgroundColor: MODEL_COLORS[model] || '#A8A29E',
                          opacity: 0.3 + (score / 10) * 0.7
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriteriaBreakdown;
