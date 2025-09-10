import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ 
  lastSaved = null, 
  isSaving = false, 
  hasUnsavedChanges = false 
}) => {
  const [saveStatus, setSaveStatus] = useState('saved');

  useEffect(() => {
    if (isSaving) {
      setSaveStatus('saving');
    } else if (hasUnsavedChanges) {
      setSaveStatus('unsaved');
    } else {
      setSaveStatus('saved');
    }
  }, [isSaving, hasUnsavedChanges]);

  const getStatusConfig = () => {
    switch (saveStatus) {
      case 'saving':
        return {
          icon: 'Loader2',
          text: 'Saving...',
          className: 'text-warning animate-spin'
        };
      case 'unsaved':
        return {
          icon: 'AlertCircle',
          text: 'Unsaved changes',
          className: 'text-warning'
        };
      case 'saved':
        return {
          icon: 'Check',
          text: lastSaved ? `Saved ${formatTime(lastSaved)}` : 'All changes saved',
          className: 'text-success'
        };
      default:
        return {
          icon: 'AlertCircle',
          text: 'Unknown status',
          className: 'text-muted-foreground'
        };
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    
    return new Date(date)?.toLocaleDateString();
  };

  const status = getStatusConfig();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Icon 
        name={status?.icon} 
        size={14} 
        className={status?.className}
      />
      <span className={`${status?.className} font-medium`}>
        {status?.text}
      </span>
    </div>
  );
};

export default AutoSaveIndicator;