import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import DashboardMetrics from './components/DashboardMetrics';
import PostCard from './components/PostCard';
import LikeCard from './components/LikeCard';
import CommentCard from './components/CommentCard';
import TabNavigation from './components/TabNavigation';
import EmptyState from './components/EmptyState';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    id: 1,
  name: "Fill Details",
  email: "Fill Details",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock dashboard data
  const mockDashboardData = {
    metrics: {
      totalPosts: 12,
      totalLikes: 248,
      totalComments: 67
    },
    posts: [
      {
        id: 1,
        title: "Getting Started with React Hooks: A Comprehensive Guide",
        excerpt: "Learn how to use React Hooks effectively in your applications. This guide covers useState, useEffect, and custom hooks with practical examples.",
        status: "published",
        publishedAt: "2025-01-05T10:30:00Z",
        likesCount: 45,
        commentsCount: 12,
        viewsCount: 892
      },
      {
        id: 2,
        title: "Building Responsive Web Applications with Tailwind CSS",
        excerpt: "Discover the power of utility-first CSS framework and how it can speed up your development process while maintaining design consistency.",
        status: "published",
        publishedAt: "2025-01-03T14:15:00Z",
        likesCount: 38,
        commentsCount: 8,
        viewsCount: 654
      },
      {
        id: 3,
        title: "Advanced JavaScript Patterns and Best Practices",
        excerpt: "Explore modern JavaScript patterns, async/await, destructuring, and other ES6+ features that will make your code more efficient and readable.",
        status: "draft",
        publishedAt: "2025-01-02T09:45:00Z",
        likesCount: 0,
        commentsCount: 0,
        viewsCount: 23
      }
    ],
    recentLikes: [
      {
        id: 1,
        userId: 101,
        userName: "Michael Chen",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        postId: 1,
        postTitle: "Getting Started with React Hooks: A Comprehensive Guide",
        likedAt: "2025-01-07T08:30:00Z",
        isNew: true
      },
      {
        id: 2,
        userId: 102,
        userName: "Emily Rodriguez",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        postId: 2,
        postTitle: "Building Responsive Web Applications with Tailwind CSS",
        likedAt: "2025-01-07T07:15:00Z",
        isNew: true
      },
      {
        id: 3,
        userId: 103,
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        postId: 1,
        postTitle: "Getting Started with React Hooks: A Comprehensive Guide",
        likedAt: "2025-01-06T16:20:00Z",
        isNew: false
      }
    ],
    recentComments: [
      {
        id: 1,
        userId: 104,
        userName: "Lisa Thompson",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        postId: 1,
        postTitle: "Getting Started with React Hooks: A Comprehensive Guide",
        content: "This is exactly what I was looking for! The examples are clear and easy to follow. Thank you for sharing this comprehensive guide.",
        commentedAt: "2025-01-07T09:45:00Z",
        isNew: true
      },
      {
        id: 2,
        userId: 105,
        userName: "James Wilson",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        postId: 2,
        postTitle: "Building Responsive Web Applications with Tailwind CSS",
        content: "Great article! I've been using Tailwind for a few months now and your tips about responsive design patterns are really helpful.",
        commentedAt: "2025-01-06T14:30:00Z",
        isNew: false
      }
    ]
  };

  const tabs = [
    {
      id: 'posts',
      label: 'My Posts',
      icon: 'FileText',
      count: mockDashboardData?.posts?.length
    },
    {
      id: 'likes',
      label: 'Recent Likes',
      icon: 'Heart',
      count: mockDashboardData?.recentLikes?.length
    },
    {
      id: 'comments',
      label: 'Comments Received',
      icon: 'MessageCircle',
      count: mockDashboardData?.recentComments?.length
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleCreatePost = () => {
    navigate('/create-edit-post');
  };

  const handleEditPost = (post) => {
    navigate('/create-edit-post', { state: { postId: post?.id, mode: 'edit' } });
  };

  const handleDeletePost = async (postId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Post deleted:', postId);
    // In real app, would update state and refetch data
  };

  const handleReplyToComment = async (commentId, replyText) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Reply submitted:', { commentId, replyText });
    // In real app, would update state and refetch data
  };

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      setUser(null);
      navigate('/login');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return mockDashboardData?.posts?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockDashboardData?.posts?.map((post) => (
              <PostCard
                key={post?.id}
                post={post}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            type="posts" 
            title="No Posts Yet"
            description="You haven't created any posts yet. Start sharing your thoughts with the world!"
            actionText="Create Your First Post"
            actionPath="/create-edit-post"
            iconName="FileText"
          />
        );

      case 'likes':
        return mockDashboardData?.recentLikes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDashboardData?.recentLikes?.map((like) => (
              <LikeCard key={like?.id} like={like} />
            ))}
          </div>
        ) : (
          <EmptyState 
            type="likes" 
            title="No Likes Yet"
            description="When people like your posts, they'll appear here."
            actionText="View All Posts"
            actionPath="/posts"
            iconName="Heart"
          />
        );

      case 'comments':
        return mockDashboardData?.recentComments?.length > 0 ? (
          <div className="space-y-4">
            {mockDashboardData?.recentComments?.map((comment) => (
              <CommentCard
                key={comment?.id}
                comment={comment}
                onReply={handleReplyToComment}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            type="comments" 
            title="No Comments Yet"
            description="Comments from readers will appear here when they engage with your posts."
            actionText="View All Posts"
            actionPath="/posts"
            iconName="MessageCircle"
          />
        );

      default:
        return (
          <EmptyState 
            type="default"
            title="Nothing to Show"
            description="Please select a valid tab to view your content."
            actionText="Go to Posts"
            actionPath="/dashboard"
            iconName="FileText"
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onAuthAction={handleAuthAction} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthAction={handleAuthAction} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your blogging activity and engagement.
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <Button
                variant="default"
                onClick={handleCreatePost}
                iconName="Plus"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Create New Post
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <DashboardMetrics metrics={mockDashboardData?.metrics} />

          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
          />

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;