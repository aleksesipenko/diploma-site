// Types for diploma website data model

export interface CriteriaScores {
  adequacy: number;      // A. Адекватность (35%)
  style: number;         // B. Жанр и стиль (25%)
  naturalness: number;   // C. Естественность (20%)
  terminology: number;   // D. Терминология (10%)
  pragmatics: number;    // E. Прагматика (10%)
}

export type ModelScores = Record<string, CriteriaScores>;

export type CriterionAnalysis = Record<string, string>;

export interface TextReport {
  id: number;
  title: string;
  genre: string;
  genreRu: string;
  genreDescription: string;
  original: string;
  translations: Record<string, string>;
  scores: ModelScores;
  observations: Record<string, string[]>;
  analysis: {
    adequacy: CriterionAnalysis;
    style: CriterionAnalysis;
    naturalness: CriterionAnalysis;
    terminology: CriterionAnalysis;
    pragmatics: CriterionAnalysis;
  };
}

export interface GenreStats {
  genre: string;
  genreRu: string;
  textIds: number[];
  leader: string;
  leaderMargin: number;
  observations: string[];
  [modelScores: string]: number | string | string[] | number[];
}

export interface ModelProfile {
  score: number;
  traits: string;
  errors: string;
}

export interface SummaryData {
  metrics?: Record<string, Record<string, number>>; // Keep metrics mapping if it's there
  modelProfiles: Record<string, ModelProfile>;
  limitations: string[];
  conclusions: string[];
}

export interface DiplomaData {
  summary: SummaryData;
  reports: TextReport[];
}

// Criterion weights
export const CRITERION_WEIGHTS = {
  adequacy: 0.35,
  style: 0.25,
  naturalness: 0.20,
  terminology: 0.10,
  pragmatics: 0.10,
} as const;

// Criterion labels
export const CRITERION_LABELS = {
  adequacy: 'Адекватность',
  style: 'Жанр и стиль',
  naturalness: 'Естественность',
  terminology: 'Терминология',
  pragmatics: 'Прагматика',
} as const;

// Initial pre-configured model colors (for fallback/defaults)
export const MODEL_COLORS: Record<string, string> = {
  gemini: '#4285F4',
  gigachat: '#00A651',
  claude: '#D97706',
};

// Genre mapping
export const GENRE_LABELS: Record<string, string> = {
  'Новости': 'Новостной',
  'Научпоп': 'Научно-популярный',
  'Офиц.-деловой': 'Официально-деловой',
  'Реклама': 'Рекламный',
  'Художественный': 'Художественный',
};
