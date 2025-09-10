import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  // Isolated async operations - never called from auth callbacks
  const profileOperations = {
    async load(userId) {
      if (!userId) return
      setProfileLoading(true)
      try {
        // Use the existing 'users' table from schema
        const { data, error } = await supabase?.from('users')?.select('*')?.eq('id', userId)?.single();
        
        if (!error && data) {
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Profile load error:', error)
      } finally {
        setProfileLoading(false)
      }
    },

    clear() {
      setUserProfile(null)
      setProfileLoading(false)
    },

    async createOrUpdate(authUser) {
      if (!authUser) return;
      
      try {
        // Check if user exists first
        const { data: existingUser } = await supabase?.from('users')?.select('*')?.eq('id', authUser?.id)?.single();

        if (existingUser) {
          // Update existing user with latest info from Google
          const { data, error } = await supabase?.from('users')?.update({
              name: authUser?.user_metadata?.full_name || authUser?.user_metadata?.name,
              email: authUser?.email,
              avatar_url: authUser?.user_metadata?.avatar_url,
              google_id: authUser?.user_metadata?.sub,
              last_login: new Date()?.toISOString()
            })?.eq('id', authUser?.id)?.select()?.single();

          if (!error) setUserProfile(data);
        } else {
          // Create new user profile
          const { data, error } = await supabase?.from('users')?.insert({
              id: authUser?.id,
              name: authUser?.user_metadata?.full_name || authUser?.user_metadata?.name,
              email: authUser?.email,
              avatar_url: authUser?.user_metadata?.avatar_url,
              google_id: authUser?.user_metadata?.sub,
              role: 'reader',
              last_login: new Date()?.toISOString()
            })?.select()?.single();

          if (!error) setUserProfile(data);
        }
      } catch (error) {
        console.error('Profile create/update error:', error)
      }
    }
  }

  // Auth state handlers - PROTECTED from async modification
  const authStateHandlers = {
    // This handler MUST remain synchronous - Supabase requirement
    onChange: (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (session?.user) {
        profileOperations?.load(session?.user?.id) // Fire-and-forget
        
        // Create or update profile on sign in
        if (event === 'SIGNED_IN') {
          profileOperations?.createOrUpdate(session?.user) // Fire-and-forget
        }
      } else {
        profileOperations?.clear()
      }
    }
  }

  useEffect(() => {
    // Initial session check
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
      authStateHandlers?.onChange(null, session)
    })

    // CRITICAL: This must remain synchronous
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      authStateHandlers?.onChange
    )

    return () => subscription?.unsubscribe()
  }, [])

  // Auth methods
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location?.origin
        }
      })
      return { data, error }
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase?.auth?.signOut()
      if (!error) {
        setUser(null)
        profileOperations?.clear()
      }
      return { error }
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } }
    }
  }

  const updateProfile = async (updates) => {
    if (!user) return { error: { message: 'No user logged in' } }
    
    try {
      const { data, error } = await supabase?.from('users')?.update(updates)?.eq('id', user?.id)?.select()?.single();
      
      if (!error) setUserProfile(data)
      return { data, error }
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    profileLoading,
    signInWithGoogle,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}