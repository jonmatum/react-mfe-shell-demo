export interface MaturityItem {
  readonly key: string;
  readonly label: string;
  readonly description: string;
  readonly successCriteria: {
    readonly partial: string; // What constitutes a score of 1
    readonly complete: string; // What constitutes a score of 2
  };
}

export interface MaturitySection {
  readonly key: string;
  readonly title: string;
  readonly items: readonly MaturityItem[];
}

export interface MaturityModel {
  readonly sections: readonly MaturitySection[];
  readonly maxPerItem: number;
  readonly storageKey: string;
  readonly title: string;
  readonly description: string;
}

export interface SectionSummary {
  key: string;
  title: string;
  max: number;
  total: number;
  pct: number;
}

export interface MaturitySummary {
  perSection: SectionSummary[];
  totals: {
    total: number;
    max: number;
  };
  overallPct: number;
}

export type ScoreValue = 0 | 1 | 2;
export type Scores = Record<string, ScoreValue>;

export interface SearchResult {
  sectionKey: string;
  sectionTitle: string;
  itemKey: string;
  itemLabel: string;
  score?: ScoreValue;
}
