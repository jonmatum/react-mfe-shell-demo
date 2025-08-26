import { useState, useMemo } from 'react';
import { SearchBox, Card, Text, Badge, FeatureChip, Divider } from '@jonmatum/react-mfe-shell';
import type { MaturityModel, Scores, SearchResult } from '../types/maturity';

interface MaturitySearchProps {
  model: MaturityModel;
  scores: Scores;
  onItemClick: (sectionKey: string, itemKey: string) => void;
}

export function MaturitySearch({ model, scores, onItemClick }: MaturitySearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const results: SearchResult[] = [];

    model.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          results.push({
            sectionTitle: section.title,
            sectionKey: section.key,
            itemKey: item.key,
            itemLabel: item.label,
            score: scores[`${section.key}-${item.key}`],
          });
        }
      });
    });

    return results;
  }, [searchQuery, model, scores]);

  const getScoreVariant = (score: number) => {
    if (score === 0) return 'secondary';
    if (score === 1) return 'warning';
    return 'success';
  };

  const getScoreLabel = (score: number) => {
    if (score === 0) return 'Not Started';
    if (score === 1) return 'Partial';
    return 'Complete';
  };

  return (
    <Card className="p-6 mb-8 border border-border-primary">
      <div className="mb-4">
        <Text className="font-medium text-text-primary mb-2">Search Assessment Items</Text>
        <SearchBox
          placeholder="Search across all categories and items..."
          value={searchQuery}
          onChange={setSearchQuery}
          showClearButton
          size="lg"
          className="w-full"
        />
      </div>

      {searchQuery.trim() && (
        <>
          <Divider className="mb-4" />
          <div className="mb-3 flex items-center justify-between">
            <Text className="text-sm text-text-secondary">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </Text>
            {searchResults.length > 0 && (
              <FeatureChip variant="primary" size="sm">
                {searchResults.filter((r: SearchResult) => (r.score ?? 0) > 0).length} scored
              </FeatureChip>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Text className="text-text-secondary">No items match your search criteria</Text>
              </div>
            ) : (
              searchResults.map((result: SearchResult) => (
                <div
                  key={`${result.sectionKey}-${result.itemKey}`}
                  className="p-3 rounded-lg bg-surface-secondary hover:bg-surface-primary border border-border-secondary hover:border-border-primary transition-all duration-150 cursor-pointer"
                  onClick={() => onItemClick(result.sectionKey, result.itemKey)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <Text className="text-sm font-medium text-text-primary mb-1">
                        {result.itemLabel}
                      </Text>
                      <Text className="text-xs text-text-secondary">in {result.sectionTitle}</Text>
                    </div>
                    <Badge variant={getScoreVariant(result.score ?? 0)} size="sm">
                      {result.score ?? 0} - {getScoreLabel(result.score ?? 0)}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </Card>
  );
}
