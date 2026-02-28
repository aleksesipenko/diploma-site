import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { MODEL_COLORS, CRITERION_LABELS } from '../../types';
import type { ModelScores } from '../../types';
import { findLlmProfileByName } from '../../data/llmProfiles';


interface CriteriaRadarProps {
  data: ModelScores;
}

const CriteriaRadar: React.FC<CriteriaRadarProps> = ({ data }) => {
  const models = Object.keys(data);
  const chartData = Object.keys(CRITERION_LABELS).map((criterionKey) => {
    const entry: Record<string, string | number> = {
      subject: CRITERION_LABELS[criterionKey as keyof typeof CRITERION_LABELS],
      fullMark: 10,
    };
    models.forEach(model => {
      entry[model] = data[model][criterionKey as keyof typeof CRITERION_LABELS];
    });
    return entry;
  });

  return (
    <div className="card h-full flex flex-col">
      <h3 className="text-xl font-serif font-semibold text-text-primary mb-6">Профиль компетенций</h3>

      <div className="flex-1 w-full min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500, fontFamily: 'Inter' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 10]}
              axisLine={false}
              tick={false}
            />

            {models.map(model => {
              const profile = findLlmProfileByName(model);
              return (
                <Radar
                  key={model}
                  name={profile?.name || model}
                  dataKey={model}
                  stroke={profile ? `var(--${profile.color}-500, ${MODEL_COLORS[model]})` : MODEL_COLORS[model] || '#A8A29E'}
                  fill={profile ? `var(--${profile.color}-500, ${MODEL_COLORS[model]})` : MODEL_COLORS[model] || '#A8A29E'}
                  fillOpacity={0.15}
                  animationDuration={1500}
                />
              );
            })}

            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontFamily: 'Inter', fontSize: '14px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CriteriaRadar;
