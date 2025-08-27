import { Badge, Button, Divider, Heading, Modal, Text } from '@jonmatum/react-mfe-shell';
import type { MaturityItem, ScoreValue } from '../types/maturity';
import { CheckCircleIcon, CircleIcon, ExclamationIcon } from './Icons';
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
      <div className="flex flex-col max-h-max max-w-full mx-auto">
        <div className='max-h-max overflow-auto'>
          {/* Header Section */}
          <div className="flex-shrink-0 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="primary" size="lg">
                    {sectionTitle}
                  </Badge>
                  <Badge variant="secondary" size="lg">
                    Item {itemNumber}
                  </Badge>
                </div>
                <Heading level={1} size="3xl" className="text-text-primary leading-tight mb-4 sm:mb-0">
                  {item.label}
                </Heading>
              </div>

              {/* Merged Status & Score Section */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-surface-secondary border border-border-secondary overflow-hidden">
                  <div className="flex items-center gap-3 min-w-0">
                    {getScoreIcon(currentScore)}
                    <div className="min-w-0">
                      <Badge variant={getScoreBadgeVariant(currentScore)} size="lg">
                        {getScoreLabel(currentScore)}
                      </Badge>
                      <Text className="text-text-tertiary text-sm mt-1">
                        Score: {currentScore} / 2
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Text className="text-sm font-medium text-text-secondary whitespace-nowrap hidden sm:block">
                      Update Score:
                    </Text>
                    <ScoreSelector value={currentScore} onChange={onScoreChange} />
                  </div>
                </div>
              </div>
            </div>
            <Divider className="mt-6" />
          </div>

          {/* Main Content - Scrollable content area with vertical scrolling */}
          <div className="flex-1 min-h-0 overflow-auto">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8 min-w-0">

              {/* Description Column */}
              <div className="xl:col-span-1 min-w-0">
                <div className="xl:sticky xl:top-0">
                  <Heading level={2} size="2xl" className="text-text-primary mb-4">
                    Description
                  </Heading>
                  <Text className="text-text-secondary leading-relaxed text-lg break-words">
                    {item.description}
                  </Text>
                </div>
              </div>

              {/* Success Criteria Columns */}
              <div className="xl:col-span-3 min-w-0">
                <Heading level={2} size="2xl" className="text-text-primary mb-6">
                  Success Criteria & Implementation Guide
                </Heading>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
                  {/* Partial Implementation */}
                  <div className="p-6 rounded-xl bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 min-w-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-warning-100 dark:bg-warning-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <ExclamationIcon className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                      </div>
                      <div className="min-w-0">
                        <Badge variant="warning" size="lg">
                          Score 1
                        </Badge>
                        <Heading level={3} size="lg" className="text-warning-800 dark:text-warning-200 mt-1">
                          Partially Implemented
                        </Heading>
                      </div>
                    </div>

                    <Divider className="mb-4" />

                    <div>
                      <Heading level={4} size="sm" className="text-warning-700 dark:text-warning-300 mb-3">
                        Requirements for Score 1:
                      </Heading>
                      <Text className="text-warning-700 dark:text-warning-300 leading-relaxed break-words">
                        {item.successCriteria.partial}
                      </Text>
                    </div>
                  </div>

                  {/* Full Implementation */}
                  <div className="p-6 rounded-xl bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 min-w-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-success-100 dark:bg-success-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-5 h-5 text-success-600 dark:text-success-400" />
                      </div>
                      <div className="min-w-0">
                        <Badge variant="success" size="lg">
                          Score 2
                        </Badge>
                        <Heading level={3} size="lg" className="text-success-800 dark:text-success-200 mt-1">
                          Fully Implemented
                        </Heading>
                      </div>
                    </div>

                    <Divider className="mb-4" />

                    <div>
                      <Heading level={4} size="sm" className="text-success-700 dark:text-success-300 mb-3">
                        Requirements for Score 2:
                      </Heading>
                      <Text className="text-success-700 dark:text-success-300 leading-relaxed break-words">
                        {item.successCriteria.complete}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Section - Always at Bottom */}
        <div className="flex-shrink-0 mt-6 pt-4 border-t border-border-primary">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 order-2 sm:order-1">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
              <Text className="text-text-tertiary text-sm">
                Changes are automatically saved to local storage
              </Text>
            </div>
            <div className="flex gap-4 order-1 sm:order-2">
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
