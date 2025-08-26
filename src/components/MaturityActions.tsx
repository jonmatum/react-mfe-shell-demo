import { useState, useRef } from 'react';
import { Button, Modal, Text, Heading } from '@jonmatum/react-mfe-shell';
import type { Scores } from '../types/maturity';
import { exportScoresToJson, importScoresFromFile } from '../utils/maturityUtils';
import { DownloadIcon, RefreshIcon, UploadIcon } from './Icons';

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

      {/* Reset Confirmation Modal */}
      <Modal isOpen={showResetModal} onClose={handleResetCancel} title="Reset All Scores">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-danger-100 rounded-full flex items-center justify-center flex-shrink-0">
              <RefreshIcon className="w-5 h-5 text-danger-600" />
            </div>
            <div className="flex-1">
              <Heading level={3} size="lg" className="text-text-primary mb-2">
                Are you sure you want to reset all scores?
              </Heading>
              <Text className="text-text-secondary">
                This action will permanently delete all your current assessment scores and cannot be
                undone. Consider exporting your data first if you want to keep a backup.
              </Text>
            </div>
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
              Reset All Scores
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
