import React from 'react';

interface LimitationsListProps {
  limitations: string[];
}

const LimitationsList: React.FC<LimitationsListProps> = ({ limitations }) => {
  if (!limitations || limitations.length === 0) {
    return (
      <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 text-stone-500 italic">
        Ограничения исследования не указаны.
      </div>
    );
  }

  // Basic categorization logic
  const methodological = limitations.filter(l => 
    l.toLowerCase().includes('метод') || 
    l.toLowerCase().includes('оценк') || 
    l.toLowerCase().includes('балл')
  );
  
  const corpusRelated = limitations.filter(l => 
    l.toLowerCase().includes('текст') || 
    l.toLowerCase().includes('корпус') || 
    l.toLowerCase().includes('выборк') ||
    !methodological.includes(l)
  );

  return (
    <div className="space-y-8 my-8">
      {methodological.length > 0 && (
        <div>
          <h3 className="text-lg font-serif font-medium text-stone-900 mb-4 flex items-center">
            <span className="w-8 h-px bg-stone-300 mr-3"></span>
            Методологические ограничения
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-stone-600 ml-4">
            {methodological.map((limit, index) => (
              <li key={index} className="pl-2">{limit}</li>
            ))}
          </ol>
        </div>
      )}

      {corpusRelated.length > 0 && (
        <div>
          <h3 className="text-lg font-serif font-medium text-stone-900 mb-4 flex items-center">
            <span className="w-8 h-px bg-stone-300 mr-3"></span>
            Ограничения корпуса и данных
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-stone-600 ml-4">
            {corpusRelated.map((limit, index) => (
              <li key={index} className="pl-2">{limit}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default LimitationsList;
