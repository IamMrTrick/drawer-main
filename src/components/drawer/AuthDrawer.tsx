'use client';

import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerHeader } from './Drawer';
import { User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import './AuthDrawer.css';

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn?: (email: string, password: string) => void;
  onSignUp?: (name: string, email: string, password: string) => void;
}

type AuthMode = 'signin' | 'signup';

export const AuthDrawer: React.FC<AuthDrawerProps> = ({
  isOpen,
  onClose,
  onSignIn,
  onSignUp,
}) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [drawerSize, setDrawerSize] = useState<'s' | 'l'>('s');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signin') {
      onSignIn?.(email, password);
    } else {
      if (password === confirmPassword) {
        onSignUp?.(name, email, password);
      }
    }
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    // Adjust drawer size based on mode - sign up is larger
    setDrawerSize(newMode === 'signin' ? 's' : 'l');
    // Reset form when switching
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      side="bottom"
      size={drawerSize}
      swipeToClose={true}
      backdrop={true}
      dismissible={true}
      className="auth-drawer"
    >
      <DrawerHeader>
        {/* Tab Switcher */}
        <div className="auth-drawer__tabs">
          <button
            onClick={() => handleModeChange('signin')}
            className={`auth-drawer__tab ${mode === 'signin' ? 'auth-drawer__tab--active' : ''}`}
            type="button"
          >
            Sign In
          </button>
          <button
            onClick={() => handleModeChange('signup')}
            className={`auth-drawer__tab ${mode === 'signup' ? 'auth-drawer__tab--active' : ''}`}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </DrawerHeader>

      <DrawerBody scrollable={true}>
        <form onSubmit={handleSubmit} className="auth-drawer__form">
          {/* Sign Up Name Field - Only in signup mode */}
          {mode === 'signup' && (
            <div className="auth-drawer__field">
              <label htmlFor="name" className="auth-drawer__label">
                <User size={16} />
                <span>Full Name</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="auth-drawer__input"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="auth-drawer__field">
            <label htmlFor="email" className="auth-drawer__label">
              <Mail size={16} />
              <span>Email</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="auth-drawer__input"
            />
          </div>

          {/* Password Field */}
          <div className="auth-drawer__field">
            <label htmlFor="password" className="auth-drawer__label">
              <Lock size={16} />
              <span>Password</span>
            </label>
            <div className="auth-drawer__input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="auth-drawer__input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-drawer__toggle-password"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field - Only in signup mode */}
          {mode === 'signup' && (
            <div className="auth-drawer__field">
              <label htmlFor="confirmPassword" className="auth-drawer__label">
                <Lock size={16} />
                <span>Confirm Password</span>
              </label>
              <div className="auth-drawer__input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="auth-drawer__input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-drawer__toggle-password"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="auth-drawer__error">Passwords do not match</p>
              )}
            </div>
          )}

          {/* Remember Me / Terms Checkbox */}
          {mode === 'signin' ? (
            <div className="auth-drawer__checkbox">
              <label className="auth-drawer__checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="auth-drawer__checkbox-custom">
                  {rememberMe && <Check size={14} />}
                </span>
                <span>Remember me</span>
              </label>
              <button type="button" className="auth-drawer__link">
                Forgot password?
              </button>
            </div>
          ) : (
            <div className="auth-drawer__checkbox">
              <label className="auth-drawer__checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
                <span className="auth-drawer__checkbox-custom">
                  {agreeToTerms && <Check size={14} />}
                </span>
                <span>
                  I agree to the{' '}
                  <button type="button" className="auth-drawer__link-inline">
                    Terms & Conditions
                  </button>
                </span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="auth-drawer__submit">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Divider */}
          <div className="auth-drawer__divider">
            <span>or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="auth-drawer__social">
            <button type="button" className="auth-drawer__social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="auth-drawer__social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2"/>
              </svg>
              Facebook
            </button>
          </div>
        </form>
      </DrawerBody>
    </Drawer>
  );
};

