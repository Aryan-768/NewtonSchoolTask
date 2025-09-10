import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, title, description, actionText, actionPath, iconName }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath);
    }
  };

  const getDefaultContent = () => {
    switch (type) {
      case 'posts':
        return {
          title: 'No posts yet',
          description: 'Start creating amazing content for your audience. Your first blog post is just a click away!',
          actionText: 'Create Your First Post',
          actionPath: '/create-edit-post',
          iconName: 'FileText'
        };
      case 'likes':
        return {
          title: 'No likes received yet',
          description: 'Keep creating engaging content and your audience will start showing their appreciation!',
          actionText: 'Create New Post',
          actionPath: '/create-edit-post',
          iconName: 'Heart'
        };
      case 'comments':
        return {
          title: 'No comments yet',
          description: 'Engage with your audience by creating thought-provoking content that sparks conversations.',
          actionText: 'Write a Post',
          actionPath: '/create-edit-post',
          iconName: 'MessageCircle'
        };
      default:
        return {
          title: 'Nothing here yet',
          description: 'Start your journey by creating some content.',
          actionText: 'Get Started',
          actionPath: '/create-edit-post',
          iconName: 'Plus'
        };
    }
  };

  const content = {
    title: title || getDefaultContent()?.title,
    description: description || getDefaultContent()?.description,
    actionText: actionText || getDefaultContent()?.actionText,
    actionPath: actionPath || getDefaultContent()?.actionPath,
    iconName: iconName || getDefaultContent()?.iconName
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content?.iconName} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {content?.description}
      </p>
      {content?.actionText && content?.actionPath && (
        <Button
          variant="default"
          onClick={handleAction}
          iconName="Plus"
          iconPosition="left"
        >
          {content?.actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;