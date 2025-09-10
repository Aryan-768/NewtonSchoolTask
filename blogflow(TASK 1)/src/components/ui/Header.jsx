import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, onAuthAction = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Blog', path: '/blog-post-list', icon: 'BookOpen', authRequired: false },
    { label: 'Dashboard', path: '/user-dashboard', icon: 'LayoutDashboard', authRequired: true },
    { label: 'Create', path: '/create-edit-post', icon: 'PenTool', authRequired: true },
    { label: 'Profile', path: '/user-profile-settings', icon: 'User', authRequired: true },
  ];

  const visibleNavItems = navigationItems?.filter(item => 
    !item?.authRequired || (item?.authRequired && user)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      onAuthAction('logout');
    } else if (action === 'login') {
      navigate('/login');
    }
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path || 
           (path === '/blog-post-list' && location?.pathname === '/blog-post-detail');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover-lift press-scale"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="PenTool" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              BlogFlow
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {visibleNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth hover-lift press-scale ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          {user ? (
            <div className="relative user-menu-container">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-smooth hover-lift"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-foreground">
                  {user?.name || 'User'}
                </span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleNavigation('/user-profile-settings')}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    <hr className="my-1 border-border" />
                    <button
                      onClick={() => handleAuthAction('logout')}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => handleAuthAction('login')}
              iconName="LogIn"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-moderate">
          <nav className="px-4 py-4 space-y-2">
            {visibleNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {!user && (
              <>
                <hr className="my-2 border-border" />
                <button
                  onClick={() => handleAuthAction('login')}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="LogIn" size={18} />
                  <span>Sign In</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;