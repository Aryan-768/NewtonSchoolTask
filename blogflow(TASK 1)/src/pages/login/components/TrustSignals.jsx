import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: "Shield",
      title: "SSL Encrypted",
      description: "Your data is protected with 256-bit SSL encryption"
    },
    {
      icon: "Lock",
      title: "OAuth 2.0 Secure",
      description: "Industry-standard authentication protocol"
    },
    {
      icon: "CheckCircle",
      title: "Google Verified",
      description: "Verified OAuth application with Google"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
          Secure & Trusted Platform
        </h2>
        <p className="text-sm text-muted-foreground">
          Your security and privacy are our top priorities
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trustFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:shadow-moderate transition-smooth"
          >
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <Icon name={feature?.icon} size={24} className="text-success" />
            </div>
            <h3 className="font-medium text-foreground mb-2">
              {feature?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-success" />
          <span className="text-sm font-medium text-muted-foreground">
            SSL Secured
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={20} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            OAuth 2.0
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-sm font-medium text-muted-foreground">
            Google Verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;