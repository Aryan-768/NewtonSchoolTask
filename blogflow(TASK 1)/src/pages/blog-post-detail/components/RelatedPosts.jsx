import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedPosts = ({ currentPostId }) => {
  const navigate = useNavigate();

  const relatedPosts = [
    {
      id: 2,
      title: "Advanced React Patterns: Compound Components and Render Props",
      excerpt: "Explore advanced React patterns that will make your components more flexible and reusable.",
      featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2025-01-05T10:00:00Z",
      readTime: 8,
      category: "React",
      likes: 156
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js and Express",
      excerpt: "Learn how to design and implement robust, scalable APIs using modern Node.js practices.",
      featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      author: {
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2025-01-03T14:30:00Z",
      readTime: 12,
      category: "Backend",
      likes: 203
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use Which",
      excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.",
      featuredImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
      author: {
        name: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2025-01-02T09:15:00Z",
      readTime: 6,
      category: "CSS",
      likes: 89
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handlePostClick = (postId) => {
    // In a real app, you would navigate to the specific post
    navigate('/blog-post-detail', { state: { postId } });
  };

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-heading font-bold text-foreground">
          Related Articles
        </h3>
        <Button
          variant="outline"
          onClick={() => navigate('/blog-post-list')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All Posts
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts?.map((post) => (
          <article
            key={post?.id}
            className="group cursor-pointer bg-card rounded-lg overflow-hidden border border-border hover:shadow-moderate transition-all duration-300 hover-lift"
            onClick={() => handlePostClick(post?.id)}
          >
            {/* Featured Image */}
            <div className="w-full h-48 overflow-hidden bg-muted">
              <Image
                src={post?.featuredImage}
                alt={post?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category */}
              <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                {post?.category}
              </span>

              {/* Title */}
              <h4 className="text-lg font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                {post?.title}
              </h4>

              {/* Excerpt */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 font-serif">
                {post?.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {post?.author?.name}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(post?.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{post?.readTime}m</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} />
                    <span>{post?.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;