import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProfileInformationTab = ({ user, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || '',
    website: user?.website || '',
    twitter: user?.twitter || '',
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || '');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.displayName?.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (formData?.displayName?.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }
    
    if (formData?.bio?.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }
    
    if (formData?.website && !isValidUrl(formData?.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    if (formData?.twitter && !isValidTwitterHandle(formData?.twitter)) {
      newErrors.twitter = 'Please enter a valid Twitter handle';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidTwitterHandle = (handle) => {
    const twitterRegex = /^@?[A-Za-z0-9_]{1,15}$/;
    return twitterRegex?.test(handle);
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          profilePicture: imageUrl
        }));
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(formData);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-muted-foreground" />
                </div>
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={20} className="text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('profile-picture')?.click()}
              iconName="Upload"
              iconPosition="left"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              JPG, PNG or GIF. Max size 5MB.
            </p>
          </div>
        </div>
      </div>
      {/* Basic Information */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Display Name"
              type="text"
              placeholder="Enter your display name"
              value={formData?.displayName}
              onChange={(e) => handleInputChange('displayName', e?.target?.value)}
              error={errors?.displayName}
              required
            />
          </div>
          <div className="md:col-span-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself..."
                value={formData?.bio}
                onChange={(e) => handleInputChange('bio', e?.target?.value)}
                className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className={`text-xs ${errors?.bio ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {errors?.bio || `${formData?.bio?.length}/500 characters`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Social Links */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={formData?.website}
            onChange={(e) => handleInputChange('website', e?.target?.value)}
            error={errors?.website}
          />
          <Input
            label="Twitter"
            type="text"
            placeholder="@username"
            value={formData?.twitter}
            onChange={(e) => handleInputChange('twitter', e?.target?.value)}
            error={errors?.twitter}
          />
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          iconName="Save"
          iconPosition="left"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileInformationTab;