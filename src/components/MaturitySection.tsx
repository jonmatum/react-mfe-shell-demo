import { useState } from 'react';
import {
  Card,
  Text,
  Heading,
  Badge,
  Divider,
  FeatureChip,
  formatNumber,
} from '@jonmatum/react-mfe-shell';
import type { MaturitySection as MaturitySectionType, Scores, ScoreValue } from '../types/maturity';
import { ScoreSelector } from './ScoreSelector';
import { ItemDetailModal } from './ItemDetailModal';
import { ClipboardListIcon, CheckCircleIcon, ExclamationIcon, CircleIcon } from './Icons';

interface MaturitySectionProps {
  section: MaturitySectionType;
  scores: Scores;
  maxPerItem: number;
  onScoreChange: (itemKey: string, score: number) => void;
}

export function MaturitySection({
  section,
  scores,
  maxPerItem,
  onScoreChange,
}: MaturitySectionProps) {
  const [selectedItem, setSelectedItem] = useState<{
    item: MaturitySectionType['items'][0];
    index: number;
  } | null>(null);

  const max = section.items.length * maxPerItem;
  const total = section.items.reduce((acc, item) => acc + (scores[item.key] ?? 0), 0);
  const pct = Math.round((total / max) * 100) || 0;

  // Calculate item-level stats
  const completedItems = section.items.filter((item) => (scores[item.key] ?? 0) === 2).length;
  const partialItems = section.items.filter((item) => (scores[item.key] ?? 0) === 1).length;
  const notStartedItems = section.items.filter((item) => (scores[item.key] ?? 0) === 0).length;

  const getSectionBadgeVariant = (pct: number) => {
    if (pct <= 30) return 'secondary';
    if (pct <= 60) return 'warning';
    if (pct <= 85) return 'primary';
    return 'success';
  };

  const getItemIcon = (score: number) => {
    if (score === 2) return <CheckCircleIcon className="w-4 h-4 text-success-600" />;
    if (score === 1) return <ExclamationIcon className="w-4 h-4 text-warning-600" />;
    return <CircleIcon className="w-4 h-4 text-border-secondary" />;
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border border-border-primary">
      {/* Enhanced Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <ClipboardListIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <Heading level={3} size="lg" className="text-text-primary mb-2">
              {section.title}
            </Heading>
            <Text className="text-sm text-text-secondary mb-3">
              {formatNumber(section.items.length)} assessment items
            </Text>

            {/* Item Stats with FeatureChips */}
            <div className="flex flex-wrap gap-2">
              <FeatureChip variant="success" size="sm">
                {formatNumber(completedItems)} Complete
              </FeatureChip>
              <FeatureChip variant="warning" size="sm">
                {formatNumber(partialItems)} Partial
              </FeatureChip>
              <FeatureChip variant="secondary" size="sm">
                {formatNumber(notStartedItems)} Not Started
              </FeatureChip>
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <Badge variant={getSectionBadgeVariant(pct)} className="mb-2 text-lg px-3 py-1">
            {pct}%
          </Badge>
          <Text className="text-sm text-text-secondary font-medium block">
            {formatNumber(total)} / {formatNumber(max)} points
          </Text>
        </div>
      </div>

      <Divider className="mb-6" />

      {/* Assessment Items */}
      <div className="space-y-3">
        {section.items.map((item, index) => {
          const itemScore = scores[item.key] ?? 0;
          return (
            <div
              key={item.key}
              className="flex items-start justify-between gap-4 p-4 rounded-lg hover:bg-surface-secondary transition-colors duration-150 border border-transparent hover:border-border-secondary"
            >
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-surface-secondary rounded-full flex items-center justify-center">
                      <Text className="text-xs font-medium text-text-secondary">{index + 1}</Text>
                    </div>
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={() => setSelectedItem({ item, index })}
                      className="text-left w-full group"
                    >
                      <Text className="text-sm leading-6 text-text-primary font-medium group-hover:text-primary-600 transition-colors duration-150">
                        {item.label}
                      </Text>
                    </button>
                    <div className="flex items-center gap-2 mt-2">
                      {getItemIcon(itemScore)}
                      <Text className="text-xs text-text-tertiary">
                        {itemScore === 0 && 'Not started'}
                        {itemScore === 1 && 'Partially implemented'}
                        {itemScore === 2 && 'Fully implemented'}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <ScoreSelector
                value={itemScore as 0 | 1 | 2}
                onChange={(score) => onScoreChange(item.key, score)}
              />
            </div>
          );
        })}
      </div>

      <Divider className="my-6" />

      {/* Enhanced Progress Section */}
      <div className="bg-surface-secondary rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <Text className="text-sm font-medium text-text-primary">Section Progress</Text>
          <div className="flex items-center gap-2">
            <Text className="text-sm font-bold text-text-primary">{pct}%</Text>
            <Text className="text-xs text-text-secondary">
              ({formatNumber(total)}/{formatNumber(max)})
            </Text>
          </div>
        </div>

        <div className="w-full bg-background-primary rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className={`h-3 transition-all duration-700 ease-out rounded-full ${
              pct <= 30
                ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                : pct <= 60
                  ? 'bg-gradient-to-r from-warning-400 to-warning-600'
                  : pct <= 85
                    ? 'bg-gradient-to-r from-primary-400 to-primary-600'
                    : 'bg-gradient-to-r from-success-400 to-success-600'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-text-tertiary mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        item={selectedItem?.item || null}
        sectionTitle={section.title}
        itemNumber={(selectedItem?.index ?? 0) + 1}
        currentScore={(selectedItem ? (scores[selectedItem.item.key] ?? 0) : 0) as ScoreValue}
        onScoreChange={(score) => {
          if (selectedItem) {
            onScoreChange(selectedItem.item.key, score);
          }
        }}
      />
    </Card>
  );
}
