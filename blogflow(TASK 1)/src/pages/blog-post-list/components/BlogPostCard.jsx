import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BlogPostCard = ({ post, onLike }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async (e) => {
    e?.stopPropagation();
    if (isLiking) return;

    setIsLiking(true);
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    try {
      await onLike(post?.id, newIsLiked);
    } catch (error) {
      // Revert on error
      setIsLiked(!newIsLiked);
      setLikeCount(likeCount);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReadMore = () => {
    navigate('/blog-post-detail', { state: { postId: post?.id } });
  };

  const handleAuthorClick = (e) => {
    e?.stopPropagation();
    navigate('/user-profile-settings', { state: { userId: post?.author?.id } });
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength)?.trim() + '...';
  };

  return (
    <article className="bg-card border border-border rounded-lg shadow-subtle hover:shadow-moderate transition-all duration-300 hover-lift overflow-hidden group">
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post?.featuredImage}
          alt={post?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            {post?.category}
          </span>
        </div>
        {post?.isNew && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
              New
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-heading font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post?.title}
        </h3>

        {/* Author & Date */}
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleAuthorClick}
            className="flex items-center space-x-2 hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={post?.author?.avatar}
                alt={post?.author?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground hover:text-primary">
              {post?.author?.name}
            </span>
          </button>
          <span className="text-sm text-muted-foreground">
            {formatDate(post?.publishedAt)}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {truncateText(post?.excerpt)}
        </p>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-1 transition-colors hover-lift press-scale ${
                isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
              }`}
            >
              <Icon 
                name={isLiked ? "Heart" : "Heart"} 
                size={16} 
                className={isLiked ? 'fill-current' : ''}
              />
              <span className="text-sm font-medium">{likeCount}</span>
            </button>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm">{post?.comments}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Eye" size={16} />
              <span className="text-sm">{post?.views}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {post?.readTime} min read
          </div>
        </div>

        {/* Read More Button */}
        <Button
          variant="outline"
          onClick={handleReadMore}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
        >
          Read More
        </Button>
      </div>
    </article>
  );
};

export default BlogPostCard;