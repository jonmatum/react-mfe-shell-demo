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
    if (score === 2) return <CheckCircleIcon className="w-6 h-6 text-success-600 dark:text-success-400" />;
    if (score === 1) return <ExclamationIcon className="w-6 h-6 text-warning-600 dark:text-warning-400" />;
    return <CircleIcon className="w-6 h-6 text-text-tertiary" />;
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
      title="Assessment Item Details"
      size="full"
    >
      <div className="h-full flex flex-col max-w-7xl mx-auto">
        {/* Header Section - Fixed */}
        <div className="flex-shrink-0 pb-6 border-b border-border-primary">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="primary" size="lg">
                  {sectionTitle}
                </Badge>
                <Badge variant="secondary" size="lg">
                  Item {itemNumber}
                </Badge>
              </div>
              <Heading level={1} size="3xl" className="text-text-primary mb-4 leading-tight">
                {item.label}
              </Heading>
            </div>
            <div className="flex-shrink-0 flex items-center gap-4">
              {getScoreIcon(currentScore)}
              <Badge variant={getScoreBadgeVariant(currentScore)} size="lg">
                {getScoreLabel(currentScore)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full">
            
            {/* Description Column */}
            <div className="xl:col-span-1">
              <div className="sticky top-0 space-y-6">
                <div>
                  <Heading level={2} size="2xl" className="text-text-primary mb-4">
                    Description
                  </Heading>
                  <div className="p-6 rounded-xl bg-surface-secondary border border-border-secondary">
                    <Text className="text-text-secondary leading-relaxed text-lg">
                      {item.description}
                    </Text>
                  </div>
                </div>

                {/* Current Score Section */}
                <div>
                  <Heading level={2} size="2xl" className="text-text-primary mb-4">
                    Update Score
                  </Heading>
                  <div className="p-6 rounded-xl bg-surface-primary border border-border-primary">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {getScoreIcon(currentScore)}
                        <div>
                          <Text className="font-semibold text-text-primary text-lg">
                            {getScoreLabel(currentScore)}
                          </Text>
                          <Text className="text-text-tertiary">
                            Current Score: {currentScore} / 2
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <ScoreSelector value={currentScore} onChange={onScoreChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Criteria Columns */}
            <div className="xl:col-span-2">
              <Heading level={2} size="2xl" className="text-text-primary mb-6">
                Success Criteria & Implementation Guide
              </Heading>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Partial Implementation */}
                <div className="flex flex-col">
                  <div className="flex-1 p-8 rounded-xl bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-warning-100 dark:bg-warning-800 rounded-full flex items-center justify-center">
                        <ExclamationIcon className="w-6 h-6 text-warning-600 dark:text-warning-400" />
                      </div>
                      <div>
                        <Badge variant="warning" size="lg">
                          Score 1
                        </Badge>
                        <Heading level={3} size="xl" className="text-warning-800 dark:text-warning-200 mt-2">
                          Partially Implemented
                        </Heading>
                      </div>
                    </div>
                    
                    <Divider className="mb-6" />
                    
                    <div className="space-y-4">
                      <Heading level={4} size="lg" className="text-warning-700 dark:text-warning-300">
                        Requirements for Score 1:
                      </Heading>
                      <Text className="text-warning-700 dark:text-warning-300 leading-relaxed text-base">
                        {item.successCriteria.partial}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Full Implementation */}
                <div className="flex flex-col">
                  <div className="flex-1 p-8 rounded-xl bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-success-100 dark:bg-success-800 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-success-600 dark:text-success-400" />
                      </div>
                      <div>
                        <Badge variant="success" size="lg">
                          Score 2
                        </Badge>
                        <Heading level={3} size="xl" className="text-success-800 dark:text-success-200 mt-2">
                          Fully Implemented
                        </Heading>
                      </div>
                    </div>
                    
                    <Divider className="mb-6" />
                    
                    <div className="space-y-4">
                      <Heading level={4} size="lg" className="text-success-700 dark:text-success-300">
                        Requirements for Score 2:
                      </Heading>
                      <Text className="text-success-700 dark:text-success-300 leading-relaxed text-base">
                        {item.successCriteria.complete}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section - Fixed */}
        <div className="flex-shrink-0 pt-6 border-t border-border-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
              <Text className="text-text-tertiary">
                Changes are automatically saved to local storage
              </Text>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" size="lg" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" size="lg" onClick={onClose}>
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
