import { Modal, Heading, Text, Badge, Divider, Button } from '@jonmatum/react-mfe-shell';
import type { MaturityItem, ScoreValue } from '../types/maturity';
import { CheckCircleIcon, ExclamationIcon, CircleIcon } from './Icons';
import { ScoreSelector } from './ScoreSelector';

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MaturityItem | null;
  sectionTitle: string;
  itemNumber: number;
  currentScore: ScoreValue;
  onScoreChange: (score: ScoreValue) => void;
}

export function ItemDetailModal({
  isOpen,
  onClose,
  item,
  sectionTitle,
  itemNumber,
  currentScore,
  onScoreChange,
}: ItemDetailModalProps) {
  if (!item) return null;

  const getScoreIcon = (score: number) => {
    if (score === 2) return <CheckCircleIcon className="w-5 h-5 text-success-600" />;
    if (score === 1) return <ExclamationIcon className="w-5 h-5 text-warning-600" />;
    return <CircleIcon className="w-5 h-5 text-border-secondary" />;
  };

  const getScoreLabel = (score: number) => {
    if (score === 2) return 'Fully Implemented';
    if (score === 1) return 'Partially Implemented';
    return 'Not Started';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score === 2) return 'success';
    if (score === 1) return 'warning';
    return 'secondary';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assessment Item ${itemNumber}`}>
      <div className="space-y-6">
        {/* Header with current status */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Text className="text-sm text-text-secondary font-medium">{sectionTitle}</Text>
              <Badge variant="primary" size="sm">
                Item {itemNumber}
              </Badge>
            </div>
            <Heading level={3} size="lg" className="text-text-primary">
              {item.label}
            </Heading>
          </div>
          <div className="flex items-center gap-2">
            {getScoreIcon(currentScore)}
            <Badge variant={getScoreBadgeVariant(currentScore)} size="sm">
              {getScoreLabel(currentScore)}
            </Badge>
          </div>
        </div>

        <Divider />

        {/* Description */}
        <div>
          <Heading level={4} size="lg" className="text-text-primary mb-3">
            Description
          </Heading>
          <Text className="text-text-secondary leading-relaxed">{item.description}</Text>
        </div>

        <Divider />

        {/* Success Criteria */}
        <div>
          <Heading level={4} size="lg" className="text-text-primary mb-4">
            Success Criteria
          </Heading>
          <div className="space-y-4">
            {/* Partial Implementation */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-warning-50 border border-warning-200">
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <ExclamationIcon className="w-4 h-4 text-warning-600" />
                <Badge variant="warning" size="sm">
                  Score 1
                </Badge>
              </div>
              <div className="flex-1">
                <Text className="text-sm font-medium text-warning-800 mb-1">
                  Partially Implemented
                </Text>
                <Text className="text-sm text-warning-700 leading-relaxed">
                  {item.successCriteria.partial}
                </Text>
              </div>
            </div>

            {/* Full Implementation */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-success-50 border border-success-200">
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <CheckCircleIcon className="w-4 h-4 text-success-600" />
                <Badge variant="success" size="sm">
                  Score 2
                </Badge>
              </div>
              <div className="flex-1">
                <Text className="text-sm font-medium text-success-800 mb-1">Fully Implemented</Text>
                <Text className="text-sm text-success-700 leading-relaxed">
                  {item.successCriteria.complete}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Score Selection */}
        <div>
          <Heading level={4} size="lg" className="text-text-primary mb-4">
            Current Score
          </Heading>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getScoreIcon(currentScore)}
              <div>
                <Text className="text-sm font-medium text-text-primary">
                  {getScoreLabel(currentScore)}
                </Text>
                <Text className="text-xs text-text-tertiary">Score: {currentScore} / 2</Text>
              </div>
            </div>
            <ScoreSelector value={currentScore} onChange={onScoreChange} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
