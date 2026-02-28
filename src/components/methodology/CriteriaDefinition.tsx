import React from 'react';

const criteria = [
  {
    id: 'A',
    name: 'Адекватность',
    weight: '35%',
    description: 'Точность передачи смысла оригинала, отсутствие фактических ошибок и искажений содержания.'
  },
  {
    id: 'B',
    name: 'Жанр и стиль',
    weight: '25%',
    description: 'Соответствие жанровым конвенциям, соблюдение стилистического регистра и тональности оригинала.'
  },
  {
    id: 'C',
    name: 'Естественность',
    weight: '20%',
    description: 'Естественность русского языка, отсутствие "переводческого налета", соблюдение норм лексической сочетаемости.'
  },
  {
    id: 'D',
    name: 'Терминология',
    weight: '10%',
    description: 'Корректность использования специальной терминологии и соблюдение терминологического единообразия.'
  },
  {
    id: 'E',
    name: 'Прагматика',
    weight: '10%',
    description: 'Сохранение прагматического воздействия на читателя, адаптация культурных реалий и идиом.'
  }
];

const CriteriaDefinition: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {criteria.map((item) => (
        <div key={item.id} className="bg-stone-50 border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-2xl font-serif font-bold text-stone-300">{item.id}</span>
            <span className="bg-stone-200 text-stone-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
              {item.weight}
            </span>
          </div>
          <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">{item.name}</h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CriteriaDefinition;
