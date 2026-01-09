import React, { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

const ROLES = { ADMIN: 'admin', MANAGER: 'manager', EMPLOYEE: 'employee', CLIENT: 'client' };
const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
      const userData = localStorage.getItem('prana_user');
      console.log("Initial user state:", userData); // Added log
      try { 
        return userData ? JSON.parse(userData) : null;
      } catch { 
        return null; 
      }
  });

  const login = async ({ username, password }) => {
      console.log("Login function called with:", { username, password }); // Added log
      try {
          const { data } = await api.post(ENDPOINTS.auth.login, { username, password });
          console.log("Login API response:", data); // Added log
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          localStorage.setItem('prana_user', JSON.stringify(data.user)); // Store user data
          const me = await api.get(ENDPOINTS.auth.me);
          setUser(me.data); // Set the user state with the actual user data
      } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message); // Log the error
          throw error; // Rethrow the error for further handling
      }
  };

  const logout = () => {
      setUser(null);
      localStorage.removeItem('prana_user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
  };

  const value = useMemo(() => ({ user, login, logout, ROLES }), [user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
