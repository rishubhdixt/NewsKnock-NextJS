'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/users/me', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setUser(null);
        console.log('[Logout] 🎉 User logged out');
      } else {
        console.log('[Logout] ❌ Error:', data.error);
      }
    } catch (error) {
      console.error('[Logout] ❌ Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn: !!user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
