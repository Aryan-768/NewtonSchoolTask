import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PostHeader from './components/PostHeader';
import PostContent from './components/PostContent';
import SocialEngagement from './components/SocialEngagement';
import CommentSection from './components/CommentSection';
import AuthorBio from './components/AuthorBio';
import RelatedPosts from './components/RelatedPosts';

const BlogPostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock current user (in real app, this would come from auth context)
  useEffect(() => {
    // Simulate loading and auth check
    const timer = setTimeout(() => {
      setUser({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Mock blog post data
  const blogPost = {
    id: 1,
    title: "Mastering React Hooks: A Comprehensive Guide to Modern State Management",
    excerpt: "Dive deep into React Hooks and discover how they revolutionize state management in functional components. Learn best practices, common patterns, and advanced techniques.",
    content: `React Hooks have fundamentally changed how we write React applications. Since their introduction in React 16.8, they've provided a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.

In this comprehensive guide, we'll explore the most important hooks and how to use them effectively in your applications.

## Understanding useState

The useState hook is the most basic and commonly used hook. It allows you to add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

This simple line gives you a state variable and a function to update it. The beauty of useState is its simplicity and the fact that it follows the same patterns you're used to with class components.

## Mastering useEffect

The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React classes:

\`\`\`javascript
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);
\`\`\`

The dependency array is crucial for performance optimization. Only include values that the effect actually uses.

## Advanced Patterns

As you become more comfortable with hooks, you'll discover powerful patterns like custom hooks, which let you extract component logic into reusable functions.

Custom hooks are JavaScript functions whose names start with "use" and that may call other hooks. They're a mechanism to reuse stateful logic between components.

## Performance Considerations

When using hooks, it's important to understand their performance implications. The useMemo and useCallback hooks can help optimize your components by memoizing expensive calculations and preventing unnecessary re-renders.

Remember, premature optimization is the root of all evil. Profile your application first, then optimize where needed.

## Conclusion

React Hooks provide a powerful and flexible way to manage state and side effects in your applications. By mastering these concepts, you'll be able to write more maintainable and performant React code.

The key is to start simple, understand the fundamentals, and gradually incorporate more advanced patterns as your applications grow in complexity.`,
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    category: "React",
    publishedAt: "2025-01-07T10:00:00Z",
    views: 1247,
    likes: 89,
    comments: 12,
    tags: ["React", "JavaScript", "Web Development", "Frontend", "Tutorial"]
  };

  // Mock author data
  const author = {
    id: 1,
    name: "Alex Thompson",
    title: "Senior Frontend Developer & Technical Writer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Passionate frontend developer with 8+ years of experience building scalable web applications. I love sharing knowledge through writing and helping developers master modern JavaScript frameworks. When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.",
    postsCount: 47,
    followersCount: 2840,
    totalLikes: 15600,
    socialLinks: {
      twitter: "https://twitter.com/alexthompson",
      linkedin: "https://linkedin.com/in/alexthompson",
      github: "https://github.com/alexthompson",
      website: "https://alexthompson.dev"
    }
  };

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "Excellent article! The explanation of useEffect dependencies really helped clarify some confusion I had. The custom hooks section was particularly insightful.",
      timestamp: "2025-01-07T14:30:00Z",
      replies: [
        {
          id: 11,
          author: {
            name: "Alex Thompson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          content: "Thank you, Sarah! I'm glad the useEffect section was helpful. Custom hooks are indeed a game-changer for code reusability.",
          timestamp: "2025-01-07T15:45:00Z"
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Great comprehensive guide! I\'ve been using class components for years and this article finally convinced me to make the switch to hooks. The performance considerations section was very valuable.",
      timestamp: "2025-01-07T16:20:00Z",
      replies: []
    },
    {
      id: 3,
      author: {
        name: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: "Love the practical examples! Could you write a follow-up article about testing components that use hooks? That\'s something I\'m struggling with.",
      timestamp: "2025-01-07T18:10:00Z",
      replies: []
    }
  ];

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      setUser(null);
      navigate('/login');
    }
  };

  const handleLike = (liked) => {
    console.log('Post liked:', liked);
    // In a real app, this would update the backend
  };

  const handleShare = (platform) => {
    console.log('Shared on:', platform);
    // In a real app, this would track sharing analytics
  };

  const handleAddComment = (comment) => {
    console.log('New comment:', comment);
    // In a real app, this would save to backend
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog-post-list' },
    { label: blogPost?.title, path: '/blog-post-detail', isLast: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onAuthAction={handleAuthAction} />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-12 bg-muted rounded mb-6"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthAction={handleAuthAction} />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Back to Blog Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog-post-list')}
              iconName="ArrowLeft"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Back to Blog
            </Button>
          </div>

          {/* Post Header */}
          <PostHeader post={blogPost} author={author} />

          {/* Post Content */}
          <PostContent 
            content={blogPost?.content} 
            excerpt={blogPost?.excerpt}
          />

          {/* Social Engagement */}
          <SocialEngagement 
            post={blogPost}
            onLike={handleLike}
            onShare={handleShare}
          />

          {/* Author Bio */}
          <AuthorBio author={author} />

          {/* Comment Section */}
          <CommentSection 
            comments={mockComments}
            onAddComment={handleAddComment}
          />

          {/* Related Posts */}
          <RelatedPosts currentPostId={blogPost?.id} />
        </div>
      </main>
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-elevated hover:shadow-lg transition-all duration-300 hover-lift press-scale z-40"
        aria-label="Scroll to top"
      >
        <Icon name="ArrowUp" size={20} className="mx-auto" />
      </button>
    </div>
  );
};

export default BlogPostDetail;