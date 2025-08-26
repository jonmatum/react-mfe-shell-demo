import { useEffect, useState } from 'react';
import type { Scores } from '../types/maturity';

export function usePersistentScores(
  storageKey: string
): [Scores, React.Dispatch<React.SetStateAction<Scores>>] {
  const [scores, setScores] = useState<Scores>({});

  // Load scores from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsedScores = JSON.parse(raw);
        setScores(parsedScores);
      }
    } catch (error) {
      console.warn('Failed to load scores from localStorage:', error);
    }
  }, [storageKey]);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(scores));
    } catch (error) {
      console.warn('Failed to save scores to localStorage:', error);
    }
  }, [scores, storageKey]);

  return [scores, setScores];
}
