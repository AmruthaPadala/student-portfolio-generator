import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => localStorage.getItem('portfolio_auth_token'));
  const [loading, setLoading] = useState(true);

  // Initialize auth from token
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('portfolio_auth_token');
      if (storedToken) {
        try {
          const userData = await api.auth.me();
          setUser(userData);
        } catch (err) {
          console.warn('Session expired or invalid token:', err.message);
          setAuthToken(null);
          setTokenState(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (usernameOrEmail, password) => {
    const data = await api.auth.login({ usernameOrEmail, password });
    setAuthToken(data.token);
    setTokenState(data.token);
    setUser({
      id: data.id,
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      slug: data.slug,
    });
    return data;
  };

  const register = async (userData) => {
    const data = await api.auth.register(userData);
    setAuthToken(data.token);
    setTokenState(data.token);
    setUser({
      id: data.id,
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      slug: data.slug,
    });
    return data;
  };

  const logout = () => {
    setAuthToken(null);
    setTokenState(null);
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
  };

  const refreshUser = async () => {
    try {
      const userData = await api.auth.me();
      setUser(userData);
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
      }}
    >
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
