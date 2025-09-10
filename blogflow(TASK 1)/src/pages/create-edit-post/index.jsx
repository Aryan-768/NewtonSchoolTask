import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PostEditor from './components/PostEditor';
import PostSettings from './components/PostSettings';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import PublishActions from './components/PublishActions';
import Icon from '../../components/AppIcon';

const CreateEditPost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams?.get('id');
  const isEditing = Boolean(postId);

  // Mock user data
  const mockUser = {
    id: 1,
  name: "Fill Details",
  email: "Fill Details",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Post state
  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    status: 'draft',
    publishDate: '',
    featuredImage: null,
    metaTitle: '',
    metaDescription: ''
  });

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(false);

  // Mock existing post data for editing
  const mockExistingPost = {
    id: 1,
    title: "Getting Started with React Hooks",
    content: `<h2>Introduction to React Hooks</h2>\n<p>React Hooks have revolutionized the way we write React components. They allow us to use state and other React features without writing a class component.</p>\n\n<h3>Why Use Hooks?</h3>\n<ul>\n<li>Simpler component logic</li>\n<li>Better code reuse</li>\n<li>Easier testing</li>\n<li>Improved performance</li>\n</ul>\n\n<p>In this comprehensive guide, we'll explore the most commonly used hooks and learn how to implement them effectively in your React applications.</p>`,
    excerpt: "Learn how React Hooks can simplify your component logic and improve code reusability in modern React applications.",
    category: 'technology',
    tags: ['React', 'JavaScript', 'Web Development', 'Frontend'],
    status: 'draft',publishDate: '',
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    metaTitle: "React Hooks Guide - Complete Tutorial",
    metaDescription: "Master React Hooks with this comprehensive tutorial covering useState, useEffect, and custom hooks."
  };

  // Load existing post data if editing
  useEffect(() => {
    if (isEditing) {
      setPost(mockExistingPost);
      setLastSaved(new Date(Date.now() - 300000)); // 5 minutes ago
    }
  }, [isEditing]);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (hasUnsavedChanges && (post?.title || post?.content)) {
      setIsSaving(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSaving(false);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    }
  }, [hasUnsavedChanges, post?.title, post?.content]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [autoSave]);

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [post]);

  // Handle post updates
  const updatePost = (field, value) => {
    setPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save draft
  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setPost(prev => ({ ...prev, status: 'draft' }));
    setIsSaving(false);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  // Handle preview
  const handlePreview = () => {
    // In a real app, this would open a preview modal or new tab
    console.log('Preview post:', post);
  };

  // Handle publish
  const handlePublish = async () => {
    if (!post?.title?.trim() || !post?.content?.trim()) {
      alert('Please add a title and content before publishing.');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPost(prev => ({ ...prev, status: 'published' }));
    setIsSaving(false);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
    
    // Navigate to published post
    navigate('/blog-post-detail?id=1');
  };

  // Handle schedule
  const handleSchedule = () => {
    const scheduleDate = prompt('Enter publish date and time (YYYY-MM-DD HH:MM):');
    if (scheduleDate) {
      updatePost('publishDate', scheduleDate);
      updatePost('status', 'scheduled');
    }
  };

  // Handle auth actions
  const handleAuthAction = (action) => {
    if (action === 'logout') {
      navigate('/login');
    }
  };

  const canPublish = post?.title?.trim() && post?.content?.trim() && post?.category;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/user-dashboard' },
    { label: isEditing ? 'Edit Post' : 'Create Post', path: '/create-edit-post', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} onAuthAction={handleAuthAction} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isEditing ? 'Update your existing blog post' : 'Share your thoughts with the world'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <AutoSaveIndicator
                lastSaved={lastSaved}
                isSaving={isSaving}
                hasUnsavedChanges={hasUnsavedChanges}
              />
              
              <button
                onClick={() => setShowMobileSettings(!showMobileSettings)}
                className="lg:hidden p-2 rounded-md border border-border hover:bg-muted transition-smooth"
              >
                <Icon name="Settings" size={20} />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Section */}
            <div className="lg:col-span-2">
              <PostEditor
                title={post?.title}
                content={post?.content}
                featuredImage={post?.featuredImage}
                onTitleChange={(value) => updatePost('title', value)}
                onContentChange={(value) => updatePost('content', value)}
                onImageUpload={(value) => updatePost('featuredImage', value)}
              />
            </div>

            {/* Settings Panel */}
            <div className={`lg:col-span-1 ${showMobileSettings ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24 space-y-6">
                <PostSettings
                  category={post?.category}
                  tags={post?.tags}
                  status={post?.status}
                  publishDate={post?.publishDate}
                  excerpt={post?.excerpt}
                  onCategoryChange={(value) => updatePost('category', value)}
                  onTagsChange={(value) => updatePost('tags', value)}
                  onStatusChange={(value) => updatePost('status', value)}
                  onPublishDateChange={(value) => updatePost('publishDate', value)}
                  onExcerptChange={(value) => updatePost('excerpt', value)}
                  onFeaturedImageUpload={(value) => updatePost('featuredImage', value)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Publish Actions - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-elevated z-40">
        <PublishActions
          status={post?.status}
          onSaveDraft={handleSaveDraft}
          onPreview={handlePreview}
          onPublish={handlePublish}
          onSchedule={handleSchedule}
          isLoading={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
          canPublish={canPublish}
        />
      </div>
      {/* Bottom Padding to Account for Fixed Actions */}
      <div className="h-24"></div>
    </div>
  );
};

export default CreateEditPost;