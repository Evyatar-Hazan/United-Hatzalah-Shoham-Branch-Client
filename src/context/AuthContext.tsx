import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credential: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to restore auth:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credential: string) => {
    try {
      // For Google OAuth, credential is the JWT ID token
      // Decode the JWT to extract user info
      let email = '';
      let name = '';
      let picture = '';

      // Try to decode JWT if it looks like a Google token
      if (credential.includes('.') && credential.split('.').length === 3) {
        try {
          const payload = JSON.parse(atob(credential.split('.')[1]));
          email = payload.email || '';
          name = payload.name || '';
          picture = payload.picture || '';
        } catch {
          // If decode fails, treat as email for mock login
          email = credential;
          name = credential.split('@')[0];
          picture = '';
        }
      } else {
        // Treat as email for mock login
        email = credential;
        name = credential.split('@')[0];
        picture = '';
      }

      const response = await fetch(`${API_URL}/api/auth/google-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          name,
          picture,
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        const userData = result.data;
        // Store email as token since we use it for Bearer auth
        const authToken = userData.email;
        setToken(authToken);
        setUser(userData);
        
        // Save to localStorage
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('authUser', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    
    // Clear Google Sign-In state if available
    if (window.google) {
      window.google.accounts.id.cancel();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = useAuthHook;
