import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PostSettings = ({
  category = '',
  tags = [],
  status = 'draft',
  publishDate = '',
  excerpt = '',
  onCategoryChange = () => {},
  onTagsChange = () => {},
  onStatusChange = () => {},
  onPublishDateChange = () => {},
  onExcerptChange = () => {},
  onFeaturedImageUpload = () => {}
}) => {
  const [newTag, setNewTag] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'technology', label: 'Technology' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'business', label: 'Business' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'finance', label: 'Finance' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'private', label: 'Private' }
  ];

  const handleAddTag = () => {
    if (newTag?.trim() && !tags?.includes(newTag?.trim())) {
      onTagsChange([...tags, newTag?.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(tags?.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Post Settings</h3>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="md:hidden p-1 rounded hover:bg-muted transition-smooth"
        >
          <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={16} />
        </button>
      </div>
      {/* Content */}
      <div className={`${isCollapsed ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 space-y-6">
          {/* Category Selection */}
          <div>
            <Select
              label="Category"
              options={categoryOptions}
              value={category}
              onChange={onCategoryChange}
              placeholder="Choose a category"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddTag}
                  iconName="Plus"
                  disabled={!newTag?.trim()}
                >
                  Add
                </Button>
              </div>
              {tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive transition-smooth"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => onExcerptChange(e?.target?.value)}
              placeholder="Write a brief description of your post..."
              rows={3}
              className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {excerpt?.length}/160 characters
            </p>
          </div>

          {/* Publication Status */}
          <div>
            <Select
              label="Publication Status"
              options={statusOptions}
              value={status}
              onChange={onStatusChange}
            />
          </div>

          {/* Publish Date */}
          {status === 'scheduled' && (
            <div>
              <Input
                type="datetime-local"
                label="Publish Date"
                value={publishDate}
                onChange={(e) => onPublishDateChange(e?.target?.value)}
                min={new Date()?.toISOString()?.slice(0, 16)}
              />
            </div>
          )}

          {/* Featured Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Featured Image
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth">
              <Icon name="Upload" size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drop an image here or click to browse
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('featured-image-input')?.click()}
                iconName="Image"
                iconPosition="left"
              >
                Choose Image
              </Button>
              <input
                id="featured-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e?.target?.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => onFeaturedImageUpload(event?.target?.result);
                    reader?.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Search" size={16} className="mr-2" />
              SEO Settings
            </h4>
            <div className="space-y-3">
              <Input
                type="text"
                label="Meta Title"
                placeholder="SEO title for search engines"
                className="text-sm"
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Meta Description
                </label>
                <textarea
                  placeholder="Brief description for search results..."
                  rows={2}
                  className="w-full p-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSettings;