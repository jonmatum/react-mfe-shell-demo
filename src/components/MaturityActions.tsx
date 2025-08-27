import { useState, useRef } from 'react';
import { Button, Modal, Text, Heading } from '@jonmatum/react-mfe-shell';
import type { Scores } from '../types/maturity';
import { exportScoresToJson, importScoresFromFile } from '../utils/maturityUtils';
import { DownloadIcon, RefreshIcon, UploadIcon, ExclamationTriangleIcon, InformationCircleIcon } from './Icons';

interface MaturityActionsProps {
  scores: Scores;
  onImport: (scores: Scores) => void;
  onReset: () => void;
}

export function MaturityActions({ scores, onImport, onReset }: MaturityActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  const handleExportConfirm = () => {
    exportScoresToJson(scores);
    setShowExportModal(false);
  };

  const handleExportCancel = () => {
    setShowExportModal(false);
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
          onClick={handleExportClick}
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

      {/* Export Confirmation Modal */}
      <Modal 
        isOpen={showExportModal} 
        onClose={handleExportCancel} 
        title="Export Assessment Data"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
              <DownloadIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <Heading level={3} size="lg" className="text-text-primary mb-2">
                Download Assessment Data
              </Heading>
              <Text className="text-text-secondary">
                This will download your current assessment scores as a JSON file that you can save as a backup or import later.
              </Text>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
            <Button variant="secondary" size="sm" onClick={handleExportCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportConfirm}
              leftIcon={<DownloadIcon className="w-4 h-4" />}
            >
              Download JSON
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal 
        isOpen={showResetModal} 
        onClose={handleResetCancel} 
        title="Reset All Scores"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-danger-100 dark:bg-danger-900 rounded-full flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon className="w-5 h-5 text-danger-600 dark:text-danger-400" />
            </div>
            <div className="flex-1">
              <Heading level={3} size="lg" className="text-text-primary mb-2">
                Reset All Assessment Scores
              </Heading>
              <Text className="text-text-secondary">
                This will permanently delete all your current assessment scores. This action cannot be undone.
              </Text>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg border border-warning-200 dark:border-warning-800">
            <InformationCircleIcon className="w-4 h-4 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
            <Text className="text-sm text-warning-700 dark:text-warning-300">
              Consider exporting your data first to keep a backup.
            </Text>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
            <Button variant="secondary" size="sm" onClick={handleResetCancel}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleResetConfirm}
              leftIcon={<RefreshIcon className="w-4 h-4" />}
            >
              Reset All
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
