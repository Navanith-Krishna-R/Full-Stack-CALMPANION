// lib/assessment-scoring.ts
//
// Lightweight, self-assessment-only scoring for the survey/quiz feature.
// This intentionally does NOT diagnose anything — it maps frequency-style
// answers ("Never" / "Often" / "Nearly every day" ...) onto a 0-100 scale
// and buckets the result into a plain-language tier with a clear disclaimer.

const FREQUENCY_WEIGHTS: { pattern: RegExp; weight: number }[] = [
  { pattern: /not at all|^never$/i, weight: 0 },
  { pattern: /rarely/i, weight: 1 },
  { pattern: /several days/i, weight: 1 },
  { pattern: /sometimes/i, weight: 2 },
  { pattern: /more than half/i, weight: 2 },
  { pattern: /^often$/i, weight: 3 },
  { pattern: /nearly every day/i, weight: 3 },
  { pattern: /very often/i, weight: 4 },
];

const MAX_WEIGHT = 4;

function weightFor(answer: string): number {
  const match = FREQUENCY_WEIGHTS.find(({ pattern }) => pattern.test(answer.trim()));
  return match ? match.weight : 2; // unrecognized answers count as a neutral midpoint
}

export interface ScoredAssessment {
  score: number; // 0-100
  summary: string;
}

export function scoreAssessment(quizName: string, answers: Record<string, string>): ScoredAssessment {
  const values = Object.values(answers);
  if (values.length === 0) {
    return { score: 0, summary: 'No answers were provided.' };
  }

  const totalWeight = values.reduce((sum, answer) => sum + weightFor(answer), 0);
  const score = Math.round((totalWeight / (values.length * MAX_WEIGHT)) * 100);

  let tier: string;
  if (score < 25) tier = 'minimal';
  else if (score < 50) tier = 'mild';
  else if (score < 75) tier = 'moderate';
  else tier = 'elevated';

  const summary =
    `Your responses to the ${quizName} suggest a ${tier} level of the symptoms this screener asks about. ` +
    'This is a self-assessment tool, not a medical diagnosis — please share these results with a licensed ' +
    'professional for an accurate evaluation and next steps.';

  return { score, summary };
}
