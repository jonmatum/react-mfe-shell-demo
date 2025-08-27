import {
  Select,
  Card,
  Text,
  Heading,
  Divider,
  FeatureChip,
  formatNumber,
} from '@jonmatum/react-mfe-shell';
import type { MaturityModel } from '../types/maturity';
import { DocumentTextIcon, StarIcon } from './Icons';

interface ModelSelectorProps {
  models: { key: string; model: MaturityModel }[];
  selectedModelKey: string;
  onModelChange: (modelKey: string) => void;
}

export function ModelSelector({ models, selectedModelKey, onModelChange }: ModelSelectorProps) {
  const options = models.map(({ key, model }) => ({
    value: key,
    label: model.title,
  }));

  const selectedModel = models.find((m) => m.key === selectedModelKey)?.model;

  return (
    <Card className="p-6 mb-8 bg-gradient-to-r from-surface-primary to-surface-secondary border border-border-primary hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <DocumentTextIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Heading level={3} size="lg" className="text-text-primary">
                Assessment Framework
              </Heading>
              <StarIcon className="w-5 h-5 text-warning-500" />
            </div>
            <Text className="text-sm text-text-secondary mb-4">
              Choose the maturity framework that best aligns with your organizational assessment
              goals
            </Text>

            {selectedModel && (
              <div>
                <Divider className="mb-4" />
                <div className="space-y-3">
                  <div>
                    <Text className="font-medium text-text-primary mb-2">
                      Selected Model: {selectedModel.title}
                    </Text>
                    <Text className="text-sm text-text-secondary">{selectedModel.description}</Text>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const totalItems = selectedModel.sections.reduce((acc, section) => acc + section.items.length, 0);
                      const categories = selectedModel.sections.length;
                      return (
                        <>
                          <FeatureChip variant="primary" size="sm">
                            {formatNumber(categories)} Categories
                          </FeatureChip>
                          <FeatureChip variant="success" size="sm">
                            {formatNumber(totalItems)} Assessment Items
                          </FeatureChip>
                          <FeatureChip variant="secondary" size="sm">
                            Auto-Save Enabled
                          </FeatureChip>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:min-w-[320px]">
          <Text className="text-sm font-medium text-text-primary mb-2">Select Framework</Text>
          <Select
            id="model-selector"
            value={selectedModelKey}
            onChange={(value) => onModelChange(String(value))}
            options={options}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
}
