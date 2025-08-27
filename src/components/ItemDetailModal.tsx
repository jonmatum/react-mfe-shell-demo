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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Assessment Item ${itemNumber}`}
      size="full"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with current status */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Text className="text-sm text-text-secondary font-medium">{sectionTitle}</Text>
              <Badge variant="primary" size="sm">
                Item {itemNumber}
              </Badge>
            </div>
            <Heading level={2} size="xl" className="text-text-primary mb-4">
              {item.label}
            </Heading>
          </div>
          <div className="flex items-center gap-3">
            {getScoreIcon(currentScore)}
            <Badge variant={getScoreBadgeVariant(currentScore)} size="lg">
              {getScoreLabel(currentScore)}
            </Badge>
          </div>
        </div>

        <Divider />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div>
            <Heading level={3} size="lg" className="text-text-primary mb-4">
              Description
            </Heading>
            <Text className="text-text-secondary leading-relaxed text-base">
              {item.description}
            </Text>
          </div>

          {/* Current Score */}
          <div>
            <Heading level={3} size="lg" className="text-text-primary mb-4">
              Current Score
            </Heading>
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
              <div className="flex items-center gap-3">
                {getScoreIcon(currentScore)}
                <div>
                  <Text className="font-medium text-text-primary">
                    {getScoreLabel(currentScore)}
                  </Text>
                  <Text className="text-sm text-text-tertiary">Score: {currentScore} / 2</Text>
                </div>
              </div>
              <ScoreSelector value={currentScore} onChange={onScoreChange} />
            </div>
          </div>
        </div>

        <Divider />

        {/* Success Criteria */}
        <div>
          <Heading level={3} size="lg" className="text-text-primary mb-6">
            Success Criteria
          </Heading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Partial Implementation */}
            <div className="p-6 rounded-lg bg-warning-50 border border-warning-200">
              <div className="flex items-center gap-3 mb-4">
                <ExclamationIcon className="w-6 h-6 text-warning-600" />
                <Badge variant="warning" size="lg">
                  Score 1
                </Badge>
                <Heading level={4} size="lg" className="text-warning-800">
                  Partially Implemented
                </Heading>
              </div>
              <Text className="text-warning-700 leading-relaxed">
                {item.successCriteria.partial}
              </Text>
            </div>

            {/* Full Implementation */}
            <div className="p-6 rounded-lg bg-success-50 border border-success-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircleIcon className="w-6 h-6 text-success-600" />
                <Badge variant="success" size="lg">
                  Score 2
                </Badge>
                <Heading level={4} size="lg" className="text-success-800">
                  Fully Implemented
                </Heading>
              </div>
              <Text className="text-success-700 leading-relaxed">
                {item.successCriteria.complete}
              </Text>
            </div>
          </div>
        </div>

        <Divider />

        {/* Footer Actions */}
        <div className="flex items-center justify-between">
          <Text className="text-text-tertiary text-sm">
            Changes are saved automatically
          </Text>
          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" size="lg" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
