import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommentCard = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleViewPost = () => {
    navigate('/blog-post-detail', { state: { postId: comment?.postId } });
  };

  const handleViewProfile = () => {
    navigate('/user-profile-settings', { state: { userId: comment?.userId } });
  };

  const handleReplySubmit = async () => {
    if (!replyText?.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onReply(comment?.id, replyText);
      setReplyText('');
      setIsReplying(false);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-moderate transition-smooth">
      <div className="flex items-start gap-3">
        <button
          onClick={handleViewProfile}
          className="flex-shrink-0 hover-lift press-scale"
        >
          <Image
            src={comment?.userAvatar}
            alt={comment?.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleViewProfile}
              className="font-medium text-foreground hover:text-primary transition-smooth"
            >
              {comment?.userName}
            </button>
            <span className="text-sm text-muted-foreground">commented on</span>
            <button
              onClick={handleViewPost}
              className="text-sm text-primary hover:text-primary/80 transition-smooth line-clamp-1"
            >
              "{comment?.postTitle}"
            </button>
          </div>
          
          <div className="bg-muted rounded-lg p-3 mb-3">
            <p className="text-sm text-foreground">{comment?.content}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(comment?.commentedAt)}
              </span>
              
              {comment?.isNew && (
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  New
                </span>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(!isReplying)}
              iconName="Reply"
              iconPosition="left"
            >
              Reply
            </Button>
          </div>
          
          {isReplying && (
            <div className="mt-3 pt-3 border-t border-border">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e?.target?.value)}
                placeholder="Write your reply..."
                className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                rows={3}
              />
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyText('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  loading={isSubmitting}
                  onClick={handleReplySubmit}
                  disabled={!replyText?.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;