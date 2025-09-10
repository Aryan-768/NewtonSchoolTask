import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostHeader = ({ post, author }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ')?.length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <header className="mb-8">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
          {post?.category}
        </span>
      </div>
      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
        {post?.title}
      </h1>
      {/* Author Info */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <Image
              src={author?.avatar}
              alt={author?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{author?.name}</h3>
            <p className="text-sm text-muted-foreground">{author?.title}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(post?.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{calculateReadTime(post?.content)} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} />
            <span>{post?.views?.toLocaleString()} views</span>
          </div>
        </div>
      </div>
      {/* Featured Image */}
      {post?.featuredImage && (
        <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden bg-muted mb-8">
          <Image
            src={post?.featuredImage}
            alt={post?.title}
            className="w-full h-full object-cover hover-lift transition-smooth"
          />
        </div>
      )}
    </header>
  );
};

export default PostHeader;