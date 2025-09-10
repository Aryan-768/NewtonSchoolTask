import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import ProfileInformationTab from './components/ProfileInformationTab';
import AccountSettingsTab from './components/AccountSettingsTab';
import PrivacyPreferencesTab from './components/PrivacyPreferencesTab';
import ProfilePreviewPanel from './components/ProfilePreviewPanel';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewData, setPreviewData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Default user data
  const defaultUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    displayName: 'John Doe',
    bio: `Passionate writer and tech enthusiast with over 5 years of experience in web development.\nLove sharing insights about React, JavaScript, and modern web technologies.\n\nAlways learning, always growing. 🚀`,
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    website: 'https://johndoe.dev',
    twitter: '@johndoe_dev',
    postsCount: 24,
    followersCount: 1250,
    followingCount: 180,
    emailSettings: {
      newPostNotifications: true,
      commentNotifications: true,
      likeNotifications: false,
      weeklyDigest: true,
      marketingEmails: false
    },
    privacySettings: {
      profileVisibility: 'public',
      showEmail: false,
      allowComments: true,
      allowDirectMessages: true,
      showOnlineStatus: true,
      allowTagging: true,
      dataCollection: true,
      analyticsTracking: false,
      thirdPartySharing: false,
      searchEngineIndexing: true
    }
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile Information',
      icon: 'User',
      description: 'Manage your personal information and social links'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: 'Settings',
      description: 'Email preferences, password, and account security'
    },
    {
      id: 'privacy',
      label: 'Privacy Preferences',
      icon: 'Shield',
      description: 'Control your privacy and data sharing settings'
    }
  ];

  useEffect(() => {
    // Load user data from localStorage or use default
    const loadUserData = () => {
      const savedUser = localStorage.getItem('userProfile');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(defaultUser);
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      setUser(null);
      navigate('/login');
    }
  };

  const handleUpdateProfile = (formData) => {
    setPreviewData(formData);
    setUser(prev => {
      const updatedUser = {
        ...prev,
        ...formData
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      return updatedUser;
    });
    showSuccess('Profile information updated successfully!');
  };

  const handleUpdateAccount = (updateData) => {
    if (updateData?.type === 'password' && updateData?.success) {
      showSuccess('Password changed successfully!');
    } else if (updateData?.type === 'emailSettings') {
      setUser(prev => {
        const updatedUser = {
          ...prev,
          emailSettings: updateData?.data
        };
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
        return updatedUser;
      });
      showSuccess('Email preferences updated successfully!');
    }
  };

  const handleUpdatePrivacy = (privacyData) => {
    setUser(prev => {
      const updatedUser = {
        ...prev,
        privacySettings: privacyData
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      return updatedUser;
    });
    showSuccess('Privacy settings updated successfully!');
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileInformationTab
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'account':
        return (
          <AccountSettingsTab
            user={user}
            onUpdateAccount={handleUpdateAccount}
          />
        );
      case 'privacy':
        return (
          <PrivacyPreferencesTab
            user={user}
            onUpdatePrivacy={handleUpdatePrivacy}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onAuthAction={handleAuthAction} />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-3">
              <Icon name="Loader2" size={24} className="animate-spin text-primary" />
              <span className="text-lg text-muted-foreground">Loading profile settings...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthAction={handleAuthAction} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Breadcrumb />
          
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-success font-medium">{successMessage}</span>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Profile Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/user-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-card rounded-lg border border-border mb-6">
                <div className="flex flex-col sm:flex-row">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-3 px-6 py-4 text-left transition-smooth hover-lift ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <div className="flex-1">
                        <div className="font-medium">{tab?.label}</div>
                        <div className="text-xs opacity-80 hidden sm:block">
                          {tab?.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-background">
                {renderTabContent()}
              </div>
            </div>

            {/* Profile Preview Sidebar */}
            <div className="xl:col-span-1">
              <div className="sticky top-24">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Profile Preview
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See how your profile appears to others
                  </p>
                </div>
                <ProfilePreviewPanel
                  user={user}
                  formData={previewData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;