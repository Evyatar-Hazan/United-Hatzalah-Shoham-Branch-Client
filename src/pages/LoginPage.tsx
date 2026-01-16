import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

interface GoogleConfig {
  client_id: string;
  callback: (response: GoogleResponse) => Promise<void>;
}

interface GoogleResponse {
  credential: string;
}

interface GoogleAccounts {
  id: {
    initialize: (config: GoogleConfig) => void;
    renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
    cancel: () => void;
  };
}

declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts;
    };
  }
}

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleMockLogin = React.useCallback(async () => {
    setError(null);
    try {
      // Mock JWT token for local development
      // Format: header.payload.signature (signature is fake)
      const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        email: 'EvyatarHazan3.14@gmail.com',
        name: 'Evyatar Hazan',
        picture: 'https://via.placeholder.com/150',
        email_verified: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      }));
      const signature = 'mock_signature_for_dev_only';
      const mockToken = `${header}.${payload}.${signature}`;
      await login(mockToken);
      navigate('/admin');
    } catch (err) {
      setError('נכשל בהתחברות. אנא נסה שוב.');
      console.error('Login error:', err);
    }
  }, [login, navigate]);

  const handleGoogleCallback = React.useCallback(async (response: GoogleResponse) => {
    setError(null);
    try {
      await login(response.credential);
      navigate('/admin');
    } catch (err) {
      setError('נכשל בהתחברות. אנא נסה שוב.');
      console.error('Login error:', err);
    }
  }, [login, navigate]);

  React.useEffect(() => {
    const initGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
          callback: handleGoogleCallback,
        });

        const buttonElement = document.getElementById('google-signin-button');
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            type: 'standard',
            size: 'large',
            theme: 'outline',
            text: 'signin_with',
            locale: 'he',
          });
        }
      }
    };

    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [handleGoogleCallback]);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h1>פאנל ניהול</h1>
          <p>יחידת הצלה שמואל שוהם</p>
        </div>

        <div className={styles.loginContent}>
          <h2>כניסה לניהול</h2>
          <p className={styles.subtitle}>התחבר עם חשבון Google שלך כדי לנהל את האתר</p>

          {error && <div className={styles.error}>{error}</div>}

          <div id="google-signin-button" className={styles.googleButton}></div>

          {isLoading && <div className={styles.loading}>טוען...</div>}

          {/* Mock Login - Local Development Only */}
          {import.meta.env.DEV && (
            <div className={styles.mockLoginSection}>
              <p className={styles.mockLabel}>📌 מצב פיתוח - התחברות ללא אמות:</p>
              <button
                onClick={handleMockLogin}
                disabled={isLoading}
                className={styles.mockLoginButton}
              >
                {isLoading ? 'מתחבר...' : 'התחברות כמנהל (Mock)'}
              </button>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <p>רק מנהלים מורשים יכולים להיכנס לפאנל זה</p>
        </div>
      </div>

      <div className={styles.background}></div>
    </div>
  );
};

export default LoginPage;
