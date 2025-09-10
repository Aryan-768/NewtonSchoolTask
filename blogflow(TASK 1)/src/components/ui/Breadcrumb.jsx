import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getDefaultBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    const routeMap = {
      'login': 'Sign In',
      'user-dashboard': 'Dashboard',
      'blog-post-list': 'Blog',
      'blog-post-detail': 'Post',
      'create-edit-post': 'Create Post',
      'user-profile-settings': 'Profile Settings'
    };

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[segment] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path, isLast) => {
    if (!isLast && path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path || index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          <button
            onClick={() => handleNavigation(item?.path, item?.isLast)}
            className={`transition-smooth hover-lift ${
              item?.isLast
                ? 'text-foreground font-medium cursor-default'
                : 'hover:text-foreground cursor-pointer'
            }`}
            disabled={item?.isLast}
          >
            {item?.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;