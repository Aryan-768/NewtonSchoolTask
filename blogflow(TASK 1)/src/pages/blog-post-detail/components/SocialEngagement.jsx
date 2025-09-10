import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialEngagement = ({ post, onLike, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
    
    onLike && onLike(!isLiked);
  };

  const handleShare = (platform) => {
    const url = window.location?.href;
    const title = post?.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard?.writeText(url);
      // You could add a toast notification here
    } else {
      window.open(shareUrls?.[platform], '_blank', 'width=600,height=400');
    }

    onShare && onShare(platform);
  };

  return (
    <div className="py-8 border-y border-border">
      <div className="flex items-center justify-between">
        {/* Like Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant={isLiked ? "default" : "outline"}
            onClick={handleLike}
            iconName="Heart"
            iconPosition="left"
            className={`transition-all duration-300 ${isAnimating ? 'scale-110' : ''} ${
              isLiked ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : ''
            }`}
          >
            {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
          </Button>

          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MessageCircle" size={20} />
            <span className="text-sm">{post?.comments || 0} Comments</span>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground mr-2">Share:</span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('twitter')}
            iconName="Twitter"
            className="text-muted-foreground hover:text-blue-500"
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('facebook')}
            iconName="Facebook"
            className="text-muted-foreground hover:text-blue-600"
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('linkedin')}
            iconName="Linkedin"
            className="text-muted-foreground hover:text-blue-700"
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('copy')}
            iconName="Link"
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialEngagement;