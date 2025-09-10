import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import AuthCard from './components/AuthCard';
import TrustSignals from './components/TrustSignals';
import LoadingOverlay from './components/LoadingOverlay';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, user, loading } = useAuth();

  useEffect(() => {
    // Check if user is already logged in
    if (!loading && user) {
      const userRole = user?.user_metadata?.role || 'reader';
      const from = location?.state?.from?.pathname || (userRole === 'admin' ? '/user-dashboard' : '/blog-post-list');
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('AuthRetryableFetchError')) {
          setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        } else {
          setError(error?.message || 'Authentication failed. Please try again.');
        }
      }
      // On success, the auth state change will handle navigation
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <LoadingOverlay
        isVisible={true}
        message="Checking authentication..."
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Sign In - BlogFlow</title>
        <meta name="description" content="Sign in to BlogFlow with Google OAuth to start creating and sharing your stories." />
        <meta name="keywords" content="login, sign in, blog, authentication, Google OAuth" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-6xl mx-auto">
            {/* Auth Card */}
            <div className="flex justify-center mb-8">
              <AuthCard
                onGoogleSignIn={handleGoogleSignIn}
                isLoading={isLoading}
                error={error}
              />
            </div>

            {/* Trust Signals */}
            <TrustSignals />

            {/* Footer Info */}
            <div className="text-center mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                © {new Date()?.getFullYear()} BlogFlow. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        <LoadingOverlay
          isVisible={isLoading}
          message="Authenticating with Google..."
        />
      </div>
    </>
  );
};

export default Login;