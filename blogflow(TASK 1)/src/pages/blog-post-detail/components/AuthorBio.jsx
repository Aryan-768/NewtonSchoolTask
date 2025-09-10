import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuthorBio = ({ author }) => {
  const navigate = useNavigate();

  const handleFollowAuthor = () => {
    // In a real app, this would handle following/unfollowing
    console.log('Following author:', author?.name);
  };

  const handleViewProfile = () => {
    // Navigate to author's profile page navigate('/user-profile-settings', { state: { userId: author.id } });
  };

  return (
    <section className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Author Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={author?.avatar}
            alt={author?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                {author?.name}
              </h3>
              <p className="text-muted-foreground font-medium">
                {author?.title}
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewProfile}
                iconName="User"
                iconPosition="left"
              >
                View Profile
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleFollowAuthor}
                iconName="UserPlus"
                iconPosition="left"
              >
                Follow
              </Button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-foreground font-serif mb-4 leading-relaxed">
            {author?.bio}
          </p>

          {/* Stats */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={16} />
              <span>{author?.postsCount} Articles</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{author?.followersCount?.toLocaleString()} Followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={16} />
              <span>{author?.totalLikes?.toLocaleString()} Likes</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Connect:</span>
            {author?.socialLinks?.twitter && (
              <a
                href={author?.socialLinks?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-smooth"
              >
                <Icon name="Twitter" size={18} />
              </a>
            )}
            {author?.socialLinks?.linkedin && (
              <a
                href={author?.socialLinks?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-700 transition-smooth"
              >
                <Icon name="Linkedin" size={18} />
              </a>
            )}
            {author?.socialLinks?.github && (
              <a
                href={author?.socialLinks?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="Github" size={18} />
              </a>
            )}
            {author?.socialLinks?.website && (
              <a
                href={author?.socialLinks?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Icon name="Globe" size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;