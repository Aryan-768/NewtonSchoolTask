import React from 'react';
import Button from '../../../components/ui/Button';

const LoadMoreButton = ({ 
  onLoadMore, 
  loading = false, 
  hasMore = true, 
  totalLoaded = 0, 
  totalAvailable = 0 
}) => {
  if (!hasMore && totalLoaded > 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 text-muted-foreground">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">
            You've reached the end! All {totalAvailable} posts loaded.
          </span>
        </div>
      </div>
    );
  }

  if (!hasMore) {
    return null;
  }

  return (
    <div className="text-center py-8">
      <Button
        variant="outline"
        onClick={onLoadMore}
        loading={loading}
        iconName="ChevronDown"
        iconPosition="right"
        size="lg"
        className="min-w-[200px]"
      >
        {loading ? 'Loading...' : 'Load More Posts'}
      </Button>
      {totalLoaded > 0 && totalAvailable > 0 && (
        <p className="text-sm text-muted-foreground mt-3">
          Showing {totalLoaded} of {totalAvailable} posts
        </p>
      )}
    </div>
  );
};

export default LoadMoreButton;