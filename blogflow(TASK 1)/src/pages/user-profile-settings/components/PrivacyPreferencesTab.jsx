import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyPreferencesTab = ({ user, onUpdatePrivacy }) => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: user?.privacySettings?.profileVisibility || 'public',
    showEmail: user?.privacySettings?.showEmail || false,
    allowComments: user?.privacySettings?.allowComments || true,
    allowDirectMessages: user?.privacySettings?.allowDirectMessages || true,
    showOnlineStatus: user?.privacySettings?.showOnlineStatus || true,
    allowTagging: user?.privacySettings?.allowTagging || true,
    dataCollection: user?.privacySettings?.dataCollection || true,
    analyticsTracking: user?.privacySettings?.analyticsTracking || false,
    thirdPartySharing: user?.privacySettings?.thirdPartySharing || false,
    searchEngineIndexing: user?.privacySettings?.searchEngineIndexing || true
  });

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
    { value: 'followers', label: 'Followers Only', description: 'Only your followers can view your profile' },
    { value: 'private', label: 'Private', description: 'Only you can view your profile' }
  ];

  const handleSettingChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    onUpdatePrivacy(privacySettings);
  };

  const PrivacyCard = ({ title, description, children, icon }) => (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Profile Visibility */}
      <PrivacyCard
        title="Profile Visibility"
        description="Control who can see your profile and posts"
        icon="Eye"
      >
        <Select
          label="Profile Visibility"
          options={profileVisibilityOptions}
          value={privacySettings?.profileVisibility}
          onChange={(value) => handleSettingChange('profileVisibility', value)}
          description="Choose who can view your profile information"
        />
        <Checkbox
          label="Show email address on profile"
          description="Display your email address publicly on your profile"
          checked={privacySettings?.showEmail}
          onChange={(e) => handleSettingChange('showEmail', e?.target?.checked)}
        />
        <Checkbox
          label="Show online status"
          description="Let others see when you're online"
          checked={privacySettings?.showOnlineStatus}
          onChange={(e) => handleSettingChange('showOnlineStatus', e?.target?.checked)}
        />
      </PrivacyCard>
      {/* Interaction Settings */}
      <PrivacyCard
        title="Interaction Preferences"
        description="Manage how others can interact with you"
        icon="MessageCircle"
      >
        <Checkbox
          label="Allow comments on posts"
          description="Let others comment on your blog posts"
          checked={privacySettings?.allowComments}
          onChange={(e) => handleSettingChange('allowComments', e?.target?.checked)}
        />
        <Checkbox
          label="Allow direct messages"
          description="Let other users send you private messages"
          checked={privacySettings?.allowDirectMessages}
          onChange={(e) => handleSettingChange('allowDirectMessages', e?.target?.checked)}
        />
        <Checkbox
          label="Allow tagging in posts"
          description="Let others mention you in their posts"
          checked={privacySettings?.allowTagging}
          onChange={(e) => handleSettingChange('allowTagging', e?.target?.checked)}
        />
      </PrivacyCard>
      {/* Data & Analytics */}
      <PrivacyCard
        title="Data & Analytics"
        description="Control how your data is collected and used"
        icon="BarChart3"
      >
        <Checkbox
          label="Allow data collection for personalization"
          description="Help us improve your experience by analyzing your usage patterns"
          checked={privacySettings?.dataCollection}
          onChange={(e) => handleSettingChange('dataCollection', e?.target?.checked)}
        />
        <Checkbox
          label="Analytics tracking"
          description="Allow anonymous analytics to help improve the platform"
          checked={privacySettings?.analyticsTracking}
          onChange={(e) => handleSettingChange('analyticsTracking', e?.target?.checked)}
        />
        <Checkbox
          label="Third-party data sharing"
          description="Share anonymized data with trusted partners for research"
          checked={privacySettings?.thirdPartySharing}
          onChange={(e) => handleSettingChange('thirdPartySharing', e?.target?.checked)}
        />
      </PrivacyCard>
      {/* Search & Discovery */}
      <PrivacyCard
        title="Search & Discovery"
        description="Control how you appear in search results"
        icon="Search"
      >
        <Checkbox
          label="Search engine indexing"
          description="Allow search engines like Google to index your public profile"
          checked={privacySettings?.searchEngineIndexing}
          onChange={(e) => handleSettingChange('searchEngineIndexing', e?.target?.checked)}
        />
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Privacy Notice</p>
              <p className="text-muted-foreground">
                Your privacy settings may take up to 24 hours to take effect across all parts of the platform. 
                Some cached content may remain visible during this period.
              </p>
            </div>
          </div>
        </div>
      </PrivacyCard>
      {/* Data Export & Deletion */}
      <PrivacyCard
        title="Data Management"
        description="Export or delete your personal data"
        icon="Download"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Export Your Data</h4>
            <p className="text-sm text-muted-foreground">
              Download a copy of all your data including posts, comments, and profile information.
            </p>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Request Export
            </Button>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Delete All Data</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete all your data from our servers. This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              iconName="Trash2"
              iconPosition="left"
              size="sm"
            >
              Delete Data
            </Button>
          </div>
        </div>
      </PrivacyCard>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSaveSettings}
          iconName="Save"
          iconPosition="left"
        >
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPreferencesTab;