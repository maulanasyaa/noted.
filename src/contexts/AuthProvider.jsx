import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  getUserLogged,
  login as loginRequest,
  putAccessToken,
} from '../utils/network-data';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { error, data } = await getUserLogged();

      if (!error && data) {
        setUser(data);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    checkAuth();
  }, []);

  // login account
  const login = useCallback(async ({ email, password }) => {
    const result = await loginRequest({ email, password });

    if (result.error) {
      return result;
    }

    putAccessToken(result.data.accessToken);

    const { error, data } = await getUserLogged();

    if (!error && data) {
      setUser(data);
    }

    return result;
  }, []);

  // logout account
  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

  const value = useMemo(
    () => ({ user, isLoading, login, handleLogout }),
    [user, isLoading, login, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
