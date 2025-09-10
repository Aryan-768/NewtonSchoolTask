import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LikeCard = ({ like }) => {
  const navigate = useNavigate();

  const handleViewPost = () => {
    navigate('/blog-post-detail', { state: { postId: like?.postId } });
  };

  const handleViewProfile = () => {
    navigate('/user-profile-settings', { state: { userId: like?.userId } });
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const likeDate = new Date(date);
    const diffInMinutes = Math.floor((now - likeDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-moderate transition-smooth hover-lift">
      <div className="flex items-start gap-3">
        <button
          onClick={handleViewProfile}
          className="flex-shrink-0 hover-lift press-scale"
        >
          <Image
            src={like?.userAvatar}
            alt={like?.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={handleViewProfile}
              className="font-medium text-foreground hover:text-primary transition-smooth"
            >
              {like?.userName}
            </button>
            <Icon name="Heart" size={14} className="text-destructive" />
            <span className="text-sm text-muted-foreground">liked your post</span>
          </div>
          
          <button
            onClick={handleViewPost}
            className="text-sm text-primary hover:text-primary/80 transition-smooth line-clamp-1 text-left"
          >
            "{like?.postTitle}"
          </button>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(like?.likedAt)}
            </span>
            
            {like?.isNew && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                New
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeCard;