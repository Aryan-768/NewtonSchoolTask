import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  selectedAuthor,
  onAuthorChange,
  dateRange,
  onDateRangeChange,
  sortBy,
  onSortChange,
  totalResults,
  onClearFilters,
  isMobile = false
}) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' }
  ];

  const authorOptions = [
    { value: 'all', label: 'All Authors' },
  { value: 'fill-details', label: 'Fill Details' },
    { value: 'michael-chen', label: 'Michael Chen' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'david-wilson', label: 'David Wilson' },
    { value: 'lisa-anderson', label: 'Lisa Anderson' },
    { value: 'james-brown', label: 'James Brown' },
    { value: 'maria-garcia', label: 'Maria Garcia' },
    { value: 'robert-taylor', label: 'Robert Taylor' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-liked', label: 'Most Liked' },
    { value: 'most-commented', label: 'Most Commented' },
    { value: 'most-viewed', label: 'Most Viewed' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  const hasActiveFilters = searchQuery || 
    (selectedCategory && selectedCategory !== 'all') || 
    (selectedAuthor && selectedAuthor !== 'all') || 
    dateRange?.start || 
    dateRange?.end;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle p-4 mb-6">
      {/* Mobile Filter Toggle */}
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={toggleExpanded}
            iconName={isExpanded ? "ChevronUp" : "Filter"}
            iconPosition="left"
            size="sm"
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {totalResults > 0 && (
            <span className="text-sm text-muted-foreground">
              {totalResults} posts found
            </span>
          )}
        </div>
      )}
      {/* Filter Controls */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Search and Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search posts, authors, or topics..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="w-full"
              />
            </div>
            {!isMobile && totalResults > 0 && (
              <div className="flex items-center space-x-2">
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {totalResults} posts found
                </span>
              </div>
            )}
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <Select
              placeholder="Select category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={onCategoryChange}
              searchable
            />

            {/* Author Filter */}
            <Select
              placeholder="Select author"
              options={authorOptions}
              value={selectedAuthor}
              onChange={onAuthorChange}
              searchable
            />

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="From date"
                value={dateRange?.start}
                onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
              />
              <Input
                type="date"
                placeholder="To date"
                value={dateRange?.end}
                onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
              />
            </div>

            {/* Sort Options */}
            <Select
              placeholder="Sort by"
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
            />
          </div>

          {/* Action Buttons */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">
                  Filters applied
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                size="sm"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;