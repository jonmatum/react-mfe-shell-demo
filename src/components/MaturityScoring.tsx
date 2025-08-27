import { useState, useRef, useMemo } from 'react';
import {
  Heading,
  Text,
  Divider,
  FeatureChip,
  LoadingSpinner,
  formatNumber,
} from '@jonmatum/react-mfe-shell';
import type { MaturityModel, Scores, ScoreValue } from '../types/maturity';
import { usePersistentScores } from '../hooks/usePersistentScores';
import { calculateMaturitySummary } from '../utils/maturityUtils';
import { MaturityOverview } from './MaturityOverview';
import { MaturitySection } from './MaturitySection';
import { MaturityActions } from './MaturityActions';
import { MaturitySearch } from './MaturitySearch';

interface MaturityScoringProps {
  model: MaturityModel;
}

export function MaturityScoring({ model }: MaturityScoringProps) {
  const [scores, setScores] = usePersistentScores(model.storageKey);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const summary = useMemo(() => {
    return calculateMaturitySummary(model, scores);
  }, [model, scores]);

  const handleScoreChange = (itemKey: string, score: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [itemKey]: score as ScoreValue,
    }));
  };

  const handleImport = async (importedScores: Scores) => {
    setIsLoading(true);
    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    setScores(importedScores);
    setIsLoading(false);
  };

  const handleReset = async () => {
    setIsLoading(true);
    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    setScores({});
    setIsLoading(false);
  };

  const handleSearchItemClick = (sectionKey: string, _itemKey: string) => {
    const sectionElement = sectionRefs.current[sectionKey];
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      // Highlight the section briefly
      sectionElement.classList.add('ring-2', 'ring-primary-500', 'ring-opacity-50');
      setTimeout(() => {
        sectionElement.classList.remove('ring-2', 'ring-primary-500', 'ring-opacity-50');
      }, 2000);
    }
  };

  // Calculate some stats for feature chips
  const totalItems = model.sections.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = Object.values(scores).filter((score) => score === 2).length;
  const inProgressItems = Object.values(scores).filter((score) => score === 1).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <Text className="text-text-secondary">Processing your assessment data...</Text>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Header with Stats */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <Heading level={2} size="2xl" className="mb-3 text-text-primary">
              {model.title}
            </Heading>
            <Text className="text-text-secondary mb-4">{model.description}</Text>

            {/* Stats Feature Chips */}
            <div className="flex flex-wrap gap-2">
              <FeatureChip variant="primary" size="sm">
                {formatNumber(totalItems)} Total Items
              </FeatureChip>
              <FeatureChip variant="success" size="sm">
                {formatNumber(completedItems)} Completed
              </FeatureChip>
              <FeatureChip variant="warning" size="sm">
                {formatNumber(inProgressItems)} In Progress
              </FeatureChip>
              <FeatureChip variant="secondary" size="sm">
                {formatNumber(totalItems - completedItems - inProgressItems)} Not Started
              </FeatureChip>
            </div>
          </div>

          <MaturityActions scores={scores} onImport={handleImport} onReset={handleReset} />
        </div>
      </header>

      <Divider className="mb-8" />

      {/* Search Component */}
      <MaturitySearch model={model} scores={scores} onItemClick={handleSearchItemClick} />

      {/* Overview Dashboard */}
      <MaturityOverview summary={summary} />

      {/* Sections with Enhanced Layout */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <Heading level={3} size="lg" className="text-text-primary">
            Assessment Categories
          </Heading>
          <Text className="text-text-secondary text-sm">
            {model.sections.length} categories • {totalItems} total items
          </Text>
        </div>

        {model.sections.map((section, index) => (
          <div
            key={section.key}
            ref={(el) => (sectionRefs.current[section.key] = el)}
            className="transition-all duration-300"
          >
            <MaturitySection
              section={section}
              scores={scores}
              maxPerItem={model.maxPerItem}
              onScoreChange={handleScoreChange}
            />
            {index < model.sections.length - 1 && <Divider className="my-6" />}
          </div>
        ))}
      </div>
    </div>
  );
}
