import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, logoutUser } from "../api/Auth.js"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Here you might want to validate the token with your backend
      // For now, we'll just assume it's valid
      setUser({ username: 'User' }); // Replace with actual user data
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      setUser({ username: username }); // Replace with actual user data from response
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};