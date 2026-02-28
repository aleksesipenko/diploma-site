import diplomaDataJson from '../data/diploma-data.json';
import type { DiplomaData, TextReport } from '../types';

export const useDiplomaData = () => {
  const data = diplomaDataJson as unknown as DiplomaData;

  const getReportById = (id: number): TextReport | undefined => {
    return data.reports.find((report) => report.id === id);
  };

  return {
    summary: data.summary,
    reports: data.reports,
    getReportById,
  } as const;
};
