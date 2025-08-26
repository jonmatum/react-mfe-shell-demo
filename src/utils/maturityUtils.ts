import type { MaturityModel, MaturitySummary, Scores } from '../types/maturity';

export function interpretMaturityLevel(pct: number): string {
  if (pct <= 30) return 'Initial / Prototype';
  if (pct <= 60) return 'Developing';
  if (pct <= 85) return 'Established';
  return 'Optimized';
}

export function calculateMaturitySummary(model: MaturityModel, scores: Scores): MaturitySummary {
  const perSection = model.sections.map((section) => {
    const max = section.items.length * model.maxPerItem;
    const total = section.items.reduce((acc, item) => acc + (scores[item.key] ?? 0), 0);
    const pct = max ? Math.round((total / max) * 100) : 0;
    return {
      key: section.key,
      title: section.title,
      max,
      total,
      pct,
    };
  });

  const totals = perSection.reduce(
    (acc, section) => ({
      total: acc.total + section.total,
      max: acc.max + section.max,
    }),
    { total: 0, max: 0 }
  );

  const overallPct = totals.max ? Math.round((totals.total / totals.max) * 100) : 0;

  return { perSection, totals, overallPct };
}

export function exportScoresToJson(
  scores: Scores,
  filename: string = 'maturity-scores.json'
): void {
  const blob = new Blob([JSON.stringify(scores, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function importScoresFromFile(file: File): Promise<Scores> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        resolve(data || {});
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
