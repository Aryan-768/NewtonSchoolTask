import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthCard = ({ onGoogleSignIn, isLoading, error }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg shadow-elevated p-8">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-moderate">
          <Icon name="PenTool" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
          Welcome to BlogFlow
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          Sign in to start creating and sharing your stories
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      )}

      {/* Google Sign In Button */}
      <div className="space-y-4">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={onGoogleSignIn}
          loading={isLoading}
          disabled={isLoading}
          className="border-2 hover:bg-muted/50 transition-smooth"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium">
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </div>
        </Button>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-md border border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Demo Access:</p>
              <p>Use any Google account to sign in and explore the platform features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;