import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PostEditor = ({ 
  title = '', 
  content = '', 
  onTitleChange = () => {}, 
  onContentChange = () => {},
  onImageUpload = () => {},
  featuredImage = null
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  const formatButtons = [
    { name: 'Bold', icon: 'Bold', command: 'bold' },
    { name: 'Italic', icon: 'Italic', command: 'italic' },
    { name: 'Underline', icon: 'Underline', command: 'underline' },
    { name: 'Strikethrough', icon: 'Strikethrough', command: 'strikethrough' }
  ];

  const structureButtons = [
    { name: 'Heading 1', icon: 'Heading1', command: 'formatBlock', value: 'h1' },
    { name: 'Heading 2', icon: 'Heading2', command: 'formatBlock', value: 'h2' },
    { name: 'Heading 3', icon: 'Heading3', command: 'formatBlock', value: 'h3' },
    { name: 'Paragraph', icon: 'Type', command: 'formatBlock', value: 'p' }
  ];

  const listButtons = [
    { name: 'Bullet List', icon: 'List', command: 'insertUnorderedList' },
    { name: 'Numbered List', icon: 'ListOrdered', command: 'insertOrderedList' }
  ];

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef?.current?.focus();
  };

  const handleContentInput = (e) => {
    onContentChange(e?.target?.innerHTML);
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event?.target?.result);
        setShowImageUpload(false);
      };
      reader?.readAsDataURL(file);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      handleFormat('createLink', url);
    }
  };

  const insertImage = () => {
    fileInputRef?.current?.click();
  };

  useEffect(() => {
    if (contentRef?.current && content !== contentRef?.current?.innerHTML) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-card-foreground">Content Editor</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={isPreviewMode ? "default" : "outline"}
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            iconName={isPreviewMode ? "Edit" : "Eye"}
            iconPosition="left"
          >
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>
      {/* Title Input */}
      <div className="p-4 border-b border-border">
        <Input
          type="text"
          placeholder="Enter your post title..."
          value={title}
          onChange={(e) => onTitleChange(e?.target?.value)}
          className="text-2xl font-bold border-none bg-transparent p-0 focus:ring-0"
          style={{ fontSize: '1.5rem', fontWeight: '700' }}
        />
      </div>
      {/* Featured Image */}
      {featuredImage && (
        <div className="p-4 border-b border-border">
          <div className="relative group">
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onImageUpload(null)}
                iconName="Trash2"
                iconPosition="left"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isPreviewMode ? (
        <>
          {/* Toolbar */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex flex-wrap items-center gap-2">
              {/* Format Buttons */}
              <div className="flex items-center space-x-1 border-r border-border pr-2">
                {formatButtons?.map((btn) => (
                  <button
                    key={btn?.command}
                    onClick={() => handleFormat(btn?.command)}
                    className="p-2 rounded hover:bg-muted transition-smooth"
                    title={btn?.name}
                  >
                    <Icon name={btn?.icon} size={16} />
                  </button>
                ))}
              </div>

              {/* Structure Buttons */}
              <div className="flex items-center space-x-1 border-r border-border pr-2">
                {structureButtons?.map((btn) => (
                  <button
                    key={btn?.value}
                    onClick={() => handleFormat(btn?.command, btn?.value)}
                    className="p-2 rounded hover:bg-muted transition-smooth"
                    title={btn?.name}
                  >
                    <Icon name={btn?.icon} size={16} />
                  </button>
                ))}
              </div>

              {/* List Buttons */}
              <div className="flex items-center space-x-1 border-r border-border pr-2">
                {listButtons?.map((btn) => (
                  <button
                    key={btn?.command}
                    onClick={() => handleFormat(btn?.command)}
                    className="p-2 rounded hover:bg-muted transition-smooth"
                    title={btn?.name}
                  >
                    <Icon name={btn?.icon} size={16} />
                  </button>
                ))}
              </div>

              {/* Media Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={insertLink}
                  className="p-2 rounded hover:bg-muted transition-smooth"
                  title="Insert Link"
                >
                  <Icon name="Link" size={16} />
                </button>
                <button
                  onClick={insertImage}
                  className="p-2 rounded hover:bg-muted transition-smooth"
                  title="Insert Image"
                >
                  <Icon name="Image" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="p-4">
            <div
              ref={contentRef}
              contentEditable
              onInput={handleContentInput}
              className="min-h-96 p-4 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background prose prose-slate max-w-none"
              style={{ minHeight: '400px' }}
              placeholder="Start writing your post..."
            />
          </div>
        </>
      ) : (
        /* Preview Mode */
        (<div className="p-6">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            {title || 'Untitled Post'}
          </h1>
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full h-64 object-cover rounded-md mb-6"
            />
          )}
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: content || '<p>No content yet...</p>' }}
          />
        </div>)
      )}
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default PostEditor;