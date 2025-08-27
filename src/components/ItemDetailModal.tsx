import { Modal, Heading, Text, Badge, Button } from '@jonmatum/react-mfe-shell';
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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Assessment Item ${itemNumber}`}
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Header with current status */}
        <div className="flex items-start justify-between gap-4 sticky top-0 bg-background-primary pb-4 border-b border-border-secondary">
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

        {/* Description */}
        <div className="px-1">
          <Heading level={4} size="lg" className="text-text-primary mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
            Description
          </Heading>
          <Text className="text-text-secondary leading-relaxed pl-3">{item.description}</Text>
        </div>

        {/* Success Criteria */}
        <div className="px-1">
          <Heading level={4} size="lg" className="text-text-primary mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-success-500 rounded-full"></div>
            Success Criteria
          </Heading>
          <div className="space-y-4 pl-3">
            {/* Partial Implementation */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-warning-50 to-warning-25 border border-warning-200 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
                  <ExclamationIcon className="w-4 h-4 text-warning-600" />
                </div>
                <Badge variant="warning" size="sm">
                  Score 1
                </Badge>
              </div>
              <div className="flex-1">
                <Text className="text-sm font-semibold text-warning-800 mb-2">
                  Partially Implemented
                </Text>
                <Text className="text-sm text-warning-700 leading-relaxed">
                  {item.successCriteria.partial}
                </Text>
              </div>
            </div>

            {/* Full Implementation */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-success-50 to-success-25 border border-success-200 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 text-success-600" />
                </div>
                <Badge variant="success" size="sm">
                  Score 2
                </Badge>
              </div>
              <div className="flex-1">
                <Text className="text-sm font-semibold text-success-800 mb-2">Fully Implemented</Text>
                <Text className="text-sm text-success-700 leading-relaxed">
                  {item.successCriteria.complete}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Score Selection */}
        <div className="px-1">
          <Heading level={4} size="lg" className="text-text-primary mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
            Update Score
          </Heading>
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-xl border border-border-secondary pl-3">
            <div className="flex items-center gap-3">
              {getScoreIcon(currentScore)}
              <div>
                <Text className="text-sm font-medium text-text-primary">
                  {getScoreLabel(currentScore)}
                </Text>
                <Text className="text-xs text-text-tertiary">Current Score: {currentScore} / 2</Text>
              </div>
            </div>
            <ScoreSelector value={currentScore} onChange={onScoreChange} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-border-primary sticky bottom-0 bg-background-primary">
          <div className="flex items-center gap-2 text-text-tertiary">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <Text className="text-xs">Changes saved automatically</Text>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={onClose}
              className="min-w-[100px]"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
