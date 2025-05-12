"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from the API
  const fetchUser = async () => {
    try {
      const res = await fetch('/api/users/me', {
        method: 'POST',
        credentials: 'include', // Send cookies
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setUser(data.data);  // If user exists, update the context
      } else {
        setUser(null);  // User not logged in, clear context
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

  // Define the logout function
  const logout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Send cookies
      });
      const data = await res.json();
      if (res.ok) {
        setUser(null);  // Clear the user data from context
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

export const useAuth = () => useContext(AuthContext);
