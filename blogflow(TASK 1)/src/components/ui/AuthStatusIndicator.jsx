import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthStatusIndicator = ({ user = null, onAuthAction = () => {} }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    onAuthAction('logout');
    setIsDropdownOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event?.target?.closest('.auth-dropdown-container')) {
        setIsDropdownOpen(false);
      useEffect(() => {
        // Redirect to profile settings if user is logged in and missing name or email
        if (user && (!user.name || !user.email)) {
          navigate('/user-profile-settings');
        }
      }, [user, navigate]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={handleLogin}
        iconName="LogIn"
        iconPosition="left"
        size="sm"
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="relative auth-dropdown-container">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-smooth hover-lift press-scale"
      >
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground">
            {user?.name || 'User'}
          </div>
          {user?.email && (
            <div className="text-xs text-muted-foreground">
              {user?.email}
            </div>
          )}
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-elevated z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-border">
              <div className="text-sm font-medium text-popover-foreground">
                {user?.name || 'User'}
              </div>
              {user?.email && (
                <div className="text-xs text-muted-foreground">
                  {user?.email}
                </div>
              )}
            </div>
            
            {user?.name && user?.email && user?.bio && user?.profilePicture && (
              <button
                onClick={() => navigate('/user-dashboard')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="LayoutDashboard" size={16} />
                <span>Dashboard</span>
              </button>
            )}
            
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="Settings" size={16} />
              <span>Profile Settings</span>
            </button>
            
            <button
              onClick={() => navigate('/create-edit-post')}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="PenTool" size={16} />
              <span>Create Post</span>
            </button>
            
            <hr className="my-1 border-border" />
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthStatusIndicator;