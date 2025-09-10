import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PublishActions = ({
  status = 'draft',
  onSaveDraft = () => {},
  onPreview = () => {},
  onPublish = () => {},
  onSchedule = () => {},
  isLoading = false,
  hasUnsavedChanges = false,
  canPublish = true
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleActionWithConfirm = (action, actionFn) => {
    if (hasUnsavedChanges && action !== 'draft') {
      setConfirmAction({ action, fn: actionFn });
      setShowConfirmDialog(true);
    } else {
      actionFn();
    }
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction?.fn();
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const getPublishButtonText = () => {
    switch (status) {
      case 'published':
        return 'Update';
      case 'scheduled':
        return 'Update Schedule';
      default:
        return 'Publish';
    }
  };

  const getPublishButtonIcon = () => {
    switch (status) {
      case 'published':
        return 'RefreshCw';
      case 'scheduled':
        return 'Calendar';
      default:
        return 'Send';
    }
  };

  return (
    <>
      <div className="bg-card border-t border-border p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Left Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => handleActionWithConfirm('draft', onSaveDraft)}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              disabled={!hasUnsavedChanges && status === 'draft'}
            >
              Save Draft
            </Button>
            
            <Button
              variant="ghost"
              onClick={onPreview}
              iconName="Eye"
              iconPosition="left"
            >
              Preview
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {status !== 'scheduled' && (
              <Button
                variant="outline"
                onClick={() => handleActionWithConfirm('schedule', onSchedule)}
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule
              </Button>
            )}
            
            <Button
              variant="default"
              onClick={() => handleActionWithConfirm('publish', onPublish)}
              loading={isLoading}
              disabled={!canPublish}
              iconName={getPublishButtonIcon()}
              iconPosition="left"
            >
              {getPublishButtonText()}
            </Button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>Status: {status?.charAt(0)?.toUpperCase() + status?.slice(1)}</span>
            </span>
            
            {hasUnsavedChanges && (
              <span className="flex items-center space-x-1 text-warning">
                <Icon name="AlertCircle" size={14} />
                <span>Unsaved changes</span>
              </span>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleString()}
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-popover border border-border rounded-lg shadow-elevated max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-popover-foreground">
                    Unsaved Changes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You have unsaved changes that will be lost.
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-popover-foreground mb-6">
                Do you want to save your changes before {confirmAction?.action === 'publish' ? 'publishing' : 'continuing'}?
              </p>
              
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleConfirm();
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  Discard Changes
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    onSaveDraft();
                    handleConfirm();
                  }}
                >
                  Save & Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublishActions;