import type { TextReport } from '../types';
import { CRITERION_WEIGHTS } from '../types';

/**
 * Calculates the weighted score for a single model's criteria.
 */
export function calculateWeightedScore(criteria: Record<string, number>): number {
    if (!criteria) return 0;

    const weighted =
        (criteria.adequacy || 0) * CRITERION_WEIGHTS.adequacy +
        (criteria.style || 0) * CRITERION_WEIGHTS.style +
        (criteria.naturalness || 0) * CRITERION_WEIGHTS.naturalness +
        (criteria.terminology || 0) * CRITERION_WEIGHTS.terminology +
        (criteria.pragmatics || 0) * CRITERION_WEIGHTS.pragmatics;

    return Number(weighted.toFixed(2));
}

/**
 * Calculates the average score for each criterion across all reports for all models.
 */
export function calculateCriteriaAverages(reports: TextReport[]): Record<string, Record<string, number>> {
    const sums: Record<string, Record<string, number>> = {};
    const counts: Record<string, number> = {};

    reports.forEach(report => {
        Object.entries(report.scores).forEach(([modelId, modelData]) => {
            // In clean data, modelData might only have the criteria keys or a nested 'criteria' object.
            // Based on the data structure, they are direct keys: adequacy, style...
            const criteria = modelData;

            if (!sums[modelId]) {
                sums[modelId] = { adequacy: 0, style: 0, naturalness: 0, terminology: 0, pragmatics: 0, weightedSum: 0 };
                counts[modelId] = 0;
            }

            sums[modelId].adequacy += criteria.adequacy || 0;
            sums[modelId].style += criteria.style || 0;
            sums[modelId].naturalness += criteria.naturalness || 0;
            sums[modelId].terminology += criteria.terminology || 0;
            sums[modelId].pragmatics += criteria.pragmatics || 0;

            const weighted = calculateWeightedScore(criteria as any);
            sums[modelId].weightedSum += weighted;

            counts[modelId]++;
        });
    });

    const averages: Record<string, Record<string, number>> = {};
    Object.keys(sums).forEach(modelId => {
        const count = counts[modelId];
        if (count > 0) {
            averages[modelId] = {
                adequacy: Number((sums[modelId].adequacy / count).toFixed(2)),
                style: Number((sums[modelId].style / count).toFixed(2)),
                naturalness: Number((sums[modelId].naturalness / count).toFixed(2)),
                terminology: Number((sums[modelId].terminology / count).toFixed(2)),
                pragmatics: Number((sums[modelId].pragmatics / count).toFixed(2)),
                weighted: Number((sums[modelId].weightedSum / count).toFixed(2))
            };
        }
    });

    return averages;
}

/**
 * Calculates rankings and average scores grouped by genre.
 */
export function calculateGenreRankings(reports: TextReport[]) {
    const genres: Record<string, { genreRu: string, texts: TextReport[], modelSums: Record<string, number> }> = {};

    reports.forEach(report => {
        if (!genres[report.genre]) {
            genres[report.genre] = {
                genreRu: report.genreRu,
                texts: [],
                modelSums: {}
            };
        }

        genres[report.genre].texts.push(report);

        Object.entries(report.scores).forEach(([modelId, criteria]) => {
            if (!genres[report.genre].modelSums[modelId]) {
                genres[report.genre].modelSums[modelId] = 0;
            }
            genres[report.genre].modelSums[modelId] += calculateWeightedScore(criteria as any);
        });
    });

    return Object.entries(genres).map(([genre, data]) => {
        const count = data.texts.length;
        const averages: Record<string, number> = {};

        Object.entries(data.modelSums).forEach(([modelId, sum]) => {
            averages[modelId] = Number((sum / count).toFixed(2));
        });

        // Determine leader
        let leader = '';
        let maxScore = -1;
        let secondMaxScore = -1;

        Object.entries(averages).forEach(([modelId, score]) => {
            if (score > maxScore) {
                secondMaxScore = maxScore;
                maxScore = score;
                leader = modelId;
            } else if (score > secondMaxScore) {
                secondMaxScore = score;
            }
        });

        const leaderMargin = Number((maxScore - Math.max(0, secondMaxScore)).toFixed(2));

        return {
            genre,
            genreRu: data.genreRu,
            textIds: data.texts.map(t => t.id),
            leader,
            leaderMargin,
            observations: [],
            ...averages
        };
    });
}

/**
 * Calculates the overall leaderboard across all reports.
 */
export function calculateOverallLeaderboard(reports: TextReport[]) {
    const modelSums: Record<string, number> = {};
    const modelWins: Record<string, number> = {};
    const count = reports.length;

    reports.forEach(report => {
        let reportLeader = '';
        let maxScore = -1;

        Object.entries(report.scores).forEach(([modelId, criteria]) => {
            if (!modelSums[modelId]) modelSums[modelId] = 0;
            if (!modelWins[modelId]) modelWins[modelId] = 0;

            const score = calculateWeightedScore(criteria as any);
            modelSums[modelId] += score;

            if (score > maxScore) {
                maxScore = score;
                reportLeader = modelId;
            }
        });

        if (reportLeader) {
            modelWins[reportLeader]++;
        }
    });

    const averages: Record<string, number> = {};
    Object.entries(modelSums).forEach(([modelId, sum]) => {
        averages[modelId] = Number((sum / count).toFixed(2));
    });

    // Calculate overall winner
    let overallWinner = '';
    let maxAvg = -1;
    Object.entries(averages).forEach(([modelId, score]) => {
        if (score > maxAvg) {
            maxAvg = score;
            overallWinner = modelId;
        }
    });

    // Calculate genre wins
    const genreRanks = calculateGenreRankings(reports);
    let overallGenreWins = 0;
    genreRanks.forEach(g => {
        if (g.leader === overallWinner) overallGenreWins++;
    });

    return {
        averages,
        wins: modelWins,
        winner: {
            model: overallWinner,
            score: maxAvg,
            wins: modelWins[overallWinner] || 0,
            genreWins: overallGenreWins,
        }
    };
}
