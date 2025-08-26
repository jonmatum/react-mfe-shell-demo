import { Button } from '@jonmatum/react-mfe-shell';
import type { ScoreValue } from '../types/maturity';

interface ScoreSelectorProps {
  value: ScoreValue;
  onChange: (value: ScoreValue) => void;
}

export function ScoreSelector({ value, onChange }: ScoreSelectorProps) {
  const scores: ScoreValue[] = [0, 1, 2];

  return (
    <div className="inline-flex rounded-lg border border-border-primary overflow-hidden bg-surface-primary">
      {scores.map((score) => (
        <Button
          key={score}
          variant={value === score ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onChange(score)}
          className={`
            rounded-none border-0 px-3 py-1.5 text-sm font-medium transition-all duration-150
            ${score === 0 ? 'rounded-l-lg' : ''}
            ${score === 2 ? 'rounded-r-lg' : ''}
            ${
              value === score
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-surface-primary text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
            }
          `}
        >
          {score}
        </Button>
      ))}
    </div>
  );
}
