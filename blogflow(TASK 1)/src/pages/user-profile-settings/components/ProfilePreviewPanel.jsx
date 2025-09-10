import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePreviewPanel = ({ user, formData }) => {
  const previewData = {
    displayName: formData?.displayName || user?.displayName || 'John Doe',
    bio: formData?.bio || user?.bio || 'Passionate writer and tech enthusiast. Love sharing insights about web development and digital innovation.',
    profilePicture: formData?.profilePicture || user?.profilePicture || '',
    website: formData?.website || user?.website || '',
    twitter: formData?.twitter || user?.twitter || '',
    postsCount: user?.postsCount || 24,
    followersCount: user?.followersCount || 1250,
    followingCount: user?.followingCount || 180
  };

  const formatSocialLink = (platform, value) => {
    if (!value) return '';
    
    switch (platform) {
      case 'twitter':
        return value?.startsWith('@') ? value : `@${value}`;
      case 'github':
        return value?.startsWith('@') ? value : `@${value}`;
      default:
        return value;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-background">
            {previewData?.profilePicture ? (
              <Image
                src={previewData?.profilePicture}
                alt={previewData?.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">
              {previewData?.displayName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Member since January 2024
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Bio */}
        {previewData?.bio && (
          <div className="mb-6">
            <p className="text-foreground leading-relaxed">
              {previewData?.bio}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {previewData?.postsCount}
            </div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {previewData?.followersCount?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {previewData?.followingCount}
            </div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          {previewData?.website && (
            <div className="flex items-center space-x-3">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <a
                href={previewData?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                {previewData?.website}
              </a>
            </div>
          )}
          {previewData?.twitter && (
            <div className="flex items-center space-x-3">
              <Icon name="Twitter" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                {formatSocialLink('twitter', previewData?.twitter)}
              </span>
            </div>
          )}
          {previewData?.linkedin && (
            <div className="flex items-center space-x-3">
              <Icon name="Linkedin" size={16} className="text-muted-foreground" />
              <a
                href={previewData?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
          {previewData?.github && (
            <div className="flex items-center space-x-3">
              <Icon name="Github" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                {formatSocialLink('github', previewData?.github)}
              </span>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Edit" size={12} />
              <span>Published "Getting Started with React Hooks" 2 days ago</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Heart" size={12} />
              <span>Liked 3 posts this week</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="MessageCircle" size={12} />
              <span>Left 5 comments this week</span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-muted px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Profile Preview
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Live Preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreviewPanel;