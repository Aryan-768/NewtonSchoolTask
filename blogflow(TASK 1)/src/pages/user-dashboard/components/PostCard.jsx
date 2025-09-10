import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PostCard = ({ post, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(post?.id);
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewPost = () => {
    navigate('/blog-post-detail', { state: { postId: post?.id } });
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success text-success-foreground';
      case 'draft':
        return 'bg-warning text-warning-foreground';
      case 'archived':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle hover:shadow-moderate transition-smooth hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">
              {post?.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post?.status)}`}>
              {post?.status}
            </span>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {post?.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(post?.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Heart" size={14} />
              <span>{post?.likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MessageCircle" size={14} />
              <span>{post?.commentsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              <span>{post?.viewsCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewPost}
          iconName="Eye"
          iconPosition="left"
        >
          View
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(post)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            loading={isDeleting}
            onClick={handleDelete}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;