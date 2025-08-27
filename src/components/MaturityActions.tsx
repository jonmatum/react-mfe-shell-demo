import { useState, useRef } from 'react';
import { Button, Modal, Text, Heading } from '@jonmatum/react-mfe-shell';
import type { Scores } from '../types/maturity';
import { exportScoresToJson, importScoresFromFile } from '../utils/maturityUtils';
import { DownloadIcon, RefreshIcon, UploadIcon, ExclamationTriangleIcon } from './Icons';

interface MaturityActionsProps {
  scores: Scores;
  onImport: (scores: Scores) => void;
  onReset: () => void;
}

export function MaturityActions({ scores, onImport, onReset }: MaturityActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleExport = () => {
    exportScoresToJson(scores);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedScores = await importScoresFromFile(file);
      onImport(importedScores);
    } catch (error) {
      alert(`Failed to import file: ${(error as Error).message}`);
    }

    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    onReset();
    setShowResetModal(false);
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <Button
          variant="danger"
          size="sm"
          onClick={handleResetClick}
          leftIcon={<RefreshIcon className="w-4 h-4" />}
        >
          Reset All
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleExport}
          leftIcon={<DownloadIcon className="w-4 h-4" />}
        >
          Export JSON
        </Button>
        <Button
          variant="success"
          size="sm"
          onClick={handleImportClick}
          leftIcon={<UploadIcon className="w-4 h-4" />}
        >
          Import JSON
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Enhanced Reset Confirmation Modal */}
      <Modal 
        isOpen={showResetModal} 
        onClose={handleResetCancel} 
        title="Reset All Scores"
      >
        <div className="space-y-6">
          {/* Warning Header */}
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-danger-50 to-warning-50 rounded-xl border border-danger-200">
            <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon className="w-6 h-6 text-danger-600" />
            </div>
            <div className="flex-1">
              <Heading level={3} size="lg" className="text-danger-800 mb-2">
                Permanent Action Warning
              </Heading>
              <Text className="text-danger-700 text-sm leading-relaxed">
                This action will permanently delete all your current assessment scores and cannot be undone.
              </Text>
            </div>
          </div>

          {/* Impact Details */}
          <div className="space-y-4">
            <div>
              <Heading level={4} size="lg" className="text-text-primary mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-primary-500 rounded-full"></div>
                What will be reset:
              </Heading>
              <div className="space-y-2 pl-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
                  <Text className="text-text-secondary">All assessment item scores</Text>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
                  <Text className="text-text-secondary">Section progress calculations</Text>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
                  <Text className="text-text-secondary">Overall maturity percentages</Text>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <DownloadIcon className="w-3 h-3 text-primary-600" />
                </div>
                <div>
                  <Text className="text-sm font-medium text-primary-800 mb-1">
                    💡 Recommendation
                  </Text>
                  <Text className="text-sm text-primary-700">
                    Consider exporting your data first if you want to keep a backup of your current progress.
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border-primary">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleResetCancel}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleExport}
                leftIcon={<DownloadIcon className="w-4 h-4" />}
                className="min-w-[120px]"
              >
                Export First
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleResetConfirm}
                leftIcon={<RefreshIcon className="w-4 h-4" />}
                className="min-w-[120px]"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
