'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider'; // Adjust path if needed

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp, signInWithGoogle } = useAuth();

  // Add firstName, lastName, phone to state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Basic validation for required fields in sign-up mode
    if (isSignUp) {
      if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Try signing up
        const error = await signUp(email, password, { firstName, lastName, phone });
        if (error) {
          if (
            error.message.includes('already registered') ||
            error.message.includes('User already registered') ||
            error.message.includes('duplicate key value')
          ) {
            setError('This E-mail already has an account with us.');
          } else {
            setError(error.message);
          }
          setLoading(false);
          return;
        }
        setShowEmailPrompt(true); // Show email confirmation prompt
      } else {
        // Signing in
        const error = await signIn(email, password);
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
        router.push('/'); // Redirect on success
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError('');
    setLoading(true);
    try {
      const error = await signInWithGoogle();
      if (error) {
        setError(error.message);
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      {showEmailPrompt ? (
        <div className="p-4 bg-blue-100 text-blue-700 rounded">
          <p>Check your email to confirm your account before signing in.</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-4 w-full py-2 px-4 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : 'Continue with Google'}
          </button>

          <p className="mt-4 text-center">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => {
                setError('');
                setIsSignUp(!isSignUp);
                setShowEmailPrompt(false);
              }}
              className="text-blue-600 hover:underline"
              type="button"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </>
      )}
    </div>
  );
}
