import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettingsTab = ({ user, onUpdateAccount }) => {
  const [emailSettings, setEmailSettings] = useState({
    newPostNotifications: user?.emailSettings?.newPostNotifications || true,
    commentNotifications: user?.emailSettings?.commentNotifications || true,
    likeNotifications: user?.emailSettings?.likeNotifications || false,
    weeklyDigest: user?.emailSettings?.weeklyDigest || true,
    marketingEmails: user?.emailSettings?.marketingEmails || false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleEmailSettingChange = (setting, checked) => {
    setEmailSettings(prev => ({
      ...prev,
      [setting]: checked
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(passwordData?.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      setIsChangingPassword(true);
      
      // Simulate password change
      setTimeout(() => {
        setIsChangingPassword(false);
        setShowPasswordForm(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        onUpdateAccount({ type: 'password', success: true });
      }, 2000);
    }
  };

  const handleSaveEmailSettings = () => {
    onUpdateAccount({ 
      type: 'emailSettings', 
      data: emailSettings,
      success: true 
    });
  };

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Email Notifications</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveEmailSettings}
            iconName="Save"
            iconPosition="left"
          >
            Save
          </Button>
        </div>
        <div className="space-y-4">
          <Checkbox
            label="New post notifications"
            description="Get notified when someone you follow publishes a new post"
            checked={emailSettings?.newPostNotifications}
            onChange={(e) => handleEmailSettingChange('newPostNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Comment notifications"
            description="Get notified when someone comments on your posts"
            checked={emailSettings?.commentNotifications}
            onChange={(e) => handleEmailSettingChange('commentNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Like notifications"
            description="Get notified when someone likes your posts"
            checked={emailSettings?.likeNotifications}
            onChange={(e) => handleEmailSettingChange('likeNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Weekly digest"
            description="Receive a weekly summary of platform activity"
            checked={emailSettings?.weeklyDigest}
            onChange={(e) => handleEmailSettingChange('weeklyDigest', e?.target?.checked)}
          />
          <Checkbox
            label="Marketing emails"
            description="Receive updates about new features and promotions"
            checked={emailSettings?.marketingEmails}
            onChange={(e) => handleEmailSettingChange('marketingEmails', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Password Settings */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Password</h3>
            <p className="text-sm text-muted-foreground">
              Last changed on March 15, 2024
            </p>
          </div>
          {!showPasswordForm && (
            <Button
              variant="outline"
              onClick={() => setShowPasswordForm(true)}
              iconName="Key"
              iconPosition="left"
            >
              Change Password
            </Button>
          )}
        </div>

        {showPasswordForm && (
          <div className="space-y-4 mt-6 p-4 bg-muted rounded-lg">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              value={passwordData?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              error={errors?.currentPassword}
              required
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={passwordData?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              error={errors?.newPassword}
              description="Must be at least 8 characters with uppercase, lowercase, and number"
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              value={passwordData?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <div className="flex space-x-3 pt-2">
              <Button
                variant="default"
                onClick={handlePasswordSubmit}
                loading={isChangingPassword}
                iconName="Check"
                iconPosition="left"
              >
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setErrors({});
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Account Information */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <div className="font-medium text-foreground">Email Address</div>
              <div className="text-sm text-muted-foreground">{user?.email || 'john.doe@example.com'}</div>
            </div>
            <Button variant="ghost" size="sm" iconName="Edit2">
              Edit
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <div className="font-medium text-foreground">Account Created</div>
              <div className="text-sm text-muted-foreground">January 15, 2024</div>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium text-foreground">Account Status</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Danger Zone */}
      <div className="bg-card rounded-lg p-6 border border-destructive">
        <h3 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </div>
            </div>
            <Button
              variant="destructive"
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsTab;