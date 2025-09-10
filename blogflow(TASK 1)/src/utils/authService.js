import { supabase } from '../lib/supabase';

export const authService = {
  // Get current user session
  async getCurrentUser() {
    try {
      const { data: { session }, error } = await supabase?.auth?.getSession();
      if (error) throw error;
      return session?.user || null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Get user profile from users table
  async getUserProfile(userId) {
    try {
      if (!userId) return null;
      
      const { data, error } = await supabase?.from('users')?.select('*')?.eq('id', userId)?.single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location?.origin}/login`
        }
      });
      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      return { error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!supabase?.auth?.getUser();
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      if (!userId) throw new Error('User ID required');
      
      const { data, error } = await supabase?.from('users')?.update({
          ...updates,
          updated_at: new Date()?.toISOString()
        })?.eq('id', userId)?.select()?.single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: error?.message || 'Failed to update profile' } };
    }
  }
};