'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User, AuthError, Session } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    metadata: { firstName: string; lastName: string; phone: string }
  ) => Promise<AuthError | null>;
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  signInWithGoogle: () => Promise<AuthError | null>;
  signOut: () => Promise<AuthError | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign up with metadata
  async function signUp(
    email: string,
    password: string,
    metadata: { firstName: string; lastName: string; phone: string }
  ): Promise<AuthError | null> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          phone: metadata.phone,
        },
      },
    });
    return error;
  }

  // Sign in with email and password
  async function signIn(email: string, password: string): Promise<AuthError | null> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error;
  }

  // Sign in with Google OAuth
  async function signInWithGoogle(): Promise<AuthError | null> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    return error;
  }

  // Sign out
  async function signOut(): Promise<AuthError | null> {
    const { error } = await supabase.auth.signOut();
    return error;
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
