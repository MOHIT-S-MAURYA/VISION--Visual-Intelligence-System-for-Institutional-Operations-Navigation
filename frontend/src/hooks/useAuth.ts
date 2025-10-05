import { useState, useEffect } from 'react';
import { tokenStorage } from '@/utils/api';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

/**
 * Custom hook for authentication state management
 * Checks token validity and provides auth utilities
 */
export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = (): boolean => {
    const tokens = tokenStorage.get();
    if (!tokens) return false;
    
    const isValid = tokenStorage.isValid(tokens.access);
    return isValid;
  };

  useEffect(() => {
    const isValid = checkAuth();
    setIsAuthenticated(isValid);
    setIsLoading(false);

    // Check auth status every minute
    const interval = setInterval(() => {
      const isValid = checkAuth();
      if (!isValid && isAuthenticated) {
        setIsAuthenticated(false);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const logout = () => {
    tokenStorage.clear();
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    checkAuth,
  };
};
